const slides = Array.from(document.querySelectorAll(".slide"));
const prevButton = document.querySelector("[data-action='prev']");
const nextButton = document.querySelector("[data-action='next']");
const progressBar = document.querySelector(".deck__progress span");
const liveRegion = document.querySelector(".deck__live");
const slidesContainer = document.querySelector(".slides");

let currentIndex = 0;
let touchStartX = null;
let touchStartY = null;

const clampIndex = (index) => {
  return Math.max(0, Math.min(slides.length - 1, index));
};

const parseHashIndex = () => {
  const hash = window.location.hash.slice(1);
  const slideNumber = Number.parseInt(hash, 10);

  if (Number.isNaN(slideNumber)) return null;

  const index = slideNumber - 1;
  if (index < 0 || index >= slides.length) return null;

  return index;
};

const setHash = () => {
  window.history.replaceState(null, "", `#${currentIndex + 1}`);
};

const updateUI = () => {
  slides.forEach((slide, index) => {
    const active = index === currentIndex;
    slide.classList.toggle("is-active", active);
    slide.inert = !active;
    slide.setAttribute("aria-hidden", String(!active));
    if (active) slide.scrollTop = 0;
  });

  if (progressBar) {
    const progress = ((currentIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${progress}%`;
  }

  if (prevButton) {
    prevButton.disabled = currentIndex === 0;
  }

  if (nextButton) {
    nextButton.disabled = currentIndex === slides.length - 1;
  }

  if (liveRegion) {
    const title =
      slides[currentIndex]?.querySelector(".slide__title")?.textContent ||
      `Slide ${currentIndex + 1}`;
    liveRegion.textContent = `Slide ${currentIndex + 1} of ${slides.length}: ${title}`;
  }
};

const goToSlide = (index, options = {}) => {
  const updateHash = options.updateHash !== false;
  const nextIndex = clampIndex(index);

  if (nextIndex === currentIndex) {
    if (updateHash) {
      setHash();
    }
    return;
  }

  currentIndex = nextIndex;
  updateUI();

  if (updateHash) {
    setHash();
  }
};

const handleKeydown = (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable=true]")) return;
  if (event.key === "ArrowRight" || event.key === "PageDown") {
    event.preventDefault();
    goToSlide(currentIndex + 1);
    return;
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    goToSlide(currentIndex - 1);
    return;
  }

  if (event.key === "Home") {
    event.preventDefault();
    goToSlide(0);
    return;
  }

  if (event.key === "End") {
    event.preventDefault();
    goToSlide(slides.length - 1);
  }
};

const handleHashChange = () => {
  const hashIndex = parseHashIndex();
  if (hashIndex === null) return;
  goToSlide(hashIndex, { updateHash: false });
};

const handleTouchStart = (event) => {
  if (!event.changedTouches || !event.changedTouches.length) return;
  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;
};

const handleTouchEnd = (event) => {
  if (touchStartX === null) return;
  if (!event.changedTouches || !event.changedTouches.length) return;

  const touchEndX = event.changedTouches[0].screenX;
  const difference = touchStartX - touchEndX;
  const vertical = event.changedTouches[0].screenY - touchStartY;
  touchStartX = null;
  touchStartY = null;

  if (Math.abs(difference) < 50 || Math.abs(difference) <= Math.abs(vertical)) return;

  if (difference > 0) {
    goToSlide(currentIndex + 1);
  } else {
    goToSlide(currentIndex - 1);
  }
};

if (slides.length > 0) {
  const hashIndex = parseHashIndex();
  currentIndex = hashIndex === null ? 0 : hashIndex;

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });
  }

  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("hashchange", handleHashChange);

  if (slidesContainer) {
    slidesContainer.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    slidesContainer.addEventListener("touchend", handleTouchEnd, {
      passive: true,
    });
  }

  updateUI();
  setHash();
}
