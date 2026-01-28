# THE Portfolio - Professional Game Designer & Developer

[![Website](https://img.shields.io/website?url=https%3A%2F%2Ftasifhe.github.io)](https://tasifhe.github.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)](https://github.com/tasifHE/tasifHE.github.io)

> A modern, game-themed professional portfolio showcasing Unity game development projects, interactive experiences, and technical expertise in game design and development.

## 🎮 Live Demo

**Visit:** [https://tasifhe.github.io](https://tasifhe.github.io)

## ✨ Features

### Design & UX
- 🎨 **Game-Themed UI** - Unique HUD-style interface with gaming aesthetics
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🌗 **Dark Theme** - Sleek dark design with neon accents
- ✨ **Smooth Animations** - AOS scroll animations and custom effects
- 🎭 **Interactive Elements** - Hover effects, glitch text, particle overlays

### Technical Features
- ⚡ **Modern Architecture** - Modular ES6 JavaScript with component-based structure
- 🎯 **SEO Optimized** - Meta tags, Open Graph, Twitter Cards, structured data
- 📦 **PWA Ready** - Service worker, manifest, offline capability
- 🚀 **Performance Optimized** - Lazy loading, resource hints, optimized assets
- ♿ **Accessible** - ARIA labels, keyboard navigation, semantic HTML
- 📊 **Analytics Ready** - Structured for easy integration

### Content Sections
- 👤 **About** - Character-style profile with stats and skills
- 💼 **Experience** - Game industry timeline with RPG elements
- 🎮 **Portfolio** - 6+ game projects with detailed case studies
- 🛠️ **Services** - Game development capabilities
- 📧 **Contact** - Interactive contact form with validation
- 📱 **Social Integration** - Links to professional profiles

## 🏗️ Architecture

### Project Structure
```
tasifHE.github.io/
├── index.html                 # Main page
├── 404.html                   # Custom error page
├── manifest.json              # PWA manifest
├── sw.js                      # Service worker
├── robots.txt                 # SEO robots file
├── sitemap.xml                # XML sitemap
├── assets/
│   ├── css/
│   │   ├── main-modular.css   # Main CSS entry
│   │   ├── base/              # Base styles & variables
│   │   ├── components/        # Component styles
│   │   ├── layout/            # Layout system
│   │   └── utilities/         # Utility classes
│   ├── js/
│   │   ├── app.js             # Application orchestrator
│   │   ├── main.js            # Main functionality
│   │   ├── config.js          # Configuration
│   │   ├── utils.js           # Utility functions
│   │   ├── loading.js         # Loading screen
│   │   └── components/        # JS components
│   ├── img/                   # Images & assets
│   ├── CV/                    # Resume/CV files
│   └── vendor/                # Third-party libraries
├── portfolio-details_*.html   # Project detail pages
└── forms/                     # Backend form handlers
```

### Tech Stack
- **HTML5** - Semantic markup
- **CSS3** - Modular architecture with custom properties
- **JavaScript ES6** - Modern component-based approach
- **Bootstrap 5.2.3** - Grid system and utilities
- **AOS** - Scroll animations
- **Typed.js** - Typing animations
- **GLightbox** - Lightbox for images
- **Swiper** - Touch sliders

## 🚀 Quick Start

### View Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/tasifHE/tasifHE.github.io.git
   cd tasifHE.github.io
   ```

2. **Install dependencies** (optional)
   ```bash
   npm install
   ```

3. **Start local server**
   ```bash
   npm start
   # Or use any static server
   # python -m http.server 8000
   # npx serve
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

### Deploy to GitHub Pages

1. **Push to main branch**
   ```bash
   git add .
   git commit -m "Update portfolio"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to `main` branch
   - Save and wait for deployment

## 📦 NPM Scripts

```bash
npm start          # Start development server
npm run dev        # Start with CORS enabled
npm run build      # Build for production
npm run test       # Run all tests
npm run lint       # Lint CSS and JS
npm run validate   # Validate HTML
npm run health     # Run health check
npm run deploy     # Deploy to GitHub Pages
```

## 🎨 Customization

### Update Personal Information

1. **Edit index.html**
   - Update name, title, and bio
   - Modify experience timeline
   - Update skills and services

2. **Replace Images**
   - Profile picture: `assets/img/Potfolio_Pic_V2.jpg`
   - Hero background: `assets/img/CoverBG3.png`
   - Favicon: `assets/img/THE2.ico`

3. **Update Portfolio Projects**
   - Edit portfolio-details_*.html files
   - Add project images to `assets/img/`
   - Update links in index.html

4. **Modify Colors**
   - Edit `assets/css/base/variables.css`
   - Customize color scheme variables

### Configuration

Edit `assets/js/config.js` for application settings:
```javascript
export const CONFIG = {
  site: {
    name: 'Your Name',
    version: '2.0.0'
  },
  animations: { /* ... */ },
  contact: { /* ... */ }
};
```

## 🔧 Development

### Code Style
- 2 spaces indentation
- Semicolons required
- ES6+ syntax preferred
- Comments for complex logic
- Component-based architecture

### Performance Guidelines
- JavaScript Budget: 200 KB
- CSS Budget: 100 KB
- Images: WebP/optimized formats
- Lazy load non-critical resources

### Browser Support
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Tasif Hossain Emon**
- Website: [https://tasifhe.github.io](https://tasifhe.github.io)
- GitHub: [@tasifHE](https://github.com/tasifHE)
- LinkedIn: [linkedin.com/in/tasif-hossain-emon](https://linkedin.com/in/tasif-hossain-emon)

## 🙏 Acknowledgments

- Bootstrap Made for the original DevFolio template
- Bootstrap team for the framework
- All open-source contributors

## 📈 Project Status

**Version:** 2.0.0  
**Status:** Active Development  
**Last Updated:** January 2026

---

<div align="center">
  <p>Built with ❤️ by THE</p>
  <p>⭐ Star this repo if you find it useful!</p>
</div>
