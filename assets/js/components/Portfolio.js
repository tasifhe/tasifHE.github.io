/**
 * Portfolio Component
 * Handles portfolio filtering, display, and interactions
 * @author THE
 */

import { DOM, Animation, Performance, Logger } from '../utils.js';
import { CONFIG } from '../config.js';

export class Portfolio {
  constructor() {
    this.container = null;
    this.filterBtns = [];
    this.portfolioItems = [];
    this.currentFilter = 'all';
    this.isAnimating = false;
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.initLazyLoading();
    this.setupIntersectionObserver();
    Logger.log('Portfolio component initialized');
  }

  cacheElements() {
    this.container = DOM.select('.portfolio-container') || DOM.select('.portfolio-grid-game');
    this.filterBtns = DOM.select('.filter-btn', true) || [];
    this.portfolioItems = DOM.select('.portfolio-item', true) || DOM.select('.project-card', true) || [];
  }

  bindEvents() {
    // Filter button clicks
    this.filterBtns.forEach(btn => {
      DOM.on('click', btn, this.handleFilterClick.bind(this));
    });

    // Portfolio item interactions
    this.portfolioItems.forEach(item => {
      this.bindItemEvents(item);
    });

    // Keyboard navigation
    DOM.on('keydown', document, this.handleKeyNavigation.bind(this));
  }

