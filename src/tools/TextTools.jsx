import { useState } from 'react'

function TextTools() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const uppercase = () => {
    setText((current) => current.toUpperCase())
  }

  const lowercase = () => {
    setText((current) => current.toLowerCase())
  }

  const capitalize = () => {
    setText((current) =>
      current.replace(/\b\w/g, (char) => char.toUpperCase())
    )
  }

  const removeExtraSpaces = () => {
    setText((current) =>
      current.replace(/\s+/g, ' ').trim()
    )
  }

  const copyText = async () => {
    if (!text) {
      alert('Please enter some text first.')
      return
    }

    try {
      await navigator.clipboard.writeText(text)

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3500)
    } catch (error) {
      console.error('Copy failed:', error)
      alert('Could not copy text')
    }
  }

  const clearText = () => {
    setText('')
    setCopied(false)
  }

  const wordCount = text.trim()
    ? text.trim().split(/\s+/).length
    : 0

  const characterCount = text.length

  const characterWithoutSpaces = text.replace(/\s/g, '').length

  return (
    <div className="tool-page text-tools-page">

     

      <textarea
        className="text-tools-input"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setCopied(false)
        }}
      />

      <div className="text-stats">

        <div>
          <strong>{wordCount}</strong>
          <span>Words</span>
        </div>

        <div>
          <strong>{characterCount}</strong>
          <span>Characters</span>
        </div>

        <div>
          <strong>{characterWithoutSpaces}</strong>
          <span>Without spaces</span>
        </div>

      </div>

      <div className="text-actions">

        <button
          type="button"
          onClick={uppercase}
        >
          🔠 UPPERCASE
        </button>

        <button
          type="button"
          onClick={lowercase}
        >
          🔡 lowercase
        </button>

        <button
          type="button"
          onClick={capitalize}
        >
          ✨ Capitalize
        </button>

        <button
          type="button"
          onClick={removeExtraSpaces}
        >
          🧹 Remove Spaces
        </button>

      </div>

      <div className="text-bottom-actions">

        <button
          type="button"
          className="text-copy-button"
          onClick={copyText}
        >
          {copied ? '✓ Copied' : '📋 Copy Text'}
        </button>

        <button
          type="button"
          className="text-clear-button"
          onClick={clearText}
        >
          🗑️ Clear
        </button>

      </div>

    </div>
  )
}

export default TextTools