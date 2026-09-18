import { useState } from 'react'
import './HashGenerator.css'

function HashGenerator() {
  const [text, setText] = useState('')
  const [algorithm, setAlgorithm] = useState('SHA-256')
  const [hash, setHash] = useState('')

  const generateHash = async () => {
    if (!text) {
      setHash('')
      return
    }

    const encoder = new TextEncoder()
    const data = encoder.encode(text)

    const buffer = await crypto.subtle.digest(algorithm, data)

    const hashArray = Array.from(new Uint8Array(buffer))
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')

    setHash(hashHex)
  }

  const copyHash = async () => {
    if (!hash) return

    await navigator.clipboard.writeText(hash)
    alert('Hash copied!')
  }

  const clearHash = () => {
    setText('')
    setHash('')
  }

  return (
    <div className="hash-generator">

      <div className="hash-header">
      </div>

      <div className="hash-controls">

        <div className="hash-input-group">
          <label>Enter Text</label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text..."
            rows={5}
          />
        </div>

        <div className="hash-options">

          <div className="hash-algorithm">
            <label>Algorithm</label>

            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="SHA-256">SHA-256</option>
              <option value="SHA-384">SHA-384</option>
              <option value="SHA-512">SHA-512</option>
            </select>
          </div>

          <div className="hash-actions">
            <button
              className="hash-generate-button"
              onClick={generateHash}
            >
              Generate Hash
            </button>

            <button
              className="hash-clear-button"
              onClick={clearHash}
            >
              Clear
            </button>
          </div>

        </div>
      </div>

      {hash && (
        <div className="hash-result">

          <div className="hash-result-header">
            <span>Generated Hash</span>

            <button onClick={copyHash}>
              Copy
            </button>
          </div>

          <div className="hash-value">
            {hash}
          </div>

        </div>
      )}

      {!hash && (
        <div className="hash-empty">
          <div className="hash-empty-icon">#</div>
          <p>Your generated hash will appear here.</p>
        </div>
      )}

    </div>
  )
}

export default HashGenerator