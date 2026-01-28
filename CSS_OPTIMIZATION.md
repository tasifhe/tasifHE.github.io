# CSS Optimization Guide

## Current State
- Total CSS Size: ~169 KB
- Target: < 100 KB
- Current files: 11 component files + vendor files

## Optimization Strategies

### 1. Remove Unused Bootstrap Components
The current implementation uses Bootstrap 5, but only needs:
- Grid system
- Utilities (spacing, display, flex)
- Icons

**Action**: Create custom Bootstrap build excluding unused components

### 2. Minify CSS
All CSS files should be minified for production

### 3. Critical CSS
Extract above-the-fold CSS and inline it

### 4. Component-Level Optimization

#### Priority Components (Keep as-is):
- loading.css - Essential for UX
- header.css - Above-fold
- hero.css - Above-fold
- ui-elements.css - Used throughout

#### Can Be Optimized:
- portfolio.css - Defer non-critical styles
- services.css - Defer
- experience.css - Defer
- contact.css - Defer

### 5. CSS Custom Properties Optimization
Review variables.css for unused custom properties

### 6. Vendor CSS Reduction
- Bootstrap: ~60 KB (can be reduced to ~20 KB with custom build)
- Bootstrap Icons: ~80 KB (use only needed icons or switch to inline SVG)
- AOS: ~5 KB (acceptable)
- Swiper: ~6 KB (acceptable)
- GLightbox: ~8 KB (acceptable)

## Implementation Plan

### Phase 1: Quick Wins (Target: -30 KB)
- [ ] Minify all custom CSS files
- [ ] Remove unused CSS rules from components
- [ ] Optimize selectors and reduce specificity
- [ ] Combine similar styles

### Phase 2: Bootstrap Optimization (Target: -40 KB)
- [ ] Create custom Bootstrap build with only:
  - Grid system
  - Utilities needed
  - Reboot/normalize
- [ ] Replace Bootstrap icons with SVG sprites where possible

### Phase 3: Advanced (Target: -20-30 KB)
- [ ] Implement CSS purging (remove unused selectors)
- [ ] Convert some CSS to CSS-in-JS for conditional loading
- [ ] Use CSS containment for better performance

## Automated Tools

### Using PurgeCSS
```bash
npm install -D @fullhuman/postcss-purgecss
```

### Using Clean-CSS for Minification
```bash
npm install -D clean-css-cli
```

### Build Script
```json
{
  "scripts": {
    "css:minify": "cleancss -o dist/main.min.css assets/css/main-modular.css",
    "css:purge": "purgecss --css assets/css/**/*.css --content index.html --output dist/css"
  }
}
```

## Expected Results
- Current: 169 KB
- After minification: ~135 KB (-20%)
- After Bootstrap optimization: ~95 KB (-44%)
- After full optimization: ~85 KB (-50%)

## Testing
After optimization, test:
1. Visual regression
2. Responsive design
3. Interactive elements
4. Cross-browser compatibility
5. Performance metrics (Lighthouse)
