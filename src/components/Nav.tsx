"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const links = [
  { href: "/#hero", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("mobile-nav-active", mobileOpen);
  }, [mobileOpen]);

  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link href="/" className="brand-logo" onClick={() => setMobileOpen(false)}>
          <span className="brand-symbol"><i className="bi bi-controller"></i></span>
          <span>
            <span className="brand-title">THE</span>
            <span className="brand-subtitle">Game Dev Portfolio</span>
          </span>
        </Link>
        <nav id="navmenu" className="navmenu">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link-item" onClick={() => setMobileOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <i
          className={`mobile-nav-toggle d-xl-none bi ${mobileOpen ? "bi-x" : "bi-list"}`}
          onClick={() => setMobileOpen((v) => !v)}
          role="button"
          aria-label="Toggle navigation menu"
          tabIndex={0}
        ></i>
      </div>
    </header>
  );
}
