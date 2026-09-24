import { useRef, useState } from 'react'
import './FaviconGenerator.css'

const sizes = [16, 32, 48, 180, 192, 512]

function FaviconGenerator() {
  const [image, setImage] = useState(null)
  const [fileName, setFileName] = useState('')
  const [selectedSize, setSelectedSize] = useState(null)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleFile = (file) => {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Please choose a valid image file.')
      return
    }

    setError('')
    setFileName(file.name)
    setSelectedSize(null)

    const reader = new FileReader()

    reader.onload = (event) => {
      setImage(event.target.result)
    }

    reader.readAsDataURL(file)
  }

  const handleInputChange = (event) => {
    handleFile(event.target.files[0])
  }

  const downloadFavicon = () => {
    if (!image || !selectedSize) return

    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = selectedSize
      canvas.height = selectedSize

      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, selectedSize, selectedSize)

      // Keep the whole image visible without cropping
      const scale = Math.min(
        selectedSize / img.width,
        selectedSize / img.height
      )

      const width = img.width * scale
      const height = img.height * scale

      const x = (selectedSize - width) / 2
      const y = (selectedSize - height) / 2

      ctx.drawImage(
        img,
        x,
        y,
        width,
        height
      )

      canvas.toBlob((blob) => {
        if (!blob) return

        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `favicon-${selectedSize}x${selectedSize}.png`

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(url)
      }, 'image/png')
    }

    img.src = image
  }

  const resetTool = () => {
    setImage(null)
    setFileName('')
    setSelectedSize(null)
    setError('')

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="favicon-generator">

      <div className="favicon-main-card">

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleInputChange}
          hidden
        />

        {!image ? (
          <div
            className="favicon-upload-area"
            onClick={() => inputRef.current?.click()}
          >
            <div className="favicon-upload-icon">
              ↑
            </div>

            <h3>Upload Your Image</h3>

            <p>
              PNG, JPG or WebP
            </p>

            <button
              type="button"
              className="favicon-upload-btn"
              onClick={(e) => {
                e.stopPropagation()
                inputRef.current?.click()
              }}
            >
              Upload Image
            </button>
          </div>
        ) : (
          <>
            <div className="favicon-preview">
              <img
                src={image}
                alt="Favicon preview"
              />
            </div>

            <div className="favicon-file-name">
              {fileName}
            </div>

            <div className="favicon-actions">

              <button
                type="button"
                className="favicon-change-btn"
                onClick={() => inputRef.current?.click()}
              >
                Change Image
              </button>

              <button
                type="button"
                className="favicon-clear-btn"
                onClick={resetTool}
              >
                Clear
              </button>

            </div>
          </>
        )}

        {error && (
          <p className="favicon-error">
            {error}
          </p>
        )}

      </div>

      {image && (
        <div className="favicon-download-card">

          <h2>Download Favicon</h2>

          <p className="favicon-size-description">
            Choose a size to continue
          </p>

          <div className="favicon-size-grid">

            {sizes.map((size) => (
              <button
                type="button"
                key={size}
                className={`favicon-size-btn ${
                  selectedSize === size
                    ? 'selected'
                    : ''
                }`}
                onClick={() => setSelectedSize(size)}
              >
                <span>
                  {size} × {size}
                </span>

                <small>
                  PNG
                </small>

                {selectedSize === size && (
                  <div className="favicon-selected">
                    ✓
                  </div>
                )}
              </button>
            ))}

          </div>

          <button
            type="button"
            className="favicon-download-btn"
            disabled={!selectedSize}
            onClick={downloadFavicon}
          >
            ↓ Download Favicon
          </button>

        </div>
      )}

    </div>
  )
}

export default FaviconGenerator