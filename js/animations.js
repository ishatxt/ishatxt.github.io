function elementAppears() {
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const elements = document.querySelectorAll(".js-element-appears");
  const childrenElements = document.querySelectorAll(
    ".js-element-appears-children > *",
  );
  if (!elements.length && !childrenElements.length) return;

  function applyBlurEffect(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const maxBlur = 2;
    const blurDistanceBottom = viewportHeight / 4;
    let blurAmount = 0;
    let opacityAmount = 1;
    let translateAmount = 0;
    if (
      rect.top > viewportHeight - blurDistanceBottom &&
      rect.top < viewportHeight + rect.height
    ) {
      const progress =
        1 -
        (rect.top - (viewportHeight - blurDistanceBottom)) / blurDistanceBottom;
      const eased = 0.5 * (1 - Math.cos(Math.PI * progress));
      blurAmount = maxBlur * (1 - progress);
      opacityAmount = progress;
      translateAmount = 30 * (1 - eased);
    }
    element.style.opacity = opacityAmount;
    if (!isSafari) {
      element.style.filter = `blur(${blurAmount}px)`;
      element.style.transform = `translateY(${translateAmount}px)`;
    }
  }

  function onScroll() {
    elements.forEach(applyBlurEffect);
    childrenElements.forEach(applyBlurEffect);
  }

  onScroll();
  window.lenis.on("scroll", onScroll);
}

function mediaFadein() {
  const mediaElements = document.querySelectorAll(".js-media-fadein");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.tagName === "IMG") {
          if (el.complete) {
            requestAnimationFrame(() => show(el));
          } else {
            el.addEventListener("load", () => show(el), { once: true });
          }
        } else if (el.tagName === "VIDEO") {
          if (el.readyState >= 2) {
            requestAnimationFrame(() => show(el));
          } else {
            el.addEventListener("loadeddata", () => show(el), { once: true });
          }
        }
        obs.unobserve(el);
      });
    },
    { threshold: 0.1 },
  );
  mediaElements.forEach((el) => observer.observe(el));

  function show(el) {
    setTimeout(() => {
      el.classList.add("is-visible");
    }, 300);
  }
}

function footerBarLogo() {
  const logo = document.querySelector(".js-footer-bar-logo");
  if (!logo) return;
  const paths = logo.querySelectorAll("path");
  if (paths.length === 0) return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({
            targets: paths,
            translateY: ["105%", "0%"],
            easing: "cubicBezier(0.85, 0, 0.25, 1)",
            duration: 1000,
            delay: anime.stagger(50),
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 1 },
  );
  observer.observe(logo);
}

function heroWithSlider() {
  const elements = document.querySelectorAll(".js-hero-lines");
  if (!elements.length) return;
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        openLines(el);
        observer.unobserve(el);
      });
    },
    { threshold: 0 },
  );
  elements.forEach((el) => observer.observe(el));

  function openLines(element) {
    element.classList.add("is-visible");
  }
}
