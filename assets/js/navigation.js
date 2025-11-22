document.addEventListener("DOMContentLoaded", () => {
  // Lấy đường dẫn của trang hiện tại (ví dụ: "/ung-dung.html")
  const currentPath = window.location.pathname;

  // Lấy tất cả các link trong thanh nav
  const navLinks = document.querySelectorAll(".navigation-tabs a");

  // Lặp qua từng link
  navLinks.forEach((link) => {
    // Lấy đường dẫn của link (từ thuộc tính href)
    // new URL(...).pathname sẽ chuẩn hóa nó (ví dụ: "ung-dung.html" -> "/ung-dung.html")
    const linkPath = new URL(link.href, window.location.origin).pathname;

    // Nếu đường dẫn của link TRÙNG với đường dẫn trang hiện tại
    if (currentPath === linkPath) {
      link.classList.add("active"); // Thêm class "active" cho nó
    } else if (linkPath === "/index.html" && currentPath === "/") {
      link.classList.add("active");
    }
  });
});
