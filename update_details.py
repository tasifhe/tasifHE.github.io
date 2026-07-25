import os
import re

files_themes = {
    'portfolio-details_RAWWAR.html': 'theme-cinematic',
    'portfolio-details_Drawnscape.html': 'theme-cinematic',
    'portfolio-details_PGW.html': 'theme-procedural',
    'portfolio-details_PGW_Forest.html': 'theme-procedural',
    'portfolio-details_PCP.html': 'theme-procedural',
    'portfolio-details_TPC.html': 'theme-mechanics'
}

header_html = """  <!-- ======= Navigation Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center justify-content-between">
      <div class="brand-logo">
        <a href="index.html" class="d-flex align-items-center gap-2">
          <img src="assets/img/THE2.ico" alt="THE Logo" class="brand-logo-img">
          <div>
            <span class="brand-title">TASIF HOSSAIN EMON</span>
            <span class="brand-subtitle">GAME DESIGNER &amp; DEVELOPER</span>
          </div>
        </a>
      </div>
      <nav id="navbar">
        <i class="bi bi-list mobile-nav-toggle"></i>
        <ul class="nav-links">
          <li><a class="nav-link-item" href="index.html#hero">Home</a></li>
          <li><a class="nav-link-item" href="index.html#about">About</a></li>
          <li><a class="nav-link-item" href="index.html#experience">Experience</a></li>
          <li><a class="nav-link-item" href="index.html#skills">Skills</a></li>
          <li><a class="nav-link-item active" href="index.html#work">Work</a></li>
          <li><a class="nav-link-item" href="index.html#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>"""

footer_html = """  <!-- ======= Footer ======= -->
  <footer class="redesign-footer">
    <div class="container">
      <div class="footer-text">
        &copy; 2026 <span class="footer-brand">TASIF HOSSAIN EMON</span> — All Rights Reserved.
      </div>
    </div>
  </footer>"""

scripts_html = """  <!-- Vendor JS Files -->
  <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>
  
  <!-- Main JS File -->
  <script src="assets/js/main.js"></script>"""

for file, theme in files_themes.items():
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Fonts
    content = re.sub(r'<link href="https://fonts\.googleapis\.com/css2\?family=Rajdhani.*?>', 
                     '<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">', 
                     content)
    
    # 2. CSS Links (replace main.min.css with redesign.css)
    content = re.sub(r'<link href="assets/css/main\.min\.css" rel="stylesheet">', 
                     '<link href="assets/css/redesign.css" rel="stylesheet">', 
                     content)

    # 3. Deferred JS in head removal
    content = re.sub(r'<!-- Deferred JS -->.*?</head>', '</head>', content, flags=re.DOTALL)
    
    # 4. Body class
    content = re.sub(r'<body class="portfolio-page"[^>]*>', f'<body class="portfolio-page {theme}">', content)

    # 5. Header Replacement
    content = re.sub(r'<!-- ======= Main Site Navbar.*?<!-- End Main Site Navbar -->', header_html, content, flags=re.DOTALL)

    # 6. Footer Replacement
    content = re.sub(r'<!-- ======= Enhanced Game-Style Footer ======= -->.*?</footer><!-- End Footer -->', footer_html, content, flags=re.DOTALL)
    
    # 7. Add scripts before </body>
    content = re.sub(r'</body>', f'{scripts_html}\n</body>', content)

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file} with {theme}")
