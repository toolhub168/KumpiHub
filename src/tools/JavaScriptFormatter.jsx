import { useState } from 'react'
import * as prettier from 'prettier/standalone'
import * as babelParser from 'prettier/plugins/babel'
import * as estreeParser from 'prettier/plugins/estree'
import './JavaScriptFormatter.css'

function JavaScriptFormatter() {
  const [code, setCode] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJavaScript = async () => {
    if (!code.trim()) {
      setError('Please paste JavaScript code first.')
      setResult('')
      return
    }

    try {
      const formatted = await prettier.format(code, {
        parser: 'babel',
        plugins: [babelParser, estreeParser],
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
      })

      setResult(formatted)
      setError('')
      setCopied(false)
    } catch (err) {
      setError(err?.message || 'Invalid JavaScript code.')
      setResult('')
      setCopied(false)
    }
  }

  const minifyJavaScript = () => {
    if (!code.trim()) {
      setError('Please paste JavaScript code first.')
      setResult('')
      return
    }

    try {
      const minified = code
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(^|[^:])\/\/.*$/gm, '$1')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}()[\],;:+\-*/%=<>])\s*/g, '$1')
        .trim()

      setResult(minified)
      setError('')
      setCopied(false)
    } catch {
      setError('Could not minify JavaScript code.')
      setResult('')
      setCopied(false)
    }
  }

  const copyResult = async () => {
    if (!result) return

    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch {
      alert('Copy is not supported on this browser.')
    }
  }

  const clearAll = () => {
    setCode('')
    setResult('')
    setError('')
    setCopied(false)
  }

  return (
    <div className="tool-page js-formatter-page">

      <div className="js-editor-section">
        <label className="js-editor-label">
          Paste JavaScript
        </label>

        <textarea
          className="js-code-input"
          placeholder="Paste your JavaScript code here..."
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
            setResult('')
            setError('')
            setCopied(false)
          }}
          spellCheck="false"
        />
      </div>

      <div className="js-actions">
        <button
          type="button"
          className="js-format-button"
          onClick={formatJavaScript}
        >
          Format JS
        </button>

        <button
          type="button"
          className="js-minify-button"
          onClick={minifyJavaScript}
        >
          Minify
        </button>

        <button
          type="button"
          className="js-clear-button"
          onClick={clearAll}
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="js-error">
          {error}
        </div>
      )}

      {result && (
        <div className="js-result-section">

          <div className="js-result-header">
            <label className="js-editor-label">
              Formatted Result
            </label>

            <button
              type="button"
              className="js-copy-button"
              onClick={copyResult}
            >
              {copied ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>

          <textarea
            className="js-code-result"
            value={result}
            readOnly
            spellCheck="false"
          />

        </div>
      )}

    </div>
  )
}

export default JavaScriptFormatter