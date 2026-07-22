/* ================================================================
   home.js — Home Page Renderer
   Handles: carousel, stats, about, programs, features,
            testimonials, CTA
   ================================================================ */

const HomePage = (() => {

  /* ── State ────────────────────────────────────────────────── */
  let slides = [];
  let currentSlide = 0;
  let autoPlayTimer = null;
  let goToFn = null;

  /* ── Public render ────────────────────────────────────────── */
  async function render(container) {
    container.innerHTML = buildSkeleton();

    try {
      slides = await TazkiyahAPI.fetchCarousel();
    } catch (e) {
      console.warn('Carousel API unavailable, using defaults.', e);
      slides = defaultSlides();
    }

    if (!slides.length) slides = defaultSlides();

    container.innerHTML =
      buildCarousel(slides) +
      buildStats() +
      buildAbout() +
      buildNews() +
      buildPrograms() +
      buildFeatures() +
      buildTestimonials() +
      buildCTA();

    initCarousel();
    initCounters();
  }

  /* ── Skeleton loader ──────────────────────────────────────── */
  function buildSkeleton() {
    return `
      <div style="height:100vh;background:var(--primary);display:flex;align-items:center;justify-content:center;">
        <div class="loading-spinner" style="width:48px;height:48px;"></div>
      </div>`;
  }

  /* ── Default slides (fallback) ────────────────────────────── */
  function defaultSlides() {
    return [
      {
        title: "Nigeria's First\nAll-Female University",
        subtitle: 'Welcome to Tazkiyah University',
        description: 'A pioneering institution in Zaria, Kaduna State, combining academic excellence with moral and spiritual character development for female students.',
        buttonText: 'Explore Faculties',
        buttonLink: '/faculties',
        imageUrl: ''
      },
      {
        title: 'World-Class\nDegree Programs',
        subtitle: 'Three Faculties. Twelve Courses.',
        description: 'From Allied Health Sciences and Computing to Management & Social Sciences — discover programmes that shape careers and serve society.',
        buttonText: 'View Faculties',
        buttonLink: '/faculties',
        imageUrl: ''
      },
      {
        title: 'Apply Now for\n2025/2026 Session',
        subtitle: 'Admissions Open',
        description: "JAMB score of 150 and above? Seven O'Level credits including Mathematics and English? Your place at Tazkiyah University awaits.",
        buttonText: 'Apply Now',
        buttonLink: '/admissions',
        imageUrl: ''
      }
    ];
  }

  /* ── Carousel HTML ────────────────────────────────────────── */
  function buildCarousel(data) {
    const BACKEND = 'http://localhost:5000';
    const gradients = ['grad-0', 'grad-1', 'grad-2'];

    const slidesHTML = data.map((s, i) => {
      const hasImage = !!s.imageUrl;
      const bgStyle = hasImage
        ? `background-image:url('${s.imageUrl.startsWith('http') ? s.imageUrl : BACKEND + s.imageUrl}')`
        : '';
      const cls = hasImage ? 'has-image' : gradients[i % gradients.length];

      const lines = s.title.split('\n');
      const titleHTML = lines.length > 1
        ? `${lines[0]}<br><span class="highlight">${lines[1]}</span>`
        : `<span class="highlight">${lines[0]}</span>`;

      let rawLink = s.buttonLink || '/faculties';
      if (rawLink.startsWith('#')) rawLink = rawLink.replace(/^#\/?/, '/');
      if (rawLink === '/programs' || rawLink === 'programs') rawLink = '/faculties';
      if (!rawLink.startsWith('/')) rawLink = '/' + rawLink;

      return `
        <div class="carousel-slide ${cls}${i === 0 ? ' is-active' : ''}" style="${bgStyle}" data-index="${i}">
          <div class="carousel-content">
            <span class="carousel-tag">${s.subtitle || 'Tazkiyah Islamic School'}</span>
            <h1 class="carousel-title">${titleHTML}</h1>
            <p class="carousel-desc">${s.description || ''}</p>
            <div class="carousel-btns">
              ${s.buttonText ? `<a href="${rawLink}" class="btn btn-primary">${s.buttonText} →</a>` : ''}
              <a href="/about" class="btn btn-outline">Learn More</a>
            </div>
          </div>
        </div>`;
    }).join('');

    const arrowsHTML = data.length > 1 ? `
      <button class="carousel-arrow prev" id="c-prev" aria-label="Previous">&#8592;</button>
      <button class="carousel-arrow next" id="c-next" aria-label="Next">&#8594;</button>
    ` : '';

    const dotsHTML = data.length > 1
      ? `<div class="carousel-dots">${data.map((_, i) =>
        `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-idx="${i}" aria-label="Slide ${i + 1}"></button>`
      ).join('')}</div>`
      : '';

    return `
      <section class="hero-carousel" id="hero-carousel">
        <div class="carousel-track" id="c-track">${slidesHTML}</div>
        ${arrowsHTML}
        ${dotsHTML}
        <div class="carousel-progress" id="c-progress"></div>
      </section>`;
  }

  /* ── Stats HTML ───────────────────────────────────────────── */
  function buildStats() {
    const stats = [
      { n: 3, s: '', label: 'Faculties' },
      { n: 12, s: '+', label: 'Degree Programmes' },
      { n: 150, s: '', label: 'JAMB Minimum Score' },
      { n: 100, s: '%', label: 'Female Institution' }
    ];
    return `
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            ${stats.map(s => `
              <div class="stat-item">
                <div class="stat-number" data-target="${s.n}" data-suffix="${s.s}">0</div>
                <div class="stat-label">${s.label}</div>
              </div>`).join('')}
          </div>
        </div>
      </section>`;
  }

  /* ── About HTML ───────────────────────────────────────────── */
  function buildAbout() {
    return `
      <section class="about-section">
        <div class="container">
          <div class="about-grid">
            <div class="about-img-wrap reveal">
              <div class="about-img-box">🎓</div>
              <div class="about-badge">
                <span class="about-badge-num">#1</span>
                <span class="about-badge-text">All-Female<br>University</span>
              </div>
            </div>
            <div class="about-content reveal reveal-d2">
              <span class="section-tag">About Tazkiyah University</span>
              <h2 class="section-title">Nigeria's First <span>All-Female</span> University</h2>
              <p class="about-desc">
                Founded by <strong>Professor Ibrahim Maqari</strong>, Tazkiyah University is located in Zaria,
                Kaduna State, and is Nigeria's first officially approved all-female university. We combine
                rigorous academic programmes with strong moral and spiritual character development.
              </p>
              <div class="about-features">
                <div class="about-feature"><div class="about-feature-check">✓</div> Nigeria's first approved all-female university</div>
                <div class="about-feature"><div class="about-feature-check">✓</div> Three faculties with 12+ degree programmes</div>
                <div class="about-feature"><div class="about-feature-check">✓</div> Located on Chikaji Road, Zaria, Kaduna State</div>
                <div class="about-feature"><div class="about-feature-check">✓</div> Holistic academic &amp; character development</div>
              </div>
              <a href="/about" class="btn btn-dark">Discover Our Story →</a>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ── Programs / Faculties HTML ───────────────────────────── */
  function buildPrograms() {
    const faculties = [
      {
        title: 'Faculty of Allied Health Sciences',
        desc: 'Training compassionate, highly skilled healthcare professionals to serve communities across Nigeria and beyond.',
        icon: '🏥',
        chip: 'Health',
        g: 'prog-g1',
        slug: 'faculty-allied-health',
        courses: ['Nursing Science', 'Medical Laboratory Science', 'Public Health', 'Human Nutrition & Dietetics']
      },
      {
        title: 'Faculty of Science & Computing',
        desc: 'Preparing women to lead in Africa\'s fastest-growing sector with cutting-edge computing and applied science degrees.',
        icon: '💻',
        chip: 'Tech',
        g: 'prog-g2',
        slug: 'faculty-science-computing',
        courses: ['Computer Science', 'Cyber Security', 'Software Engineering', 'Information Technology', 'Petroleum Chemistry']
      },
      {
        title: 'Faculty of Management & Social Sciences',
        desc: 'Developing Nigeria\'s next generation of ethical business leaders, economists, and social entrepreneurs.',
        icon: '📊',
        chip: 'Business',
        g: 'prog-g3',
        slug: 'faculty-management-social',
        courses: ['Accounting', 'Economics', 'Business Administration']
      }
    ];
    return `
      <section class="programs-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Faculties &amp; Courses</span>
            <h2 class="section-title">Three Faculties. <span>Twelve Programmes.</span></h2>
            <p class="section-subtitle">Tazkiyah University offers B.Sc. degree programmes across three dynamic faculties designed to produce career-ready, values-driven graduates.</p>
          </div>

          <!-- Faculty Overview Cards -->
          <div class="programs-grid">
            ${faculties.map((f, i) => `
              <div class="prog-card reveal reveal-d${i + 1}">
                <div class="prog-card-top ${f.g}">
                  <div class="prog-icon">${f.icon}</div>
                  <span class="prog-chip">${f.chip}</span>
                </div>
                <div class="prog-body">
                  <h3 class="prog-title">${f.title}</h3>
                  <p class="prog-desc">${f.desc}</p>
                  <ul style="margin:0 0 16px 16px;list-style:disc;">
                    ${f.courses.map(c => `<li style="font-size:0.82rem;color:var(--text-light);margin-bottom:4px;">${c}</li>`).join('')}
                  </ul>
                  <div class="prog-footer">
                    <span class="prog-meta">📜 B.Sc. Degree · 4 Years</span>
                    <a href="/${f.slug}" class="prog-link">Details →</a>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </section>`;
  }

  /* ── Features HTML ────────────────────────────────────────── */
  function buildFeatures() {
    const feats = [
      { icon: '🏛️', title: 'Historic Institution', desc: 'Nigeria\'s first officially approved all-female university — a pioneering milestone in women\'s higher education.' },
      { icon: '🎓', title: 'Accredited Programmes', desc: 'All B.Sc. degree programmes are fully accredited and recognised by relevant Nigerian regulatory bodies.' },
      { icon: '👩‍🔬', title: 'STEM-Focused for Women', desc: 'We are breaking barriers with strong Health Sciences and Computing faculties built specifically for women.' },
      { icon: '🤝', title: 'Safe Campus Environment', desc: 'A dedicated, secure, and inclusive campus environment that empowers female students to thrive and lead.' },
      { icon: '💡', title: 'Modern Infrastructure', desc: 'Up-to-date laboratories, lecture halls, computing facilities, and a well-resourced academic library.' },
      { icon: '⭐', title: 'Character Development', desc: 'Academic success combined with moral and spiritual formation — producing graduates of knowledge and integrity.' }
    ];
    return `
      <section class="features-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Why Choose Tazkiyah</span>
            <h2 class="section-title">An Institution Built for <span>Excellence</span></h2>
            <p class="section-subtitle">Discover what sets Tazkiyah University apart as Africa's premier all-female higher education institution.</p>
          </div>
          <div class="features-grid">
            ${feats.map((f, i) => `
              <div class="feat-card reveal reveal-d${(i % 3) + 1}">
                <div class="feat-icon">${f.icon}</div>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
              </div>`).join('')}
          </div>
        </div>
      </section>`;
  }

  /* ── Testimonials HTML ────────────────────────────────────── */
  function buildTestimonials() {
    const list = [
      { quote: 'Tazkiyah University provides an environment where female students can excel in STEM fields without limits.', author: 'Dr. Maryam Al-Hassan', role: 'Senior Lecturer' },
      { quote: 'Knowing my daughter is studying at a safe, value-based university with high academic standards gives me total peace of mind.', author: 'Alhaji Usman Bello', role: 'Pioneer Student Parent' },
      { quote: 'The focus on leadership, ethical values, and practical skills makes Tazkiyah a truly unique university in Nigeria.', author: 'Hauwa Abubakar', role: 'Admissions Candidate' }
    ];
    return `
      <section class="testimonials-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">Voices of Tazkiyah</span>
            <h2 class="section-title" style="color:var(--white);">What People Say <span>About Us</span></h2>
            <p class="section-subtitle" style="color:rgba(255,255,255,0.65);">Hear from our academic community, parents, and prospective students.</p>
          </div>
          <div class="testi-grid">
            ${list.map((t, i) => `
              <div class="testi-card reveal reveal-d${i + 1}">
                <div class="testi-stars">★★★★★</div>
                <p class="testi-text">"${t.quote}"</p>
                <div class="testi-author">
                  <div class="testi-avatar">${t.author.charAt(0)}</div>
                  <div>
                    <div class="testi-name">${t.author}</div>
                    <div class="testi-role">${t.role}</div>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </section>`;
  }

  /* ── News & Events HTML ───────────────────────────────────── */
  function buildNews() {
    const newsItems = [
      {
        title: "Tazkiyah University Prepares for Maiden Matriculation Ceremony",
        desc: "Tazkiyah University, Zaria announces the date for the official induction and matriculation of its pioneer female student cohort.",
        date: "October 12, 2025",
        icon: "🏛️",
        link: "/news",
        tag: "Ceremony"
      },
      {
        title: "Ultra-Modern Computing Laboratories Commissioned",
        desc: "We have fully commissioned new labs for Software Engineering, Cyber Security, and IT at our Chikaji Road take-off campus.",
        date: "September 28, 2025",
        icon: "💻",
        link: "/news",
        tag: "Academic"
      },
      {
        title: "Admissions Open for 2025/2026 Academic Session",
        desc: "Qualified female candidates with a JAMB score of 150+ and 5 O'Level credits are invited to apply on our official portal.",
        date: "August 15, 2025",
        icon: "📝",
        link: "/news",
        tag: "Admission"
      }
    ];

    return `
      <section class="news-section">
        <div class="container">
          <div class="section-header">
            <span class="section-tag">News &amp; Events</span>
            <h2 class="section-title">Latest Updates from <span>Tazkiyah</span></h2>
            <p class="section-subtitle">Stay informed about the latest developments, academic achievements, and upcoming events at our campus.</p>
          </div>
          <div class="news-grid">
            ${newsItems.map((n, i) => `
              <div class="news-card reveal reveal-d${i + 1}">
                <div class="news-card-img" style="background: linear-gradient(135deg, ${i === 0 ? '#0a1628, #1e3a5f' : i === 1 ? '#1a2f47, #2d5282' : '#1a3350, #276098'}); color: white; display: flex; justify-content: center; align-items: center;">
                  <span style="position:relative; z-index:1; font-size: 3rem;">${n.icon}</span>
                  <span class="news-date">${n.date}</span>
                </div>
                <div class="news-body">
                  <span style="font-size:0.7rem; font-weight:700; text-transform:uppercase; color:var(--accent-dark); letter-spacing:1px; display:block; margin-bottom:6px;">${n.tag}</span>
                  <h3 class="news-title">${n.title}</h3>
                  <p class="news-excerpt">${n.desc}</p>
                  <a href="${n.link}" class="news-link">Read Full Story →</a>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </section>`;
  }

  /* ── CTA HTML ─────────────────────────────────────────────── */
  function buildCTA() {
    return `
      <section class="cta-section">
        <div class="container">
          <div class="cta-inner">
            <h2>Join Nigeria's First All-Female University</h2>
            <p>Score 150+ in JAMB and hold 5 O'Level credits including Mathematics &amp; English?<br>Your place at Tazkiyah University, Zaria is waiting.</p>
            <div class="cta-btns">
              <a href="/admissions" class="btn btn-dark">Apply Now →</a>
              <a href="/contact" class="btn btn-dark-outline">Contact Us</a>
            </div>
          </div>
        </div>
      </section>`;
  }

  /* ── Carousel Logic ───────────────────────────────────────── */
  function initCarousel() {
    if (slides.length <= 1) return;

    const track = document.getElementById('c-track');
    const prevBtn = document.getElementById('c-prev');
    const nextBtn = document.getElementById('c-next');
    const dots = document.querySelectorAll('.carousel-dot');
    const progress = document.getElementById('c-progress');

    if (!track) return;

    const goTo = (idx) => {
      const n = slides.length;
      currentSlide = ((idx % n) + n) % n;

      if (track) {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
      }

      // Update dots
      dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));

      // Reset active slide class (re-triggers CSS animation)
      document.querySelectorAll('.carousel-slide').forEach((s, i) => {
        s.classList.toggle('is-active', i === currentSlide);
        // Re-trigger animations
        if (i === currentSlide) {
          const els = s.querySelectorAll('.carousel-tag, .carousel-title, .carousel-desc, .carousel-btns');
          els.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // reflow
            el.style.animation = '';
          });
        }
      });

      // Reset progress bar
      if (progress) {
        progress.className = 'carousel-progress';
        progress.style.width = '0%';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          progress.classList.add('animating');
        }));
      }
    };

    goToFn = goTo;

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(currentSlide - 1); resetAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(currentSlide + 1); resetAutoPlay(); });

    dots.forEach(d => d.addEventListener('click', () => {
      goTo(parseInt(d.dataset.idx));
      resetAutoPlay();
    }));

    // Keyboard
    document.addEventListener('keydown', onKeydown);

    // Touch / swipe
    const hero = document.getElementById('hero-carousel');
    let startX = 0;
    if (hero) {
      hero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
      hero.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          goTo(diff > 0 ? currentSlide + 1 : currentSlide - 1);
          resetAutoPlay();
        }
      }, { passive: true });
    }

    goTo(0);
    startAutoPlay();
  }

  function onKeydown(e) {
    if (!goToFn) return;
    if (e.key === 'ArrowLeft') { goToFn(currentSlide - 1); resetAutoPlay(); }
    if (e.key === 'ArrowRight') { goToFn(currentSlide + 1); resetAutoPlay(); }
  }

  function startAutoPlay() {
    autoPlayTimer = setInterval(() => goToFn && goToFn(currentSlide + 1), 3000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  /* ── Animated Counters ────────────────────────────────────── */
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = target / 55;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current) + suffix;
        }, 22);
        obs.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(c => obs.observe(c));
  }

  return { render };

})();
