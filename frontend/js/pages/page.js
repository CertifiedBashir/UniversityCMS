/* ================================================================
   page.js — Dynamic Page Renderer
   Fetches page content by slug from /api/pages/:slug
   ================================================================ */

const DynamicPage = (() => {

  async function render(container, slug) {
    // Show spinner while fetching
    container.innerHTML = `
      <div style="min-height:80vh;display:flex;align-items:center;justify-content:center;padding-top:var(--nav-height);">
        <div class="loading-spinner" style="border-color:rgba(10,22,40,0.12);border-top-color:var(--primary);width:44px;height:44px;"></div>
      </div>`;

    try {
      const page = await TazkiyahAPI.fetchPage(slug);
      renderPageContent(container, page, slug);
    } catch (e) {
      const fallback = getDefaultPage(slug);
      if (fallback) {
        renderPageContent(container, fallback, slug);
      } else {
        container.innerHTML = buildNotFound(slug);
      }
    }
  }

  function getDefaultPage(slug) {
    const pages = {
      about: {
        title: 'About Tazkiyah University',
        content: `
          <h2>Who We Are</h2>
          <p>Tazkiyah University is Nigeria's first approved all-female university, located at its take-off site on Chikaji Road, Zaria, Kaduna State, with a permanent campus planned for Kaduna city. Founded by <strong>Professor Ibrahim Maqari</strong>, the university is built on the conviction that women deserve a world-class tertiary education that also nurtures their moral and spiritual character.</p>
          <h2>Our Mission</h2>
          <p>To provide a transformative university education that empowers women with the knowledge, skills, and values needed to excel professionally, contribute meaningfully to society, and lead lives of integrity and purpose.</p>
          <h2>Our Vision</h2>
          <p>To be the leading all-female university in Africa — recognized for academic excellence, groundbreaking research, and the holistic development of women as agents of positive change.</p>
          <h2>Campus & Location</h2>
          <p>The university currently operates from its take-off site on <strong>Chikaji Road, Zaria, Kaduna State</strong>. A permanent campus is being developed in Kaduna city to accommodate the university's growing academic programmes and student population.</p>
        `
      },
      faculties: {
        title: 'Our Academic Faculties',
        content: `
          <p class="lead-text" style="font-size:1.15rem; color:var(--text-medium); text-align:center; max-width:800px; margin:0 auto 40px;">Tazkiyah University currently offers degree programmes across three dynamic faculties, with courses carefully chosen to address Nigeria's most critical professional sectors.</p>
          
          <div class="faculties-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px; margin-top:40px;">
            
            <div class="faculty-index-card" style="background:var(--white); border-radius:var(--radius); border:1px solid var(--border); padding:40px 30px; display:flex; flex-direction:column; transition:var(--transition); box-shadow:var(--shadow-sm);">
              <div class="faculty-icon" style="font-size:3rem; margin-bottom:20px;">🏥</div>
              <h3 style="font-family:var(--font-heading); color:var(--primary); font-size:1.4rem; margin-bottom:12px;">Faculty of Allied Health Sciences</h3>
              <p style="font-size:0.92rem; color:var(--text-medium); line-height:1.6; margin-bottom:24px; flex-grow:1;">Training compassionate, highly skilled healthcare professionals to serve communities across Nigeria and beyond.</p>
              <a href="/faculty-allied-health" class="btn btn-dark-outline" style="width:100%; justify-content:center;">Explore Faculty →</a>
            </div>

            <div class="faculty-index-card" style="background:var(--white); border-radius:var(--radius); border:1px solid var(--border); padding:40px 30px; display:flex; flex-direction:column; transition:var(--transition); box-shadow:var(--shadow-sm);">
              <div class="faculty-icon" style="font-size:3rem; margin-bottom:20px;">💻</div>
              <h3 style="font-family:var(--font-heading); color:var(--primary); font-size:1.4rem; margin-bottom:12px;">Faculty of Science &amp; Computing</h3>
              <p style="font-size:0.92rem; color:var(--text-medium); line-height:1.6; margin-bottom:24px; flex-grow:1;">Preparing women to lead in Africa's fastest-growing sector with cutting-edge computing and applied science degrees.</p>
              <a href="/faculty-science-computing" class="btn btn-dark-outline" style="width:100%; justify-content:center;">Explore Faculty →</a>
            </div>

            <div class="faculty-index-card" style="background:var(--white); border-radius:var(--radius); border:1px solid var(--border); padding:40px 30px; display:flex; flex-direction:column; transition:var(--transition); box-shadow:var(--shadow-sm);">
              <div class="faculty-icon" style="font-size:3rem; margin-bottom:20px;">📊</div>
              <h3 style="font-family:var(--font-heading); color:var(--primary); font-size:1.4rem; margin-bottom:12px;">Faculty of Management &amp; Social Sciences</h3>
              <p style="font-size:0.92rem; color:var(--text-medium); line-height:1.6; margin-bottom:24px; flex-grow:1;">Developing Nigeria's next generation of ethical business leaders, economists, and social entrepreneurs.</p>
              <a href="/faculty-management-social" class="btn btn-dark-outline" style="width:100%; justify-content:center;">Explore Faculty →</a>
            </div>

          </div>
        `
      },
      admissions: {
        title: 'Admissions',
        content: `
          <h2>Admissions — 2025/2026 Academic Session</h2>
          <p>Tazkiyah University is now accepting applications from qualified female candidates for the 2025/2026 academic session. We invite you to join our pioneering community of women committed to excellence.</p>
          <h2>Eligibility Criteria</h2>
          <ul>
            <li><strong>Gender:</strong> All applicants must be female (Tazkiyah University is an all-female institution)</li>
            <li><strong>JAMB Score:</strong> A minimum score of <strong>150</strong> in the Joint Admissions and Matriculation Board (JAMB) UTME</li>
            <li><strong>O'Level Results:</strong> At least <strong>seven (7) O'Level credits</strong>, including credits in <strong>Mathematics</strong> and <strong>English Language</strong></li>
          </ul>
          <h2>How to Apply</h2>
          <ol>
            <li><strong>Change of Institution:</strong> Visit any accredited CBT centre to process a Change of Institution to Tazkiyah University.</li>
            <li><strong>Visit Portal:</strong> Go to the official Tazkiyah University Admission Portal, create a personal account, and complete your profile.</li>
            <li><strong>Generate an Application Invoice:</strong> Once registered, generate your application invoice and proceed with the required payment to submit your application.</li>
          </ol>
        `
      },
      'academic-calendar': {
        title: 'Academic Calendar',
        content: `
          <h2>Academic Calendar — 2025/2026 Academic Session</h2>
          <p>Below is the approved academic calendar for the pioneer session at Tazkiyah University, Zaria.</p>

          <div style="overflow-x:auto;">
            <table class="calendar-table" style="width:100%; border-collapse:collapse; margin-top:24px;">
              <thead>
                <tr style="border-bottom:2px solid var(--accent); text-align:left;">
                  <th style="padding:12px; font-weight:700; color:var(--primary);">Event / Activity</th>
                  <th style="padding:12px; font-weight:700; color:var(--primary);">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:12px; font-weight:600;">Resumption and Registration</td>
                  <td style="padding:12px; color:var(--text-medium);">October 20, 2025</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:12px; font-weight:600;">Lectures Begin</td>
                  <td style="padding:12px; color:var(--text-medium);">November 3, 2025</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:12px; font-weight:600;">Orientation Week</td>
                  <td style="padding:12px; color:var(--text-medium);">November 17 – 21, 2025</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:12px; font-weight:600;">Matriculation Ceremony</td>
                  <td style="padding:12px; color:var(--text-medium);">December 10, 2025</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:12px; font-weight:600;">Christmas/New Year Break</td>
                  <td style="padding:12px; color:var(--text-medium);">December 22, 2025 – January 4, 2026</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:12px; font-weight:600;">First Semester Examinations</td>
                  <td style="padding:12px; color:var(--text-medium);">February 16 – 28, 2026</td>
                </tr>
                <tr style="border-bottom:1px solid var(--border);">
                  <td style="padding:12px; font-weight:600;">First Semester Break</td>
                  <td style="padding:12px; color:var(--text-medium);">March 2 – 14, 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        `
      },
      'central-administration': {
        title: 'Central Administration',
        content: `
          <h2>University Principal Officers</h2>
          <p>Tazkiyah University's leadership team is composed of distinguished female scholars and administrative professionals dedicated to driving academic excellence and operational integrity.</p>
        `
      },
      news: {
        title: 'News & Events',
        content: `
          <h2>Latest News</h2>
          <h3>🎓 Tazkiyah University Begins Maiden Academic Session</h3>
          <p>Tazkiyah University has officially commenced its maiden academic session, welcoming its pioneer students across the three founding faculties: Allied Health Sciences, Science &amp; Computing, and Management &amp; Social Sciences.</p>
          <h3>🏛️ Nigeria's First All-Female University Receives Full Approval</h3>
          <p>Tazkiyah University made history as it received full government approval to operate as Nigeria's first all-female university. Founded by Professor Ibrahim Maqari, the institution was established with a clear mandate to provide women with world-class higher education in a safe, values-driven environment.</p>
        `
      },
      contact: {
        title: 'Contact Us',
        content: `
          <h2>Get in Touch</h2>
          <ul>
            <li>📍 <strong>Take-off Campus:</strong> Chikaji Road, Zaria, Kaduna State, Nigeria</li>
            <li>📍 <strong>Permanent Campus (in development):</strong> Kaduna City, Kaduna State</li>
            <li>📞 <strong>Phone:</strong> +234 800 123 4567</li>
            <li>✉️ <strong>General Enquiries:</strong> info@tazkiyah.edu.ng</li>
            <li>✉️ <strong>Admissions:</strong> admissions@tazkiyah.edu.ng</li>
            <li>🕒 <strong>Office Hours:</strong> Monday – Friday, 8:00am – 4:00pm</li>
          </ul>
        `
      },
      'faculty-allied-health': {
        title: 'Faculty of Allied Health Sciences',
        content: `
          <h2>Welcome to Allied Health Sciences</h2>
          <p>The Faculty of Allied Health Sciences at Tazkiyah University is dedicated to developing highly qualified healthcare professionals who are ready to serve the community. With modern laboratories and a dedicated teaching hospital partnership in Kaduna State, our students get top-tier clinical education.</p>

          <h2>Departments &amp; B.Sc. Programmes</h2>
          <div class="department-list">
            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">🩺</span>
                <h3 class="dept-title">Department of Nursing Science</h3>
              </div>
              <p class="dept-desc">Prepares graduates for careers as registered nurses, combining scientific foundations with clinical excellence and moral patient care.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Nursing Science</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">🔬</span>
                <h3 class="dept-title">Department of Medical Laboratory Science</h3>
              </div>
              <p class="dept-desc">Trains specialists in laboratory analysis, diagnosis, pathology, and medical research to support clinical treatment teams.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Medical Lab Science</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">🏥</span>
                <h3 class="dept-title">Department of Public Health</h3>
              </div>
              <p class="dept-desc">Focuses on preventative medicine, epidemiological research, community healthcare delivery, and health policy management.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Public Health</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">🥗</span>
                <h3 class="dept-title">Department of Human Nutrition &amp; Dietetics</h3>
              </div>
              <p class="dept-desc">Examines nutrition science, food chemistry, diet plan management, and therapeutics to improve wellness and treat clinical conditions.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Human Nutrition</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>
          </div>
        `
      },
      'faculty-science-computing': {
        title: 'Faculty of Science & Computing',
        content: `
          <h2>Welcome to Science &amp; Computing</h2>
          <p>The Faculty of Science &amp; Computing at Tazkiyah University trains female students to lead and innovate in technology and the sciences. Our state-of-the-art computer labs on Chikaji Road provide practical learning environments for software development, cyber security, and data science.</p>

          <h2>Departments &amp; B.Sc. Programmes</h2>
          <div class="department-list">
            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">🖥️</span>
                <h3 class="dept-title">Department of Computer Science</h3>
              </div>
              <p class="dept-desc">Covers computation theory, algorithms, AI, database systems, and mobile/web development for the digital economy.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Computer Science</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">🔐</span>
                <h3 class="dept-title">Department of Cyber Security</h3>
              </div>
              <p class="dept-desc">Focuses on network security, threat assessment, secure programming, digital forensics, and infrastructure protection.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Cyber Security</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">⚙️</span>
                <h3 class="dept-title">Department of Software Engineering</h3>
              </div>
              <p class="dept-desc">Applies engineering principles to software design, lifecycle architecture, QA testing, and large-scale project management.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Software Engineering</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">🌐</span>
                <h3 class="dept-title">Department of Information Technology</h3>
              </div>
              <p class="dept-desc">Covers network administration, cloud infrastructure, systems integration, and business IT architecture.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Information Technology</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">🛢️</span>
                <h3 class="dept-title">Department of Petroleum Chemistry</h3>
              </div>
              <p class="dept-desc">Bridges chemistry and chemical engineering to focus on refining, petrochemical synthesis, and energy resources development.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Petroleum Chemistry</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>
          </div>
        `
      },
      'faculty-management-social': {
        title: 'Faculty of Management & Social Sciences',
        content: `
          <h2>Welcome to Management &amp; Social Sciences</h2>
          <p>The Faculty of Management &amp; Social Sciences prepares women to assume leadership roles in commerce, economics, and business management with deep ethical foundations. Our graduates lead corporate enterprises and social ventures with integrity.</p>

          <h2>Departments &amp; B.Sc. Programmes</h2>
          <div class="department-list">
            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">💼</span>
                <h3 class="dept-title">Department of Accounting</h3>
              </div>
              <p class="dept-desc">Provides in-depth training in financial accounting, auditing, taxation, cost management, and corporate governance.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Accounting</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">📈</span>
                <h3 class="dept-title">Department of Economics</h3>
              </div>
              <p class="dept-desc">Analyzes macro/microeconomic theory, financial markets, econometrics, international trade, and developmental policies.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Economics</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>

            <div class="dept-item">
              <div class="dept-header">
                <span class="dept-icon">📊</span>
                <h3 class="dept-title">Department of Business Administration</h3>
              </div>
              <p class="dept-desc">Covers organization management, strategic planning, human resource dynamics, marketing, and entrepreneurship.</p>
              <div class="dept-courses">
                <span class="dept-course-tag">B.Sc. Business Administration</span>
                <span class="dept-course-tag">4 Years</span>
              </div>
            </div>
          </div>
        `
      }
    };
    if (slug === 'academics' || slug === 'programs') {
      return pages.faculties;
    }
    return pages[slug];
  }

  function buildPage(page) {
    return `
      <div class="page-hero">
        <div class="page-hero-inner">
          <span class="page-hero-tag">Tazkiyah University</span>
          <h1>${page.title}</h1>
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">›</span>
            <span>${page.title}</span>
          </nav>
        </div>
      </div>

      <div class="page-content-wrap">
        <div class="container">
          <div class="page-content">
            ${page.content || '<p>Content for this page is coming soon.</p>'}
          </div>
        </div>
      </div>`;
  }

  function buildFacultyPage(page, slug) {
    const deans = {
      'faculty-allied-health': {
        name: 'Prof. Halima Sadiya',
        title: 'Dean, Allied Health Sciences',
        role: 'Ph.D., FWACN',
        message: 'Welcome to the Faculty of Allied Health Sciences. Our mission is to educate and empower the next generation of female healthcare leaders. Through rigorous training, state-of-the-art laboratory practice, and clinical postings, we ensure our graduates are ready to make a significant impact on healthcare delivery in Nigeria.',
        avatar: '👩‍⚕️'
      },
      'faculty-science-computing': {
        name: 'Dr. Amina Ibrahim',
        title: 'Dean, Science & Computing',
        role: 'Ph.D. in Computer Science',
        message: 'In the Faculty of Science & Computing, we are committed to closing the gender gap in technology. Our classrooms and labs on Chikaji Road are designed to provide hands-on experience in Software Engineering, Cyber Security, and Computer Science. We train women not just to be consumers of technology, but creators and innovators.',
        avatar: '👩‍💻'
      },
      'faculty-management-social': {
        name: 'Dr. Aisha Abubakar',
        title: 'Dean, Management & Social Sciences',
        role: 'Ph.D., MBA',
        message: 'Welcome. Our faculty focuses on building strong foundations in accounting, economics, and business management. We believe that ethical management and economic literacy are critical for community development. We prepare our students to lead corporate enterprises and social ventures with excellence and integrity.',
        avatar: '👩‍💼'
      }
    };

    const dean = deans[slug] || {
      name: 'Faculty Dean',
      title: 'Dean of Faculty',
      role: 'Ph.D.',
      message: 'Welcome to the Faculty.',
      avatar: '🎓'
    };

    return `
      <div class="page-hero">
        <div class="page-hero-inner">
          <span class="page-hero-tag">Tazkiyah University Faculties</span>
          <h1>${page.title}</h1>
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">›</span>
            <a href="/faculties">Faculties</a>
            <span aria-hidden="true">›</span>
            <span>${page.title}</span>
          </nav>
        </div>
      </div>

      <div class="page-content-wrap">
        <div class="container">
          <div class="faculty-grid">
            
            <!-- Left Column: Faculty Details -->
            <div class="faculty-details">
              <div class="page-content">
                ${page.content || ''}
              </div>
            </div>

            <!-- Right Column: Dean Profile Card -->
            <div class="faculty-sidebar">
              <div class="dean-card">
                <div class="dean-avatar-container">
                  <span style="font-size: 5rem;">${dean.avatar}</span>
                </div>
                <div class="dean-info">
                  <h3>${dean.name}</h3>
                  <p>${dean.title}<br><span style="font-size: 0.72rem; color: var(--text-light); font-weight: normal;">${dean.role}</span></p>
                </div>
                <div class="dean-quote">
                  <span style="font-size: 1.5rem; color: var(--accent); display: block; margin-bottom: 8px; font-family: Georgia, serif; line-height: 1;">“</span>
                  ${dean.message}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>` + buildCTA();
  }

  function renderPageContent(container, page, slug) {
    const isFaculty = slug.startsWith('faculty-');
    if (slug === 'central-administration') {
      container.innerHTML = buildCentralAdminPage(page) + buildCTA();
      initCentralAdminEvents();
    } else {
      container.innerHTML = isFaculty ? buildFacultyPage(page, slug) : buildPage(page) + buildCTA();
    }
  }

  function buildCentralAdminPage(page) {
    return `
      <div class="page-hero">
        <div class="page-hero-inner">
          <span class="page-hero-tag">Tazkiyah University Administration</span>
          <h1>Central Administration</h1>
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">›</span>
            <span>Central Administration</span>
          </nav>
        </div>
      </div>

      <div class="page-content-wrap">
        <div class="container">
          <div class="page-content" style="margin-bottom: 40px; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto;">
            <h2>University Principal Officers</h2>
            <p>Our management team brings decades of academic leadership and administration experience to build Tazkiyah University into a model higher education center.</p>
          </div>

          <div class="admin-top-row">
            <div class="admin-card">
              <div class="admin-avatar">
                <img src="images/vc.png" alt="Prof. Faruk Sarkinfada" style="width:100%; height:100%; object-fit:cover;">
              </div>
              <h3 class="admin-name">Prof. Faruk Sarkinfada</h3>
              <p class="admin-post">Vice Chancellor</p>
              <button class="btn btn-dark-outline admin-btn" data-admin="faruk-sarkinfada">View Profile</button>
            </div>
          </div>

          <div class="admin-sub-grid">
            <div class="admin-card">
              <div class="admin-avatar">
                <img src="images/registrar.png" alt="Alh. Bashir Abubakar" style="width:100%; height:100%; object-fit:cover;">
              </div>
              <h3 class="admin-name">Alh. Bashir Abubakar</h3>
              <p class="admin-post">Registrar</p>
              <button class="btn btn-dark-outline admin-btn" data-admin="bashir-abubakar">View Profile</button>
            </div>

            <div class="admin-card">
              <div class="admin-avatar">
                <img src="images/bursar.png" alt="Mall. Abdulrazaq Aliyu" style="width:100%; height:100%; object-fit:cover;">
              </div>
              <h3 class="admin-name">Mall. Abdulrazaq Aliyu</h3>
              <p class="admin-post">Bursar</p>
              <button class="btn btn-dark-outline admin-btn" data-admin="abdulrazaq-aliyu">View Profile</button>
            </div>

            <div class="admin-card">
              <div class="admin-avatar">
                <img src="images/director.png" alt="Dr. Yaseer" style="width:100%; height:100%; object-fit:cover;">
              </div>
              <h3 class="admin-name">Dr. Yaseer</h3>
              <p class="admin-post">Director, Academic Planning</p>
              <button class="btn btn-dark-outline admin-btn" data-admin="yaseer">View Profile</button>
            </div>

            <div class="admin-card">
              <div class="admin-avatar">
                <img src="images/librarian.png" alt="Dr. Ibrahim Jamilu" style="width:100%; height:100%; object-fit:cover;">
              </div>
              <h3 class="admin-name">Dr. Ibrahim Jamilu</h3>
              <p class="admin-post">University Librarian</p>
              <button class="btn btn-dark-outline admin-btn" data-admin="ibrahim-jamilu">View Profile</button>
            </div>
          </div>
        </div>
      </div>

      <!-- CV Modal Overlay Container -->
      <div id="cv-modal-container" class="cv-modal-overlay"></div>
    `;
  }

  function initCentralAdminEvents() {
    const buttons = document.querySelectorAll('.admin-btn');
    const modalContainer = document.getElementById('cv-modal-container');

    const adminCVs = {
      'faruk-sarkinfada': {
        name: 'Prof. Faruk Sarkinfada',
        post: 'Vice Chancellor',
        degrees: 'Ph.D. in Medical Microbiology (Liverpool, UK)',
        avatarUrl: 'images/vc.png',
        overview: `
          <h3>Introduction</h3>
          <p>Faruk Sarkinfada is a Professor of Medical Microbiology, Medical Laboratory Scientist, and Quality Assurance Specialist, with over 30 years of experience in teaching, research, and community services in Nigeria, United Kingdom, and the United Arab Emirates. He is currently the Vice Chancellor of Tazkiyah University, Kaduna, Nigeria, and a visiting Professor at Aliko Dangote University of Science and Technology (ADUSTECH) Wudil, Kano, Nigeria, leading the planning and establishment of the College of Health Sciences.</p>
          
          <h3>Academic Summary</h3>
          <p>He holds a Ph.D. from the Liverpool School of Tropical Medicine, University of Liverpool, UK. His academic work focuses on diagnostic microbiology laboratory systems strengthening, quality assurance, infectious diseases, and antimicrobial resistance (AMR) surveillance. He has published in high-impact peer-reviewed journals, cited numerous times, and collaborated globally.</p>
          <p>He is a peer reviewer for several scientific journals, including the <em>Journal of Infections in Developing Countries</em>, <em>Malaria Journal</em>, and the <em>Journal of Global Infectious Diseases</em>. He was the Editor-in-chief of the <em>Annals of Medical Laboratory Scientist</em> (West African Postgraduate College of Medical Laboratory Sciences).</p>

          <h3>Professional Summary</h3>
          <p>He is a Fellow of the Royal Society of Tropical Medicine and Hygiene (FRSTM &amp; H) UK, a Fellow of the West African Postgraduate College of Medical Laboratory Science (WAPCMLS), and a Fellow of the Ford Foundation International Fellowship Program, USA. He has served as the national laboratory consultant to the Nigeria's Tuberculosis and Malaria control programs and participated in the development of Nigeria's National Medical Laboratory Strategic Plan (NMLSt).</p>
        `,
        education: `
          <h3>Education &amp; Qualifications</h3>
          <ul class="cv-list">
            <li><strong>Ph.D. in Public Health Microbiology</strong> (Laboratory Systems and Quality Assurance) — Liverpool School of Tropical Medicine, University of Liverpool, UK (July 2008)</li>
            <li><strong>M.Phil. in Public Health Microbiology</strong> (Laboratory Systems and Quality Assurance) — Liverpool School of Tropical Medicine, University of Liverpool, UK (October 2005)</li>
            <li><strong>Associate Degree in Medical Laboratory Sciences</strong> (Bacteriology) — School of Medical Laboratory Sciences, University of Calabar, Nigeria (December 1993)</li>
            <li><strong>Bachelor's Degree in Microbiology</strong> — Ahmadu Bello University, Zaria (December 1989)</li>
          </ul>

          <h3 style="margin-top: 30px;">Short Courses</h3>
          <ul class="cv-list">
            <li><strong>Certificate in Medical Mycology</strong> — Mycological Center, Assiut University, Egypt (February 2016)</li>
            <li><strong>Certificate in Infectious Disease Epidemiology &amp; Control Strategies</strong> — Medical Microbiology Department, Bayero University Kano (March 2015)</li>
            <li><strong>Community-Based Medical Education &amp; Problem-Based Learning</strong> — Faculty of Medicine, Suez Canal University, Egypt (March 2004)</li>
            <li><strong>Introductory Computer and Internet Literacy</strong> — CIT, Bayero University Kano (July 2002)</li>
          </ul>
        `,
        experience: `
          <h3>Full-Time Employments</h3>
          <ul class="cv-list">
            <li><strong>Vice Chancellor</strong> — Tazkiyah University Kaduna (TUK), Nigeria (April 2026 – Present)</li>
            <li><strong>Professor and Dean, School of Basic Medical Sciences (SBMS)</strong> — Skyline University Nigeria (SUN), Kano, Nigeria (April 2025 – April 2026)</li>
            <li><strong>Head of Research and Entrepreneurship / Faculty Staff</strong> — LIWA University (formerly Khawarizmi International College), Abu Dhabi, UAE (Sept 2020 – June 2023)</li>
            <li><strong>Team Lead, Fleming Fund Country Grant to Nigeria</strong> — DAI Global, Bethesda, USA (June 2019 – Sept 2020)</li>
            <li><strong>Associate Professor in Health and Medical Sciences</strong> — LIWA University, Abu Dhabi, UAE (Feb 2017 – June 2019)</li>
            <li><strong>Professor and Head of Medical Microbiology</strong> — Bayero University Kano, Nigeria (Jan 2015 – Jan 2017)</li>
            <li><strong>Academic Appointments (Assistant Lecturer to Associate Professor)</strong> — Bayero University Kano, Nigeria (Jan 1995 – Sept 2016)</li>
            <li><strong>Medical Laboratory Scientist</strong> — Murtala Muhammad Specialist Hospital, Kano (Feb 1992 – Dec 1994)</li>
          </ul>

          <h3 style="margin-top: 30px;">Part-Time Employments &amp; Consultancies</h3>
          <ul class="cv-list">
            <li><strong>Acting Provost, College of Health Sciences</strong> — Aliko Dangote University of Science and Technology (ADUSTECH) Wudil, Kano (Dec 2025 – Present)</li>
            <li><strong>Chairman / Chief Executive Officer</strong> — Frontline Biomedical Consultants Limited, Kano (March 2024 – Present)</li>
            <li><strong>National Laboratory Consultant, Global Fund TB Grant</strong> — Association for Reproductive and Family Health, Abuja (Sept 2009 – Feb 2012)</li>
            <li><strong>Co-Investigator</strong> — Fleming Fund, Liverpool School of Tropical Medicine, UK (Mar 2016 – Jun 2016)</li>
            <li><strong>National Malaria Diagnostic Consultant</strong> — UKAid-Funded SuNMaP Program, Abuja (Mar 2012 – Oct 2014)</li>
          </ul>
        `,
        research: `
          <h3>Research Interests</h3>
          <ul class="cv-list">
            <li>The use of biomarkers as diagnostic tools for bacterial and viral infections in community-based evaluation studies.</li>
            <li>Determinants of antimicrobial resistance (AMR) in human, animal, and the environment under a One-health approach.</li>
            <li>Determinants of AMR in COVID-19 Pandemic in Low-and-Middle-income Countries.</li>
            <li>Sepsis: Incidence, Determinants and Outcomes in Kano (SIDOK) based at Aminu Kano Teaching Hospital.</li>
            <li>Health and sickness among nomadic Fulani herders (Malaria, TB, Diabetes, Hypertension).</li>
          </ul>

          <h3 style="margin-top: 30px;">Awards &amp; Appreciation</h3>
          <ul class="cv-list">
            <li><strong>Merit Award for contributions to Literature</strong> — Association of Nigerian Authors (ANA) (2025)</li>
            <li><strong>Recognition Award</strong> — Nigerian Infectious Disease Society (NIDS) (2019)</li>
            <li><strong>Merit Award for contributions to Literature</strong> — Association of Nigerian Authors (ANA) (2017)</li>
          </ul>

          <h3 style="margin-top: 30px;">Positions &amp; Memberships</h3>
          <ul class="cv-list">
            <li>Member, BactiVac Network, University of Birmingham, UK (2023)</li>
            <li>Good Clinical Practice Certification: NIDA Clinical Trials Network (2021)</li>
            <li>Fellow, West African Postgraduate College of Medical Laboratory Science (Bacteriology) (2020)</li>
            <li>Fellow of International Ford Foundation Fellowship Program (Public Health) (2007)</li>
            <li>Elected Fellow of the Royal Society of Tropical Medicine and Hygiene (2007)</li>
            <li>Associate, Medical Laboratory Sciences Council of Nigeria (MLSCN) (1993)</li>
          </ul>
        `,
        publications: `
          <h3>Selected Journals &amp; Publications</h3>
          <ol class="cv-pub-list" style="margin-left: 20px; line-height: 1.7;">
            <li style="margin-bottom: 12px;"><strong>Yunusa A. et al. (2026):</strong> Assessment of Knowledge, Attitude, and Practice of Surgical Hand Scrubbing. <em>West African Journal of Allied Health Sciences</em> 2 (1): 11-17</li>
            <li style="margin-bottom: 12px;"><strong>Yakubu F. Z. et al. (2026):</strong> Interprofessional Work Relationships and Role Conflict in Primary Health Care Settings. <em>Academic Journal of Nursing and Health Education</em> 15 (1): 1-11.</li>
            <li style="margin-bottom: 12px;"><strong>Faruku N., Sarkinfada F. et al. (2024):</strong> Comparative Analysis of Widal Agglutination and Typhoid Humoral Response Assays. <em>Dutse Journal of Pure and Applied Sciences</em> (10) 2a 313-23</li>
            <li style="margin-bottom: 12px;"><strong>Yusuf I. and Sarkinfada F. (2021):</strong> Gaps in the Implementation of COVID-19 mitigation measures. <em>Pan African Medical Journal</em>. 2021;40:12.</li>
            <li style="margin-bottom: 12px;"><strong>Abubakar A. G. et al. (2020):</strong> Prospects and Challenges of Cord Blood Transfusion in Nigeria. <em>Acta Scientific Biotechnology</em> 1.6 (2020): 34-39</li>
            <li style="margin-bottom: 12px;"><strong>Ibrahim S. S. et al. (2020):</strong> Exploring mechanisms of multiple insecticide resistance in malaria vector Anopheles funestus. <em>Genes</em> 2020, 11(4), 454.</li>
            <li style="margin-bottom: 12px;"><strong>Alkali B. et al. (2020):</strong> Correlation of Nosocomial Infection with Prolong Hospital Stays in Kano. <em>Bayero Journal of Pure and Applied Sciences</em>, 12(2): 149 - 155</li>
            <li style="margin-bottom: 12px;"><strong>Usman B., Sarkinfada F. et al. (2019):</strong> Incidence and Susceptibility of H. Influenzae Among Under-5 Years Children. <em>FUDMA Journal of Microbiology</em> 2(1) 76-80.</li>
            <li style="margin-bottom: 12px;"><strong>Alkali Bashir et al. (2019):</strong> Molecular characterization of Acinetobacter baumannii from patients with prolonged hospital stays. <em>African Journal of Microbiology Research</em> 13(27), pp. 510-517</li>
          </ol>
        `
      },
      'bashir-abubakar': {
        name: 'Alh. Bashir Abubakar',
        post: 'Registrar',
        degrees: 'B.Sc. (Public Administration), M.Sc. (Management)',
        avatarUrl: 'images/registrar.png',
        overview: `
          <h3>Introduction</h3>
          <p>Alhaji Bashir Abubakar is an experienced registrar and senior administrative officer with a proven record of managing university registrations, student admissions portfolios, policy formulations, and staff appointments in Nigeria.</p>
          <h3>Professional Summary</h3>
          <p>He is a respected administrator who coordinates closely with student welfare groups and academic planning departments to ensure smooth operations and strict adherence to university regulations.</p>
        `,
        education: `
          <h3>Education &amp; Qualifications</h3>
          <ul class="cv-list">
            <li><strong>M.Sc. in Management</strong> — Ahmadu Bello University, Zaria</li>
            <li><strong>B.Sc. in Public Administration</strong> — Ahmadu Bello University, Zaria</li>
          </ul>
        `,
        experience: `
          <h3>Professional Experience</h3>
          <ul class="cv-list">
            <li><strong>Registrar</strong> — Tazkiyah University, Zaria (2025 – Present)</li>
            <li><strong>Deputy Registrar</strong> — Ahmadu Bello University, Zaria</li>
            <li><strong>Principal Assistant Registrar</strong> — Ahmadu Bello University, Zaria</li>
          </ul>
        `,
        research: `
          <h3>Memberships &amp; Credentials</h3>
          <ul class="cv-list">
            <li>Member, Association of Nigerian University Professional Administrators (ANUPA)</li>
          </ul>
        `
      },
      'abdulrazaq-aliyu': {
        name: 'Mall. Abdulrazaq Aliyu',
        post: 'Bursar',
        degrees: 'B.Sc. (Accounting), MBA (Finance), FCA',
        avatarUrl: 'images/bursar.png',
        overview: `
          <h3>Introduction</h3>
          <p>Mall. Abdulrazaq Aliyu is a highly skilled accountant, treasury director, and financial manager with extensive expertise in university budgeting, audits, asset allocations, and compliance standards.</p>
          <h3>Professional Summary</h3>
          <p>He manages Tazkiyah University's financial portfolio, coordinating directly with government regulatory agencies, external auditing teams, and internal institutional planning groups.</p>
        `,
        education: `
          <h3>Education &amp; Qualifications</h3>
          <ul class="cv-list">
            <li><strong>MBA in Finance</strong> — Ahmadu Bello University, Zaria</li>
            <li><strong>B.Sc. in Accounting</strong> — Ahmadu Bello University, Zaria</li>
            <li><strong>Fellow, Institute of Chartered Accountants of Nigeria (FCA)</strong></li>
          </ul>
        `,
        experience: `
          <h3>Professional Experience</h3>
          <ul class="cv-list">
            <li><strong>Bursar</strong> — Tazkiyah University, Zaria (2025 – Present)</li>
            <li><strong>Director of Treasury</strong> — Kaduna State Finance Ministry</li>
            <li><strong>Chief Accountant</strong> — Ahmadu Bello University Teaching Hospital</li>
            <li><strong>Senior Auditor</strong> — KPMG Nigeria</li>
          </ul>
        `,
        research: `
          <h3>Publications &amp; Memberships</h3>
          <ul class="cv-list">
            <li>Fellow, Institute of Chartered Accountants of Nigeria (ICAN)</li>
            <li>Member, Association of National Accountants of Nigeria (ANAN)</li>
            <li>Publication: <em>"Financial Sustainability and Treasury Management in Tertiary Education"</em> (2023)</li>
          </ul>
        `
      },
      'yaseer': {
        name: 'Dr. Yaseer',
        post: 'Director of Academic Planning',
        degrees: 'B.Sc. (Ed. Chemistry), M.Ed., Ph.D. (Curriculum Studies)',
        avatarUrl: 'images/director.png',
        overview: `
          <h3>Introduction</h3>
          <p>Dr. Yaseer is an expert academic planner and curriculum developer, focusing on STEM instructional design, pedagogical advancements, and syllabus audit processes in higher education.</p>
          <h3>Professional Summary</h3>
          <p>He leads Tazkiyah University's curriculum reviews, lecture scheduling programs, regulatory reviews, and institutional alignment initiatives with the National Universities Commission (NUC).</p>
        `,
        education: `
          <h3>Education &amp; Qualifications</h3>
          <ul class="cv-list">
            <li><strong>Ph.D. in Curriculum Studies</strong> — Ahmadu Bello University, Zaria</li>
            <li><strong>M.Ed. in Science Education</strong> — Ahmadu Bello University, Zaria</li>
            <li><strong>B.Sc. (Ed) in Chemistry</strong> — Usmanu Danfodiyo University, Sokoto</li>
          </ul>
        `,
        experience: `
          <h3>Professional Experience</h3>
          <ul class="cv-list">
            <li><strong>Director, Academic Planning</strong> — Tazkiyah University, Zaria (2025 – Present)</li>
            <li><strong>Senior Lecturer (Curriculum Studies)</strong> — Kaduna State University</li>
            <li><strong>Lecturer I</strong> — Ahmadu Bello University, Zaria</li>
          </ul>
        `,
        research: `
          <h3>Publications &amp; Memberships</h3>
          <ul class="cv-list">
            <li>Member, Science Teachers Association of Nigeria (STAN)</li>
            <li>Member, Curriculum Organization of Nigeria (CON)</li>
            <li>Publication: <em>"Curriculum design and pedagogical developments in northern Nigerian STEM institutions"</em> (2022)</li>
          </ul>
        `
      },
      'ibrahim-jamilu': {
        name: 'Dr. Ibrahim Jamilu',
        post: 'University Librarian',
        degrees: 'B.Sc. (Library Science), M.Sc., Ph.D. (Information Management)',
        avatarUrl: 'images/librarian.png',
        overview: `
          <h3>Introduction</h3>
          <p>Dr. Ibrahim Jamilu is a professional academic librarian and information scientist with over 20 years of experience designing and managing modern digital and physical library infrastructures in Nigerian universities.</p>
          <h3>Professional Summary</h3>
          <p>He coordinates academic resource acquisitions, cataloging systems, and digital research databases to ensure students and faculty have access to state-of-the-art information facilities.</p>
        `,
        education: `
          <h3>Education &amp; Qualifications</h3>
          <ul class="cv-list">
            <li><strong>Ph.D. in Information Management</strong> — Ahmadu Bello University, Zaria</li>
            <li><strong>M.Sc. in Library &amp; Information Science</strong> — Ahmadu Bello University, Zaria</li>
            <li><strong>B.Sc. in Library Science</strong> — Bayero University, Kano</li>
          </ul>
        `,
        experience: `
          <h3>Professional Experience</h3>
          <ul class="cv-list">
            <li><strong>University Librarian</strong> — Tazkiyah University, Zaria (2025 – Present)</li>
            <li><strong>Deputy Librarian</strong> — Kaduna State University</li>
            <li><strong>Senior Librarian</strong> — Ahmadu Bello University, Zaria</li>
          </ul>
        `,
        research: `
          <h3>Publications &amp; Memberships</h3>
          <ul class="cv-list">
            <li>Member, Librarian Registration Council of Nigeria (LRCN)</li>
            <li>Member, Nigerian Library Association (NLA)</li>
          </ul>
        `
      }
    };

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-admin');
        const cv = adminCVs[id];
        if (cv) {
          showModal(cv);
        }
      });
    });

    function showModal(cv) {
      modalContainer.innerHTML = `
        <div class="cv-modal modal-tabbed">
          <button class="cv-modal-close" aria-label="Close Profile">&times;</button>
          <div class="cv-modal-header-brand">
            <img src="${cv.avatarUrl || 'images/vc.png'}" class="cv-modal-avatar" alt="${cv.name}">
            <div class="cv-modal-header-text">
              <h2 style="margin:0;font-size:1.45rem;color:var(--primary);font-family:var(--font-heading);">${cv.name}</h2>
              <p class="cv-modal-post" style="margin:2px 0 4px;font-size:0.88rem;color:var(--accent-dark);font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${cv.post}</p>
              <p class="cv-modal-degrees" style="margin:0;font-size:0.78rem;color:var(--text-medium);">${cv.degrees}</p>
            </div>
          </div>
          <div class="cv-modal-container">
            <div class="cv-modal-sidebar">
              <button class="cv-tab-btn active" data-tab="overview">Overview</button>
              <button class="cv-tab-btn" data-tab="education">Education</button>
              <button class="cv-tab-btn" data-tab="experience">Experience</button>
              <button class="cv-tab-btn" data-tab="research">Research &amp; Awards</button>
              ${cv.publications ? `<button class="cv-tab-btn" data-tab="publications">Publications</button>` : ''}
            </div>
            <div class="cv-modal-content-panel">
              <div class="cv-tab-content active" id="tab-overview">${cv.overview}</div>
              <div class="cv-tab-content" id="tab-education">${cv.education}</div>
              <div class="cv-tab-content" id="tab-experience">${cv.experience}</div>
              <div class="cv-tab-content" id="tab-research">${cv.research}</div>
              ${cv.publications ? `<div class="cv-tab-content" id="tab-publications">${cv.publications}</div>` : ''}
            </div>
          </div>
        </div>
      `;

      // Bind tabs events
      const tabBtns = modalContainer.querySelectorAll('.cv-tab-btn');
      const tabContents = modalContainer.querySelectorAll('.cv-tab-content');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const tabId = btn.getAttribute('data-tab');
          tabBtns.forEach(b => b.classList.remove('active'));
          tabContents.forEach(c => c.classList.remove('active'));

          btn.classList.add('active');
          modalContainer.querySelector(`#tab-${tabId}`).classList.add('active');
        });
      });

      modalContainer.classList.add('active');
      document.body.style.overflow = 'hidden';

      const closeBtn = modalContainer.querySelector('.cv-modal-close');
      closeBtn.addEventListener('click', closeModal);
      modalContainer.addEventListener('click', e => {
        if (e.target === modalContainer) {
          closeModal();
        }
      });
    }

    function closeModal() {
      modalContainer.classList.remove('active');
      document.body.style.overflow = '';
      modalContainer.innerHTML = '';
    }
  }

  function buildCTA() {
    return `
      <section class="cta-section" style="padding:70px 0;">
        <div class="container">
          <div class="cta-inner">
            <h2>Ready to Join Tazkiyah?</h2>
            <p>Applications for the 2026/2027 academic session are now open.<br>Take the first step today.</p>
            <div class="cta-btns">
              <a href="/admissions" class="btn btn-dark">Apply Now →</a>
              <a href="/contact" class="btn btn-dark-outline">Contact Us</a>
            </div>
          </div>
        </div>
      </section>`;
  }

  function buildNotFound(slug) {
    return `
      <div class="not-found">
        <div class="not-found-icon">🔍</div>
        <h2>Page Not Found</h2>
        <p>The page "<strong>${slug}</strong>" could not be found. It may not be published yet or the link may be incorrect.</p>
        <a href="/" class="btn btn-dark">← Return Home</a>
      </div>`;
  }

  return { render };

})();
