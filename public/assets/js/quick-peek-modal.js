/**
 * Quick Peek Modal Component
 * AAA-Level Portfolio - Interactive Project Preview System
 * Author: THE
 * Version: 2.0.3
 */

// Project data (inline for reliability - synced with config.js)
const PROJECTS_DATA = {
  'pgw': {
    id: 'pgw',
    title: 'Procedural World Generation',
    subtitle: 'INFINITE TERRAIN SYSTEM',
    status: 'completed',
    date: 'Sep 18, 2022',
    duration: '3 Months',
    description: 'Advanced infinite terrain generation system with optimized chunk loading and dynamic LOD management. Features seamless world streaming, multi-threaded generation, and GPU-accelerated rendering for massive open worlds.',
    tech: ['Unity', 'C#', 'Procedural', 'Compute Shaders'],
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
  'tpc': {
    id: 'tpc',
    title: 'Third Person Controller',
    subtitle: 'ADVANCED CHARACTER SYSTEM',
    status: 'completed',
    date: 'Oct 11, 2023',
    duration: '1 Month',
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
  'pgw-forest': {
    id: 'pgw-forest',
    title: 'PWG Forest Limited',
    subtitle: 'BIOME-SPECIFIC GENERATION',
    status: 'completed',
    date: 'Dec 23, 2023',
    duration: '2 Months',
    description: 'Specialized forest biome generation with realistic tree placement and ecosystem simulation. Features dynamic vegetation density, seasonal variations, and wildlife spawn points.',
    tech: ['Unity', 'C#', 'Procedural', 'Ecosystem AI'],
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
  'rawwar': {
    id: 'rawwar',
    title: 'Rawwar (Type2Fight)',
    subtitle: 'COMPETITIVE TYPING GAME',
    status: 'in-progress',
    date: 'Jul 11, 2023',
    duration: 'Ongoing',
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
  'drawnscape': {
    id: 'drawnscape',
    title: 'Drawnscape',
    subtitle: 'ARTISTIC 2D ADVENTURE',
    status: 'completed',
    date: 'Mar 15, 2024',
    duration: '1.5 Months',
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
  'pcp': {
    id: 'pcp',
    title: 'Project Crack Platoon',
    subtitle: 'TACTICAL SQUAD SHOOTER',
    status: 'in-progress',
    date: 'Jan 2024',
    duration: 'Ongoing',
    description: 'Tactical squad-based shooter with strategic gameplay and team coordination. Features advanced AI, cover system, and cooperative multiplayer missions.',
    tech: ['Unity', 'C#', 'FPS', 'Tactical AI'],
    images: {
      static: 'assets/img/PCP/PCP_SS1.png',
      gif: 'assets/img/PCP_GIF.gif'
    },
    metrics: [
      { value: '4', label: 'Squad Size' },
      { value: '10+', label: 'Operations' },
      { value: 'Co-op', label: 'Mode' }
    ],
    links: {
      details: 'portfolio-details_PCP.html',
      github: '#',
      demo: '#'
    }
  }
};

// Map card index to project ID
const PROJECT_ID_MAP = ['pgw', 'tpc', 'pgw-forest', 'rawwar', 'drawnscape', 'pcp'];

class QuickPeekModal {
  constructor() {
    this.overlay = null;
    this.modal = null;
    this.isOpen = false;
    this.currentProject = null;
    this.focusableElements = [];
    this.lastFocusedElement = null;
    
    this.init();
  }
  
  init() {
    this.createModalStructure();
    this.bindEvents();
    this.addCardClickHandlers();
    console.log('QuickPeekModal initialized');
  }
  
  createModalStructure() {
    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'quick-peek-overlay';
    this.overlay.setAttribute('role', 'dialog');
    this.overlay.setAttribute('aria-modal', 'true');
    this.overlay.setAttribute('aria-labelledby', 'quick-peek-title');
    this.overlay.tabIndex = -1;
    
    // Create modal
    this.modal = document.createElement('div');
    this.modal.className = 'quick-peek-modal';
    
    // Modal HTML structure
    this.modal.innerHTML = `
      <button class="quick-peek-close" aria-label="Close preview">
        <i class="bi bi-x-lg"></i>
      </button>
      
      <div class="quick-peek-loading">
        <div class="quick-peek-spinner"></div>
        <span class="quick-peek-loading-text">Loading preview...</span>
      </div>
      
      <div class="quick-peek-media">
        <img class="quick-peek-image" src="" alt="" loading="eager">
        <div class="quick-peek-status"></div>
        <div class="quick-peek-tech-stack"></div>
      </div>
      
      <div class="quick-peek-content">
        <div class="quick-peek-header">
          <h2 class="quick-peek-title" id="quick-peek-title"></h2>
          <p class="quick-peek-subtitle"></p>
        </div>
        
        <div class="quick-peek-meta"></div>
        
        <p class="quick-peek-description"></p>
        
        <div class="quick-peek-metrics"></div>
        
        <div class="quick-peek-actions">
          <a href="#" class="quick-peek-btn primary" target="_blank">
            <i class="bi bi-eye"></i>
            <span>VIEW DETAILS</span>
          </a>
          <a href="#" class="quick-peek-btn github" target="_blank">
            <i class="bi bi-github"></i>
            <span>SOURCE CODE</span>
          </a>
        </div>
      </div>
    `;
    
    this.overlay.appendChild(this.modal);
    document.body.appendChild(this.overlay);
  }
  
  bindEvents() {
    // Close button
    const closeBtn = this.modal.querySelector('.quick-peek-close');
    closeBtn.addEventListener('click', () => this.close());
    
    // Overlay click (outside modal)
    this.overlay.addEventListener('click', (e) => {
      if (e.target === this.overlay) {
        this.close();
      }
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
      if (!this.isOpen) return;
      
      if (e.key === 'Escape') {
        this.close();
      }
      
      if (e.key === 'Tab') {
        this.trapFocus(e);
      }
    });
    
    // Handle image load
    const img = this.modal.querySelector('.quick-peek-image');
    img.addEventListener('load', () => {
      this.hideLoading();
    });
    
    img.addEventListener('error', function onImgError() {
      img.removeEventListener('error', onImgError); // prevent infinite loop
      this.hideLoading();
      img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%230a0f1e'/%3E%3Crect x='1' y='1' width='598' height='398' fill='none' stroke='%230078ff' stroke-width='1' opacity='0.4'/%3E%3Ctext x='300' y='185' font-family='monospace' font-size='40' fill='%230078ff' opacity='0.5' text-anchor='middle'%3E%5B%20%5D%3C/text%3E%3Ctext x='300' y='230' font-family='monospace' font-size='14' fill='%23ffffff' opacity='0.4' text-anchor='middle'%3ENo Preview Available%3C/text%3E%3C/svg%3E";
    }.bind(this));
  }
  
  addCardClickHandlers() {
    const cards = document.querySelectorAll('.portfolio-card-game, .project-card-redesign');
    
    cards.forEach((card, index) => {
      // Create quick peek trigger area
      const imageContainer = card.querySelector('.project-image-container, .project-media-container');
      
      if (imageContainer) {
        // Add quick peek button
        const quickPeekBtn = document.createElement('button');
        quickPeekBtn.className = 'quick-peek-trigger';
        quickPeekBtn.innerHTML = `
          <i class="bi bi-eye-fill"></i>
          <span>QUICK PEEK</span>
        `;
        quickPeekBtn.setAttribute('aria-label', 'Quick preview of project');
        
        // Style the button
        quickPeekBtn.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0.8);
          z-index: 20;
          padding: 10px 20px;
          background: linear-gradient(135deg, rgba(212, 175, 55, 0.95), rgba(243, 156, 18, 0.95));
          border: none;
          border-radius: 4px;
          color: #0D0F12;
          font-family: var(--font-heading, 'Bebas Neue', sans-serif);
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        `;
        
        // Show/hide on card hover
        card.addEventListener('mouseenter', () => {
          quickPeekBtn.style.opacity = '1';
          quickPeekBtn.style.visibility = 'visible';
          quickPeekBtn.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        
        card.addEventListener('mouseleave', () => {
          quickPeekBtn.style.opacity = '0';
          quickPeekBtn.style.visibility = 'hidden';
          quickPeekBtn.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });
        
        // Button hover effect
        quickPeekBtn.addEventListener('mouseenter', () => {
          quickPeekBtn.style.transform = 'translate(-50%, -50%) scale(1.05)';
          quickPeekBtn.style.boxShadow = '0 8px 24px rgba(212, 175, 55, 0.4)';
        });
        
        quickPeekBtn.addEventListener('mouseleave', () => {
          quickPeekBtn.style.transform = 'translate(-50%, -50%) scale(1)';
          quickPeekBtn.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        });
        
        // Click handler
        quickPeekBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const projectId = PROJECT_ID_MAP[index];
          if (projectId) {
            this.open(projectId);
          }
        });
        
        imageContainer.appendChild(quickPeekBtn);
      }
    });
  }
  
  open(projectId) {
    const project = PROJECTS_DATA[projectId];
    
    if (!project) {
      console.error('Project not found:', projectId);
      return;
    }
    
    this.currentProject = project;
    this.lastFocusedElement = document.activeElement;
    
    // Show loading
    this.showLoading();
    
    // Populate content
    this.populateModal(project);
    
    // Open modal
    this.isOpen = true;
    this.overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus management
    setTimeout(() => {
      this.overlay.focus();
      this.updateFocusableElements();
    }, 100);
    
    console.log('QuickPeek opened:', project.title);
  }
  
  close() {
    if (!this.isOpen) return;
    
    this.isOpen = false;
    this.overlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Return focus
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
    
    this.currentProject = null;
    console.log('QuickPeek closed');
  }
  
  populateModal(project) {
    // Image
    const img = this.modal.querySelector('.quick-peek-image');
    img.src = project.images.gif || project.images.static;
    img.alt = project.title;
    
    // Status
    const status = this.modal.querySelector('.quick-peek-status');
    status.className = `quick-peek-status ${project.status}`;
    status.textContent = project.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS';
    
    // Tech stack
    const techStack = this.modal.querySelector('.quick-peek-tech-stack');
    techStack.innerHTML = project.tech.map(tech => {
      const techClass = tech.toLowerCase().replace(/\s+/g, '-').replace('#', 'sharp');
      return `<span class="tech-pill ${techClass}">${tech}</span>`;
    }).join('');
    
    // Title & subtitle
    this.modal.querySelector('.quick-peek-title').textContent = project.title;
    this.modal.querySelector('.quick-peek-subtitle').textContent = project.subtitle;
    
    // Meta info
    const meta = this.modal.querySelector('.quick-peek-meta');
    meta.innerHTML = `
      <div class="quick-peek-meta-item">
        <i class="bi bi-calendar"></i>
        <span>${project.date}</span>
      </div>
      <div class="quick-peek-meta-item">
        <i class="bi bi-clock"></i>
        <span>${project.duration}</span>
      </div>
    `;
    
    // Description
    this.modal.querySelector('.quick-peek-description').textContent = project.description;
    
    // Metrics
    const metrics = this.modal.querySelector('.quick-peek-metrics');
    metrics.innerHTML = project.metrics.map(m => `
      <div class="metric-card">
        <span class="metric-card-value">${m.value}</span>
        <span class="metric-card-label">${m.label}</span>
      </div>
    `).join('');
    
    // Actions
    const detailsBtn = this.modal.querySelector('.quick-peek-btn.primary');
    detailsBtn.href = project.links.details;
    
    const githubBtn = this.modal.querySelector('.quick-peek-btn.github');
    githubBtn.href = project.links.github;
    if (project.links.github === '#') {
      githubBtn.style.display = 'none';
    } else {
      githubBtn.style.display = 'flex';
    }
  }
  
  showLoading() {
    const loading = this.modal.querySelector('.quick-peek-loading');
    if (loading) loading.style.display = 'flex';
  }
  
  hideLoading() {
    const loading = this.modal.querySelector('.quick-peek-loading');
    if (loading) loading.style.display = 'none';
  }
  
  updateFocusableElements() {
    const focusable = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    this.focusableElements = Array.from(focusable);
  }
  
  trapFocus(e) {
    if (this.focusableElements.length === 0) return;
    
    const firstFocusable = this.focusableElements[0];
    const lastFocusable = this.focusableElements[this.focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Wait for other scripts to load
  setTimeout(() => {
    window.quickPeekModal = new QuickPeekModal();
  }, 500);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QuickPeekModal;
}
