export type Experience = {
  id: string;
  role: string;
  company: string;
  period: string;
  bullets: string[];
  alignment: "left" | "right";
  icon: string;
};

export const experienceList: Experience[] = [
  {
    id: "grandfleet",
    role: "Lead Game Designer & Unity Developer",
    company: "GRANDFLEET",
    period: "2023 - PRESENT",
    alignment: "left",
    icon: "bi-controller",
    bullets: [
      "Engineered a multithreaded terrain chunking system, eliminating load stutters across 50km² open-world environments.",
      "Architected custom editor toolkits for level designers, reducing environment population time by ~40%.",
      "Designed and implemented a compute-shader density generation pipeline for real-time procedural worlds."
    ]
  },
  {
    id: "ghost",
    role: "Gameplay Programmer",
    company: "Ghost Interactive",
    period: "2022 - 2023",
    alignment: "right",
    icon: "bi-braces",
    bullets: [
      "Built a state-machine driven kinematic character controller with seamless animation blending and IK foot placement.",
      "Optimized draw calls by ~30% through strict GPU instancing and aggressive occlusion culling strategies.",
      "Developed an event-driven quest tracking framework used across 40+ unique missions."
    ]
  },
  {
    id: "apex",
    role: "Level Designer",
    company: "Apex Studios",
    period: "2021 - 2022",
    alignment: "left",
    icon: "bi-layers",
    bullets: [
      "Constructed multi-layered urban environments emphasizing verticality and fluid traversal mechanics.",
      "Balanced combat encounters using custom heat-map analytics tools to track player death and choke points.",
      "Collaborated with environment artists to establish clear visual language and navigational affordances."
    ]
  },
  {
    id: "utopia",
    role: "Unity Developer Intern",
    company: "Utopia Tech",
    period: "2021",
    alignment: "right",
    icon: "bi-terminal",
    bullets: [
      "Prototyped core mechanics for mobile AR titles using ARFoundation.",
      "Wrote Editor scripts to automate repetitive prefab setup tasks.",
      "Assisted in profiling memory allocations and resolving mobile performance bottlenecks."
    ]
  }
];
