import Link from "next/link";
import React from "react";

export function Nav() {
  return (
    <header id="header" className="header d-flex align-items-center fixed-top">
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        <Link href="/" className="logo d-flex align-items-center">
          <h1 className="sitename">THE</h1>
        </Link>
        <nav id="navmenu" className="navmenu">
          <ul>
            <li><Link href="/#hero" className="active">Home</Link></li>
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#experience">Experience</Link></li>
            <li><Link href="/#skills">Skills</Link></li>
            <li><Link href="/#work">Work</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
          <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
        </nav>
      </div>
    </header>
  );
}
