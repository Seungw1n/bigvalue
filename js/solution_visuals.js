/**
 * Common Solution Page Visuals
 * Implements "Calm" cursor effects and data visualizations for the standardized hero section.
 */

class VisualManager {
    constructor() {
        this.heroCanvas = document.getElementById('hero-canvas');
        this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        this.init();
    }

    init() {
        // Global Mouse Tracker for subtle parallax everywhere
        window.addEventListener('mousemove', (e) => {
            this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
        });

        // Initialize specific section visuals
        if (this.heroCanvas) this.initHeroVisual();

        // Start Loop
        this.animate();
    }

    lerp(start, end, amt) {
        return (1 - amt) * start + amt * end;
    }

    initHeroVisual() {
        const ctx = this.heroCanvas.getContext('2d');
        let width, height;
        const particles = [];

        const resize = () => {
            // Updated to support new V2 hero visual container
            const container = this.heroCanvas.parentElement;
            width = container.offsetWidth;
            height = container.offsetHeight;
            this.heroCanvas.width = width;
            this.heroCanvas.height = height;

            // Create particles
            particles.length = 0;
            const particleCount = 40; // slightly fewer for performance
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 3 + 1,
                    vx: (Math.random() - 0.5) * 0.3, // Slower, calmer
                    vy: (Math.random() - 0.5) * 0.3,
                    color: i % 2 === 0 ? 'rgba(50, 212, 164, 0.6)' : 'rgba(30, 41, 59, 0.4)'
                });
            }
        };

        window.addEventListener('resize', resize);
        // Delay initial resize slightly to ensure layout is computed
        setTimeout(resize, 100);

        this.heroRender = () => {
            // Smooth mouse
            this.mouse.x = this.lerp(this.mouse.x, this.mouse.targetX, 0.05);
            this.mouse.y = this.lerp(this.mouse.y, this.mouse.targetY, 0.05);

            ctx.clearRect(0, 0, width, height);

            // Connects
            ctx.strokeStyle = 'rgba(50, 212, 164, 0.15)';
            ctx.lineWidth = 1;

            // Update & Draw Particles
            particles.forEach((p, i) => {
                p.x += p.vx + this.mouse.x * 1.5;
                p.y += p.vy + this.mouse.y * 1.5;

                // Wrap
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                // Connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
        };
    }

    animate() {
        if (this.heroRender) this.heroRender();
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new VisualManager();
});

/* 
 * Observer for Isometric Visual Trigger
 */
document.addEventListener('DOMContentLoaded', () => {
    const isoTrigger = document.querySelector('#iso-scene-trigger');
    if (isoTrigger) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                    // Optional: Unobserve if animation should only happen once
                    // observer.unobserve(entry.target);
                } else {
                    entry.target.classList.remove('is-active');
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% visible

        observer.observe(isoTrigger);
    }
});


/* 
 * Scroll-Linked Animation for Data Hub
 */
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('hub-track');
    const satellites = document.querySelectorAll('.sol-iso-node.satellite');
    const lines = document.querySelectorAll('.sol-iso-line');

    if (track && satellites.length > 0) {
        window.addEventListener('scroll', () => {
            const rect = track.getBoundingClientRect();
            const trackHeight = rect.height - window.innerHeight;
            const scrolled = -rect.top; // Amount scrolled into the track

            // Normalize progress 0 to 1
            let progress = Math.min(Math.max(scrolled / trackHeight, 0), 1);

            // Phase 1: Lines Grow (0% - 30%)
            const lineProgress = Math.min(progress / 0.3, 1);
            lines.forEach(line => {
                // target width varies, but assume 200px max
                line.style.width = (lineProgress * 200) + 'px';
                line.style.opacity = lineProgress;
            });

            // Phase 2: Satellites Pop (20% - 80%)
            // Staggered appearance
            satellites.forEach((sat, idx) => {
                const start = 0.2 + (idx * 0.1);
                const end = start + 0.15;
                const p = (progress - start) / (end - start);
                const satProgress = Math.min(Math.max(p, 0), 1);

                // Use CSS var for transform scale
                sat.style.setProperty('--scale', satProgress);
            });

            // Optional: Text Fade Out/In based on progress if needed
        });
    }
});


/*
 * Sticky Feature Observer - Trigger Based
 */
document.addEventListener('DOMContentLoaded', () => {
    const triggers = document.querySelectorAll('.sol-case-trigger');
    const textItems = document.querySelectorAll('.sol-case-text-item');
    const visualItems = document.querySelectorAll('.sol-case-visual-item');
    const stickyWrapper = document.querySelector('.sol-case-sticky-wrapper');

    if (triggers.length > 0 && textItems.length > 0 && visualItems.length > 0) {
        // Set wrapper height dynamically based on number of triggers
        if (stickyWrapper) {
            stickyWrapper.style.height = `${triggers.length * 100}vh`;
        }

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when in middle of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.dataset.index);

                    // Deactivate all items
                    textItems.forEach(item => item.classList.remove('is-active'));
                    visualItems.forEach(item => item.classList.remove('is-active'));

                    // Activate current items
                    const currentText = document.querySelector(`.sol-case-text-item[data-index="${index}"]`);
                    const currentVisual = document.querySelector(`.sol-case-visual-item[data-index="${index}"]`);

                    if (currentText) currentText.classList.add('is-active');
                    if (currentVisual) currentVisual.classList.add('is-active');
                }
            });
        }, observerOptions);

        triggers.forEach(trigger => observer.observe(trigger));
    }
});

