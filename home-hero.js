/**
 * Home Page Hero - Interactive Cursor Animation
 * Creates particle effects that follow the cursor movement
 */

(function() {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const CONFIG = {
        particleCount: 50,
        particleSize: 3,
        particleSpeed: 2,
        connectionDistance: 150,
        mouseInfluenceRadius: 200,
        colors: {
            primary: '#8D8DFB',
            secondary: '#4434e2',
            tertiary: '#ffffff'
        }
    };

    // ==========================================
    // Canvas Setup
    // ==========================================
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) {
        console.warn('Hero canvas not found');
        return;
    }

    // Check if canvas is actually a canvas element
    if (typeof canvas.getContext !== 'function') {
        console.warn('Hero canvas is not a valid canvas element');
        return;
    }

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: CONFIG.mouseInfluenceRadius };
    let animationFrameId = null;

    // Set canvas size
    function resizeCanvas() {
        const heroSection = canvas.parentElement;
        canvas.width = heroSection.offsetWidth;
        canvas.height = heroSection.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });

    // ==========================================
    // Particle Class
    // ==========================================
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * CONFIG.particleSpeed;
            this.vy = (Math.random() - 0.5) * CONFIG.particleSpeed;
            this.size = Math.random() * CONFIG.particleSize + 1;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            // Move particle
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off walls
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Mouse interaction - attract particles
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    this.vx += Math.cos(angle) * force * 0.5;
                    this.vy += Math.sin(angle) * force * 0.5;
                }
            }

            // Limit velocity
            const maxVelocity = CONFIG.particleSpeed * 2;
            const velocity = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (velocity > maxVelocity) {
                this.vx = (this.vx / velocity) * maxVelocity;
                this.vy = (this.vy / velocity) * maxVelocity;
            }

            // Apply friction
            this.vx *= 0.99;
            this.vy *= 0.99;
        }

        draw() {
            ctx.fillStyle = `rgba(141, 141, 251, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // ==========================================
    // Particle System
    // ==========================================
    function initParticles() {
        particles = [];
        for (let i = 0; i < CONFIG.particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONFIG.connectionDistance) {
                    const opacity = (1 - distance / CONFIG.connectionDistance) * 0.3;
                    ctx.strokeStyle = `rgba(141, 141, 251, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        // Clear canvas with slight trail effect
        ctx.fillStyle = 'rgba(12, 11, 23, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Connect nearby particles
        connectParticles();

        // Draw mouse glow effect
        if (mouse.x !== null && mouse.y !== null) {
            const gradient = ctx.createRadialGradient(
                mouse.x, mouse.y, 0,
                mouse.x, mouse.y, mouse.radius
            );
            gradient.addColorStop(0, 'rgba(141, 141, 251, 0.3)');
            gradient.addColorStop(0.5, 'rgba(141, 141, 251, 0.1)');
            gradient.addColorStop(1, 'rgba(141, 141, 251, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    // ==========================================
    // Mouse Events
    // ==========================================
    const heroSection = canvas.parentElement;

    heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    heroSection.addEventListener('mouseenter', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    // ==========================================
    // Stats Animation (Counter)
    // ==========================================
    function animateCounter(element, targetValue, duration = 2000) {
        if (!element) return;

        const startValue = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOutQuad = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuad);

            element.textContent = currentValue.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Animate stats on page load
    function initStatsAnimation() {
        const openingEl = document.querySelector('#stat-opening .hero-new__stat-number');
        const closingEl = document.querySelector('#stat-closing .hero-new__stat-number');
        const rateEl = document.querySelector('#stat-rate .hero-new__stat-number');

        // Simulate real-time data (replace with actual API call)
        setTimeout(() => {
            if (openingEl) animateCounter(openingEl, 1234, 2000);
            if (closingEl) animateCounter(closingEl, 987, 2000);
            if (rateEl) {
                const rateValue = ((1234 / 987) * 100).toFixed(1);
                animateCounter(rateEl, parseFloat(rateValue), 2000);
            }
        }, 500);
    }

    // ==========================================
    // Initialization
    // ==========================================
    function init() {
        initParticles();
        animate();
        initStatsAnimation();
    }

    // Start animation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });

})();
