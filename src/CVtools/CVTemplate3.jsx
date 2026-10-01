import React from "react";
import "./CVTemplate3.css";

const EditableText = ({ value, onChange, className = "" }) => {
  return (
    <span
      className={`cv3-editable ${className}`}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent)}
    >
      {value}
    </span>
  );
};

const SectionTitle = ({ children }) => {
  return (
    <div className="cv3-section-title">
      <span>{children}</span>
    </div>
  );
};

export default function CVTemplate3({
  cv,
  update,
  updateArray,
  handlePhoto,
}) {
  return (
    <div className="cv3-wrapper">
      <div className="cv3-paper">

        {/* ================= HEADER ================= */}
        <header className="cv3-header">

          {/* BLUE DIAGONAL AREA */}
          <div className="cv3-blue-area"></div>

          <div className="cv3-header-content">

            {/* NAME + POSITION */}
            <div className="cv3-header-info">

              <EditableText
                value={cv.name}
                onChange={(v) => update("name", v)}
                className="cv3-name"
              />

              <div className="cv3-position">
                <strong>Position Applied For</strong>

                <span className="cv3-position-line"></span>

                <EditableText
                  value={cv.title}
                  onChange={(v) => update("title", v)}
                />
              </div>

            </div>

            {/* PHOTO */}
            <label className="cv3-photo">

              {cv.photo ? (
                <img src={cv.photo} alt="Profile" />
              ) : (
                <span>ADD PHOTO</span>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                hidden
              />

            </label>

          </div>

          {/* CONTACT */}
          <div className="cv3-contact">

            <EditableText
              value={cv.phone}
              onChange={(v) => update("phone", v)}
            />

            <span className="cv3-contact-dot">•</span>

            <EditableText
              value={cv.email}
              onChange={(v) => update("email", v)}
            />

            <span className="cv3-contact-dot">•</span>

            <EditableText
              value={cv.location}
              onChange={(v) => update("location", v)}
            />

          </div>

        </header>

        {/* ================= BODY ================= */}
        <main className="cv3-body">

          {/* ================= PROFILE ================= */}
          <section className="cv3-section">

            <SectionTitle>PROFILE</SectionTitle>

            <div className="cv3-profile">
              <EditableText
                value={cv.about}
                onChange={(v) => update("about", v)}
              />
            </div>

          </section>

          {/* ================= PERSONAL INFORMATION ================= */}
          <section className="cv3-section">

            <SectionTitle>PERSONAL INFORMATION</SectionTitle>

            <div className="cv3-personal-grid">

              <div className="cv3-info-row">
                <strong>Full Name</strong>
                <EditableText
                  value={cv.name}
                  onChange={(v) => update("name", v)}
                />
              </div>

              <div className="cv3-info-row">
                <strong>Gender</strong>
                <EditableText
                  value={cv.gender}
                  onChange={(v) => update("gender", v)}
                />
              </div>

              <div className="cv3-info-row">
                <strong>Date of Birth</strong>
                <EditableText
                  value={cv.dob}
                  onChange={(v) => update("dob", v)}
                />
              </div>

              <div className="cv3-info-row">
                <strong>Birthplace</strong>
                <EditableText
                  value={cv.birthplace}
                  onChange={(v) => update("birthplace", v)}
                />
              </div>

              <div className="cv3-info-row">
                <strong>Nationality</strong>
                <EditableText
                  value={cv.nationality}
                  onChange={(v) => update("nationality", v)}
                />
              </div>

              <div className="cv3-info-row">
                <strong>Marital Status</strong>
                <EditableText
                  value={cv.marital}
                  onChange={(v) => update("marital", v)}
                />
              </div>

              <div className="cv3-info-row">
                <strong>Health</strong>
                <EditableText
                  value={cv.health}
                  onChange={(v) => update("health", v)}
                />
              </div>

            </div>

          </section>

          {/* ================= EDUCATION ================= */}
          <section className="cv3-section">

            <SectionTitle>EDUCATION</SectionTitle>

            <div className="cv3-education">

              <div className="cv3-education-row">

                <EditableText
                  value={cv.education1Year}
                  onChange={(v) => update("education1Year", v)}
                  className="cv3-year"
                />

                <div className="cv3-education-content">

                  <EditableText
                    value={cv.education1Title}
                    onChange={(v) => update("education1Title", v)}
                    className="cv3-education-title"
                  />

                  <EditableText
                    value={cv.education1School}
                    onChange={(v) => update("education1School", v)}
                    className="cv3-education-school"
                  />

                  <EditableText
                    value={cv.education1Location}
                    onChange={(v) => update("education1Location", v)}
                    className="cv3-education-location"
                  />

                </div>

              </div>

              <div className="cv3-education-row">

                <EditableText
                  value={cv.education2Year}
                  onChange={(v) => update("education2Year", v)}
                  className="cv3-year"
                />

                <div className="cv3-education-content">

                  <EditableText
                    value={cv.education2Title}
                    onChange={(v) => update("education2Title", v)}
                    className="cv3-education-title"
                  />

                  <EditableText
                    value={cv.education2School}
                    onChange={(v) => update("education2School", v)}
                    className="cv3-education-school"
                  />

                  <EditableText
                    value={cv.education2Location}
                    onChange={(v) => update("education2Location", v)}
                    className="cv3-education-location"
                  />

                </div>

              </div>

            </div>

          </section>

          {/* ================= SKILLS + STRENGTHS ================= */}
          <section className="cv3-section">

            <div className="cv3-two-column">

              <div>

                <SectionTitle>SKILLS</SectionTitle>

                <div className="cv3-list">

                  {cv.skills.slice(0, 5).map((skill, index) => (
                    <div className="cv3-list-item" key={index}>

                      <span className="cv3-bullet">•</span>

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

              <div>

                <SectionTitle>STRENGTHS</SectionTitle>

                <div className="cv3-list">

                  {cv.strengths.slice(0, 5).map((strength, index) => (
                    <div className="cv3-list-item" key={index}>

                      <span className="cv3-bullet">•</span>

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
          <section className="cv3-section">

            <SectionTitle>LANGUAGES</SectionTitle>

            <div className="cv3-languages">

              {cv.languages.map((language, index) => (
                <div className="cv3-language" key={index}>

                  <span className="cv3-bullet">•</span>

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
          <section className="cv3-section cv3-work-section">

            <SectionTitle>WORK EXPERIENCE</SectionTitle>

            <div className="cv3-work-title">

              <EditableText
                value={cv.workTitle}
                onChange={(v) => update("workTitle", v)}
              />

            </div>

            <div className="cv3-list">

              {cv.work.slice(0, 5).map((work, index) => (
                <div className="cv3-list-item" key={index}>

                  <span className="cv3-bullet">•</span>

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

        </main>

      </div>
    </div>
  );
}
