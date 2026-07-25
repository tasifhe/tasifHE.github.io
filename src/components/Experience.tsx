import React from "react";
import { experienceList } from "../data/experience";

export function Experience() {
  return (
    <section id="experience" className="section-padding" style={{ background: "var(--bg-secondary)" }}>
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <div className="section-subtitle">Career</div>
          <h2 className="section-title">Service History</h2>
        </div>
        <div className="branching-timeline">
          {experienceList.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`timeline-branch-item ${exp.alignment}`} 
              data-aos={exp.alignment === "left" ? "fade-right" : "fade-left"} 
              data-aos-delay={100 * (index + 1)}
            >
              <div className="branch-card">
                <div className="branch-header">
                  <h3 className="branch-role">{exp.role}</h3>
                  <span className="branch-company">{exp.company}</span>
                  <span className="branch-period">{exp.period}</span>
                </div>
                <ul className="role-bullets">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
              <div className="branch-node-icon">
                <i className={`bi ${exp.icon}`}></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
