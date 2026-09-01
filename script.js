(function(){
  "use strict";
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // I18N — translation dictionary (id / en)
  var translations = {
    id: {
      'meta.title': 'Rizky V. Permana',
      'meta.description': 'Rizky V. Permana Web Developer & Data Specialist di Bandung. Mengerjakan web design, pengembangan website, dan pengolahan data. Di waktu luang, saya belajar cybersecurity, terutama malware analysis dan reverse engineering.',
      'skip.link': 'Lompat ke konten utama',
      'aria.back_to_top': 'Kembali ke atas',
      'aria.nav_toggle': 'Buka menu navigasi',
      'nav.projects': '~/projects',
      'nav.skills': '~/skills',
      'nav.experience': '~/experience',
      'nav.about': '~/about',
      'nav.contact': '~/contact',
      'cta.contact': 'Hubungi Saya',
      'hero.badge': 'Terbuka untuk proyek freelance',
      'hero.location': 'Kota Bandung · 2026',
      'hero.lead': 'Mengerjakan website dan data untuk kebutuhan klien mulai dari web design, pengembangan website, sampai pengolahan dan pembersihan data. Di luar pekerjaan utama, saya belajar cybersecurity sebagai hobi, dengan fokus saya sekarang pada malware analysis, C, dan reverse engineering.',
      'hero.cta_primary': 'Projects →',
      'hero.scroll': 'SCROLL',
      'stats.langs.label': 'Bahasa Pemrograman',
      'stats.security.label': 'Sejak 2019 Ekplorasi',
      'stats.security.desc': 'Web Security, Pentest, Malware Analisis, Reverse Engineering',
      'stats.experience.label': 'Tahun Pengalaman',
      'stats.experience.desc': 'Administrasi data, pelaporan & pengembangan web',
      'stats.clients.label': 'Website Dibangun',
      'stats.clients.desc': 'Company profile & e-commerce sejak 2021',
      'skills.heading': 'Skills',
      'skills.th_service': 'SKILLS',
      'skills.data.desc': 'Microsoft Excel · Word · Validasi, Entry, & Rapi-rapi Data',
      'skills.crypto.desc': 'Static & dynamic analysis, fuzzing dasar (AFL++)',
      'projects.eyebrow': '$ ls ./projects',
      'projects.heading': 'Projects',
      'projects.desc': 'Beberapa pekerjaan dan riset yang mewakili dua sisi cara kerja saya: membangun, lalu membongkar untuk memastikan semuanya aman.',
      'projects.cta': 'Diskusikan proyek serupa →',
      'project1.desc': 'Merancang dan membangun website company profile dan e-commerce untuk kebutuhan klien. Mencakup desain halaman, pengembangan website, konfigurasi WordPress/WooCommerce, serta pertimbangan struktur dan hosting sesuai kebutuhan proyek.',
      'project2.title': 'Web Security Research - Aplikasi Korporat',
      'project2.desc': 'Melakukan pengujian keamanan secara legal pada sebuah aplikasi web korporat. Dalam pengujian tersebut saya menemukan beberapa masalah keamanan, termasuk IDOR pada endpoint tertentu, directory listing, session file exposure, serta origin IP disclosure pada konfigurasi di balik Cloudflare, WAF Bypass.',
      'project3.title': 'Bug Bounty &amp; Security Practice',
      'project3.desc': 'Pernah melakukan pengujian pada program bug bounty di HackerOne sebagai bagian dari proses belajar web security. Beberapa laporan yang saya kirim belum menghasilkan vulnerability yang diterima, tetapi pengalaman tersebut membantu saya memahami proses reconnaissance, pengujian, dokumentasi, dan pelaporan vulnerability secara bertanggung jawab.',
      'project4.title': 'Malware Analysis & Reverse Engineering',
      'project4.desc': 'Saat ini saya sedang fokus mempelajari malware analysis dan reverse engineering. Memperdalam bahasa C, binary analysis, serta penggunaan tools seperti Ghidra, GDB, dan objdump untuk memahami bagaimana sebuah program bekerja di level yang lebih rendah. Pernah menangani malware yang terpasang pada komputer pribadi, yang menjadi salah satu pengalaman praktis yang mendorong saya untuk belajar lebih serius mengenai analisis malware.',
      'clients.eyebrow': '$ ls -la ./klien',
      'clients.heading': 'CLIENTS',
      'clients.desc': 'Sejumlah website company profile & e-commerce yang pernah saya bangun sejak 2021. Sebagian sudah tidak online lagi, tapi proyeknya tetap jadi bukti pengalaman.',
      'clients.th_client': 'KLIEN',
      'clients.th_service': 'LAYANAN',
      'experience.eyebrow': '$ cat riwayat.log',
      'experience.heading': 'EXPERIENCE',
      'exp1.period': '2021 - Sekarang',
      'exp1.title': 'Freelance IT, Web &amp; Data',
      'exp1.org': 'Independen',
      'exp1.desc': 'Membangun website company profile dan e-commerce untuk berbagai klien (Brillant Indonesia, Exvo Indonesia, Reglow, Logam Maju Persada, Wanrakar, Adsisten.id). Mengelola dan memverifikasi data penerima bantuan sosial (BPNT) tingkat kecamatan untuk TKSK Batununggal, Kota Bandung termasuk membuat laporan harian dan memperbaiki data NIK, nama, dan alamat yang tidak valid.',
      'exp2.desc': 'Menginput dan mengolah data kependudukan termasuk verifikasi dan perbaikan data ganda/tidak valid membuat laporan harian dan surat administrasi dengan Microsoft Office, mengelola arsip warga, merancang materi visual dengan Adobe Photoshop, serta maintenance komputer dan jaringan Wi-Fi kantor.',
      'exp3.period': 'Paralel · Berkelanjutan',
      'exp3.title': 'PERSONAL INTERESTS',
      'exp3.org': 'Bug Bounty · CTF · Riset Pribadi',
      'exp3.desc': 'Di luar pekerjaan utama, aktif melakukan penetration test berizin, riset kerentanan (CVE), dan berpartisipasi dalam program bug bounty di HackerOne, Malware Analis, serta latihan CTF di Hack The Box.',
      'demos.eyebrow': '$ ls ./design',
      'demos.heading': 'Design',
      'demos.desc': 'Eksplorasi desain & prototipe.',
      'demos.cta': 'Lihat demo →',
      'about.heading': 'Tentang Saya',
      'about.label_name': 'Nama',
      'about.label_location': 'Lokasi',
      'about.label_focus': 'Fokus',
      'about.label_status': 'Status',
      'about.value_location': 'Kota Bandung, Indonesia',
      'about.value_status': 'Terbuka untuk kolaborasi',
      'about.p1': '<strong>Rizky V. Permana</strong> D3 Teknik Informatika. Selama beberapa tahun terakhir, pekerjaan saya lebih banyak berkaitan dengan website dan data, mulai dari membuat website untuk klien sampai mengolah, membersihkan, dan memverifikasi data.',
      'about.p2': 'Cybersecurity sendiri bukan pekerjaan utama saya. Saya mempelajarinya karena memang tertarik. Saya mencoba web security, penetration testing, CTF, dan bug bounty. Saya pernah menemukan beberapa vulnerability dalam pengujian yang dilakukan secara legal, meskipun perjalanan di bug bounty sendiri belum menghasilkan accepted vulnerability.',
      'about.p3': 'Saat ini perhatian saya lebih banyak tertuju pada malware analysis dan reverse engineering. Saya sedang memperdalam C dan mencoba memahami program dari level yang lebih rendah.',
      'contact.eyebrow': '$ echo "LET\'S CONNECT." && cat ./kontak.json',
      'contact.heading': 'LET\'S <span class="accent-line">CONNECT.</span>',
      'contact.desc': 'Terbuka untuk proyek web development, layanan data entry/cleaning, atau sekadar diskusi seputar keamanan siber.',
      'term.roles_cmd': 'cat peran.txt',
      'term.status_out': 'ONLINE - terbuka untuk proyek freelance'
    },
    en: {
    'meta.title': 'Rizky V. Permana',
    'meta.description': 'Rizky V. Permana is a Web Developer & Data Specialist based in Bandung, Indonesia. I work on web design, website development, and data processing. In my spare time, I study cybersecurity, with a current focus on malware analysis and reverse engineering.',
    'skip.link': 'Skip to main content',
    'aria.back_to_top': 'Back to top',
    'aria.nav_toggle': 'Open navigation menu',
    'nav.projects': '~/projects',
    'nav.skills': '~/skills',
    'nav.experience': '~/experience',
    'nav.about': '~/about',
    'nav.contact': '~/contact',
    'cta.contact': 'Contact Me',
    'hero.badge': 'Open for freelance projects',
    'hero.location': 'Bandung, Indonesia · 2026',
    'hero.lead': 'I work on websites and data for clients, from web design and website development to data processing and cleaning. Outside of my main work, I study cybersecurity as a personal interest, with a current focus on malware analysis, C, and reverse engineering.',
    'hero.cta_primary': 'Projects →',
    'hero.scroll': 'SCROLL',
    'stats.langs.label': 'Programming Languages',
    'stats.security.label': 'Started exploring in 2019',
    'stats.security.desc': 'Web Security, Pentest, Malware Analisis, Reverse Engineering',
    'stats.experience.label': 'Years of Experience',
    'stats.experience.desc': 'Data administration, reporting & web development',
    'stats.clients.label': 'Websites Built',
    'stats.clients.desc': 'Company profile & e-commerce websites since 2021',
    'skills.heading': 'Skills',
    'skills.th_service': 'SKILLS',
    'skills.data.desc': 'Microsoft Excel · Word · Data Validation, Entry, & Cleanup',
    'skills.crypto.desc': 'Static & dynamic analysis, basic fuzzing (AFL++)',
    'projects.eyebrow': '$ ls ./projects',
    'projects.heading': 'Projects',
    'projects.desc': 'A selection of projects and research that reflect the two sides of what I do: building things and exploring how they work and can be made more secure.',
    'projects.cta': 'Discuss a similar project →',
    'project1.desc': 'Designed and built company profile and e-commerce websites for clients. The work included page design, website development, WordPress/WooCommerce configuration, and choosing the appropriate structure and hosting setup for each project.',
    'project2.title': 'Web Security Research - Corporate Application',
    'project2.desc': 'Conducted a legal security assessment of a corporate web application. During the assessment, I found several security issues, including an IDOR on a specific endpoint, directory listing, session file exposure, and origin IP disclosure behind Cloudflare involving a WAF bypass.',
    'project3.title': 'Bug Bounty & Security Practice',
    'project3.desc': 'I have tested applications through bug bounty programs on HackerOne as part of my web security learning process. Some of my reports have not resulted in accepted vulnerabilities, but the experience has helped me understand reconnaissance, testing, documentation, and responsible vulnerability reporting.',
    'project4.title': 'Malware Analysis & Reverse Engineering',
    'project4.desc': 'I am currently focused on learning malware analysis and reverse engineering. I am deepening my knowledge of C and binary analysis, while learning to use tools such as Ghidra, GDB, and objdump to understand how programs work at a lower level. I have also dealt with malware installed on my personal computer, which became one of the practical experiences that encouraged me to study malware analysis more seriously.',
    'clients.eyebrow': '$ ls -la ./clients',
    'clients.heading': 'CLIENTS',
    'clients.desc': 'A selection of company profile and e-commerce websites I have built since 2021. Some are no longer online, but the projects remain part of my experience.',
    'clients.th_client': 'CLIENT',
    'clients.th_service': 'SERVICE',
    'experience.eyebrow': '$ cat experience.log',
    'experience.heading': 'EXPERIENCE',
    'exp1.period': '2021 - Present',
    'exp1.title': 'Freelance IT, Web & Data',
    'exp1.org': 'Independent',
    'exp1.desc': 'Built company profile and e-commerce websites for various clients (Brillant Indonesia, Exvo Indonesia, Reglow, Logam Maju Persada, Wanrakar, Adsisten.id). I also managed and verified social assistance (BPNT) recipient data at the sub-district level for TKSK Batununggal, Bandung, including preparing daily reports and correcting invalid ID numbers, names, and addresses.',
    'exp2.desc': 'Entered and processed population data, including verifying and correcting duplicate or invalid records. I also prepared daily reports and administrative letters using Microsoft Office, managed resident archives, designed visual materials with Adobe Photoshop, and maintained office computers and the Wi-Fi network.',
    'exp3.period': 'Parallel · Ongoing',
    'exp3.title': 'PERSONAL INTERESTS',
    'exp3.org': 'Bug Bounty · CTF · Personal Research',
    'exp3.desc': 'Outside of my main work, I study cybersecurity through authorized penetration testing, vulnerability research (CVE), bug bounty programs on HackerOne, Malware Analyst, and CTF practice on Hack The Box.',
    'demos.eyebrow': '$ ls ./design',
    'demos.heading': 'Design',
    'demos.desc': 'Design explorations and prototypes.',
    'demos.cta': 'View design →',
    'about.heading': 'About Me',
    'about.label_name': 'Name',
    'about.label_location': 'Location',
    'about.label_focus': 'Focus',
    'about.label_status': 'Status',
    'about.value_location': 'Bandung, Indonesia',
    'about.value_status': 'Open to collaboration',
    'about.p1': '<strong>Rizky V. Permana</strong> D3 Informatics Engineering graduate. Over the past few years, most of my work has focused on websites and data, from building websites for clients to processing, cleaning, and verifying data.',
    'about.p2': 'Cybersecurity is not my main profession. I study it because I genuinely enjoy it. I have explored web security, penetration testing, CTFs, and bug bounty programs. I have found several vulnerabilities during authorized security testing, although my bug bounty journey has not yet resulted in an accepted vulnerability.',
    'about.p3': 'My current focus is malware analysis and reverse engineering. I am deepening my knowledge of C and learning how programs work at a lower level.',
    'contact.eyebrow': '$ echo "LET\'S CONNECT." && cat ./contact.json',
    'contact.heading': 'LET\'S <span class="accent-line">CONNECT.</span>',
    'contact.desc': 'Open to web development projects, data entry/cleaning work, or simply a conversation about cybersecurity.',
    'term.roles_cmd': 'cat roles.txt',
    'term.status_out': 'ONLINE - open for freelance projects'
  }
  };

  var currentLang = 'id';

  function detectLang(){
    var candidates = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];
    for(var i = 0; i < candidates.length; i++){
      if(candidates[i] && candidates[i].toLowerCase().indexOf('id') === 0){ return 'id'; }
    }
    return 'en';
  }

  function applyLanguage(lang){
    if(!translations[lang]) return;
    currentLang = lang;
    var dict = translations[lang];

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      var val = dict[key];
      if(val === undefined) return;
      var attr = el.getAttribute('data-i18n-attr');
      if(attr){
        el.setAttribute(attr, val);
      } else {
        el.innerHTML = val;
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function(btn){
      var active = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    runTerminal(lang);
  }

  /* ================================================================
     Nav scroll state
     ================================================================ */
  var nav = document.getElementById('nav');
  function onScroll(){
    if(window.scrollY > 30){ nav.classList.add('nav--scrolled'); }
    else{ nav.classList.remove('nav--scrolled'); }
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* ================================================================
     Mobile nav toggle
     ================================================================ */
  var toggle = document.getElementById('navToggle');
  toggle.addEventListener('click', function(){
    var open = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('#navLinks a').forEach(function(a){
    a.addEventListener('click', function(){
      nav.classList.remove('nav--open');
      toggle.setAttribute('aria-expanded','false');
    });
  });

  /* ================================================================
     Language switcher buttons
     ================================================================ */
  document.querySelectorAll('.lang-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var lang = btn.getAttribute('data-lang');
      if(lang !== currentLang){ applyLanguage(lang); }
    });
  });

  /* ================================================================
     Scroll reveal
     ================================================================
  */
  var revealEls = document.querySelectorAll('.reveal');
  if(reduceMotion){
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ================================================================
     Hero terminal typing (language-aware, restart-safe)
     ================================================================ */
  var termBody = document.getElementById('termBody');
  var termRunId = 0;

  function getTermLines(lang){
    var dict = translations[lang];
    return [
      {type:'cmd', text:'whoami'},
      {type:'out', text:'rizky_v_permana'},
      {type:'cmd', text:dict['term.roles_cmd']},
      {type:'out', text:'> Web Developer'},
      {type:'out', text:'> Data Specialist'},
      {type:'out', text:'> Interested in Cyber Security'},
      {type:'cmd', text:'echo $STATUS'},
      {type:'accent', text:dict['term.status_out']}
    ];
  }

  function renderStatic(lang){
    var lines = getTermLines(lang);
    termBody.innerHTML = '';
    lines.forEach(function(line){
      var div = document.createElement('div');
      div.className = 'term-line';
      if(line.type === 'cmd'){
        div.innerHTML = '<span class="prompt">$ </span>' + line.text;
      } else if(line.type === 'accent'){
        div.innerHTML = '<span class="out accentText">' + line.text + '</span>';
      } else {
        div.innerHTML = '<span class="out">' + line.text + '</span>';
      }
      termBody.appendChild(div);
    });
    var cursor = document.createElement('span');
    cursor.className = 'term-cursor';
    termBody.appendChild(cursor);
  }

  function typeTerminal(lang, runId){
    var lines = getTermLines(lang);
    termBody.innerHTML = '';
    var i = 0;
    function nextLine(){
      if(runId !== termRunId) return;
      if(i >= lines.length){
        var cursor = document.createElement('span');
        cursor.className = 'term-cursor';
        termBody.appendChild(cursor);
        return;
      }
      var line = lines[i];
      var div = document.createElement('div');
      div.className = 'term-line';
      var prefix = '';
      var cls = 'out';
      if(line.type === 'cmd'){ prefix = '<span class="prompt">$ </span>'; }
      if(line.type === 'accent'){ cls = 'out accentText'; }
      div.innerHTML = prefix + '<span class="' + cls + '"></span>';
      termBody.appendChild(div);
      var target = div.querySelector('span:last-child');
      var chars = line.text.split('');
      var c = 0;
      var speed = line.type === 'cmd' ? 42 : 14;
      (function typeChar(){
        if(runId !== termRunId) return;
        if(c < chars.length){
          target.textContent += chars[c];
          c++;
          setTimeout(typeChar, speed);
        } else {
          i++;
          setTimeout(nextLine, line.type === 'cmd' ? 220 : 160);
        }
      })();
    }
    nextLine();
  }

  function runTerminal(lang){
    termRunId++;
    var runId = termRunId;
    if(reduceMotion){
      renderStatic(lang);
    } else {
      typeTerminal(lang, runId);
    }
  }

  /* ================================================================
     Init
     ================================================================ */
  applyLanguage(detectLang());
})();

document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  /* ================================================================
     1. LENIS SMOOTH SCROLL
     ================================================================ */
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => { lenis.raf(time * 1000) });
  gsap.ticker.lagSmoothing(0);

  window.addEventListener('load', () => ScrollTrigger.refresh());

  /* ================================================================
     2. CUSTOM CURSOR
     ================================================================ */
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-outline");
  
  if (cursorDot && cursorOutline) {
    gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
    gsap.set(cursorOutline, { xPercent: -50, yPercent: -50 });

    window.addEventListener("mousemove", (e) => {
      gsap.set(cursorDot, { x: e.clientX, y: e.clientY });
      gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    });

    const hoverElements = document.querySelectorAll("a, button, .btn");
    hoverElements.forEach(el => {
      el.addEventListener("mouseenter", () => cursorOutline.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => cursorOutline.classList.remove("cursor-hover"));
    });
  }

  /* ================================================================
     3. MAGNETIC BUTTONS 
     ================================================================ */
  const magneticButtons = document.querySelectorAll(".btn");
  magneticButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const position = btn.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power2.out" });
    });
    
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    });
  });

  /* ================================================================
     4. GSAP SCROLLTRIGGER ANIMATIONS
     ================================================================ */
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".hero h1", {
    y: 100, opacity: 0, skewY: 7, duration: 1.5, ease: "power4.out", delay: 0.2
  });
  
  gsap.from(".hero__role, .hero p.lead, .hero__actions", {
    y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.5
  });

  const revealSections = document.querySelectorAll(".reveal");
  revealSections.forEach((section) => {
    gsap.set(section, { y: 60, opacity: 0 });
    ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      onEnter: () => gsap.to(section, { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", overwrite: "auto" }),
      onLeaveBack: () => gsap.to(section, { y: 60, opacity: 0, duration: 0.6, ease: "power3.out", overwrite: "auto" })
    });
  });

  // Parallax teks Marquee (.marquee-track)
  gsap.to(".marquee-track", {
    scrollTrigger: {
      trigger: ".marquee-strip",
      start: "top bottom", end: "bottom top", scrub: 1
    },
    xPercent: -15 // Menggeser teks dinamis scroll
  });
});
