document.addEventListener("DOMContentLoaded", () => {
  // --- 1. LẤY CÁC PHẦN TỬ ---
  const buyScreen = document.querySelector(".modal-buy-screen");
  const methodScreen = document.querySelector(".modal-method-screen");
  const qrScreen = document.querySelector(".modal-qr-screen");
  const successScreen = document.querySelector(".modal-success-screen");
  const allModals = [buyScreen, methodScreen, qrScreen, successScreen];

  const openDemoBtn = document.getElementById("open-payment-demo");
  const openMethodBtn = document.querySelector(
    ".modal-buy-screen .clickable-row-button"
  );
  const openQrBtn = document.querySelector(".modal-buy-screen .button-filled");
  const closeBuyScreenBtn = document.querySelector(
    ".modal-buy-screen .header-inner .icon-button"
  );
  const backFromMethodBtn = document.querySelector(
    ".modal-method-screen .back-button-container button"
  );
  const backFromQrBtn = document.querySelector(
    ".modal-qr-screen .back-button-container button"
  );

  const allScrims = document.querySelectorAll(".modal-scrim");
  const qrTimerDisplay = document.querySelector(".qr-timer");
  const downloadLink = document.getElementById("app-download-link");
  let qrTimerInterval = null;

  // --- 2. HÀM TRỢ GIÚP (ĐÃ SỬA LẠI ĐỂ DÙNG CLASSLIST) ---

  /**
   * Ẩn tất cả các modal BẰNG CÁCH XÓA CLASS
   */
  function hideAllModals() {
    allModals.forEach((modal) => {
      // Xóa class 'visible' để CSS tự động ẩn nó đi
      modal.classList.remove("modal-container--visible");
    });
  }

  /**
   * Hiển thị một modal cụ thể BẰNG CÁCH THÊM CLASS
   * @param {HTMLElement} modalToShow - Modal cần hiển thị
   */
  function showModal(modalToShow) {
    // Dừng mọi bộ đếm giờ khi chuyển màn hình
    if (qrTimerInterval) {
      clearInterval(qrTimerInterval);
      qrTimerInterval = null;
    }

    hideAllModals(); // Ẩn tất cả trước

    // Hiển thị modal được chọn
    if (modalToShow) {
      // Thêm class 'visible' để CSS tự động hiện nó ra
      modalToShow.classList.add("modal-container--visible");
    }
  }

  /**
   * Bắt đầu đếm ngược 10 giây (nhưng hiển thị là 5 phút)
   */
  function startQrTimer() {
    let displayTimeLeft = 300; // 5 phút (300 giây) để HIỂN THỊ
    let demoTimeLeft = 10; // 10 giây (thời gian demo) để KÍCH HOẠT

    // Hàm tiện ích để format (phút:giây)
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const paddedSeconds =
        remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
      return `${minutes}:${paddedSeconds}`;
    }

    // Hiển thị thời gian 5 phút ban đầu
    qrTimerDisplay.textContent = formatTime(displayTimeLeft);

    qrTimerInterval = setInterval(() => {
      displayTimeLeft--;
      demoTimeLeft--;

      qrTimerDisplay.textContent = formatTime(displayTimeLeft);

      // Kiểm tra bộ đếm DEMO
      if (demoTimeLeft <= 0) {
        clearInterval(qrTimerInterval); // Dừng đếm ngược
        qrTimerInterval = null;

        // 1. Hiển thị màn hình thành công
        showModal(successScreen);

        // 2. Đợi 2 giây để người dùng đọc thông báo
        setTimeout(() => {
          // 3. Tự động nhấn vào link tải về
          downloadLink.click();

          // 4. KHÔNG ĐÓNG MODAL NỮA.
          hideAllModals();
          // Cứ để modal "Thành công" ở đó.
          // Người dùng sẽ tự nhấn nền mờ (scrim) để đóng.

          // hideAllModals(); // <-- CHÚNG TA XÓA DÒNG NÀY
        }, 2000); // 2 giây
      }
    }, 1000); // Cập nhật mỗi giây
  }

  // --- 3. GÁN SỰ KIỆN (EVENT LISTENERS) ---

  // Ẩn tất cả modal khi mới tải trang (để đảm bảo sạch)
  hideAllModals();

  // 0. Nhấn nút "Mở Demo" -> Hiện màn hình mua
  openDemoBtn.addEventListener("click", () => {
    showModal(buyScreen);
  });

  // 1. Nhấn nút "Mua" -> Hiện màn hình QR và BẮT ĐẦU ĐẾM NGƯỢC
  openQrBtn.addEventListener("click", () => {
    showModal(qrScreen);
    startQrTimer(); // Bắt đầu đếm ngược
  });

  // 2. Nhấn vào hàng "MoMo" -> Hiện màn hình chọn phương thức
  openMethodBtn.addEventListener("click", () => {
    showModal(methodScreen);
  });

  // 3. Nhấn "Quay lại" từ màn hình Phương thức -> Về màn hình Mua
  backFromMethodBtn.addEventListener("click", () => {
    showModal(buyScreen);
  });

  // 4. Nhấn "Quay lại" từ màn hình QR -> Về màn hình Mua
  backFromQrBtn.addEventListener("click", () => {
    showModal(buyScreen);
  });

  // 5. Nhấn nút "X" trên màn hình Mua -> Đóng tất cả
  closeBuyScreenBtn.addEventListener("click", () => {
    hideAllModals();
  });

  // 6. Nhấn vào bất kỳ nền mờ nào -> Đóng tất cả
  allScrims.forEach((scrim) => {
    scrim.addEventListener("click", () => {
      hideAllModals();
    });
  });
});
