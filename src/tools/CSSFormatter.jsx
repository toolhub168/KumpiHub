import React, { useState } from "react";
import "./CSSFormatter.css";

const CSSFormatter = () => {
  const [css, setCss] = useState("");
  const [output, setOutput] = useState("");

  const formatCSS = () => {
    if (!css.trim()) {
      setOutput("");
      return;
    }

    const formatted = css
      .replace(/\/\*[\s\S]*?\*\//g, (match) => `\n${match}\n`)
      .replace(/\s*{\s*/g, " {\n  ")
      .replace(/;\s*/g, ";\n  ")
      .replace(/\s*}\s*/g, "\n}\n")
      .replace(/\n\s*\n+/g, "\n")
      .split("\n")
      .map((line) => line.trimEnd())
      .join("\n")
      .replace(/}\n(?=\S)/g, "}\n\n")
      .trim();

    setOutput(formatted);
  };

  const minifyCSS = () => {
    if (!css.trim()) {
      setOutput("");
      return;
    }

    const minified = css
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*([{}:;,>+~])\s*/g, "$1")
      .trim();

    setOutput(minified);
  };

  const copyOutput = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  const clearAll = () => {
    setCss("");
    setOutput("");
  };

  return (
    <div className="css-formatter">

      <div className="css-formatter-section">
        <label htmlFor="css-input">CSS Input</label>

        <textarea
          id="css-input"
          className="css-formatter-textarea"
          value={css}
          onChange={(e) => setCss(e.target.value)}
          placeholder={`Paste your CSS here...

.example {
  color: blue;
  padding: 10px;
}`}
          spellCheck="false"
        />
      </div>

      <div className="css-formatter-actions">
        <button onClick={formatCSS} className="css-btn primary">
          Format CSS
        </button>

        <button onClick={minifyCSS} className="css-btn">
          Minify CSS
        </button>

        <button onClick={clearAll} className="css-btn danger">
          Clear
        </button>
      </div>

      <div className="css-formatter-section">
        <div className="css-output-header">
          <label htmlFor="css-output">Output</label>

          <button
            onClick={copyOutput}
            className="css-copy-btn"
            disabled={!output}
          >
            Copy
          </button>
        </div>

        <textarea
          id="css-output"
          className="css-formatter-textarea output"
          value={output}
          readOnly
          placeholder="Formatted CSS will appear here..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CSSFormatter;