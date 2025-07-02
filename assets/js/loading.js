/**
 * Game-Style Loading Screen Controller
 * Manages the loading sequence with progress tracking and smooth transitions
 */

class GameLoadingScreen {
  constructor() {
    this.loadingScreen = null;
    this.progressBar = null;
    this.progressText = null;
    this.statusText = null;
    this.currentProgress = 0;
    this.targetProgress = 0;
    this.loadingSteps = [
      { text: "Initializing game engine...", duration: 600 },
      { text: "Loading assets...", duration: 800 },
      { text: "Compiling shaders...", duration: 400 },
      { text: "Building world...", duration: 600 },
      { text: "Optimizing performance...", duration: 400 },
      { text: "Finalizing setup...", duration: 300 }
    ];
    this.currentStep = 0;
    this.isComplete = false;
  }

  init() {
    // Show loading screen immediately if DOM is ready, otherwise wait
    if (document.body) {
      this.createLoadingScreen();
    } else {
      // Wait for DOM to be available
      document.addEventListener('DOMContentLoaded', () => {
        this.createLoadingScreen();
      });
    }
  }

  createLoadingScreen() {
    // Make sure we don't create duplicate loading screens
    if (document.getElementById('loading-screen')) {
      console.log('Loading screen already exists');
      return;
    }

    // Create loading screen HTML
    const loadingHTML = `
      <div id="loading-screen">
        <!-- HUD Corners -->
        <div class="loading-hud-corner top-left"></div>
        <div class="loading-hud-corner top-right"></div>
        <div class="loading-hud-corner bottom-left"></div>
        <div class="loading-hud-corner bottom-right"></div>
        
        <div class="loading-container">
          <!-- Logo -->
          <div class="loading-logo">
            <div class="loading-logo-emblem">
              <div class="loading-logo-text">THE</div>
            </div>
          </div>
          
          <!-- Title -->
          <h1 class="loading-title">Game Designer Portfolio</h1>
          <p class="loading-subtitle">Initializing experience...</p>
          
          <!-- Progress Bar -->
          <div class="loading-progress-container">
            <div class="loading-progress-label">
              <span>Loading</span>
              <span class="loading-progress-text">0%</span>
            </div>
            <div class="loading-progress-bar">
              <div class="loading-progress-fill"></div>
            </div>
          </div>
          
          <!-- Loading Dots -->
          <div class="loading-dots">
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
            <div class="loading-dot"></div>
          </div>
          
          <!-- Status Text -->
          <div class="loading-status">Initializing...</div>
        </div>
      </div>
    `;

    try {
      // Insert at the beginning of body
      document.body.insertAdjacentHTML('afterbegin', loadingHTML);
      console.log('Loading screen HTML inserted');

      // Get references to elements
      this.loadingScreen = document.getElementById('loading-screen');
      this.progressBar = document.querySelector('.loading-progress-fill');
      this.progressText = document.querySelector('.loading-progress-text');
      this.statusText = document.querySelector('.loading-status');

      if (this.loadingScreen) {
        console.log('Loading screen elements found, starting sequence');
        // Start loading sequence
        this.startLoadingSequence();
      } else {
        console.error('Failed to create loading screen elements');
      }
    } catch (error) {
      console.error('Error creating loading screen:', error);
    }
  }

  startLoadingSequence() {
    // Start progress animation
    this.animateProgress();
    
    // Start loading steps
    this.executeLoadingSteps();
    
    // Also track actual page loading
    this.trackPageLoading();
  }

