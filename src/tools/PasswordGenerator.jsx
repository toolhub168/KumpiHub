import { useState } from 'react'

function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let characters = ''

    if (uppercase) {
      characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }

    if (lowercase) {
      characters += 'abcdefghijklmnopqrstuvwxyz'
    }

    if (numbers) {
      characters += '0123456789'
    }

    if (symbols) {
      characters += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    }

    if (!characters) {
      alert('Please select at least one character type.')
      return
    }

    const array = new Uint32Array(length)
    crypto.getRandomValues(array)

    let newPassword = ''

    for (let i = 0; i < length; i++) {
      newPassword += characters[array[i] % characters.length]
    }

    setPassword(newPassword)
    setCopied(false)
  }

  const copyPassword = async () => {
    if (!password) {
      alert('Please generate a password first.')
      return
    }

    try {
      await navigator.clipboard.writeText(password)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3500)
    } catch (error) {
      console.error('Copy failed:', error)
      alert('Could not copy password')
    }
  }

  const getStrength = () => {
    if (!password) {
      return {
        text: 'Not generated',
        className: 'password-strength-none',
      }
    }

    let score = 0

    if (length >= 12) score++
    if (length >= 16) score++
    if (uppercase) score++
    if (lowercase) score++
    if (numbers) score++
    if (symbols) score++

    if (score >= 5) {
      return {
        text: 'Very Strong',
        className: 'password-strength-very-strong',
      }
    }

    if (score >= 4) {
      return {
        text: 'Strong',
        className: 'password-strength-strong',
      }
    }

    if (score >= 3) {
      return {
        text: 'Medium',
        className: 'password-strength-medium',
      }
    }

    return {
      text: 'Weak',
      className: 'password-strength-weak',
    }
  }

  const strength = getStrength()

  return (
    <div className="tool-page password-generator-page">

      

      <div className="password-display">
        <input
          type="text"
          value={password}
          placeholder="Your generated password..."
          readOnly
        />

        <button
          type="button"
          className="password-copy-button"
          onClick={copyPassword}
          disabled={!password}
        >
          {copied ? '✓ Copied' : '📋 Copy'}
        </button>
      </div>

      <div className="password-strength-row">
        <span>Password strength</span>

        <strong className={strength.className}>
          {strength.text}
        </strong>
      </div>

      <div className="password-options">

        <div className="password-length-header">
          <span>Password Length</span>
          <strong>{length}</strong>
        </div>

        <input
          type="range"
          min="8"
          max="64"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="password-range"
        />

        <div className="password-range-labels">
          <span>8</span>
          <span>64</span>
        </div>

        <label className="password-checkbox">
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => setUppercase(e.target.checked)}
          />

          <span>Uppercase</span>

          <small>A-Z</small>
        </label>

        <label className="password-checkbox">
          <input
            type="checkbox"
            checked={lowercase}
            onChange={(e) => setLowercase(e.target.checked)}
          />

          <span>Lowercase</span>

          <small>a-z</small>
        </label>

        <label className="password-checkbox">
          <input
            type="checkbox"
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
          />

          <span>Numbers</span>

          <small>0-9</small>
        </label>

        <label className="password-checkbox">
          <input
            type="checkbox"
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
          />

          <span>Symbols</span>

          <small>!@#$</small>
        </label>

      </div>

      <button
        type="button"
        className="tool-action password-generate-button"
        onClick={generatePassword}
      >
        🔄 Generate Password
      </button>

    </div>
  )
}

export default PasswordGenerator
