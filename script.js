/* ==========================================================================
   CONVERTPRO - Landing Page JavaScript v2.0
   Animaciones Premium con GSAP
   ========================================================================== */

// Registrar plugins GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ==========================================================================
   1. CONFIGURACIÓN INICIAL
   ========================================================================== */

const CONFIG = {
    loader: {
        minDuration: 1500,
        progressSteps: 20
    },
    cursor: {
        speed: 0.15,
        followerSpeed: 0.08
    },
    animations: {
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }
};

/* ==========================================================================
   2. LOADER
   ========================================================================== */

class Loader {
    constructor() {
        this.loader = document.getElementById('loader');
        this.progress = document.getElementById('loader-progress');
        this.percent = document.getElementById('loader-percent');
        this.currentProgress = 0;
    }

    init() {
        this.animateProgress();
    }

    animateProgress() {
        const duration = CONFIG.loader.minDuration;
        const steps = CONFIG.loader.progressSteps;
        const interval = duration / steps;

        const progressInterval = setInterval(() => {
            this.currentProgress += 100 / steps;
            
            if (this.currentProgress >= 100) {
                this.currentProgress = 100;
                clearInterval(progressInterval);
                this.complete();
            }

            this.updateUI();
        }, interval);
    }

    updateUI() {
        if (this.progress) {
            this.progress.style.width = `${this.currentProgress}%`;
        }
        if (this.percent) {
            this.percent.textContent = `${Math.round(this.currentProgress)}%`;
        }
    }

    complete() {
        setTimeout(() => {
            document.body.classList.remove('loading');
            
            if (this.loader) {
                this.loader.classList.add('hidden');
            }

            // Iniciar animaciones del hero
            heroAnimations.init();
        }, 300);
    }
}

/* ==========================================================================
   3. CURSOR PERSONALIZADO
   ========================================================================== */

class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.follower = document.getElementById('cursor-follower');
        this.pos = { x: 0, y: 0 };
        this.mouse = { x: 0, y: 0 };
        this.followerPos = { x: 0, y: 0 };
    }

    init() {
        if (!this.cursor || !this.follower) return;
        if (window.innerWidth <= 1024) return;

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        this.animate();
        this.setupHoverEffects();
    }

    animate() {
        // Cursor principal - movimiento rápido
        this.pos.x += (this.mouse.x - this.pos.x) * CONFIG.cursor.speed;
        this.pos.y += (this.mouse.y - this.pos.y) * CONFIG.cursor.speed;

        // Follower - movimiento suave
        this.followerPos.x += (this.mouse.x - this.followerPos.x) * CONFIG.cursor.followerSpeed;
        this.followerPos.y += (this.mouse.y - this.followerPos.y) * CONFIG.cursor.followerSpeed;

        if (this.cursor) {
            this.cursor.style.left = `${this.pos.x}px`;
            this.cursor.style.top = `${this.pos.y}px`;
        }

        if (this.follower) {
            this.follower.style.left = `${this.followerPos.x}px`;
            this.follower.style.top = `${this.followerPos.y}px`;
        }

        requestAnimationFrame(() => this.animate());
    }

    setupHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, input, select, .paquete-card, .problema-card, .testimonio-card');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor?.classList.add('hover');
                this.follower?.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor?.classList.remove('hover');
                this.follower?.classList.remove('hover');
            });
        });
    }
}

/* ==========================================================================
   4. NAVEGACIÓN
   ========================================================================== */

class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.toggle = document.getElementById('nav-toggle');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.lastScroll = 0;
    }

    init() {
        this.handleScroll();
        this.handleToggle();
        this.handleLinks();
    }

    handleScroll() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            // Agregar clase scrolled
            if (currentScroll > 50) {
                this.navbar?.classList.add('scrolled');
            } else {
                this.navbar?.classList.remove('scrolled');
            }

            this.lastScroll = currentScroll;
        });
    }

    handleToggle() {
        this.toggle?.addEventListener('click', () => {
            this.toggle.classList.toggle('active');
            this.mobileMenu?.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    handleLinks() {
        // Links del menú móvil
        const mobileLinks = document.querySelectorAll('.mobile-menu-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.toggle?.classList.remove('active');
                this.mobileMenu?.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Smooth scroll para todos los links internos
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: target,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                }
            });
        });

        // Cerrar menú con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.mobileMenu?.classList.contains('active')) {
                this.toggle?.classList.remove('active');
                this.mobileMenu?.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

/* ==========================================================================
   5. ANIMACIONES DEL HERO
   ========================================================================== */

