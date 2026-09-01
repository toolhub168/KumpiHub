import { useState } from 'react'

function ImageCompressor() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [quality, setQuality] = useState(80)
  const [compressedImage, setCompressedImage] = useState(null)

  const compressImage = () => {
    if (!selectedImage) {
      alert('Please choose an image first.')
      return
    }

    const reader = new FileReader()

    reader.onload = (event) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        canvas.width = img.width
        canvas.height = img.height

        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (!blob) return

            const file = new File(
              [blob],
              'compressed-image.jpg',
              {
                type: 'image/jpeg',
              }
            )

            setCompressedImage(file)
          },
          'image/jpeg',
          Number(quality) / 100
        )
      }

      img.src = event.target.result
    }

    reader.readAsDataURL(selectedImage)
  }

  const chooseAnotherImage = () => {
    setSelectedImage(null)
    setCompressedImage(null)
    setQuality(80)
  }

  const downloadCompressedImage = () => {
    if (!compressedImage) return

    const url = URL.createObjectURL(compressedImage)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', compressedImage.name)

    link.style.display = 'none'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1000)
  }

  return (
    <div className="selected-tool">

      <div className="tool-icon">🖼️</div>

      <h2>Image Compressor</h2>

      <p className="tool-subtitle">
        Compress your images while keeping great quality.
      </p>

      <div className="upload-area">

        {!selectedImage ? (

          <>
            <div className="upload-icon">☁️</div>

            <h3>Upload your image</h3>

            <p>
              Drag & drop your image here or choose a file
            </p>

            <label className="upload-button">
              Choose Image

              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0]

                  if (file) {
                    setSelectedImage(file)
                    setCompressedImage(null)
                  }
                }}
              />
            </label>

            <small>
              JPG, PNG, WEBP • Max 10MB
            </small>
          </>

        ) : (

          <>
            <div className="image-preview">

              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Selected preview"
              />

              <p>{selectedImage.name}</p>

              <p>
                Original size:{' '}
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>

            </div>

            <div className="quality-control">

              <div className="quality-header">
                <span>Compression Quality</span>
                <strong>{quality}%</strong>
              </div>

              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              />

              <button
                className="compress-button"
                onClick={
                  compressedImage
                    ? chooseAnotherImage
                    : compressImage
                }
              >
                {compressedImage
                  ? 'Choose Another Image'
                  : 'Compress Image'}
              </button>

            </div>

            {compressedImage && (

              <div className="compressed-result">

                <h3>Compression Complete 🎉</h3>

                <p>
                  Compressed size:{' '}
                  {(compressedImage.size / 1024 / 1024).toFixed(2)} MB
                </p>

                <button
                  className="download-button"
                  onClick={downloadCompressedImage}
                >
                  Download Image
                </button>

              </div>

            )}

          </>

        )}

      </div>

    </div>
  )
}

export default ImageCompressor