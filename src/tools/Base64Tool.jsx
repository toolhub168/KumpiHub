import React, { useState } from "react";
import "./Base64Tool.css";

function Base64Tool() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    setError("");

    if (!input.trim()) {
      setOutput("");
      return;
    }

    try {
      if (mode === "encode") {
        const encoded = btoa(
          unescape(encodeURIComponent(input))
        );
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(
          escape(atob(input.trim()))
        );
        setOutput(decoded);
      }
    } catch {
      setOutput("");
      setError("Invalid Base64 text.");
    }
  };

  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // Ignore clipboard errors
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
  };

  const inputLabel =
    mode === "encode" ? "Text" : "Base64";

  const outputLabel =
    mode === "encode" ? "Base64" : "Text";

  const inputPlaceholder =
    mode === "encode"
      ? "Type or paste your text..."
      : "Paste Base64 here...";

  return (
    <div className="base64-tool">
      <div className="base64-mode-switch">
        <button
          className={mode === "encode" ? "active" : ""}
          onClick={() => handleModeChange("encode")}
        >
          Encode
        </button>

        <button
          className={mode === "decode" ? "active" : ""}
          onClick={() => handleModeChange("decode")}
        >
          Decode
        </button>
      </div>

      <div className="base64-field">
        <label>{inputLabel}</label>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputPlaceholder}
        />
      </div>

      <button
        className="base64-convert-btn"
        onClick={handleConvert}
      >
        {mode === "encode" ? "Encode" : "Decode"}
      </button>

      {error && (
        <div className="base64-error">
          {error}
        </div>
      )}

      <div className="base64-field">
        <div className="base64-output-header">
          <label>{outputLabel}</label>

          {output && (
            <button
              className="base64-copy-btn"
              onClick={handleCopy}
            >
              Copy
            </button>
          )}
        </div>

        <textarea
          className="base64-output"
          value={output}
          readOnly
          placeholder="Result will appear here..."
        />
      </div>
    </div>
  );
}

export default Base64Tool;