const heroAnimations = {
    init() {
        this.animateContent();
        this.animateStats();
        this.animateVisual();
        this.animateScroll();
    },

    animateContent() {
        const tl = gsap.timeline({ defaults: { ease: CONFIG.animations.ease } });

        tl.to('#hero-badge', {
            opacity: 1,
            y: 0,
            duration: 0.6
        })
        .to('.hero-title .title-line', {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15
        }, '-=0.3')
        .to('#hero-subtitle', {
            opacity: 1,
            y: 0,
            duration: 0.6
        }, '-=0.4')
        .to('#hero-ctas', {
            opacity: 1,
            y: 0,
            duration: 0.6
        }, '-=0.3')
        .to('#hero-stats', {
            opacity: 1,
            y: 0,
            duration: 0.6
        }, '-=0.3');
    },

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.count);
            
            gsap.to(stat, {
                innerHTML: target,
                duration: 2,
                delay: 1,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 90%'
                }
            });
        });
    },

    animateVisual() {
        const visual = document.getElementById('hero-visual');
        if (!visual) return;

        gsap.to(visual, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1,
            delay: 0.8,
            ease: 'power3.out'
        });

        // Animar badges flotantes
        gsap.to('.float-badge', {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            delay: 1.2,
            ease: 'back.out(1.7)'
        });

        // Floating animation para badges
        gsap.to('.badge-conversions', {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.badge-leads', {
            y: 10,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.5
        });

        gsap.to('.badge-sales', {
            y: -8,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1
        });
    },

    animateScroll() {
        gsap.to('#hero-scroll', {
            opacity: 1,
            duration: 0.6,
            delay: 1.5
        });
    }
};

/* ==========================================================================
   6. SCROLL ANIMATIONS
   ========================================================================== */

class ScrollAnimations {
    init() {
        this.animateSections();
        this.animateProblemaCards();
        this.animateSolucionSection();
        this.animatePropuestaSection();
        this.animatePaquetesSection();
        this.animateProcesoSection();
        this.animateTestimoniosSection();
        this.animateContactoSection();
    }

