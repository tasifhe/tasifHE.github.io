import React from "react";

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>IDENTIFICATION</h2>
        </div>
        <div className="row gy-4 align-items-center">
          <div className="col-lg-4 text-center">
            <div className="profile-frame">
              <img src="/assets/img/my-profile-img.jpg" className="img-fluid" alt="Tasif Hossain Emon" />
            </div>
          </div>
          <div className="col-lg-8 content">
            <h3>Lead Game Designer &amp; Unity Developer</h3>
            <p className="fst-italic" style={{ color: "#94a3b8", marginBottom: "1.5rem" }}>
              "I gravitate toward building the robust underlying systems and custom toolkits that make expansive level design possible."
            </p>
            <div className="row stats-row">
              <div className="col-lg-4">
                <div className="stat-box">
                  <i className="bi bi-clock-history"></i>
                  <strong>EXPERIENCE</strong>
                  <span>3+ Years</span>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="stat-box">
                  <i className="bi bi-geo-alt"></i>
                  <strong>LOCATION</strong>
                  <span>Dhaka, BD</span>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="stat-box">
                  <i className="bi bi-shield-check"></i>
                  <strong>STATUS</strong>
                  <span>Available</span>
                </div>
              </div>
            </div>
            <p style={{ marginTop: "2rem" }}>
              Specializing in C# and the Unity engine, I build high-performance gameplay systems, procedural generation pipelines, and scalable tools that bridge the gap between design vision and technical constraints. My work focuses on deterministic systems, multithreaded architecture, and delivering polished, framerate-stable experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
