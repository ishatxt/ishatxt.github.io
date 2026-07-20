function preloader() {
  const preloader = document.querySelector(".js-preloader");
  if (!preloader) return;
  const counter = document.querySelector(".js-preloader-count");
  const pageWrapper = document.querySelector(".js-page-wrapper");
  const html = document.documentElement;
  const preloaderInner = preloader.querySelector(".js-preloader-inner");
  const headerBar = document.querySelector(".js-header-bar");
  if (!counter && !pageWrapper && !html && !preloaderInner && !headerBar)
    return;
  const images = Array.from(document.images).filter(
    (img) => img.loading !== "lazy"
  );
  const totalImages = images.length;
  let loadedCount = 0;
  let fontsReady = false;
  const MIN_LOADING_TIME = 4000;
  const startTime = performance.now();
  let actualProgress = 0;

  function updateActualProgress() {
    if (totalImages === 0) {
      actualProgress = fontsReady ? 1 : 0;
    } else {
      actualProgress = (loadedCount + (fontsReady ? 1 : 0)) / (totalImages + 1);
    }
    if (actualProgress > 1) actualProgress = 1;
  }

  function animateProgress() {
    function step() {
      const elapsed = performance.now() - startTime;
      const timeProgress = Math.min(elapsed / MIN_LOADING_TIME, 1);
      const imagesReady = actualProgress >= 1;
      const percent = Math.floor(timeProgress * 100);
      if (counter) {
        const formatted = `${percent < 10 ? "0" : " "}${percent}%`;
        counter.innerHTML = [...formatted]
          .map((char) => `<span>${char}</span>`)
          .join("");
      }
      if (percent < 100) {
        requestAnimationFrame(step);
      } else if (!imagesReady) {
        requestAnimationFrame(step);
      } else {
        finishLoading();
      }
    }
    requestAnimationFrame(step);
  }

  function finishLoading() {
    counter.innerHTML =
      "<span>1</span>" + "<span>0</span>" + "<span>0</span>" + "<span>%</span>";
    preloader.style.transition = "opacity 0.5s ease";
    preloader.style.opacity = 0;
    setTimeout(() => {
      preloader.remove();
      html.style.overflow = "auto";
      html.style.pointerEvents = "auto";
      pageWrapper.style.display = "block";
      headerBar.style.opacity = "0";
      setTimeout(() => {
        headerBar.classList.add("is-visible");
      }, 250);
    }, 1000);
  }

  document.fonts.ready.then(() => {
    fontsReady = true;
    updateActualProgress();
  });
  if (totalImages === 0) {
    loadedCount = 1;
    updateActualProgress();
  }
  images.forEach((img) => {
    if (img.complete) {
      loadedCount++;
      updateActualProgress();
    } else {
      img.addEventListener("load", () => {
        loadedCount++;
        updateActualProgress();
      });
      img.addEventListener("error", () => {
        loadedCount++;
        updateActualProgress();
      });
    }
  });
  setTimeout(() => {
    html.style.opacity = "1";
    preloaderInner.classList.add("is-visible");
    setTimeout(() => {
      animateProgress();
    }, 700);
  }, 1000);
}

function playVideo() {
  document.querySelectorAll(".js-play-video").forEach((videoEl) => {
    if (videoEl.tagName === "VIDEO") {
      videoEl.play().catch((err) => {
        console.warn("Thumbnail video failed to play:", err);
      });
    }
  });
  document.querySelectorAll(".js-play-video video").forEach((videoEl) => {
    videoEl.play().catch((err) => {
      console.warn("Main hero video failed to play:", err);
    });
  });
}

function heroWithVideo() {
  const wrapper = document.querySelector(".js-hero-w-video-video");
  const thumbnail = document.querySelector(".js-hero-w-video-thumbnail");
  const spacer = document.querySelector(".js-hero-w-video-spacer");
  if (!wrapper || !thumbnail || !spacer) return;
  let maxHeight = (window.innerWidth - 30) / (16 / 9);
  const initialThumbRect = thumbnail.getBoundingClientRect();
  const initialThumbWidth = initialThumbRect.width;
  const initialThumbHeight = initialThumbRect.height;

  function onScroll(scroll) {
    const clampedScroll = Math.min(Math.max(scroll, 0), maxHeight);
    wrapper.style.height = `${clampedScroll}px`;
    const progress = clampedScroll / maxHeight;
    const newThumbWidth = initialThumbWidth * (1 - progress * 2);
    const newThumbHeight = initialThumbHeight * (1 - progress * 2);
    if (progress == 1) {
      wrapper.classList.replace("fixed", "relative");
      spacer.classList.add("hidden");
    }
  }

  window.lenis.on("scroll", (e) => {
    onScroll(e.scroll);
  });
  window.addEventListener("resize", () => {
    maxHeight = window.innerWidth / (16 / 9);
  });
}

function playVideoOnHover() {
  const videosOnHover = document.querySelectorAll(".js-play-video-on-hover");
  videosOnHover.forEach((item) => {
    item
      .play()
      .then(() => item.pause())
      .catch(() => {});
  });
  document.addEventListener("mouseover", (event) => {
    const self = event.target;
    if (self.classList.contains("js-play-video-on-hover")) {
      self.play();
    }
  });
  document.addEventListener("mouseout", (event) => {
    const self = event.target;
    if (self.classList.contains("js-play-video-on-hover")) {
      self.pause();
    }
  });
}
