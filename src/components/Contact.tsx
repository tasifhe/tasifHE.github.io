"use client";
import React, { useState } from "react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    // Simulate submission
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>COMMUNICATIONS</h2>
        </div>
        <div className="row gy-4">
          <div className="col-lg-5">
            <div className="info-wrap">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0"></i>
                <div>
                  <h3>Location</h3>
                  <p>Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-envelope flex-shrink-0"></i>
                <div>
                  <h3>Email</h3>
                  <p>tasifhe@gmail.com</p>
                </div>
              </div>
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-linkedin flex-shrink-0"></i>
                <div>
                  <h3>LinkedIn</h3>
                  <p>linkedin.com/in/tasifhe</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <form onSubmit={handleSubmit} className="custom-form" data-aos="fade-up" data-aos-delay="200">
              <div className="row gy-4">
                <div className="col-md-6">
                  <label htmlFor="name-field" className="pb-2">Sender Name</label>
                  <input type="text" name="name" id="name-field" className="form-control" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email-field" className="pb-2">Return Address</label>
                  <input type="email" className="form-control" name="email" id="email-field" required />
                </div>
                <div className="col-md-12">
                  <label htmlFor="subject-field" className="pb-2">Subject</label>
                  <input type="text" className="form-control" name="subject" id="subject-field" required />
                </div>
                <div className="col-md-12">
                  <label htmlFor="message-field" className="pb-2">Message Body</label>
                  <textarea className="form-control" name="message" rows={6} id="message-field" required></textarea>
                </div>
                <div className="col-md-12 text-center">
                  {status === "loading" && <div className="loading" style={{display: 'block'}}>Sending message...</div>}
                  {status === "error" && <div className="error-message" style={{display: 'block'}}>Failed to send message. Please try again later.</div>}
                  {status === "success" && <div className="sent-message" style={{display: 'block'}}>Your message has been sent successfully. I will get back to you soon.</div>}
                  <button type="submit" className="btn game-button primary" disabled={status === "loading"}>
                    <i className="bi bi-send"></i> TRANSMIT MESSAGE
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
