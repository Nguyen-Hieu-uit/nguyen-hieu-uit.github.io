document.addEventListener("DOMContentLoaded", function () {
  // Lấy tất cả carousel trên trang (nếu có nhiều)
  const carousels = document.querySelectorAll(".content-wrapper");

  carousels.forEach((carousel) => {
    // Lấy các phần tử con CỦA carousel NÀY
    const track = carousel.querySelector(".horizontal-scroll");
    const btnLeft = carousel.querySelector(".carousel-btn.left");
    const btnRight = carousel.querySelector(".carousel-btn.right");

    if (!track || !btnLeft || !btnRight) {
      return; // Bỏ qua nếu thiếu phần tử
    }

    // 1. HÀM KIỂM TRA NÚT (Thay thế cho updateCarousel)
    // Hàm này chỉ ĐỌC vị trí cuộn và ẨN/HIỆN nút
    function checkButtons() {
      const scrollLeft = track.scrollLeft;
      const scrollWidth = track.scrollWidth;
      const clientWidth = track.clientWidth;

      // Kiểm tra xem có đang ở đầu không (dung sai 5px)
      btnLeft.classList.toggle("hidden", scrollLeft < 5);

      // Kiểm tra xem có đang ở cuối không (dung sai 5px)
      btnRight.classList.toggle(
        "hidden",
        scrollLeft >= scrollWidth - clientWidth - 5
      );
    }

    // 2. SỰ KIỆN CLICK NÚT PHẢI
    // Chỉ cần ra lệnh "cuộn đi", scroll-snap sẽ lo phần còn lại
    btnRight.addEventListener("click", () => {
      // Cuộn một đoạn bằng 80% chiều rộng màn hình
      const scrollAmount = track.clientWidth * 0.8;
      track.scrollLeft += scrollAmount;
    });

    // 3. SỰ KIỆN CLICK NÚT TRÁI
    btnLeft.addEventListener("click", () => {
      const scrollAmount = track.clientWidth * 0.8;
      track.scrollLeft -= scrollAmount;
    });

    // 4. SỰ KIỆN LẮNG NGHE
    // Khi người dùng TỰ CUỘN (bằng cách kéo-thả, vuốt...),
    // chúng ta cần cập nhật lại trạng thái của nút
    track.addEventListener("scroll", checkButtons);

    // Khi resize cửa sổ, kiểm tra lại
    window.addEventListener("resize", checkButtons);

    // 5. BỎ HOÀN TOÀN LOGIC DRAG-TO-SCROLL (mousedown, touchstart...)
    // Vì `overflow-x: auto` đã cung cấp miễn phí!

    // 6. INIT
    // Chạy 1 lần khi tải trang để ẩn nút bên trái
    checkButtons();
  });
});
