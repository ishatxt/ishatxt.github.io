function toggleMenu() {
  let isThrottled = false;
  document.addEventListener("click", (event) => {
    const self = event.target;
    const timeOut = 1000;
    if (self.href) {
      const hash = self.href.split("#")[1];
      if (hash === "contact") {
        document.querySelector(".js-menu-button").click();
        setTimeout(() => {
          window.lenis.scrollTo("#end-of-page", {
            duration: 1.5,
            easing: (t) =>
              t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
          });
        }, timeOut);
      }
    }
    if (!self.classList.contains("js-menu-button")) return;
    event.preventDefault();
    if (isThrottled) return;
    isThrottled = true;
    const menu = document.querySelector(".js-menu");
    const blocks = document.querySelector(".js-blocks");
    const footer = document.querySelector(".js-footer-bar");
    const links = document.querySelectorAll(".js-menu-links");
    const socialLinks = document.querySelectorAll(".js-menu-social-links");
    const timeIn = 600;
    const isOpening = !menu.classList.contains("is-open");
    if (isOpening) {
      openMenu();
    } else {
      closeMenu();
    }
    setTimeout(() => {
      isThrottled = false;
    }, 1000);

    function openMenu() {
      window.lenis.stop();
      self.classList.add("is-open");
      menu.classList.add("is-open");
      if (blocks) blocks.classList.add("is-grayed");
      if (footer) footer.classList.add("is-grayed");
      if (socialLinks && links) {
        setTimeout(() => {
          links.forEach((link) => {
            link.classList.remove("!delay-0");
            link.classList.remove("!duration-0");
            link.classList.add("is-visible");
          });
        }, timeIn);
        setTimeout(() => {
          socialLinks.forEach((link) => link.classList.add("is-visible"));
        }, timeIn * 2.1);
      }
    }

    function closeMenu() {
      self.classList.remove("is-open");
      menu.classList.remove("is-open");
      if (blocks) blocks.classList.remove("is-grayed");
      if (footer) footer.classList.remove("is-grayed");
      if (socialLinks && links) {
        setTimeout(() => {
          links.forEach((link) => {
            link.classList.remove("is-visible");
            link.classList.add("!delay-0");
            link.classList.add("!duration-0");
          });
          socialLinks.forEach((link) => link.classList.remove("is-visible"));
          window.lenis.start();
        }, timeOut);
      }
    }
  });
}

function services() {
  const links = document.querySelectorAll(".js-services-link");
  const contents = document.querySelectorAll(".js-services-content");
  contents.forEach((content) => content.classList.add("is-hidden"));
  if (contents.length > 0) {
    contents[0].classList.remove("is-hidden");
    links[0]?.classList.add("is-active");
  }
  links.forEach((link) => {
    link.addEventListener("click", () => {
      const serviceId = link.dataset.service;
      contents.forEach((content) => content.classList.add("is-hidden"));
      links.forEach((l) => l.classList.remove("is-active"));
      const targetContent = document.querySelector(
        `.js-services-content[data-service="${serviceId}"]`,
      );
      if (targetContent) {
        targetContent.classList.remove("is-hidden");
      }
      link.classList.add("is-active");
    });
  });
}

function itemSiblings() {
  const items = document.querySelectorAll(".js-item-siblings");
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      items.forEach((sibling) => {
        if (sibling !== item) {
          sibling.classList.add("is-not-hovered");
        }
      });
    });
    item.addEventListener("mouseleave", () => {
      items.forEach((sibling) => {
        sibling.classList.remove("is-not-hovered");
      });
    });
  });
}

function highlights() {
  document.addEventListener("click", (event) => {
    const self = event.target;
    if (self.classList.contains("js-highlight-line")) {
      event.preventDefault();
      const container = self.closest(".js-highlight");
      const description = container.querySelector(".js-highlight-description");
      const isOpen = description.classList.contains("is-open");
      if (isOpen) {
        const currentHeight = description.scrollHeight;
        container.classList.remove("is-open");
        anime({
          targets: description,
          height: [currentHeight + "px", "0px"],
          duration: 500,
          easing: "easeInOutCirc",
          begin: () => {
            description.style.overflow = "hidden";
          },
          complete: () => {
            description.classList.remove("is-open");
            description.style.height = "";
            description.style.overflow = "";
          },
        });
      } else {
        description.style.height = "auto";
        const targetHeight = description.scrollHeight;
        description.style.height = "0px";
        description.classList.add("is-open");
        container.classList.add("is-open");
        anime({
          targets: description,
          height: targetHeight + "px",
          duration: 500,
          easing: "easeInOutCirc",
          complete: () => {
            description.style.height = "auto";
          },
        });
      }
    }
  });
}

function swapImages() {
  const sliders = document.querySelectorAll(".js-fade-slider");
  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".fade-slide");
    if (slides.length <= 1) return;
    let current = 0;
    let interval = null;
    let isLargeScreen = window.matchMedia(
      `(min-width: ${responsive.lg}px)`,
    ).matches;
    const customDelay = parseInt(slider.getAttribute("data-slider-delay"), 10);
    let duration = !isNaN(customDelay)
      ? customDelay
      : isLargeScreen
        ? 500
        : 750;

    function resetSlides() {
      slides.forEach((slide, i) => {
        if (i === 0) {
          slide.classList.add("opacity-100", "z-10");
          slide.classList.remove("opacity-0", "z-0");
        } else {
          slide.classList.add("opacity-0", "z-0");
          slide.classList.remove("opacity-100", "z-10");
        }
      });
      current = 0;
    }

    function showNext() {
      const next = (current + 1) % slides.length;
      slides[current].classList.remove("opacity-100", "z-10");
      slides[current].classList.add("opacity-0", "z-0");
      slides[next].classList.remove("opacity-0", "z-0");
      slides[next].classList.add("opacity-100", "z-10");
      current = next;
    }

    function startSlider() {
      if (!interval) {
        interval = setInterval(showNext, duration);
      }
    }

    function stopSlider() {
      clearInterval(interval);
      interval = null;
    }

    function applyBehavior() {
      stopSlider();
      resetSlides();
      isLargeScreen = window.matchMedia(
        `(min-width: ${responsive.lg}px)`,
      ).matches;
      duration = !isNaN(customDelay) ? customDelay : isLargeScreen ? 750 : 750;
      startSlider();
    }

    applyBehavior();
    window.addEventListener("resize", () => {
      applyBehavior();
    });
  });
}
