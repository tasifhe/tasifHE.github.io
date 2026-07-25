import React from "react";
import Link from "next/link";
import { projects } from "../data/projects";
import Image from "next/image";

export function WorkGrid() {
  return (
    <section id="work" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>SELECTED WORK</h2>
        </div>
        <div className="row gy-4">
          {projects.map((project, index) => (
            <div key={project.slug} className="col-lg-6" data-aos="fade-up" data-aos-delay={100 * (index + 1)}>
              <div className="portfolio-item-card">
                <div className="card-image">
                  <Image 
                    src={project.heroImage} 
                    alt={project.title} 
                    className="img-fluid"
                    width={800}
                    height={450}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="overlay-content">
                    <span className={`status-tag ${project.status === 'Completed' ? 'completed' : 'in-progress'}`}>
                      {project.status}
                    </span>
                    <div className="tech-tags">
                      {project.category.map((tag, i) => (
                        <span key={i} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <h3>{project.title}</h3>
                  <p className="card-problem" style={{ color: "var(--accent-gold)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>
                    <strong>Goal:</strong> {project.problem}
                  </p>
                  <p className="card-hook">{project.hook}</p>
                  <div className="card-footer">
                    <Link href={`/work/${project.slug}`} className="btn game-button outline small">
                      <i className="bi bi-file-earmark-code"></i> READ DOCS
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
