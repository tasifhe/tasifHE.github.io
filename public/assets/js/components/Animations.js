/**
 * Animations Component
 * Handles scroll animations, counters, skill bars, and visual effects
 * @author THE
 */

import { DOM, Performance, Logger } from '../utils.js';
import { CONFIG } from '../config.js';

export class Animations {
  constructor() {
    this.observers = [];
    this.counters = [];
    this.skillBars = [];
    this.animatedElements = [];
    this.particles = [];
    
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initCounters();
    this.initSkillBars();
    this.initParticleEffects();
    this.initBackToTop();
    Logger.log('Animations component initialized');
  }

  initScrollAnimations() {
    // Create intersection observer for scroll animations
    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-on-scroll');
          
          // Trigger specific animations based on element type
          this.triggerElementAnimation(entry.target);
          
          // Remove observer after animation
          animationObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.animations.threshold,
      rootMargin: CONFIG.animations.rootMargin
    });

    // Observe elements with animation classes
    const animatableElements = DOM.select('.animate-on-scroll', true);
    animatableElements.forEach(element => {
      animationObserver.observe(element);
      this.animatedElements.push(element);
    });

    this.observers.push(animationObserver);
  }

  triggerElementAnimation(element) {
    // Counter animation
    if (element.classList.contains('counter')) {
      this.animateCounter(element);
    }
    
    // Skill bar animation
    if (element.classList.contains('skill-bar') || element.querySelector('.skill-progress')) {
      this.animateSkillBar(element);
    }
    
    // Custom entrance animations
    if (element.dataset.animation) {
      this.playCustomAnimation(element, element.dataset.animation);
    }
  }

  initCounters() {
    const counterElements = DOM.select('.counter', true);
    
    counterElements.forEach(counter => {
      const finalValue = parseInt(counter.dataset.count || counter.textContent);
      const duration = parseInt(counter.dataset.duration) || 2000;
      const increment = parseInt(counter.dataset.increment) || 1;
      
      this.counters.push({
        element: counter,
        finalValue,
        duration,
        increment,
        animated: false
      });
    });
  }

  animateCounter(counterElement) {
    const counterData = this.counters.find(c => c.element === counterElement);
    if (!counterData || counterData.animated) return;
    
    counterData.animated = true;
    const { element, finalValue, duration } = counterData;
    
    const startTime = Date.now();
    const startValue = 0;
    
    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(startValue + (finalValue - startValue) * easeOutQuart);
      
      element.textContent = currentValue;
      
      if (progress < 1) {
        Performance.raf(updateCounter);
      } else {
        element.textContent = finalValue;
        Logger.log('Counter animation completed:', finalValue);
      }
    };
    
    updateCounter();
  }

  initSkillBars() {
    const skillBarElements = DOM.select('.skill-bar', true);
    
    skillBarElements.forEach(skillBar => {
      const progressBar = skillBar.querySelector('.skill-progress') || skillBar.querySelector('.progress-bar');
      const percentage = parseInt(skillBar.dataset.percentage || progressBar?.dataset.percentage) || 0;
      
      this.skillBars.push({
        element: skillBar,
        progressBar,
        percentage,
        animated: false
      });
    });
  }

  animateSkillBar(skillBarElement) {
    const skillData = this.skillBars.find(s => s.element === skillBarElement);
    if (!skillData || skillData.animated) return;
    
    skillData.animated = true;
    const { progressBar, percentage } = skillData;
    
    if (!progressBar) return;
    
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 1.5s ease-out';
    
    // Trigger animation on next frame
    Performance.raf(() => {
      progressBar.style.width = percentage + '%';
      
      // Add percentage text if it doesn't exist
      const percentageText = progressBar.querySelector('.percentage-text');
      if (!percentageText) {
        const textElement = DOM.create('span', {
          className: 'percentage-text',
          style: {
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold'
          }
        }, percentage + '%');
        
        progressBar.appendChild(textElement);
      }
      
      Logger.log('Skill bar animated:', percentage + '%');
    });
  }

  playCustomAnimation(element, animationType) {
    switch (animationType) {
      case 'fadeInUp':
        element.style.transform = 'translateY(30px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s ease';
        Performance.raf(() => {
          element.style.transform = 'translateY(0)';
          element.style.opacity = '1';
        });
        break;
        
      case 'fadeInLeft':
        element.style.transform = 'translateX(-30px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s ease';
        Performance.raf(() => {
          element.style.transform = 'translateX(0)';
          element.style.opacity = '1';
        });
        break;
        
      case 'fadeInRight':
        element.style.transform = 'translateX(30px)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s ease';
        Performance.raf(() => {
          element.style.transform = 'translateX(0)';
          element.style.opacity = '1';
        });
        break;
        
      case 'zoomIn':
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = 'all 0.8s ease';
        Performance.raf(() => {
          element.style.transform = 'scale(1)';
          element.style.opacity = '1';
        });
        break;
        
      case 'rotateIn':
        element.style.transform = 'rotate(-180deg) scale(0.8)';
        element.style.opacity = '0';
        element.style.transition = 'all 1s ease';
        Performance.raf(() => {
          element.style.transform = 'rotate(0deg) scale(1)';
          element.style.opacity = '1';
        });
        break;
        
      default:
        Logger.warn('Unknown animation type:', animationType);
    }
  }

  initParticleEffects() {
    // Create floating particles background
    const particleContainer = DOM.select('.particle-container');
    if (!particleContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      this.createParticle(particleContainer);
    }
  }

  createParticle(container) {
    const particle = DOM.create('div', {
      className: 'particle',
      style: {
        position: 'absolute',
        width: Math.random() * 4 + 2 + 'px',
        height: Math.random() * 4 + 2 + 'px',
        background: `rgba(0, ${Math.floor(Math.random() * 255)}, 255, ${Math.random() * 0.5 + 0.2})`,
        borderRadius: '50%',
        left: Math.random() * 100 + '%',
        top: Math.random() * 100 + '%',
        animation: `float ${Math.random() * 10 + 10}s infinite linear`,
        pointerEvents: 'none'
      }
    });
    
    container.appendChild(particle);
    this.particles.push(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      const index = this.particles.indexOf(particle);
      if (index > -1) {
        this.particles.splice(index, 1);
      }
    }, 20000);
  }

  initBackToTop() {
    const backToTop = DOM.select('.back-to-top');
    if (!backToTop) return;
    
    const toggleVisibility = Performance.throttle(() => {
      if (window.pageYOffset > CONFIG.scroll.backToTopThreshold) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    }, 100);
    
    DOM.on('scroll', window, toggleVisibility);
    
    DOM.on('click', backToTop, (e) => {
      e.preventDefault();
      this.scrollToTop();
    });
  }

  scrollToTop() {
    const startPosition = window.pageYOffset;
    const startTime = Date.now();
    const duration = 800;
    
    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentPosition = startPosition * (1 - easeOutQuart);
      
      window.scrollTo(0, currentPosition);
      
      if (progress < 1) {
        Performance.raf(animateScroll);
      }
    };
    
    animateScroll();
  }

  // Page transition effects
  initPageTransitions() {
    // Fade in on page load
    document.body.style.opacity = '0';
    
    window.addEventListener('load', () => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    });
  }

  // Utility methods for triggering animations programmatically
  triggerFadeIn(element, delay = 0) {
    setTimeout(() => {
      this.playCustomAnimation(element, 'fadeInUp');
    }, delay);
  }

  triggerCounterAnimation(element) {
    this.animateCounter(element);
  }

  triggerSkillBarAnimation(element) {
    this.animateSkillBar(element);
  }

  // Create entrance animation for new elements
  addEntranceAnimation(element, animationType = 'fadeInUp', delay = 0) {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      this.playCustomAnimation(element, animationType);
    }, delay);
  }

  // Add CSS keyframes for animations
  addAnimationStyles() {
    const animationCSS = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
      }
      
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        33% { transform: translateY(-10px) rotate(120deg); }
        66% { transform: translateY(5px) rotate(240deg); }
        100% { transform: translateY(0px) rotate(360deg); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      @keyframes glow {
        0% { box-shadow: 0 0 5px rgba(0, 180, 255, 0.5); }
        50% { box-shadow: 0 0 20px rgba(0, 180, 255, 0.8); }
        100% { box-shadow: 0 0 5px rgba(0, 180, 255, 0.5); }
      }
    `;
    
    if (!DOM.select('#animation-styles')) {
      const style = DOM.create('style', { id: 'animation-styles' }, animationCSS);
      document.head.appendChild(style);
    }
  }

  destroy() {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    // Clean up particles
    this.particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    this.particles = [];
    
    Logger.log('Animations component destroyed');
  }
}

export default Animations;
