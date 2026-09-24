import React, { useState } from "react";
import "./HTMLFormatter.css";

const HTMLFormatter = () => {
  const [html, setHtml] = useState("");
  const [output, setOutput] = useState("");

  const formatHTML = () => {
    if (!html.trim()) {
      setOutput("");
      return;
    }

    const formatted = html
      .replace(/>\s*</g, "><")
      .replace(/></g, ">\n<")
      .split("\n")
      .reduce((result, line) => {
        const tag = line.trim();

        if (!tag) return result;

        if (/^<\//.test(tag)) {
          result.indent = Math.max(0, result.indent - 1);
        }

        result.lines.push("  ".repeat(result.indent) + tag);

        if (
          /^<[^!/?][^>]*>$/.test(tag) &&
          !/\/>$/.test(tag) &&
          !/<\/[^>]+>$/.test(tag)
        ) {
          result.indent++;
        }

        return result;
      }, { lines: [], indent: 0 })
      .lines.join("\n")
      .trim();

    setOutput(formatted);
  };

  const minifyHTML = () => {
    if (!html.trim()) {
      setOutput("");
      return;
    }

    const minified = html
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/\s+/g, " ")
      .replace(/>\s+</g, "><")
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
    setHtml("");
    setOutput("");
  };

  return (
    <div className="html-formatter">
      <div className="html-formatter-header">
        
      </div>

      <div className="html-formatter-section">
        <label htmlFor="html-input">HTML Input</label>

        <textarea
          id="html-input"
          className="html-formatter-textarea"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder={`Paste your HTML here...

<div class="card">
  <h2>Hello</h2>
  <p>Welcome to KumpiHub</p>
</div>`}
          spellCheck="false"
        />
      </div>

      <div className="html-formatter-actions">
        <button
          onClick={formatHTML}
          className="html-btn primary"
        >
          Format HTML
        </button>

        <button
          onClick={minifyHTML}
          className="html-btn"
        >
          Minify HTML
        </button>

        <button
          onClick={clearAll}
          className="html-btn danger"
        >
          Clear
        </button>
      </div>

      <div className="html-formatter-section">
        <div className="html-output-header">
          <label htmlFor="html-output">Output</label>

          <button
            onClick={copyOutput}
            className="html-copy-btn"
            disabled={!output}
          >
            Copy
          </button>
        </div>

        <textarea
          id="html-output"
          className="html-formatter-textarea output"
          value={output}
          readOnly
          placeholder="Formatted HTML will appear here..."
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default HTMLFormatter;