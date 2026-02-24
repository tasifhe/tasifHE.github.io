# Quick Reference Guide - Portfolio Theming

## 🎨 Available Themes

| Theme | Color | Best For | Font Weight | Letter Spacing |
|-------|-------|----------|-------------|----------------|
| **puzzle** | 🟣 Purple (#9c27b0) | Puzzle games, creative projects | 600 (medium) | 2.5px (wide) |
| **action** | 🟢 Green (#28a745) | FPS, action games, sports | 800 (extra bold) | 1.8px (tight) |
| **horror** | 🔴 Red (#dc3545) | Horror games, dark themes | 800 (extra bold) | 1.5px (tight) |
| **strategy** | 🟡 Gold (#ffc107) | Strategy, simulation, RPG | 700 (bold) | 2.2px (moderate) |
| **tool** | 🔵 Cyan (#17a2b8) | Tools, systems, technical | 700 (bold) | 2px (standard) |

## 📝 How to Apply

### HTML Method (Recommended)
```html
<body class="portfolio-page" data-project-theme="puzzle">
```

## 🎯 Current Assignments

| Project File | Theme | Reason |
|--------------|-------|--------|
| `portfolio-details_Drawnscape.html` | `puzzle` | Physics puzzle game |
| `portfolio-details_PCP.html` | `action` | FPS tactical game |
| `portfolio-details_RAWWAR.html` | `horror` | Horror war game |
| `portfolio-details_PGW.html` | `strategy` | Procedural generation |
| `portfolio-details_PGW_Forest.html` | `strategy` | Procedural generation |
| `portfolio-details_TPC.html` | `tool` | Controller system |

## 🔧 Custom Theme Template

```css
body[data-project-theme="YOURTHEME"] {
  /* Core Colors */
  --project-accent: #XXXXXX;
  --project-accent-secondary: #XXXXXX;
  --project-accent-rgb: R, G, B;
  
  /* Borders & Effects */
  --project-panel-border: rgba(R, G, B, 0.3);
  --project-panel-header-bg: linear-gradient(135deg, rgba(R, G, B, 0.2), rgba(R2, G2, B2, 0.15));
  --project-panel-glow: rgba(R, G, B, 0.4);
  --project-badge-bg: linear-gradient(135deg, #XXXXXX, #XXXXXX);
  --project-status-glow: rgba(R, G, B, 0.6);
  
  /* Typography */
  --project-font-weight-header: 700;
  --project-letter-spacing-header: 2px;
}
```

## 🎨 Theme Selection Guide

### Choose PUZZLE theme for:
- Casual games
- Creative projects
- Artistic applications
- Educational games
- Brain teasers

### Choose ACTION theme for:
- FPS games
- Action games
- Sports games
- Racing games
- Competitive games

### Choose HORROR theme for:
- Horror games
- Dark atmospheric games
- Survival games
- Thriller projects
- Intense experiences

### Choose STRATEGY theme for:
- Strategy games
- Simulation games
- RPGs
- Management games
- Procedural systems

### Choose TOOL theme for:
- Game systems
- Controllers
- Frameworks
- Technical demos
- Utility projects

## 🔍 Affected Components

When you apply a theme, these automatically adapt:

✅ **Panel headers** - Background gradient  
✅ **Panel borders** - Border color  
✅ **Panel hover effects** - Glow color  
✅ **Status indicators** - Dot color & glow  
✅ **Panel icons** - Background gradient  
✅ **Badge backgrounds** - Gradient colors  
✅ **Typography** - Font weight & letter spacing  
✅ **Hover shadows** - RGB-based glow effects  

## 📱 Mobile Considerations

All themes work identically on mobile. Character stats responsive breakpoints:

- **Desktop** (>768px): Full size icons & padding
- **Tablet** (768px): Medium size adjustments
- **Mobile** (480px): Compact size optimized

## ⚡ Performance

- **No JavaScript** required
- **Pure CSS** solution
- **~2KB** additional CSS
- **Zero** extra HTTP requests
- **Instant** theme switching

## 🎯 Testing Checklist

When adding a new theme:

- [ ] Choose appropriate accent colors
- [ ] Set RGB values correctly
- [ ] Test panel hover effects
- [ ] Verify status indicator colors
- [ ] Check typography readability
- [ ] Test on light and dark backgrounds
- [ ] Verify contrast ratios (WCAG AA minimum)
- [ ] Test on mobile devices

## 💡 Pro Tips

1. **Color Harmony**: Use complementary colors for accent-secondary
2. **Contrast**: Ensure rgba opacity values maintain readability
3. **Consistency**: Keep font weights aligned with project energy level
4. **Testing**: Always preview on actual devices
5. **Accessibility**: Maintain WCAG AA contrast ratios (4.5:1 minimum)

## 🚀 Quick Commands

### Create new theme:
1. Copy template above
2. Replace `YOURTHEME` with theme name
3. Set color values
4. Add to `portfolio-page.css`

### Apply to page:
```html
<body class="portfolio-page" data-project-theme="YOURTHEME">
```

### Override specific element:
```css
.your-element {
  border-color: var(--project-accent);
  box-shadow: 0 0 20px var(--project-panel-glow);
}
```

---

**Last Updated:** January 28, 2026  
**Version:** 1.0.0  
**Compatibility:** All modern browsers
