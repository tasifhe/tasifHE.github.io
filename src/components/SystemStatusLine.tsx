"use client";
import React, { useState, useEffect } from "react";

const statuses = [
  "Compiling terrain chunk 4/12...",
  "Baking navmesh data...",
  "Optimizing draw calls...",
  "Running compute shader passes...",
  "Initializing procedural scattering...",
  "Calculating density fields..."
];

export function SystemStatusLine() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % statuses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="system-status-line" style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#64748b", fontFamily: "monospace" }}>
      <span style={{ color: "var(--accent-gold, #D4AF37)" }}>&gt;</span> {statuses[index]}
    </div>
  );
}
