import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function PDFTools() {
  const [selectedFiles, setSelectedFiles] = useState([])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
  }
  const mergePDFs = async () => {
  if (selectedFiles.length < 2) {
    alert('Please choose at least 2 PDF files.')
    return
  }

  const mergedPdf = await PDFDocument.create()

  for (const file of selectedFiles) {
    const fileBytes = await file.arrayBuffer()
    const pdf = await PDFDocument.load(fileBytes)

    const pages = await mergedPdf.copyPages(
      pdf,
      pdf.getPageIndices()
    )

    pages.forEach((page) => {
      mergedPdf.addPage(page)
    })
  }

  const mergedPdfBytes = await mergedPdf.save()

  const blob = new Blob(
    [mergedPdfBytes],
    { type: 'application/pdf' }
  )

  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'merged-document.pdf'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  setTimeout(() => {
    URL.revokeObjectURL(url)
  }, 1000)
}

  return (
    <div className="selected-tool">

      <div className="tool-icon">📄</div>

      <h2>PDF Tools</h2>

      <p className="tool-subtitle">
        Manage and work with your PDF files easily.
      </p>

      <div className="upload-area">

        <div className="upload-icon">📁</div>

        <h3>Choose your PDF files</h3>

        <p>
          Select one or more PDF files
        </p>

        <label className="upload-button">
          Choose PDF Files

          <input
            type="file"
            accept=".pdf"
            multiple
            hidden
            onChange={handleFileChange}
          />
        </label>

        {selectedFiles.length > 0 && (
          <div className="pdf-file-list">

            <p>
              Selected: {selectedFiles.length} file
              {selectedFiles.length > 1 ? 's' : ''}
            </p>

            {selectedFiles.map((file, index) => (
              <div key={index} className="pdf-file">
                📄 {file.name}
              </div>
            ))}

            <button
  className="compress-button"
  onClick={mergePDFs}
>
  Merge PDF
</button>

          </div>
        )}

        <small>
          PDF files only
        </small>

      </div>

    </div>
  )
}

export default PDFTools