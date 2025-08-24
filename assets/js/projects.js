// Projects Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Project filtering functionality
    function initProjectFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hide');
                        card.style.display = 'block';
                    } else {
                        card.classList.add('hide');
                        setTimeout(() => {
                            if (card.classList.contains('hide')) {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
                
                // Re-trigger animations for visible cards
                setTimeout(() => {
                    animateVisibleCards();
                }, 100);
            });
        });
    }
    
    // Animate visible project cards
    function animateVisibleCards() {
        const visibleCards = document.querySelectorAll('.project-card:not(.hide)');
        
        visibleCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.9)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }
    
    // Project card hover effects
    function initHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const overlay = card.querySelector('.project-overlay');
            const image = card.querySelector('.project-image img');
            
            card.addEventListener('mouseenter', function() {
                // Add subtle shake animation
                this.style.animation = 'none';
                this.offsetHeight; // Trigger reflow
                this.style.animation = 'projectHover 0.6s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.animation = '';
            });
        });
    }
    
    // Add project hover animation CSS
    const projectAnimationCSS = `
        @keyframes projectHover {
            0% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.02); }
            100% { transform: translateY(-15px) scale(1); }
        }
        
        .project-card {
            transform-origin: center bottom;
        }
        
        .project-image img {
            transition: transform 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        }
        
        .project-overlay {
            transition: opacity 0.4s cubic-bezier(0.23, 1, 0.320, 1);
        }
        
        .btn-project {
            transform: translateY(10px);
            transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }
        
        .project-card:hover .btn-project {
            transform: translateY(0);
        }
        
        .project-card:hover .btn-project:nth-child(1) {
            transition-delay: 0.1s;
        }
        
        .project-card:hover .btn-project:nth-child(2) {
            transition-delay: 0.2s;
        }
    `;
    
    // Loading animation for project images
    function initImageLoading() {
        const projectImages = document.querySelectorAll('.project-image img');
        
        projectImages.forEach(img => {
            // Create placeholder if image fails to load
            img.addEventListener('error', function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjVGNUY1Ii8+CjxwYXRoIGQ9Ik0yMDAgMTI1TDE2MCA5NUwyNDAgOTVMMjAwIDEyNVoiIGZpbGw9IiNEREREREQiLz4KPGNpcmNsZSBjeD0iMTcwIiBjeT0iMTA1IiByPSI4IiBmaWxsPSIjRERERERkIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5OTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPlByb2plY3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
                this.alt = 'Project Image Placeholder';
            });
            
            // Add loading state
            const parent = img.parentElement;
            parent.classList.add('loading');
            
            img.addEventListener('load', function() {
                parent.classList.remove('loading');
                parent.classList.add('loaded');
            });
        });
    }
    
    // Search functionality (if search input exists)
    function initProjectSearch() {
        const searchInput = document.querySelector('.project-search');
        if (!searchInput) return;
        
        const projectCards = document.querySelectorAll('.project-card');
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            projectCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent.toLowerCase());
                
                const matches = title.includes(searchTerm) || 
                               description.includes(searchTerm) || 
                               tags.some(tag => tag.includes(searchTerm));
                
                if (matches || searchTerm === '') {
                    card.style.display = 'block';
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                    setTimeout(() => {
                        if (card.classList.contains('hide')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        });
    }
    
    // Intersection Observer for scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px'
        });
        
        const animatedElements = document.querySelectorAll('.project-card, .filter-btn');
        animatedElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // Project card click analytics (placeholder for future implementation)
    function initAnalytics() {
        const projectLinks = document.querySelectorAll('.btn-project');
        
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const projectTitle = this.closest('.project-card').querySelector('h3').textContent;
                const linkType = this.textContent.includes('Code') ? 'code' : 'live';
                
                // Log interaction (replace with actual analytics implementation)
                console.log(`Project interaction: ${projectTitle} - ${linkType}`);
            });
        });
    }
    
    // Create and append styles
    const style = document.createElement('style');
    style.textContent = projectAnimationCSS;
    document.head.appendChild(style);
    
    // Initialize all features
    initProjectFilters();
    initHoverEffects();
    initImageLoading();
    initProjectSearch();
    initScrollAnimations();
    initAnalytics();
    
    // Initial animation for page load
    setTimeout(() => {
        animateVisibleCards();
    }, 200);
    
    // Lazy loading for project images (if IntersectionObserver is supported)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});