    animateSections() {
        // Headers de secciones
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header.querySelectorAll('.section-tag, .section-title, .section-desc'), {
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%'
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: CONFIG.animations.ease
            });
        });
    }

    animateProblemaCards() {
        gsap.utils.toArray('.problema-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.1,
                ease: CONFIG.animations.ease
            });
        });

        // Quote box
        gsap.from('.quote-box', {
            scrollTrigger: {
                trigger: '.quote-box',
                start: 'top 85%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: CONFIG.animations.ease
        });
    }

    animateSolucionSection() {
        // Mockup
        gsap.from('.showcase-mockup', {
            scrollTrigger: {
                trigger: '.solucion-showcase',
                start: 'top 80%'
            },
            x: -60,
            opacity: 0,
            duration: 1,
            ease: CONFIG.animations.ease
        });

        // Metrics flotantes
        gsap.from('.metric-float', {
            scrollTrigger: {
                trigger: '.showcase-metrics',
                start: 'top 80%'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });

        // Benefits
        gsap.utils.toArray('.benefit-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%'
                },
                x: 40,
                opacity: 0,
                duration: 0.6,
                delay: i * 0.1,
                ease: CONFIG.animations.ease
            });
        });
    }

    animatePropuestaSection() {
        // Content
        gsap.from('.propuesta-content', {
            scrollTrigger: {
                trigger: '.propuesta-grid',
                start: 'top 80%'
            },
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: CONFIG.animations.ease
        });

        // Features
        gsap.utils.toArray('.propuesta-features .feature-item').forEach((item, i) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%'
                },
                x: -30,
                opacity: 0,
                duration: 0.5,
                delay: i * 0.1,
                ease: CONFIG.animations.ease
            });
        });

        // Comparison cards
        gsap.from('.comparison-card.bad', {
            scrollTrigger: {
                trigger: '.propuesta-comparison',
                start: 'top 80%'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: CONFIG.animations.ease
        });

        gsap.from('.comparison-card.good', {
            scrollTrigger: {
                trigger: '.propuesta-comparison',
                start: 'top 80%'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            ease: CONFIG.animations.ease
        });
    }

    animatePaquetesSection() {
        gsap.utils.toArray('.paquete-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%'
                },
                y: 60,
                opacity: 0,
                duration: 0.8,
                delay: i * 0.15,
                ease: CONFIG.animations.ease
            });
        });

        gsap.from('.paquetes-guarantee', {
            scrollTrigger: {
                trigger: '.paquetes-guarantee',
                start: 'top 90%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: CONFIG.animations.ease
        });
    }

    animateProcesoSection() {
        const steps = gsap.utils.toArray('.proceso-step');
        const timelineProgress = document.getElementById('timeline-progress');

        steps.forEach((step, i) => {
            gsap.from(step, {
                scrollTrigger: {
                    trigger: step,
                    start: 'top 80%',
                    onEnter: () => {
                        step.classList.add('active');
                        
                        // Actualizar progreso de la línea
                        if (timelineProgress) {
                            const progress = ((i + 1) / steps.length) * 100;
                            gsap.to(timelineProgress, {
                                height: `${progress}%`,
                                duration: 0.5,
                                ease: 'power2.out'
                            });
                        }
                    }
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                ease: CONFIG.animations.ease
            });
        });
    }

    animateTestimoniosSection() {
        gsap.from('.testimonios-carousel', {
            scrollTrigger: {
                trigger: '.testimonios-carousel',
                start: 'top 85%'
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: CONFIG.animations.ease
        });

        gsap.from('.trust-logos', {
            scrollTrigger: {
                trigger: '.trust-logos',
                start: 'top 90%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: CONFIG.animations.ease
        });
    }

    animateContactoSection() {
        gsap.from('.contacto-content', {
            scrollTrigger: {
                trigger: '.contacto-wrapper',
                start: 'top 80%'
            },
            x: -40,
            opacity: 0,
            duration: 0.8,
            ease: CONFIG.animations.ease
        });

        gsap.from('.contacto-form-wrapper', {
            scrollTrigger: {
                trigger: '.contacto-wrapper',
                start: 'top 80%'
            },
            x: 40,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: CONFIG.animations.ease
        });
    }
}

/* ==========================================================================
   7. TESTIMONIOS CAROUSEL
   ========================================================================== */

class TestimoniosCarousel {
    constructor() {
        this.track = document.getElementById('testimonios-track');
        this.prevBtn = document.getElementById('testimonios-prev');
        this.nextBtn = document.getElementById('testimonios-next');
        this.dotsContainer = document.getElementById('testimonios-dots');
        this.cards = [];
        this.currentIndex = 0;
        this.cardWidth = 0;
        this.gap = 24;
        this.visibleCards = 3;
        this.autoplayInterval = null;
    }

    init() {
        if (!this.track) return;

        this.cards = Array.from(this.track.querySelectorAll('.testimonio-card'));
        if (this.cards.length === 0) return;

        this.calculateDimensions();
        this.createDots();
        this.setupEventListeners();
        this.startAutoplay();

        // Recalcular en resize
        window.addEventListener('resize', () => {
            this.calculateDimensions();
            this.goToSlide(this.currentIndex);
        });
    }

    calculateDimensions() {
        const containerWidth = this.track.parentElement.offsetWidth;
        
        if (window.innerWidth <= 700) {
            this.visibleCards = 1;
        } else if (window.innerWidth <= 1100) {
            this.visibleCards = 2;
        } else {
            this.visibleCards = 3;
        }

        this.cardWidth = (containerWidth - (this.gap * (this.visibleCards - 1))) / this.visibleCards;
        
        this.cards.forEach(card => {
            card.style.flex = `0 0 ${this.cardWidth}px`;
            card.style.minWidth = `${this.cardWidth}px`;
        });
    }

    createDots() {
        if (!this.dotsContainer) return;

        const totalDots = Math.ceil(this.cards.length - this.visibleCards + 1);
        this.dotsContainer.innerHTML = '';

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    setupEventListeners() {
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Pausar autoplay en hover
        this.track.addEventListener('mouseenter', () => this.stopAutoplay());
        this.track.addEventListener('mouseleave', () => this.startAutoplay());

        // Touch events
        let startX = 0;
        let isDragging = false;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoplay();
        });

        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
        });

        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }

            isDragging = false;
            this.startAutoplay();
        });
    }

    prev() {
        const maxIndex = this.cards.length - this.visibleCards;
        this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1;
        this.goToSlide(this.currentIndex);
    }

    next() {
        const maxIndex = this.cards.length - this.visibleCards;
        this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1;
        this.goToSlide(this.currentIndex);
    }

    goToSlide(index) {
        const maxIndex = this.cards.length - this.visibleCards;
        this.currentIndex = Math.max(0, Math.min(index, maxIndex));
        
        const offset = this.currentIndex * (this.cardWidth + this.gap);
        
        gsap.to(this.track, {
            x: -offset,
            duration: 0.5,
            ease: 'power3.out'
        });

        this.updateDots();
    }

    updateDots() {
        const dots = this.dotsContainer?.querySelectorAll('.dot');
        dots?.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => this.next(), 5000);
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

