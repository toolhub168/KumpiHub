import { useState } from 'react'
import './UUIDGenerator.css'

function UUIDGenerator() {
  const [uuids, setUuids] = useState([])
  const [count, setCount] = useState(1)

  const generateUUID = () => {
    const newUuids = Array.from({ length: count }, () =>
      crypto.randomUUID()
    )

    setUuids(newUuids)
  }

  const copyUUID = async (uuid) => {
    await navigator.clipboard.writeText(uuid)
    alert('UUID copied!')
  }

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join('\n'))
    alert('All UUIDs copied!')
  }

  const clearUUIDs = () => {
    setUuids([])
  }

  return (
    <div className="uuid-generator">
      <div className="uuid-header">
      </div>

      <div className="uuid-controls">
        <div className="uuid-count">
          <label>Number of UUIDs</label>

          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            <option value={1}>1</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

       <div className="uuid-actions">
  <button
    className="uuid-generate-button"
    onClick={generateUUID}
  >
    Generate UUID
  </button>

  {uuids.length > 0 && (
    <button
      className="uuid-clear-button"
      onClick={clearUUIDs}
    >
      Clear
    </button>
  )}
</div>
      </div>

      {uuids.length > 0 && (
        <div className="uuid-result">
          <div className="uuid-result-header">
            <span>
              Generated UUIDs ({uuids.length})
            </span>

            <button onClick={copyAll}>
              Copy All
            </button>
          </div>

          <div className="uuid-list">
            {uuids.map((uuid) => (
              <div className="uuid-item" key={uuid}>
                <span>{uuid}</span>

                <button onClick={() => copyUUID(uuid)}>
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uuids.length === 0 && (
        <div className="uuid-empty">
          <div className="uuid-empty-icon">ID</div>
          <p>Your generated UUIDs will appear here.</p>
        </div>
      )}
    </div>
  )
}

export default UUIDGenerator
