import React, { useState } from "react";
import "./LogoGenerator.css";

const logoStyles = [
  { id: "modern", name: "Modern" },
  { id: "minimal", name: "Minimal" },
  { id: "badge", name: "Badge" },
  { id: "bold", name: "Bold" },
  { id: "elegant", name: "Elegant" },
  { id: "tech", name: "Tech" },
];

const icons = ["✦", "◆", "●", "▲", "✚", "★", "◇", "⬢"];

const colors = [
  "#2563eb",
  "#7c3aed",
  "#0891b2",
  "#059669",
  "#db2777",
];

function LogoGenerator() {
  const [brandName, setBrandName] = useState("");
  const [tagline, setTagline] = useState("");
  const [style, setStyle] = useState("modern");
  const [selectedColor, setSelectedColor] = useState("#2563eb");
  const [selectedIcon, setSelectedIcon] = useState("✦");
  const [shape, setShape] = useState("square");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logos, setLogos] = useState([]);


 const generateLogos = () => {
  const name = brandName.trim() || "Your Brand";
  const currentTagline = tagline.trim();

  const styleLayouts = {
  modern: [
    "icon-left",
    "icon-top",
    "circle",
    "monogram",
    "badge",
    "minimal",
  ],

  minimal: [
    "minimal",
    "icon-left",
    "icon-top",
    "monogram",
    "circle",
    "badge",
  ],

  badge: [
    "badge",
    "circle",
    "icon-left",
    "icon-top",
    "monogram",
    "minimal",
  ],

  bold: [
    "badge",
    "icon-left",
    "minimal",
    "monogram",
    "icon-top",
    "circle",
  ],

  elegant: [
    "icon-top",
    "circle",
    "minimal",
    "monogram",
    "icon-left",
    "badge",
  ],

  tech: [
    "circle",
    "badge",
    "icon-left",
    "monogram",
    "minimal",
    "icon-top",
  ],
};

 const layouts = styleLayouts[style] || styleLayouts.modern;

const shuffledLayouts = [...layouts].sort(() => Math.random() - 0.5);

const variations = shuffledLayouts.map((layout, index) => ({
      id: index + 1,
      layout,
      name,
      tagline: currentTagline,
      icon: selectedIcon,
      color: selectedColor,
      shape,
      backgroundColor,
     }));

      setLogos(variations);
    };

  const downloadLogo = (logo) => {
    const canvas = document.createElement("canvas");

  if (logo.shape === "square") {
    canvas.width = 1000;
    canvas.height = 1000;
  } else {
    canvas.width = 1000;
    canvas.height = 700;
  }


    const ctx = canvas.getContext("2d");

    ctx.fillStyle = logo.backgroundColor || "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.fillStyle = logo.color;

    if (logo.layout === "icon-left") {
      ctx.font = "150px Arial";
      ctx.fillText(logo.icon, centerX - 230, centerY);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 70px Arial";
      ctx.fillText(logo.name, centerX + 80, centerY - 20);

      if (logo.tagline) {
        ctx.fillStyle = "#64748b";
        ctx.font = "28px Arial";
        ctx.fillText(logo.tagline, centerX + 80, centerY + 55);
      }
    }

    if (logo.layout === "icon-top") {
      ctx.font = "155px Arial";
      ctx.fillText(logo.icon, centerX, centerY - 100);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 70px Arial";
      ctx.fillText(logo.name, centerX, centerY + 30);

      if (logo.tagline) {
        ctx.fillStyle = "#64748b";
        ctx.font = "28px Arial";
        ctx.fillText(logo.tagline, centerX, centerY + 90);
      }
    }

    if (logo.layout === "circle") {
      ctx.beginPath();
      ctx.arc(centerX, centerY, 210, 0, Math.PI * 2);
      ctx.strokeStyle = logo.color;
      ctx.lineWidth = 16;
      ctx.stroke();

      ctx.fillStyle = logo.color;
      ctx.font = "115px Arial";
      ctx.fillText(logo.icon, centerX, centerY - 55);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 48px Arial";
      ctx.fillText(logo.name, centerX, centerY + 65);
    }

    if (logo.layout === "monogram") {
      const firstLetter = logo.name.charAt(0).toUpperCase();

      ctx.fillStyle = logo.color;
      ctx.font = "bold 180px Arial";
      ctx.fillText(firstLetter, centerX, centerY - 20);

      ctx.fillStyle = "#111827";
      ctx.font = "bold 55px Arial";
      ctx.fillText(logo.name, centerX, centerY + 120);
    }

    if (logo.layout === "minimal") {
  const boxWidth = 420;
  const boxHeight = 420;
  const boxX = centerX - boxWidth / 2;
  const boxY = centerY - boxHeight / 2;

  // Logo box
  ctx.strokeStyle = logo.color;
  ctx.lineWidth = 14;
  ctx.strokeRect(
    boxX,
    boxY,
    boxWidth,
    boxHeight
  );

  // Icon
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 105px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.fillText(
    logo.icon,
    centerX,
    centerY - 55
  );

  // Brand name
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 42px Arial";

  ctx.fillText(
    logo.name,
    centerX,
    centerY + 90
  );
}


    if (logo.layout === "badge") {
      ctx.fillStyle = logo.color;
      ctx.beginPath();
      ctx.roundRect(
        centerX - 300,
        centerY - 150,
        600,
        300,
        45
      );
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "105px Arial";
      ctx.fillText(logo.icon, centerX, centerY - 45);

      ctx.font = "bold 50px Arial";
      ctx.fillText(logo.name, centerX, centerY + 65);
    }

    const link = document.createElement("a");
    link.download = `${logo.name.replace(/\s+/g, "-").toLowerCase()}-logo.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="logo-generator">

      <div className="logo-generator-form">

        <div className="logo-field">
          <label>Brand Name</label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Your Brand"
            maxLength={30}
          />
        </div>

        <div className="logo-field">
          <label>Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Your tagline (optional)"
            maxLength={45}
          />
        </div>

        <div className="logo-field">
  <label>Logo Shape</label>

  <div className="logo-shape-grid">
    <button
      type="button"
      className={shape === "square" ? "active" : ""}
      onClick={() => setShape("square")}
    >
      Square
    </button>

    <button
       type="button"
       className={shape === "rectangle" ? "active" : ""}
       onClick={() => setShape("rectangle")}
    >
       Rectangle
     </button>
   </div>
  </div>

        <div className="logo-field">
          <label>Logo Style</label>

          <div className="logo-style-grid">
            {logoStyles.map((item) => (
              <button
                key={item.id}
                type="button"
                className={
                  style === item.id ? "active" : ""
                }
                onClick={() => setStyle(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="logo-field">
          <label>Icon</label>

          <div className="logo-icon-grid">
           
          {icons.map((icon) => (
  <button
    key={icon}
    type="button"
    className={
      selectedIcon === icon ? "active" : ""
    }
    onClick={() => setSelectedIcon(icon)}
  >
    {icon}
  </button>
))}

          </div>
        </div>

        <div className="logo-field">
          <label>Color</label>

          <div className="logo-color-grid">

  {colors.map((color) => (
    <button
      key={color}
      type="button"
      className={
        selectedColor === color ? "active" : ""
      }
      style={{ backgroundColor: color }}
      onClick={() => setSelectedColor(color)}
      aria-label={`Select color ${color}`}
    />
  ))}

  <label className="logo-custom-color">
    <input
      type="color"
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
    />
    <span>Custom</span>
  </label>

</div>
        </div>
        <div className="logo-field">
  <label>Background Color</label>

    <div className="logo-background-grid">

  <button
    type="button"
    style={{ backgroundColor: "#000000" }}
    className={backgroundColor === "#000000" ? "active" : ""}
    onClick={() => setBackgroundColor("#000000")}
  />

  <button
    type="button"
    style={{ backgroundColor: "#ff0000" }}
    className={backgroundColor === "#ff0000" ? "active" : ""}
    onClick={() => setBackgroundColor("#ff0000")}
  />

  <button
    type="button"
    style={{ backgroundColor: "#0000ff" }}
    className={backgroundColor === "#0000ff" ? "active" : ""}
    onClick={() => setBackgroundColor("#0000ff")}
  />

  <button
    type="button"
    style={{ backgroundColor: "#00ff00" }}
    className={backgroundColor === "#00ff00" ? "active" : ""}
    onClick={() => setBackgroundColor("#00ff00")}
  />

  <button
    type="button"
    style={{ backgroundColor: "#ffffff" }}
    className={backgroundColor === "#ffffff" ? "active" : ""}
    onClick={() => setBackgroundColor("#ffffff")}
  />
<label className="logo-custom-color">
    <input
      type="color"
      value={backgroundColor}
      onChange={(e) => setBackgroundColor(e.target.value)}
    />
    <span>Custom</span>
  </label>
</div>
</div>
     

        <button
          className="logo-generate-btn"
          onClick={generateLogos}
        >
          Generate Logos
        </button>

      </div>

      {logos.length > 0 && (
        <div className="logo-results">

          <div className="logo-results-header">
            <div>
              <h3>Logo Variations</h3>
              <p>Choose your favorite design.</p>
            </div>

            <button
              className="logo-regenerate-btn"
              onClick={generateLogos}
            >
              Regenerate
            </button>
          </div>

          <div className="logo-grid">
            {logos.map((logo) => (
             <div
               className={`generated-logo logo-${logo.layout} logo-shape-${logo.shape}`}
               key={logo.id}
               style={{ backgroundColor: logo.backgroundColor }}
             >

                {logo.layout === "icon-left" && (
                  <>
                    <span
                      className="generated-icon"
                      style={{ color: logo.color }}
                    >
                      {logo.icon}
                    </span>

                    <div>
                      <strong>{logo.name}</strong>
                      {logo.tagline && (
                        <small>{logo.tagline}</small>
                      )}
                    </div>
                  </>
                )}

                {logo.layout === "icon-top" && (
                  <div className="logo-center">
                    <span
                      className="generated-icon"
                      style={{ color: logo.color }}
                    >
                      {logo.icon}
                    </span>

                    <strong>{logo.name}</strong>

                    {logo.tagline && (
                      <small>{logo.tagline}</small>
                    )}
                  </div>
                )}

                {logo.layout === "circle" && (
                  <div
                    className="circle-logo"
                    style={{ borderColor: logo.color }}
                  >
                    <span style={{ color: logo.color }}>
                      {logo.icon}
                    </span>
                    <strong>{logo.name}</strong>
                  </div>
                )}

                {logo.layout === "monogram" && (
                  <div className="logo-center">
                    <span
                      className="monogram"
                      style={{ color: logo.color }}
                    >
                      {logo.name.charAt(0).toUpperCase()}
                    </span>

                    <strong>{logo.name}</strong>
                  </div>
                )}

              {logo.layout === "minimal" && (
  <div
    className="icon-inside-logo"
    style={{
      borderColor: logo.color,
      backgroundColor: logo.color,
    }}
  >
    <span className="icon-inside-symbol">
      {logo.icon}
    </span>

    <strong>{logo.name}</strong>
  </div>
)}



                {logo.layout === "badge" && (
                  <div
                    className="badge-logo"
                    style={{ backgroundColor: logo.color }}
                  >
                    <span>{logo.icon}</span>
                    <strong>{logo.name}</strong>
                  </div>
                )}

                <button
                  className="logo-download-btn"
                  onClick={() => downloadLogo(logo)}
                >
                  Download PNG
                </button>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

export default LogoGenerator;