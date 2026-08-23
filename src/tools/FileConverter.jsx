import { useState } from 'react'

function FileConverter() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [format, setFormat] = useState('png')
  const [convertedFile, setConvertedFile] = useState(null)
  const [converting, setConverting] = useState(false)

  const supportedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ]

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!supportedTypes.includes(file.type)) {
      alert('Please choose a JPG, PNG or WEBP image.')
      return
    }

    setSelectedFile(file)
    setConvertedFile(null)
  }

  const convertFile = () => {
    if (!selectedFile) {
      alert('Please choose an image first.')
      return
    }

    setConverting(true)
    setConvertedFile(null)

    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = img.width
        canvas.height = img.height

        // JPG does not support transparent backgrounds.
        // Fill with white before drawing the image.
        if (format === 'jpg') {
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        ctx.drawImage(img, 0, 0)

        let mimeType = 'image/png'

        if (format === 'jpg') {
          mimeType = 'image/jpeg'
        }

        if (format === 'webp') {
          mimeType = 'image/webp'
        }

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              alert('Could not convert the image.')
              setConverting(false)
              return
            }

            const originalName = selectedFile.name
              .replace(/\.[^/.]+$/, '')

            const extension = format

            const file = new File(
              [blob],
              `${originalName}.${extension}`,
              {
                type: mimeType,
              }
            )

            setConvertedFile(file)
            setConverting(false)
          },
          mimeType,
          0.92
        )
      }

      img.onerror = () => {
        alert('Could not read this image.')
        setConverting(false)
      }

      img.src = event.target.result
    }

    reader.onerror = () => {
      alert('Could not read the selected file.')
      setConverting(false)
    }

    reader.readAsDataURL(selectedFile)
  }

  const downloadConvertedFile = () => {
    if (!convertedFile) return

    const url = URL.createObjectURL(convertedFile)

    const link = document.createElement('a')
    link.href = url
    link.download = convertedFile.name

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1000)
  }

  const chooseAnotherFile = () => {
    setSelectedFile(null)
    setConvertedFile(null)
    setFormat('png')
  }

  return (
    <div className="tool-page file-converter-page">

      <div className="tool-page-icon">🔄</div>

      <h2>File Converter</h2>

      <p>
        Convert images between JPG, PNG and WEBP formats.
      </p>

      {!selectedFile ? (

        <div className="file-upload-area">

          <div className="file-upload-icon">
            📁
          </div>

          <h3>Choose an image</h3>

          <p>
            JPG, PNG or WEBP
          </p>

          <label className="file-choose-button">

            Choose File

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={handleFileChange}
            />

          </label>

        </div>

      ) : (

        <div className="file-converter-content">

          <div className="selected-file-box">

            <div className="selected-file-icon">
              🖼️
            </div>

            <div className="selected-file-info">

              <strong>
                {selectedFile.name}
              </strong>

              <span>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </span>

            </div>

          </div>

          <div className="conversion-settings">

            <div className="conversion-label">
              <span>Convert to</span>

              <strong>
                {format.toUpperCase()}
              </strong>
            </div>

            <div className="format-buttons">

              <button
                type="button"
                className={
                  format === 'png'
                    ? 'active'
                    : ''
                }
                onClick={() => {
                  setFormat('png')
                  setConvertedFile(null)
                }}
              >
                PNG
              </button>

              <button
                type="button"
                className={
                  format === 'jpg'
                    ? 'active'
                    : ''
                }
                onClick={() => {
                  setFormat('jpg')
                  setConvertedFile(null)
                }}
              >
                JPG
              </button>

              <button
                type="button"
                className={
                  format === 'webp'
                    ? 'active'
                    : ''
                }
                onClick={() => {
                  setFormat('webp')
                  setConvertedFile(null)
                }}
              >
                WEBP
              </button>

            </div>

          </div>

          {!convertedFile ? (

            <button
              type="button"
              className="convert-file-button"
              onClick={convertFile}
              disabled={converting}
            >
              {converting
                ? 'Converting...'
                : '🔄 Convert File'}
            </button>

          ) : (

            <div className="conversion-complete">

              <h3>
                Conversion Complete 🎉
              </h3>

              <p>
                {convertedFile.name}
              </p>

              <p>
                Converted size:{' '}
                {(convertedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <div className="converter-result-actions">

                <button
                  type="button"
                  className="converter-download-button"
                  onClick={downloadConvertedFile}
                >
                  ⬇️ Download File
                </button>

                <button
                  type="button"
                  className="converter-another-button"
                  onClick={chooseAnotherFile}
                >
                  🔄 Convert Another
                </button>

              </div>

            </div>

          )}

        </div>

      )}

    </div>
  )
}

export default FileConverter