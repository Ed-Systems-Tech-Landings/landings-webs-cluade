/* ==========================================================================
   CONVERTPRO - Landing Page de Alta Conversión
   JavaScript - Animaciones PRO con GSAP
   ========================================================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    
    // Initialize all modules
    initLoader();
    initCursor();
    initNavbar();
    initMobileMenu();
    initHeroAnimations();
    initParticles();
    initScrollAnimations();
    initCounterAnimations();
    initTestimoniosSlider();
    initFormHandling();
    initSmoothScroll();
    initMagneticButtons();
});

/* ==========================================================================
   LOADER
   ========================================================================== */
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;
        loaderProgress.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.classList.remove('loading');
                // Trigger hero animations after loader
                animateHeroContent();
            }, 500);
        }
    }, 200);
}

/* ==========================================================================
   CUSTOM CURSOR
   ========================================================================== */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    // Check if device supports hover
    if (!matchMedia('(hover: hover)').matches) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update cursor position immediately
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    
    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .paquete-card, .problema-card, .testimonio-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            follower.classList.remove('hover');
        });
    });
}

/* ==========================================================================
   NAVBAR
   ========================================================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

/* ==========================================================================
   MOBILE MENU
   ========================================================================== */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');
    
    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

/* ==========================================================================
   HERO ANIMATIONS
   ========================================================================== */
function initHeroAnimations() {
    // This sets up the timeline, actual animation triggered after loader
}

function animateHeroContent() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8
    })
    .to('.hero-title .title-line', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out'
    }, '-=0.4')
    .to('.hero-subtitle', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.6')
    .to('.hero-cta-group', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.5')
    .to('.hero-stats', {
        opacity: 1,
        y: 0,
        duration: 0.8
    }, '-=0.4');
    
    // Animate stats numbers
    setTimeout(() => {
        animateCounters();
    }, 1500);
}

/* ==========================================================================
   PARTICLES
   ========================================================================== */
function initParticles() {
    createParticles('particles', 30);
    createParticles('cta-particles', 20);
}

function createParticles(containerId, count) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (5 + Math.random() * 5) + 's';
        particle.style.opacity = 0.2 + Math.random() * 0.5;
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

/* ==========================================================================
   SCROLL ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
    // Problema Cards
    gsap.utils.toArray('.problema-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header.querySelectorAll('.title-reveal'), 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Benefits
    gsap.utils.toArray('.benefit-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Paquetes
    gsap.utils.toArray('.paquete-card').forEach((card, i) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.paquetes-grid',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Proceso Steps
    gsap.utils.toArray('.proceso-step').forEach((step, i) => {
        gsap.to(step, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.proceso-timeline',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        });
    });
    
    // Timeline progress
    gsap.to('.timeline-progress', {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
            trigger: '.proceso-timeline',
            start: 'top 70%',
            toggleActions: 'play none none none'
        }
    });
    
    // Mockup animation
    gsap.fromTo('.showcase-mockup', 
        { opacity: 0, scale: 0.9, rotateY: -15 },
        {
            opacity: 1,
            scale: 1,
            rotateY: -5,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.showcase-visual',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        }
    );
    
    // Metric floats
    gsap.utils.toArray('.metric-float').forEach((metric, i) => {
        gsap.fromTo(metric, 
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.6,
                delay: 0.5 + i * 0.2,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: '.showcase-visual',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
    
    // Comparison cards
    gsap.fromTo('.comparison-card.bad', 
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.propuesta-comparison',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        }
    );
    
    gsap.fromTo('.comparison-card.good', 
        { opacity: 0, x: 30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.propuesta-comparison',
                start: 'top 75%',
                toggleActions: 'play none none none'
            }
        }
    );
    
    // Contact section
    gsap.fromTo('.contacto-content', 
        { opacity: 0, x: -40 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contacto-wrapper',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );
    
    gsap.fromTo('.contacto-form-wrapper', 
        { opacity: 0, x: 40 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.contacto-wrapper',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );
    
    // Parallax effects
    gsap.utils.toArray('.hero-glow').forEach(glow => {
        gsap.to(glow, {
            y: 200,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    });
}

/* ==========================================================================
   COUNTER ANIMATIONS
   ========================================================================== */
function initCounterAnimations() {
    // Set initial state
    document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        counter.textContent = '0';
    });
}

