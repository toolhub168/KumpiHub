import { useState } from 'react'
import './PercentageCalculator.css'

function PercentageCalculator() {
  const [mode, setMode] = useState('percentageOf')

  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')

  const [result, setResult] = useState(null)

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 8,
    }).format(number)
  }

  const calculate = () => {
    const a = Number(value1)
    const b = Number(value2)

    if (!value1 || !value2 || Number.isNaN(a) || Number.isNaN(b)) {
      setResult(null)
      return
    }

    if (mode === 'percentageOf') {
      const answer = (a / 100) * b

      setResult({
        label: `${formatNumber(a)}% of ${formatNumber(b)} is`,
        value: formatNumber(answer),
      })
    }

    if (mode === 'whatPercentage') {
      if (b === 0) {
        setResult(null)
        return
      }

      const answer = (a / b) * 100

      setResult({
        label: `${formatNumber(a)} is`,
        value: `${formatNumber(answer)}% of ${formatNumber(b)}`,
      })
    }

    if (mode === 'percentageChange') {
      if (a === 0) {
        setResult(null)
        return
      }

      const change = ((b - a) / Math.abs(a)) * 100

      setResult({
        label:
          change >= 0
            ? 'Percentage Increase'
            : 'Percentage Decrease',
        value: `${formatNumber(Math.abs(change))}%`,
      })
    }

    if (mode === 'increaseDecrease') {
      const percentage = (a / 100) * b

      const increase = b + percentage
      const decrease = b - percentage

      setResult({
        label: `${formatNumber(b)} changed by ${formatNumber(a)}%`,
        value: `Increase: ${formatNumber(increase)} • Decrease: ${formatNumber(decrease)}`,
      })
    }
  }

  const clearCalculator = () => {
    setValue1('')
    setValue2('')
    setResult(null)
  }

  const handleModeChange = (newMode) => {
    setMode(newMode)
    setValue1('')
    setValue2('')
    setResult(null)
  }

  return (
    <div className="percentage-calculator-page">

     

      {/* Calculator Card */}

      <div className="percentage-card">

        {/* Calculation Type */}

        <div className="percentage-mode">

          <label>
            Calculation Type
          </label>

          <select
            value={mode}
            onChange={(e) =>
              handleModeChange(e.target.value)
            }
          >
            <option value="percentageOf">
              What is X% of Y?
            </option>

            <option value="whatPercentage">
              X is what % of Y?
            </option>

            <option value="percentageChange">
              Percentage Increase / Decrease
            </option>

            <option value="increaseDecrease">
              Increase / Decrease a Number
            </option>
          </select>

        </div>


        {/* Inputs */}

        <div className="percentage-inputs">

          <div className="percentage-field">

            <label>
              {mode === 'percentageChange'
                ? 'Original Value'
                : mode === 'whatPercentage'
                  ? 'Value'
                  : 'Percentage'
              }
            </label>

            <input
              type="number"
              value={value1}
              onChange={(e) =>
                setValue1(e.target.value)
              }
              placeholder={
                mode === 'percentageChange'
                  ? '100'
                  : mode === 'whatPercentage'
                    ? '50'
                    : '20'
              }
            />

          </div>


          <div className="percentage-field">

            <label>
              {mode === 'percentageChange'
                ? 'New Value'
                : mode === 'whatPercentage'
                  ? 'Total'
                  : 'Number'
              }
            </label>

            <input
              type="number"
              value={value2}
              onChange={(e) =>
                setValue2(e.target.value)
              }
              placeholder={
                mode === 'percentageChange'
                  ? '150'
                  : mode === 'whatPercentage'
                    ? '200'
                    : '500'
              }
            />

          </div>

        </div>


        {/* Buttons */}

        <div className="percentage-buttons">

          <button
            className="percentage-calculate-button"
            onClick={calculate}
          >
            Calculate
          </button>

          <button
            className="percentage-clear-button"
            onClick={clearCalculator}
          >
            Clear
          </button>

        </div>


        {/* Result */}

        {result && (

          <div className="percentage-result">

            <span>
              {result.label}
            </span>

            <strong>
              {result.value}
            </strong>

          </div>

        )}
     
      </div>

    </div>
  )
}

export default PercentageCalculator