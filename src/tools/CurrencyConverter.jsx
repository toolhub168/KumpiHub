import { useEffect, useState } from 'react'
import './CurrencyConverter.css'

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
]

function CurrencyConverter() {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('KHR')

  const [result, setResult] = useState('')
  const [rate, setRate] = useState(null)
  const [rateDate, setRateDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getCurrency = (code) => {
    return currencies.find(
      (currency) => currency.code === code
    )
  }

  const formatNumber = (number) => {
    if (!Number.isFinite(number)) {
      return ''
    }

    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 4,
    }).format(number)
  }

  const convertCurrency = async () => {
    const numericAmount = Number(amount)

    if (
      amount === '' ||
      Number.isNaN(numericAmount) ||
      numericAmount < 0
    ) {
      setResult('')
      setRate(null)
      setRateDate('')
      setError('')
      return
    }

    /*
      Same currency
    */

    if (fromCurrency === toCurrency) {
      setRate(1)
      setRateDate('')
      setResult(formatNumber(numericAmount))
      setError('')
      return
    }

    try {
      setLoading(true)
      setError('')

      /*
        Frankfurter API

        Example:
        USD → KHR

        https://api.frankfurter.dev/v2/rate/USD/KHR
      */

      const response = await fetch(
        `https://api.frankfurter.dev/v2/rate/${fromCurrency}/${toCurrency}`
      )

      if (!response.ok) {
        throw new Error(
          `API request failed: ${response.status}`
        )
      }

      const data = await response.json()

      /*
        Frankfurter v2 returns:

        {
          date: "...",
          base: "USD",
          quote: "KHR",
          rate: 4000
        }
      */

      const exchangeRate = Number(data.rate)

      if (!Number.isFinite(exchangeRate)) {
        throw new Error(
          'Exchange rate is not available.'
        )
      }

      const convertedAmount =
        numericAmount * exchangeRate

      setRate(exchangeRate)
      setRateDate(data.date || '')
      setResult(formatNumber(convertedAmount))
      setError('')

    } catch (err) {
      console.error(
        'Currency conversion error:',
        err
      )

      setResult('')
      setRate(null)
      setRateDate('')

      setError(
        'Unable to get the latest exchange rate. Please try again.'
      )

    } finally {
      setLoading(false)
    }
  }

  /*
    Automatically load rate when
    currency changes
  */

  useEffect(() => {
    convertCurrency()
  }, [fromCurrency, toCurrency])

  /*
    Amount input
  */

  const handleAmountChange = (value) => {
    setAmount(value)

    if (value === '') {
      setResult('')
      return
    }

    const numericAmount = Number(value)

    if (
      Number.isNaN(numericAmount) ||
      numericAmount < 0
    ) {
      setResult('')
      return
    }

    /*
      Same currency does not need API
    */

    if (fromCurrency === toCurrency) {
      setRate(1)
      setRateDate('')
      setResult(formatNumber(numericAmount))
    }
  }

  /*
    Swap currencies
  */

  const handleSwap = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  /*
    Convert button
  */

  const handleConvert = () => {
    convertCurrency()
  }

  const fromInfo = getCurrency(fromCurrency)
  const toInfo = getCurrency(toCurrency)

  return (
    <div className="currency-converter-page">

      {/* Icon */}

      <div className="tool-page-icon">
        💱
      </div>


      {/* Title */}

      <h2>
        Currency Converter
      </h2>

      <p className="currency-subtitle">
        Convert currencies using the latest available exchange rates.
      </p>


      {/* Converter Box */}

      <div className="currency-converter-box">


        {/* FROM */}

        <div className="currency-field">

          <label>
            From
          </label>

          <div className="currency-input-row">

            <input
              type="number"
              value={amount}
              onChange={(e) =>
                handleAmountChange(
                  e.target.value
                )
              }
              placeholder="Enter amount"
              min="0"
              step="any"
            />

            <select
              value={fromCurrency}
              onChange={(e) =>
                setFromCurrency(
                  e.target.value
                )
              }
            >

              {currencies.map(
                (currency) => (

                  <option
                    key={currency.code}
                    value={currency.code}
                  >
                    {currency.code} — {currency.name}
                  </option>

                )
              )}

            </select>

          </div>

        </div>


        {/* SWAP */}

        <button
          className="currency-swap-button"
          onClick={handleSwap}
          aria-label="Swap currencies"
          type="button"
        >
          ⇄
        </button>


        {/* TO */}

        <div className="currency-field">

          <label>
            To
          </label>

          <div className="currency-input-row">

            <input
              type="text"
              value={
                loading
                  ? 'Loading...'
                  : result
              }
              readOnly
              placeholder="Converted amount"
            />

            <select
              value={toCurrency}
              onChange={(e) =>
                setToCurrency(
                  e.target.value
                )
              }
            >

              {currencies.map(
                (currency) => (

                  <option
                    key={currency.code}
                    value={currency.code}
                  >
                    {currency.code} — {currency.name}
                  </option>

                )
              )}

            </select>

          </div>

        </div>


        {/* CONVERT BUTTON */}

        <button
          className="currency-convert-button"
          onClick={handleConvert}
          disabled={loading}
          type="button"
        >
          {loading
            ? 'Converting...'
            : 'Convert Currency'}
        </button>

      </div>


      {/* ERROR */}

      {error && (

        <div className="currency-error">
          {error}
        </div>

      )}


      {/* RESULT */}

      {!error &&
        result !== '' &&
        !loading && (

          <div className="currency-result">

            <span>
              Conversion Result
            </span>

            <strong>
              {fromInfo?.symbol}
              {formatNumber(
                Number(amount)
              )}
              {' '}
              {fromCurrency}
              {' '}
              =
              {' '}
              {toInfo?.symbol}
              {result}
              {' '}
              {toCurrency}
            </strong>

          </div>

        )}


      {/* EXCHANGE RATE */}

      {rate !== null &&
        !loading &&
        !error && (

          <div className="currency-rate">

            <span>
              Exchange Rate
            </span>

            <strong>
              1 {fromCurrency} ={' '}
              {formatNumber(rate)}{' '}
              {toCurrency}
            </strong>

          </div>

        )}


      {/* RATE DATE */}

      {rateDate &&
        !loading &&
        !error && (

          <div className="currency-rate-date">
            Rate date: {rateDate}
          </div>

        )}

    </div>
  )
}

export default CurrencyConverter