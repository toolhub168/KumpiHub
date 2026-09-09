import { useState } from 'react'
import QRCode from 'qrcode'

function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [copied, setCopied] = useState(false)

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert('Please enter a URL or text first.')
      return
    }

    try {
      const dataUrl = await QRCode.toDataURL(text.trim(), {
        width: 300,
        margin: 2,
        errorCorrectionLevel: 'M',
      })

      setQrCode(dataUrl)
      setCopied(false)
    } catch (error) {
      console.error('QR Code generation failed:', error)
      alert('Could not generate QR code')
    }
  }

  const downloadQRCode = () => {
    if (!qrCode) return

    const link = document.createElement('a')

    link.href = qrCode
    link.download = 'toolhub-qr-code.png'

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyQRCode = async () => {
    if (!qrCode) return

    try {
      const response = await fetch(qrCode)
      const blob = await response.blob()

      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
        }),
      ])

      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3500)
    } catch (error) {
      console.error('Copy failed:', error)

      alert(
        'Copy is not supported on this browser. Please download the QR code instead.'
      )
    }
  }

  const clearQRCode = () => {
    setText('')
    setQrCode('')
    setCopied(false)
  }

  return (
    <div className="tool-page qr-code-page">

      

      <textarea
        className="qr-input"
        placeholder="Enter URL or text here..."
        value={text}
        onChange={(e) => {
          setText(e.target.value)
          setQrCode('')
          setCopied(false)
        }}
      />

      <button
        type="button"
        className="qr-generate-button"
        onClick={generateQRCode}
      >
        ⚡ Generate QR Code
      </button>

      {qrCode && (
        <div className="qr-result">

          <h3>QR Code Ready 🎉</h3>

          <div className="qr-preview">
            <img
              src={qrCode}
              alt="Generated QR Code"
            />
          </div>

          <div className="qr-actions">

            <button
              type="button"
              onClick={copyQRCode}
            >
              {copied
                ? '✓ Copied'
                : '📋 Copy QR'}
            </button>

            <button
              type="button"
              onClick={downloadQRCode}
            >
              ⬇️ Download PNG
            </button>

          </div>

          <button
            type="button"
            className="qr-clear-button"
            onClick={clearQRCode}
          >
            🗑️ Create Another
          </button>

        </div>
      )}

    </div>
  )
}

export default QRCodeGenerator