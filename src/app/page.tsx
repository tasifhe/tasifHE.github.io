import React from "react";
import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Experience } from "../components/Experience";
import { Skills } from "../components/Skills";
import { WorkGrid } from "../components/WorkGrid";
import { Contact } from "../components/Contact";

export default function Home() {
  return (
    <main className="main">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <WorkGrid />
      <Contact />
    </main>
  );
}
