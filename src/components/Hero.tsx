import React from "react";
import { GenerativeBackground } from "./GenerativeBackground";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="hero-redesign">
      <GenerativeBackground />
      <div className="hero-content" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-badge" data-aos="fade-down" data-aos-delay="100">
          <span className="dot"></span> STATUS: ONLINE
        </div>
        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">TASIF HOSSAIN EMON</h1>
        <h2 className="hero-subtitle" data-aos="fade-up" data-aos-delay="300">
          Lead Game Designer &amp; Unity Developer_
        </h2>
        <p className="hero-description" data-aos="fade-up" data-aos-delay="400">
          Architecting robust systems, specialized toolkits, and expansive procedural worlds for next-generation interactive experiences.
        </p>
        <div className="hero-actions" data-aos="fade-up" data-aos-delay="500">
          <Link href="#work" className="btn hero-btn primary">
            <i className="bi bi-folder-fill"></i> VIEW ARCHIVES
          </Link>
          <Link href="#contact" className="btn hero-btn secondary">
            <i className="bi bi-chat-dots-fill"></i> INITIATE CONTACT
          </Link>
        </div>
      </div>
    </section>
  );
}
