import React, { useState } from "react";
import "./MetaTagTool.css";

function MetaTagTool() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [robots, setRobots] = useState("index, follow");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateMetaTags = () => {
    const tags = [];

    if (title.trim()) {
      tags.push(`<title>${title.trim()}</title>`);
    }

    if (description.trim()) {
      tags.push(
        `<meta name="description" content="${description.trim()}">`
      );
    }

    if (keywords.trim()) {
      tags.push(
        `<meta name="keywords" content="${keywords.trim()}">`
      );
    }

    if (author.trim()) {
      tags.push(
        `<meta name="author" content="${author.trim()}">`
      );
    }

    if (url.trim()) {
      tags.push(
        `<link rel="canonical" href="${url.trim()}">`
      );
    }

    if (robots.trim()) {
      tags.push(
        `<meta name="robots" content="${robots}">`
      );
    }

    setOutput(tags.join("\n"));
    setCopied(false);
  };

  const handleCopy = async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Ignore clipboard errors
    }
  };

  return (
    <div className="meta-tag-tool">
      <div className="meta-tag-fields">

        <div className="meta-tag-field">
          <label>Website Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Website"
          />
        </div>

        <div className="meta-tag-field">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your website..."
          />
        </div>

        <div className="meta-tag-row">

          <div className="meta-tag-field">
            <label>Keywords</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="tools, website, online"
            />
          </div>

          <div className="meta-tag-field">
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name"
            />
          </div>

        </div>

        <div className="meta-tag-row">

          <div className="meta-tag-field">
            <label>Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          <div className="meta-tag-field">
            <label>Robots</label>
            <select
              value={robots}
              onChange={(e) => setRobots(e.target.value)}
            >
              <option value="index, follow">Index, Follow</option>
              <option value="noindex, follow">Noindex, Follow</option>
              <option value="index, nofollow">Index, Nofollow</option>
              <option value="noindex, nofollow">
                Noindex, Nofollow
              </option>
            </select>
          </div>

        </div>

      </div>

      <button
        className="meta-tag-generate-btn"
        onClick={generateMetaTags}
      >
        Generate Meta Tags
      </button>

      <div className="meta-tag-output-section">

        <div className="meta-tag-output-header">
          <label>Generated Meta Tags</label>

          {output && (
            <button
              className="meta-tag-copy-btn"
              onClick={handleCopy}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>

        <textarea
          className="meta-tag-output"
          value={output}
          readOnly
          placeholder="Your meta tags will appear here..."
        />

      </div>
    </div>
  );
}

export default MetaTagTool;
