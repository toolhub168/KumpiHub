import { useState } from 'react'
import * as pdfjsLib from 'pdfjs-dist'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'
import './PDFToDOCX.css'

pdfjsLib.GlobalWorkerOptions.workerSrc =
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

function PDFToDOCX() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('')
  const [converting, setConverting] = useState(false)

  const handleFile = (selectedFile) => {
    if (!selectedFile) return

    if (selectedFile.type !== 'application/pdf') {
      setStatus('Please select a PDF file.')
      return
    }

    setFile(selectedFile)
    setStatus('')
  }

  const handleInputChange = (e) => {
    handleFile(e.target.files[0])
  }

  const convertToDOCX = async () => {
    if (!file) return

    try {
      setConverting(true)
      setStatus('Reading PDF...')

      const arrayBuffer = await file.arrayBuffer()

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
      }).promise

      const paragraphs = []

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        setStatus(`Reading page ${pageNumber} of ${pdf.numPages}...`)

        const page = await pdf.getPage(pageNumber)
        const textContent = await page.getTextContent()

        const text = textContent.items
          .map((item) => item.str)
          .join(' ')

        if (text.trim()) {
          paragraphs.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: text.trim(),
                  size: 22,
                }),
              ],
              spacing: {
                after: 200,
              },
            })
          )
        }

        if (pageNumber < pdf.numPages) {
          paragraphs.push(
            new Paragraph({
              text: '',
              pageBreakBefore: true,
            })
          )
        }
      }

      if (paragraphs.length === 0) {
        setStatus('No readable text was found in this PDF.')
        setConverting(false)
        return
      }

      setStatus('Creating DOCX...')

      const document = new Document({
        sections: [
          {
            children: paragraphs,
          },
        ],
      })

      const blob = await Packer.toBlob(document)

      const outputName = file.name.replace(/\.pdf$/i, '') + '.docx'

      saveAs(blob, outputName)

      setStatus('Conversion completed successfully.')
    } catch (error) {
      console.error(error)
      setStatus('Something went wrong while converting the PDF.')
    } finally {
      setConverting(false)
    }
  }

  return (
    <div className="pdf-docx-tool">
     

      <div className="pdf-docx-workspace">
        <label className="pdf-upload-box">
          <span className="pdf-upload-icon">📄</span>
          <strong>
            {file ? file.name : 'Drop your PDF here'}
          </strong>

          <span className="pdf-upload-text">
            {file
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
              : 'or choose a PDF file'}
          </span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleInputChange}
          />

          <span className="pdf-choose-button">
            Choose PDF
          </span>
        </label>

        {file && (
          <div className="pdf-file-info">
            <div>
              <strong>Selected file</strong>
              <p>{file.name}</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null)
                setStatus('')
              }}
            >
              Remove
            </button>
          </div>
        )}

        <button
          className="pdf-convert-button"
          type="button"
          onClick={convertToDOCX}
          disabled={!file || converting}
        >
          {converting ? 'Converting...' : 'Convert to DOCX'}
        </button>

        {status && (
          <div className="pdf-status">
            {status}
          </div>
        )}
      </div>
    </div>
  )
}

export default PDFToDOCX