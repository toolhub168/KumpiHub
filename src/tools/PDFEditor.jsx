import { useEffect, useRef, useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { jsPDF } from 'jspdf'
import './PDFEditor.css'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

function PDFEditor() {
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfPages, setPdfPages] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const [objects, setObjects] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  const [zoom, setZoom] = useState(100)

  const [signatureOpen, setSignatureOpen] = useState(false)
  const [signatureDrawing, setSignatureDrawing] = useState(false)

  const pdfInputRef = useRef(null)
  const photoInputRef = useRef(null)
  const signatureCanvasRef = useRef(null)
  const interactionRef = useRef(null)

  /* =========================
     PDF UPLOAD
  ========================= */

  const handlePDFChange = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    setPdfFile(file)
    setObjects([])
    setSelectedId(null)
    setCurrentPage(1)

    const arrayBuffer = await file.arrayBuffer()
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

    const pages = []

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber)

      const viewport = page.getViewport({ scale: 1.5 })

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')

      canvas.width = viewport.width
      canvas.height = viewport.height

      await page.render({
        canvasContext: context,
        viewport,
      }).promise

      pages.push({
        pageNumber,
        image: canvas.toDataURL('image/jpeg', 0.92),
        width: viewport.width,
        height: viewport.height,
      })
    }

    setPdfPages(pages)
  }

  /* =========================
     ADD PHOTO
  ========================= */

  const handleAddPhoto = () => {
    photoInputRef.current?.click()
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const newObject = {
        id: crypto.randomUUID(),
        type: 'photo',
        page: currentPage,
        src: reader.result,
        x: 80,
        y: 80,
        width: 180,
        height: 130,
      }

      setObjects((prev) => [...prev, newObject])
      setSelectedId(newObject.id)
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  /* =========================
     ADD TEXT
  ========================= */

  const handleAddText = () => {
  const newObject = {
    id: crypto.randomUUID(),
    type: 'text',
    page: currentPage,
    text: '',
    x: 80,
    y: 80,
    width: 170,
    height: 27,
    fontSize: 25,
  }

  setObjects((prev) => [...prev, newObject])
  setSelectedId(newObject.id)
}

  /* =========================
     SIGNATURE
  ========================= */

  const openSignature = () => {
    setSignatureOpen(true)

    setTimeout(() => {
      const canvas = signatureCanvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.lineWidth = 3
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.strokeStyle = '#111827'
    }, 50)
  }

  const getCanvasPosition = (event) => {
    const canvas = signatureCanvasRef.current
    const rect = canvas.getBoundingClientRect()

    return {
      x: ((event.clientX - rect.left) / rect.width) * canvas.width,
      y: ((event.clientY - rect.top) / rect.height) * canvas.height,
    }
  }

  const startSignature = (event) => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const position = getCanvasPosition(event)

    setSignatureDrawing(true)

    ctx.beginPath()
    ctx.moveTo(position.x, position.y)
  }

  const drawSignature = (event) => {
    if (!signatureDrawing) return

    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const position = getCanvasPosition(event)

    ctx.lineTo(position.x, position.y)
    ctx.stroke()
  }

  const stopSignature = () => {
    setSignatureDrawing(false)
  }

  const clearSignature = () => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const saveSignature = () => {
    const canvas = signatureCanvasRef.current
    if (!canvas) return

    const image = canvas.toDataURL('image/png')

    const newObject = {
      id: crypto.randomUUID(),
      type: 'signature',
      page: currentPage,
      src: image,
      x: 80,
      y: 80,
      width: 220,
      height: 100,
    }

    setObjects((prev) => [...prev, newObject])
    setSelectedId(newObject.id)
    setSignatureOpen(false)
  }

  /* =========================
     SELECT / DESELECT
  ========================= */

  const selectObject = (event, id) => {
    event.stopPropagation()
    setSelectedId(id)
  }

  const deselect = () => {
    setSelectedId(null)
  }

  /* =========================
     MOVE
  ========================= */

  const startMove = (event, object) => {
    event.stopPropagation()

    setSelectedId(object.id)

    const pageElement = event.currentTarget.closest('.pdf-editor-page')

    if (!pageElement) return

    const rect = pageElement.getBoundingClientRect()

    interactionRef.current = {
      mode: 'move',
      id: object.id,
      startX: event.clientX,
      startY: event.clientY,
      originalX: object.x,
      originalY: object.y,
      scaleX: rect.width / object.pageWidth || 1,
      scaleY: rect.height / object.pageHeight || 1,
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  /* =========================
     RESIZE
  ========================= */

  const startResize = (event, object, handle) => {
    event.stopPropagation()

    setSelectedId(object.id)

    const pageElement = event.currentTarget.closest('.pdf-editor-page')

    if (!pageElement) return

    const rect = pageElement.getBoundingClientRect()

    interactionRef.current = {
      mode: 'resize',
      id: object.id,
      handle,
      startX: event.clientX,
      startY: event.clientY,
      originalX: object.x,
      originalY: object.y,
      originalWidth: object.width,
      originalHeight: object.height,
      scaleX: rect.width / object.pageWidth || 1,
      scaleY: rect.height / object.pageHeight || 1,
    }

    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  useEffect(() => {
    const handlePointerMove = (event) => {
      const interaction = interactionRef.current
      if (!interaction) return

      const dx = (event.clientX - interaction.startX) / interaction.scaleX
      const dy = (event.clientY - interaction.startY) / interaction.scaleY

      setObjects((prev) =>
        prev.map((object) => {
          if (object.id !== interaction.id) return object

          if (interaction.mode === 'move') {
            return {
              ...object,
              x: interaction.originalX + dx,
              y: interaction.originalY + dy,
            }
          }

          let newX = interaction.originalX
          let newY = interaction.originalY
          let newWidth = interaction.originalWidth
          let newHeight = interaction.originalHeight

          if (interaction.handle.includes('right')) {
            newWidth = Math.max(40, interaction.originalWidth + dx)
          }

          if (interaction.handle.includes('left')) {
            newWidth = Math.max(40, interaction.originalWidth - dx)
            newX = interaction.originalX + dx
          }

          if (interaction.handle.includes('bottom')) {
            newHeight = Math.max(30, interaction.originalHeight + dy)
          }

          if (interaction.handle.includes('top')) {
            newHeight = Math.max(30, interaction.originalHeight - dy)
            newY = interaction.originalY + dy
          }

          if (object.type === 'text') {
            const ratio = newWidth / interaction.originalWidth

            return {
              ...object,
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight,
              fontSize: Math.max(10, object.fontSize * ratio),
            }
          }

          return {
            ...object,
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
          }
        })
      )
    }

    const handlePointerUp = () => {
      interactionRef.current = null
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [])

  /* =========================
     DELETE
  ========================= */

  const deleteSelected = (event, id) => {
    event.stopPropagation()

    setObjects((prev) => prev.filter((object) => object.id !== id))
    setSelectedId(null)
  }

  /* =========================
     ZOOM
  ========================= */

  const zoomOut = () => {
    setZoom((value) => Math.max(50, value - 25))
  }

  const zoomIn = () => {
    setZoom((value) => Math.min(200, value + 25))
  }

  /* =========================
     DOWNLOAD PDF
  ========================= */

  const loadImage = (src) =>
    new Promise((resolve, reject) => {
      const image = new Image()

      image.onload = () => resolve(image)
      image.onerror = reject

      image.src = src
    })

  const downloadPDF = async () => {
    if (!pdfPages.length) return

    const firstPage = pdfPages[0]

    const pdf = new jsPDF({
      orientation:
        firstPage.width > firstPage.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [firstPage.width, firstPage.height],
      hotfixes: ['px_scaling'],
    })

    for (let index = 0; index < pdfPages.length; index++) {
      const page = pdfPages[index]

      if (index > 0) {
        pdf.addPage(
          [page.width, page.height],
          page.width > page.height ? 'landscape' : 'portrait'
        )
      }

      pdf.addImage(
        page.image,
        'JPEG',
        0,
        0,
        page.width,
        page.height
      )

      const pageObjects = objects.filter(
        (object) => object.page === page.pageNumber
      )

      for (const object of pageObjects) {
        if (object.type === 'photo' || object.type === 'signature') {
          pdf.addImage(
            object.src,
            'PNG',
            object.x,
            object.y,
            object.width,
            object.height
          )
        }

        if (object.type === 'text') {
          pdf.setTextColor(17, 24, 39)
          pdf.setFontSize(object.fontSize)

          pdf.text(
            object.text,
            object.x,
            object.y + object.fontSize
          )
        }
      }
    }

    const originalName =
      pdfFile?.name?.replace(/\.pdf$/i, '') || 'edited-document'

    pdf.save(`${originalName}-edited.pdf`)
  }

  const currentPageData = pdfPages[currentPage - 1]

  return (
    <div className="pdf-editor">
     

      <div className="pdf-editor-toolbar">
        <button
          type="button"
          className="pdf-editor-tool-button"
          onClick={() => pdfInputRef.current?.click()}
        >
          📄 Upload PDF
        </button>

        <input
          ref={pdfInputRef}
          type="file"
          accept="application/pdf"
          onChange={handlePDFChange}
          hidden
        />

        <button
          type="button"
          className="pdf-editor-tool-button"
          onClick={handleAddPhoto}
          disabled={!pdfPages.length}
        >
          🖼️ Photo
        </button>

        <input
          ref={photoInputRef}
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          hidden
        />

        <button
          type="button"
          className="pdf-editor-tool-button"
          onClick={handleAddText}
          disabled={!pdfPages.length}
        >
          T Text
        </button>

        <button
          type="button"
          className="pdf-editor-tool-button"
          onClick={openSignature}
          disabled={!pdfPages.length}
        >
          ✍ Signature
        </button>

        
      </div>

      {!pdfPages.length && (
        <div className="pdf-editor-empty">
          <div className="pdf-editor-empty-icon">📄</div>

          <h3>Upload a PDF to start editing</h3>

          <p>
            Add photos, text and signatures without changing
            the original PDF text.
          </p>

          <button
            type="button"
            onClick={() => pdfInputRef.current?.click()}
          >
            Choose PDF
          </button>
        </div>
      )}

      {pdfPages.length > 0 && (
        <>
          <div className="pdf-editor-controls">
  <div className="pdf-editor-page-navigation">
    <button
      type="button"
      onClick={() =>
        setCurrentPage((page) => Math.max(1, page - 1))
      }
      disabled={currentPage === 1}
    >
      ←
    </button>

    <span>
      Page {currentPage} / {pdfPages.length}
    </span>

    <button
      type="button"
      onClick={() =>
        setCurrentPage((page) =>
          Math.min(pdfPages.length, page + 1)
        )
      }
      disabled={currentPage === pdfPages.length}
    >
      →
    </button>
  </div>

  <div className="pdf-editor-zoom">
    <button
      type="button"
      onClick={zoomOut}
      disabled={zoom <= 50}
    >
      −
    </button>

    <span>{zoom}%</span>

    <button
      type="button"
      onClick={zoomIn}
      disabled={zoom >= 200}
    >
      +
    </button>
  </div>
</div>

          <div className="pdf-editor-canvas-wrapper">
            <div
              className="pdf-editor-page"
              style={{
                width: currentPageData.width,
                height: currentPageData.height,
                transform: `scale(${zoom / 100})`,
              }}
              onPointerDown={deselect}
            >
              <img
                src={currentPageData.image}
                alt={`PDF page ${currentPage}`}
                className="pdf-editor-page-image"
                draggable="false"
              />

              {objects
                .filter((object) => object.page === currentPage)
                .map((object) => {
                  const isSelected = selectedId === object.id

                  return (
                    <div
                      key={object.id}
                      className={`pdf-editor-object ${
                        isSelected ? 'selected' : ''
                      }`}
                      style={{
                        left: object.x,
                        top: object.y,
                        width: object.width,
                        height: object.height,
                      }}
                      onPointerDown={(event) =>
                        selectObject(event, object.id)
                      }
                    >
                      {object.type === 'photo' && (
                        <img
                          src={object.src}
                          alt="Added"
                          className="pdf-editor-object-image"
                          draggable="false"
                          onPointerDown={(event) =>
                            startMove(event, object)
                          }
                        />
                      )}

                      {object.type === 'signature' && (
                        <img
                          src={object.src}
                          alt="Signature"
                          className="pdf-editor-object-image signature-image"
                          draggable="false"
                          onPointerDown={(event) =>
                            startMove(event, object)
                          }
                        />
                      )}

                     {object.type === 'text' && (
  <textarea
    className="pdf-editor-text-object"
    value={object.text}
    autoFocus
    placeholder="Type text..."
    style={{
      fontSize: object.fontSize,
    }}
    onChange={(event) => {
      const value = event.target.value

      setObjects((prev) =>
        prev.map((item) =>
          item.id === object.id
            ? {
                ...item,
                text: value,
              }
            : item
        )
      )
    }}
    onPointerDown={(event) => {
      event.stopPropagation()
      setSelectedId(object.id)
      startMove(event, object)
    }}
  />
)}

                      {isSelected && (
                        <>
                          <button
                            type="button"
                            className="pdf-editor-delete"
                            onPointerDown={(event) =>
                              event.stopPropagation()
                            }
                            onClick={(event) =>
                              deleteSelected(event, object.id)
                            }
                            aria-label="Delete"
                          >
                            ×
                          </button>

                          <span
                            className="resize-handle top-right"
                            onPointerDown={(event) =>
                              startResize(
                                event,
                                object,
                                'top-right'
                              )
                            }
                          />

                          <span
                            className="resize-handle bottom-left"
                            onPointerDown={(event) =>
                              startResize(
                                event,
                                object,
                                'bottom-left'
                              )
                            }
                          />

                          <span
                            className="resize-handle bottom-right"
                            onPointerDown={(event) =>
                              startResize(
                                event,
                                object,
                                'bottom-right'
                              )
                            }
                          />
                        </>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>

         <div className="pdf-editor-download-area">
  <button
    type="button"
    className="pdf-editor-download"
    onClick={downloadPDF}
    disabled={!pdfPages.length}
  >
    Download PDF
  </button>
</div>
        </>
      )}

      {signatureOpen && (
        <div className="signature-modal">
          <div className="signature-modal-content">
            <div className="signature-modal-header">
              <h3>Draw Signature</h3>

              <button
                type="button"
                onClick={() => setSignatureOpen(false)}
              >
                ×
              </button>
            </div>

            <canvas
              ref={signatureCanvasRef}
              width={700}
              height={250}
              className="signature-canvas"
              onPointerDown={startSignature}
              onPointerMove={drawSignature}
              onPointerUp={stopSignature}
              onPointerLeave={stopSignature}
            />

            <div className="signature-actions">
              <button
                type="button"
                onClick={clearSignature}
              >
                Clear
              </button>

              <button
                type="button"
                onClick={saveSignature}
              >
                Add Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PDFEditor