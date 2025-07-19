/**
 * Muhammad Adel Gabr Portfolio - Main JavaScript
 * Modern interactive portfolio with AI-themed animations
 */

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initializeComponents();
    this.handleLoading();
  }

  setupEventListeners() {
    // DOM Content Loaded
    document.addEventListener('DOMContentLoaded', () => {
      this.onDOMContentLoaded();
    });

    // Window Load
    window.addEventListener('load', () => {
      this.onWindowLoad();
    });

    // Scroll Events
    window.addEventListener('scroll', this.throttle(() => {
      this.handleScroll();
    }, 16)); // 60fps

    // Resize Events
    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));

    // Navigation
    this.setupNavigation();

    // Forms
    this.setupForms();

    // Keyboard Navigation
    this.setupKeyboardNavigation();
  }

  onDOMContentLoaded() {
    // Initialize intersection observer for animations
    this.setupIntersectionObserver();
    
    // Initialize skill bars
    this.initializeSkillBars();
    
    // Initialize typing effect
    this.initializeTypingEffect();
    
    // Setup smooth scrolling
    this.setupSmoothScrolling();

    // Initialize particles
    this.initializeParticles();
  }

  onWindowLoad() {
    // Hide loader
    this.hideLoader();
    
    // Start animations
    this.startInitialAnimations();
  }

  handleLoading() {
    const loader = document.getElementById('loader');
    
    // Simulate AI initialization
    const initSteps = [
      'Loading neural networks...',
      'Initializing AI models...',
      'Preparing portfolio data...',
      'Optimizing user experience...',
      'Ready to explore!'
    ];

    let currentStep = 0;
    const loaderText = loader.querySelector('p');
    
    const stepInterval = setInterval(() => {
      if (currentStep < initSteps.length) {
        loaderText.textContent = initSteps[currentStep];
        currentStep++;
      } else {
        clearInterval(stepInterval);
      }
    }, 500);
  }

  hideLoader() {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      loader.classList.add('hidden');
      setTimeout(() => {
        loader.remove();
      }, 500);
    }, 2500);
  }

  // Navigation
  setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle?.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  handleScroll() {
    const navbar = document.getElementById('navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.classList.toggle('scrolled', scrolled);
    
    // Update active navigation link
    this.updateActiveNavLink();
    
    // Parallax effects
    this.handleParallax();
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  handleParallax() {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.neural-network-bg, .floating-particles');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }

  // Smooth Scrolling
  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 70; // Account for navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Intersection Observer for Animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for skill bars
          if (entry.target.classList.contains('skill-category-card')) {
            this.animateSkillBars(entry.target);
          }
          
          // Special handling for stats
          if (entry.target.classList.contains('hero-stats')) {
            this.animateStats();
          }
        }
      });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = document.querySelectorAll(
      '.skill-category-card, .timeline-item, .project-card, .education-item, .cert-item, .hero-stats'
    );
    
    elementsToObserve.forEach(el => observer.observe(el));
  }

  // Skill Bars Animation
  initializeSkillBars() {
    // Add CSS for initial state
    const style = document.createElement('style');
    style.textContent = `
      .skill-category-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }
      
      .skill-category-card.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .timeline-item {
        opacity: 0;
        transform: translateX(-30px);
        transition: all 0.6s ease;
      }
      
      .timeline-item.animate-in {
        opacity: 1;
        transform: translateX(0);
      }
      
      .project-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }
      
      .project-card.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
      
      .education-item, .cert-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
      }
      
      .education-item.animate-in, .cert-item.animate-in {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const skillLevel = bar.dataset.skill;
        bar.style.width = `${skillLevel}%`;
      }, index * 200);
    });
  }

  // Stats Animation
  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const finalValue = stat.textContent;
      const isPercentage = finalValue.includes('%');
      const numericValue = parseInt(finalValue.replace(/\D/g, ''));
      
      let current = 0;
      const increment = numericValue / 50; // 50 steps
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          current = numericValue;
          clearInterval(timer);
        }
        
        stat.textContent = isPercentage ? `${Math.floor(current)}%` : 
                          finalValue.includes('+') ? `${Math.floor(current)}+` : Math.floor(current);
      }, 50);
    });
  }

  // Typing Effect for Hero Section
  initializeTypingEffect() {
    const roles = document.querySelectorAll('.role');
    if (roles.length === 0) return;

    let currentRole = 0;
    
    const showRole = (index) => {
      roles.forEach(role => role.classList.remove('active'));
      roles[index].classList.add('active');
    };

    const rotateRoles = () => {
      showRole(currentRole);
      currentRole = (currentRole + 1) % roles.length;
    };

    // Initial show
    showRole(0);
    
    // Rotate every 3 seconds
    setInterval(rotateRoles, 3000);
  }

  // Particles Animation
  initializeParticles() {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.5 + 0.3};
        left: ${Math.random() * 100}%;
        animation: float-up ${Math.random() * 10 + 10}s linear infinite;
      `;
      
      return particle;
    };

    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;

    // Create particles periodically
    setInterval(() => {
      if (particlesContainer.children.length < 20) {
        const particle = createParticle();
        particlesContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
          particle.remove();
        }, 20000);
      }
    }, 2000);

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float-up {
        0% {
          transform: translateY(100vh) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Forms
  setupForms() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', this.handleFormSubmit.bind(this));
      
      // Enhanced form validation
      const inputs = contactForm.querySelectorAll('input, textarea');
      inputs.forEach(input => {
        input.addEventListener('blur', () => this.validateField(input));
        input.addEventListener('input', () => this.clearFieldError(input));
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!this.validateForm(form)) {
      return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  }

  validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required check
    if (field.hasAttribute('required') && !value) {
      isValid = false;
      errorMessage = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Show/hide error
    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearFieldError(field);
    }
    
    return isValid;
  }

  showFieldError(field, message) {
    this.clearFieldError(field);
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.cssText = `
      color: var(--accent-color);
      font-size: var(--font-size-sm);
      margin-top: 4px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
    `;
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
    field.style.borderColor = 'var(--accent-color)';
    
    // Animate in
    setTimeout(() => {
      errorElement.style.opacity = '1';
      errorElement.style.transform = 'translateY(0)';
    }, 10);
  }

  clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
    field.style.borderColor = '';
  }

  // Notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'var(--success-color)' : 
                   type === 'error' ? 'var(--accent-color)' : 'var(--primary-color)'};
      color: white;
      padding: var(--spacing-md) var(--spacing-lg);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      z-index: var(--z-tooltip);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      word-wrap: break-word;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Auto remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  // Keyboard Navigation
  setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // Escape key to close mobile menu
      if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
      
      // Arrow keys for project navigation
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        this.handleProjectNavigation(e.key);
      }
    });
  }

  handleProjectNavigation(direction) {
    const projects = document.querySelectorAll('.project-card');
    const currentFocused = document.querySelector('.project-card:focus');
    
    if (!currentFocused) return;
    
    const currentIndex = Array.from(projects).indexOf(currentFocused);
    let nextIndex;
    
    if (direction === 'ArrowRight') {
      nextIndex = (currentIndex + 1) % projects.length;
    } else {
      nextIndex = currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    }
    
    projects[nextIndex].focus();
  }

  // Resize Handler
  handleResize() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
      const navToggle = document.getElementById('nav-toggle');
      const navMenu = document.getElementById('nav-menu');
      
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    // Recalculate animations
    this.handleScroll();
  }

  // Initial Animations
  startInitialAnimations() {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
      
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, index * 200);
    });
    
    // Animate hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
      heroImage.style.opacity = '0';
      heroImage.style.transform = 'scale(0.8)';
      heroImage.style.transition = 'all 0.8s ease';
      
      setTimeout(() => {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'scale(1)';
      }, 800);
    }
  }

  // Utility Functions
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}

