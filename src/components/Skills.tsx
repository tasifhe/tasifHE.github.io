import React from "react";

export function Skills() {
  return (
    <section id="skills" className="section-padding">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>TECHNICAL DOMAINS</h2>
        </div>
        <div className="row gy-4">
          
          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
            <div className="skill-category-box">
              <div className="icon"><i className="bi bi-box"></i></div>
              <h3>Level Design &amp; Procedural</h3>
              <ul>
                <li>Wave Function Collapse</li>
                <li>Compute Shader Density</li>
                <li>Multithreaded Chunking</li>
                <li>World Building</li>
                <li>Encounter Design</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div className="skill-category-box">
              <div className="icon"><i className="bi bi-controller"></i></div>
              <h3>Systems &amp; Mechanics</h3>
              <ul>
                <li>Kinematic Controllers</li>
                <li>State Machines (FSM)</li>
                <li>Custom Input Buffers</li>
                <li>Combat Frameworks</li>
                <li>Physics &amp; Rigidbody2D</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
            <div className="skill-category-box">
              <div className="icon"><i className="bi bi-code-slash"></i></div>
              <h3>Engine &amp; Core Tech</h3>
              <ul>
                <li>Unity (C#)</li>
                <li>Unreal Engine 5 (BP/C++)</li>
                <li>Editor Tooling</li>
                <li>Memory Profiling</li>
                <li>Version Control (Git)</li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="400">
            <div className="skill-category-box">
              <div className="icon"><i className="bi bi-palette"></i></div>
              <h3>Design &amp; UI/UX</h3>
              <ul>
                <li>UI Implementation</li>
                <li>Shader Graph</li>
                <li>VFX Graph</li>
                <li>Figma Prototyping</li>
                <li>Adobe Suite</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
