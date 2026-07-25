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
    role: "Co-founder & Lead Level Designer",
    company: "GRANDFLEET",
    period: "January 2020 - Present",
    alignment: "left",
    icon: "bi-rocket",
    bullets: [
      "Established and executed company vision and strategic direction as co-founder.",
      "Oversee the design and implementation of game levels, mentoring the level design team.",
      "Lead development of new level concepts and prototypes.",
      "Cultivate partnerships and maintain stakeholder relationships."
    ]
  },
  {
    id: "ghost",
    role: "Lead Game Designer",
    company: "Ghost Interactive",
    period: "July 2024 - Present",
    alignment: "right",
    icon: "bi-controller",
    bullets: [
      "Develop game concepts and vision, creating and maintaining design documents.",
      "Balance and tune game mechanics across the project.",
      "Coordinate internal and external teams to manage timelines and deliverables.",
      "Drive innovation in game design processes."
    ]
  },
  {
    id: "riseup",
    role: "Game Designer",
    company: "RiseUp Labs",
    period: "September 2023 - June 2024",
    alignment: "left",
    icon: "bi-lightbulb",
    bullets: [
      "Contributed to level design and game balancing across active production titles.",
      "Collaborated with the design team to refine mechanics based on playtesting feedback.",
      "Supported cross-department coordination on level implementation."
    ]
  },
  {
    id: "qp",
    role: "Lead Level Designer",
    company: "Nightfall Interactive",
    period: "March 2023 - February 2024",
    alignment: "right",
    icon: "bi-map",
    bullets: [
      "Oversaw design and implementation of game levels, mentoring the level design team.",
      "Set and enforced level design standards and practices.",
      "Analyzed playtesting feedback to refine levels and optimize workflows.",
      "Coordinated with other departments to integrate level components."
    ]
  },
  {
    id: "utopia",
    role: "Level Designer",
    company: "Utopia (France)",
    period: "September 2021 - March 2022",
    alignment: "left",
    icon: "bi-code-slash",
    bullets: [
      "Designed, created, and balanced interactive game levels using Unity's Terrain Editor.",
      "Collaborated with art and design teams to align level design with aesthetic and gameplay goals.",
      "Implemented NPC behaviors and AI pathfinding to enhance gameplay dynamics.",
      "Programmed core gameplay mechanics and interactive elements in C#."
    ]
  }
];
