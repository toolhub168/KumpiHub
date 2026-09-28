import React, { useRef, useState } from "react";
import "./CVBuilder.css";
import html2pdf from "html2pdf.js";

const defaultCV = {
  name: "Your Name",
  title: "Professional Title",
  email: "you@example.com",
  phone: "+1 234 567 890",
  location: "Your City, Country",
  profile:
    "A motivated professional with experience and a strong interest in creating meaningful results.",
  job1: "Your Job Position",
  company1: "Company Name",
  date1: "2022 — Present",
  desc1:
    "Describe your responsibilities, achievements and important contributions.",
  job2: "Previous Position",
  company2: "Previous Company",
  date2: "2020 — 2022",
  desc2: "Describe your previous experience and achievements.",
  education: "Degree / Major",
  school: "University or School",
  eduDate: "2016 — 2020",
  skill1: "Communication",
  skill2: "Problem Solving",
  skill3: "Teamwork",
  skill4: "Leadership",
  project1: "E-Commerce Website",
  project1Date: "2024 — 2025",
  project1Desc:
    "Built a responsive online store with a clean and user-friendly interface.",

  project2: "Inventory Management System",
  project2Date: "2023 — 2024",
  project2Desc:
    "Created a simple system for tracking products, stock and daily operations.",

  language1: "Khmer",
  language1Level: "Native",

  language2: "English",
  language2Level: "Intermediate",

  language3: "Chinese",
  language3Level: "Basic",
};

function EditableInput({
  value,
  onChange,
  className = "",
  multiline = false,
}) {
  const selectedOnce = useRef(false);

  const handleFocus = (e) => {
    if (!selectedOnce.current) {
      selectedOnce.current = true;
      e.currentTarget.select();
    }
  };

  const handlePointerDown = (e) => {
    e.stopPropagation();
  };

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onPointerDown={handlePointerDown}
        className={`cv-edit-input ${className}`}
        dir="ltr"
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={handleFocus}
      onPointerDown={handlePointerDown}
      className={`cv-edit-input ${className}`}
      dir="ltr"
    />
  );
}

