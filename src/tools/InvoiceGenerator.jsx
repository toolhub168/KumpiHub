import { useRef, useState } from 'react'
import { jsPDF } from 'jspdf'
import './InvoiceGenerator.css'

function InvoiceGenerator() {
  const fileInputRef = useRef(null)

  const today = new Date().toISOString().split('T')[0]

  const [logo, setLogo] = useState('')

  const [business, setBusiness] = useState({
    name: '',
    address: '',
    city: '',
    email: '',
    phone: '',
  })

  const [customer, setCustomer] = useState({
    name: '',
    address: '',
    city: '',
    email: '',
  })

  const [invoice, setInvoice] = useState({
    number: 'INV-001',
    date: today,
    dueDate: '',
    tax: 0,
  })

  const [items, setItems] = useState([
    {
      description: '',
      quantity: 1,
      price: 0,
    },
  ])

  const [notes, setNotes] = useState('')

  const updateBusiness = (field, value) => {
    setBusiness((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateCustomer = (field, value) => {
    setCustomer((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateInvoice = (field, value) => {
    setInvoice((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const updateItem = (index, field, value) => {
    setItems((prev) =>
      prev.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]:
                field === 'quantity' || field === 'price'
                  ? Number(value)
                  : value,
            }
          : item
      )
    )
  }

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        description: '',
        quantity: 1,
        price: 0,
      },
    ])
  }

  const removeItem = (index) => {
    if (items.length === 1) return

    setItems((prev) =>
      prev.filter((_, itemIndex) => itemIndex !== index)
    )
  }

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setLogo(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const removeLogo = () => {
    setLogo('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      Number(item.quantity || 0) *
        Number(item.price || 0),
    0
  )

  const taxAmount =
    subtotal * (Number(invoice.tax || 0) / 100)

  const total = subtotal + taxAmount

  const formatMoney = (amount) => {
    return `US$${Number(amount || 0).toFixed(2)}`
  }

  const formatDate = (date) => {
    if (!date) return '-'

    const parsed = new Date(`${date}T00:00:00`)

    return parsed.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const resetInvoice = () => {
    setLogo('')

    setBusiness({
      name: '',
      address: '',
      city: '',
      email: '',
      phone: '',
    })

    setCustomer({
      name: '',
      address: '',
      city: '',
      email: '',
    })

    setInvoice({
      number: 'INV-001',
      date: today,
      dueDate: '',
      tax: 0,
    })

    setItems([
      {
        description: '',
        quantity: 1,
        price: 0,
      },
    ])

    setNotes('')

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const printInvoice = () => {
    window.print()
  }

  const downloadPDF = () => {
    const doc = new jsPDF()

    let y = 20

    // =========================
    // HEADER
    // =========================

    doc.setFontSize(28)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(17, 24, 39)

    doc.text('Invoice', 20, y)

    // Logo

    if (logo) {
      try {
        const imageType = logo.startsWith('data:image/png')
          ? 'PNG'
          : 'JPEG'

        doc.addImage(
          logo,
          imageType,
          155,
          10,
          35,
          25
        )
      } catch {
        // Ignore invalid image
      }
    }

    // =========================
    // INVOICE INFORMATION
    // =========================

    y += 18

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(107, 114, 128)

    doc.text('INVOICE NO.', 20, y)

    doc.setFontSize(10)
    doc.setTextColor(17, 24, 39)

    doc.text(
      invoice.number || 'INV-001',
      20,
      y + 6
    )

    doc.setFontSize(8)
    doc.setTextColor(107, 114, 128)

    doc.text('ISSUE DATE', 75, y)

    doc.setFontSize(10)
    doc.setTextColor(17, 24, 39)

    doc.text(
      formatDate(invoice.date),
      75,
      y + 6
    )

    doc.setFontSize(8)
    doc.setTextColor(107, 114, 128)

    doc.text('DUE DATE', 130, y)

    doc.setFontSize(10)
    doc.setTextColor(17, 24, 39)

    doc.text(
      formatDate(invoice.dueDate),
      130,
      y + 6
    )

    y += 22

    // =========================
    // FROM / BILLED TO
    // =========================

    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(17, 24, 39)

    doc.text('FROM', 20, y)

    doc.text('BILLED TO', 110, y)

    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(55, 65, 81)

    const fromLines = [
      business.name,
      business.address,
      business.city,
      business.email,
      business.phone,
    ].filter(Boolean)

    const billedLines = [
      customer.name,
      customer.address,
      customer.city,
      customer.email,
    ].filter(Boolean)

    fromLines.forEach((line, index) => {
      doc.text(line, 20, y + index * 5)
    })

    billedLines.forEach((line, index) => {
      doc.text(line, 110, y + index * 5)
    })

    y += 32

    // =========================
    // ITEMS
    // =========================

    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(107, 114, 128)

    doc.text('ITEM DESCRIPTION', 20, y)
    doc.text('QTY', 125, y)
    doc.text('AMOUNT', 150, y)

    y += 6

    doc.setDrawColor(229, 231, 235)
    doc.line(20, y, 190, y)

    y += 7

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(17, 24, 39)

    items.forEach((item) => {
      const amount =
        Number(item.quantity || 0) *
        Number(item.price || 0)

      doc.text(
        item.description || 'Item',
        20,
        y
      )

      doc.text(
        String(item.quantity || 0),
        125,
        y
      )

      doc.text(
        formatMoney(amount),
        150,
        y
      )

      y += 7
    })

    // =========================
    // TOTALS
    // =========================

    y += 5

    doc.setDrawColor(229, 231, 235)
    doc.line(20, y, 190, y)

    y += 8

    doc.setFontSize(9)
    doc.setTextColor(107, 114, 128)

    doc.text('Subtotal', 130, y)

    doc.setTextColor(17, 24, 39)

    doc.text(
      formatMoney(subtotal),
      160,
      y
    )

    y += 7

    doc.setTextColor(107, 114, 128)

    doc.text(
      `Tax (${Number(invoice.tax || 0)}%)`,
      130,
      y
    )

    doc.setTextColor(17, 24, 39)

    doc.text(
      formatMoney(taxAmount),
      160,
      y
    )

    y += 9

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(11)
    doc.setTextColor(17, 24, 39)

    doc.text('Total', 130, y)

    doc.setTextColor(37, 99, 235)

    doc.text(
      formatMoney(total),
      160,
      y
    )

    // =========================
    // NOTES
    // =========================

    if (notes.trim()) {
      y += 18

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(8)
      doc.setTextColor(107, 114, 128)

      doc.text('NOTES', 20, y)

      y += 6

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(55, 65, 81)

      const noteLines = doc.splitTextToSize(
        notes,
        170
      )

      doc.text(noteLines, 20, y)
    }

    // =========================
    // FOOTER
    // =========================

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(156, 163, 175)

    doc.text(
      'Thank you for your business.',
      105,
      285,
      { align: 'center' }
    )

    // =========================
    // SAVE
    // =========================

    doc.save(
      `${invoice.number || 'invoice'}.pdf`
    )
  }

  return (
    <div className="invoice-generator">

      <div className="invoice-editor-tip">
        Click any field below and enter your information.
      </div>

      <div className="invoice-preview">

        {/* =========================
            HEADER
        ========================= */}

        <div className="invoice-header">

          <div className="invoice-heading">

            <h1>Invoice</h1>

            <div className="invoice-meta">

              <div>
                <label>Invoice No.</label>

                <input
                  className="invoice-input"
                  value={invoice.number}
                  onChange={(e) =>
                    updateInvoice(
                      'number',
                      e.target.value
                    )
                  }
                  placeholder="INV-001"
                />
              </div>

              <div>
                <label>Issue Date</label>

                <input
                  className="invoice-input"
                  type="date"
                  value={invoice.date}
                  onChange={(e) =>
                    updateInvoice(
                      'date',
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label>Due Date</label>

                <input
                  className="invoice-input"
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) =>
                    updateInvoice(
                      'dueDate',
                      e.target.value
                    )
                  }
                />
              </div>

            </div>

          </div>

          {/* LOGO */}

          <div className="logo-area">

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              hidden
            />

            {!logo ? (
              <button
                type="button"
                className="add-photo-button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                <span>＋</span>
                Add Photo
              </button>
            ) : (
              <div className="logo-preview">

                <img
                  src={logo}
                  alt="Invoice logo"
                />

                <button
                  type="button"
                  onClick={removeLogo}
                >
                  Remove
                </button>

              </div>
            )}

          </div>

        </div>

        {/* =========================
            FROM / BILLED TO
        ========================= */}

        <div className="parties-section">

          <div className="party-column">

            <h3>FROM</h3>

            <div className="party-fields">

              <input
                className="invoice-input"
                value={business.name}
                onChange={(e) =>
                  updateBusiness(
                    'name',
                    e.target.value
                  )
                }
                placeholder="Your business name"
              />

              <input
                className="invoice-input"
                value={business.address}
                onChange={(e) =>
                  updateBusiness(
                    'address',
                    e.target.value
                  )
                }
                placeholder="Street address"
              />

              <input
                className="invoice-input"
                value={business.city}
                onChange={(e) =>
                  updateBusiness(
                    'city',
                    e.target.value
                  )
                }
                placeholder="City, ZIP"
              />

              <input
                className="invoice-input"
                type="email"
                value={business.email}
                onChange={(e) =>
                  updateBusiness(
                    'email',
                    e.target.value
                  )
                }
                placeholder="email@business.com"
              />

            </div>

          </div>

          <div className="party-column">

            <h3>BILLED TO</h3>

            <div className="party-fields">

              <input
                className="invoice-input"
                value={customer.name}
                onChange={(e) =>
                  updateCustomer(
                    'name',
                    e.target.value
                  )
                }
                placeholder="Client name"
              />

              <input
                className="invoice-input"
                value={customer.address}
                onChange={(e) =>
                  updateCustomer(
                    'address',
                    e.target.value
                  )
                }
                placeholder="Street address"
              />

              <input
                className="invoice-input"
                value={customer.city}
                onChange={(e) =>
                  updateCustomer(
                    'city',
                    e.target.value
                  )
                }
                placeholder="City, ZIP"
              />

              <input
                className="invoice-input"
                type="email"
                value={customer.email}
                onChange={(e) =>
                  updateCustomer(
                    'email',
                    e.target.value
                  )
                }
                placeholder="email@client.com"
              />

            </div>

          </div>

        </div>

        {/* =========================
            ITEMS
        ========================= */}

        <div className="items-section">

          <div className="items-header-row">

            <span>ITEM DESCRIPTION</span>
            <span>QTY</span>
            <span>AMOUNT</span>
            <span></span>

          </div>

          {items.map((item, index) => {

            const amount =
              Number(item.quantity || 0) *
              Number(item.price || 0)

            return (
              <div
                className="invoice-item-row"
                key={index}
              >

                <input
                  className="invoice-input item-description"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(
                      index,
                      'description',
                      e.target.value
                    )
                  }
                  placeholder="Item description"
                />

                <input
                  className="invoice-input item-quantity"
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(
                      index,
                      'quantity',
                      e.target.value
                    )
                  }
                />

                <div className="item-amount">
                  {formatMoney(amount)}
                </div>

                <button
                  type="button"
                  className="remove-item"
                  onClick={() =>
                    removeItem(index)
                  }
                  title="Remove item"
                >
                  ×
                </button>

                <div className="item-price-field">

                  <label>Price</label>

                  <input
                    className="invoice-input"
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) =>
                      updateItem(
                        index,
                        'price',
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>
            )
          })}

          <button
            type="button"
            className="add-item-button"
            onClick={addItem}
          >
            + Add item
          </button>

        </div>

        {/* =========================
            NOTES + TOTALS
        ========================= */}

        <div className="invoice-summary">

          <div className="notes-section">

            <label>NOTES</label>

            <textarea
              value={notes}
              onChange={(e) =>
                setNotes(e.target.value)
              }
              placeholder="Project notes, acknowledgements, a personal touch..."
            />

          </div>

          <div className="totals-section">

            <div className="total-row">

              <span>Subtotal</span>

              <strong>
                {formatMoney(subtotal)}
              </strong>

            </div>

            <div className="tax-row">

              <label>Tax (%)</label>

              <input
                className="invoice-input tax-input"
                type="number"
                min="0"
                value={invoice.tax}
                onChange={(e) =>
                  updateInvoice(
                    'tax',
                    e.target.value
                  )
                }
              />

              <strong>
                {formatMoney(taxAmount)}
              </strong>

            </div>

            <div className="grand-total">

              <span>Total</span>

              <strong>
                {formatMoney(total)}
              </strong>

            </div>

          </div>

        </div>

        {/* =========================
            FOOTER
        ========================= */}

        <div className="invoice-footer">
          Thank you for your business.
        </div>

      </div>

      {/* =========================
          ACTIONS
      ========================= */}

      <div className="invoice-actions">

        <button
          type="button"
          className="primary-action"
          onClick={downloadPDF}
        >
          Download PDF
        </button>

        <button
          type="button"
          className="secondary-action"
          onClick={printInvoice}
        >
          Print
        </button>

        <button
          type="button"
          className="reset-action"
          onClick={resetInvoice}
        >
          Reset
        </button>

      </div>

    </div>
  )
}

export default InvoiceGenerator