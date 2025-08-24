// Contact Page Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    
    // Form validation and submission
    function initContactForm() {
        const form = document.querySelector('.contact-form');
        const inputs = form.querySelectorAll('input, textarea');
        const submitBtn = form.querySelector('.btn-submit');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error state on input
                this.classList.remove('error');
                const errorMsg = this.parentNode.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
            
            // Add focus animations
            input.addEventListener('focus', function() {
                this.parentNode.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentNode.classList.remove('focused');
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                submitForm(form);
            }
        });
    }
    
    // Field validation
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Validation rules
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters long';
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    errorMessage = 'Subject must be at least 5 characters long';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters long';
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            field.classList.add('error');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
        
        return isValid;
    }
    
    // Form submission with loading state
    function submitForm(form) {
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        
        // Loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
            // Success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            
            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form after delay
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('success');
                
                // Remove focused class from form groups
                form.querySelectorAll('.form-group').forEach(group => {
                    group.classList.remove('focused');
                });
            }, 3000);
            
        }, 2000);
    }
    
    // Social card interactions
    function initSocialCards() {
        const socialCards = document.querySelectorAll('.social-card');
        
        socialCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.social-icon i');
                const platform = this.classList[1]; // Get platform class (github, twitter, etc.)
                
                // Add platform-specific animations
                switch (platform) {
                    case 'github':
                        icon.className = 'fab fa-github';
                        break;
                    case 'twitter':
                        icon.className = 'fab fa-twitter';
                        icon.style.animation = 'twitterFlap 0.6s ease';
                        break;
                    case 'youtube':
                        icon.className = 'fab fa-youtube';
                        icon.style.animation = 'youtubePlay 0.6s ease';
                        break;
                    case 'instagram':
                        icon.className = 'fab fa-instagram';
                        icon.style.animation = 'instagramPulse 0.6s ease';
                        break;
                    case 'twitch':
                        icon.className = 'fab fa-twitch';
                        icon.style.animation = 'twitchGlow 0.6s ease';
                        break;
                }
                
                // Add hover sound effect (visual feedback)
                this.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.social-icon i');
                icon.style.animation = '';
                this.style.transform = '';
            });
            
            // Click tracking
            card.addEventListener('click', function() {
                const platform = this.classList[1];
                console.log(`Social link clicked: ${platform}`);
                
                // Add click animation
                this.style.animation = 'socialClick 0.3s ease';
                setTimeout(() => {
                    this.style.animation = '';
                }, 300);
            });
        });
    }
    
    // Contact info card interactions
    function initContactCards() {
        const contactItems = document.querySelectorAll('.contact-item');
        
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const icon = this.querySelector('.contact-icon');
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.className = 'contact-ripple';
                icon.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            });
            
            item.addEventListener('mouseleave', function() {
                const icon = this.querySelector('.contact-icon');
                icon.style.transform = '';
            });
        });
    }
    
    // Availability banner animation
    function initAvailabilityBanner() {
        const banner = document.querySelector('.availability-banner');
        const indicator = document.querySelector('.status-indicator');
        
        if (banner && indicator) {
            // Animate availability status
            setInterval(() => {
                indicator.style.animation = 'none';
                indicator.offsetHeight; // Trigger reflow
                indicator.style.animation = 'pulse 2s infinite';
            }, 4000);
            
            // Click to show more info
            banner.addEventListener('click', function() {
                showNotification('I\'m actively looking for internship opportunities and exciting projects to collaborate on!', 'info');
            });
        }
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${getNotificationColor(type)};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: notificationSlideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'notificationSlideOut 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
        
        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.style.animation = 'notificationSlideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Helper functions
    function getNotificationIcon(type) {
        switch (type) {
            case 'success': return 'fa-check-circle';
            case 'error': return 'fa-exclamation-circle';
            case 'warning': return 'fa-exclamation-triangle';
            default: return 'fa-info-circle';
        }
    }
    
    function getNotificationColor(type) {
        switch (type) {
            case 'success': return '#28a745';
            case 'error': return '#dc3545';
            case 'warning': return '#ffc107';
            default: return '#17a2b8';
        }
    }
    
    // Add custom CSS for animations
    const contactAnimationCSS = `
        @keyframes twitterFlap {
            0%, 100% { transform: rotateY(0deg); }
            50% { transform: rotateY(180deg); }
        }
        
        @keyframes youtubePlay {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
        
        @keyframes instagramPulse {
            0% { transform: scale(1); filter: hue-rotate(0deg); }
            50% { transform: scale(1.1); filter: hue-rotate(90deg); }
            100% { transform: scale(1); filter: hue-rotate(0deg); }
        }
        
        @keyframes twitchGlow {
            0%, 100% { filter: brightness(1); }
            50% { filter: brightness(1.3) drop-shadow(0 0 10px #9146ff); }
        }
        
        @keyframes socialClick {
            0% { transform: scale(1); }
            50% { transform: scale(0.95); }
            100% { transform: scale(1); }
        }
        
        @keyframes notificationSlideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes notificationSlideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .contact-ripple {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%) scale(0);
            animation: rippleExpand 0.6s ease-out;
        }
        
        @keyframes rippleExpand {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(2);
                opacity: 0;
            }
        }
        
        .form-group.focused label {
            color: #667eea;
            transform: translateY(-5px);
        }
        
        .form-group input.error,
        .form-group textarea.error {
            border-color: #dc3545;
            box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
        }
        
        .error-message {
            color: #dc3545;
            font-size: 0.875rem;
            margin-top: 5px;
            animation: errorShake 0.5s ease;
        }
        
        @keyframes errorShake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        .btn-submit.loading {
            background: #6c757d;
            cursor: not-allowed;
        }
        
        .btn-submit.success {
            background: #28a745;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
        }
    `;
    
    // Create and append styles
    const style = document.createElement('style');
    style.textContent = contactAnimationCSS;
    document.head.appendChild(style);
    
    // Initialize all features
    initContactForm();
    initSocialCards();
    initContactCards();
    initAvailabilityBanner();
    
    // Add scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    const animatedElements = document.querySelectorAll('.contact-item, .social-card, .contact-form-section');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});