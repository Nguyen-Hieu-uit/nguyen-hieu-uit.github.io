document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".carousel-slide");
  const navItems = document.querySelectorAll(".carousel-nav-item");

  const AUTOPLAY_DURATION = 5000;

  let currentIndex = 0;
  let slideInterval;

  function showSlide(index) {
    // Kiểm tra index hợp lệ
    if (index < 0 || index >= slides.length) return;

    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    navItems.forEach((item, i) => {
      item.classList.remove("active");
      const content = item.querySelector(".carousel-nav-item-content");
      if (content) {
        content.style.opacity = "0.7";
      }
    });

    if (slides[index]) {
      slides[index].classList.add("active");
    }

    if (navItems[index]) {
      navItems[index].classList.add("active");
      const activeContent = navItems[index].querySelector(
        ".carousel-nav-item-content"
      );
      if (activeContent) {
        activeContent.style.opacity = "1";
      }
    }

    currentIndex = index;
  }

  function nextSlide() {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  }

  function startAutoplay() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, AUTOPLAY_DURATION);
  }

  navItems.forEach((item, index) => {
    // Chỉ thêm event listener cho các nav items tương ứng với slides
    if (index < slides.length) {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        if (index === currentIndex) return;
        showSlide(index);
        startAutoplay();
      });
    }
  });

  showSlide(0);
  startAutoplay();
});
