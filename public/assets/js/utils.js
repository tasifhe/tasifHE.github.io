/**
 * Utility functions for THE Portfolio
 * Common helper functions used throughout the application
 * @author THE
 */

import { shouldLog } from './config.js';

// DOM Utilities
export const DOM = {
  /**
   * Enhanced selector helper function
   */
  select: (el, all = false) => {
    if (!el) return null;
    el = el.trim();
    
    try {
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    } catch (error) {
      console.error('Invalid selector:', el, error);
      return all ? [] : null;
    }
  },

  /**
   * Enhanced event listener function
   */
  on: (type, el, listener, options = {}) => {
    const elements = typeof el === 'string' ? DOM.select(el, options.all) : el;
    
    if (!elements) return false;
    
    if (Array.isArray(elements)) {
      elements.forEach(element => {
        if (element && typeof element.addEventListener === 'function') {
          element.addEventListener(type, listener, options);
        }
      });
    } else {
      if (elements && typeof elements.addEventListener === 'function') {
        elements.addEventListener(type, listener, options);
      }
    }
    
    return true;
  },

  /**
   * Remove event listener helper
   */
  off: (type, el, listener, options = {}) => {
    const elements = typeof el === 'string' ? DOM.select(el, options.all) : el;
    
    if (!elements) return false;
    
    if (Array.isArray(elements)) {
      elements.forEach(element => {
        if (element && typeof element.removeEventListener === 'function') {
          element.removeEventListener(type, listener, options);
        }
      });
    } else {
      if (elements && typeof elements.removeEventListener === 'function') {
        elements.removeEventListener(type, listener, options);
      }
    }
    
    return true;
  },

  /**
   * Check if element exists
   */
  exists: (selector) => {
    return DOM.select(selector) !== null;
  },

  /**
   * Wait for element to exist
   */
  waitFor: (selector, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const element = DOM.select(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver(() => {
        const element = DOM.select(selector);
        if (element) {
          observer.disconnect();
          resolve(element);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  },

  /**
   * Create element with attributes and content
   */
  create: (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'style' && typeof value === 'object') {
        Object.assign(element.style, value);
      } else if (key === 'className') {
        element.className = value;
      } else if (key === 'dataset' && typeof value === 'object') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else {
        element.setAttribute(key, value);
      }
    });
    
    if (content) {
      if (typeof content === 'string') {
        element.innerHTML = content;
      } else if (content instanceof Node) {
        element.appendChild(content);
      }
    }
    
    return element;
  }
};

// Animation Utilities
export const Animation = {
  /**
   * Smooth scroll to element
   */
  scrollTo: (target, offset = 0, duration = 800) => {
    const element = typeof target === 'string' ? DOM.select(target) : target;
    if (!element) return Promise.reject('Element not found');

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    return new Promise((resolve) => {
      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = Animation.easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          resolve();
        }
      }
      requestAnimationFrame(animation);
    });
  },

  /**
   * Easing function for smooth animations
   */
  easeInOutQuad: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  },

  /**
   * Fade in element
   */
  fadeIn: (element, duration = 400) => {
    const el = typeof element === 'string' ? DOM.select(element) : element;
    if (!el) return Promise.reject('Element not found');

    return new Promise((resolve) => {
      el.style.opacity = '0';
      el.style.display = 'block';
      el.style.transition = `opacity ${duration}ms ease`;
      
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        setTimeout(resolve, duration);
      });
    });
  },

  /**
   * Fade out element
   */
  fadeOut: (element, duration = 400) => {
    const el = typeof element === 'string' ? DOM.select(element) : element;
    if (!el) return Promise.reject('Element not found');

    return new Promise((resolve) => {
      el.style.transition = `opacity ${duration}ms ease`;
      el.style.opacity = '0';
      
      setTimeout(() => {
        el.style.display = 'none';
        resolve();
      }, duration);
    });
  },

  /**
   * Slide toggle element
   */
  slideToggle: (element, duration = 400) => {
    const el = typeof element === 'string' ? DOM.select(element) : element;
    if (!el) return Promise.reject('Element not found');

    const isVisible = window.getComputedStyle(el).display !== 'none';
    
    if (isVisible) {
      return Animation.slideUp(el, duration);
    } else {
      return Animation.slideDown(el, duration);
    }
  },

  slideUp: (element, duration = 400) => {
    const el = typeof element === 'string' ? DOM.select(element) : element;
    if (!el) return Promise.reject('Element not found');

    return new Promise((resolve) => {
      const height = el.offsetHeight;
      el.style.transition = `height ${duration}ms ease, opacity ${duration}ms ease`;
      el.style.height = height + 'px';
      el.style.overflow = 'hidden';
      
      requestAnimationFrame(() => {
        el.style.height = '0px';
        el.style.opacity = '0';
        
        setTimeout(() => {
          el.style.display = 'none';
          el.style.height = '';
          el.style.opacity = '';
          el.style.overflow = '';
          el.style.transition = '';
          resolve();
        }, duration);
      });
    });
  },

  slideDown: (element, duration = 400) => {
    const el = typeof element === 'string' ? DOM.select(element) : element;
    if (!el) return Promise.reject('Element not found');

    return new Promise((resolve) => {
      el.style.display = 'block';
      el.style.height = '0px';
      el.style.opacity = '0';
      el.style.overflow = 'hidden';
      el.style.transition = `height ${duration}ms ease, opacity ${duration}ms ease`;
      
      const height = el.scrollHeight;
      
      requestAnimationFrame(() => {
        el.style.height = height + 'px';
        el.style.opacity = '1';
        
        setTimeout(() => {
          el.style.height = '';
          el.style.opacity = '';
          el.style.overflow = '';
          el.style.transition = '';
          resolve();
        }, duration);
      });
    });
  }
};