function animateCounters() {
    document.querySelectorAll('.stat-number[data-count]').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            const current = Math.floor(start + (target - start) * easeProgress);
            
            counter.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    });
}

/* ==========================================================================
   TESTIMONIOS SLIDER
   ========================================================================== */
function initTestimoniosSlider() {
    const track = document.querySelector('.testimonios-track');
    if (!track) return;
    
    // Clone items for infinite scroll
    const items = track.querySelectorAll('.testimonio-card');
    items.forEach(item => {
        const clone = item.cloneNode(true);
        track.appendChild(clone);
    });
}

/* ==========================================================================
   FORM HANDLING
   ========================================================================== */
function initFormHandling() {
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('.btn-submit');
    const formSuccess = document.getElementById('form-success');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        submitBtn.classList.add('loading');
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        submitBtn.classList.remove('loading');
        formSuccess.classList.add('active');
        
        // Animate success icon
        gsap.fromTo('.success-icon', 
            { scale: 0 },
            { scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            // Optionally hide success and show form again
            // formSuccess.classList.remove('active');
        }, 3000);
    });
    
    // Input animations
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/* ==========================================================================
   SMOOTH SCROLL
   ========================================================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (!target) return;
            
            const navHeight = document.querySelector('.navbar').offsetHeight;
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: navHeight
                },
                ease: 'power3.inOut'
            });
        });
    });
}

/* ==========================================================================
   MAGNETIC BUTTONS
   ========================================================================== */
function initMagneticButtons() {
    if (!matchMedia('(hover: hover)').matches) return;
    
    const magneticElements = document.querySelectorAll('.btn-primary, .btn-glow, .nav-cta');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(el, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/* ==========================================================================
   SCROLL REVEAL UTILITY
   ========================================================================== */
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in').forEach(el => {
        observer.observe(el);
    });
}

/* ==========================================================================
   PAQUETE CARDS HOVER EFFECTS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const paqueteCards = document.querySelectorAll('.paquete-card');
    
    paqueteCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add glow effect
            gsap.to(card, {
                boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)',
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                boxShadow: 'none',
                duration: 0.3
            });
        });
    });
});

/* ==========================================================================
   TEXT SCRAMBLE EFFECT (Optional)
   ========================================================================== */
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.el.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

/* ==========================================================================
   TYPING EFFECT
   ========================================================================== */
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/* ==========================================================================
   PERFORMANCE OPTIMIZATION
   ========================================================================== */

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/* ==========================================================================
   DARK MODE TOGGLE (Future Feature)
   ========================================================================== */
function initDarkModeToggle() {
    // This landing page is designed for dark mode by default
    // This function can be expanded for light mode support
}

/* ==========================================================================
   ANALYTICS TRACKING (Placeholder)
   ========================================================================== */
function trackEvent(category, action, label) {
    // Placeholder for analytics tracking
    // Can be integrated with Google Analytics, Mixpanel, etc.
    console.log('Event tracked:', { category, action, label });
}

// Track CTA clicks
document.querySelectorAll('.btn-primary, .btn-glow').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('CTA', 'click', btn.textContent.trim());
    });
});

// Track scroll depth
let maxScroll = 0;
window.addEventListener('scroll', throttle(() => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
            trackEvent('Scroll', 'depth', `${maxScroll}%`);
        }
    }
}, 500));

/* ==========================================================================
   ACCESSIBILITY IMPROVEMENTS
   ========================================================================== */

// Focus management
document.addEventListener('keydown', (e) => {
    // Tab trap for mobile menu
    if (document.body.classList.contains('menu-open')) {
        if (e.key === 'Escape') {
            document.querySelector('.nav-toggle').click();
        }
    }
});

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0);
    
    // Disable CSS animations
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
    
    // Stop all GSAP animations
    gsap.killAll();
}

/* ==========================================================================
   ERROR HANDLING
   ========================================================================== */
window.addEventListener('error', (e) => {
    console.error('Runtime error:', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

/* ==========================================================================
   INITIALIZE ON LOAD
   ========================================================================== */
window.addEventListener('load', () => {
    // Initialize scroll reveal
    initScrollReveal();
    
    // Initialize lazy loading
    lazyLoadImages();
    
    // Refresh ScrollTrigger after all content is loaded
    ScrollTrigger.refresh();
});

// Refresh ScrollTrigger on resize
window.addEventListener('resize', debounce(() => {
    ScrollTrigger.refresh();
}, 250));
