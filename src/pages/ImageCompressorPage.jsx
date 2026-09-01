import ImageCompressor from '../tools/ImageCompressor'
import './ImageCompressorPage.css'

function ImageCompressorPage() {
  return (
    <div className="seo-tool-page">

      {/* KumpiHub Header */}
      <header className="seo-page-header">
        <div className="seo-page-logo">
          <span>⚡</span>
          <strong>KumpiHub</strong>
        </div>

        <nav className="seo-page-nav">
          <a href="/">Home</a>
          <a href="/#tools">Tools</a>
          <a href="/#about">About</a>
        </nav>
      </header>

      {/* SEO Heading */}
      <section className="seo-tool-intro">
        <h1>Free Image Compressor Online</h1>

        <p>
          Compress JPG, PNG and WebP images online for free.
          Reduce image file size while keeping great image quality.
        </p>
      </section>

      {/* Tool */}
      <section className="seo-tool-workspace">
        <ImageCompressor />
      </section>

      {/* SEO Content */}
      <section className="seo-tool-content">

        <h2>Image Compressor</h2>

        <p>
          KumpiHub Image Compressor lets you reduce the file size
          of your images quickly and easily. No sign up is required
          and your images can be compressed directly in your browser.
        </p>

        <h2>How to Compress an Image</h2>

        <ol>
          <li>Choose an image from your device.</li>
          <li>Select your preferred compression quality.</li>
          <li>Click the Compress Image button.</li>
          <li>Download your compressed image.</li>
        </ol>

        <h2>Supported Image Formats</h2>

        <p>
          JPG, JPEG, PNG and WebP images are supported.
        </p>

        <h2>Why Use KumpiHub?</h2>

        <ul>
          <li>Free to use</li>
          <li>No sign up required</li>
          <li>Fast image compression</li>
          <li>Works on computer and mobile devices</li>
        </ul>

        <h2>Frequently Asked Questions</h2>

        <h3>Is KumpiHub Image Compressor free?</h3>

        <p>
          Yes. KumpiHub Image Compressor is free to use.
        </p>

        <h3>Do I need to install an app?</h3>

        <p>
          No. You can use the image compressor directly from your browser.
        </p>

        <h3>Can I use it on my phone?</h3>

        <p>
          Yes. The tool is designed to work on both mobile devices
          and computers.
        </p>

      </section>

    </div>
  )
}

export default ImageCompressorPage