/* ============================================
   VOIDRISE - Gaming Studio Website
   JavaScript - Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Background particles removed
  // ==========================================
  let particles = [];


  // ==========================================
  // 2. Navbar Scroll Effect
  // ==========================================
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;

  function handleNavScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });


  // ==========================================
  // 3. Mobile Navigation Toggle
  // ==========================================
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (navOverlay) navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close on overlay click
    if (navOverlay) {
      navOverlay.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    // Close on link click (mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }


  // ==========================================
  // 4. Active Nav Link on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });


  // ==========================================
  // 5. Scroll Reveal Animation
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ==========================================
  // 6. Animated Number Counters
  // ==========================================
  const counters = document.querySelectorAll('[data-count]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easedProgress * target);

      el.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));


  // ==========================================
  // 7. Smooth Scroll for Anchor Links
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPos = targetEl.offsetTop - navHeight - 16;

        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });


  // ==========================================
  // 8. Hero Scroll Down Button
  // ==========================================
  const scrollBtn = document.querySelector('.hero-scroll');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const gamesSection = document.getElementById('games');
      if (gamesSection) {
        const navHeight = navbar ? navbar.offsetHeight : 0;
        window.scrollTo({
          top: gamesSection.offsetTop - navHeight - 16,
          behavior: 'smooth'
        });
      }
    });
  }


  // ==========================================
  // 9. Game Card Tilt Effect (Desktop)
  // ==========================================
  if (window.matchMedia('(min-width: 769px)').matches) {
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }


  // ==========================================
  // 10. Copyright Year
  // ==========================================
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }


  // ==========================================
  // 11. Dark / Light Mode Toggle
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;

  // Check saved preference or default to dark
  const savedTheme = localStorage.getItem('voidrise-theme') || 'dark';
  if (savedTheme === 'light') {
    root.setAttribute('data-theme', 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      localStorage.setItem('voidrise-theme', next);

      // Update particle colors for theme
      if (particles && particles.length > 0) {
        const lightColors = [
          '107, 33, 214',   // purple
          '232, 89, 12',    // orange
          '140, 140, 160',  // gray
          '155, 95, 255',   // light purple
        ];
        const darkColors = [
          '123, 47, 255',   // purple
          '0, 255, 209',    // cyan
          '238, 238, 245',  // white
          '155, 95, 255',   // light purple
        ];
        const colors = next === 'light' ? lightColors : darkColors;
        particles.forEach(p => {
          p.color = colors[Math.floor(Math.random() * colors.length)];
          if (next === 'light') {
            p.baseOpacity = Math.random() * 0.25 + 0.05;
          } else {
            p.baseOpacity = Math.random() * 0.5 + 0.1;
          }
        });
      }
    });
  }

});
