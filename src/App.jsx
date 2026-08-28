import { useState } from 'react'
import './AppV2.css'


import VideoDownloader from './tools/VideoDownloader'
import PDFTools from './tools/PDFTools'
import ImageResizer from './tools/ImageResizer'
import URLShortener from './tools/URLShortener'
import PasswordGenerator from './tools/PasswordGenerator'
import TextTools from './tools/TextTools'
import ColorPicker from './tools/ColorPicker'
import QRCodeGenerator from './tools/QRCodeGenerator'
import FileConverter from './tools/FileConverter'
import URLRedirect from './URLRedirect'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
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

  const [selectedTool, setSelectedTool] = useState(null)
  const tools = [
    {
      icon: '📥',
      name: 'Video Downloader',
      description: 'Download videos from supported platforms.',
    },
    {
      icon: '🖼️',
      name: 'Image Compressor',
      description: 'Compress images without losing quality.',
    },
    {
      icon: '✂️',
      name: 'Image Resizer',
      description: 'Resize images to any size you need.',
    },
    {
      icon: '📄',
      name: 'PDF Tools',
      description: 'Merge, split, convert and compress PDF files.',
    },
    {
      icon: '🔗',
      name: 'URL Shortener',
      description: 'Shorten long URLs and track clicks.',
    },
    {
      icon: '🔤',
      name: 'Text Tools',
      description: 'Format, analyze and transform your text.',
    },
    {
      icon: '🔄',
      name: 'File Converter',
      description: 'Convert files between common formats.',
    },
    {
      icon: '🎨',
      name: 'Color Picker',
      description: 'Pick colors and get HEX codes.',
    },
    {
      icon: '🔐',
      name: 'Password Generator',
      description: 'Generate strong and secure passwords.',
    },
    {
      icon: '▦',
      name: 'QR Code Generator',
      description: 'Create QR codes for links and text.',
    },
  ]
const filteredTools = tools.filter((tool) =>
  (tool.name + ' ' + tool.description)
    .toLowerCase()
    .includes(searchTerm.toLowerCase())
)
if (window.location.pathname.startsWith('/s/')) {
  return <URLRedirect />
}
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span>KumpiHub</span>
        </div>

        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#tools">Tools</a>
          <a href="#about">About</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="bookmark-button">★ Bookmark</button>
        <button className="menu-button">☰</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-badge">● 10+ FREE ONLINE TOOLS</div>

          <h1>
            All the tools you need,
            <span> in one place.</span>
          </h1>

          <p>
            Free, fast and easy-to-use online tools that make
            <br className="desktop-break" />
            your daily tasks simpler and smarter.
          </p>

          <div className="search-box">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search for a tool..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setSearchTerm(searchTerm)}>
  Search
</button>
          </div>

          <div className="features">
            <div>✓ <span>100% Free</span></div>
            <div>♙ <span>No Sign Up</span></div>
            <div>◈ <span>Secure & Fast</span></div>
            <div>▣ <span>Works on All Devices</span></div>
          </div>
        </section>
         {selectedTool ? (
  <div className="tool-workspace">

  <div className="tool-workspace-card">

    <div className="tool-workspace-header">

      <button
        className="back-to-tools"
        onClick={() => setSelectedTool(null)}
      >
        ← Back to Tools
      </button>

    </div>

    <div className="tool-workspace-content">

  {selectedTool === 'Video Downloader' ? (

    <VideoDownloader />

  ) : selectedTool === 'Image Compressor' ? (

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
                onChange={(e) => setSelectedImage(e.target.files[0])}
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

  ) : selectedTool === 'PDF Tools' ? (

    <PDFTools />
  ) : selectedTool === 'Image Resizer' ? (
    <ImageResizer />
  ) : selectedTool === 'URL Shortener' ? (
    <URLShortener />

  ) : selectedTool === 'Password Generator' ? (
  <PasswordGenerator />

) : selectedTool === 'Text Tools' ? (
  <TextTools />

) : selectedTool === 'Color Picker' ? (
  <ColorPicker />

) : selectedTool === 'QR Code Generator' ? (
  <QRCodeGenerator />

) : selectedTool === 'File Converter' ? (
  <FileConverter />

  ) : (

    <div className="selected-tool">

      <div className="tool-icon">🧰</div>

      <h2>{selectedTool}</h2>

      <p>Tool UI coming soon.</p>

    </div>

  )}
  </div>
 </div>
</div>
         ) : null}

        <section className="tools-section" id="tools">
          <div className="section-title">
            <div className="section-badge">● FEATURED TOOLS</div>
            <h2>Popular Tools</h2>
            <p>Choose from our most popular tools below</p>
          </div>

          <div className="tools-grid">
            {filteredTools.map((tool) => (
  <article
    className="tool-card"
    key={tool.name}
    onClick={() => setSelectedTool(tool.name)}
  >
    <div className="tool-icon">{tool.icon}</div>

    <h3>{tool.name}</h3>

    <p>{tool.description}</p>

    <button
      className="open-tool"
      onClick={(e) => {
        e.stopPropagation()
        setSelectedTool(tool.name)
      }}
    >
      Open Tool →
    </button>
  </article>
))}
          </div>
        </section>

        <section className="coming-soon">
          <div className="coming-icon">🧰</div>

          <div>
            <h2>More tools coming soon!</h2>
            <p>
              We're constantly adding new and useful tools
              to make your life easier.
            </p>
          </div>

          <button>☆ Stay Updated</button>
        </section>
      </main>

      <footer id="about">
        <div className="footer-brand">
          <h2>⚡ KumpiHub</h2>
          <p>Your all-in-one free online tools hub.</p>
          <p>Simple. Fast. Useful.</p>
        </div>

        <div>
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>All Tools</p>
          <p>About Us</p>
          <p>Contact</p>
        </div>

        <div>
          <h3>Support</h3>
          <p>Help Center</p>
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Disclaimer</p>
        </div>

        <div>
          <h3>Subscribe</h3>
          <p>Get updates about new tools and features.</p>

          <div className="subscribe">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
