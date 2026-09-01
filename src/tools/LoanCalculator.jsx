import { useState } from 'react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import './LoanCalculator.css'

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('10000')
  const [interestRate, setInterestRate] = useState('5.5')
  const [rateType, setRateType] = useState('Annual')
  const [loanTerm, setLoanTerm] = useState('6')
  const [termType, setTermType] = useState('Years')
  const [result, setResult] = useState(null)

  const formatMoney = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number)
  }

  const calculateLoan = () => {
    const principal = Number(loanAmount)
    const enteredRate = Number(interestRate)
    const term = Number(loanTerm)

    if (
      !principal ||
      principal <= 0 ||
      enteredRate < 0 ||
      !term ||
      term <= 0
    ) {
      setResult(null)
      return
    }

    const totalMonths =
      termType === 'Years'
        ? term * 12
        : term

    const monthlyRate =
      rateType === 'Annual'
        ? enteredRate / 100 / 12
        : enteredRate / 100

    let monthlyPayment

    if (monthlyRate === 0) {
      monthlyPayment = principal / totalMonths
    } else {
      monthlyPayment =
        principal *
        (
          monthlyRate *
          Math.pow(1 + monthlyRate, totalMonths)
        ) /
        (
          Math.pow(1 + monthlyRate, totalMonths) - 1
        )
    }

    const totalPayment = monthlyPayment * totalMonths
    const totalInterest = totalPayment - principal

    const schedule = []
    let balance = principal

    for (let month = 1; month <= totalMonths; month++) {
      const interest = balance * monthlyRate

      let principalPayment =
        monthlyPayment - interest

      let payment = monthlyPayment

      if (month === totalMonths) {
        principalPayment = balance
        payment = principalPayment + interest
      }

      balance -= principalPayment

      if (Math.abs(balance) < 0.01) {
        balance = 0
      }

      schedule.push({
        month,
        payment,
        principal: principalPayment,
        interest,
        balance,
      })
    }

    setResult({
      principal,
      enteredRate,
      rateType,
      term,
      termType,
      totalMonths,
      monthlyPayment,
      totalPayment,
      totalInterest,
      schedule,
    })
  }

  const downloadPDF = () => {
    if (!result) return

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()

    /* Header */

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)

    doc.text(
      'KUMPIHUB',
      pageWidth / 2,
      18,
      { align: 'center' }
    )

    doc.setFontSize(13)

    doc.text(
      'Loan Calculator',
      pageWidth / 2,
      26,
      { align: 'center' }
    )

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)

    doc.text(
      'Loan Calculation Summary',
      pageWidth / 2,
      35,
      { align: 'center' }
    )

    /* Summary */

doc.setFont('helvetica', 'normal')
doc.setFontSize(9)

const leftLabelX = 20
const leftValueX = 47

const rightLabelX = 130
const rightValueX = 160

let summaryY = 48

// Row 1
doc.setFont('helvetica', 'bold')
doc.text('Loan Amount', leftLabelX, summaryY)

doc.setFont('helvetica', 'normal')
doc.text(
  formatMoney(result.principal),
  leftValueX,
  summaryY
)

doc.setFont('helvetica', 'bold')
doc.text('Monthly Payment', rightLabelX, summaryY)

doc.setFont('helvetica', 'normal')
doc.text(
  formatMoney(result.monthlyPayment),
  rightValueX + 10,
  summaryY,
  { align: 'right' }
)


// Row 2

summaryY += 12

doc.setFont('helvetica', 'bold')
doc.text('Loan Term', leftLabelX, summaryY)

doc.setFont('helvetica', 'normal')
doc.text(
  `${result.term} ${result.termType}`,
  leftValueX,
  summaryY
)

doc.setFont('helvetica', 'bold')
doc.text('Total Interest', rightLabelX, summaryY)

doc.setFont('helvetica', 'normal')
doc.text(
  formatMoney(result.totalInterest),
  rightValueX + 10,
  summaryY,
  { align: 'right' }
)


// Row 3

summaryY += 12

doc.setFont('helvetica', 'bold')
doc.text('Interest Rate', leftLabelX, summaryY)

doc.setFont('helvetica', 'normal')
doc.text(
  `${result.enteredRate}%`,
  leftValueX,
  summaryY
)

doc.setFont('helvetica', 'bold')
doc.text('Total Payment', rightLabelX, summaryY)

