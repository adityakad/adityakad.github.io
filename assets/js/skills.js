// Skills Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate skill progress bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            if (width) {
                // Reset width first
                bar.style.width = '0%';
                
                // Animate to target width
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 300);
            }
        });
    }
    
    // Skill item interactions
    function initSkillInteractions() {
        const skillItems = document.querySelectorAll('.skill-item');
        
        skillItems.forEach(item => {
            const skillBar = item.querySelector('.skill-progress');
            const skillLevel = item.querySelector('.skill-level');
            const skillIcon = item.querySelector('.skill-icon');
            
            item.addEventListener('mouseenter', function() {
                // Add pulse animation to icon
                if (skillIcon) {
                    skillIcon.style.animation = 'skillPulse 0.6s ease';
                }
                
                // Temporarily increase progress bar width
                if (skillBar) {
                    const currentWidth = parseInt(skillBar.getAttribute('data-width'));
                    const newWidth = Math.min(currentWidth + 5, 100);
                    skillBar.style.width = newWidth + '%';
                }
                
                // Add glow effect
                this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                // Reset animation
                if (skillIcon) {
                    skillIcon.style.animation = '';
                }
                
                // Reset progress bar
                if (skillBar) {
                    const originalWidth = skillBar.getAttribute('data-width');
                    skillBar.style.width = originalWidth + '%';
                }
                
                // Remove glow
                this.style.boxShadow = '';
            });
            
            // Click to show more info (placeholder for future feature)
            item.addEventListener('click', function() {
                const skillName = this.querySelector('h4').textContent;
                const level = this.getAttribute('data-level');
                
                // Create tooltip or modal (placeholder)
                showSkillDetails(skillName, level, this);
            });
        });
    }
    
    // Show skill details (placeholder function)
    function showSkillDetails(skillName, level, element) {
        // Remove any existing tooltips
        document.querySelectorAll('.skill-tooltip').forEach(tooltip => tooltip.remove());
        
        // Create tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'skill-tooltip';
        tooltip.innerHTML = `
            <div class="tooltip-content">
                <h4>${skillName}</h4>
                <p>Level: ${level.charAt(0).toUpperCase() + level.slice(1)}</p>
                <p>Click to learn more about my experience with ${skillName}!</p>
            </div>
        `;
        
        // Position tooltip
        const rect = element.getBoundingClientRect();
        tooltip.style.cssText = `
            position: absolute;
            top: ${rect.top - 10}px;
            left: ${rect.left + rect.width + 10}px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 250px;
            animation: tooltipAppear 0.3s ease;
            pointer-events: none;
        `;
        
        document.body.appendChild(tooltip);
        
        // Remove tooltip after 3 seconds
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.style.animation = 'tooltipDisappear 0.3s ease';
                setTimeout(() => tooltip.remove(), 300);
            }
        }, 3000);
    }
    
    // Skill tag cloud interactions
    function initTagCloudInteractions() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.transform = 'translate(-50%, -50%)';
                
                this.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
            
            // Add click handler for future functionality
            tag.addEventListener('click', function() {
                const skillName = this.textContent;
                console.log(`Clicked skill: ${skillName}`);
                
                // Add temporary highlight effect
                this.style.transform = 'scale(1.1)';
                this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.4)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
                }, 200);
            });
        });
    }
    
    // Learning goals interactions
    function initLearningGoalsInteractions() {
        const goalItems = document.querySelectorAll('.goals-list li');
        
        goalItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                // Add progress indicator
                if (!this.querySelector('.goal-progress')) {
                    const progress = document.createElement('div');
                    progress.className = 'goal-progress';
                    progress.style.cssText = `
                        position: absolute;
                        right: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 40px;
                        height: 6px;
                        background: #e9ecef;
                        border-radius: 3px;
                        overflow: hidden;
                    `;
                    
                    const progressBar = document.createElement('div');
                    progressBar.style.cssText = `
                        height: 100%;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        width: ${Math.random() * 60 + 20}%;
                        border-radius: 3px;
                        transition: width 0.5s ease;
                    `;
                    
                    progress.appendChild(progressBar);
                    this.style.position = 'relative';
                    this.appendChild(progress);
                }
            });
            
            item.addEventListener('mouseleave', function() {
                const progress = this.querySelector('.goal-progress');
                if (progress) {
                    progress.remove();
                }
            });
        });
    }
    
    // Intersection Observer for scroll animations
    function initScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('skills-section')) {
                        // Trigger skill bar animations when section comes into view
                        setTimeout(() => {
                            animateSkillBars();
                        }, 300);
                    }
                    
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px'
        });
        
        const sections = document.querySelectorAll('.skills-section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
            observer.observe(section);
        });
    }
    
    // Add dynamic CSS for animations
    const skillAnimationCSS = `
        @keyframes skillPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        @keyframes tooltipAppear {
            from {
                opacity: 0;
                transform: translateY(10px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes tooltipDisappear {
            from {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            to {
                opacity: 0;
                transform: translateY(-10px) scale(0.9);
            }
        }
        
        .ripple-effect {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes rippleAnimation {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
        
        .skill-item {
            cursor: pointer;
        }
        
        .skill-tag {
            cursor: pointer;
            user-select: none;
        }
        
        .goals-list li {
            cursor: pointer;
        }
    `;
    
    // Skill proficiency calculator (fun feature)
    function calculateOverallProficiency() {
        const skillBars = document.querySelectorAll('.skill-progress');
        let totalProficiency = 0;
        let skillCount = 0;
        
        skillBars.forEach(bar => {
            const width = parseInt(bar.getAttribute('data-width'));
            if (width) {
                totalProficiency += width;
                skillCount++;
            }
        });
        
        const averageProficiency = Math.round(totalProficiency / skillCount);
        
        // Display overall proficiency (could be shown in a dashboard widget)
        console.log(`Overall Technical Proficiency: ${averageProficiency}%`);
        
        return averageProficiency;
    }
    
    // Create and append styles
    const style = document.createElement('style');
    style.textContent = skillAnimationCSS;
    document.head.appendChild(style);
    
    // Initialize all features
    initSkillInteractions();
    initTagCloudInteractions();
    initLearningGoalsInteractions();
    initScrollAnimations();
    
    // Calculate and display overall proficiency after page load
    setTimeout(() => {
        calculateOverallProficiency();
    }, 1000);
    
    // Add keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Ensure skill items are focusable
            const skillItems = document.querySelectorAll('.skill-item');
            skillItems.forEach(item => {
                item.tabIndex = 0;
            });
        }
    });
});