// Performance Utilities
export const Performance = {
  /**
   * Debounce function
   */
  debounce: (func, wait, immediate = false) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  /**
   * Throttle function
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Request animation frame with fallback
   */
  raf: (callback) => {
    return (window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame || 
            function(callback) { setTimeout(callback, 16); })(callback);
  },

  /**
   * Check if element is in viewport
   */
  isInViewport: (element, threshold = 0) => {
    const el = typeof element === 'string' ? DOM.select(element) : element;
    if (!el) return false;

    const rect = el.getBoundingClientRect();
    return (
      rect.top >= -threshold &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + threshold &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Lazy load images
   */
  lazyLoadImages: (selector = 'img[data-src]') => {
    const images = DOM.select(selector, true);
    if (!images.length) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    images.forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Validation Utilities
export const Validation = {
  /**
   * Email validation
   */
  isEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  },

  /**
   * Phone validation
   */
  isPhone: (phone) => {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
  },

  /**
   * URL validation
   */
  isURL: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Required field validation
   */
  isRequired: (value) => {
    return value !== null && value !== undefined && String(value).trim().length > 0;
  },

  /**
   * Length validation
   */
  hasLength: (value, min, max) => {
    const length = String(value).length;
    return length >= min && length <= max;
  }
};

// Storage Utilities
export const Storage = {
  /**
   * Local storage with JSON support
   */
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Storage.set error:', error);
      return false;
    }
  },

  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Storage.get error:', error);
      return defaultValue;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage.remove error:', error);
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage.clear error:', error);
      return false;
    }
  }
};

// Logging Utilities
export const Logger = {
  log: (...args) => {
    if (shouldLog()) {
      console.log('[THE Portfolio]', ...args);
    }
  },

  warn: (...args) => {
    if (shouldLog()) {
      console.warn('[THE Portfolio]', ...args);
    }
  },

  error: (...args) => {
    if (shouldLog()) {
      console.error('[THE Portfolio]', ...args);
    }
  },

  group: (name, fn) => {
    if (shouldLog()) {
      console.group('[THE Portfolio]', name);
      fn();
      console.groupEnd();
    } else {
      fn();
    }
  }
};

// Device Detection
export const Device = {
  isMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  isTablet: () => {
    return /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
  },

  isDesktop: () => {
    return !Device.isMobile() && !Device.isTablet();
  },

  isTouchDevice: () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },

  getScreenSize: () => {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    if (width < 1400) return 'xl';
    return 'xxl';
  }
};

// Export all utilities as default
export default {
  DOM,
  Animation,
  Performance,
  Validation,
  Storage,
  Logger,
  Device
};
