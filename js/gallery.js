function sliderGallery() {
  var swiper = new Swiper(".js-swip", {
    slidesPerView: "auto",
    grabCursor: true,
  });
}

function galleryLightbox() {
  const lightbox = document.querySelector(".glightbox");
  if (lightbox) {
    const lightbox = GLightbox({
      openEffect: "fade",
      closeEffect: "fade",
      slideEffect: "fade",
      loop: true,
      videosWidth: "1500px",
      plyr: { config: { ratio: "9:16" } },
    });
    lightbox.on("open", () => {
      const nextBtn = document.querySelector(".gnext.gbtn");
      const prevBtn = document.querySelector(".gprev.gbtn");
      if (nextBtn) {
        const nextDiv = document.createElement("div");
        nextDiv.textContent = "( Next )";
        nextDiv.classList.add("js-glightbox-next");
        nextDiv.style.position = "absolute";
        nextDiv.style.pointerEvents = "none";
        nextBtn.appendChild(nextDiv);
        nextBtn.addEventListener("mousemove", (e) => {
          const rect = nextBtn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          nextDiv.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
      }
      if (prevBtn) {
        const prevDiv = document.createElement("div");
        prevDiv.textContent = "( Prev )";
        prevDiv.classList.add("js-glightbox-next");
        prevDiv.style.position = "absolute";
        prevDiv.style.pointerEvents = "none";
        prevBtn.appendChild(prevDiv);
        prevBtn.addEventListener("mousemove", (e) => {
          const rect = prevBtn.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          prevDiv.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        });
      }
      document.querySelector(".js-header-bar").classList.add("is-inactive");
    });
    lightbox.on("close", () => {
      document.querySelector(".js-header-bar").classList.remove("is-inactive");
    });
  }
}
