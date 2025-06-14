/**
* Template Name: DevFolio
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/devfolio-bootstrap-portfolio-html-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
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
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
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
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aos_init);

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /**
   * Enhanced Portfolio functionality with smooth animations
   */
  document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.work-box');
    
    const portfolioLinks = [
      'portfolio-details_PGW.html',
      'portfolio-details_TPC.html', 
      'portfolio-details_PGW_Forest.html',
      'portfolio-details_RAWWAR.html',
      'portfolio-details_Drawnscape.html',
      'portfolio-details_TPC.html'
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
          console.log(`GIF not found for portfolio item ${index + 1}: ${this.src}`);
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
    
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = width;
        }, 100);
      }, index * 200);
    });
  }

  // Trigger skill bar animation when skills section is visible
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.addEventListener('DOMContentLoaded', () => {
    const skillsSection = document.querySelector('.skill-mf');
    if (skillsSection) {
      skillsObserver.observe(skillsSection);
    }
  });

  /**
   * Enhanced form handling
   */
  const contactForm = document.querySelector('.php-email-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        const successMsg = this.querySelector('.sent-message');
        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        }
      }, 2000);
    });
  }

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

})();