/* ================================================================
   app.js — SPA Router & Bootstrap
   Loads menus from API, renders navbar, handles path routing
   ================================================================ */

const App = (() => {

  /* ── State ────────────────────────────────────────────────── */
  let menus = [];
  let revealObserver = null;

  /* ── Init ─────────────────────────────────────────────────── */
  async function init() {
    renderBrand();

    // Load menus from API (fallback to defaults)
    try {
      menus = await TazkiyahAPI.fetchMenus();
    } catch (e) {
      console.warn('Menu API unavailable, using defaults.', e);
      menus = defaultMenus();
    }
    if (!menus.length) menus = defaultMenus();

    renderNav();
    renderFooterLinks();
    setupRouter();
    setupScrollHandler();
    await route();

    // Hide loading screen
    setTimeout(() => {
      document.getElementById('loading-screen').classList.add('hidden');
    }, 900);
  }

  /* ── Render brand identity & dynamic logo ──────────────────── */
  function renderBrand() {
    if (typeof SiteConfig === 'undefined') return;

    // Set page title dynamically
    document.title = `${SiteConfig.siteName} | Nigeria's First All-Female University`;

    // Handle logos in navbar and footer
    const logoUrl = SiteConfig.logoUrl;
    const logoContainers = document.querySelectorAll('.nav-logo');
    logoContainers.forEach(container => {
      if (logoUrl) {
        container.innerHTML = `
          <img src="${logoUrl}" alt="${SiteConfig.siteName}" class="logo-img" style="height: 52px; object-fit: contain; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.15)); margin-right: 8px;">
          <div class="nav-logo-text">
            <span class="nav-logo-name">${SiteConfig.siteName}</span>
            <span class="nav-logo-tag">${SiteConfig.siteTagline}</span>
          </div>`;
      } else {
        container.innerHTML = `
          <div class="nav-logo-icon" aria-hidden="true">${SiteConfig.siteName.charAt(0)}</div>
          <div class="nav-logo-text">
            <span class="nav-logo-name">${SiteConfig.siteName}</span>
            <span class="nav-logo-tag">${SiteConfig.siteTagline}</span>
          </div>`;
      }
    });

    // Update contact details in footer
    const addr = document.querySelector('.contact-address');
    if (addr) addr.textContent = SiteConfig.address;

    const phone = document.querySelector('.contact-phone');
    if (phone) phone.textContent = SiteConfig.phone;

    const email = document.querySelector('.contact-email');
    if (email) email.textContent = SiteConfig.email;

    const adminEmail = document.querySelector('.contact-admissions');
    if (adminEmail) adminEmail.textContent = SiteConfig.admissionsEmail;
  }

  /* ── Default menus (fallback) ─────────────────────────────── */
  function defaultMenus() {
    return [
      { title: 'About Us', slug: 'about' },
      { title: 'Academics', slug: 'academics' },
      { title: 'Admissions', slug: 'admissions' },
      { title: 'News & Events', slug: 'news' },
      { title: 'Contact Us', slug: 'contact' }
    ];
  }

  /* ── Render nav ───────────────────────────────────────────── */
  function renderNav() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.innerHTML = menus.map(m => {
      if (m.slug === 'home') return '';
      if (m.slug === 'programs') return ''; // Skip programs if database menu returned

      if (m.slug === 'about') {
        return `
          <li class="nav-item dropdown">
            <a href="/about" class="nav-link" data-slug="about">About Us <span class="arrow">▾</span></a>
            <ul class="dropdown-menu">
              <li><a href="/about" class="dropdown-item">Mission &amp; Vision</a></li>
              <li><a href="/central-administration" class="dropdown-item">Central Administration</a></li>
            </ul>
          </li>`;
      }
      if (m.slug === 'academics') {
        return `
          <li class="nav-item dropdown">
            <a href="/faculties" class="nav-link" data-slug="academics">Academics <span class="arrow">▾</span></a>
            <ul class="dropdown-menu">
              <li class="dropdown-submenu">
                <a href="/faculties" class="dropdown-item">Faculties <span class="arrow-right">▸</span></a>
                <ul class="dropdown-menu submenu">
                  <li><a href="/faculty-allied-health" class="dropdown-item">Allied Health Sciences</a></li>
                  <li><a href="/faculty-science-computing" class="dropdown-item">Science &amp; Computing</a></li>
                  <li><a href="/faculty-management-social" class="dropdown-item">Management &amp; Social Sciences</a></li>
                </ul>
              </li>
              <li><a href="/academic-calendar" class="dropdown-item">Academic Calendar</a></li>
            </ul>
          </li>`;
      }
      const href = (m.slug === 'home' || !m.slug) ? '/' : `/${m.slug}`;
      return `
        <li class="nav-item">
          <a href="${href}" class="nav-link" data-slug="${m.slug}">${m.title}</a>
        </li>`;
    }).join('');
    setActiveLink();
  }

  /* ── Render footer nav links ──────────────────────────────── */
  function renderFooterLinks() {
    const footerLinks = document.getElementById('footer-links');
    if (!footerLinks) return;
    footerLinks.innerHTML = menus.map(m => {
      let href = (m.slug === 'home' || !m.slug) ? '/' : `/${m.slug}`;
      if (m.slug === 'academics') href = '/faculties';
      return `<li><a href="${href}" class="footer-link">${m.title}</a></li>`;
    }).join('');
  }

  /* ── Active nav link ──────────────────────────────────────── */
  function setActiveLink() {
    const path = window.location.pathname;
    const slug = (path === '/' || path === '') ? 'home' : path.substring(1).replace(/^\/+/, '');
    document.querySelectorAll('.nav-link').forEach(link => {
      const ls = link.dataset.slug;
      const isActive = (slug === '' || slug === 'home')
        ? (ls === 'home' || ls === '')
        : ls === slug;
      link.classList.toggle('active', isActive);
    });
  }

  /* ── Scroll handler: transparent ↔ scrolled navbar ───────── */
  function setupScrollHandler() {
    const navbar = document.getElementById('navbar');
    function onScroll() {
      const path = window.location.pathname;
      const slug = (path === '/' || path === '') ? 'home' : path.substring(1).replace(/^\/+/, '');
      const isHome = (slug === '' || slug === 'home');
      if (isHome && window.scrollY < 80) {
        navbar.classList.add('transparent');
        navbar.classList.remove('scrolled');
      } else {
        navbar.classList.remove('transparent');
        navbar.classList.add('scrolled');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Router setup ─────────────────────────────────────────── */
  function setupRouter() {
    window.addEventListener('popstate', route);

    // Global click listener for SPA navigation with clean URLs
    document.addEventListener('click', e => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // Only intercept internal relative path links starting with /
      if (href && href.startsWith('/') && !href.startsWith('//') && !anchor.hasAttribute('target')) {
        e.preventDefault();

        // Close mobile menu if open
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (hamburger) hamburger.classList.remove('open');
        if (navMenu) navMenu.classList.remove('open');

        if (window.location.pathname !== href) {
          history.pushState(null, '', href);
          route();
        }
      }
    });

    // Hamburger toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
      });
    }
  }

  /* ── Route ────────────────────────────────────────────────── */
  async function route() {
    const path = window.location.pathname;
    const slug = (path === '/' || path === '') ? 'home' : path.substring(1).replace(/^\/+/, '');
    const isHome = (slug === '' || slug === 'home');
    const app = document.getElementById('app');
    const navbar = document.getElementById('navbar');

    setActiveLink();
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Disconnect old reveal observer if any
    if (revealObserver) revealObserver.disconnect();

    if (isHome) {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
      await HomePage.render(app);
    } else {
      navbar.classList.remove('transparent');
      navbar.classList.add('scrolled');
      await DynamicPage.render(app, slug);
    }

    // Setup scroll-reveal observer after render
    setupReveal();
  }

  /* ── Scroll-reveal ────────────────────────────────────────── */
  function setupReveal() {
    revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  }

  return { init };

})();

/* ── Bootstrap ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => App.init());
