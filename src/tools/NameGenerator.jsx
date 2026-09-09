import { useState } from 'react'
import './NameGenerator.css'

function NameGenerator() {
  const [category, setCategory] = useState('Username')
  const [style, setStyle] = useState('Modern')
  const [results, setResults] = useState([])
  const [copied, setCopied] = useState(null)

  const nameParts = {
    Username: {
      first: [
        'Nova', 'Pixel', 'Shadow', 'Luna', 'Sky', 'Neo',
        'Storm', 'Frost', 'Echo', 'Vibe', 'Zen', 'Cosmo',
        'Aero', 'Flash', 'Mystic', 'Star', 'Cloud', 'Fire'
      ],
      second: [
        'X', 'Pro', 'Zone', 'Hub', 'Wave', 'Core',
        'Flow', 'Fox', 'King', 'Soul', 'Life', 'One',
        'Byte', 'Lab', 'World', 'Max'
      ]
    },

    'Gaming Name': {
      first: [
        'Shadow', 'Dark', 'Ghost', 'Cyber', 'Dragon', 'Blaze',
        'Storm', 'Venom', 'Titan', 'Phantom', 'Frost', 'Wolf',
        'Demon', 'Hunter', 'Rogue', 'Legend', 'Night', 'Zero'
      ],
      second: [
        'X', 'Slayer', 'King', 'Warrior', 'Master', 'Force',
        'Elite', 'Lord', 'Strike', 'Hunter', 'Pro', 'OP',
        'Gaming', 'Knight', 'Boss', 'Prime'
      ]
    },

    'Business Name': {
      first: [
        'Bright', 'Prime', 'Smart', 'Global', 'Next',
        'Blue', 'Golden', 'Modern', 'Digital', 'Future',
        'Vision', 'Core', 'True', 'Swift', 'United'
      ],
      second: [
        'Solutions', 'Hub', 'Group', 'Works', 'Labs',
        'Studio', 'Tech', 'Media', 'Services', 'Partners',
        'Company', 'Systems', 'Agency', 'Market'
      ]
    },

    'YouTube / Creator': {
      first: [
        'Daily', 'Vibe', 'Create', 'Explore', 'Trend',
        'Story', 'Digital', 'Fresh', 'Real', 'Next',
        'Epic', 'Smart', 'World', 'Inside', 'Connect'
      ],
      second: [
        'TV', 'Studio', 'Hub', 'Media', 'World',
        'Channel', 'Show', 'Zone', 'Life', 'Official',
        'Talk', 'Lab', 'Space', 'Daily'
      ]
    }
  }

  const styles = {
    Modern: ['', 'X', 'Pro', 'Hub', 'Lab', 'Plus'],
    Short: ['', 'X', 'Go', 'One', 'Up'],
    Creative: ['', 'ly', 'ify', 'ora', 'io', 'verse'],
    Professional: ['', 'Group', 'Studio', 'Solutions', 'Works']
  }

  const randomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)]
  }

  const generateNames = () => {
    const data = nameParts[category]
    const suffixes = styles[style]
    const generated = new Set()

    let attempts = 0

    while (generated.size < 10 && attempts < 200) {
      attempts++

      const first = randomItem(data.first)
      const second = randomItem(data.second)
      const suffix = randomItem(suffixes)

      let name

      if (style === 'Short') {
        name = `${first}${suffix}`
      } else {
        name = `${first}${second}${suffix}`
      }

      generated.add(name)
    }

    setResults([...generated])
    setCopied(null)
  }

  const copyName = async (name, index) => {
    try {
      await navigator.clipboard.writeText(name)
      setCopied(index)

      setTimeout(() => {
        setCopied(null)
      }, 1200)
    } catch {
      alert('Unable to copy the name.')
    }
  }

  const copyAll = async () => {
    if (!results.length) return

    try {
      await navigator.clipboard.writeText(results.join('\n'))
      setCopied('all')

      setTimeout(() => {
        setCopied(null)
      }, 1200)
    } catch {
      alert('Unable to copy names.')
    }
  }

  const clearResults = () => {
    setResults([])
    setCopied(null)
  }

  return (
    <div className="name-generator">


       <div className="name-generator-form">

       <div className="name-generator-options">

       <div className="name-option">
         <label>Category:</label>

         <select
           value={category}
           onChange={(e) => {
             setCategory(e.target.value)
             setResults([])
           }}
         >
           <option>Username</option>
           <option>Gaming Name</option>
           <option>Business Name</option>
           <option>YouTube / Creator</option>
         </select>
       </div>

         <div className="name-option">
           <label>Style:</label>

           <select
             value={style}
             onChange={(e) => {
               setStyle(e.target.value)
               setResults([])
             }}
           >
             <option>Modern</option>
             <option>Short</option>
             <option>Creative</option>
             <option>Professional</option>
           </select>
         </div>

       </div>

        <div className="name-generator-actions">

          <button
            className="generate-name-button"
            onClick={generateNames}
          >
            ✨ Generate Names
          </button>

          {results.length > 0 && (
            <button
              className="clear-name-button"
              onClick={clearResults}
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {results.length > 0 ? (

        <div className="name-generator-results">

          <div className="name-results-header">

            <div>
              <h3>Generated Names</h3>
              <p>Choose your favorite name or copy one.</p>
            </div>

            <button
              className="copy-all-button"
              onClick={copyAll}
            >
              {copied === 'all' ? '✓ Copied All' : '📋 Copy All'}
            </button>

          </div>

          <div className="name-results-grid">

            {results.map((name, index) => (
              <div
                className="generated-name-card"
                key={`${name}-${index}`}
              >
                <span className="generated-name">
                  {name}
                </span>

                <button
                  className="copy-name-button"
                  onClick={() => copyName(name, index)}
                  title="Copy name"
                >
                  {copied === index ? '✓' : '📋'}
                </button>
              </div>
            ))}

          </div>

          <button
            className="generate-again-button"
            onClick={generateNames}
          >
            🔄 Generate Again
          </button>

        </div>

      ) : (

        <div className="name-generator-empty">

          <span>✨</span>

          <div>
            <strong>Ready to generate?</strong>
            <p>Choose a category and style, then generate your names.</p>
          </div>

        </div>

      )}

      <div className="name-generator-info">

        <div>
          <span>⚡</span>
          <strong>Fast</strong>
          <small>Instant generation</small>
        </div>

        <div>
          <span>🔒</span>
          <strong>Private</strong>
          <small>No data uploaded</small>
        </div>

        <div>
          <span>🆓</span>
          <strong>Free</strong>
          <small>No sign up required</small>
        </div>

      </div>

    </div>
  )
}

export default NameGenerator