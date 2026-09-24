import { useState } from "react";
import "./TextDiff.css";

function TextDiff() {
  const [originalText, setOriginalText] = useState("");
  const [newText, setNewText] = useState("");
  const [diff, setDiff] = useState([]);
  const [hasCompared, setHasCompared] = useState(false);

  const compareText = () => {
    const oldWords = originalText.split(/(\s+)/);
    const newWords = newText.split(/(\s+)/);

    const result = [];
    const maxLength = Math.max(oldWords.length, newWords.length);

    for (let i = 0; i < maxLength; i++) {
      const oldWord = oldWords[i];
      const newWord = newWords[i];

      if (oldWord === newWord) {
        if (oldWord !== undefined) {
          result.push({
            type: "same",
            text: oldWord,
          });
        }
      } else {
        if (oldWord !== undefined) {
          result.push({
            type: "removed",
            text: oldWord,
          });
        }

        if (newWord !== undefined) {
          result.push({
            type: "added",
            text: newWord,
          });
        }
      }
    }

    setDiff(result);
    setHasCompared(true);
  };

  const clearAll = () => {
    setOriginalText("");
    setNewText("");
    setDiff([]);
    setHasCompared(false);
  };

  const copyResult = async () => {
    const resultText = diff
      .map((item) => {
        if (item.type === "removed") {
          return `- ${item.text}`;
        }

        if (item.type === "added") {
          return `+ ${item.text}`;
        }

        return item.text;
      })
      .join("");

    try {
      await navigator.clipboard.writeText(resultText);
    } catch (error) {
      console.error("Unable to copy result:", error);
    }
  };

  const wordCount = (text) => {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  };

  return (
    <div className="text-diff">
      <div className="text-diff-header">
        <div>

        </div>
      </div>

      <div className="text-diff-inputs">
        <div className="text-diff-box">
          <div className="text-diff-box-header">
            <span>Original Text</span>
            <span>{wordCount(originalText)} words</span>
          </div>

          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            placeholder="Paste your original text here..."
          />
        </div>

        <div className="text-diff-box">
          <div className="text-diff-box-header">
            <span>New Text</span>
            <span>{wordCount(newText)} words</span>
          </div>

          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Paste your new text here..."
          />
        </div>
      </div>

      <div className="text-diff-actions">
        <button className="text-diff-primary" onClick={compareText}>
          Compare
        </button>

        <button className="text-diff-secondary" onClick={clearAll}>
          Clear
        </button>
      </div>

      {hasCompared && (
        <div className="text-diff-result">
          <div className="text-diff-result-header">
            <div>
              <h3>Differences</h3>
              <div className="text-diff-legend">
                <span className="legend-added">Added</span>
                <span className="legend-removed">Removed</span>
              </div>
            </div>

            <button
              className="text-diff-copy"
              onClick={copyResult}
              disabled={diff.length === 0}
            >
              Copy Result
            </button>
          </div>

          <div className="text-diff-content">
            {diff.length === 0 ? (
              <div className="text-diff-no-change">
                ✓ No differences found
              </div>
            ) : (
              diff.map((item, index) => (
                <span
                  key={`${item.type}-${index}`}
                  className={`diff-${item.type}`}
                >
                  {item.text}
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TextDiff;