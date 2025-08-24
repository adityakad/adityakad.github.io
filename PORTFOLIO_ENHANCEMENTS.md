# Portfolio Enhancements

This document describes the recent enhancements made to the portfolio website.

## ✨ New Features

### 🌓 Dark/Light Mode Toggle
- **Location**: Fixed position toggle button (top-right corner)
- **Functionality**: Switches between light and dark themes
- **Persistence**: Remembers user preference in localStorage
- **System Integration**: Detects system theme preference
- **Implementation**: CSS custom properties with smooth transitions

### 🔗 Fixed Work Card Navigation
- **Issue Fixed**: Work cards were previously non-clickable
- **Current Behavior**: 
  - First card → Links to GitHub repository
  - Second card → Links to projects page
  - Third card → Links to about page
- **Enhancement**: Hover effects and click analytics

### 🚀 GitHub Integration
- **Dynamic Projects**: Real-time fetching from GitHub API
- **Fallback Content**: Graceful degradation when API is unavailable
- **Project Stats**: Dynamic counters based on actual GitHub data
- **Features**:
  - Repository filtering (excludes forks and archived repos)
  - Language detection with color coding
  - Star count and last updated information
  - Topic tags display
  - Direct links to code and live demos

### 🍎 Apple-Inspired Design
- **Typography**: System fonts (-apple-system, BlinkMacSystemFont)
- **Color Scheme**: Professional, accessible color palette
- **Animations**: Subtle, purposeful transitions
- **Cards**: Clean, elevated design with proper shadows
- **Spacing**: Consistent, Apple-like spacing system
- **Removed**: Overly animated elements for professionalism

## 🛠️ Technical Implementation

### CSS Architecture
- **CSS Variables**: Theme-aware custom properties
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Respects `prefers-reduced-motion`
- **Performance**: Optimized transitions and animations

### JavaScript Features
- **Theme Switcher**: Modular class-based implementation
- **GitHub API**: Async/await with error handling
- **Analytics**: Click tracking for user interactions
- **Performance**: Throttled scroll events and optimized animations

### File Structure
```
assets/
├── css/
│   ├── apple-theme.css      # Theme variables and Apple-inspired styling
│   ├── github-projects.css  # GitHub projects display styling
│   └── portfolio.css        # Enhanced portfolio page styles
└── js/
    ├── theme-switcher.js     # Dark/light mode functionality
    ├── github-projects.js    # GitHub API integration
    └── portfolio.js          # Clean, optimized animations
```

## 🎨 Design Philosophy

### Apple-Inspired Principles
1. **Simplicity**: Clean, uncluttered layouts
2. **Typography**: Readable, system-native fonts
3. **White Space**: Generous spacing for breathing room
4. **Subtle Animations**: Purposeful, not distracting
5. **Accessibility**: High contrast, clear hierarchy

### Responsive Behavior
- **Mobile-First**: Optimized for mobile devices
- **Progressive Enhancement**: Works without JavaScript
- **Touch-Friendly**: Appropriate tap targets
- **Performance**: Efficient loading and animations

## 🔧 Configuration

### Global Theme
The theme is automatically loaded on all pages via `_config.yml`:
```yaml
site-css:
  - "/assets/css/apple-theme.css"
site-js:
  - "/assets/js/theme-switcher.js"
```

### GitHub Integration
Projects are fetched from the GitHub API for user `adityakad`. The system:
- Filters out forks and archived repositories
- Shows the 6 most recently updated projects
- Provides fallback content if API fails
- Updates project statistics dynamically

## 🚀 Future Enhancements

### Planned Features
- [ ] GitHub authentication for private repository access
- [ ] Enhanced project filtering and search
- [ ] Project contribution graphs
- [ ] Skills proficiency based on repository languages
- [ ] Blog integration with dev.to or similar platforms

### Performance Optimizations
- [ ] Image optimization and lazy loading
- [ ] Service worker for offline functionality
- [ ] CDN implementation for assets
- [ ] Bundle optimization and minification

## 🐛 Testing

The implementation has been tested for:
- ✅ Theme switching functionality
- ✅ Work card navigation
- ✅ GitHub API integration
- ✅ Responsive design
- ✅ Accessibility compliance
- ✅ Performance metrics

## 📱 Browser Support

- **Modern Browsers**: Full functionality
- **Older Browsers**: Graceful degradation
- **Mobile Devices**: Optimized experience
- **Screen Readers**: Accessible markup and ARIA labels