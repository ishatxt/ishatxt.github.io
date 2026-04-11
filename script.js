document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Custom Cursor ──────────────────────────────────
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let fx = 0, fy = 0, cx = 0, cy = 0;

    document.addEventListener('mousemove', e => {
        cx = e.clientX;
        cy = e.clientY;
        cursor.style.left = cx + 'px';
        cursor.style.top  = cy + 'px';
    });

    // Smooth follower
    (function animateFollower() {
        fx += (cx - fx) * 0.1;
        fy += (cy - fy) * 0.1;
        follower.style.left = fx + 'px';
        follower.style.top  = fy + 'px';
        requestAnimationFrame(animateFollower);
    })();

    // Cursor scale on interactive elements
    const interactables = document.querySelectorAll('a, button, input, textarea, .work-item, .skill-card');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = '12px';
            cursor.style.height = '12px';
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.borderColor = 'rgba(201, 169, 110, 0.6)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = '6px';
            cursor.style.height = '6px';
            follower.style.width = '36px';
            follower.style.height = '36px';
            follower.style.borderColor = 'rgba(201, 169, 110, 0.4)';
        });
    });


    // ── 2. Header Scroll ─────────────────────────────────
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });


    // ── 3. Scroll Progress Bar ────────────────────────────
    const scrollBar = document.getElementById('scrollBar');
    window.addEventListener('scroll', () => {
        const p = document.documentElement.scrollTop /
                  (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        scrollBar.style.width = (p * 100) + '%';
    }, { passive: true });


    // ── 4. Reveal Animations (IntersectionObserver) ───────
    const revealEls = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => observer.observe(el));


    // ── 5. Mobile Nav ─────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    let navOpen = false;

    hamburger.addEventListener('click', () => {
        navOpen = !navOpen;
        hamburger.classList.toggle('open', navOpen);
        mobileNav.classList.toggle('open', navOpen);
        document.body.style.overflow = navOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            navOpen = false;
            hamburger.classList.remove('open');
            mobileNav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    // ── 6. Smooth Scroll ─────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ── 7. Active Nav Link Highlight ─────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.style.color = '');
                const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (active) active.style.color = '#c9a96e';
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));


    // ── 8. Contact Form ───────────────────────────────────
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = form.querySelector('.form-submit span');
            btn.textContent = 'Sent ✓';
            form.querySelectorAll('input, textarea').forEach(el => el.value = '');
            setTimeout(() => { btn.textContent = 'Send Message'; }, 3000);
        });
    }


    // ── 9. Marquee pause on hover ────────────────────────
    const marquee = document.querySelector('.marquee-track');
    if (marquee) {
        marquee.addEventListener('mouseenter', () => { marquee.style.animationPlayState = 'paused'; });
        marquee.addEventListener('mouseleave', () => { marquee.style.animationPlayState = 'running'; });
    }

});
