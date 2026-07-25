import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "../data/projects";

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="main portfolio-page">
      {/* Detail Hero Section */}
      <section className="portfolio-hero section-padding">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <div className="game-breadcrumb">
                <Link href="/">HOME</Link>
                <i className="bi bi-chevron-right mx-2"></i>
                <Link href="/#work">ARCHIVES</Link>
                <i className="bi bi-chevron-right mx-2"></i>
                <span className="active">
                  <i className="bi bi-folder2-open me-2"></i>
                  {project.slug.toUpperCase()}
                </span>
              </div>
              <h1 className="display-4 fw-bold mb-4" style={{ fontFamily: "monospace" }}>
                {project.title}
              </h1>
              <p className="lead" style={{ color: "var(--accent-gold)", maxWidth: "800px", margin: "0 auto" }}>
                {project.hook}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="portfolio-details section-padding pt-0">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-5">
            {/* Left Column: Visuals & Tech */}
            <div className="col-lg-8">
              {project.screenshots.map((shot, idx) => (
                <div key={idx} className="mb-5" data-aos="fade-up" data-aos-delay={200 + (idx * 100)}>
                  <div className="image-frame" style={{ border: "1px solid var(--border-color)", padding: "4px", borderRadius: "8px", background: "var(--bg-secondary)" }}>
                    <Image 
                      src={shot.src} 
                      alt={shot.caption} 
                      width={1200} 
                      height={675} 
                      className="img-fluid rounded"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="image-caption mt-3">
                    <p style={{ fontFamily: "monospace", color: "#94a3b8", fontSize: "0.9rem" }}>
                      <i className="bi bi-camera me-2 text-warning"></i> 
                      {shot.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Specs & Deep Dive */}
            <div className="col-lg-4">
              <div className="game-info-panel p-4 rounded mb-5 sticky-top" style={{ top: "100px", background: "var(--bg-secondary)", border: "1px solid rgba(255,255,255,0.05)" }}>
                
                {/* Meta Data */}
                <div className="panel-section mb-4 pb-4 border-bottom border-secondary">
                  <h3 className="h5 mb-4" style={{ color: "var(--accent-gold)" }}><i className="bi bi-cpu me-2"></i> SYSTEM DATA</h3>
                  <ul className="list-unstyled" style={{ fontSize: "0.95rem" }}>
                    <li className="mb-3">
                      <strong className="d-block text-secondary text-uppercase mb-1" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>{project.studioOrClient.label}</strong>
                      {project.studioOrClient.name}
                    </li>
                    <li className="mb-3">
                      <strong className="d-block text-secondary text-uppercase mb-1" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Date</strong>
                      {project.completionDate}
                    </li>
                    <li className="mb-3">
                      <strong className="d-block text-secondary text-uppercase mb-1" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Duration</strong>
                      {project.duration}
                    </li>
                    <li>
                      <strong className="d-block text-secondary text-uppercase mb-1" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Role</strong>
                      {project.role}
                    </li>
                  </ul>
                </div>

                {/* Deep Dive Copy */}
                <div className="panel-section">
                  <h3 className="h5 mb-4" style={{ color: "var(--accent-gold)" }}><i className="bi bi-journal-code me-2"></i> IMPLEMENTATION</h3>
                  
                  <div className="mb-4">
                    <h4 className="h6 text-white mb-2">The Problem</h4>
                    <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{project.problem}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="h6 text-white mb-2">The Approach</h4>
                    <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{project.approach}</p>
                  </div>

                  {project.results && (
                    <div className="mb-4">
                      <h4 className="h6 text-white mb-2">Results</h4>
                      <p className="text-secondary" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>{project.results}</p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-top border-secondary">
                    <h4 className="h6 text-white mb-3">Tech Stack</h4>
                    <div className="d-flex flex-wrap gap-2">
                      {project.techStack.map(tech => (
                        <span key={tech} className="badge bg-dark border border-secondary text-light px-2 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="container mt-5 pt-5 border-top border-secondary text-center" data-aos="fade-up">
          <h3 className="mb-4">Interested in a system like this for your project?</h3>
          <Link href="/#contact" className="btn game-button primary large px-5 py-3">
            <i className="bi bi-envelope me-2"></i> GET IN TOUCH
          </Link>
        </div>
      </section>
    </main>
  );
}
