import { useState } from 'react'

function ImageResizer() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [width, setWidth] = useState('')
const [height, setHeight] = useState('')
const [resizedImage, setResizedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (!file) return

    setSelectedImage(file)
  }
  const resizeImage = () => {
  if (!selectedImage) return

  if (!width || !height) {
    alert('Please enter width and height')
    return
  }

  const image = new Image()

  image.onload = () => {
    const canvas = document.createElement('canvas')

    canvas.width = Number(width)
    canvas.height = Number(height)

    const context = canvas.getContext('2d')

    context.drawImage(
      image,
      0,
      0,
      Number(width),
      Number(height)
    )

    canvas.toBlob(
      (blob) => {
        if (!blob) return

        const resizedFile = new File(
          [blob],
          `resized-${selectedImage.name}`,
          {
            type: selectedImage.type,
          }
        )

        setResizedImage(resizedFile)
      },
      selectedImage.type,
      0.9
    )
  }

  image.src = URL.createObjectURL(selectedImage)
}

  return (
    <div className="selected-tool">

      <div className="tool-icon">🖼️</div>

      <h2>Image Resizer</h2>

      <p className="tool-subtitle">
        Resize your images to any dimensions.
      </p>

      <div className="upload-area">

        {!selectedImage ? (

          <>
            <div className="upload-icon">🖼️</div>

            <h3>Upload your image</h3>

            <p>
              Choose an image to resize
            </p>

            <label className="upload-button">
              Choose Image

              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                hidden
                onChange={handleImageChange}
              />
            </label>

            <small>
              JPG, PNG, WEBP • Max 10MB
            </small>
          </>

        ) : (

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
            <div className="resize-controls">

  <div className="resize-input">

    <label>Width</label>

    <input
      type="number"
      placeholder="Width"
      min="1"
      value={width}
      onChange={(e) => setWidth(e.target.value)}
    />

  </div>

  <div className="resize-input">

    <label>Height</label>

    <input
      type="number"
      placeholder="Height"
      min="1"
      value={height}
      onChange={(e) => setHeight(e.target.value)}
    />

  </div>

</div>

<button className="compress-button"
onClick={resizeImage}
>
  Resize Image
</button>
{resizedImage && (
  <div className="compressed-result">

    <h3>Resize Complete 🎉</h3>

    <p>
      Resized size:{' '}
      {(resizedImage.size / 1024 / 1024).toFixed(2)} MB
    </p>

    <button
      className="download-button"
      onClick={() => {
        const url = URL.createObjectURL(resizedImage)

        const link = document.createElement('a')
        link.href = url
        link.download = resizedImage.name

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => {
          URL.revokeObjectURL(url)
        }, 100)
      }}
    >
      Download Image
    </button>

  </div>
)}

          </div>

        )}

      </div>

    </div>
  )
}

export default ImageResizer