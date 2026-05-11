function lenisScroll() {
  window.lenis = new Lenis({
    lerp: 0.13,
    wrapper: document.querySelector(".js-lenis-wrapper"),
    content: document.querySelector(".js-lenis-content"),
  });

  function raf(time) {
    window.lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

function barbaPageTransition() {
  const transitionDelay = 500,
    transitionEasing = "easeOutCubic",
    transitionTarget = document.querySelector(".js-page-wrapper"),
    transitionY = 20,
    delay = (ms = transitionDelay * 2) =>
      new Promise((resolve) => setTimeout(resolve, ms));
  const body = document.querySelector("body");

  function to(data) {
    window.lenis.stop();
    anime({
      targets: transitionTarget,
      opacity: [1, 0],
      easing: transitionEasing,
      duration: transitionDelay,
    });
  }

  function ti(data) {
    window.lenis.start();
    window.lenis.scrollTo(0, { immediate: true });
    anime({
      targets: transitionTarget,
      opacity: [0, 1],
      easing: transitionEasing,
      duration: transitionDelay,
      complete: function () {
        window.lenis.start();
      },
    });
    setTimeout(() => {
      ifFunctionExist("swapImages");
      ifFunctionExist("footerBarLogo");
      ifFunctionExist("heroWithSlider");
      ifFunctionExist("lenisScroll");
      ifFunctionExist("heroWithVideo");
      ifFunctionExist("playVideo");
      ifFunctionExist("sliderGallery");
      ifFunctionExist("galleryLightbox");
      ifFunctionExist("elementAppears");
      ifFunctionExist("services");
      ifFunctionExist("itemSiblings");
      ifFunctionExist("playVideoOnHover");
      ifFunctionExist("mediaFadein");
    }, 10);
  }

  barba.init({
    schema: { wrapper: "js-barba-wrapper", container: "js-barba-content" },
    sync: true,
    timeout: 10000,
    transitions: [
      {
        async leave(data) {
          const done = this.async();
          to(data);
          await delay(transitionDelay);
          done();
        },
        async enter(data) {
          ti(data);
        },
        async once(data) {},
      },
    ],
    prevent: ({ el }) =>
      el.classList && el.classList.contains("js-barba-prevent"),
  });
  barba.hooks.enter(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
  barba.hooks.beforeEnter((data) => {
    if (data.current.container) {
      const nh = data.next.html;
      const p = new DOMParser();
      const dc = p.parseFromString(
        nh.replace(/(<\/?)body( .+?)?>/gi, "$1notbody$2>", nh),
        "text/html",
      );
      const bc = dc.querySelector("notbody").getAttribute("class");
      body.setAttribute("class", bc);
    }
  });
}
