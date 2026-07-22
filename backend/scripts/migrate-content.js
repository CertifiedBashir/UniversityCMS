/**
 * migrate-content.js
 * One-time migration: replaces placeholder data with real
 * Tazkiyah University content (Zaria, Kaduna State).
 * Run: node scripts/migrate-content.js
 */

const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const Menu     = require('../models/Menu');
const Carousel = require('../models/Carousel');
const Page     = require('../models/Page');

async function migrate() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB — starting migration...');

  /* ── Clear existing seed data ─────────────────────────────── */
  await Promise.all([
    Menu.deleteMany({}),
    Carousel.deleteMany({}),
    Page.deleteMany({})
  ]);
  console.log('Cleared existing menus, carousel & pages.');

  /* ── Menus ────────────────────────────────────────────────── */
  await Menu.insertMany([
    { title: 'About',              slug: 'about',      order: 1, isActive: true },
    { title: 'Faculties & Courses',slug: 'programs',   order: 2, isActive: true },
    { title: 'Academics',          slug: 'academics',  order: 3, isActive: true },
    { title: 'Admissions',         slug: 'admissions', order: 4, isActive: true },
    { title: 'News & Events',      slug: 'news',       order: 5, isActive: true },
    { title: 'Contact',            slug: 'contact',    order: 6, isActive: true }
  ]);
  console.log('Menus inserted.');

  /* ── Carousel ─────────────────────────────────────────────── */
  await Carousel.insertMany([
    {
      title:       "Nigeria's First\nAll-Female University",
      subtitle:    'Welcome to Tazkiyah University',
      description: 'A pioneering institution in Zaria, Kaduna State, combining academic excellence with moral and spiritual character development for female students.',
      imageUrl:    '',
      buttonText:  'Explore Faculties',
      buttonLink:  '#/programs',
      order:       1,
      isActive:    true
    },
    {
      title:       'World-Class\nDegree Programs',
      subtitle:    'Three Faculties. Twelve Courses.',
      description: 'From Allied Health Sciences and Computing to Management & Social Sciences — discover programs that shape careers and serve society.',
      imageUrl:    '',
      buttonText:  'View Faculties',
      buttonLink:  '#/programs',
      order:       2,
      isActive:    true
    },
    {
      title:       'Apply Now for\n2025/2026 Session',
      subtitle:    'Admissions Open',
      description: 'JAMB score of 150 and above? Seven O\'Level credits including Mathematics and English? Your place at Tazkiyah University awaits.',
      imageUrl:    '',
      buttonText:  'Apply Now',
      buttonLink:  '#/admissions',
      order:       3,
      isActive:    true
    }
  ]);
  console.log('Carousel inserted.');

  /* ── Pages ────────────────────────────────────────────────── */
  await Page.insertMany([

    /* ── About ── */
    {
      title:    'About Tazkiyah University',
      slug:     'about',
      isActive: true,
      content:  `
<h2>Who We Are</h2>
<p>Tazkiyah University is Nigeria's first approved all-female university, located at its take-off site on Chikaji Road, Zaria, Kaduna State, with a permanent campus planned for Kaduna city. Founded by <strong>Professor Ibrahim Maqari</strong>, the university is built on the conviction that women deserve a world-class tertiary education that also nurtures their moral and spiritual character.</p>

<h2>Our Mission</h2>
<p>To provide a transformative university education that empowers women with the knowledge, skills, and values needed to excel professionally, contribute meaningfully to society, and lead lives of integrity and purpose.</p>

<h2>Our Vision</h2>
<p>To be the leading all-female university in Africa — recognized for academic excellence, groundbreaking research, and the holistic development of women as agents of positive change.</p>

<h2>Why Tazkiyah University?</h2>
<ul>
  <li><strong>Historic:</strong> Nigeria's first officially approved all-female university</li>
  <li><strong>Holistic:</strong> Academic rigor combined with moral and spiritual formation</li>
  <li><strong>Modern:</strong> Programmes aligned with Nigeria's growing sectors — health, technology, and business</li>
  <li><strong>Safe Environment:</strong> A dedicated, secure, and inclusive campus for women to thrive</li>
  <li><strong>JAMB-Approved:</strong> Fully accredited and recognized by relevant regulatory bodies</li>
</ul>

<h2>Campus & Location</h2>
<p>The university currently operates from its take-off site on <strong>Chikaji Road, Zaria, Kaduna State</strong>. A permanent campus is being developed in Kaduna city to accommodate the university's growing academic programmes and student population.</p>

<h2>Our Founder</h2>
<p>Tazkiyah University was established through the vision and dedication of <strong>Professor Ibrahim Maqari</strong>, a respected academic and advocate for women's education in Nigeria. His founding philosophy holds that true education must cultivate both the intellect and the character.</p>

<blockquote>"Educating a woman is educating a nation." — A core philosophy at Tazkiyah University</blockquote>
`
    },

    /* ── Faculties ── */
    {
      title:    'Our Academic Faculties',
      slug:     'faculties',
      isActive: true,
      content:  `
<p class="lead-text" style="font-size:1.15rem; color:var(--text-medium); text-align:center; max-width:800px; margin:0 auto 40px;">Tazkiyah University currently offers degree programmes across three dynamic faculties, with courses carefully chosen to address Nigeria's most critical professional sectors.</p>

<div class="faculties-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:30px; margin-top:40px;">
  
  <div class="faculty-index-card" style="background:var(--white); border-radius:var(--radius); border:1px solid var(--border); padding:40px 30px; display:flex; flex-direction:column; transition:var(--transition); box-shadow:var(--shadow-sm);">
    <div class="faculty-icon" style="font-size:3rem; margin-bottom:20px;">🏥</div>
    <h3 style="font-family:var(--font-heading); color:var(--primary); font-size:1.4rem; margin-bottom:12px;">Faculty of Allied Health Sciences</h3>
    <p style="font-size:0.92rem; color:var(--text-medium); line-height:1.6; margin-bottom:24px; flex-grow:1;">Training compassionate, highly skilled healthcare professionals to serve communities across Nigeria and beyond.</p>
    <a href="#/faculty-allied-health" class="btn btn-dark-outline" style="width:100%; justify-content:center;">Explore Faculty →</a>
  </div>

  <div class="faculty-index-card" style="background:var(--white); border-radius:var(--radius); border:1px solid var(--border); padding:40px 30px; display:flex; flex-direction:column; transition:var(--transition); box-shadow:var(--shadow-sm);">
    <div class="faculty-icon" style="font-size:3rem; margin-bottom:20px;">💻</div>
    <h3 style="font-family:var(--font-heading); color:var(--primary); font-size:1.4rem; margin-bottom:12px;">Faculty of Science &amp; Computing</h3>
    <p style="font-size:0.92rem; color:var(--text-medium); line-height:1.6; margin-bottom:24px; flex-grow:1;">Preparing women to lead in Africa's fastest-growing sector with cutting-edge computing and applied science degrees.</p>
    <a href="#/faculty-science-computing" class="btn btn-dark-outline" style="width:100%; justify-content:center;">Explore Faculty →</a>
  </div>

  <div class="faculty-index-card" style="background:var(--white); border-radius:var(--radius); border:1px solid var(--border); padding:40px 30px; display:flex; flex-direction:column; transition:var(--transition); box-shadow:var(--shadow-sm);">
    <div class="faculty-icon" style="font-size:3rem; margin-bottom:20px;">📊</div>
    <h3 style="font-family:var(--font-heading); color:var(--primary); font-size:1.4rem; margin-bottom:12px;">Faculty of Management &amp; Social Sciences</h3>
    <p style="font-size:0.92rem; color:var(--text-medium); line-height:1.6; margin-bottom:24px; flex-grow:1;">Developing Nigeria's next generation of ethical business leaders, economists, and social entrepreneurs.</p>
    <a href="#/faculty-management-social" class="btn btn-dark-outline" style="width:100%; justify-content:center;">Explore Faculty →</a>
  </div>

</div>
`
    },

    /* ── Admissions ── */
    {
      title:    'Admissions',
      slug:     'admissions',
      isActive: true,
      content:  `
<h2>Admissions — 2025/2026 Academic Session</h2>
<p>Tazkiyah University is now accepting applications from qualified female candidates for the 2025/2026 academic session. We invite you to join our pioneering community of women committed to excellence.</p>

<h2>Eligibility Criteria</h2>
<ul>
  <li><strong>Gender:</strong> All applicants must be female (Tazkiyah University is an all-female institution)</li>
  <li><strong>JAMB Score:</strong> A minimum score of <strong>150</strong> in the Joint Admissions and Matriculation Board (JAMB) Unified Tertiary Matriculation Examination (UTME)</li>
  <li><strong>O'Level Results:</strong> At least <strong>seven (7) O'Level credits</strong>, including credits in <strong>Mathematics</strong> and <strong>English Language</strong> (WAEC, NECO, or GCE)</li>
</ul>

<h2>How to Apply</h2>
<ol>
  <li>
    <strong>Change of Institution (if applicable):</strong>
    If Tazkiyah University was not your initial JAMB institution, visit any <strong>accredited CBT centre</strong> to process a Change of Institution to Tazkiyah University before applying.
  </li>
  <li>
    <strong>Visit the Admission Portal:</strong>
    Go to the official <strong>Tazkiyah University Admission Portal</strong>, create a personal account, and complete your profile.
  </li>
  <li>
    <strong>Generate an Application Invoice:</strong>
    Once registered, generate your application invoice and proceed with the required payment to submit your application.
  </li>
  <li>
    <strong>Submit Your Application:</strong>
    Complete and submit your application form online, uploading all required documents.
  </li>
  <li>
    <strong>Await Your Offer:</strong>
    Shortlisted candidates will be contacted for the next stage of the admissions process.
  </li>
</ol>

<h2>Required Documents</h2>
<ul>
  <li>JAMB result slip (showing a minimum score of 150)</li>
  <li>O'Level result(s) — WAEC, NECO, or GCE (minimum 7 credits)</li>
  <li>Birth certificate or sworn affidavit of age</li>
  <li>Local Government Identification Letter (LGA of Origin)</li>
  <li>Two recent passport photographs</li>
  <li>Certificate of Change of Institution (if applicable)</li>
</ul>

<h2>Faculty-Specific Requirements</h2>
<p>Some faculties may have additional subject requirements at O'Level. Please verify requirements for your chosen programme:</p>
<ul>
  <li><strong>Allied Health Sciences:</strong> Credits in Biology, Chemistry, and Physics (or Agricultural Science)</li>
  <li><strong>Science &amp; Computing:</strong> Credits in Mathematics, Physics, and Chemistry or Further Mathematics</li>
  <li><strong>Management &amp; Social Sciences:</strong> Credits in Mathematics, English, and any three Social Science or Commercial subjects</li>
</ul>

<blockquote>
  For enquiries, contact our Admissions Office: admissions@tazkiyah.edu.ng or call +234 800 123 4567.<br>
  Located at: Chikaji Road, Zaria, Kaduna State.
</blockquote>
`
    },

    /* ── News ── */
    {
      title:    'News & Events',
      slug:     'news',
      isActive: true,
      content:  `
<h2>Latest News</h2>

<h3>🎓 Tazkiyah University Begins Maiden Academic Session</h3>
<p><em>Published: 2025</em></p>
<p>Tazkiyah University has officially commenced its maiden academic session, welcoming its pioneer students across the three founding faculties: Allied Health Sciences, Science &amp; Computing, and Management &amp; Social Sciences. This historic milestone marks the beginning of a new chapter in women's university education in Nigeria.</p>

<h3>🏛️ Nigeria's First All-Female University Receives Full Approval</h3>
<p><em>Published: 2024</em></p>
<p>Tazkiyah University made history as it received full government approval to operate as Nigeria's first all-female university. Founded by Professor Ibrahim Maqari, the institution was established with a clear mandate to provide women with world-class higher education in a safe, values-driven environment.</p>

<h3>📋 Admissions Open for 2025/2026 Session</h3>
<p><em>Published: Ongoing</em></p>
<p>Tazkiyah University is currently accepting applications from qualified female candidates for the 2025/2026 academic session. Candidates who scored a minimum of 150 in JAMB and have at least seven O'Level credits (including Mathematics and English) are encouraged to apply through the official admission portal.</p>

<h2>Upcoming Events</h2>
<ul>
  <li><strong>Campus Open Day</strong> — Prospective students and parents are invited to tour the campus on Chikaji Road, Zaria</li>
  <li><strong>Matriculation Ceremony</strong> — Official induction of pioneer students into Tazkiyah University</li>
  <li><strong>Admissions Deadline</strong> — All applications must be submitted through the official portal before the published deadline</li>
</ul>
`
    },

    /* ── Contact ── */
    {
      title:    'Contact Us',
      slug:     'contact',
      isActive: true,
      content:  `
<h2>Get in Touch</h2>
<p>We welcome enquiries from prospective students, parents, and members of the public. Our admissions and student services teams are available to assist you.</p>

<h2>Contact Information</h2>
<ul>
  <li>📍 <strong>Take-off Campus:</strong> Chikaji Road, Zaria, Kaduna State, Nigeria</li>
  <li>📍 <strong>Permanent Campus (in development):</strong> Kaduna City, Kaduna State</li>
  <li>📞 <strong>Phone:</strong> +234 800 123 4567</li>
  <li>✉️ <strong>General Enquiries:</strong> info@tazkiyah.edu.ng</li>
  <li>✉️ <strong>Admissions:</strong> admissions@tazkiyah.edu.ng</li>
  <li>🕒 <strong>Office Hours:</strong> Monday – Friday, 8:00am – 4:00pm</li>
</ul>

<h2>Departments</h2>
<ul>
  <li><strong>Vice-Chancellor's Office:</strong> vc@tazkiyah.edu.ng</li>
  <li><strong>Admissions Office:</strong> admissions@tazkiyah.edu.ng</li>
  <li><strong>Academic Affairs:</strong> academics@tazkiyah.edu.ng</li>
  <li><strong>Student Services:</strong> students@tazkiyah.edu.ng</li>
  <li><strong>Finance &amp; Bursary:</strong> finance@tazkiyah.edu.ng</li>
</ul>

<h2>Visit Us</h2>
<p>Prospective students and parents are welcome to visit the campus on <strong>Chikaji Road, Zaria, Kaduna State</strong>. Campus visits are available on weekdays between 9:00am and 3:00pm. Please schedule your visit in advance by emailing or calling the Admissions Office.</p>

<h2>For JAMB Change of Institution</h2>
<p>If you wish to change your JAMB institution to Tazkiyah University, please visit any <strong>accredited CBT centre</strong> near you. Our Admissions Office can provide guidance through this process — feel free to contact us for support.</p>

<blockquote>We look forward to welcoming you to Tazkiyah University — Nigeria's first all-female university, located in the heart of Zaria, Kaduna State.</blockquote>
`
    }

  ,

    /* ── Faculty: Allied Health ── */
    {
      title:    'Faculty of Allied Health Sciences',
      slug:     'faculty-allied-health',
      isActive: true,
      content:  `
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

    /* ── Faculty: Science & Computing ── */
    {
      title:    'Faculty of Science & Computing',
      slug:     'faculty-science-computing',
      isActive: true,
      content:  `
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

    /* ── Faculty: Management & Social Sciences ── */
    {
      title:    'Faculty of Management & Social Sciences',
      slug:     'faculty-management-social',
      isActive: true,
      content:  `
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

  ]);
  console.log('Pages inserted (8 pages).');

  console.log('\n✅ Migration complete! Restart your backend server to confirm.');
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
