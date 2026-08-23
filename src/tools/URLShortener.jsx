import { useState } from 'react'
import { supabase } from '../supabaseClient'

function URLShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const generateShortCode = () => {
  return Math.random()
    .toString(36)
    .substring(2, 8)
}

  const shortenURL = async () => {
  if (!url.trim()) {
    alert('Please enter a URL')
    return
  }

  const shortCode = generateShortCode()

  const { error } = await supabase
    .from('urls')
    .insert([
      {
        short_code: shortCode,
        original_url: url.trim(),
      },
    ])

  if (error) {
    console.error(error)
    alert(error.message)
    return
  }

  const newShortUrl = `${window.location.origin}/s/${shortCode}`

  setShortUrl(newShortUrl)
}

  return (
    <div className="selected-tool">

      <div className="tool-icon">🔗</div>

      <h2>URL Shortener</h2>

      <p className="tool-subtitle">
        Shorten your long URLs quickly and easily.
      </p>

      <div className="url-shortener">

        <input
          type="url"
          placeholder="Paste your long URL here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="compress-button"
          onClick={shortenURL}
        >
          Shorten URL
        </button>

      </div>

      {shortUrl && (
        <div className="compressed-result">

          <h3>URL Ready 🎉</h3>

          <p>{shortUrl}</p>

          <button
            className="download-button"
            onClick={() => {
              navigator.clipboard.writeText(shortUrl)
              alert('URL copied!')
            }}
          >
            Copy URL
          </button>

        </div>
      )}

    </div>
  )
}

export default URLShortener