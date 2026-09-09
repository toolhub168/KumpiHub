import { useState } from 'react'
import { jsPDF } from 'jspdf'
import './JPGToPDF.css'

function JPGToPDF() {
  const [images, setImages] = useState([])
  const [pageSize, setPageSize] = useState('a4')
  const [orientation, setOrientation] = useState('portrait')
  const [margin, setMargin] = useState(10)
  const [status, setStatus] = useState('')

  const handleFiles = (files) => {
    const selectedFiles = Array.from(files).filter((file) =>
      file.type.startsWith('image/')
    )

    const newImages = selectedFiles.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      url: URL.createObjectURL(file),
      rotation: 0,
    }))

    setImages((prev) => [...prev, ...newImages])
    setStatus('')
  }

 const handleInputChange = (e) => {
  const files = e.target.files

  if (!files || files.length === 0) {
    return
  }

  handleFiles(files)
}

  const removeImage = (id) => {
    setImages((prev) => {
      const image = prev.find((item) => item.id === id)

      if (image) {
        URL.revokeObjectURL(image.url)
      }

      return prev.filter((item) => item.id !== id)
    })
  }

  const rotateImage = (id) => {
    setImages((prev) =>
      prev.map((image) =>
        image.id === id
          ? {
              ...image,
              rotation: (image.rotation + 90) % 360,
            }
          : image
      )
    )
  }

  const moveImage = (index, direction) => {
    setImages((prev) => {
      const newImages = [...prev]
      const newIndex = index + direction

      if (newIndex < 0 || newIndex >= newImages.length) {
        return prev
      }

      const temp = newImages[index]
      newImages[index] = newImages[newIndex]
      newImages[newIndex] = temp

      return newImages
    })
  }

  const createPDF = async () => {
    if (images.length === 0) {
      setStatus('Please choose at least one image.')
      return
    }

    try {
      setStatus('Creating PDF...')

      const pdf = new jsPDF({
        orientation,
        unit: 'mm',
        format: pageSize,
      })

      for (let i = 0; i < images.length; i++) {
        const image = images[i]

        if (i > 0) {
          pdf.addPage(pageSize, orientation)
        }

        const img = new Image()

        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = image.url
        })

        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()

        const availableWidth = pageWidth - margin * 2
        const availableHeight = pageHeight - margin * 2

        const imageRatio = img.width / img.height
        const pageRatio = availableWidth / availableHeight

        let width
        let height

        if (imageRatio > pageRatio) {
          width = availableWidth
          height = width / imageRatio
        } else {
          height = availableHeight
          width = height * imageRatio
        }

        const x = (pageWidth - width) / 2
        const y = (pageHeight - height) / 2

        if (image.rotation === 0) {
          pdf.addImage(
            img,
            'JPEG',
            x,
            y,
            width,
            height
          )
        } else {
          const canvas = document.createElement('canvas')
          const ctx = canvas.getContext('2d')

          const isRotated = image.rotation === 90 || image.rotation === 270

          canvas.width = isRotated ? img.height : img.width
          canvas.height = isRotated ? img.width : img.height

          ctx.translate(canvas.width / 2, canvas.height / 2)
          ctx.rotate((image.rotation * Math.PI) / 180)

          ctx.drawImage(
            img,
            -img.width / 2,
            -img.height / 2
          )

          const rotatedImage = canvas.toDataURL('image/jpeg', 0.92)

          pdf.addImage(
            rotatedImage,
            'JPEG',
            x,
            y,
            width,
            height
          )
        }
      }

      pdf.save('KumpiHub-JPG-to-PDF.pdf')

      setStatus('PDF created successfully.')
    } catch (error) {
      console.error(error)
      setStatus('Something went wrong while creating the PDF.')
    }
  }

  return (
    <div className="jpg-pdf-tool">

     

      <div className="jpg-pdf-workspace">

        <label className="jpg-upload-box">

          <span className="jpg-upload-icon">🖼️</span>

          <strong>
            Drop your images here
          </strong>

          <span className="jpg-upload-text">
            JPG, JPEG or PNG
          </span>

          <input
            type="file"
            accept="image/*"

            multiple
            onChange={handleInputChange}
          />

          <span className="jpg-choose-button">
            Choose Images
          </span>

        </label>

        {images.length > 0 && (
          <div className="jpg-images-section">

            <div className="jpg-images-header">
              <strong>
                Selected Images ({images.length})
              </strong>

              <label className="jpg-add-button">
                + Add More
                <input
                  type="file"
                  accept="image/*"

                  multiple
                  onChange={handleInputChange}
                />
              </label>
            </div>

            <div className="jpg-images-list">

              {images.map((image, index) => (
                <div
                  className="jpg-image-card"
                  key={image.id}
                >

                  <div className="jpg-image-number">
                    {index + 1}
                  </div>

                  <div className="jpg-preview">
                    <img
                      src={image.url}
                      alt={image.file.name}
                      style={{
                        transform: `rotate(${image.rotation}deg)`,
                      }}
                    />
                  </div>

                  <div className="jpg-image-info">
                    <strong>
                      {image.file.name}
                    </strong>

                    <span>
                      {(image.file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>

                  <div className="jpg-image-actions">

                    <button
                      type="button"
                      onClick={() => moveImage(index, -1)}
                      disabled={index === 0}
                      title="Move up"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      onClick={() => moveImage(index, 1)}
                      disabled={index === images.length - 1}
                      title="Move down"
                    >
                      ↓
                    </button>

                    <button
                      type="button"
                      onClick={() => rotateImage(image.id)}
                      title="Rotate"
                    >
                      ↻
                    </button>

                    <button
                      type="button"
                      className="jpg-remove-button"
                      onClick={() => removeImage(image.id)}
                      title="Remove"
                    >
                      ×
                    </button>

                  </div>

                </div>
              ))}

            </div>

            <div className="jpg-options">

              <div className="jpg-option">
                <label>Page Size</label>

                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(e.target.value)}
                >
                  <option value="a4">A4</option>
                  <option value="a5">A5</option>
                  <option value="letter">Letter</option>
                </select>
              </div>

              <div className="jpg-option">
                <label>Orientation</label>

                <select
                  value={orientation}
                  onChange={(e) => setOrientation(e.target.value)}
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>

              <div className="jpg-option">
                <label>Margin</label>

                <select
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                >
                  <option value="0">None</option>
                  <option value="5">Small</option>
                  <option value="10">Medium</option>
                  <option value="20">Large</option>
                </select>
              </div>

            </div>

            <button
              className="jpg-create-button"
              type="button"
              onClick={createPDF}
            >
              Create PDF
            </button>

            {status && (
              <div className="jpg-status">
                {status}
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  )
}

export default JPGToPDF