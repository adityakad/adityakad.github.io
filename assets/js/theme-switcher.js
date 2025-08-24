// Theme Switcher for Dark/Light Mode
class ThemeSwitcher {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        // Apply saved theme
        this.applyTheme(this.theme);
        
        // Create theme toggle button
        this.createToggleButton();
        
        // Listen for system theme changes
        this.listenForSystemThemeChanges();
    }

    createToggleButton() {
        // Check if toggle already exists
        if (document.getElementById('theme-toggle')) return;

        const toggle = document.createElement('button');
        toggle.id = 'theme-toggle';
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle dark mode');
        toggle.innerHTML = this.theme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
        
        toggle.addEventListener('click', () => this.toggleTheme());
        
        // Add to navbar or create fixed position
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            const navItem = document.createElement('li');
            navItem.className = 'nav-item';
            navItem.appendChild(toggle);
            navbar.appendChild(navItem);
        } else {
            // Fallback: fixed position
            toggle.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                background: var(--bg-color);
                border: 2px solid var(--border-color);
                border-radius: 50%;
                width: 50px;
                height: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 2px 10px var(--shadow-color);
            `;
            document.body.appendChild(toggle);
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        this.updateToggleButton();
        localStorage.setItem('theme', this.theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.className = document.body.className.replace(/theme-\w+/g, '') + ` theme-${theme}`;
    }

    updateToggleButton() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.innerHTML = this.theme === 'dark' 
                ? '<i class="fas fa-sun"></i>' 
                : '<i class="fas fa-moon"></i>';
        }
    }

    listenForSystemThemeChanges() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addListener((e) => {
                if (!localStorage.getItem('theme')) {
                    this.theme = e.matches ? 'dark' : 'light';
                    this.applyTheme(this.theme);
                    this.updateToggleButton();
                }
            });
        }
    }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});