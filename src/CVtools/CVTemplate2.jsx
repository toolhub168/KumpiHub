import React from "react";
import "./CVTemplate2.css";

const EditableText = ({ value, onChange, className = "" }) => {
  return (
    <span
      className={`cv-template2-editable ${className}`}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent)}
    >
      {value}
    </span>
  );
};

const SectionTitle = ({ children }) => {
  return <div className="cv-template2-section-title">{children}</div>;
};

export default function CVTemplate2({
  cv,
  update,
  updateArray,
  handlePhoto,
}) {
  return (
    <div className="cv-template2-wrapper">
      <div className="cv-template2-paper">

        {/* ================= HEADER ================= */}
        <header className="cv-template2-header">

          <div className="cv-template2-header-info">
  <EditableText
    value={cv.name}
    onChange={(v) => update("name", v)}
    className="cv-template2-name"
  />

  <div className="cv-template2-position">
    <strong>Position Applied For:</strong>{" "}
    <EditableText
      value={cv.title}
      onChange={(v) => update("title", v)}
    />
  </div>

  <div className="cv-template2-contact">
    <EditableText
      value={cv.phone}
      onChange={(v) => update("phone", v)}
    />

    <span className="cv-template2-dot">•</span>

    <EditableText
      value={cv.email}
      onChange={(v) => update("email", v)}
    />

    <span className="cv-template2-dot">•</span>

    <EditableText
      value={cv.location}
      onChange={(v) => update("location", v)}
    />
  </div>
</div>

          <label className="cv-template2-photo-box">
            {cv.photo ? (
              <img src={cv.photo} alt="Profile" />
            ) : (
              <span>Add Photo</span>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handlePhoto}
              hidden
            />
          </label>

        </header>

        {/* ================= PROFILE ================= */}
        <section className="cv-template2-section">
          <SectionTitle>PROFILE</SectionTitle>

          <div className="cv-template2-profile">
            <EditableText
              value={cv.about}
              onChange={(v) => update("about", v)}
            />
          </div>
        </section>

        {/* ================= PERSONAL INFORMATION ================= */}
        <section className="cv-template2-section">
          <SectionTitle>PERSONAL INFORMATION</SectionTitle>

          <div className="cv-template2-personal-grid">

            <div className="cv-template2-info-row">
              <strong>Full Name</strong>
              <EditableText
                value={cv.name}
                onChange={(v) => update("name", v)}
              />
            </div>

            <div className="cv-template2-info-row">
              <strong>Gender</strong>
              <EditableText
                value={cv.gender}
                onChange={(v) => update("gender", v)}
              />
            </div>

            <div className="cv-template2-info-row">
              <strong>Date of Birth</strong>
              <EditableText
                value={cv.dob}
                onChange={(v) => update("dob", v)}
              />
            </div>

            <div className="cv-template2-info-row">
              <strong>Birthplace</strong>
              <EditableText
                value={cv.birthplace}
                onChange={(v) => update("birthplace", v)}
              />
            </div>

            <div className="cv-template2-info-row">
              <strong>Nationality</strong>
              <EditableText
                value={cv.nationality}
                onChange={(v) => update("nationality", v)}
              />
            </div>

            <div className="cv-template2-info-row">
              <strong>Marital Status</strong>
              <EditableText
                value={cv.marital}
                onChange={(v) => update("marital", v)}
              />
            </div>

            <div className="cv-template2-info-row">
              <strong>Health</strong>
              <EditableText
                value={cv.health}
                onChange={(v) => update("health", v)}
              />
            </div>

          </div>
        </section>

        {/* ================= EDUCATION ================= */}
        <section className="cv-template2-section">
          <SectionTitle>EDUCATION</SectionTitle>

          <div className="cv-template2-education">

            <div className="cv-template2-education-row">
              <EditableText
                value={cv.education1Year}
                onChange={(v) => update("education1Year", v)}
                className="cv-template2-year"
              />

              <div>
                <EditableText
                  value={cv.education1Title}
                  onChange={(v) => update("education1Title", v)}
                  className="cv-template2-education-title"
                />

                <EditableText
                  value={cv.education1School}
                  onChange={(v) => update("education1School", v)}
                  className="cv-template2-education-school"
                />

                <EditableText
                  value={cv.education1Location}
                  onChange={(v) => update("education1Location", v)}
                  className="cv-template2-education-location"
                />
              </div>
            </div>

            <div className="cv-template2-education-row">
              <EditableText
                value={cv.education2Year}
                onChange={(v) => update("education2Year", v)}
                className="cv-template2-year"
              />

              <div>
                <EditableText
                  value={cv.education2Title}
                  onChange={(v) => update("education2Title", v)}
                  className="cv-template2-education-title"
                />

                <EditableText
                  value={cv.education2School}
                  onChange={(v) => update("education2School", v)}
                  className="cv-template2-education-school"
                />

                <EditableText
                  value={cv.education2Location}
                  onChange={(v) => update("education2Location", v)}
                  className="cv-template2-education-location"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ================= SKILLS + STRENGTHS ================= */}
        <section className="cv-template2-section">
          <div className="cv-template2-two-column">

            <div className="cv-template2-column">
              <SectionTitle>SKILLS</SectionTitle>

              <div className="cv-template2-list">
                {cv.skills.slice(0, 5).map((skill, index) => (
                  <div className="cv-template2-list-item" key={index}>
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
            </div>

            <div className="cv-template2-column">
              <SectionTitle>STRENGTHS</SectionTitle>

              <div className="cv-template2-list">
                {cv.strengths.slice(0, 5).map((strength, index) => (
                  <div className="cv-template2-list-item" key={index}>
                    <span>•</span>

                    <EditableText
                      value={strength}
                      onChange={(v) =>
                        updateArray("strengths", index, v)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ================= LANGUAGES ================= */}
        <section className="cv-template2-section">
          <SectionTitle>LANGUAGES</SectionTitle>

          <div className="cv-template2-languages">
            {cv.languages.map((language, index) => (
              <div className="cv-template2-language" key={index}>
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

        {/* ================= WORK EXPERIENCE ================= */}
        <section className="cv-template2-section cv-template2-work-section">
          <SectionTitle>WORK EXPERIENCE</SectionTitle>

          <div className="cv-template2-work-title">
            <EditableText
              value={cv.workTitle}
              onChange={(v) => update("workTitle", v)}
            />
          </div>

          <div className="cv-template2-list">
            {cv.work.slice(0, 5).map((work, index) => (
              <div className="cv-template2-list-item" key={index}>
                <span>•</span>

                <EditableText
                  value={work}
                  onChange={(v) =>
                    updateArray("work", index, v)
                  }
                />
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}