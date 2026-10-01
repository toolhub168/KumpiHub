import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";
import { toPng } from "html-to-image";
import "./CVBuilderNew.css";
import CVTemplate2 from "../CVtools/CVTemplate2";
import CVTemplate3 from "../CVtools/CVTemplate3";

const defaultCV = {
  name: "John Tommy",
  title: "Administrative Assistant",

  phone: "+855 00000000",
  email: "kumpihub@gmail.com",
  location: "Phnom Penh, Cambodia",

  photo: "",

  skills: [
    "Communication",
    "Team Collaboration",
    "Customer Support",
    "Time Management",
    "Problem Solving",
    "Office Organization",
    "Microsoft Office Basics",
    "Basic English",
  ],

  strengths: [
    "Responsible and dependable",
    "Friendly and respectful",
    "Willing to learn",
    "Detail-oriented",
    "Positive and cooperative",
    "Adaptable to new situations",
  ],

  languages: [
    "Khmer — Native",
    "English — Basic",
    "Chinese — Basic",
  ],

  about:
    "I am a motivated young professional seeking an opportunity to develop my skills in a professional workplace. I am willing to learn, take responsibility, and work cooperatively with a team. I am organized, respectful, and committed to completing assigned tasks carefully and on time.",

  gender: "Male",
  dob: "14 March 2000",
  birthplace: "Phnom Penh",
  nationality: "Cambodian",
  marital: "Single",
  health: "Good",

  education1Year: "2022–2025",
  education1Title: "High School Diploma",
  education1School: "Phillips Academy Andover",
  education1Location: "Andover, Massachusetts, USA",

  education2Year: "2019–2022",
  education2Title: "Lower Secondary Education",
  education2School: "Boston Latin School",
  education2Location: "Boston, Massachusetts, USA",

  workTitle: "Entry-Level Administrative Candidate",

  work: [
    "Assisted with organizing documents and maintaining basic records.",
    "Supported daily office tasks and helped keep information properly organized.",
    "Communicated politely with team members and responded to routine requests.",
    "Assisted with scheduling, simple data entry, and general administrative duties.",
    "Worked carefully to complete assigned tasks within expected timeframes.",
    "Developed a strong interest in office administration and professional development.",
  ],
};

function EditableText({ value, onChange, className = "" }) {
   return (
  <input
    className={`cv-new-input ${className}`}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onFocus={(e) => {
      e.currentTarget.style.color = "#172554";
      e.currentTarget.style.backgroundColor = "#ffffff";
    }}
    onBlur={(e) => {
      e.currentTarget.style.color = "";
      e.currentTarget.style.backgroundColor = "";
    }}
  />
);
}

function SectionTitle({ children }) {
  return <h2 className="cv-new-section-title">{children}</h2>;
}

export default function CVBuilderNew() {
  const [cv, setCV] = useState(defaultCV);
const [template, setTemplate] = useState(1);

const [zoom, setZoom] = useState(1);
const [pan, setPan] = useState({ x: 0, y: 0 });
const pinchRef = useRef({
  active: false,
  startDistance: 0,
  startZoom: 1,
});
const pointersRef = useRef(new Map());
const canvasRef = useRef(null);
const draggingRef = useRef(false);
const dragStartRef = useRef({
  x: 0,
  y: 0,
  panX: 0,
  panY: 0,
});
const editingRef = useRef(false);
const editingViewRef = useRef({
  zoom: 1,
  pan: { x: 0, y: 0 },
});
const focusModeRef = useRef(false);


  const update = (key, value) => {
    setCV((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateArray = (key, index, value) => {
    setCV((prev) => {
      const updated = [...prev[key]];
      updated[index] = value;

      return {
        ...prev,
        [key]: updated,
      };
    });
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      update("photo", reader.result);
    };

    reader.readAsDataURL(file);
  };
  useEffect(() => {
  const fitCanvas = () => {
  const width = window.innerWidth;

  if (width <= 600) {
    const fit = Math.min((width - 24) / 794, 0.8);
    setZoom(Math.max(0.45, fit));
  } else {
    setZoom(1);
  }

  setPan({ x: 0, y: 0 });
};

  fitCanvas();

  window.addEventListener("resize", fitCanvas);

  return () => {
    window.removeEventListener("resize", fitCanvas);
  };
}, []);

const changeZoom = (amount) => {
  setZoom((prev) => {
    const next = Math.min(1.5, Math.max(0.45, prev + amount));

    return Number(next.toFixed(2));
  });
};

const resetZoom = () => {
  const width = window.innerWidth;

  if (width <= 600) {
    const fit = Math.min((width - 24) / 794, 0.8);
    setZoom(Math.max(0.45, fit));
  } else {
    setZoom(1);
  }

  setPan({ x: 0, y: 0 });
};
const handleCanvasFocus = (e) => {
  const target = e.target;

  if (!target.matches("input, textarea")) return;

  // Focus mode only on mobile
  if (window.innerWidth > 600) {
    return;
  }

  const canvas = canvasRef.current;

  if (!canvas) return;

  if (!editingRef.current) {
    editingRef.current = true;

    editingViewRef.current = {
      zoom,
      pan: { ...pan },
    };
  }

  focusModeRef.current = true;

  const focusZoom = Math.min(
    1.15,
    Math.max(0.8, zoom)
  );

  setZoom(Number(focusZoom.toFixed(2)));

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const canvasRect = canvas.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      const targetCenterX =
        targetRect.left + targetRect.width / 2;

      const targetCenterY =
        targetRect.top + targetRect.height / 2;

      const canvasCenterX =
        canvasRect.left + canvasRect.width / 2;

      const canvasCenterY =
        canvasRect.top + canvasRect.height * 0.38;


      const moveX =
        canvasCenterX - targetCenterX;

      const moveY =
        canvasCenterY - targetCenterY;

      setPan((current) => ({
        x: current.x + moveX,
        y: current.y + moveY,
      }));
    });
  });
};