  animateProgress() {
    const animate = () => {
      if (this.currentProgress < this.targetProgress) {
        this.currentProgress += 1; // Faster increment
        this.updateProgressDisplay();
      }
      
      if (!this.isComplete && this.currentProgress < 100) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  }

  updateProgressDisplay() {
    if (this.progressBar && this.progressText) {
      const progress = Math.min(this.currentProgress, 100);
      this.progressBar.style.width = `${progress}%`;
      this.progressText.textContent = `${Math.floor(progress)}%`;
    }
  }

  executeLoadingSteps() {
    const executeStep = (stepIndex) => {
      if (stepIndex >= this.loadingSteps.length) {
        // All steps completed, but don't complete loading yet
        console.log('All loading steps completed');
        return;
      }

      const step = this.loadingSteps[stepIndex];
      
      // Update status text
      if (this.statusText) {
        this.statusText.textContent = step.text;
      }
      
      // Calculate target progress for this step
      this.targetProgress = ((stepIndex + 1) / this.loadingSteps.length) * 90; // Only go to 90%
      
      console.log(`Step ${stepIndex + 1}: ${step.text} - Target: ${this.targetProgress}%`);
      
      // Move to next step after duration
      setTimeout(() => {
        executeStep(stepIndex + 1);
      }, step.duration);
    };

    executeStep(0);
  }

  trackPageLoading() {
    // Simplified page loading tracking
    let pageLoaded = false;
    let imagesLoaded = false;
    
    const checkCompletion = () => {
      if (pageLoaded && imagesLoaded && !this.isComplete) {
        console.log('Page and images loaded, completing...');
        setTimeout(() => this.completeLoading(), 500);
      }
    };

    // Track when window is fully loaded
    if (document.readyState === 'complete') {
      pageLoaded = true;
      checkCompletion();
    } else {
      window.addEventListener('load', () => {
        pageLoaded = true;
        console.log('Window loaded');
        checkCompletion();
      });
    }

    // Simplified image loading
    setTimeout(() => {
      imagesLoaded = true;
      console.log('Images loading timeout');
      checkCompletion();
    }, 1000); // Give images 1 second to load
  }

  completeLoading() {
    if (this.isComplete) return;
    
    console.log('Completing loading...');
    this.isComplete = true;
    this.targetProgress = 100;
    
    // Update final status
    if (this.statusText) {
      this.statusText.textContent = "Ready to launch!";
    }
    
    // Force progress to 100% and hide after delay
    setTimeout(() => {
      this.currentProgress = 100;
      this.updateProgressDisplay();
      
      setTimeout(() => {
        this.hideLoadingScreen();
      }, 500);
    }, 300);
  }

  hideLoadingScreen() {
    console.log('Hiding loading screen...');
    if (this.loadingScreen) {
      // Add hidden class for smooth transition
      this.loadingScreen.classList.add('hidden');
      
      // Remove from DOM after transition
      setTimeout(() => {
        if (this.loadingScreen && this.loadingScreen.parentNode) {
          this.loadingScreen.parentNode.removeChild(this.loadingScreen);
          console.log('Loading screen removed');
        }
        
        // Trigger custom event for when loading is complete
        document.dispatchEvent(new CustomEvent('loadingComplete'));
        
        // Initialize AOS animations after loading
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }, 800);
    }
  }

  // Public method to manually hide loading screen (if needed)
  hide() {
    this.completeLoading();
  }
}

// Initialize loading screen
const gameLoader = new GameLoadingScreen();

// Store start time
gameLoader.startTime = Date.now();

// Initialize when script loads
gameLoader.init();

// Expose globally for manual control if needed
window.gameLoader = gameLoader;

// Ensure loading completes after minimum time (fallback)
setTimeout(() => {
  if (!gameLoader.isComplete) {
    console.log('Minimum loading time reached - completing');
    gameLoader.completeLoading();
  }
}, 3000); // 3 seconds minimum

// Force completion after maximum time (emergency fallback)
setTimeout(() => {
  if (!gameLoader.isComplete) {
    console.log('Loading screen timeout - forcing completion');
    gameLoader.completeLoading();
  }
}, 6000); // 6 seconds maximum

// Add some debugging
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Loading screen should be visible');
});

window.addEventListener('load', () => {
  console.log('Window loaded - triggering completion');
});