doc.setFont('helvetica', 'normal')
doc.text(
  formatMoney(result.totalPayment),
  rightValueX + 10,
  summaryY,
  { align: 'right' }
)
    /* Divider */

    doc.setDrawColor(210, 215, 225)

    doc.line(
      20,
      summaryY + 8,
      pageWidth - 20,
      summaryY + 8
    )

    /* Amortization title */

    doc.setFontSize(11)

    doc.text(
      'AMORTIZATION SCHEDULE',
      pageWidth / 2,
      summaryY + 18,
      { align: 'center' }
    )

    /* Table */

    const tableData = result.schedule.map((row) => [
      row.month.toString(),
      formatMoney(row.payment),
      formatMoney(row.principal),
      formatMoney(row.interest),
      formatMoney(row.balance),
    ])

    autoTable(doc, {
      startY: summaryY + 23,

      head: [
        [
          'Month',
          'Payment',
          'Principal',
          'Interest',
          'Balance',
        ],
      ],

      body: tableData,

      theme: 'grid',

      styles: {
        font: 'helvetica',
        fontSize: 7,
        cellPadding: 2.2,
        halign: 'center',
        valign: 'middle',
      },

      headStyles: {
        fontStyle: 'bold',
        fontSize: 7,
      },

      columnStyles: {
        0: {
          cellWidth: 18,
        },

        1: {
          cellWidth: 34,
        },

        2: {
          cellWidth: 34,
        },

        3: {
          cellWidth: 32,
        },

        4: {
          cellWidth: 38,
        },
      },

      margin: {
        left: 20,
        right: 20,
        bottom: 18,
      },

      pageBreak: 'auto',

      didDrawPage: (data) => {
        const pageNumber =
          doc.internal.getNumberOfPages()

        /* Footer */

        doc.setFont('helvetica', 'normal')
        doc.setFontSize(7)

        doc.text(
          'Generated by KumpiHub',
          20,
          pageHeight - 10
        )

        doc.text(
          'kumpihub-1.onrender.com',
          pageWidth - 20,
          pageHeight - 10,
          { align: 'right' }
        )

        doc.text(
          `Page ${pageNumber}`,
          pageWidth / 2,
          pageHeight - 10,
          { align: 'center' }
        )
      },
    })

    /* Save */

    const fileName =
      `KumpiHub-Loan-Calculation-${result.term}${result.termType}.pdf`

    doc.save(fileName)
  }

  return (
    <div className="loan-calculator-page">

      <div className="tool-page-icon">
        🏦
      </div>

      <h2>Loan Calculator</h2>

      <p className="loan-subtitle">
        Calculate your monthly payment, total interest and repayment schedule.
      </p>

      {/* Loan Amount */}

      <div className="loan-amount-section">

        <label>
          Loan Amount
        </label>

        <input
          type="number"
          value={loanAmount}
          onChange={(e) =>
            setLoanAmount(e.target.value)
          }
          placeholder="Enter loan amount"
          min="0"
        />

      </div>

      {/* Interest Rate + Loan Term */}

      <div className="loan-settings-row">

        <div className="loan-field">

          <label>
            Interest Rate
          </label>

          <div className="loan-rate-control">

            <input
              type="number"
              value={interestRate}
              onChange={(e) =>
                setInterestRate(e.target.value)
              }
              placeholder="5.5"
              min="0"
              step="0.01"
            />

            <span>%</span>

            <select
              value={rateType}
              onChange={(e) =>
                setRateType(e.target.value)
              }
            >
              <option value="Annual">
                Annual
              </option>

              <option value="Monthly">
                Monthly
              </option>
            </select>

          </div>

          <small className="loan-rate-note">
            {rateType === 'Annual'
              ? 'Note: Interest rate is calculated annually.'
              : 'Note: Interest rate is calculated monthly.'
            }
          </small>

        </div>

        <div className="loan-field">

          <label>
            Loan Term
          </label>

          <div className="loan-term-control">

            <input
              type="number"
              value={loanTerm}
              onChange={(e) =>
                setLoanTerm(e.target.value)
              }
              placeholder="6"
              min="1"
            />

            <select
              value={termType}
              onChange={(e) =>
                setTermType(e.target.value)
              }
            >
              <option value="Years">
                Years
              </option>

              <option value="Months">
                Months
              </option>
            </select>

          </div>

        </div>

      </div>

      {/* Calculate */}

      <button
        className="loan-calculate-button"
        onClick={calculateLoan}
      >
        Calculate Loan
      </button>

      {/* Result */}

      {result && (

        <div className="loan-result">

          <h3>
            Loan Calculation Summary
          </h3>

          {/* Monthly Payment */}

          <div className="loan-main-payment">

            <span>
              MONTHLY PAYMENT
            </span>

            <strong>
              {formatMoney(result.monthlyPayment)}
            </strong>

          </div>

          {/* Summary */}

          <div className="loan-summary-grid">

            <div className="loan-summary-item">

              <span>
                Loan Amount
              </span>

              <strong>
                {formatMoney(result.principal)}
              </strong>

            </div>

            <div className="loan-summary-item">

              <span>
                Interest Rate
              </span>

              <strong>
                {result.enteredRate}% {result.rateType}
              </strong>

            </div>

            <div className="loan-summary-item">

              <span>
                Loan Term
              </span>

              <strong>
                {result.term} {result.termType}
              </strong>

            </div>

            <div className="loan-summary-item">

              <span>
                Total Interest
              </span>

              <strong>
                {formatMoney(result.totalInterest)}
              </strong>

            </div>

          </div>

          {/* Total Payment */}

          <div className="loan-total-payment">

            <span>
              Total Payment
            </span>

            <strong>
              = {formatMoney(result.totalPayment)}
            </strong>

          </div>

          {/* PDF */}

          <button
            className="loan-pdf-button"
            onClick={downloadPDF}
          >
            📄 Download PDF
          </button>

        </div>

      )}

    </div>
  )
}

export default LoanCalculator