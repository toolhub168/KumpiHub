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
import NameGenerator from './tools/NameGenerator'
import JSONFormatter from './tools/JSONFormatter'
import UnitConverter from './tools/UnitConverter'
import LoanCalculator from './tools/LoanCalculator'
import CurrencyConverter from './tools/CurrencyConverter'
import PercentageCalculator from './tools/PercentageCalculator'
import InvoiceGenerator from './tools/InvoiceGenerator'
import ImageCompressor from './tools/ImageCompressor'
import PDFEditor from './tools/PDFEditor'
// import PDFToDOCX from './tools/PDFToDOCX'
import JPGToPDF from './tools/JPGToPDF'
import URLRedirect from './URLRedirect'
import LandingPage from './pages/LandingPage'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
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
    {
      icon: '🏷️',
      name: 'Name Generator',
      description: 'Generate unique names for usernames, gaming, business and creators.',
    },
    {
     icon: '📋',
     name: 'JSON Formatter',
     description: 'Format, validate and beautify JSON data.',
    },
    {
     icon: '🔄',
     name: 'Unit Converter',
     description: 'Convert length, weight, temperature and time units.',
    },
    {
     icon: '🏦',
     name: 'Loan Calculator',
     description: 'Calculate monthly payments, interest and repayment schedule.',
    },
    {
     icon: '💱',
     name: 'Currency Converter',
     description: 'Convert currencies using the latest available exchange rates.',
    },
    {
      icon: '📊',
      name: 'Percentage Calculator',
      description: 'Calculate percentages changes, increases and decreases easily.',
    },
    {
      icon: '🧾',
      name: 'Invoice Generator',
      description: 'Create professional invoices quickly and download them as PDF.',
    },
    {
     icon: '📄',
     name: 'PDF Editor',
     description: 'Edit PDF files with text, images, signatures, shapes and highlights.',
    },
    {
     icon: '📄',
     name: 'PDF to DOCX',
     description: 'Convert PDF files into editable Word documents.',
    },
    {
     icon: '🖼️',
     name: 'JPG to PDF',
     description: 'Convert multiple images into a PDF document.',
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
if (window.location.pathname.startsWith('/tools/')) {
  return <LandingPage />
}
const path = window.location.pathname

  if (path.startsWith('/tools/')) {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/tools/:toolSlug"
            element={<LandingPage />}
          />
        </Routes>
      </BrowserRouter>
    )
  }
  return (
    <div className="app">
      <header className="header">
  <div className="logo">
    <span className="logo-icon">⚡</span>
    <span>KumpiHub</span>
  </div>

  <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
    <a href="#home" onClick={() => setMenuOpen(false)}>
      Home
    </a>

    <a href="#tools" onClick={() => setMenuOpen(false)}>
      Tools
    </a>

    <a href="#about" onClick={() => setMenuOpen(false)}>
      About
    </a>

    <a href="#blog" onClick={() => setMenuOpen(false)}>
      Blog
    </a>

    <a href="#contact" onClick={() => setMenuOpen(false)}>
      Contact
    </a>
  </nav>

  <button className="bookmark-button">
    ★ Bookmark
  </button>

  <button
    type="button"
    className="menu-button"
    onClick={() => setMenuOpen((prev) => !prev)}
    aria-label="Toggle menu"
    aria-expanded={menuOpen}
  >
    ☰
  </button>
</header>

      <main>
        <section className="hero" id="home">

          <h1>
            All the tools you need,
            <br />
            <span> in one place.</span>
          </h1>

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
<p className="hero-description">
  Free, fast and easy-to-use online tools that make
  <br className="desktop-break" />
  your daily tasks simpler and smarter.
</p>

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
    <ImageCompressor />

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

) : selectedTool === 'Name Generator' ? (
    <NameGenerator />  

) : selectedTool === 'Loan Calculator' ? (
    <LoanCalculator />  
  
) : selectedTool === 'Currency Converter' ? (
    <CurrencyConverter />  

) : selectedTool === 'JSON Formatter' ? (
    <JSONFormatter /> 
    
) : selectedTool === 'Unit Converter' ? (
    <UnitConverter /> 
    
) : selectedTool === 'Percentage Calculator' ? (
    <PercentageCalculator /> 
    
) : selectedTool === 'Invoice Generator' ? (
    <InvoiceGenerator /> 

) : selectedTool === 'PDF Editor' ? (
  <PDFEditor />  

) : selectedTool === 'PDF to DOCX' ? (
  <PDFToDOCX /> 
  
 ) : selectedTool === 'JPG to PDF' ? (
  <JPGToPDF /> 

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
        <div className="ad-space">
        <span>Advertisement</span>
        </div>
        <section className="tools-section" id="tools">
          <div className="section-title">
            <h2>Popular Tools</h2>
          </div>

          <div className="tools-grid">
            {filteredTools.map((tool) => (
  <article
    className="tool-card"
    key={tool.name}
     onClick={() =>
   window.location.href =
     `/tools/${tool.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\//g, '-')}`
}
  >
    <div className="tool-icon">{tool.icon}</div>

    <h3>{tool.name}</h3>

    <p>{tool.description}</p>

    <button
      className="open-tool"
      onClick={(e) => {
    e.stopPropagation()

    window.location.href =
      `/tools/${tool.name
       .toLowerCase()
       .replace(/\s+/g, '-')
       .replace(/\//g, '-')}`
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