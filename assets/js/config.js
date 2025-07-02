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
