const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const path = require('path');

mongoose.set('bufferCommands', false);

const User = require('./models/User');
const Menu = require('./models/Menu');
const Carousel = require('./models/Carousel');
const Page = require('./models/Page');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const carouselRoutes = require('./routes/carouselRoutes');
const pageRoutes = require('./routes/pageRoutes');

// MongoDB Atlas connection configuration — ready
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/api/pages', pageRoutes);

// SPA fallback: serve index.html for non-API client routes on page refresh
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    return res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
  }
  next();
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tazkiyah_cms';

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    try {
      /* ── Super Admin ──────────────────────────────── */
      const superAdminExists = await User.findOne({ role: 'Super Admin' });
      if (!superAdminExists) {
        const hashedPassword = await bcrypt.hash('superadmin123', 10);
        await User.create({
          name: 'Super Admin',
          email: 'admin@tazkiyah.edu.ng',
          password: hashedPassword,
          role: 'Super Admin'
        });
        console.log('Super Admin created — admin@tazkiyah.edu.ng / superadmin123');
      }

      /* ── Menus ────────────────────────────────────── */
      await Menu.deleteMany({ slug: 'programs' });
      const academicsExists = await Menu.findOne({ slug: 'academics' });
      if (!academicsExists) {
        await Menu.create({ title: 'Academics', slug: 'academics', order: 3, isActive: true });
      }

      const menuCount = await Menu.countDocuments();
      if (menuCount === 0) {
        await Menu.insertMany([
          { title: 'About Us', slug: 'about', order: 1, isActive: true },
          { title: 'Academics', slug: 'academics', order: 2, isActive: true },
          { title: 'Admissions', slug: 'admissions', order: 3, isActive: true },
          { title: 'News & Events', slug: 'news', order: 4, isActive: true },
          { title: 'Contact Us', slug: 'contact', order: 5, isActive: true }
        ]);
        console.log('Menus seeded');
      }

      /* ── Carousel ─────────────────────────────────── */
      const carouselCount = await Carousel.countDocuments();
      if (carouselCount === 0) {
        await Carousel.insertMany([
          {
            title: 'Empowering Minds,\nNurturing Souls',
            subtitle: 'Welcome to Tazkiyah',
            description: 'A premier Islamic educational institution dedicated to holistic development through faith, knowledge, and character.',
            imageUrl: '',
            buttonText: 'Explore Faculties',
            buttonLink: '/faculties',
            order: 1,
            isActive: true
          },
          {
            title: 'World-Class\nIslamic Education',
            subtitle: 'Academic Excellence',
            description: 'Our curriculum integrates rigorous Islamic studies with modern academics, preparing graduates for global success.',
            imageUrl: '',
            buttonText: 'Our Faculties',
            buttonLink: '/faculties',
            order: 2,
            isActive: true
          },
          {
            title: 'Begin Your Journey\nToday',
            subtitle: 'Admissions 2026/2027',
            description: 'Applications are now open for the 2026/2027 academic session. Limited spots available — apply now.',
            imageUrl: '',
            buttonText: 'Apply Now',
            buttonLink: '/admissions',
            order: 3,
            isActive: true
          }
        ]);
        console.log('Carousel seeded');
      } else {
        await Carousel.updateMany({ buttonLink: '#/programs' }, { buttonLink: '/faculties' });
        await Carousel.updateMany({ buttonLink: '#/admissions' }, { buttonLink: '/admissions' });
        await Carousel.updateMany({ buttonLink: '/programs' }, { buttonLink: '/faculties' });
      }

      /* ── Pages ────────────────────────────────────── */
      const pageCount = await Page.countDocuments();
      if (pageCount === 0) {
        await Page.insertMany([
          {
            title: 'About Us',
            slug: 'about',
            isActive: true,
            content: `
<h2>Our Story</h2>
<p>Tazkiyah Islamic School was founded over 25 years ago with a clear vision: to establish an institution where Islamic education and academic excellence coexist harmoniously. What began as a small Quranic school has grown into a full-fledged educational institution serving over 2,000 students.</p>

<h2>Our Mission</h2>
<p>To provide a comprehensive, high-quality Islamic education that develops the intellectual, spiritual, moral, and physical potential of every student — producing graduates who are confident, competent, and committed Muslims.</p>

<h2>Our Vision</h2>
<p>To be the leading Islamic educational institution in West Africa, recognized for academic excellence, spiritual development, and producing leaders who positively impact their communities and the global Ummah.</p>

<h2>Core Values</h2>
<ul>
  <li><strong>Taqwa (God-consciousness)</strong> — Everything we do is rooted in awareness of Allah</li>
  <li><strong>Ilm (Knowledge)</strong> — We pursue excellence in both Islamic and secular knowledge</li>
  <li><strong>Adab (Character)</strong> — Good manners and ethical conduct are non-negotiable</li>
  <li><strong>Khidmah (Service)</strong> — We train students to serve their communities and the Ummah</li>
</ul>

<h2>Leadership</h2>
<p>Our school is led by a team of experienced Islamic scholars and education professionals deeply committed to the institution's mission and values.</p>

<blockquote>"Seeking knowledge is obligatory upon every Muslim." — Prophet Muhammad ﷺ</blockquote>
`
          },
          {
            title: 'Programs',
            slug: 'programs',
            isActive: true,
            content: `
<h2>Our Academic Programs</h2>
<p>Tazkiyah Islamic School offers a diverse range of programs designed to cater to students at every level and stage of their educational journey.</p>

<h2>Hifz Al-Qur'an Program</h2>
<p>Our flagship program provides students with the opportunity to memorize the entire Quran under the supervision of certified Huffaz in a nurturing, structured environment.</p>
<ul>
  <li>Duration: 2–4 years (depending on pace)</li>
  <li>Age group: 8–18 years</li>
  <li>Daily Quran sessions — morning &amp; evening</li>
  <li>Certified Huffaz as instructors</li>
  <li>Tajweed and tarteel coaching included</li>
</ul>

<h2>Islamic Studies Program</h2>
<p>A comprehensive curriculum covering the major Islamic sciences: Fiqh, Aqeedah, Hadith Sciences, Tafseer, Seerah, and Islamic History.</p>
<ul>
  <li>Duration: 3 years</li>
  <li>Age: 14+ years</li>
  <li>Taught by qualified Islamic scholars</li>
  <li>Certificate recognized by leading Islamic universities</li>
</ul>

<h2>Arabic Language Program</h2>
<p>Master classical and modern Arabic through our intensive, immersive language courses using proven pedagogical methods including communicative and grammatical approaches.</p>

<h2>Secondary Education (JSS/SSS)</h2>
<p>Our WAEC-accredited secondary school integrates Islamic values throughout the standard Nigerian curriculum. Students sit for national examinations and consistently achieve excellent results.</p>

<h2>Teacher Training Program</h2>
<p>A one-year intensive program training aspiring Islamic educators in modern teaching methodologies combined with strong Islamic knowledge foundations.</p>

<h2>Online Learning</h2>
<p>For students unable to attend in person, we offer a range of live online courses taught by our faculty with interactive sessions, accessible globally.</p>
`
          },
          {
            title: 'Admissions',
            slug: 'admissions',
            isActive: true,
            content: `
<h2>Admissions 2026/2027</h2>
<p>We are now accepting applications for the 2026/2027 academic session. We welcome students who are passionate about Islamic education and committed to academic excellence.</p>

<h2>How to Apply</h2>
<ol>
  <li>Complete the application form (available at our office or online)</li>
  <li>Submit all required documents listed below</li>
  <li>Pay the non-refundable application fee of ₦5,000</li>
  <li>Attend the entrance assessment (date communicated after submission)</li>
  <li>Receive admission decision within 2 weeks of assessment</li>
</ol>

<h2>Required Documents</h2>
<ul>
  <li>Completed application form</li>
  <li>Birth certificate or age declaration</li>
  <li>Previous school report cards (last 2 years)</li>
  <li>School leaving certificate (for secondary applicants)</li>
  <li>2 recent passport photographs</li>
  <li>Letter of recommendation from previous school or local Imam</li>
</ul>

<h2>Tuition &amp; Fees</h2>
<p>Our fees are structured to be accessible while maintaining the highest quality of education. Scholarship opportunities are available for deserving students. Please contact our admissions office for the current fee schedule.</p>

<h2>Key Dates</h2>
<ul>
  <li><strong>Application Opens:</strong> September 1, 2026</li>
  <li><strong>Application Deadline:</strong> December 31, 2026</li>
  <li><strong>Entrance Assessment:</strong> January 15–20, 2027</li>
  <li><strong>Admission Decisions:</strong> February 1, 2027</li>
  <li><strong>Session Begins:</strong> January 26, 2027</li>
</ul>

<blockquote>For inquiries, contact our Admissions Office at admissions@tazkiyah.edu.ng or call +234 800 123 4567.</blockquote>
`
          },
          {
            title: 'News & Events',
            slug: 'news',
            isActive: true,
            content: `
<h2>Latest News</h2>

<h3>🏆 Tazkiyah Students Excel at National Quran Competition</h3>
<p><em>Published: July 10, 2026</em></p>
<p>Six students from our Hifz program represented Tazkiyah at the National Quran Memorization Competition held in Abuja and returned with three gold medals and two silver medals. We congratulate all participating students on their outstanding performance and thank their teachers and families for their continued support.</p>

<h3>📚 New Arabic Language Center Inaugurated</h3>
<p><em>Published: June 28, 2026</em></p>
<p>We are pleased to announce the inauguration of our new state-of-the-art Arabic Language Center, equipped with modern language laboratories, digital learning tools, and a comprehensive Arabic library. The center will serve over 300 students enrolled in our Arabic program.</p>

<h3>🎓 Graduation Ceremony 2026 — A Night to Remember</h3>
<p><em>Published: June 1, 2026</em></p>
<p>Over 200 students from various programs graduated at our 2026 Graduation Ceremony. The event was attended by parents, scholars, and community dignitaries. We congratulate the Class of 2026 and wish them the very best in their future endeavors.</p>

<h2>Upcoming Events</h2>
<ul>
  <li><strong>September 1, 2026</strong> — New Academic Session Begins</li>
  <li><strong>September 15, 2026</strong> — Open Day &amp; Campus Tour</li>
  <li><strong>October 20, 2026</strong> — Annual Qur'an Recitation Competition</li>
  <li><strong>December 2026</strong> — End of First Term Examinations</li>
</ul>
`
          },
          {
            title: 'Contact Us',
            slug: 'contact',
            isActive: true,
            content: `
<h2>Get in Touch</h2>
<p>We would love to hear from you. Whether you have questions about our programs, admissions, or general inquiries — our team is here to help.</p>

<h2>Contact Information</h2>
<ul>
  <li>📍 <strong>Address:</strong> No. 12 Islamic Way, Kano State, Nigeria</li>
  <li>📞 <strong>Phone:</strong> +234 800 123 4567</li>
  <li>✉️ <strong>Email:</strong> info@tazkiyah.edu.ng</li>
  <li>🌐 <strong>Admissions:</strong> admissions@tazkiyah.edu.ng</li>
  <li>🕒 <strong>Office Hours:</strong> Monday – Friday, 8:00am – 4:00pm</li>
</ul>

<h2>Departments</h2>
<ul>
  <li><strong>Principal's Office:</strong> principal@tazkiyah.edu.ng</li>
  <li><strong>Admissions:</strong> admissions@tazkiyah.edu.ng</li>
  <li><strong>Academics:</strong> academics@tazkiyah.edu.ng</li>
  <li><strong>Finance:</strong> finance@tazkiyah.edu.ng</li>
</ul>

<h2>Visit Us</h2>
<p>We welcome prospective students and parents to visit our campus. Campus tours are available every Saturday between 10:00am and 2:00pm. Please book ahead by calling or emailing our admissions office.</p>

<h2>For JAMB Change of Institution</h2>
<p>If you wish to change your JAMB institution to Tazkiyah University, please visit any <strong>accredited CBT centre</strong> near you. Our Admissions Office can provide guidance through this process — feel free to contact us for support.</p>

<blockquote>For the quickest response, send us an email and we will get back to you within 24 working hours.</blockquote>
`
          }
        ]);
        console.log('Pages seeded (5 pages)');
      }

    } catch (seedErr) {
      console.error('Seeding error:', seedErr);
    }
  } catch (err) {
    console.error('Failed to connect to MongoDB — Running in OFFLINE/FALLBACK mode:', err.message);
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

startServer();