// Theme Toggle (Optional Enhancement)
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.applyTheme();
    this.createThemeToggle();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    localStorage.setItem('theme', this.currentTheme);
  }

  createThemeToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'theme-toggle';
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
    toggle.style.cssText = `
      position: fixed;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: var(--bg-card);
      border: 2px solid var(--primary-color);
      color: var(--primary-color);
      cursor: pointer;
      z-index: var(--z-fixed);
      transition: all 0.3s ease;
      display: none; // Hidden by default since we're using dark theme
    `;
    
    toggle.addEventListener('click', () => this.toggleTheme());
    document.body.appendChild(toggle);
  }
}

// Performance Monitor (Development Helper)
class PerformanceMonitor {
  constructor() {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      this.init();
    }
  }

  init() {
    this.logPerformanceMetrics();
    this.monitorLargestContentfulPaint();
    this.monitorCumulativeLayoutShift();
  }

  logPerformanceMetrics() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('🚀 Performance Metrics:', {
          'DOM Content Loaded': `${perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart}ms`,
          'Load Complete': `${perfData.loadEventEnd - perfData.loadEventStart}ms`,
          'First Paint': this.getFirstPaint(),
          'Largest Contentful Paint': this.getLargestContentfulPaint()
        });
      }, 1000);
    });
  }

  getFirstPaint() {
    const fpEntry = performance.getEntriesByType('paint')
      .find(entry => entry.name === 'first-paint');
    return fpEntry ? `${Math.round(fpEntry.startTime)}ms` : 'Not available';
  }

  getLargestContentfulPaint() {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(`${Math.round(lastEntry.startTime)}ms`);
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    });
  }

  monitorLargestContentfulPaint() {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.startTime > 2500) {
          console.warn('⚠️ LCP is longer than 2.5s:', entry.startTime);
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }

  monitorCumulativeLayoutShift() {
    let clsValue = 0;
    
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      if (clsValue > 0.1) {
        console.warn('⚠️ CLS is higher than 0.1:', clsValue);
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  new ThemeManager();
  new PerformanceMonitor();
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PortfolioApp, ThemeManager, PerformanceMonitor };
} 