  bindItemEvents(item) {
    const staticImg = item.querySelector('.project-image-static');
    const gifImg = item.querySelector('.project-image-gif');
    const detailsBtn = item.querySelector('.btn-details');
    const demoBtn = item.querySelector('.btn-demo');

    // Image hover effects with GIF preloading
    if (staticImg && gifImg) {
      let preloadTimeout;
      
      DOM.on('mouseenter', item, () => {
        // Preload GIF after short delay
        preloadTimeout = setTimeout(() => {
          this.preloadGif(gifImg);
        }, 200);
      });

      DOM.on('mouseleave', item, () => {
        clearTimeout(preloadTimeout);
      });
    }

    // Button interactions
    if (detailsBtn) {
      DOM.on('click', detailsBtn, (e) => {
        e.preventDefault();
        const url = detailsBtn.getAttribute('href') || detailsBtn.dataset.url;
        if (url) {
          this.openProjectDetails(url);
        }
      });
    }

    if (demoBtn) {
      DOM.on('click', demoBtn, (e) => {
        e.preventDefault();
        const url = demoBtn.getAttribute('href') || demoBtn.dataset.url;
        if (url) {
          this.openDemo(url);
        }
      });
    }

    // Add keyboard support
    item.setAttribute('tabindex', '0');
    DOM.on('keydown', item, (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (detailsBtn) {
          detailsBtn.click();
        }
      }
    });
  }

  handleFilterClick(e) {
    e.preventDefault();
    
    if (this.isAnimating) return;
    
    const btn = e.currentTarget;
    const filter = btn.dataset.filter || btn.getAttribute('data-filter');
    
    if (filter === this.currentFilter) return;
    
    // Update active button
    this.updateActiveFilter(btn);
    
    // Filter items
    this.filterItems(filter);
    
    this.currentFilter = filter;
    Logger.log('Portfolio filtered:', filter);
  }

  updateActiveFilter(activeBtn) {
    this.filterBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  async filterItems(filter) {
    this.isAnimating = true;
    
    try {
      // Fade out all items
      await Promise.all(
        this.portfolioItems.map(item => this.fadeOutItem(item))
      );
      
      // Filter and show relevant items
      const visibleItems = this.portfolioItems.filter(item => {
        const categories = item.dataset.category?.split(' ') || [];
        return filter === 'all' || categories.includes(filter);
      });
      
      // Hide non-matching items
      this.portfolioItems.forEach(item => {
        const categories = item.dataset.category?.split(' ') || [];
        const shouldShow = filter === 'all' || categories.includes(filter);
        
        if (shouldShow) {
          item.style.display = '';
          item.classList.remove('filtered-out');
          item.classList.add('filtered-in');
        } else {
          item.style.display = 'none';
          item.classList.remove('filtered-in');
          item.classList.add('filtered-out');
        }
      });
      
      // Fade in visible items with stagger
      await this.staggerFadeIn(visibleItems);
      
    } catch (error) {
      Logger.error('Filter animation failed:', error);
    } finally {
      this.isAnimating = false;
    }
  }

  fadeOutItem(item) {
    return new Promise(resolve => {
      item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      item.style.opacity = '0';
      item.style.transform = 'scale(0.9)';
      setTimeout(resolve, 300);
    });
  }

  staggerFadeIn(items) {
    return new Promise(resolve => {
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          
          if (index === items.length - 1) {
            setTimeout(resolve, 300);
          }
        }, index * 100);
      });
      
      if (items.length === 0) resolve();
    });
  }

  preloadGif(gifImg) {
    if (gifImg && !gifImg.dataset.loaded) {
      const preloader = new Image();
      preloader.onload = () => {
        gifImg.dataset.loaded = 'true';
        Logger.log('GIF preloaded:', preloader.src);
      };
      preloader.onerror = () => {
        Logger.warn('Failed to preload GIF:', preloader.src);
      };
      preloader.src = gifImg.src;
    }
  }

  openProjectDetails(url) {
    this.showLoadingOverlay();
    
    setTimeout(() => {
      if (url.startsWith('http')) {
        window.open(url, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = url;
      }
      this.hideLoadingOverlay();
    }, 800);
  }

  openDemo(url) {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  }

  showLoadingOverlay() {
    const overlay = DOM.create('div', {
      className: 'portfolio-loading-overlay',
      style: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '9999',
        backdropFilter: 'blur(5px)'
      }
    });

    const loader = DOM.create('div', {
      className: 'portfolio-loader',
      style: {
        width: '50px',
        height: '50px',
        border: '3px solid rgba(0, 180, 255, 0.3)',
        borderTop: '3px solid #0078ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }
    });

    overlay.appendChild(loader);
    document.body.appendChild(overlay);
    
    this.currentOverlay = overlay;
  }

  hideLoadingOverlay() {
    if (this.currentOverlay) {
      Animation.fadeOut(this.currentOverlay)
        .then(() => {
          if (this.currentOverlay && this.currentOverlay.parentNode) {
            this.currentOverlay.parentNode.removeChild(this.currentOverlay);
          }
          this.currentOverlay = null;
        })
        .catch(() => {
          // Fallback cleanup
          if (this.currentOverlay && this.currentOverlay.parentNode) {
            this.currentOverlay.parentNode.removeChild(this.currentOverlay);
          }
          this.currentOverlay = null;
        });
    }
  }

  initLazyLoading() {
    const images = DOM.select('img[data-src]', true);
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            img.classList.add('lazy-loaded');
            imageObserver.unobserve(img);
          }
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
  }

  setupIntersectionObserver() {
    if (!this.portfolioItems.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    this.portfolioItems.forEach(item => observer.observe(item));
  }

  handleKeyNavigation(e) {
    // Handle keyboard navigation for accessibility
    if (e.target.classList.contains('filter-btn')) {
      const buttons = this.filterBtns;
      const currentIndex = buttons.indexOf(e.target);
      
      let nextIndex = currentIndex;
      
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
          break;
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = buttons.length - 1;
          break;
      }
      
      if (nextIndex !== currentIndex) {
        buttons[nextIndex].focus();
      }
    }
  }

  // Public methods
  filterBy(category) {
    const btn = this.filterBtns.find(b => b.dataset.filter === category);
    if (btn) {
      btn.click();
    }
  }

  getActiveFilter() {
    return this.currentFilter;
  }

  refreshItems() {
    this.cacheElements();
    this.portfolioItems.forEach(item => this.bindItemEvents(item));
  }

  destroy() {
    // Clean up any observers or event listeners
    Logger.log('Portfolio component destroyed');
  }
}

export default Portfolio;
