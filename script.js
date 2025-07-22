// Particle system for background effect
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.container = document.getElementById('particles');
        this.init();
    }

    init() {
        this.createParticles();
        this.animate();
    }

    createParticles() {
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random initial position
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const opacity = Math.random() * 0.5 + 0.2;
        const duration = Math.random() * 4 + 3;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.opacity = opacity;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        this.container.appendChild(particle);
        this.particles.push({
            element: particle,
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    animate() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen edges
            if (particle.x < 0) particle.x = window.innerWidth;
            if (particle.x > window.innerWidth) particle.x = 0;
            if (particle.y < 0) particle.y = window.innerHeight;
            if (particle.y > window.innerHeight) particle.y = 0;
            
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });
        
        requestAnimationFrame(() => this.animate());
    }

    // Clean up particles on window resize
    resize() {
        this.particles.forEach(particle => {
            this.container.removeChild(particle.element);
        });
        this.particles = [];
        this.createParticles();
    }
}

// Smooth scrolling for any anchor links
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

// Add loading animation for social links
function addLoadingStates() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add a subtle loading effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Add intersection observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('.intro-section, .skills-section, .social-section, .team-section, .feedback-section').forEach(el => {
        observer.observe(el);
    });
}

// Add keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Allow Enter key to activate social links
        if (e.key === 'Enter' && e.target.classList.contains('social-link')) {
            e.target.click();
        }
    });
}

// Performance optimization: debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add hover sound effects (optional)
function addHoverEffects() {
    const socialLinks = document.querySelectorAll('.social-link');
    const skillItems = document.querySelectorAll('.skill-item');
    const teamMembers = document.querySelectorAll('.team-member');
    
    [...socialLinks, ...skillItems, ...teamMembers].forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (element.classList.contains('team-member')) {
                this.style.transform = 'translateY(-8px)';
            } else {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particle system
    const particleSystem = new ParticleSystem();
    
    // Initialize feedback system
    const feedbackSystem = new FeedbackSystem();
    
    // Initialize other features
    initSmoothScrolling();
    addLoadingStates();
    initIntersectionObserver();
    initKeyboardNavigation();
    addHoverEffects();
    
    // Handle window resize
    const debouncedResize = debounce(() => {
        particleSystem.resize();
    }, 250);
    
    window.addEventListener('resize', debouncedResize);
    
    // Add fade-in effect for the entire page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add focus management for accessibility
document.addEventListener('focusin', function(e) {
    if (e.target.classList.contains('social-link')) {
        e.target.style.outline = '2px solid #00a2ff';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', function(e) {
    if (e.target.classList.contains('social-link')) {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    }
});

// Feedback System Class
class FeedbackSystem {
    constructor() {
        this.currentRating = 0;
        this.webhookUrl = 'https://discord.com/api/webhooks/1396902139506196490/JiKr8_Gjd_a00DtaMQfThItYaY0g2oB0uKQpOXayViZEA7g-mrF4hb7tljh1Nw2ZD12v'; // Replace with actual webhook URL
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateCharacterCount();
    }

    bindEvents() {
        // Star rating events
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => this.setRating(parseInt(star.dataset.rating)));
            star.addEventListener('mouseenter', () => this.highlightStars(parseInt(star.dataset.rating)));
        });

        // Star container mouse leave
        const starRating = document.getElementById('starRating');
        starRating.addEventListener('mouseleave', () => this.highlightStars(this.currentRating));

        // Comment character count
        const commentTextarea = document.getElementById('feedbackComment');
        commentTextarea.addEventListener('input', () => this.updateCharacterCount());

        // Submit button
        const submitBtn = document.getElementById('submitFeedback');
        submitBtn.addEventListener('click', () => this.submitFeedback());

        // Clear button
        const clearBtn = document.getElementById('clearFeedback');
        clearBtn.addEventListener('click', () => this.clearFeedback());
    }

    setRating(rating) {
        this.currentRating = rating;
        this.highlightStars(rating);
        this.updateRatingText(rating);
        this.updateSubmitButton();
    }

    highlightStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    updateRatingText(rating) {
        const ratingText = document.getElementById('ratingText');
        const ratingMessages = {
            1: 'Poor - We\'ll work to improve',
            2: 'Fair - Thanks for the feedback',
            3: 'Good - We appreciate your rating',
            4: 'Very Good - Thank you!',
            5: 'Excellent - You\'re awesome!'
        };
        ratingText.textContent = ratingMessages[rating] || 'Click a star to rate';
    }

    updateCharacterCount() {
        const commentTextarea = document.getElementById('feedbackComment');
        const charCount = document.getElementById('charCount');
        const currentLength = commentTextarea.value.length;
        charCount.textContent = currentLength;
        
        // Change color if approaching limit
        if (currentLength > 450) {
            charCount.style.color = '#fc8181';
        } else if (currentLength > 400) {
            charCount.style.color = '#fbd38d';
        } else {
            charCount.style.color = '#888';
        }
    }

    updateSubmitButton() {
        const submitBtn = document.getElementById('submitFeedback');
        submitBtn.disabled = this.currentRating === 0;
    }

    clearFeedback() {
        this.currentRating = 0;
        this.highlightStars(0);
        this.updateRatingText(0);
        document.getElementById('feedbackComment').value = '';
        this.updateCharacterCount();
        this.updateSubmitButton();
        this.hideStatus();
    }

    async submitFeedback() {
        const comment = document.getElementById('feedbackComment').value.trim();
        const timestamp = new Date().toLocaleString();
        
        // Show loading state
        this.showStatus('Sending feedback...', 'loading');
        
        // Prepare Discord embed
        const embed = {
            title: '⭐ New Feedback Received',
            color: this.getRatingColor(this.currentRating),
            fields: [
                {
                    name: '🌟 Rating',
                    value: `${this.currentRating}/5 stars ${'★'.repeat(this.currentRating)}${'☆'.repeat(5 - this.currentRating)}`,
                    inline: true
                },
                {
                    name: '💬 Comment',
                    value: comment || 'No comment provided',
                    inline: false
                }
            ],
            footer: {
                text: 'Roblox Scripter Portfolio Feedback'
            },
            timestamp: new Date().toISOString()
        };

        const webhookData = {
            username: 'Portfolio Feedback Bot',
            embeds: [embed]
        };

        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(webhookData)
            });

            if (response.ok) {
                this.showStatus('✅ Thank you for your feedback!', 'success');
                // Clear form after successful submission
                setTimeout(() => {
                    this.clearFeedback();
                }, 3000);
            } else {
                throw new Error('Failed to send feedback');
            }
        } catch (error) {
            console.error('Error sending feedback:', error);
            this.showStatus('❌ Failed to send feedback. Please try again.', 'error');
        }
    }

    getRatingColor(rating) {
        const colors = {
            1: 0xff4444, // Red
            2: 0xff8800, // Orange
            3: 0xffaa00, // Yellow-orange
            4: 0x88dd00, // Yellow-green
            5: 0x00ff88  // Green
        };
        return colors[rating] || 0x888888;
    }

    showStatus(message, type) {
        const statusElement = document.getElementById('feedbackStatus');
        statusElement.textContent = message;
        statusElement.className = `feedback-status ${type}`;
    }

    hideStatus() {
        const statusElement = document.getElementById('feedbackStatus');
        statusElement.className = 'feedback-status';
    }
}

// Console Easter egg for fellow developers
console.log(`
🎮 Roblox Scripter Portfolio
💻 Built with modern web technologies
🚀 Ready to create amazing Roblox experiences!

Want to collaborate? Reach out through any of the social links!
`);
