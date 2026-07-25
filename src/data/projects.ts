export type Project = {
  slug: string;
  title: string;
  category: string[];
  status: "Completed" | "In Progress";
  heroImage?: string;
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
      { src: "/assets/img/PGWF/PGW_2_FOREST(4)-min.webp", caption: "GPU-instanced grass rendering holding high performance across large fields." },
      { src: "/assets/img/Screenshot 2025-02-04 022124.webp", caption: "Dense canopy distribution viewed from a low flythrough angle in-editor." }
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
    title: "Project Crack Platoon",
    category: ["3D", "Mechanics", "Systems"],
    status: "In Progress",
    hook: "A hardcore, stealth-based tactical shooter — a spiritual successor to Project IGI — where Tier 1 operators infiltrate hostile territory through strategic Co-Op and PvP missions.",
    problem: "Wanted a tactical shooter that rewards patience and precision over run-and-gun play, where advanced AI, gadgets, and reading the terrain matter more than reflexes alone.",
    approach: "Designing strategy-driven infiltration missions against advanced AI opponents, gadget-based problem solving (night vision, thermal vision, armor plating, gas masks), and cooperative multiplayer built around coordination under pressure.",
    techStack: ["Unity", "C#", "AI Systems", "Multiplayer Networking"],
    studioOrClient: { label: "Studio", name: "Ghost Interactive" },
    completionDate: "Ongoing",
    duration: "In Development",
    role: "Lead Game Designer",
    screenshots: [
      { src: "/assets/img/PCP/PCP_SS2.webp", caption: "A gated checkpoint bridge blocking the approach to a fortified compound." },
      { src: "/assets/img/PCP/PCP_SS3.webp", caption: "Perimeter approach along a forested compound wall during a night infiltration." },
      { src: "/assets/img/PCP/PCP_SS4.webp", caption: "Aerial view of an industrial facility objective, with the AI navigation mesh visible for patrol routing." }
    ],
    heroImage: "/assets/img/PCP/PCP_SS1.webp",
  },
  {
    slug: "protocol-zero",
    title: "Protocol Zero",
    category: ["3D", "Mechanics", "Systems"],
    status: "In Progress",
    hook: "A hardcore, realism-driven survival game set in a post-apocalyptic Europe after a global nuclear catastrophe, where every decision between violence and mercy shapes your fate.",
    problem: "Wanted survival stakes that felt real — not just a hunger bar, but radiation, temperature, and stamina all compounding against you while mutated creatures and rival factions hunt the same scraps you need to live.",
    approach: "Building layered survival systems (hunger, radiation exposure, temperature, stamina) alongside tactical combat against mutated creatures and human factions, with scavenging and crafting systems for adapting to the environment.",
    techStack: ["Unity", "C#", "Systems Design"],
    studioOrClient: { label: "Studio", name: "Ghost Interactive" },
    completionDate: "Coming Soon",
    duration: "In Development",
    role: "Lead Game Designer",
    screenshots: [],
  },
  {
    slug: "realtime-traffic-system",
    title: "Realtime Traffic System",
    category: ["3D", "Procedural", "Systems"],
    status: "Completed",
    hook: "A real-time vehicle traffic simulation built as a university systems project, with AI-driven pathfinding and intersection logic.",
    problem: "Needed believable, self-regulating traffic flow for a simulated road network without hand-scripting every vehicle's route.",
    approach: "Implemented AI-driven vehicle pathfinding with intersection and right-of-way logic, spawning and routing traffic in real time across a procedurally laid-out road network.",
    techStack: ["Unity", "C#", "AI Pathfinding"],
    studioOrClient: { label: "Studio", name: "Shanto-Mariam University of Creative Technology" },
    completionDate: "2023",
    duration: "University Project",
    role: "Systems Programmer",
    screenshots: [],
  },
  {
    slug: "stormfly-ascent",
    title: "Stormfly Ascent",
    category: ["2D", "Mobile", "Mechanics"],
    status: "Completed",
    hook: "A mobile endless runner starring a storm-battered bird you steer through the sky, one wingbeat at a time.",
    problem: "Wanted a tight, one-touch mobile control scheme that stayed skill-expressive over long endless-runner sessions instead of going flat and repetitive.",
    approach: "Built a physics-driven flight controller around simple tap/hold input, with procedurally spawned obstacle patterns to keep runs unpredictable run after run.",
    techStack: ["Unity", "C#", "Mobile"],
    studioOrClient: { label: "Studio", name: "Personal Project" },
    completionDate: "2022",
    duration: "Personal Project",
    role: "Solo Developer",
    screenshots: [],
  },
  {
    slug: "greybox-vertical-slice",
    title: "Greybox: Vertical Slice",
    category: ["3D", "Level Design", "Tools"],
    status: "Completed",
    hook: "A level design practice pass — blockout, pacing, and encounter placement for a single vertical-slice environment.",
    problem: "Wanted deliberate practice at spatial storytelling and pacing outside of a production pipeline, where every layout choice is mine to make and critique.",
    approach: "Greyboxed a full level from blockout through a lighting pass, iterating on sightlines, encounter pacing, and player guidance using landmarking and light.",
    techStack: ["Unity", "Level Design", "Lighting"],
    studioOrClient: { label: "Studio", name: "Personal Project" },
    completionDate: "2023",
    duration: "Personal Project",
    role: "Level Designer",
    screenshots: [],
  },
  {
    slug: "vfx-particle-study",
    title: "VFX & Particle Study",
    category: ["VFX", "Procedural", "Tools"],
    status: "Completed",
    hook: "A series of shader and particle-system studies — fire, magic, and impact effects built to sharpen real-time VFX skills.",
    problem: "Wanted hands-on reps with real-time VFX — juice and visual feedback are as much a design tool as a mechanic, and worth owning rather than outsourcing to asset packs.",
    approach: "Built a set of particle and shader effects (impacts, magic casts, environmental ambience) using Unity's Shader Graph and VFX Graph, focused on readability and game feel.",
    techStack: ["Unity", "Shader Graph", "VFX Graph"],
    studioOrClient: { label: "Studio", name: "Personal Project" },
    completionDate: "2023",
    duration: "Personal Project",
    role: "VFX Artist",
    screenshots: [],
  }
];
