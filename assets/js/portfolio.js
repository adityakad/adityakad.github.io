// Portfolio Page Interactive Features - Apple-inspired Clean Design
document.addEventListener('DOMContentLoaded', function() {
    
    // Animated counter for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target') || counter.innerText);
                    const duration = 1500; // Smoother, shorter animation
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter); // Only animate once
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Subtle scroll animations (Apple-style)
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.work-card, .stat-item');
        animatedElements.forEach((el, index) => {
            // Add slight delay for staggered animation
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }
    
    // Smooth scrolling for anchor links
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Enhanced work card interactions
    function initWorkCardInteractions() {
        const workCards = document.querySelectorAll('.work-card');
        
        workCards.forEach(card => {
            // Add subtle hover effect
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
            
            // Add click analytics (for future use)
            card.addEventListener('click', function(e) {
                const title = this.querySelector('.work-title')?.textContent;
                const href = this.getAttribute('href');
                
                // Log interaction (can be enhanced with analytics)
                console.log(`Work card clicked: ${title} -> ${href}`);
            });
        });
    }
    
    // Parallax effect for hero section (subtle)
    function initParallaxEffect() {
        const hero = document.querySelector('.hero-section');
        if (!hero) return;
        
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3; // Subtle parallax
            
            hero.style.transform = `translateY(${rate}px)`;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }
    
    // Initialize all features
    animateCounters();
    initScrollAnimations();
    initSmoothScrolling();
    initWorkCardInteractions();
    initParallaxEffect();
    
    // Add CSS for animations
    const animationCSS = `
        .work-card, .stat-item {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        
        .work-card.animate-in, .stat-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .work-card {
            transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        
        @media (prefers-reduced-motion: reduce) {
            .work-card, .stat-item {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = animationCSS;
    document.head.appendChild(style);
});