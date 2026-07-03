document.addEventListener('DOMContentLoaded', () => {
  // ============================================
  // FOOTER YEAR
  // ============================================
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ============================================
  // MOBILE NAV TOGGLE
  // ============================================
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const setActiveLink = () => {
    let currentId = sections[0]?.id;
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  };

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // ============================================
  // ROLE TYPING EFFECT
  // ============================================
  const roles = ['Software Developer', 'Problem Solver', 'Lifelong Learner'];
  const roleTextEl = document.getElementById('role-text');

  if (roleTextEl) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeRole() {
      const current = roles[roleIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      roleTextEl.textContent = current.slice(0, charIndex);

      let delay = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === current.length) {
        delay = 1600;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 300;
      }

      setTimeout(typeRole, delay);
    }

    typeRole();
  }

  // ============================================
  // CV BUTTON (placeholder until a real file is added)
  // ============================================
  const cvBtn = document.getElementById('cv-btn');
  if (cvBtn) {
    cvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Your CV will be linked here once you upload one.');
    });
  }

  // ============================================
  // "UNDER CONSTRUCTION" BUILD LOG + PROGRESS BAR
  // Runs once when the portfolio section first scrolls into view.
  // ============================================
  const buildLogLines = [
    '$ scanning project folder...',
    '$ found 0 projects ready to publish',
    '$ queue: add project, push to portfolio',
    '$ status: waiting on next deploy',
  ];

  const buildLogEl = document.getElementById('build-log');
  const buildBarFill = document.getElementById('build-bar-fill');
  const buildPct = document.getElementById('build-pct');

  let buildAnimated = false;

  function runBuildAnimation() {
    if (buildAnimated) return;
    buildAnimated = true;

    const targetPct = 15;
    if (buildBarFill) {
      buildBarFill.style.width = `${targetPct}%`;
    }
    if (buildPct) {
      buildPct.textContent = `${targetPct}%`;
    }

    if (buildLogEl) {
      buildLogEl.innerHTML = '';
      buildLogLines.forEach((line, i) => {
        const p = document.createElement('p');
        p.className = 'build-log-line';
        p.textContent = line;
        p.style.animationDelay = `${i * 0.5 + 0.3}s`;
        buildLogEl.appendChild(p);
      });
    }
  }

  const portfolioSection = document.getElementById('portfolio');

  if (portfolioSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runBuildAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(portfolioSection);
  } else {
    runBuildAnimation();
  }

  // ============================================
  // ABOUT SECTION – SCROLL-TRIGGERED ANIMATIONS
  // ============================================
  const aboutAnimEls = document.querySelectorAll(
    '.about-photo-col, .about-header, .about-body p, .about-socials'
  );

  if (aboutAnimEls.length && 'IntersectionObserver' in window) {
    const aboutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = [...aboutAnimEls].indexOf(entry.target);
            entry.target.style.animationDelay = `${idx * 0.15}s`;
            entry.target.classList.add('visible');
            aboutObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    aboutAnimEls.forEach((el) => aboutObserver.observe(el));
  } else {
    aboutAnimEls.forEach((el) => el.classList.add('visible'));
  }
});