function PhotoBox({ photo, onClick }) {
  return (
    <button
      type="button"
      className={`cv-photo ${photo ? "has-photo" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {photo ? (
        <>
          <img src={photo} alt="Profile" />
          <span className="cv-photo-overlay">Change Photo</span>
        </>
      ) : (
        <>
          <span className="cv-photo-plus">＋</span>
          <span className="cv-photo-text">Add Photo</span>
        </>
      )}
    </button>
  );
}

export default function CVBuilder() {
  const [cv, setCV] = useState(defaultCV);
  const [photo, setPhoto] = useState("");
  const [template, setTemplate] = useState("modern");
  const [zoom, setZoom] = useState(0.72);
  const [position, setPosition] = useState({ x: 0, y: 30 });

  const fileRef = useRef(null);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startPosition = useRef({ x: 0, y: 0 });

  const update = (key, value) => {
    setCV((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const choosePhoto = () => {
    fileRef.current?.click();
  };

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);

    e.target.value = "";
  };

  const startDrag = (e) => {
    if (
      e.target.closest(
        "input, textarea, button, select, .cv-edit-input"
      )
    ) {
      return;
    }

    dragging.current = true;

    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
    };

    startPosition.current = {
      ...position,
    };

    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const moveDrag = (e) => {
    if (!dragging.current) return;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;

    setPosition({
      x: startPosition.current.x + dx,
      y: startPosition.current.y + dy,
    });
  };

  const endDrag = () => {
    dragging.current = false;
  };

 const downloadPDF = async () => {
  const element = document.querySelector(".cv-paper");

  if (!element) return;

  const clone = element.cloneNode(true);

  clone.style.position = "relative";
  clone.style.left = "0";
  clone.style.top = "0";
  clone.style.transform = "none";
  clone.style.width = "794px";
  clone.style.height = "1123px";
  clone.style.minHeight = "1123px";
  clone.style.margin = "0";
  clone.style.padding = getComputedStyle(element).padding;
  clone.style.boxShadow = "none";
  clone.style.background = "#ffffff";
  clone.style.overflow = "visible";

  // ប្តូរ input / textarea ទៅជាអក្សរធម្មតា
  clone.querySelectorAll("input, textarea").forEach((input) => {
    const text = document.createElement("div");

    text.className = input.className;
    text.textContent = input.value || "";

    const style = getComputedStyle(input);

    text.style.fontFamily = style.fontFamily;
    text.style.fontSize = style.fontSize;
    text.style.fontWeight = style.fontWeight;
    text.style.lineHeight = style.lineHeight;
    text.style.color = style.color;
    text.style.textAlign = style.textAlign;
    text.style.width = style.width;
    text.style.minHeight = style.height;
    text.style.padding = style.padding;
    text.style.margin = style.margin;
    text.style.boxSizing = "border-box";
    text.style.background = "transparent";
    text.style.border = "none";
    text.style.overflow = "visible";
    text.style.whiteSpace =
      input.tagName === "TEXTAREA" ? "pre-wrap" : "nowrap";
    text.style.wordBreak = "break-word";

    input.replaceWith(text);
  });

  const container = document.createElement("div");

  container.style.position = "fixed";
  container.style.left = "-10000px";
  container.style.top = "0";
  container.style.width = "794px";
  container.style.height = "1123px";
  container.style.background = "#ffffff";
  container.style.overflow = "visible";
  container.style.zIndex = "99999";

  container.appendChild(clone);
  document.body.appendChild(container);

  try {
    await html2pdf()
      .set({
        margin: 0,
        filename: `${cv.name || "CV"}.pdf`,
        image: {
          type: "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
          width: 794,
          height: 1123,
          windowWidth: 794,
          windowHeight: 1123,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .from(clone)
      .save();
  } finally {
    document.body.removeChild(container);
  }
};

  const renderHeader = (photoShape = "square") => (
    <div className="cv-header">
      <div className="cv-header-info">
        <EditableInput
          value={cv.name}
          onChange={(v) => update("name", v)}
          className="cv-name"
        />

        <EditableInput
          value={cv.title}
          onChange={(v) => update("title", v)}
          className="cv-title"
        />

        <div className="cv-contact">
          <EditableInput
            value={cv.email}
            onChange={(v) => update("email", v)}
          />
          <span>•</span>
          <EditableInput
            value={cv.phone}
            onChange={(v) => update("phone", v)}
          />
          <span>•</span>
          <EditableInput
            value={cv.location}
            onChange={(v) => update("location", v)}
          />
        </div>
      </div>

      <div className={photoShape}>
        <PhotoBox photo={photo} onClick={choosePhoto} />
      </div>
    </div>
  );

  const experienceSection = () => (
    <section className="cv-section">
      <h2>Experience</h2>

      <div className="cv-entry">
        <EditableInput
          value={cv.job1}
          onChange={(v) => update("job1", v)}
          className="cv-entry-title"
        />

        <div className="cv-entry-meta">
          <EditableInput
            value={cv.company1}
            onChange={(v) => update("company1", v)}
          />
          <EditableInput
            value={cv.date1}
            onChange={(v) => update("date1", v)}
            className="cv-date"
          />
        </div>

        <EditableInput
          value={cv.desc1}
          onChange={(v) => update("desc1", v)}
          className="cv-description"
          multiline
        />
      </div>

      <div className="cv-entry">
        <EditableInput
          value={cv.job2}
          onChange={(v) => update("job2", v)}
          className="cv-entry-title"
        />

        <div className="cv-entry-meta">
          <EditableInput
            value={cv.company2}
            onChange={(v) => update("company2", v)}
          />
          <EditableInput
            value={cv.date2}
            onChange={(v) => update("date2", v)}
            className="cv-date"
          />
        </div>

        <EditableInput
          value={cv.desc2}
          onChange={(v) => update("desc2", v)}
          className="cv-description"
          multiline
        />
      </div>
    </section>
  );

  const educationSection = () => (
    <section className="cv-section">
      <h2>Education</h2>

      <div className="cv-entry">
        <EditableInput
          value={cv.education}
          onChange={(v) => update("education", v)}
          className="cv-entry-title"
        />

        <div className="cv-entry-meta">
          <EditableInput
            value={cv.school}
            onChange={(v) => update("school", v)}
          />

          <EditableInput
            value={cv.eduDate}
            onChange={(v) => update("eduDate", v)}
            className="cv-date"
          />
        </div>
      </div>
    </section>
  );
  const projectsSection = () => (
  <section className="cv-section cv-projects">
    <h2>Projects</h2>

    <div className="cv-project">
      <div className="cv-project-top">
        <EditableInput
          value={cv.project1}
          onChange={(v) => update("project1", v)}
          className="cv-project-name"
        />

        <EditableInput
          value={cv.project1Date}
          onChange={(v) => update("project1Date", v)}
          className="cv-project-date"
        />
      </div>

      <EditableInput
        value={cv.project1Desc}
        onChange={(v) => update("project1Desc", v)}
        className="cv-project-desc"
        multiline
      />
    </div>

    <div className="cv-project">
      <div className="cv-project-top">
        <EditableInput
          value={cv.project2}
          onChange={(v) => update("project2", v)}
          className="cv-project-name"
        />

        <EditableInput
          value={cv.project2Date}
          onChange={(v) => update("project2Date", v)}
          className="cv-project-date"
        />
      </div>

      <EditableInput
        value={cv.project2Desc}
        onChange={(v) => update("project2Desc", v)}
        className="cv-project-desc"
        multiline
      />
    </div>
  </section>
);
const languagesSection = () => (
  <section className="cv-section">
    <h2>Languages</h2>

    <div className="cv-languages">
      <div className="cv-language">
        <EditableInput
          value={cv.language1}
          onChange={(v) => update("language1", v)}
        />
        <EditableInput
          value={cv.language1Level}
          onChange={(v) => update("language1Level", v)}
        />
      </div>

      <div className="cv-language">
        <EditableInput
          value={cv.language2}
          onChange={(v) => update("language2", v)}
        />
        <EditableInput
          value={cv.language2Level}
          onChange={(v) => update("language2Level", v)}
        />
      </div>

      <div className="cv-language">
        <EditableInput
          value={cv.language3}
          onChange={(v) => update("language3", v)}
        />
        <EditableInput
          value={cv.language3Level}
          onChange={(v) => update("language3Level", v)}
        />
      </div>
    </div>
  </section>
);

  const skillsSection = () => (
    <section className="cv-section">
      <h2>Skills</h2>

      <div className="cv-skills">
        <EditableInput
          value={cv.skill1}
          onChange={(v) => update("skill1", v)}
        />
        <EditableInput
          value={cv.skill2}
          onChange={(v) => update("skill2", v)}
        />
        <EditableInput
          value={cv.skill3}
          onChange={(v) => update("skill3", v)}
        />
        <EditableInput
          value={cv.skill4}
          onChange={(v) => update("skill4", v)}
        />
      </div>
    </section>
  );

  const renderModern = () => (
    <>
      {renderHeader("square")}

      <div className="cv-layout modern-layout">
        <main>
          <section className="cv-section">
            <h2>Profile</h2>

            <EditableInput
              value={cv.profile}
              onChange={(v) => update("profile", v)}
              className="cv-description"
              multiline
            />
          </section>

          {experienceSection()}
          {projectsSection()}
          {educationSection()}
        </main>

        <aside>
          {skillsSection()}
          {languagesSection()}
       </aside>
      </div>
    </>
  );

  const renderPurple = () => (
  <>
    <div className="purple-header">
      {renderHeader("round")}
    </div>

      <div className="purple-intro">
        <span>PROFILE</span>
        <EditableInput
          value={cv.profile}
          onChange={(v) => update("profile", v)}
          className="cv-description"
          multiline
        />
      </div>

      <div className="purple-columns">
  <main>
    {experienceSection()}
    {projectsSection()}
    {educationSection()}
  </main>

  <aside>
    {skillsSection()}
    {languagesSection()}
  </aside>
</div>
    </>
  );

  const renderGreen = () => (
    <div className="green-template">
      <aside className="green-sidebar">
        <PhotoBox photo={photo} onClick={choosePhoto} />

        <EditableInput
          value={cv.name}
          onChange={(v) => update("name", v)}
          className="green-name"
        />

        <EditableInput
          value={cv.title}
          onChange={(v) => update("title", v)}
          className="green-title"
        />

        <div className="green-contact">
          <EditableInput
            value={cv.email}
            onChange={(v) => update("email", v)}
          />
          <EditableInput
            value={cv.phone}
            onChange={(v) => update("phone", v)}
          />
          <EditableInput
            value={cv.location}
            onChange={(v) => update("location", v)}
          />
        </div>

        <section className="green-side-section">
          <h3>Profile</h3>
          <EditableInput
            value={cv.profile}
            onChange={(v) => update("profile", v)}
            className="green-side-text"
            multiline
          />
        </section>

        <section className="green-side-section">
          <h3>Skills</h3>

          <EditableInput
            value={cv.skill1}
            onChange={(v) => update("skill1", v)}
          />
          <EditableInput
            value={cv.skill2}
            onChange={(v) => update("skill2", v)}
          />
          <EditableInput
            value={cv.skill3}
            onChange={(v) => update("skill3", v)}
          />
          <EditableInput
            value={cv.skill4}
            onChange={(v) => update("skill4", v)}
          />
        </section>
        <section className="green-side-section">
  <h3>Languages</h3>

  <div className="cv-languages">
    <div className="cv-language">
      <EditableInput
        value={cv.language1}
        onChange={(v) => update("language1", v)}
      />
      <EditableInput
        value={cv.language1Level}
        onChange={(v) => update("language1Level", v)}
      />
    </div>

    <div className="cv-language">
      <EditableInput
        value={cv.language2}
        onChange={(v) => update("language2", v)}
      />
      <EditableInput
        value={cv.language2Level}
        onChange={(v) => update("language2Level", v)}
      />
    </div>

    <div className="cv-language">
      <EditableInput
        value={cv.language3}
        onChange={(v) => update("language3", v)}
      />
      <EditableInput
        value={cv.language3Level}
        onChange={(v) => update("language3Level", v)}
      />
    </div>
  </div>
</section>
       
      </aside>

      <main className="green-main">
        <h1>Experience</h1>

        <div className="green-entry">
          <EditableInput
            value={cv.job1}
            onChange={(v) => update("job1", v)}
            className="green-job"
          />

          <EditableInput
            value={cv.company1}
            onChange={(v) => update("company1", v)}
          />

          <EditableInput
            value={cv.date1}
            onChange={(v) => update("date1", v)}
            className="green-date"
          />

          <EditableInput
            value={cv.desc1}
            onChange={(v) => update("desc1", v)}
            className="green-description"
            multiline
          />
        </div>

        <div className="green-entry">
          <EditableInput
            value={cv.job2}
            onChange={(v) => update("job2", v)}
            className="green-job"
          />

          <EditableInput
            value={cv.company2}
            onChange={(v) => update("company2", v)}
          />

          <EditableInput
            value={cv.date2}
            onChange={(v) => update("date2", v)}
            className="green-date"
          />

          <EditableInput
            value={cv.desc2}
            onChange={(v) => update("desc2", v)}
            className="green-description"
            multiline
          />
        </div>

        {projectsSection()}

        <h1>Education</h1>

        <div className="green-entry">
          <EditableInput
            value={cv.education}
            onChange={(v) => update("education", v)}
            className="green-job"
          />

          <EditableInput
            value={cv.school}
            onChange={(v) => update("school", v)}
          />

          <EditableInput
            value={cv.eduDate}
            onChange={(v) => update("eduDate", v)}
            className="green-date"
          />
        </div>
         
      </main>
    </div>
  );

  const renderMinimal = () => (
    <>
      <div className="minimal-header">
        <div>
          <EditableInput
            value={cv.name}
            onChange={(v) => update("name", v)}
            className="minimal-name"
          />

          <EditableInput
            value={cv.title}
            onChange={(v) => update("title", v)}
            className="minimal-title"
          />
        </div>

        <PhotoBox photo={photo} onClick={choosePhoto} />
      </div>

      <div className="minimal-contact">
        <EditableInput
          value={cv.email}
          onChange={(v) => update("email", v)}
        />
        <EditableInput
          value={cv.phone}
          onChange={(v) => update("phone", v)}
        />
        <EditableInput
          value={cv.location}
          onChange={(v) => update("location", v)}
        />
      </div>

      <section className="cv-section minimal-profile">
        <h2>Profile</h2>

        <EditableInput
          value={cv.profile}
          onChange={(v) => update("profile", v)}
          className="cv-description"
          multiline
        />
      </section>

      {experienceSection()}
      {educationSection()}
      {skillsSection()}
    </>
  );

  return (
    <div className="cv-builder">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handlePhoto}
        hidden
      />

      <div className="cv-toolbar">
        <div className="cv-template-buttons">
          <button
            className={template === "modern" ? "active" : ""}
            onClick={() => setTemplate("modern")}
          >
            Modern Blue
          </button>

          <button
            className={template === "purple" ? "active" : ""}
            onClick={() => setTemplate("purple")}
          >
            Elegant Purple
          </button>

          <button
            className={template === "green" ? "active" : ""}
            onClick={() => setTemplate("green")}
          >
            Creative Green
          </button>

          <button
            className={template === "minimal" ? "active" : ""}
            onClick={() => setTemplate("minimal")}
          >
            Minimal Pro
          </button>
        </div>

        <div className="cv-actions">
          <button className="download-btn" onClick={downloadPDF}>
            ↓ Download PDF
          </button>
        </div>
      </div>

      <div className="cv-workspace">
        <div
          className="cv-stage"
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
        >
          <div
            className={`cv-paper template-${template}`}
            style={{
              transform: `translate(calc(-50% + ${position.x}px), ${position.y}px) scale(${zoom})`,
            }}
          >
            {template === "modern" && renderModern()}
            {template === "purple" && renderPurple()}
            {template === "green" && renderGreen()}
            {template === "minimal" && renderMinimal()}
          </div>
        </div>

        <div className="cv-zoom-controls">
          <button onClick={() => setZoom((z) => Math.max(0.45, z - 0.08))}>
            −
          </button>

          <span>{Math.round(zoom * 100)}%</span>

          <button onClick={() => setZoom((z) => Math.min(1.25, z + 0.08))}>
            +
          </button>

          <button
            onClick={() => {
              setZoom(0.72);
              setPosition({ x: 0, y: 30 });
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}