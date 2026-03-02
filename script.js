document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll Progress Bar
    const progressBar = document.getElementById('progressBar');
    window.addEventListener('scroll', () => {
        const scrollPx = document.documentElement.scrollTop;
        const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (scrollPx / winHeightPx) * 100;
        progressBar.style.width = `${scrolled}%`;
    });

    // 3. Intersection Observer for Reveal Animations
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Timeline Line Animation
    const timelineLine = document.getElementById('timelineLine');
    const experienceSection = document.getElementById('experience');

    window.addEventListener('scroll', () => {
        const rect = experienceSection.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        if (rect.top < viewHeight && rect.bottom > 0) {
            const total = rect.height;
            const current = viewHeight - rect.top;
            const progress = Math.min(Math.max(current / total, 0), 1);
            timelineLine.style.height = `${progress * 100}%`;
        }
    });

    // 5. Mobile Menu Toggle (Minimal Implementation)
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    
    menuBtn.addEventListener('click', () => {
        // Since we didn't add a mobile nav drawer yet, this is a placeholder
        // for where you'd toggle a 'nav-open' class.
        console.log('Menu toggled');
    });

    // 6. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
