/**
* THE Portfolio - Main JavaScript
* Author: Tasif Hossain Emon (THE)
* Version: 2.0.2
* Based on DevFolio template by BootstrapMade.com (https://bootstrapmade.com/license/)
* Heavily customized with game-style UI, portfolio filter system,
* EmailJS contact form, skill animations, and counter effects.
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    const body = select('body');
    body.classList.toggle('mobile-nav-active');
    
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
    
    // Add subtle animation when opening menu
    const navItems = document.querySelectorAll('.game-navbar ul li');
    
    if (document.body.classList.contains('mobile-nav-active')) {
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 100 * index);
      });
    } else {
      navItems.forEach(item => {
        item.style.opacity = '';
        item.style.transform = '';
      });
    }
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 80,
      backSpeed: 25,
      backDelay: 2000,
      startDelay: 500,
      showCursor: false, // Hide default cursor as we're using our own
      smartBackspace: true
    });
  }

  /**
  /**
   * Hide preloader on load
   */
  window.addEventListener('load', () => {
    aos_init();
    const preloader = document.getElementById('preloader');
    if (preloader) {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 350);
    }
    initHeroParticles();
  });

  /**
   * Hero Particle Canvas Effect
   */
  function initHeroParticles() {
    const heroSection = document.querySelector('.hero-redesign');
    if (!heroSection) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-particle-canvas';
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `;
    heroSection.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
      width = canvas.width = heroSection.offsetWidth;
      height = canvas.height = heroSection.offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 45; i++) {
      particles.push(new Particle());
    }

    function loop() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }


  /**
   * Enhanced Portfolio functionality with smooth animations
   */
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill bars animation
    initGameSkillBars();
    
    const portfolioItems = document.querySelectorAll('.work-box');
    
    const portfolioLinks = [
      'portfolio-details_PGW.html',
      'portfolio-details_TPC.html',
      'portfolio-details_PGW_Forest.html',
      'portfolio-details_RAWWAR.html',
      'portfolio-details_Drawnscape.html',
      'portfolio-details_PCP.html'
    ];
    
    portfolioItems.forEach((item, index) => {
      const staticImg = item.querySelector('.portfolio-static');
      const gifImg = item.querySelector('.portfolio-gif');
      
      // Enhanced hover with preloading
      item.addEventListener('mouseenter', function() {
        if (gifImg && !gifImg.dataset.loaded) {
          const preloadImg = new Image();
          preloadImg.onload = function() {
            gifImg.dataset.loaded = 'true';
          };
          preloadImg.src = gifImg.src;
        }
        
        // Add hover class for additional styling
        item.classList.add('hover-active');
      });
      
      item.addEventListener('mouseleave', function() {
        item.classList.remove('hover-active');
      });
      
      // Enhanced click with smooth transition
      item.addEventListener('click', function(e) {
        const link = portfolioLinks[index];
        if (link) {
          // Add click animation
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            window.open(link, '_blank');
            item.style.transform = '';
          }, 100);
        }
      });
      
      item.style.cursor = 'pointer';
      
      // Error handling with smooth fallback
      if (gifImg) {
        gifImg.addEventListener('error', function() {
          this.style.display = 'none';
        });
      }
    });
  });

  /**
   * Enhanced scroll animations
   */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Trigger counter animation if it's a counter element
        if (entry.target.classList.contains('counter')) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-purecounter-end'));
          animateCounter(counter, target);
        }
      }
    });
  }, observerOptions);

  // Observe elements for scroll animations
  document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.skill-item, .achievement-item, .service-box, .work-box');
    elements.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  });

  /**
   * Enhanced skill bar animations
   */
  function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0%';
      
      setTimeout(() => {
        bar.style.width = width + '%';
      }, 300);
    });
  }

  // Create an observer for the skills section
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        // Only trigger animation once
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // When DOM is fully loaded, initialize the observer
  document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skills-grid');
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
  });

  /**
   * Enhanced header scroll effect
   */
  let lastScrollY = window.scrollY;
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
    
    // Hide/show header based on scroll direction
    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
  });

  /**
   * Enhanced loading animation
   */
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
    
    // Trigger entrance animations
    document.body.classList.add('loaded');
  });

  /**
   * Smooth page transitions
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animation class
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease';
      document.body.style.opacity = '1';
    }, 100);
  });

  /**
   * Portfolio details Swiper slider initialization
   */
  document.addEventListener('DOMContentLoaded', function() {
    if (typeof Swiper !== 'undefined') {
      var portfolioDetailsSlider = document.querySelector('.portfolio-details-slider');
      if (portfolioDetailsSlider) {
        new Swiper('.portfolio-details-slider', {
          speed: 400,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
          }
        });
      }
    }
  });

  // Generate particles for the background
  function generateParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create 50 particle elements
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 3 + 1;
      
      // Style the particle
      particle.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        pointer-events: none;
        animation: floatParticle ${Math.random() * 10 + 5}s infinite linear;
      `;
      
      particlesContainer.appendChild(particle);
    }
  }

  // Initialize particles when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    generateParticles();
    
    // Initialize the glitch effect occasionally
    setInterval(() => {
      const glitchElement = document.querySelector('.glitch-effect');
      if (glitchElement) {
        glitchElement.classList.add('active-glitch');
        setTimeout(() => {
          glitchElement.classList.remove('active-glitch');
        }, 200);
      }
    }, 5000);
  });

  // Parallax and Glitch effects for hero section
  function initHeroEffects() {
    const hero = document.getElementById('hero');
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (!hero || !parallaxBg) return;
    
    // Parallax effect on mouse move
    hero.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      // Subtle movement based on mouse position
      parallaxBg.style.transform = `translate3d(-${mouseX * 15}px, -${mouseY * 15}px, 0)`;
    });
    
    // Periodic glitch effect
    function triggerGlitch() {
      // Only trigger when the element is in viewport
      const rect = hero.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
      
      if (isVisible) {
        hero.classList.add('glitching');
        
        // Remove class after animation completes
        setTimeout(() => {
          hero.classList.remove('glitching');
        }, 400); // Match duration with CSS animation
      }
      
      // Schedule next glitch with random timing
      const nextGlitchDelay = Math.random() * 5000 + 3000; // Between 3-8 seconds
      setTimeout(triggerGlitch, nextGlitchDelay);
    }
    
    // Start the first glitch after page loads
    setTimeout(triggerGlitch, 2000); 
    
    // Small parallax effect on scroll
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled <= window.innerHeight) {
        parallaxBg.style.transform = `translate3d(0, ${scrolled * 0.15}px, 0)`;
      }
    });
  }

  // Initialize the effects when document is ready
  document.addEventListener('DOMContentLoaded', initHeroEffects);

  /**
   * Initialize skill bars animation in the game-style about section
   */
  function initGameSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-fill[data-level]');
    
    if (skillBars.length === 0) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const container = bar.closest('.skill-bar-container');
          const level = parseInt(bar.getAttribute('data-level'));
          
          // Start the animation with a slight delay for dramatic effect
          setTimeout(() => {
            bar.style.width = `${level}%`;
            bar.classList.add('animated');
            
            // Add completion effects for high-level skills
            if (level >= 90) {
              setTimeout(() => {
                bar.classList.add('completed');
                container.classList.add('completed');
                
                // Play achievement sound effect (if audio is enabled)
                playAchievementSound();
              }, 2800);
            } else if (level >= 80) {
              setTimeout(() => {
                container.classList.add('high-level');
              }, 2500);
            }
            
            // Add energy pulse effect after animation completes
            setTimeout(() => {
              bar.classList.add('energy-charged');
            }, 3200);
            
          }, Math.random() * 500 + 200); // Randomized delay for staggered effect
          
          observer.unobserve(bar);
        }
      });
    }, { 
      threshold: 0.3,
      rootMargin: '0px 0px -50px 0px'
    });

    skillBars.forEach(bar => {
      observer.observe(bar);
    });
  }

  /**
   * Play achievement sound effect (optional)
   */
  function playAchievementSound() {
    // Optional: Add audio feedback for completion
    // const audio = new Audio('assets/sounds/achievement.mp3');
    // audio.volume = 0.3;
    // audio.play().catch(e => { /* Audio play failed silently */ });
  }

  /**
   * Enhanced counter animations with progress bars
   */
  function initCounterAnimations() {
    const counterSection = document.querySelector('.game-counter-section');
    
    if (!counterSection) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate progress bars
          const progressBars = entry.target.querySelectorAll('.counter-progress-fill');
          progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            setTimeout(() => {
              bar.style.width = progress + '%';
            }, 1000);
          });
          
          // Add counter animation class for enhanced effects
          const counterBoxes = entry.target.querySelectorAll('.counter-box-game');
          counterBoxes.forEach((box, index) => {
            setTimeout(() => {
              box.classList.add('counter-animated');
            }, 200 * index);
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(counterSection);
  }

  /**
   * Enhanced Portfolio functionality
   */
  function initPortfolioSystem() {
    const filterButtons = document.querySelectorAll('.filter-btn, .filter-btn-redesign');
    const portfolioCards = document.querySelectorAll('.portfolio-card-game, .project-card-redesign');

    if (filterButtons.length === 0 || portfolioCards.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        const filterValue = this.getAttribute('data-filter');

        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Step 1: fade all cards out
        portfolioCards.forEach(card => {
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
        });

        // Step 2: after fade, hide/show cards and fade matching ones in
        setTimeout(function() {
          let visibleIndex = 0;

          portfolioCards.forEach(card => {
            const cats = (card.getAttribute('data-category') || '').split(' ');
            const shouldShow = filterValue === 'all' || cats.includes(filterValue);

            if (shouldShow) {
              card.style.display = '';
              card.classList.remove('filtered-out');
              card.classList.add('filtered-in');
              // Staggered fade in
              setTimeout(function() {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
              }, visibleIndex * 60);
              visibleIndex++;
            } else {
              card.style.display = 'none';
              card.classList.remove('filtered-in');
              card.classList.add('filtered-out');
            }
          });
        }, 260);
      });
    });

    // Enhanced hover effects for portfolio cards
    portfolioCards.forEach(card => {
      const staticImg = card.querySelector('.project-image-static, .static-img');
      const gifImg = card.querySelector('.project-image-gif, .gif-img');
      
      // Preload GIFs on hover
      card.addEventListener('mouseenter', function() {
        if (gifImg && !gifImg.dataset.loaded) {
          const preloadImg = new Image();
          preloadImg.onload = function() {
            gifImg.dataset.loaded = 'true';
          };
          preloadImg.src = gifImg.src;
        }
      });
    });
  }

  /**
   * Project details function
   */
  function openProjectDetails(url) {
    // Add loading animation
    const body = document.body;
    body.style.cursor = 'wait';
    
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      backdrop-filter: blur(5px);
    `;
    
    const loader = document.createElement('div');
    loader.style.cssText = `
      width: 50px;
      height: 50px;
      border: 3px solid rgba(0, 180, 255, 0.3);
      border-top: 3px solid #0078ff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    `;
    
    loadingOverlay.appendChild(loader);
    document.body.appendChild(loadingOverlay);
    
    // Simulate loading time and then open
    setTimeout(() => {
      window.open(url, '_blank');
      document.body.removeChild(loadingOverlay);
      body.style.cursor = 'default';
    }, 800);
  }

  // Add this to your existing main.js file

  /**
   * Contact Form — EmailJS Integration
   * -------------------------------------------------------
   * Fill in your EmailJS credentials below to activate.
   * 1. Sign up free at https://www.emailjs.com/
   * 2. Create a service (Gmail, Outlook, etc.) → copy Service ID
   * 3. Create an email template → copy Template ID
   * 4. Go to Account → API Keys → copy your Public Key
   * -------------------------------------------------------
   */
  function initContactForm() {
    // ── EMAILJS CREDENTIALS (fill these in) ──────────────────
    const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
    const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz456'
    const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';   // e.g. 'aBcDeFgHiJkLmNoPq'
    // ─────────────────────────────────────────────────────────

    const contactForm = document.querySelector('.game-contact-form');
    if (!contactForm) return;

    const loadingDiv = contactForm.querySelector('.loading');
    const errorDiv   = contactForm.querySelector('.error-message');
    const successDiv = contactForm.querySelector('.sent-message');
    const submitBtn  = contactForm.querySelector('.btn-transmit');

    // Check EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      console.warn('EmailJS SDK not loaded. Contact form will not send emails.');
    } else {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    function hideAllMessages() {
      loadingDiv.classList.remove('show');
      errorDiv.classList.remove('show');
      successDiv.classList.remove('show');
    }

    function createButtonParticles(button) {
      const particlesContainer = button.querySelector('.btn-particles');
      if (!particlesContainer) return;
      particlesContainer.innerHTML = '';
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          pointer-events: none;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: buttonParticle 0.8s ease-out forwards;
          animation-delay: ${i * 0.1}s;
        `;
        particlesContainer.appendChild(particle);
      }
      setTimeout(() => { particlesContainer.innerHTML = ''; }, 1000);
    }

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      hideAllMessages();
      loadingDiv.classList.add('show');
      submitBtn.disabled = true;
      createButtonParticles(submitBtn);

      // Collect form data
      const templateParams = {
        from_name:    contactForm.querySelector('#name').value.trim(),
        from_email:   contactForm.querySelector('#email').value.trim(),
        subject:      contactForm.querySelector('#subject').value.trim(),
        message:      contactForm.querySelector('#message').value.trim(),
        reply_to:     contactForm.querySelector('#email').value.trim()
      };

      if (typeof emailjs === 'undefined' ||
          EMAILJS_SERVICE_ID  === 'YOUR_SERVICE_ID' ||
          EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' ||
          EMAILJS_PUBLIC_KEY  === 'YOUR_PUBLIC_KEY') {
        // EmailJS not configured — show helpful warning
        loadingDiv.classList.remove('show');
        errorDiv.querySelector('span').textContent =
          'Contact form not yet configured. Please email directly: tasif.grandfleet@gmail.com';
        errorDiv.classList.add('show');
        submitBtn.disabled = false;
        setTimeout(() => errorDiv.classList.remove('show'), 7000);
        return;
      }

      emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
        .then(function() {
          loadingDiv.classList.remove('show');
          successDiv.classList.add('show');
          contactForm.reset();
          setTimeout(() => successDiv.classList.remove('show'), 6000);
          submitBtn.disabled = false;
        })
        .catch(function(err) {
          console.error('EmailJS send failed:', err);
          loadingDiv.classList.remove('show');
          errorDiv.querySelector('span').textContent =
            'Message failed to send. Please try emailing directly: tasif.grandfleet@gmail.com';
          errorDiv.classList.add('show');
          setTimeout(() => errorDiv.classList.remove('show'), 7000);
          submitBtn.disabled = false;
        });
    });
  }

  /**
   * Enhanced form input animations
   */
  function initFormAnimations() {
    const formInputs = document.querySelectorAll('.form-control-game');
    
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('input-focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('input-focused');
        
        if (this.value.trim()) {
          this.parentElement.classList.add('input-filled');
        } else {
          this.parentElement.classList.remove('input-filled');
        }
      });
      
      // Check initial state
      if (input.value.trim()) {
        input.parentElement.classList.add('input-filled');
      }
    });
  }

  /**
   * Schedule meeting modal (placeholder function)
   */
  function openScheduleModal() {
    // Create simple modal for demo
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      backdrop-filter: blur(5px);
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
      background: linear-gradient(145deg, rgba(25, 35, 55, 0.95), rgba(15, 25, 45, 0.95));
      border: 1px solid rgba(0, 180, 255, 0.25);
      border-radius: 20px;
      padding: 2rem;
      max-width: 400px;
      width: 90%;
      text-align: center;
      color: white;
      box-shadow: 0 20px 40px rgba(0, 120, 255, 0.2);
    `;
    
    modalContent.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <i class="bi bi-calendar-check" style="font-size: 3rem; color: #00c6ff;"></i>
      </div>
      <h3 style="color: #00c6ff; margin-bottom: 1rem; font-family: 'Rajdhani', sans-serif; font-weight: 700;">SCHEDULE MEETING</h3>
      <p style="margin-bottom: 1.5rem; color: rgba(255,255,255,0.8); line-height: 1.6;">
        This feature is coming soon! For now, please use email or phone to schedule a meeting directly.
      </p>
      <div style="display: flex; gap: 1rem; justify-content: center;">
        <a href="mailto:tasif.grandfleet@gmail.com" style="
          background: linear-gradient(135deg, #0078ff, #00c6ff);
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        ">
          <i class="bi bi-envelope"></i>
          EMAIL
        </a>
        <button onclick="this.closest('.modal').remove()" style="
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        ">CLOSE</button>
      </div>
    `;
    
    modal.className = 'modal';
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function escapeHandler(e) {
      if (e.key === 'Escape') {
        modal.remove();
        document.removeEventListener('keydown', escapeHandler);
      }
    });
  }

  // Make openScheduleModal globally accessible
  window.openScheduleModal = openScheduleModal;

  /**
   * Initialize Portfolio System on DOM ready
   */
  window.addEventListener('load', function() {
    setTimeout(initPortfolioSystem, 100);
    initContactForm();
    initFormAnimations();
    initCounterAnimations();
  });

})();