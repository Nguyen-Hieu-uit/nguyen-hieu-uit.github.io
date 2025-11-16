/*
 * GHI CHÚ QUAN TRỌNG:
 *
 * 1. Hàm 'toggleDropdown' không còn dùng 'id'.
 * Bạn PHẢI gọi nó từ HTML như sau:
 * onclick="toggleDropdown(event)"
 *
 * 2. Đã loại bỏ 'getElementById("newFilterBtn")'.
 * Bạn PHẢI thay thế 'id="newFilterBtn"' trong HTML của bạn
 * bằng 'class="new-filter-button"'.
 *
 * 3. Logic lưu/khôi phục filter gốc đã được thay đổi để dùng
 * 'data-default-html' thay vì biến toàn cục.
 */

// 1. HÀM MỚI: Chạy khi trang tải xong (Đã thay đổi logic)
document.addEventListener("DOMContentLoaded", () => {
  // Tìm tất cả các nút filter chính (có data-default)
  document
    .querySelectorAll(".platform-button[data-default]")
    .forEach((mainBtn) => {
      const mainContentEl = mainBtn.querySelector(".button-content");

      // Lưu lại HTML gốc vào data attribute của chính nút đó
      if (mainContentEl) {
        mainBtn.dataset.defaultHtml = mainContentEl.innerHTML;
      }
    });
});

// 2. HÀM CŨ (ĐÃ SỬA LỖI - BỎ 'id' VÀ DÙNG 'event')
// **TRONG HTML, HÃY GỌI: onclick="toggleDropdown(event)"**
function toggleDropdown(event) {
  event.stopPropagation();

  // 1. Tìm đúng dropdown content dựa trên NÚT ĐƯỢC BẤM
  const button = event.currentTarget; // Lấy nút vừa bấm
  const parentItem = button.closest(".platform-item.dropdown"); // Tìm thẻ cha chung

  if (!parentItem) {
    console.error("Không thể tìm thấy '.platform-item.dropdown' cha.");
    return;
  }

  const dropdownContent = parentItem.querySelector(".dropdown-content"); // Tìm dropdown BÊN TRONG thẻ cha đó

  if (!dropdownContent) {
    console.error("Không thể tìm thấy '.dropdown-content' con.");
    return;
  }

  // 2. Lấy TẤT CẢ các dropdown khác
  const allDropdowns = document.querySelectorAll(".dropdown-content");

  // 3. Kiểm tra xem mình đang MỞ hay đang ĐÓNG (trước khi toggle)
  const isOpening = !dropdownContent.classList.contains("show");

  // 4. Đóng TẤT CẢ các dropdown khác
  allDropdowns.forEach((menu) => {
    // Chỉ đóng nếu nó KHÔNG PHẢI là cái mình đang bấm
    if (menu !== dropdownContent) {
      menu.classList.remove("show", "flex-layout");
    }
  });

  // 5. Mở/đóng CÁI HIỆN TẠI
  dropdownContent.classList.toggle("show");
  dropdownContent.classList.remove("flex-layout"); // Luôn xóa trước

  // 6. Xử lý logic flex-layout (chỉ khi đang MỞ)
  if (isOpening) {
    const itemsInside = dropdownContent.querySelectorAll(".platform-item");
    if (itemsInside.length < 4) {
      dropdownContent.classList.add("flex-layout");
    }
  }
}

// 3. HÀM CŨ (Không thay đổi)
window.addEventListener("click", function (e) {
  if (!e.target.closest(".platform-item.dropdown")) {
    document.querySelectorAll(".dropdown-content").forEach((menu) => {
      menu.classList.remove("show", "flex-layout");
    });
  }
});

