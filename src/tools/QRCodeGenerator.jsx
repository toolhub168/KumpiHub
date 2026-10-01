import { useState } from 'react'
import QRCode from 'qrcode'
import './QRCodeGenerator.css'

function QRCodeGenerator() {
  const [text, setText] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [copied, setCopied] = useState(false)

  const [qrColor, setQrColor] = useState('#000000')
  const [logo, setLogo] = useState(null)
  const [logoPreview, setLogoPreview] = useState('')

  const generateQRCode = async () => {
    if (!text.trim()) {
      alert('Please enter a URL or text first.')
      return
    }

    try {
      const canvas = document.createElement('canvas')

      await QRCode.toCanvas(canvas, text.trim(), {
        width: 300,
        margin: 2,
        errorCorrectionLevel: 'H',
        color: {
          dark: qrColor,
          light: '#ffffff',
        },
      })

      if (logoPreview) {
        const ctx = canvas.getContext('2d')

        const image = new Image()

        image.onload = () => {
          const logoSize = 65
          const x = (canvas.width - logoSize) / 2
          const y = (canvas.height - logoSize) / 2

          // White background behind logo
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(
            x - 6,
            y - 6,
            logoSize + 12,
            logoSize + 12
          )

          // Draw logo
          ctx.drawImage(
            image,
            x,
            y,
            logoSize,
            logoSize
          )

          setQrCode(canvas.toDataURL('image/png'))
          setCopied(false)
        }

        image.src = logoPreview
      } else {
        setQrCode(canvas.toDataURL('image/png'))
        setCopied(false)
      }
    } catch (error) {
      console.error('QR Code generation failed:', error)
      alert('Could not generate QR code')
    }
  }

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setLogo(file)
      setLogoPreview(reader.result)
      setQrCode('')
      setCopied(false)
    }

    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogo(null)
    setLogoPreview('')
    setQrCode('')
    setCopied(false)
  }

  const downloadQRCode = () => {
    if (!qrCode) return

    const link = document.createElement('a')

    link.href = qrCode
    link.download = 'kumpihub-qr-code.png'

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
    setQrColor('#000000')
    setLogo(null)
    setLogoPreview('')
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

     <div className="qr-customize">

  <div className="qr-color-control">
    <label htmlFor="qr-color">
      QR Color
    </label>

    <input
      id="qr-color"
      type="color"
      value={qrColor}
      onChange={(e) => {
        setQrColor(e.target.value)
        setQrCode('')
        setCopied(false)
      }}
    />
  </div>

  <div className="qr-logo-control">
    <label htmlFor="qr-logo">
      QR Logo
    </label>

    {!logoPreview ? (
      <label
        htmlFor="qr-logo"
        className="qr-logo-upload"
      >
        🖼️
      </label>
    ) : (
      <div className="qr-logo-selected">
        <img
          src={logoPreview}
          alt="Logo preview"
        />

        <button
          type="button"
          onClick={removeLogo}
        >
          Remove
        </button>
      </div>
    )}

    <input
      id="qr-logo"
      type="file"
      accept="image/png,image/jpeg,image/webp"
      onChange={handleLogoChange}
      hidden
    />
  </div>

</div>


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
