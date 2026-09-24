import { useState } from 'react'
import { optimize } from '@jiihpeeh/svgo-wasm'
import './SVGOptimizer.css'

function SVGOptimizer() {
  const [originalSvg, setOriginalSvg] = useState('')
  const [optimizedSvg, setOptimizedSvg] = useState('')
  const [fileName, setFileName] = useState('')
  const [originalSize, setOriginalSize] = useState(0)
  const [optimizedSize, setOptimizedSize] = useState(0)
  const [error, setError] = useState('')

  const optimizeSVG = async (svg) => {
  const result = await optimize(svg)

  return result.data
}

  const handleFile = (file) => {
    if (!file) return

    if (
      file.type !== 'image/svg+xml' &&
      !file.name.toLowerCase().endsWith('.svg')
    ) {
      setError('Please choose a valid SVG file.')
      return
    }

    setError('')

    const reader = new FileReader()

    reader.onload = async (event) => {
      const svg = event.target.result

      if (!svg.includes('<svg')) {
        setError('The selected file does not contain valid SVG data.')
        return
      }

      const optimized = await optimizeSVG(svg)

      setFileName(file.name)
      setOriginalSvg(svg)
      setOptimizedSvg(optimized)

      setOriginalSize(new Blob([svg]).size)
      setOptimizedSize(new Blob([optimized]).size)
    }

    reader.readAsText(file)
  }

  const handleInputChange = (event) => {
    handleFile(event.target.files[0])
  }

  const downloadSVG = () => {
    if (!optimizedSvg) return

    const blob = new Blob(
      [optimizedSvg],
      { type: 'image/svg+xml' }
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `optimized-${fileName || 'image.svg'}`

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  const clearTool = () => {
    setOriginalSvg('')
    setOptimizedSvg('')
    setFileName('')
    setOriginalSize(0)
    setOptimizedSize(0)
    setError('')
  }

  const reduction =
    originalSize > 0
      ? Math.max(
          0,
          ((originalSize - optimizedSize) / originalSize) * 100
        )
      : 0

  return (
    <div className="svg-optimizer">

      <div className="svg-upload-card">

        <label className="svg-upload-area">

          <div className="svg-upload-icon">
            ↗
          </div>

          <h3>
            Upload SVG
          </h3>

          <p>
            Choose an SVG file to optimize
          </p>

          <span className="svg-upload-button">
            Choose SVG File
          </span>

          <input
            type="file"
            accept=".svg,image/svg+xml"
            onChange={handleInputChange}
            hidden
          />

        </label>

        {error && (
          <p className="svg-error">
            {error}
          </p>
        )}

      </div>

      {optimizedSvg && (
        <div className="svg-result-card">

          <div className="svg-result-header">
            <div>
              <h2>SVG Optimized</h2>
              <p>{fileName}</p>
            </div>

            <button
              type="button"
              className="svg-clear-btn"
              onClick={clearTool}
            >
              Clear
            </button>
          </div>

          <div className="svg-stats">

            <div className="svg-stat">
              <span>Original</span>
              <strong>
                {(originalSize / 1024).toFixed(2)} KB
              </strong>
            </div>

            <div className="svg-stat">
              <span>Optimized</span>
              <strong>
                {(optimizedSize / 1024).toFixed(2)} KB
              </strong>
            </div>

            <div className="svg-stat">
              <span>Reduced</span>
              <strong>
                {reduction.toFixed(1)}%
              </strong>
            </div>

          </div>

          <div className="svg-preview-card">

            <h3>Preview</h3>

            <div
              className="svg-preview"
              dangerouslySetInnerHTML={{
                __html: optimizedSvg
              }}
            />

          </div>

          <button
            type="button"
            className="svg-download-btn"
            onClick={downloadSVG}
          >
            ↓ Download Optimized SVG
          </button>

        </div>
      )}

    </div>
  )
}

export default SVGOptimizer