// 4. HÀM CŨ (Không thay đổi - Logic này đã đúng)
document.querySelectorAll(".dropdown-content").forEach((dropContent) => {
  // Tìm nút filter chính (đã dùng logic tương đối -> an toàn)
  const parentDropdown = dropContent.closest(".platform-item.dropdown");
  if (!parentDropdown) return; // Bỏ qua nếu không tìm thấy cha

  const mainBtn = parentDropdown.querySelector(
    ".platform-button[data-default]"
  );
  if (!mainBtn) return; // Bỏ qua nếu không tìm thấy nút chính

  const mainContentEl = mainBtn.querySelector(".button-content");

  dropContent.addEventListener("click", function (e) {
    const optionButton = e.target.closest(".platform-button");
    if (!optionButton) return; // Bỏ qua nếu không bấm vào nút option

    // Xóa active của các nút option CÙNG CẤP
    dropContent
      .querySelectorAll(".platform-button")
      .forEach((btn) => btn.classList.remove("is-active"));
    optionButton.classList.add("is-active");

    // Lấy nội dung của option
    const optionContentEl = optionButton.querySelector(".button-content");

    // Cập nhật nút filter chính
    if (optionContentEl && mainContentEl) {
      mainContentEl.innerHTML = optionContentEl.innerHTML;
    }

    mainBtn.classList.add("is-active");
    dropContent.classList.remove("show", "flex-layout");
  });
});

// 5. HÀM CŨ (ĐÃ CẬP NHẬT LOGIC - Dùng class thay vì id)
// **TRONG HTML, HÃY THAY: id="newFilterBtn" BẰNG class="new-filter-button"**
document.querySelectorAll(".new-filter-button").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.classList.toggle("is-active");
  });
});

