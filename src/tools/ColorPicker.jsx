import { useState } from 'react'

function ColorPicker() {
  const [color, setColor] = useState('#2563EB')
  const [copied, setCopied] = useState('')

  const hexToRgb = (hex) => {
    const cleanHex = hex.replace('#', '')

    const r = parseInt(cleanHex.substring(0, 2), 16)
    const g = parseInt(cleanHex.substring(2, 4), 16)
    const b = parseInt(cleanHex.substring(4, 6), 16)

    return { r, g, b }
  }

  const rgbToHsl = (r, g, b) => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    let h = 0
    let s = 0

    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min

      s = l > 0.5
        ? d / (2 - max - min)
        : d / (max + min)

      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break

        case g:
          h = (b - r) / d + 2
          break

        case b:
          h = (r - g) / d + 4
          break

        default:
          break
      }

      h /= 6
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    }
  }

  const rgb = hexToRgb(color)

  const hsl = rgbToHsl(
    rgb.r,
    rgb.g,
    rgb.b
  )

  const rgbText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`

  const hslText = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`

  const copyValue = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value)

      setCopied(type)

      setTimeout(() => {
        setCopied('')
      }, 3500)
    } catch (error) {
      console.error('Copy failed:', error)
      alert('Could not copy color value')
    }
  }

  const randomColor = () => {
    const characters = '0123456789ABCDEF'

    let newColor = '#'

    for (let i = 0; i < 6; i++) {
      newColor += characters[
        Math.floor(Math.random() * 16)
      ]
    }

    setColor(newColor)
    setCopied('')
  }

  return (
    <div className="tool-page color-picker-page">

      <div className="tool-page-icon">🎨</div>

      <h2>Color Picker</h2>

      <p>
        Pick a color and get HEX, RGB and HSL values.
      </p>

      <div
        className="color-preview"
        style={{ backgroundColor: color }}
      >
        <span>{color.toUpperCase()}</span>
      </div>

      <div className="color-picker-control">

        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value)
            setCopied('')
          }}
          className="color-input"
        />

        <div>
          <strong>Choose Color</strong>
          <span>Click the color box to select a color.</span>
        </div>

      </div>

      <div className="color-values">

        <div className="color-value-row">

          <div>
            <span>HEX</span>
            <strong>{color.toUpperCase()}</strong>
          </div>

          <button
            type="button"
            onClick={() =>
              copyValue(
                color.toUpperCase(),
                'hex'
              )
            }
          >
            {copied === 'hex'
              ? '✓ Copied'
              : '📋 Copy'}
          </button>

        </div>

        <div className="color-value-row">

          <div>
            <span>RGB</span>
            <strong>{rgbText}</strong>
          </div>

          <button
            type="button"
            onClick={() =>
              copyValue(
                rgbText,
                'rgb'
              )
            }
          >
            {copied === 'rgb'
              ? '✓ Copied'
              : '📋 Copy'}
          </button>

        </div>

        <div className="color-value-row">

          <div>
            <span>HSL</span>
            <strong>{hslText}</strong>
          </div>

          <button
            type="button"
            onClick={() =>
              copyValue(
                hslText,
                'hsl'
              )
            }
          >
            {copied === 'hsl'
              ? '✓ Copied'
              : '📋 Copy'}
          </button>

        </div>

      </div>

      <button
        type="button"
        className="random-color-button"
        onClick={randomColor}
      >
        🎲 Random Color
      </button>

    </div>
  )
}

export default ColorPicker