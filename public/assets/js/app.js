/**
 * Main Application Entry Point
 * Orchestrates all components and handles application lifecycle
 * @author THE
 */

import { Logger } from './utils.js';
import { CONFIG } from './config.js';
import Navigation from './components/Navigation.js';
import Portfolio from './components/Portfolio.js';
import ContactForm from './components/ContactForm.js';
import Animations from './components/Animations.js';

class ThePortfolioApp {
  constructor() {
    this.components = {};
    this.initialized = false;
    this.startTime = Date.now();
    
    Logger.log('THE Portfolio App starting...');
    this.init();
  }

  async init() {
    try {
      // Wait for DOM to be ready
      await this.waitForDOM();
      
      // Initialize core components
      await this.initializeComponents();
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      // Mark as initialized
      this.initialized = true;
      
      const loadTime = Date.now() - this.startTime;
      Logger.log(`THE Portfolio App initialized in ${loadTime}ms`);
      
      // Trigger ready event
      this.triggerReady();
      
    } catch (error) {
      Logger.error('Failed to initialize application:', error);
      this.handleInitializationError(error);
    }
  }

  waitForDOM() {
    return new Promise((resolve) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  async initializeComponents() {
    const componentInitializers = [
      { name: 'animations', class: Animations, critical: true },
      { name: 'navigation', class: Navigation, critical: true },
      { name: 'portfolio', class: Portfolio, critical: false },
      { name: 'contactForm', class: ContactForm, critical: false }
    ];

    // Initialize critical components first
    const criticalComponents = componentInitializers.filter(comp => comp.critical);
    const nonCriticalComponents = componentInitializers.filter(comp => !comp.critical);

    // Initialize critical components synchronously
    for (const { name, class: ComponentClass } of criticalComponents) {
      try {
        this.components[name] = new ComponentClass();
        Logger.log(`${name} component initialized`);
      } catch (error) {
        Logger.error(`Failed to initialize critical component ${name}:`, error);
        throw error;
      }
    }

    // Initialize non-critical components asynchronously
    const nonCriticalPromises = nonCriticalComponents.map(async ({ name, class: ComponentClass }) => {
      try {
        this.components[name] = new ComponentClass();
        Logger.log(`${name} component initialized`);
      } catch (error) {
        Logger.warn(`Failed to initialize component ${name}:`, error);
        // Don't throw for non-critical components
      }
    });

    await Promise.all(nonCriticalPromises);
  }

  setupGlobalEvents() {
    // Global error handling
    window.addEventListener('error', this.handleGlobalError.bind(this));
    window.addEventListener('unhandledrejection', this.handleUnhandledRejection.bind(this));
    
    // Performance monitoring
    if (CONFIG.dev.showPerformanceMetrics) {
      this.setupPerformanceMonitoring();
    }
    
    // Keyboard shortcuts
    this.setupKeyboardShortcuts();
    
    // Page visibility handling
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Only handle shortcuts when not typing in form fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'h':
        case 'H':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.navigateToSection('home');
          }
          break;
          
        case 'p':
        case 'P':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.navigateToSection('portfolio');
          }
          break;
          
        case 'c':
        case 'C':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            this.navigateToSection('contact');
          }
          break;
          