// 6. HÀM CŨ (ĐÃ CẬP NHẬT LOGIC - Dùng class và data-attribute)
function clearFilters() {
  // 1. Xóa active của các nút option
  document
    .querySelectorAll(".dropdown-content .platform-button.is-active")
    .forEach((btn) => {
      btn.classList.remove("is-active");
    });

  // 2. Reset các nút filter chính
  document.querySelectorAll(".platform-button[data-default]").forEach((btn) => {
    const mainContentEl = btn.querySelector(".button-content");

    // --- LOGIC MỚI ---
    // Khôi phục lại HTML gốc đã lưu trong data attribute
    if (mainContentEl && btn.dataset.defaultHtml) {
      mainContentEl.innerHTML = btn.dataset.defaultHtml;
    }
    // ---------------

    btn.classList.remove("is-active");
  });

  // 3. Reset nút "Mới" (dùng class)
  // **TRONG HTML, HÃY THAY: id="newFilterBtn" BẰNG class="/*

  // 1. HÀM MỚI: Chạy khi trang tải xong (Đã thay đổi logic)
  document.addEventListener("DOMContentLoaded", () => {
    // Tìm tất cả các nút filter chính (có data-default)
    document
      .querySelectorAll(".platform-button[data-default]")
      .forEach((mainBtn) => {
        const mainContentEl = mainBtn.querySelector(".button-content");

        // Lưu lại HTML gốc vào data attribute của chính nút đó
        if (mainContentEl) {
          mainBtn.dataset.defaultHtml = mainContentEl.innerHTML;
        }
      });
  });

  // 2. HÀM CŨ (ĐÃ SỬA LỖI - BỎ 'id' VÀ DÙNG 'event')
  // **TRONG HTML, HÃY GỌI: onclick="toggleDropdown(event)"**
  function toggleDropdown(event) {
    event.stopPropagation();

    // 1. Tìm đúng dropdown content dựa trên NÚT ĐƯỢC BẤM
    const button = event.currentTarget; // Lấy nút vừa bấm
    const parentItem = button.closest(".platform-item.dropdown"); // Tìm thẻ cha chung

    if (!parentItem) {
      console.error("Không thể tìm thấy '.platform-item.dropdown' cha.");
      return;
    }

    const dropdownContent = parentItem.querySelector(".dropdown-content"); // Tìm dropdown BÊN TRONG thẻ cha đó

    if (!dropdownContent) {
      console.error("Không thể tìm thấy '.dropdown-content' con.");
      return;
    }

    // 2. Lấy TẤT CẢ các dropdown khác
    const allDropdowns = document.querySelectorAll(".dropdown-content");

    // 3. Kiểm tra xem mình đang MỞ hay đang ĐÓNG (trước khi toggle)
    const isOpening = !dropdownContent.classList.contains("show");

    // 4. Đóng TẤT CẢ các dropdown khác
    allDropdowns.forEach((menu) => {
      // Chỉ đóng nếu nó KHÔNG PHẢI là cái mình đang bấm
      if (menu !== dropdownContent) {
        menu.classList.remove("show", "flex-layout");
      }
    });

    // 5. Mở/đóng CÁI HIỆN TẠI
    dropdownContent.classList.toggle("show");
    dropdownContent.classList.remove("flex-layout"); // Luôn xóa trước

    // 6. Xử lý logic flex-layout (chỉ khi đang MỞ)
    if (isOpening) {
      const itemsInside = dropdownContent.querySelectorAll(".platform-item");
      if (itemsInside.length < 4) {
        dropdownContent.classList.add("flex-layout");
      }
    }
  }

  // 3. HÀM CŨ (Không thay đổi)
  window.addEventListener("click", function (e) {
    if (!e.target.closest(".platform-item.dropdown")) {
      document.querySelectorAll(".dropdown-content").forEach((menu) => {
        menu.classList.remove("show", "flex-layout");
      });
    }
  });

  // 4. HÀM CŨ (Không thay đổi - Logic này đã đúng)
  document.querySelectorAll(".dropdown-content").forEach((dropContent) => {
    // Tìm nút filter chính (đã dùng logic tương đối -> an toàn)
    const parentDropdown = dropContent.closest(".platform-item.dropdown");
    if (!parentDropdown) return; // Bỏ qua nếu không tìm thấy cha

    const mainBtn = parentDropdown.querySelector(
      ".platform-button[data-default]"
    );
    if (!mainBtn) return; // Bỏ qua nếu không tìm thấy nút chính

    const mainContentEl = mainBtn.querySelector(".button-content");

    dropContent.addEventListener("click", function (e) {
      const optionButton = e.target.closest(".platform-button");
      if (!optionButton) return; // Bỏ qua nếu không bấm vào nút option

      // Xóa active của các nút option CÙNG CẤP
      dropContent
        .querySelectorAll(".platform-button")
        .forEach((btn) => btn.classList.remove("is-active"));
      optionButton.classList.add("is-active");

      // Lấy nội dung của option
      const optionContentEl = optionButton.querySelector(".button-content");

      // Cập nhật nút filter chính
      if (optionContentEl && mainContentEl) {
        mainContentEl.innerHTML = optionContentEl.innerHTML;
      }

      mainBtn.classList.add("is-active");
      dropContent.classList.remove("show", "flex-layout");
    });
  });

  // 5. HÀM CŨ (ĐÃ CẬP NHẬT LOGIC - Dùng class thay vì id)
  // **TRONG HTML, HÃY THAY: id="newFilterBtn" BẰNG class="new-filter-button"**
  document.querySelectorAll(".new-filter-button").forEach((btn) => {
    btn.addEventListener("click", function () {
      this.classList.toggle("is-active");
    });
  });

  // 6. HÀM CŨ (ĐÃ CẬP NHẬT LOGIC - Dùng class và data-attribute)
  function clearFilters() {
    // 1. Xóa active của các nút option
    document
      .querySelectorAll(".dropdown-content .platform-button.is-active")
      .forEach((btn) => {
        btn.classList.remove("is-active");
      });

    // 2. Reset các nút filter chính
    document
      .querySelectorAll(".platform-button[data-default]")
      .forEach((btn) => {
        const mainContentEl = btn.querySelector(".button-content");

        // --- LOGIC MỚI ---
        // Khôi phục lại HTML gốc đã lưu trong data attribute
        if (mainContentEl && btn.dataset.defaultHtml) {
          mainContentEl.innerHTML = btn.dataset.defaultHtml;
        }
        // ---------------

        btn.classList.remove("is-active");
      });

    // 3. Reset nút "Mới" (dùng class)
    // **TRONG HTML, HÃY THAY: id="newFilterBtn" BẰNG class="new-filter-button"**
    document.querySelectorAll(".new-filter-button").forEach((btn) => {
      btn.classList.remove("is-active");
    });
  }
  document.querySelectorAll(".new-filter-button").forEach((btn) => {
    btn.classList.remove("is-active");
  });
}
