import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../data/projects";

function getThemeClass(categories: string[]): string {
  if (categories.includes("Procedural")) return "theme-procedural";
  if (categories.includes("Mechanics") || categories.includes("Systems")) return "theme-mechanics";
  return "theme-cinematic";
}

export function ProjectDetail({ project }: { project: Project }) {
  const themeClass = getThemeClass(project.category);
  return (
    <main className={`main portfolio-page ${themeClass}`}>
      <section className="portfolio-details-hero">
        <div className="container" data-aos="fade-up">
          <div>
            <Link href="/#work" className="back-link">
              <i className="bi bi-arrow-left"></i> Back to Archives
            </Link>
          </div>
          <div className="details-category-badge">{project.category.join(" / ")}</div>
          <h1 className="details-title">{project.title}</h1>
          <p className="lead" style={{ color: "var(--accent-gold)", maxWidth: "800px" }}>
            {project.hook}
          </p>
        </div>
      </section>

      <section className="section-padding pt-0">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="details-grid">
            <div className="details-media-gallery">
              {project.screenshots.map((shot, idx) => (
                <div key={idx} className="details-media-item" data-aos="fade-up" data-aos-delay={150 + idx * 100}>
                  <Image
                    src={shot.src}
                    alt={shot.caption}
                    width={1200}
                    height={675}
                  />
                  <p className="image-caption" style={{ padding: "1rem 1.25rem", fontSize: "0.875rem", color: "var(--text-muted)" }}>
                    <i className="bi bi-camera me-2" style={{ color: "var(--accent-gold)" }}></i>
                    {shot.caption}
                  </p>
                </div>
              ))}
            </div>

            <aside className="details-info-panel">
              <h3 className="info-panel-title"><i className="bi bi-cpu me-2"></i>System Data</h3>
              <div className="info-meta-group">
                <span className="info-meta-label">{project.studioOrClient.label}</span>
                <span className="info-meta-value">{project.studioOrClient.name}</span>
              </div>
              <div className="info-meta-group">
                <span className="info-meta-label">Date</span>
                <span className="info-meta-value">{project.completionDate}</span>
              </div>
              <div className="info-meta-group">
                <span className="info-meta-label">Duration</span>
                <span className="info-meta-value">{project.duration}</span>
              </div>
              <div className="info-meta-group">
                <span className="info-meta-label">Role</span>
                <span className="info-meta-value">{project.role}</span>
              </div>

              <h3 className="info-panel-title" style={{ marginTop: "2rem" }}>
                <i className="bi bi-journal-code me-2"></i>Implementation
              </h3>
              <div className="info-meta-group">
                <span className="info-meta-label">The Problem</span>
                <p className="bio-text" style={{ fontSize: "0.9rem", marginTop: "0.35rem" }}>{project.problem}</p>
              </div>
              <div className="info-meta-group">
                <span className="info-meta-label">The Approach</span>
                <p className="bio-text" style={{ fontSize: "0.9rem", marginTop: "0.35rem" }}>{project.approach}</p>
              </div>
              {project.results && (
                <div className="info-meta-group">
                  <span className="info-meta-label">Results</span>
                  <p className="bio-text" style={{ fontSize: "0.9rem", marginTop: "0.35rem" }}>{project.results}</p>
                </div>
              )}

              <div className="info-meta-group">
                <span className="info-meta-label">Tech Stack</span>
                <div className="project-tech-pills" style={{ marginTop: "0.5rem" }}>
                  {project.techStack.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>

          <div className="text-center" style={{ marginTop: "4rem", paddingTop: "3rem", borderTop: "1px solid var(--border-color)" }}>
            <h3 className="section-title" style={{ marginBottom: "1.5rem" }}>Interested in a system like this for your project?</h3>
            <Link href="/#contact" className="btn-primary-gold">
              <i className="bi bi-envelope"></i> Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
