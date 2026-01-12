/**
 * BigValue Flow - Products Page Interactions
 * Handles scroll animations and basic UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHeroAnimation();
});

/**
 * Initializes the IntersectionObserver for scroll reveal animations.
 * Targets elements with class '.scroll-reveal'.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Offset slightly to trigger before bottom
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
}

/**
 * Optional: Adds specific interactive flair to the Hero section
 * e.g. Parallax effect or mouse movement tracking (Micro-interaction)
 */
function initHeroAnimation() {
    const heroSection = document.querySelector('.hero-section');
    const visual = document.querySelector('.hero-visual');

    if (!heroSection || !visual) return;

    heroSection.addEventListener('mousemove', (e) => {
        const xVal = (e.clientX / window.innerWidth - 0.5) * 20;
        const yVal = (e.clientY / window.innerHeight - 0.5) * 20;

        visual.style.transform = `perspective(1000px) rotateY(${xVal}deg) rotateX(${-yVal}deg)`;
    });

    heroSection.addEventListener('mouseleave', () => {
        visual.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    });
}
