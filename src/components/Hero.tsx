import React from "react";
import { GenerativeBackground } from "./GenerativeBackground";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="hero-redesign">
      <GenerativeBackground />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-content-wrapper">
          <div className="hero-label" data-aos="fade-down" data-aos-delay="100">
            <span className="hero-label-dot"></span> STATUS: ONLINE
          </div>
          <h1 className="hero-main-title" data-aos="fade-up" data-aos-delay="200">
            TASIF <span className="highlight">HOSSAIN EMON</span>
          </h1>
          <h2 className="hero-subtitle" data-aos="fade-up" data-aos-delay="300">
            Game Developer &amp; Level Designer<span className="blinking-cursor">_</span>
          </h2>
          <p className="hero-description" data-aos="fade-up" data-aos-delay="400">
            Architecting robust systems, specialized toolkits, and expansive procedural worlds for next-generation interactive experiences.
          </p>
          <div className="hero-actions" data-aos="fade-up" data-aos-delay="500">
            <Link href="#work" className="btn-primary-gold">
              <i className="bi bi-folder-fill"></i> VIEW ARCHIVES
            </Link>
            <Link href="#contact" className="btn-outline-gold">
              <i className="bi bi-chat-dots-fill"></i> INITIATE CONTACT
            </Link>
            <a href="/assets/CV/CV.pdf" download="Tasif_Hossain_Emon_CV.pdf" className="btn-outline-gold">
              <i className="bi bi-download"></i> DOWNLOAD CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
