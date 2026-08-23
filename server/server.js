import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const quotaFile = path.join(__dirname, 'monthly-downloads.json')
const MONTHLY_LIMIT = 600
function getMonthlyQuota() {
  const currentMonth = new Date().toISOString().slice(0, 7)

  let quota = {
    month: currentMonth,
    count: 0,
  }

  try {
    if (fs.existsSync(quotaFile)) {
      quota = JSON.parse(fs.readFileSync(quotaFile, 'utf8'))
    }
  } catch (error) {
    console.error('Could not read quota file:', error)
  }

  if (quota.month !== currentMonth) {
    quota = {
      month: currentMonth,
      count: 0,
    }

    fs.writeFileSync(
      quotaFile,
      JSON.stringify(quota, null, 2)
    )
  }

  return quota
}

const app = express()
console.log(
  'FastSaver API key loaded:',
  Boolean(process.env.FASTSAVER_API_KEY)
)

app.use(cors())
app.use(express.json())

app.post('/api/download', async (req, res) => {
  const { url } = req.body

  if (!url || !url.trim()) {
    return res.status(400).json({
      error: 'Please provide a video URL',
    })
  }

  try {
    const videoUrl = new URL(url.trim())

    if (!['http:', 'https:'].includes(videoUrl.protocol)) {
      return res.status(400).json({
        error: 'Invalid URL',
      })
    }

    let platform = 'Unknown'

if (videoUrl.hostname.includes('tiktok.com')) {
  platform = 'TikTok'
} else if (
  videoUrl.hostname.includes('facebook.com') ||
  videoUrl.hostname.includes('fb.watch')
) {
  platform = 'Facebook'
}

const apiUrl = new URL('https://api.fastsaver.io/v1/fetch')
apiUrl.searchParams.set('url', videoUrl.toString())

const apiResponse = await fetch(apiUrl, {
  headers: {
    'X-Api-Key': process.env.FASTSAVER_API_KEY,
  },
})

const apiData = await apiResponse.json()
console.log('FastSaver fields:', Object.keys(apiData))
console.log('Items:', apiData.items)

if (!apiResponse.ok || !apiData.ok) {
  console.error('FastSaver error:', apiData)

  return res.status(400).json({
    error: apiData.detail || 'Could not get video',
  })
}
console.log('Sending to frontend:', {
  downloadUrl: apiData.download_url,
})
res.json({
  message: 'Video ready',
  url: videoUrl.toString(),
  platform,
  title: apiData.caption || 'Video ready to download',
  downloadUrl:
  apiData.download_url ||
  apiData.items?.[0]?.download_url,
  thumbnailUrl: apiData.items?.[0]?.thumbnail_url || '',
  duration: apiData.duration || 0,
})
  } catch {
    return res.status(400).json({
      error: 'Please enter a valid URL',
    })
  }
})
app.get('/api/download-file', async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({
      error: 'Download URL is required',
    })
  }
  const quota = getMonthlyQuota()

if (quota.count >= MONTHLY_LIMIT) {
  return res.status(429).json({
    error:
      'Download service temporarily unavailable. Please try again later.',
  })
}

  try {
    const videoResponse = await fetch(url)

    if (!videoResponse.ok) {
      return res.status(400).json({
        error: 'Could not download video',
      })
    }

    res.setHeader(
      'Content-Type',
      videoResponse.headers.get('content-type') || 'video/mp4'
    )

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="toolhub-video.mp4"'
    )

   const buffer = await videoResponse.arrayBuffer()

const quota = getMonthlyQuota()

if (quota.count < MONTHLY_LIMIT) {
  quota.count += 1

  fs.writeFileSync(
    quotaFile,
    JSON.stringify(quota, null, 2)
  )
}

res.setHeader(
  'Content-Length',
  buffer.byteLength
)

res.send(Buffer.from(buffer))
  } catch (error) {
    console.error('Download file error:', error)

    res.status(500).json({
      error: 'Could not download video',
    })
  }
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})