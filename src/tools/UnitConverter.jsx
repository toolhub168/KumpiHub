import { useState } from 'react'
import './UnitConverter.css'

const units = {
  Length: {
    Meter: 1,
    Kilometer: 1000,
    Centimeter: 0.01,
    Millimeter: 0.001,
    Mile: 1609.344,
    Yard: 0.9144,
    Foot: 0.3048,
    Inch: 0.0254,
  },

  Weight: {
    Kilogram: 1,
    Gram: 0.001,
    Milligram: 0.000001,
    Pound: 0.45359237,
    Ounce: 0.0283495,
  },

  Temperature: {
    Celsius: 'C',
    Fahrenheit: 'F',
    Kelvin: 'K',
  },

  Time: {
    Second: 1,
    Minute: 60,
    Hour: 3600,
    Day: 86400,
    Week: 604800,
  },

  Area: {
    'Square Meter': 1,
    'Square Kilometer': 1000000,
    'Square Foot': 0.092903,
    'Square Yard': 0.836127,
    'Square Mile': 2589988.11,
  },

  Data: {
    Byte: 1,
    Kilobyte: 1024,
    Megabyte: 1024 ** 2,
    Gigabyte: 1024 ** 3,
    Terabyte: 1024 ** 4,
  },
}

function UnitConverter() {
  const [category, setCategory] = useState('Length')
  const [fromUnit, setFromUnit] = useState('Meter')
  const [toUnit, setToUnit] = useState('Kilometer')
  const [fromValue, setFromValue] = useState('1000')
  const [toValue, setToValue] = useState('1')

  const convertValue = (value, from, to, type) => {
    if (value === '' || Number.isNaN(Number(value))) {
      return ''
    }

    const number = Number(value)

    if (type === 'Temperature') {
      let celsius

      if (from === 'Celsius') celsius = number
      if (from === 'Fahrenheit') celsius = (number - 32) * 5 / 9
      if (from === 'Kelvin') celsius = number - 273.15

      if (to === 'Celsius') return celsius
      if (to === 'Fahrenheit') return celsius * 9 / 5 + 32
      if (to === 'Kelvin') return celsius + 273.15
    }

    const baseValue = number * units[type][from]
    return baseValue / units[type][to]
  }

  const handleFromChange = (value) => {
    setFromValue(value)

    const result = convertValue(
      value,
      fromUnit,
      toUnit,
      category
    )

    setToValue(result === '' ? '' : formatNumber(result))
  }

  const handleFromUnitChange = (unit) => {
    setFromUnit(unit)

    const result = convertValue(
      fromValue,
      unit,
      toUnit,
      category
    )

    setToValue(result === '' ? '' : formatNumber(result))
  }

  const handleToUnitChange = (unit) => {
    setToUnit(unit)

    const result = convertValue(
      fromValue,
      fromUnit,
      unit,
      category
    )

    setToValue(result === '' ? '' : formatNumber(result))
  }

  const handleCategoryChange = (type) => {
    const firstUnit = Object.keys(units[type])[0]
    const secondUnit = Object.keys(units[type])[1]

    setCategory(type)
    setFromUnit(firstUnit)
    setToUnit(secondUnit)
    setFromValue('1')

    const result = convertValue(
      '1',
      firstUnit,
      secondUnit,
      type
    )

    setToValue(result === '' ? '' : formatNumber(result))
  }

  const swapUnits = () => {
    const newFromUnit = toUnit
    const newToUnit = fromUnit
    const newFromValue = toValue
    const newToValue = fromValue

    setFromUnit(newFromUnit)
    setToUnit(newToUnit)
    setFromValue(newFromValue)
    setToValue(newToValue)
  }

  const formatNumber = (number) => {
    if (!Number.isFinite(number)) return ''

    return Number(number.toFixed(10)).toString()
  }

  return (
    <div className="unit-converter-page">

     

      <div className="unit-category">
        <label>Conversion Type</label>

        <select
          value={category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {Object.keys(units).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="unit-conversion">

        <div className="unit-side">

          <label>From</label>

          <div className="unit-input-row">

            <select
              value={fromUnit}
              onChange={(e) =>
                handleFromUnitChange(e.target.value)
              }
            >
              {Object.keys(units[category]).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={fromValue}
              placeholder="Enter value"
              onChange={(e) =>
                handleFromChange(e.target.value)
              }
            />

          </div>

        </div>

        <button
          className="unit-swap-button"
          onClick={swapUnits}
          aria-label="Swap units"
        >
          ⇄
        </button>

        <div className="unit-side">

          <label>To</label>

          <div className="unit-input-row">

            <select
              value={toUnit}
              onChange={(e) =>
                handleToUnitChange(e.target.value)
              }
            >
              {Object.keys(units[category]).map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>

            <input
              type="number"
              value={toValue}
              onChange={(e) =>
                setToValue(e.target.value)
              }
            />

          </div>

        </div>

      </div>

      <div className="unit-result">
        <span>Result</span>

        <strong>
          {fromValue || '0'} {fromUnit} = {toValue || '0'} {toUnit}
        </strong>
      </div>

    </div>
  )
}

export default UnitConverter