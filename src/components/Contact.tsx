"use client";
import React, { useState } from "react";

const links = [
  { icon: "bi-geo-alt", label: "Location", value: "Dhaka, Bangladesh", href: undefined },
  { icon: "bi-envelope", label: "Email", value: "tasif.grandfleet@gmail.com", href: "mailto:tasif.grandfleet@gmail.com" },
  { icon: "bi-telephone", label: "Phone", value: "+880 1979648494", href: "tel:+8801979648494" },
  { icon: "bi-linkedin", label: "LinkedIn", value: "tasif-hossain-emon", href: "https://www.linkedin.com/in/tasif-hossain-emon-70b372202/" },
  { icon: "bi-github", label: "GitHub", value: "github.com/tasifHE", href: "https://github.com/tasifHE" },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send message.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message.");
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <div className="section-subtitle">Get In Touch</div>
          <h2 className="section-title">Communications</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info-card" data-aos="fade-right" data-aos-delay="100">
            <p className="bio-text" style={{ marginBottom: 0 }}>
              Have a project in mind or an opportunity to discuss? Send a transmission — I typically respond within a day or two.
            </p>
            <div className="contact-links-list">
              {links.map((item) => {
                const content = (
                  <>
                    <i className={`bi ${item.icon}`}></i>
                    <div>
                      <div className="profile-detail-label">{item.label}</div>
                      <div>{item.value}</div>
                    </div>
                  </>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="contact-link-item"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="contact-link-item">
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form-card" data-aos="fade-left" data-aos-delay="200">
            <div className="form-group-redesign">
              <label htmlFor="name-field" className="form-label-redesign">Sender Name</label>
              <input type="text" name="name" id="name-field" className="form-control-redesign" required />
            </div>
            <div className="form-group-redesign">
              <label htmlFor="email-field" className="form-label-redesign">Return Address</label>
              <input type="email" name="email" id="email-field" className="form-control-redesign" required />
            </div>
            <div className="form-group-redesign">
              <label htmlFor="subject-field" className="form-label-redesign">Subject</label>
              <input type="text" name="subject" id="subject-field" className="form-control-redesign" required />
            </div>
            <div className="form-group-redesign">
              <label htmlFor="message-field" className="form-label-redesign">Message Body</label>
              <textarea name="message" id="message-field" className="form-control-redesign" rows={5} required></textarea>
            </div>

            {status === "error" && (
              <p style={{ color: "var(--accent-gold)", fontSize: "0.875rem", marginBottom: "1rem" }}>{errorMessage}</p>
            )}
            {status === "success" && (
              <p style={{ color: "var(--accent-gold)", fontSize: "0.875rem", marginBottom: "1rem" }}>
                Message transmitted successfully. I will get back to you soon.
              </p>
            )}

            <button type="submit" className="btn-primary-gold" disabled={status === "loading"} style={{ width: "100%", justifyContent: "center" }}>
              <i className="bi bi-send"></i> {status === "loading" ? "Transmitting..." : "Transmit Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
