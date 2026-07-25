export type Project = {
  slug: string;
  title: string;
  category: string[];
  status: "Completed" | "In Progress";
  heroImage: string;
  demoGif?: string;
  hook: string;
  problem: string;
  approach: string;
  results?: string;
  techStack: string[];
  screenshots: { src: string; caption: string }[];
  studioOrClient: { label: "Studio" | "Client"; name: string };
  completionDate: string;
  duration: string;
  role: string;
};

export const projects: Project[] = [
  {
    slug: "pgw",
    title: "Procedural World Generation",
    category: ["3D", "Procedural"],
    status: "Completed",
    hook: "Infinite terrain generation with multithreaded chunk streaming and compute-shader density calculation.",
    problem: "Needed runtime world streaming with no visible load stutter across large open environments.",
    approach: "Multithreaded chunk streaming with compute-shader density fields for terrain, Perlin/Simplex-based biome placement, and LOD management tied to player proximity.",
    results: "Maintained stable 60fps during continuous generation.",
    techStack: ["Unity", "C#", "Compute Shaders", "Procedural Generation"],
    studioOrClient: { label: "Studio", name: "GRANDFLEET" },
    completionDate: "22 Dec, 2023",
    duration: "1 Month",
    role: "Lead Developer",
    screenshots: [
      { src: "/assets/img/PGW/PGW_SS1 (2).jpg", caption: "Chunk boundary streaming during continuous player traversal." },
      { src: "/assets/img/PGW/PGW_SS1 (3).jpg", caption: "Compute-shader density field calculations rendering in real-time." }
    ],
    heroImage: "/assets/img/PGW/PGW_Infinite.webp",
    demoGif: "/assets/img/PGW/PGWmin_GIF.gif",
  },
  {
    slug: "rawwar",
    title: "Project RAWWAR",
    category: ["2D", "Mechanics"],
    status: "Completed",
    hook: "A combat system driven entirely by real-time typing accuracy and APM mechanics.",
    problem: "Traditional typing games lack visceral combat feedback, while fighting games rely on abstract button combos. Needed a system linking keystroke precision directly to impact frames.",
    approach: "Built a custom input buffer mapping specific key-strings to animation states. Damage calculation is directly proportional to typing speed and accuracy multipliers, updating the UI dynamically without blocking the main combat thread.",
    results: "Achieved zero-latency input mapping ensuring responsive typing mechanics.",
    techStack: ["Unity", "C#", "UI/UX", "Input Systems"],
    studioOrClient: { label: "Studio", name: "GRANDFLEET" },
    completionDate: "15 Oct, 2023",
    duration: "2 Months",
    role: "Lead Game Designer",
    screenshots: [
      { src: "/assets/img/RAWWAR/RAWWAR_PLAYGROUND.webp", caption: "Open playground arena used to test typing-driven combat encounters." },
      { src: "/assets/img/RAWWAR/RAWWAR_PLAYGROUND3.webp", caption: "Visual feedback system triggering animation states on successful keystrokes." },
      { src: "/assets/img/RAWWAR/ProjectRawWar.webp", caption: "Key art for Project RAWWAR." }
    ],
    heroImage: "/assets/img/RAWWAR/RAWWAR_MAINMENU.webp",
    demoGif: "/assets/img/RAWWAR/RawWar_GIF.gif",
  },
  {
    slug: "tpc",
    title: "Third Person Controller",
    category: ["3D", "Mechanics", "Systems"],
    status: "Completed",
    hook: "A robust kinematics and state-driven character controller built from scratch.",
    problem: "Generic physics-based controllers often result in 'floaty' or unpredictable movement. Needed a highly responsive, state-machine-driven kinematic controller for precise action gameplay.",
    approach: "Implemented a finite state machine (FSM) architecture handling complex blend-trees, IK foot placement, root motion extraction, and custom gravity interpolation logic independent of Unity's built-in rigidbodies.",
    results: "Reduced animation state transition latency and eliminated physics clipping.",
    techStack: ["Unity", "C#", "Animation Rigging", "Kinematics"],
    studioOrClient: { label: "Studio", name: "GRANDFLEET" },
    completionDate: "10 Jan, 2024",
    duration: "1.5 Months",
    role: "Gameplay Programmer",
    screenshots: [
      { src: "/assets/img/SMTPCC/TP_Player_Controller(1).webp", caption: "IK foot placement system adapting to uneven terrain geometry." },
      { src: "/assets/img/SMTPCC/TP_Player_Controller(2).webp", caption: "Animation blend tree managing seamless transitions between locomotion states." },
      { src: "/assets/img/SMTPCC/TP_Player_Controller(3).webp", caption: "Custom camera collision raycasting for dynamic obstacle occlusion." }
    ],
    heroImage: "/assets/img/SMTPCC/TP_Player_Controller.webp",
  },
  {
    slug: "pgw-forest",
    title: "Procedural Forest Biomes",
    category: ["3D", "Procedural"],
    status: "Completed",
    hook: "Algorithmic foliage scattering and terrain texturing using multi-layered noise functions.",
    problem: "Hand-placing tens of thousands of foliage instances is impossible. Needed an algorithmic solution to scatter trees, rocks, and grass organically without clustering artifacts or performance dips.",
    approach: "Designed a rule-based scattering tool relying on Poisson Disk Sampling for even distribution, coupled with slope and height masking to ensure logical biome placement (e.g., no trees on steep cliffs or underwater).",
    results: "Generated 50km² dense forest regions in under 3 seconds of load time.",
    techStack: ["Unity", "C#", "Poisson Disk Sampling", "Shaders"],
    studioOrClient: { label: "Studio", name: "GRANDFLEET" },
    completionDate: "05 Nov, 2023",
    duration: "3 Weeks",
    role: "Tools Programmer",
    screenshots: [
      { src: "/assets/img/PGWF/PGW_2_FOREST(2)-min.webp", caption: "Poisson Disk Sampling ensuring organic spacing between canopy trees." },
      { src: "/assets/img/PGWF/PGW_2_FOREST(3)-min.webp", caption: "Slope-based terrain masking preventing flora generation on steep cliffs." },
      { src: "/assets/img/PGWF/PGW_2_FOREST(4)-min.webp", caption: "GPU-instanced grass rendering holding high performance across large fields." }
    ],
    heroImage: "/assets/img/PGWF/PGW_2_FOREST_(1)-min.webp",
    demoGif: "/assets/img/PGWF/PGW_Forest_GIF.gif",
  },
  {
    slug: "drawnscape",
    title: "Drawnscape",
    category: ["2D", "Mechanics", "Tools"],
    status: "Completed",
    hook: "A 2D puzzle-platformer built around a custom real-time line-drawing physics mechanic.",
    problem: "Standard physics colliders do not support dynamic, user-generated geometry well. Needed a performant way for players to draw custom collision lines that instantly react to rigidbody entities.",
    approach: "Developed a custom mesh generation algorithm that converts 2D screen-space mouse strokes into optimized PolygonCollider2D paths in real-time, handling edge simplifications to keep physics calculations cheap.",
    techStack: ["Unity", "C#", "Physics2D", "Mesh Generation"],
    studioOrClient: { label: "Studio", name: "GRANDFLEET" },
    completionDate: "12 Mar, 2024",
    duration: "1 Month",
    role: "Lead Developer",
    screenshots: [
      { src: "/assets/img/Drawnscape/FeatureGraphic.webp", caption: "Real-time conversion of screen-space strokes into 2D mesh colliders." },
      { src: "/assets/img/Drawnscape/FeatureGraphic2.webp", caption: "Dynamic physics interactions between player rigidbodies and generated lines." },
      { src: "/assets/img/Drawnscape/FeatureGraphic_3.webp", caption: "Edge simplification algorithm actively reducing collider complexity." }
    ],
    heroImage: "/assets/img/Drawnscape/Drawnscape_Front_IMG.webp",
  },
  {
    slug: "pcp",
    title: "Procedural City Prototype",
    category: ["3D", "Procedural", "Tools"],
    status: "In Progress",
    hook: "A grid-based generation toolkit for spawning complex urban environments algorithmically.",
    problem: "Urban environments require rigid structural rules (roads, zoning, building footprints) unlike organic terrain. Needed a deterministic grid-based layout algorithm.",
    approach: "Implemented a modified Wave Function Collapse (WFC) algorithm and L-Systems to generate road networks first, then subdivide blocks into logical parcels for modular building prefab instantiation.",
    techStack: ["Unity", "C#", "Wave Function Collapse", "L-Systems"],
    studioOrClient: { label: "Studio", name: "GRANDFLEET" },
    completionDate: "Ongoing",
    duration: "In Development",
    role: "Systems Architect",
    screenshots: [
      { src: "/assets/img/PCP/PCP_SS2.webp", caption: "L-System road network generation outlining major arterial paths." },
      { src: "/assets/img/PCP/PCP_SS3.webp", caption: "Block subdivision logic parsing valid building parcels." },
      { src: "/assets/img/PCP/PCP_SS4.webp", caption: "Modular building generation populating the final grid." }
    ],
    heroImage: "/assets/img/PCP/PCP_SS1.webp",
  }
];
