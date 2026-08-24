import { useState } from 'react'

function VideoDownloader() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [completed, setCompleted] = useState(false)

  const handleDownload = async () => {
    if (!url.trim()) {
      alert('Please paste a video URL')
      return
    }

    setLoading(true)
    setResult(null)
    setCompleted(false)
    setProgress(0)

    try {
      const response = await fetch('https://kumpihub.onrender.com/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: url.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.error || 'Something went wrong')
        return
      }

      setResult(data)
    } catch (error) {
      console.error(error)
      alert('Could not connect to the download server')
    } finally {
      setLoading(false)
    }
  }

  const handleVideoDownload = async () => {
    if (!result?.downloadUrl || downloading) {
      return
    }

    setDownloading(true)
    setProgress(0)

    try {
      const downloadUrl =
        `https://kumpihub.onrender.com/api/download-file?url=${encodeURIComponent(
          result.downloadUrl
        )}`

      const response = await fetch(downloadUrl)

      if (!response.ok) {
        const data = await response.json().catch(() => null)

        alert(
          data?.error ||
            'Download service temporarily unavailable. Please try again later.'
        )

        setDownloading(false)
        return
      }

      const contentLength = response.headers.get('content-length')

      if (!response.body) {
        throw new Error('Download stream is not available')
      }

      const reader = response.body.getReader()

      const chunks = []
      let receivedLength = 0

      while (true) {
        const { done, value } = await reader.read()

        if (done) {
          break
        }

        chunks.push(value)
        receivedLength += value.length

        if (contentLength) {
          const percent = Math.round(
            (receivedLength / Number(contentLength)) * 100
          )

          setProgress(Math.min(percent, 100))
        }
      }

      const blob = new Blob(chunks, {
        type: response.headers.get('content-type') || 'video/mp4',
      })

      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = blobUrl
      link.download = 'toolhub-video.mp4'

      document.body.appendChild(link)
      link.click()
      link.remove()

      URL.revokeObjectURL(blobUrl)

      setProgress(100)
      setCompleted(true)
      setDownloading(false)
    } catch (error) {
      console.error('Download error:', error)

      alert('Could not download the video')

      setDownloading(false)
      setProgress(0)
    }
  }

  const handleComplete = () => {
    setUrl('')
    setResult(null)
    setLoading(false)
    setDownloading(false)
    setProgress(0)
    setCompleted(false)
  }

  return (
    <div className="tool-page">

      <div className="tool-page-icon">📥</div>

      <h2>Video Downloader</h2>

      <p>Download videos from supported platforms.</p>

      {!result && !completed && (
        <>
          <div className="url-input-wrapper">

            <input
              type="text"
              placeholder="Paste video URL here..."
              className="tool-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />

            <button
              type="button"
              className="paste-button"
              onClick={async () => {
                try {
                  const text = await navigator.clipboard.readText()

                  if (text && text.trim()) {
                    setUrl(text.trim())
                  }
                } catch (error) {
                  console.log('Clipboard access was blocked')
                }
              }}
            >
              Paste
            </button>

          </div>

          <button
            className="tool-action"
            onClick={handleDownload}
            disabled={loading}
          >
            {loading ? 'Checking URL...' : 'Get Video'}
          </button>
        </>
      )}

      {result && !completed && (
        <div className="compressed-result">

          <h3>🎬 Video Ready</h3>

          <p>{result.message}</p>

          <p>
            Title: <strong>{result.title}</strong>
          </p>

          <p>
            Platform: <strong>{result.platform}</strong>
          </p>
          <div className="video-url-display">
            <span>Video URL</span>
            <strong>{url}</strong>
          </div>

          {!downloading && (
            <button
              className="download-button"
              onClick={handleVideoDownload}
              disabled={downloading}
            >
              ⬇️ Download Video
            </button>
          )}

          {downloading && (
            <div className="download-progress">

              <p>
                ⏳ Downloading... {progress}%
              </p>

              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

            </div>
          )}

        </div>
      )}

      {completed && (
        <div className="compressed-result">

          <h3>🎉 Complete!</h3>

          <p>Video downloaded successfully.</p>

          <button
            className="tool-action"
            onClick={handleComplete}
          >
            🎉 Complete
          </button>

        </div>
      )}

    </div>
  )
}

export default VideoDownloader