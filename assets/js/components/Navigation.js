/**
 * Navigation Component
 * Handles all navigation-related functionality
 * @author THE
 */

import { DOM, Animation, Performance, Logger } from '../utils.js';
import { CONFIG } from '../config.js';

export class Navigation {
  constructor() {
    this.header = null;
    this.navbar = null;
    this.mobileToggle = null;
    this.navLinks = [];
    this.lastScrollY = 0;
    this.isScrolling = false;
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.initScrollSpy();
    Logger.log('Navigation component initialized');
  }

  cacheElements() {
    this.header = DOM.select('#header');
    this.navbar = DOM.select('#navbar');
    this.mobileToggle = DOM.select('.mobile-nav-toggle');
    this.navLinks = DOM.select('#navbar .scrollto', true) || [];
  }

  bindEvents() {
    // Mobile navigation toggle
    if (this.mobileToggle) {
      DOM.on('click', this.mobileToggle, this.toggleMobileNav.bind(this));
    }

    // Scroll events
    const throttledScroll = Performance.throttle(this.handleScroll.bind(this), CONFIG.performance.throttleDelay);
    DOM.on('scroll', window, throttledScroll);

    // Navigation link clicks
    this.navLinks.forEach(link => {
      DOM.on('click', link, this.handleNavLinkClick.bind(this));
    });

    // Close mobile nav when clicking outside
    DOM.on('click', document, (e) => {
      if (!e.target.closest('#navbar') && !e.target.closest('.mobile-nav-toggle')) {
        this.closeMobileNav();
      }
    });

    // Handle resize
    const debouncedResize = Performance.debounce(this.handleResize.bind(this), 250);
    DOM.on('resize', window, debouncedResize);
  }

  toggleMobileNav() {
    const body = DOM.select('body');
    const isActive = body.classList.contains('mobile-nav-active');
    
    if (isActive) {
      this.closeMobileNav();
    } else {
      this.openMobileNav();
    }
  }

  openMobileNav() {
    const body = DOM.select('body');
    body.classList.add('mobile-nav-active');
    
    if (this.mobileToggle) {
      this.mobileToggle.classList.remove('bi-list');
      this.mobileToggle.classList.add('bi-x');
    }

    // Prevent body scroll
    body.style.overflow = 'hidden';
    
    Logger.log('Mobile navigation opened');
  }

  closeMobileNav() {
    const body = DOM.select('body');
    body.classList.remove('mobile-nav-active');
    
    if (this.mobileToggle) {
      this.mobileToggle.classList.remove('bi-x');
      this.mobileToggle.classList.add('bi-list');
    }

    // Restore body scroll
    body.style.overflow = '';
    
    Logger.log('Mobile navigation closed');
  }

  handleNavLinkClick(e) {
    e.preventDefault();
    const link = e.currentTarget;
    const targetId = link.getAttribute('href');
    
    if (!targetId || !targetId.startsWith('#')) return;
    
    const target = DOM.select(targetId);
    if (!target) return;

    // Close mobile nav if open
    this.closeMobileNav();

    // Smooth scroll to target
    Animation.scrollTo(target, CONFIG.scroll.smoothScrollOffset)
      .then(() => {
        // Update URL without triggering scroll
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      })
      .catch(error => {
        Logger.error('Scroll animation failed:', error);
      });
  }

  handleScroll() {
    const currentScrollY = window.pageYOffset;
    
    // Header background on scroll
    if (this.header) {
      if (currentScrollY > CONFIG.scroll.offset) {
        this.header.classList.add('header-scrolled');
      } else {
        this.header.classList.remove('header-scrolled');
      }

      // Hide/show header based on scroll direction
      if (currentScrollY > this.lastScrollY && currentScrollY > CONFIG.scroll.headerHideThreshold) {
        this.header.style.transform = 'translateY(-100%)';
      } else {
        this.header.style.transform = 'translateY(0)';
      }
    }

    // Update scroll spy
    this.updateScrollSpy();
    
    this.lastScrollY = currentScrollY;
  }

  handleResize() {
    // Close mobile nav on resize to desktop
    if (window.innerWidth > CONFIG.breakpoints.lg) {
      this.closeMobileNav();
    }
  }

  initScrollSpy() {
    if (!this.navLinks.length) return;

    // Create intersection observer for scroll spy
    const observerOptions = {
      root: null,
      rootMargin: `-${CONFIG.scroll.offset}px 0px -70% 0px`,
      threshold: 0
    };

    this.scrollSpyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const navLink = DOM.select(`#navbar .scrollto[href="#${id}"]`);
        
        if (navLink) {
          if (entry.isIntersecting) {
            // Remove active class from all links
            this.navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current link
            navLink.classList.add('active');
          }
        }
      });
    }, observerOptions);

    // Observe all sections with IDs that have corresponding nav links
    this.navLinks.forEach(link => {
      const targetId = link.getAttribute('href')?.substring(1);
      if (targetId) {
        const target = DOM.select(`#${targetId}`);
        if (target) {
          this.scrollSpyObserver.observe(target);
        }
      }
    });
  }

  updateScrollSpy() {
    // Fallback scroll spy for browsers that don't support IntersectionObserver properly
    if (!this.navLinks.length) return;

    const currentScroll = window.pageYOffset + CONFIG.scroll.offset;
    
    this.navLinks.forEach(navLink => {
      const targetId = navLink.getAttribute('href')?.substring(1);
      if (!targetId) return;
      
      const section = DOM.select(`#${targetId}`);
      if (!section) return;
      
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;
      
      if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
        // Remove active from all
        this.navLinks.forEach(link => link.classList.remove('active'));
        // Add active to current
        navLink.classList.add('active');
      }
    });
  }

  // Public methods
  scrollToSection(sectionId) {
    const target = DOM.select(`#${sectionId}`);
    if (target) {
      return Animation.scrollTo(target, CONFIG.scroll.smoothScrollOffset);
    }
    return Promise.reject('Section not found');
  }

  setActiveLink(linkId) {
    this.navLinks.forEach(link => link.classList.remove('active'));
    const activeLink = DOM.select(`#navbar .scrollto[href="#${linkId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  destroy() {
    // Clean up event listeners and observers
    if (this.scrollSpyObserver) {
      this.scrollSpyObserver.disconnect();
    }
    
    Logger.log('Navigation component destroyed');
  }
}

export default Navigation;
