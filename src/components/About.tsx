import React from "react";
import Image from "next/image";

const stats = [
  { label: "Experience", value: "5+ Years" },
  { label: "Location", value: "Dhaka, BD" },
  { label: "Status", value: "Available" },
];

export function About() {
  return (
    <section id="about" className="section-padding">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <div className="section-subtitle">Identification</div>
          <h2 className="section-title">Who I Am</h2>
        </div>
        <div className="about-grid">
          <div className="profile-card" data-aos="fade-right" data-aos-delay="100">
            <div className="profile-img-wrapper">
              <Image
                src="/assets/img/Potfolio_Pic_V2.webp"
                alt="Tasif Hossain Emon"
                width={640}
                height={640}
              />
            </div>
            <h3 className="profile-name">Tasif Hossain Emon</h3>
            <div className="profile-role">Game Developer &amp; Level Designer</div>
            <ul className="profile-details-list">
              {stats.map((s) => (
                <li key={s.label} className="profile-detail-item">
                  <span className="profile-detail-label">{s.label}</span>
                  <span className="profile-detail-value">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-bio-card" data-aos="fade-left" data-aos-delay="200">
            <p className="bio-lead">
              A passionate Unity game developer and game designer with 5+ years of experience creating immersive gaming experiences, specializing in bringing innovative concepts to life through clean code and captivating level design.
            </p>
            <p className="bio-text">
              I have robust experience creating games both in a team and individually, delivering on project requirements across a range of technology stacks. I stay poised and committed to listening carefully to critiques and requests, incorporating feedback to boost project outcomes beyond expectations. Beyond game development, I&apos;m a competitive programmer, and I&apos;m deeply invested in creating educational gaming experiences and exploring procedural content generation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
