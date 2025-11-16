document.addEventListener("DOMContentLoaded", function () {
  // 1. Lấy tất cả các ngôi sao
  const stars = document.querySelectorAll(".star-rating__star");

  // 2. Lặp qua từng ngôi sao và gắn sự kiện 'click'
  stars.forEach(function (star) {
    star.addEventListener("click", function () {
      // Lấy số sao được click (từ thuộc tính data-number)
      const rating = parseInt(star.getAttribute("data-number"));

      // Lặp lại qua TẤT CẢ các sao để cập nhật
      stars.forEach(function (s) {
        const starNumber = parseInt(s.getAttribute("data-number"));

        // Nếu số sao <= số sao được click
        if (starNumber <= rating) {
          // Thêm lớp 'is-clicked' để giữ màu vàng
          s.classList.add("is-clicked");
        } else {
          // Xóa lớp 'is-clicked'
          s.classList.remove("is-clicked");
        }
      });
    });
  });
});
