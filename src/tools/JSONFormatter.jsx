import { useState } from 'react'
import './JSONFormatter.css'

function JSONFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJSON = () => {
    setError('')
    setCopied(false)

    if (!input.trim()) {
      setOutput('')
      setError('Please paste JSON first.')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)

      setOutput(formatted)
    } catch (err) {
      setOutput('')
      setError(`Invalid JSON: ${err.message}`)
    }
  }

  const minifyJSON = () => {
    setError('')
    setCopied(false)

    if (!input.trim()) {
      setOutput('')
      setError('Please paste JSON first.')
      return
    }

    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)

      setOutput(minified)
    } catch (err) {
      setOutput('')
      setError(`Invalid JSON: ${err.message}`)
    }
  }

  const copyOutput = async () => {
    if (!output) return

    try {
      await navigator.clipboard.writeText(output)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1200)
    } catch {
      alert('Unable to copy JSON.')
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
    setCopied(false)
  }

  return (
    <div className="json-formatter">

      <div className="tool-page-icon">
        {'{}'}
      </div>

      <h2>JSON Formatter</h2>

      <p>
        Format, validate and minify JSON quickly and easily.
      </p>

      <div className="json-editor-section">

        <label className="json-label">
          JSON Input
        </label>

        <textarea
          className="json-input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value)
            setError('')
          }}
          placeholder={`Paste your JSON here...

Example:
{"name":"KumpiHub","tools":10}`}
          spellCheck="false"
        />

      </div>

      <div className="json-actions">

        <button
          className="json-format-button"
          onClick={formatJSON}
        >
          ✨ Format JSON
        </button>

        <button
          className="json-minify-button"
          onClick={minifyJSON}
        >
          ⚡ Minify
        </button>

        <button
          className="json-clear-button"
          onClick={clearAll}
        >
          Clear
        </button>

      </div>

      {error && (
        <div className="json-error">
          <strong>⚠️ Invalid JSON</strong>
          <span>{error}</span>
        </div>
      )}

      {output && !error && (
        <div className="json-output-section">

          <div className="json-output-header">

            <label className="json-label">
              Result
            </label>

            <button
              className="json-copy-button"
              onClick={copyOutput}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>

          </div>

          <pre className="json-output">
            {output}
          </pre>

        </div>
      )}

      {!output && !error && (
        <div className="json-empty">
          <span>🧩</span>

          <div>
            <strong>Ready to format?</strong>
            <p>
              Paste your JSON above and choose Format JSON.
            </p>
          </div>
        </div>
      )}

      <div className="json-info">

        <div>
          <span>⚡</span>
          <strong>Fast</strong>
          <small>Instant formatting</small>
        </div>

        <div>
          <span>🔒</span>
          <strong>Private</strong>
          <small>Processed in browser</small>
        </div>

        <div>
          <span>🆓</span>
          <strong>Free</strong>
          <small>No sign up required</small>
        </div>

      </div>

    </div>
  )
}

export default JSONFormatter