        case 'Escape':
          this.handleEscapeKey();
          break;
      }
    });
  }

  setupPerformanceMonitoring() {
    // Monitor performance metrics
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'navigation') {
          Logger.log('Navigation timing:', {
            domContentLoaded: entry.domContentLoadedEventEnd - entry.domContentLoadedEventStart,
            loadComplete: entry.loadEventEnd - entry.loadEventStart,
            totalTime: entry.loadEventEnd - entry.fetchStart
          });
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation'] });
  }

  navigateToSection(sectionId) {
    if (this.components.navigation) {
      this.components.navigation.scrollToSection(sectionId);
    }
  }

  handleEscapeKey() {
    // Close any open modals or menus
    if (this.components.navigation) {
      this.components.navigation.closeMobileNav();
    }
    
    // Remove focus from any focused elements
    if (document.activeElement && document.activeElement.blur) {
      document.activeElement.blur();
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      Logger.log('Page hidden');
      // Pause any animations or timers if needed
    } else {
      Logger.log('Page visible');
      // Resume animations or refresh data if needed
    }
  }

  handleGlobalError(event) {
    Logger.error('Global error:', event.error);
    
    // Send error to analytics if configured
    if (CONFIG.dev.debugMode) {
      console.error('Unhandled error:', event.error);
    }
  }

  handleUnhandledRejection(event) {
    Logger.error('Unhandled promise rejection:', event.reason);
    
    // Send error to analytics if configured
    if (CONFIG.dev.debugMode) {
      console.error('Unhandled promise rejection:', event.reason);
    }
  }

  handleInitializationError(error) {
    Logger.error('Application initialization failed:', error);
    
    // Show user-friendly error message
    const errorElement = document.createElement('div');
    errorElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 107, 107, 0.9);
      color: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      z-index: 10000;
      font-family: 'Poppins', sans-serif;
    `;
    
    errorElement.innerHTML = `
      <h3>Oops! Something went wrong</h3>
      <p>The portfolio failed to load properly. Please refresh the page.</p>
      <button onclick="window.location.reload()" style="
        background: white;
        color: #ff6b6b;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 1rem;
      ">Refresh Page</button>
    `;
    
    document.body.appendChild(errorElement);
  }

  triggerReady() {
    // Dispatch custom ready event
    const readyEvent = new CustomEvent('thePortfolioReady', {
      detail: {
        components: Object.keys(this.components),
        loadTime: Date.now() - this.startTime
      }
    });
    
    document.dispatchEvent(readyEvent);
    
    // Execute any queued callbacks
    if (window.ThePortfolioCallbacks) {
      window.ThePortfolioCallbacks.forEach(callback => {
        try {
          callback(this);
        } catch (error) {
          Logger.error('Callback execution failed:', error);
        }
      });
      window.ThePortfolioCallbacks = [];
    }
  }

  // Public API methods
  getComponent(name) {
    return this.components[name];
  }

  isReady() {
    return this.initialized;
  }

  async refresh() {
    Logger.log('Refreshing application...');
    
    // Refresh components that support it
    if (this.components.portfolio && typeof this.components.portfolio.refreshItems === 'function') {
      this.components.portfolio.refreshItems();
    }
    
    // Re-initialize animations for new elements
    if (this.components.animations) {
      this.components.animations.initScrollAnimations();
    }
  }

  destroy() {
    Logger.log('Destroying application...');
    
    // Destroy all components
    Object.values(this.components).forEach(component => {
      if (typeof component.destroy === 'function') {
        component.destroy();
      }
    });
    
    this.components = {};
    this.initialized = false;
  }
}

// Global API
window.ThePortfolio = {
  // Queue for callbacks before app is ready
  callbacks: window.ThePortfolioCallbacks || [],
  
  // Add callback to be executed when app is ready
  ready: function(callback) {
    if (window.ThePortfolioApp && window.ThePortfolioApp.isReady()) {
      callback(window.ThePortfolioApp);
    } else {
      this.callbacks.push(callback);
    }
  },
  
  // Get component instance
  getComponent: function(name) {
    return window.ThePortfolioApp ? window.ThePortfolioApp.getComponent(name) : null;
  }
};

// Store callbacks globally
window.ThePortfolioCallbacks = window.ThePortfolio.callbacks;

// Initialize application
window.ThePortfolioApp = new ThePortfolioApp();

// For backwards compatibility, also attach to window
window.addEventListener('thePortfolioReady', (event) => {
  Logger.log('Application ready event fired:', event.detail);
});

export default ThePortfolioApp;
