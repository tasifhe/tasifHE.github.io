/**
 * Configuration file for THE Portfolio
 * Contains all configurable settings and constants
 * @author THE
 */

export const CONFIG = {
  // Site Information
  site: {
    name: 'THE Portfolio',
    version: '2.0.0',
    description: 'Professional Game Developer Portfolio',
    author: 'THE'
  },

  // API Endpoints
  api: {
    contact: 'forms/contact.php',
    newsletter: 'forms/newsletter.php'
  },

  // Animation Settings
  animations: {
    duration: {
      fast: 200,
      normal: 400,
      slow: 800,
      loading: 2000
    },
    easing: {
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    },
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  },

  // Scroll Settings
  scroll: {
    offset: 200,
    headerHideThreshold: 200,
    backToTopThreshold: 100,
    smoothScrollOffset: 80
  },

  // Loading Screen Settings
  loading: {
    minDisplayTime: 2000,
    maxDisplayTime: 5000,
    progressSteps: 8,
    debugMode: false
  },

  // Portfolio Filter Categories
  portfolioCategories: [
    { id: 'all', name: 'All Projects', icon: 'bi-grid' },
    { id: 'game', name: 'Games', icon: 'bi-controller' },
    { id: 'web', name: 'Web Apps', icon: 'bi-globe' },
    { id: 'mobile', name: 'Mobile', icon: 'bi-phone' },
    { id: 'unity', name: 'Unity', icon: 'bi-unity' }
  ],

  // Centralized Project Data
  projects: [
    {
      id: 'pgw',
      title: 'Procedural World Generation',
      subtitle: 'INFINITE TERRAIN SYSTEM',
      categories: ['3d', 'procedural'],
      status: 'completed',
      date: 'Sep 18, 2022',
      duration: '3 Months',
      complexity: 'Advanced',
      description: 'Advanced infinite terrain generation system with optimized chunk loading and dynamic LOD management. Features seamless world streaming, multi-threaded generation, and GPU-accelerated rendering for massive open worlds.',
      tech: ['Unity', 'C#', 'Procedural Generation', 'Compute Shaders'],
      images: {
        static: 'assets/img/PGW/PGW_Infinite.webp',
        gif: 'assets/img/PGW/PGWmin_GIF.gif'
      },
      metrics: [
        { value: '∞', label: 'Terrain Size' },
        { value: '60', label: 'FPS Target' },
        { value: '5', label: 'LOD Levels' }
      ],
      links: {
        details: 'portfolio-details_PGW.html',
        github: '#',
        demo: '#'
      }
    },
    {
      id: 'tpc',
      title: 'Third Person Controller',
      subtitle: 'ADVANCED CHARACTER SYSTEM',
      categories: ['3d', 'character'],
      status: 'completed',
      date: 'Oct 11, 2023',
      duration: '1 Month',
      complexity: 'Smooth',
      description: 'Comprehensive third-person character controller with advanced movement mechanics and camera system. Features state machine architecture, animation blending, and responsive input handling.',
      tech: ['Unity', 'C#', 'Physics', 'Animation'],
      images: {
        static: 'assets/img/SMTPCC/TP_Player_Controller(1).png',
        gif: 'assets/img/PGW/PGWmin_GIF.gif'
      },
      metrics: [
        { value: '12', label: 'Animations' },
        { value: '8', label: 'States' },
        { value: '3', label: 'Camera Modes' }
      ],
      links: {
        details: 'portfolio-details_TPC.html',
        github: '#',
        demo: '#'
      }
    },
    {
      id: 'pgw-forest',
      title: 'PWG Forest Limited',
      subtitle: 'BIOME-SPECIFIC GENERATION',
      categories: ['3d', 'procedural', 'ai'],
      status: 'completed',
      date: 'Dec 23, 2023',
      duration: '2 Months',
      complexity: 'Forest',
      description: 'Specialized forest biome generation with realistic tree placement and ecosystem simulation. Features dynamic vegetation density, seasonal variations, and wildlife spawn points.',
      tech: ['Unity', 'C#', 'Procedural Generation', 'Ecosystem AI'],
      images: {
        static: 'assets/img/PGWF/PGW_2_FOREST(2)-min.webp',
        gif: 'assets/img/PGWF/PGW_Forest_GIF.gif'
      },
      metrics: [
        { value: '1000+', label: 'Trees' },
        { value: '5', label: 'Biomes' },
        { value: '95%', label: 'Optimization' }
      ],
      links: {
        details: 'portfolio-details_PGW_Forest.html',
        github: '#',
        demo: '#'
      }
    },
    {
      id: 'rawwar',
      title: 'Rawwar (Type2Fight)',
      subtitle: 'COMPETITIVE TYPING GAME',
      categories: ['3d', 'shooter', 'multiplayer'],
      status: 'in-progress',
      date: 'Jul 11, 2023',
      duration: 'Ongoing',
      complexity: 'Team',
      description: 'Innovative typing-based combat game combining competitive programming with real-time strategy. Features multiplayer battles, skill-based progression, and dynamic arena combat.',
      tech: ['Unity', 'C#', 'Multiplayer', 'Networking'],
      images: {
        static: 'assets/img/RAWWAR/ProjectRawWar.webp',
        gif: 'assets/img/RAWWAR/RawWar_GIF.gif'
      },
      metrics: [
        { value: '85%', label: 'Complete' },
        { value: '4', label: 'Players' },
        { value: '∞', label: 'Replayability' }
      ],
      links: {
        details: 'portfolio-details_RAWWAR.html',
        github: '#',
        demo: '#'
      }
    },
    {
      id: 'drawnscape',
      title: 'Drawnscape',
      subtitle: 'ARTISTIC 2D ADVENTURE',
      categories: ['2d', 'character'],
      status: 'completed',
      date: 'Mar 15, 2024',
      duration: '1.5 Months',
      complexity: 'Artistic',
      description: 'Beautiful hand-drawn 2D adventure game with unique art style and engaging puzzle mechanics. Features custom drawing mechanics, physics-based interactions, and immersive storytelling.',
      tech: ['Unity 2D', 'C#', 'Digital Art', 'Physics'],
      images: {
        static: 'assets/img/Drawnscape/Drawnscape_Front_IMG.webp',
        gif: 'assets/img/Drawnscape_GIF.gif'
      },
      metrics: [
        { value: '50+', label: 'Levels' },
        { value: '100+', label: 'Assets' },
        { value: '5★', label: 'Rating' }
      ],
      links: {
        details: 'portfolio-details_Drawnscape.html',
        github: '#',
        demo: '#'
      }
    },
    {
      id: 'pcp',
      title: 'Project Crack Platoon',
      subtitle: 'TACTICAL SQUAD SHOOTER',
      categories: ['3d', 'shooter', 'multiplayer', 'ai'],
      status: 'in-progress',
      date: 'Jan 2024',
      duration: 'Ongoing',
      complexity: 'Ghost Interactive',
      description: 'Tactical squad-based shooter with strategic gameplay and team coordination. Features advanced AI, cover system, and cooperative multiplayer missions.',
      tech: ['Unity', 'C#', 'FPS', 'Tactical AI'],
      images: {
        static: 'assets/img/PCP/PCP_SS1.png',
        gif: 'assets/img/PCP_GIF.gif'
      },
      metrics: [
        { value: '4', label: 'Squad Size' },
        { value: '10+', label: 'Missions' },
        { value: 'Co-op', label: 'Mode' }
      ],
      links: {
        details: 'portfolio-details_PCP.html',
        github: '#',
        demo: '#'
      }
    }
  ],

  // Social Media Links
  social: {
    github: 'https://github.com/tasifHE',
    linkedin: 'https://linkedin.com/in/tasif',
    twitter: 'https://twitter.com/tasif',
    email: 'contact@the-portfolio.com'
  },

  // SEO Settings
  seo: {
    defaultTitle: 'THE - Game Developer Portfolio',
    titleSeparator: ' | ',
    defaultDescription: 'Professional game developer specializing in Unity, web development, and interactive experiences.',
    keywords: ['game developer', 'unity', 'web development', 'portfolio', 'interactive design']
  },

  // Performance Settings
  performance: {
    lazyLoadImages: true,
    preloadCriticalImages: true,
    debounceDelay: 150,
    throttleDelay: 16, // ~60fps
    intersectionObserverThreshold: 0.1
  },

  // Development Settings
  dev: {
    debugMode: false,
    enableConsoleMessages: true,
    showPerformanceMetrics: false
  },

  // Breakpoints (matching CSS)
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400
  },

  // Color Scheme
  colors: {
    primary: '#0078ff',
    secondary: '#00c6ff',
    accent: '#ff6b6b',
    dark: '#0a0a0a',
    light: '#ffffff',
    muted: '#888888'
  },

  // Form Validation Rules
  validation: {
    name: {
      minLength: 2,
      maxLength: 50,
      required: true
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      required: true
    },
    message: {
      minLength: 10,
      maxLength: 500,
      required: true
    }
  },

  // Error Messages
  messages: {
    success: 'Message sent successfully! I\'ll get back to you soon.',
    error: 'Sorry, there was an error sending your message. Please try again.',
    loading: 'Sending your message...',
    validation: {
      name: 'Please enter a valid name (2-50 characters)',
      email: 'Please enter a valid email address',
      message: 'Please enter a message (10-500 characters)'
    }
  }
};

// Utility functions for configuration
export const getBreakpoint = (size) => CONFIG.breakpoints[size] || 0;
export const getAnimationDuration = (speed) => CONFIG.animations.duration[speed] || 400;
export const isDebugMode = () => CONFIG.dev.debugMode;
export const shouldLog = () => CONFIG.dev.enableConsoleMessages;

// Media query helper
export const mediaQuery = (breakpoint) => {
  const bp = getBreakpoint(breakpoint);
  return window.matchMedia(`(min-width: ${bp}px)`);
};

// Default export
export default CONFIG;
