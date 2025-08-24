// Portfolio Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Animated counter for stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || counter.innerText);
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
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
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger counter animation for stats section
                if (entry.target.classList.contains('stats-section')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.work-card, .stat-item, .stats-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Floating elements animation
    function createFloatingElements() {
        const floatingHTML = `
            <div class="floating-element floating-1">
                <i class="fas fa-code" style="font-size: 4rem;"></i>
            </div>
            <div class="floating-element floating-2">
                <i class="fas fa-laptop-code" style="font-size: 3rem;"></i>
            </div>
            <div class="floating-element floating-3">
                <i class="fas fa-gamepad" style="font-size: 3.5rem;"></i>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', floatingHTML);
    }
    
    // Mouse parallax effect
    function initParallax() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const floatingElements = document.querySelectorAll('.floating-element');
            floatingElements.forEach((el, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 50;
                const y = (mouseY - 0.5) * speed * 50;
                el.style.transform = `translate(${x}px, ${y}px)`;
            });
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
    
    // Typing effect for hero subtitle
    function initTypingEffect() {
        const subtitle = document.querySelector('.hero-content p');
        if (subtitle) {
            const originalText = subtitle.innerText;
            subtitle.innerText = '';
            
            let index = 0;
            const typeWriter = () => {
                if (index < originalText.length) {
                    subtitle.innerText += originalText.charAt(index);
                    index++;
                    setTimeout(typeWriter, 50);
                } else {
                    // Add blinking cursor
                    subtitle.innerHTML += '<span class="typing-cursor">|</span>';
                    
                    // Animate cursor
                    const cursor = subtitle.querySelector('.typing-cursor');
                    if (cursor) {
                        setInterval(() => {
                            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                        }, 500);
                    }
                }
            };
            
            setTimeout(typeWriter, 1000); // Start after 1 second
        }
    }
    
    // Add CSS for typing cursor
    const typingCSS = `
        .typing-cursor {
            font-weight: normal;
            color: #fff;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = typingCSS;
    document.head.appendChild(style);
    
    // Initialize all features
    createFloatingElements();
    initParallax();
    initSmoothScrolling();
    initTypingEffect();
    
    // Add some demo stats if elements exist
    setTimeout(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length > 0) {
            statNumbers[0].setAttribute('data-target', '20');
            statNumbers[0].innerText = '20';
            if (statNumbers[1]) {
                statNumbers[1].setAttribute('data-target', '5');
                statNumbers[1].innerText = '5';
            }
            if (statNumbers[2]) {
                statNumbers[2].setAttribute('data-target', '100');
                statNumbers[2].innerText = '100';
            }
            if (statNumbers[3]) {
                statNumbers[3].setAttribute('data-target', '24');
                statNumbers[3].innerText = '24';
            }
        }
    }, 100);
    
    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateAnimations() {
        // Update any scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    });
});