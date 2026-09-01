import { useEffect } from 'react'
import toolsData from './toolsData.jsx'
import './LandingPage.css'

function LandingPage() {
  const toolSlug = window.location.pathname
    .split('/')
    .filter(Boolean)
    .pop()

  const tool = toolsData[toolSlug]

  useEffect(() => {
    if (!tool) return

    document.title = `${tool.seoTitle} | KumpiHub`

    const description = document.querySelector(
      'meta[name="description"]'
    )

    if (description) {
      description.setAttribute(
        'content',
        tool.seoDescription
      )
    }
  }, [tool])

  if (!tool) {
    return (
      <div className="landing-page">
        <h1>Tool Not Found</h1>
        <p>The tool you are looking for does not exist.</p>
      </div>
    )
  }

  return (
    <div className="landing-page">

      {/* Header */}

      <header className="landing-header">

        <div className="landing-logo">
          <span>⚡</span>
          <strong>KumpiHub</strong>
        </div>

        <div className="landing-nav-row">

          <a href="/#tools" className="landing-back">
            ← Back
          </a>

          <nav>
            <a href="/">Home</a>
            <a href="/#tools">Tools</a>
            <a href="/#about">About</a>
          </nav>

        </div>

      </header>

      {/* SEO Intro */}

      <section className="landing-intro">

        <h1>{tool.seoTitle}</h1>

        <p>
          {tool.seoDescription}
        </p>

      </section>

      {/* Tool */}

      <section className="landing-tool">

        {tool.component}

      </section>

      {/* SEO Content */}

      <section className="landing-content">

        <h2>{tool.name}</h2>

        <p>
          {tool.description}
        </p>

        <h2>How to Use {tool.name}</h2>

        <ol>
          {tool.howToUse.map((step, index) => (
            <li key={index}>
              {step}
            </li>
          ))}
        </ol>

        <h2>Why Use KumpiHub?</h2>

        <ul>
          <li>Free to use</li>
          <li>No sign up required</li>
          <li>Fast and easy to use</li>
          <li>Works on computer and mobile devices</li>
        </ul>

        <h2>Frequently Asked Questions</h2>

        {tool.faqs.map((faq, index) => (
          <div
            className="landing-faq"
            key={index}
          >
            <h3>{faq.question}</h3>

            <p>
              {faq.answer}
            </p>
          </div>
        ))}

      </section>

    </div>
  )
}

export default LandingPage