/* ==========================================================================
   8. FORMULARIO DE CONTACTO
   ========================================================================== */

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form?.querySelector('.btn-submit');
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupInputAnimations();
    }

    setupInputAnimations() {
        const inputs = this.form.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('focused');
            });
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) return;

        // Estado de loading
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        // Simular envío (reemplazar con lógica real)
        await this.simulateSubmit();

        // Estado de éxito
        this.submitBtn.classList.remove('loading');
        this.submitBtn.classList.add('success');

        // Resetear después de 3 segundos
        setTimeout(() => {
            this.submitBtn.classList.remove('success');
            this.submitBtn.disabled = false;
            this.form.reset();
        }, 3000);
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                this.showError(field);
            } else {
                this.clearError(field);
            }
        });

        // Validar email
        const emailField = this.form.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                isValid = false;
                this.showError(emailField);
            }
        }

        return isValid;
    }

    showError(field) {
        field.style.borderColor = 'var(--error)';
        gsap.fromTo(field, 
            { x: -10 }, 
            { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
        );
    }

    clearError(field) {
        field.style.borderColor = '';
    }

    simulateSubmit() {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
}

/* ==========================================================================
   9. MAGNETIC BUTTONS
   ========================================================================== */

class MagneticButtons {
    constructor() {
        this.buttons = document.querySelectorAll('.magnetic-btn');
    }

    init() {
        if (window.innerWidth <= 1024) return;

        this.buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => this.handleMouseMove(e, btn));
            btn.addEventListener('mouseleave', (e) => this.handleMouseLeave(e, btn));
        });
    }

    handleMouseMove(e, btn) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    }

    handleMouseLeave(e, btn) {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
        });
    }
}

/* ==========================================================================
   10. PARALLAX EFFECTS
   ========================================================================== */

class ParallaxEffects {
    init() {
        this.setupOrbParallax();
        this.setupMockupParallax();
    }

    setupOrbParallax() {
        const orbs = document.querySelectorAll('.orb');
        
        orbs.forEach((orb, i) => {
            gsap.to(orb, {
                y: () => -100 * (i + 1),
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }

    setupMockupParallax() {
        const metrics = document.querySelectorAll('.metric-float');
        
        metrics.forEach((metric, i) => {
            gsap.to(metric, {
                y: -30 * (i + 1),
                scrollTrigger: {
                    trigger: '.solucion-showcase',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        });
    }
}

/* ==========================================================================
   11. PAQUETE SELECTION
   ========================================================================== */

class PaqueteSelection {
    init() {
        const paqueteLinks = document.querySelectorAll('.paquete-btn');
        const paqueteSelect = document.getElementById('paquete');

        paqueteLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const card = link.closest('.paquete-card');
                const plan = card?.dataset.plan;

                if (plan && paqueteSelect) {
                    // Pre-seleccionar el paquete en el formulario
                    paqueteSelect.value = plan;
                    
                    // Highlight visual
                    gsap.fromTo(paqueteSelect, 
                        { backgroundColor: 'rgba(124, 58, 237, 0.2)' },
                        { backgroundColor: 'transparent', duration: 1 }
                    );
                }
            });
        });
    }
}

/* ==========================================================================
   12. INICIALIZACIÓN
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Agregar clase loading al body
    document.body.classList.add('loading');

    // Inicializar componentes
    const loader = new Loader();
    const cursor = new CustomCursor();
    const navigation = new Navigation();
    const scrollAnimations = new ScrollAnimations();
    const testimoniosCarousel = new TestimoniosCarousel();
    const contactForm = new ContactForm();
    const magneticButtons = new MagneticButtons();
    const parallaxEffects = new ParallaxEffects();
    const paqueteSelection = new PaqueteSelection();

    loader.init();
    cursor.init();
    navigation.init();
    
    // Esperar a que el loader termine para iniciar las demás animaciones
    setTimeout(() => {
        scrollAnimations.init();
        testimoniosCarousel.init();
        contactForm.init();
        magneticButtons.init();
        parallaxEffects.init();
        paqueteSelection.init();
    }, CONFIG.loader.minDuration + 500);
});

/* ==========================================================================
   13. REFRESH SCROLL TRIGGER EN RESIZE
   ========================================================================== */

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

/* ==========================================================================
   14. SMOOTH SCROLL POLYFILL FALLBACK
   ========================================================================== */

if (!('scrollBehavior' in document.documentElement.style)) {
    // Usar GSAP como fallback para navegadores que no soportan scroll-behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}
