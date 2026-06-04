document.addEventListener('DOMContentLoaded', () => {

    // ─── 1. HAMBURGER MENU ──────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // ─── 2. SMOOTH SCROLL (anchor links) ────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── 3. SCROLL REVEAL ───────────────────────────────────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // ─── 4. STICKY MOBILE BOOK BUTTON ───────────────────────────
    // Hide sticky button when footer is in view
    const stickyBook = document.querySelector('.sticky-book');
    const footerEl   = document.querySelector('footer');

    if (stickyBook && footerEl) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                stickyBook.classList.toggle('sticky-book--hidden', entry.isIntersecting);
            });
        }, { threshold: 0.1 });
        footerObserver.observe(footerEl);
    }

});
