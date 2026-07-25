import React from "react";

const skillCategories = [
  {
    icon: "bi-box",
    title: "Level Design & Procedural",
    skills: ["Wave Function Collapse", "Compute Shader Density", "Multithreaded Chunking", "World Building", "Encounter Design"],
  },
  {
    icon: "bi-controller",
    title: "Systems & Mechanics",
    skills: ["Kinematic Controllers", "State Machines (FSM)", "Custom Input Buffers", "Combat Frameworks", "Physics & Rigidbody2D"],
  },
  {
    icon: "bi-code-slash",
    title: "Engine & Core Tech",
    skills: ["Unity (C#)", "Unreal Engine 5 (BP/C++)", "Editor Tooling", "Memory Profiling", "Version Control (Git)"],
  },
  {
    icon: "bi-palette",
    title: "Design & UI/UX",
    skills: ["UI Implementation", "Shader Graph", "VFX Graph", "Figma Prototyping", "Adobe Suite"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <div className="section-subtitle">Capabilities</div>
          <h2 className="section-title">Technical Domains</h2>
        </div>
        <div className="skills-grid-redesign">
          {skillCategories.map((cat, index) => (
            <div
              key={cat.title}
              className="skill-category-card"
              data-aos="fade-up"
              data-aos-delay={100 * (index + 1)}
            >
              <h3 className="category-title">
                <i className={`bi ${cat.icon}`}></i> {cat.title}
              </h3>
              <div className="skill-tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skill-pill">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
