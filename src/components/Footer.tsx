import React from "react";
import { SystemStatusLine } from "./SystemStatusLine";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="redesign-footer">
      <div className="container">
        <div className="footer-text">
          &copy; {currentYear} <span className="footer-brand">TASIF HOSSAIN EMON</span> — All Rights Reserved.
        </div>
        <SystemStatusLine />
      </div>
    </footer>
  );
}
