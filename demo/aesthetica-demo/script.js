// ============================================================
// Aesthetica Innovations — Site Script
// Handles: mobile navigation, smooth scroll (Lenis),
// scroll-triggered animations (GSAP), reduced-motion fallback
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    function closeMobileNav() {
        navLinks?.classList.remove('nav-open');
        navToggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-locked');
    }

    // ---- Mobile hamburger toggle ----
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('nav-locked', isOpen);
        });
    }

    // Close the mobile menu if the viewport grows back to desktop size
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMobileNav();
    });

    // ---- Smooth scroll (Lenis) — skipped if user prefers reduced motion ----
    let lenis = null;
    if (!prefersReducedMotion && window.Lenis) {
        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
    }

    // ---- Nav link clicks: smooth scroll + close mobile menu ----
    document.querySelectorAll('[data-scroll-to]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            closeMobileNav();

            if (lenis) {
                lenis.scrollTo(targetId, {
                    offset: -100, // adjust to offset the fixed header height
                    duration: 1.5
                });
            } else if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ---- GSAP ScrollTrigger animations — skipped if reduced motion ----
    if (!prefersReducedMotion && window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        if (lenis) {
            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });
            gsap.ticker.lagSmoothing(0, 0);
        }

        // Hero animations
        gsap.from(".hero-title", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.2
        });
        gsap.from(".hero-subtitle", {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.5
        });

        // Parallax hero background
        gsap.to(".hero-bg", {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Scroll-triggered reveals
        document.querySelectorAll(".animate-text").forEach(text => {
            gsap.from(text, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        document.querySelectorAll(".animate-fade").forEach(el => {
            gsap.from(el, {
                y: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                }
            });
        });

        document.querySelectorAll(".animate-img").forEach(img => {
            gsap.from(img, {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: img,
                    start: "top 80%"
                }
            });
        });

        document.querySelectorAll(".animate-card").forEach(card => {
            gsap.from(card, {
                y: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%"
                }
            });
        });
    }
});
