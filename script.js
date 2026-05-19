// Mobile menu toggle
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Smooth scrolling for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks?.classList.remove('active');
        }
    });
});

// Navbar style on scroll
const navbar = document.getElementById('navbar');
const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal-on-scroll for content blocks
const revealTargets = document.querySelectorAll(
    '.service-card, .price-table, .contact-card, .about-text, .about-image, .stat, .hero-floating-card'
);

revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
});

revealTargets.forEach(el => revealObserver.observe(el));

// Animate stat numbers when they enter the viewport
const statEls = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.textContent.trim();
        const match = raw.match(/^(\d[\d,]*)(.*)$/);
        if (!match) {
            observer.unobserve(el);
            return;
        }
        const targetNum = parseInt(match[1].replace(/,/g, ''), 10);
        const suffix = match[2];
        const duration = 1400;
        const start = performance.now();
        const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(targetNum * eased);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) requestAnimationFrame(animate);
            else el.textContent = targetNum.toLocaleString() + suffix;
        };
        requestAnimationFrame(animate);
        observer.unobserve(el);
    });
}, { threshold: 0.5 });

statEls.forEach(el => statObserver.observe(el));
