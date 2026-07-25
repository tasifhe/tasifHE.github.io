"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "../data/projects";

export function WorkGrid() {
  const categories = useMemo(() => {
    const all = new Set<string>();
    projects.forEach((p) => p.category.forEach((c) => all.add(c)));
    return ["All", ...Array.from(all).sort()];
  }, []);

  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category.includes(active));

  return (
    <section id="work" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <div className="section-subtitle">Archives</div>
          <h2 className="section-title">Selected Work</h2>
        </div>

        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn-redesign ${active === cat ? "active" : ""}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="portfolio-grid-redesign">
          {filtered.map((project, index) => (
            <div
              key={project.slug}
              className="project-card-redesign"
              data-aos="fade-up"
              data-aos-delay={100 * ((index % 3) + 1)}
            >
              <Link
                href={`/work/${project.slug}`}
                className={`project-media-container ${project.demoGif ? "has-gif" : ""}`}
              >
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="static-img"
                  style={{ objectFit: "cover" }}
                />
                {project.demoGif && (
                  <Image
                    src={project.demoGif}
                    alt={`${project.title} gameplay preview`}
                    fill
                    className="gif-img"
                    style={{ objectFit: "cover" }}
                    unoptimized
                  />
                )}
                <span className="project-status-badge">{project.status}</span>
              </Link>
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-subtitle">{project.category.join(" / ")}</div>
                <p className="project-desc">{project.hook}</p>
                <div className="project-tech-pills">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-card-actions">
                  <Link href={`/work/${project.slug}`} className="btn-card-primary">
                    <i className="bi bi-file-earmark-code"></i> READ DOCS
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