const handleCanvasBlur = (e) => {
  const nextTarget = e.relatedTarget;

  // Moving directly from one field to another
  // should NOT reset the view.
  if (
    nextTarget &&
    nextTarget.matches &&
    nextTarget.matches("input, textarea")
  ) {
    return;
  }
  if (window.innerWidth > 600) return;
  if (!editingRef.current) return;

  editingRef.current = false;
  focusModeRef.current = false;

  setZoom(editingViewRef.current.zoom);
  setPan(editingViewRef.current.pan);
};
const handleDownloadPDF = async () => {
  const element = document.querySelector(
    ".cv-builder-stage .cv3-paper, " +
    ".cv-builder-stage .cv-template2-paper, " +
    ".cv-builder-stage .cv-new-paper"
  );

  if (!element) return;

  const stage = element.closest(".cv-builder-stage");
  const oldTransform = stage?.style.transform || "";

  if (stage) {
    stage.style.transform = "none";
  }

  // Compact layout only while exporting
  const style = document.createElement("style");

  style.id = "cv-pdf-export-style";

 style.textContent = `
  .cv3-paper {
    height: 1123px !important;
    min-height: 1123px !important;
  }

  .cv3-header {
    height: 245px !important;
  }

  .cv3-blue-area {
    height: 245px !important;
  }

  .cv3-header-content {
    padding-top: 48px !important;
  }

  .cv3-header-info {
    padding-top: 25px !important;
  }

  .cv3-contact {
    bottom: 22px !important;
  }

  .cv3-body {
    padding-bottom: 25px !important;
  }

  .cv3-section {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
  }

  .cv3-section-title {
    margin-bottom: 9px !important;
    padding-top: 4px !important;
    padding-bottom: 4px !important;
  }

  .cv3-education {
    gap: 10px !important;
  }

  .cv3-two-column {
    column-gap: 35px !important;
  }

  .cv3-list {
    gap: 4px !important;
  }

  .cv3-languages {
    gap: 12px !important;
  }

  .cv3-work-section {
    padding-bottom: 0 !important;
  }
`;

  document.head.appendChild(style);

  try {
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(resolve);
      });
    });
    // Wait for all images to finish loading before exporting
    const images = Array.from(element.querySelectorAll("img"));

    await Promise.all(
      images.map((img) => {
        if (img.complete) {
          return img.decode ? img.decode().catch(() => {}) : Promise.resolve();
        }

        return new Promise((resolve) => {
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
      })
    );

    const dataUrl = await toPng(element, {
      width: 794,
      height: 1123,
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#ffffff",
      style: {
        transform: "none",
        transformOrigin: "top left",
      },
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdf.addImage(
      dataUrl,
      "PNG",
      0,
      0,
      210,
      297
    );

    pdf.save(`${cv.name || "KumpiHub-CV"}.pdf`);
  } catch (error) {
    console.error("PDF export failed:", error);
    alert("Failed to create PDF. Please try again.");
  } finally {
    style.remove();

    if (stage) {
      stage.style.transform = oldTransform;
    }
  }
};


const handlePointerDown = (e) => {
  pointersRef.current.set(e.pointerId, {
    x: e.clientX,
    y: e.clientY,
  });

  if (pointersRef.current.size === 2) {
    const points = [...pointersRef.current.values()];

    const distance = Math.hypot(
      points[1].x - points[0].x,
      points[1].y - points[0].y
    );

    pinchRef.current = {
      active: true,
      startDistance: distance,
      startZoom: zoom,
    };

    draggingRef.current = false;
    return;
  }

  if (
    e.target.closest(
      "input, textarea, button, label, img, [contenteditable='true']"
    )
  ) {
    return;
  }

  draggingRef.current = true;

  dragStartRef.current = {
    x: e.clientX,
    y: e.clientY,
    panX: pan.x,
    panY: pan.y,
  };

  e.currentTarget.setPointerCapture(e.pointerId);
};

const handlePointerMove = (e) => {
  if (pointersRef.current.has(e.pointerId)) {
    pointersRef.current.set(e.pointerId, {
      x: e.clientX,
      y: e.clientY,
    });
  }

  if (
    pinchRef.current.active &&
    pointersRef.current.size === 2
  ) {
    const points = [...pointersRef.current.values()];

    const distance = Math.hypot(
      points[1].x - points[0].x,
      points[1].y - points[0].y
    );

    const ratio =
      distance / pinchRef.current.startDistance;

    const nextZoom = Math.min(
      1.5,
      Math.max(
        0.45,
        pinchRef.current.startZoom * ratio
      )
    );

    setZoom(Number(nextZoom.toFixed(2)));

    return;
  }

  if (!draggingRef.current) return;

  const dx = e.clientX - dragStartRef.current.x;
  const dy = e.clientY - dragStartRef.current.y;

  setPan({
    x: dragStartRef.current.panX + dx,
    y: dragStartRef.current.panY + dy,
  });
};


const handlePointerUp = (e) => {
  pointersRef.current.delete(e.pointerId);

  if (pinchRef.current.active) {
    if (pointersRef.current.size < 2) {
      pinchRef.current.active = false;
    }

    return;
  }

  if (!draggingRef.current) return;

  draggingRef.current = false;

  try {
    e.currentTarget.releasePointerCapture(e.pointerId);
  } catch {}

  const canvas = canvasRef.current;

  if (!canvas) return;

  const rect = canvas.getBoundingClientRect();

  const paperWidth = 794 * zoom;
  const paperHeight = 1123 * zoom;

  const normalMaxX =
  paperWidth > rect.width
    ? (paperWidth - rect.width) / 2
    : 0;

const normalMaxY =
  paperHeight > rect.height
    ? (paperHeight - rect.height) / 2
    : 0;

// Focus mode allows the user to move the CV
// much farther outside the visible screen.
const extraMoveX = rect.width * 0.8;
const extraMoveY = rect.height * 0.8;

const maxX = focusModeRef.current
  ? normalMaxX + extraMoveX
  : normalMaxX;

const maxY = focusModeRef.current
  ? normalMaxY + extraMoveY
  : normalMaxY;

setPan((current) => ({
  x: Math.max(
    -maxX,
    Math.min(maxX, current.x)
  ),

  y: Math.max(
    -maxY,
    Math.min(maxY, current.y)
  ),
}));
};

 return (
  <div className="cv-builder-tool">
    {/* TEMPLATE SWITCHER */}
    <div className="cv-template-switcher">
  <button
    className={template === 1 ? "active" : ""}
    onClick={() => setTemplate(1)}
  >
     Template 1
   </button>

   <button
     className={template === 2 ? "active" : ""}
     onClick={() => setTemplate(2)}
  >
     Template 2
   </button>

    <button
       className={template === 3 ? "active" : ""}
       onClick={() => setTemplate(3)}
   >
      Template 3
     </button>
   </div>
   <div className="cv-toolbar">
  <div className="cv-canvas-controls">
    <button type="button" onClick={() => changeZoom(-0.1)} aria-label="Zoom out">
      −
    </button>

    <button type="button" className="cv-zoom-value" onClick={resetZoom}>
      {Math.round(zoom * 100)}%
    </button>

    <button type="button" onClick={() => changeZoom(0.1)} aria-label="Zoom in">
      +
    </button>
  </div>

  <div className="cv-canvas-actions">
    <button
      type="button"
      className="cv-download-btn"
      onClick={handleDownloadPDF}
    >
      Download PDF
    </button>
  </div>
</div>


    {template === 1 && (
  <div
  ref={canvasRef}
  className="cv-builder-canvas"
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerCancel={handlePointerUp}
  onFocus={handleCanvasFocus}
  onBlur={handleCanvasBlur}
  >

    <div
      className="cv-builder-stage"
      style={{
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
      }}
    >
      <div className="cv-new-builder">

      <div className="cv-new-paper">

        {/* LEFT SIDEBAR */}
        <aside className="cv-new-sidebar">

          {/* PROFILE PHOTO */}
          <div className="cv-new-photo-area">

            <label className="cv-new-photo">
              {cv.photo ? (
                <img src={cv.photo} alt="Profile" />
              ) : (
                <span>PHOTO</span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
              />
            </label>

            <div className="cv-new-photo-hint">
              Add Photo
            </div>

          </div>

          {/* CONTACT */}
          <section className="cv-new-side-section">

            <SectionTitle>Contact</SectionTitle>

            <div className="cv-new-contact-item">
              <span>☎</span>

              <EditableText
                value={cv.phone}
                onChange={(v) => update("phone", v)}
                className="cv-new-side-input"
              />
            </div>

            <div className="cv-new-contact-item">
              <span>✉</span>

              <EditableText
                value={cv.email}
                onChange={(v) => update("email", v)}
                className="cv-new-side-input"
              />
            </div>

            <div className="cv-new-contact-item">
              <span>⌖</span>

              <EditableText
                value={cv.location}
                onChange={(v) => update("location", v)}
                className="cv-new-side-input"
              />
            </div>

          </section>

          {/* SKILLS */}
          <section className="cv-new-side-section">

            <SectionTitle>Skills</SectionTitle>

            <div className="cv-new-one-column">

              {cv.skills.map((skill, index) => (
                <div className="cv-new-bullet" key={index}>

                  <span>•</span>

                  <EditableText
                    value={skill}
                    onChange={(v) =>
                      updateArray("skills", index, v)
                    }
                  />

                </div>
              ))}

            </div>

          </section>

          {/* STRENGTHS */}
          <section className="cv-new-side-section">

            <SectionTitle>Strengths</SectionTitle>

            <div className="cv-new-one-column">

              {cv.strengths.map((item, index) => (
                <div className="cv-new-bullet" key={index}>

                  <span>•</span>

                  <EditableText
                    value={item}
                    onChange={(v) =>
                      updateArray("strengths", index, v)
                    }
                  />

                </div>
              ))}

            </div>

          </section>

          {/* LANGUAGES */}
          <section className="cv-new-side-section">

            <SectionTitle>Languages</SectionTitle>

            <div className="cv-new-language-list">

              {cv.languages.map((language, index) => (
                <div className="cv-new-bullet" key={index}>

                  <span>•</span>

                  <EditableText
                    value={language}
                    onChange={(v) =>
                      updateArray("languages", index, v)
                    }
                  />

                </div>
              ))}

            </div>

          </section>

        </aside>

        {/* RIGHT CONTENT */}
        <main className="cv-new-main">

          {/* NAME + POSITION */}
       <div className="cv-new-name-block">

     <EditableText
        value={cv.name}
        onChange={(v) => update("name", v)}
        className="cv-new-name"
   />

      <div className="cv-new-position-label">
          Position Applied For
     </div>

        <EditableText
            value={cv.title}
            onChange={(v) => update("title", v)}
            className="cv-new-main-position"
       />

          <div className="cv-new-name-line" />

         </div>

          {/* ABOUT */}
          <section className="cv-new-section">

            <SectionTitle>About Me</SectionTitle>

            <textarea
              className="cv-new-about"
              value={cv.about}
              onChange={(e) =>
                update("about", e.target.value)
              }
            />

          </section>

          {/* PERSONAL INFORMATION */}
          <section className="cv-new-section">

            <SectionTitle>Personal Information</SectionTitle>

            <div className="cv-new-personal-grid">

              <div className="cv-new-personal-row">
                <span>Full Name</span>

                <EditableText
                  value={cv.name}
                  onChange={(v) => update("name", v)}
                />
              </div>

              <div className="cv-new-personal-row">
                <span>Gender</span>

                <EditableText
                  value={cv.gender}
                  onChange={(v) => update("gender", v)}
                />
              </div>

              <div className="cv-new-personal-row">
                <span>Date of Birth</span>

                <EditableText
                  value={cv.dob}
                  onChange={(v) => update("dob", v)}
                />
              </div>

              <div className="cv-new-personal-row">
                <span>Place of Birth</span>

                <EditableText
                  value={cv.birthplace}
                  onChange={(v) =>
                    update("birthplace", v)
                  }
                />
              </div>

              <div className="cv-new-personal-row">
                <span>Nationality</span>

                <EditableText
                  value={cv.nationality}
                  onChange={(v) =>
                    update("nationality", v)
                  }
                />
              </div>

              <div className="cv-new-personal-row">
                <span>Marital Status</span>

                <EditableText
                  value={cv.marital}
                  onChange={(v) =>
                    update("marital", v)
                  }
                />
              </div>

              <div className="cv-new-personal-row">
                <span>Health</span>

                <EditableText
                  value={cv.health}
                  onChange={(v) =>
                    update("health", v)
                  }
                />
              </div>

            </div>

          </section>

          {/* EDUCATION */}
          <section className="cv-new-section">

            <SectionTitle>Education</SectionTitle>

            <div className="cv-new-education">

              <div className="cv-new-education-item">

                <EditableText
                  value={cv.education1Year}
                  onChange={(v) =>
                    update("education1Year", v)
                  }
                  className="cv-new-year"
                />

                <div className="cv-new-education-content">

                  <EditableText
                    value={cv.education1Title}
                    onChange={(v) =>
                      update("education1Title", v)
                    }
                    className="cv-new-entry-title"
                  />

                  <EditableText
                    value={cv.education1School}
                    onChange={(v) =>
                      update("education1School", v)
                    }
                    className="cv-new-school"
                  />

                  <EditableText
                    value={cv.education1Location}
                    onChange={(v) =>
                      update("education1Location", v)
                    }
                    className="cv-new-location"
                  />

                </div>

              </div>

              <div className="cv-new-education-item">

                <EditableText
                  value={cv.education2Year}
                  onChange={(v) =>
                    update("education2Year", v)
                  }
                  className="cv-new-year"
                />

                <div className="cv-new-education-content">

                  <EditableText
                    value={cv.education2Title}
                    onChange={(v) =>
                      update("education2Title", v)
                    }
                    className="cv-new-entry-title"
                  />

                  <EditableText
                    value={cv.education2School}
                    onChange={(v) =>
                      update("education2School", v)
                    }
                    className="cv-new-school"
                  />

                  <EditableText
                    value={cv.education2Location}
                    onChange={(v) =>
                      update("education2Location", v)
                    }
                    className="cv-new-location"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* WORK EXPERIENCE */}
          <section className="cv-new-section">

            <SectionTitle>Work Experience</SectionTitle>

            <EditableText
              value={cv.workTitle}
              onChange={(v) => update("workTitle", v)}
              className="cv-new-work-title"
            />

            <div className="cv-new-work-list">

              {cv.work.map((item, index) => (
                <div className="cv-new-work-item" key={index}>

                  <span>•</span>

                  <EditableText
                    value={item}
                    onChange={(v) =>
                      updateArray("work", index, v)
                    }
                  />

                </div>
              ))}

            </div>

          </section>

       </main>
      </div>
    </div>
    </div>
  </div>
)}

    {template === 2 && (
  <div
    ref={canvasRef}
    className="cv-builder-canvas"
    onPointerDown={handlePointerDown}
    onPointerMove={handlePointerMove}
    onPointerUp={handlePointerUp}
    onPointerCancel={handlePointerUp}
    onFocus={handleCanvasFocus}
    onBlur={handleCanvasBlur}
  >
    <div
      className="cv-builder-stage"
      style={{
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
      }}
    >
      <CVTemplate2
        cv={cv}
        update={update}
        updateArray={updateArray}
        handlePhoto={handlePhoto}
      />
    </div>
  </div>
)}

    {template === 3 && (
  <div
    ref={canvasRef}
    className="cv-builder-canvas"
    onPointerDown={handlePointerDown}
    onPointerMove={handlePointerMove}
    onPointerUp={handlePointerUp}
    onPointerCancel={handlePointerUp}
    onFocus={handleCanvasFocus}
    onBlur={handleCanvasBlur}
  >
    <div
      className="cv-builder-stage"
      style={{
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
      }}
    >
      <CVTemplate3
        cv={cv}
        update={update}
        updateArray={updateArray}
        handlePhoto={handlePhoto}
      />
    </div>
  </div>
)}
  </div>
  );
}
