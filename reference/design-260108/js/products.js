/**
 * BigValue Product Overview Interactions
 * Handles scroll animations.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
});

/**
 * Initializes the IntersectionObserver for scroll reveal animations.
 * Targets elements with class '.scroll-reveal'.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealOptions = {
        threshold: 0.1, // Trigger earlier than flow page
        rootMargin: "0px 0px -30px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });
}
