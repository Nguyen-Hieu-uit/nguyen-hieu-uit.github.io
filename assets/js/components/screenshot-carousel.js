// file: screenshot-carousel.js (Đã xóa nút điều hướng)

class ScreenshotCarousel extends HTMLElement {
  constructor() {
    super();
    // Constructor để trống, không thao tác DOM ở đây
  }

  connectedCallback() {
    // Chỉ render nếu chưa có nội dung
    if (!this.innerHTML.trim()) {
      this.render();
    }
  }

  // Hàm này không còn cần thiết vì không còn sự kiện để dọn dẹp
  // disconnectedCallback() {}

  render() {
    const imageListJson = this.getAttribute("data-images");
    let images = [];
    try {
      images = JSON.parse(imageListJson || "[]");
    } catch (e) {
      console.error("Lỗi khi phân tích chuỗi JSON ảnh:", e);
      // Có thể hiển thị placeholder nếu lỗi
    }

    // Xây dựng cấu trúc HTML (ĐÃ XÓA CÁC NÚT BUTTON)
    this.innerHTML = `
      <div class="screenshot-gallery__carousel-wrapper">
        <div class="content-wrapper carousel--desktop">
                          <button
                    class="carousel-btn left hidden"
                    aria-label="Scroll left"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                    </svg>
                  </button>
                  <button class="carousel-btn right" aria-label="Scroll right">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#000000"
                    >
                      <path
                        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
                      />
                    </svg>
                  </button>
          <div role="list" class="horizontal-scroll carousel--screenshot">
            ${this.renderImages(images)}
          </div>
          </div>
      </div>
    `;

    // Không cần gọi setupEventListeners nữa
  }

  renderImages(images) {
    // Hàm helper để tạo danh sách ảnh
    return images
      .map(
        ([src, srcset]) => `
      <div role="listitem" class="platform-item carousel--items-spacing">
        <div class="carousel__item-content">
          <img src="${src}" srcset="${srcset}" class="img-contain carousel__image" alt="Ảnh chụp màn hình" loading="lazy" />
        </div>
      </div>
    `
      )
      .join("");
  }

  // Đã xóa các hàm scrollLeft và scrollRight vì không còn dùng đến
}

// Định nghĩa custom element
customElements.define("screenshot-carousel", ScreenshotCarousel);
