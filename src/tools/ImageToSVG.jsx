import { useRef, useState } from 'react'
import './ImageToSVG.css'

function ImageToSVG() {
  const [image, setImage] = useState(null)
  const [svgData, setSvgData] = useState('')
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const inputRef = useRef(null)

  const convertToSVG = (file) => {
    if (!file) return

    const validTypes = [
      'image/png',
      'image/jpeg',
      'image/webp'
    ]

    if (
      !validTypes.includes(file.type) &&
      !/\.(png|jpe?g|webp)$/i.test(file.name)
    ) {
      setError(
        'Please choose a PNG, JPG, JPEG or WebP image.'
      )
      return
    }

    setError('')
    setProcessing(true)

    const reader = new FileReader()

    reader.onload = (event) => {
      const dataUrl = event.target.result

      const img = new Image()

      img.onload = () => {
        setImage(dataUrl)
        setFileName(file.name)

        const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  width="${img.width}"
  height="${img.height}"
  viewBox="0 0 ${img.width} ${img.height}"

  <image
    width="${img.width}"
    height="${img.height}"
    href="${dataUrl}"
    x="0"
    y="0"
    preserveAspectRatio="none"
  />
</svg>
`

        setSvgData('ready')
        setProcessing(false)
      }

      img.onerror = () => {
        setError('Unable to read this image.')
        setProcessing(false)
      }

      img.src = dataUrl
    }

    reader.onerror = () => {
      setError('Unable to read this file.')
      setProcessing(false)
    }

    reader.readAsDataURL(file)
  }

  const handleFileChange = (event) => {
    convertToSVG(event.target.files[0])
  }

  const downloadSVG = () => {
  if (!image) return

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     width="100%"
     height="100%"
     viewBox="0 0 100 100">
  <image
    x="0"
    y="0"
    width="100"
    height="100"
    preserveAspectRatio="none"
    href="${image}"
  />
</svg>`

  const blob = new Blob(
    [svg],
    { type: 'image/svg+xml;charset=utf-8' }
  )

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download =
    `${fileName.replace(/\.[^/.]+$/, '')}.svg`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

  const clearTool = () => {
    setImage(null)
    setSvgData('')
    setFileName('')
    setError('')
    setProcessing(false)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="image-to-svg">

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={handleFileChange}
        hidden
      />

      {!image ? (
        <div className="image-svg-upload-card">

          <div
            className="image-svg-upload-area"
            onClick={() =>
              inputRef.current?.click()
            }
          >

            <div className="image-svg-upload-icon">
              ↗
            </div>

            <h3>
              Upload Image
            </h3>

            <p>
              PNG • JPG • JPEG • WebP
            </p>

            <button
              type="button"
              className="image-svg-upload-btn"
              onClick={(event) => {
                event.stopPropagation()
                inputRef.current?.click()
              }}
            >
              Choose Image
            </button>

          </div>

          {error && (
            <p className="image-svg-error">
              {error}
            </p>
          )}

        </div>
      ) : (
        <div className="image-svg-result-card">

          <div className="image-svg-header">

            <div>
              <h2>
                Image to SVG
              </h2>

              <p>
                {fileName}
              </p>
            </div>

            <button
              type="button"
              className="image-svg-clear-btn"
              onClick={clearTool}
            >
              Clear
            </button>

          </div>

          <div className="image-svg-preview">

            {processing ? (
              <span className="image-svg-processing">
                Converting...
              </span>
            ) : (
              image && (
                <img
                  src={image}
                  alt="SVG Preview"
                  className="image-svg-preview-image"
                />
              )
            )}

          </div>

          <button
            type="button"
            className="image-svg-change-btn"
            onClick={() =>
              inputRef.current?.click()
            }
          >
            Change Image
          </button>

          <button
            type="button"
            className="image-svg-download-btn"
            disabled={!svgData || processing}
            onClick={downloadSVG}
          >
            ↓ Download SVG
          </button>

          {error && (
            <p className="image-svg-error">
              {error}
            </p>
          )}

        </div>
      )}

    </div>
  )
}

export default ImageToSVG