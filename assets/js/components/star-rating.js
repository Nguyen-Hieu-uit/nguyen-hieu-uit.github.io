class StarRating extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.addEvents();
    }

    render() {
        const starIcon = `
      <span class="notranslate star-rating__icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M0 0h24v24H0z" fill="none"></path>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      </span>
    `;

        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            // Sử dụng class .star-rating__star đúng như file HTML gốc
            starsHtml += `<span class="star-rating__star" data-number="${i}">${starIcon}</span>`;
        }

        this.innerHTML = `
      <style>
        /* --- CHỈ GIỮ LẠI CẤU TRÚC, KHÔNG CÓ MÀU SẮC --- */
        
        /* Con trỏ chuột dạng bàn tay để biết là bấm được */
        .star-rating__star {
          cursor: pointer;
        }

        /* Chặn sự kiện chuột vào icon bên trong để logic hover mượt mà hơn */
        .star-rating__icon, svg, path {
          pointer-events: none;
        }
        
        /* LƯU Ý: Màu sắc sẽ được lấy hoàn toàn từ file CSS bên ngoài 
           thông qua class .is-active và .is-clicked 
        */
      </style>

      <section class="content-section">
        <header class="content-section__header">
          <div class="section-header-inner">
            <div class="content-section__title-wrapper">
              <h2 class="content-section__title">Xếp hạng trò chơi này</h2>
              <div class="text-body">Cho mọi người biết ý kiến của bạn.</div>
            </div>
          </div>
        </header>
        
        <div class="content-section__body">
          <div class="rating-widget">
            <div class="rating-widget__content">
              <div class="star-rating star-rating--responsive-layout" id="star-container">
                ${starsHtml}
              </div>
            </div>
            
            <div class="rating-widget__button-container">
              <div class="button-wrapper">
                <div class="button__touch-wrapper">
                  <button class="button button--theme-green button--contained button--typography button--padding-x-large focus-visible button--shape-rounded button--text-light button--min-width-medium button--primary">
                    <div class="ripple--bounded"></div>
                    <div class="button__focus-ring"></div>
                    <div class="button__touch-target"></div>
                    <span class="button__label">Viết bài đánh giá</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
    }

    addEvents() {
        const container = this.querySelector('#star-container');
        const stars = this.querySelectorAll('.star-rating__star');

        let currentRating = 0;

        const updateStars = (limit) => {
            stars.forEach(star => {
                const num = parseInt(star.getAttribute('data-number'));

                if (num <= limit) {
                    // Thêm cả 2 class để tương thích với CSS của bạn
                    star.classList.add('is-active');  // Dùng cho hover
                    star.classList.add('is-clicked'); // Dùng cho click (từ code cũ)

                    // Thêm class filled icon nếu CSS của bạn dựa vào class này để tô màu
                    const icon = star.querySelector('.star-rating__icon');
                    if (icon) icon.classList.add('star-rating__icon--filled');
                } else {
                    star.classList.remove('is-active');
                    star.classList.remove('is-clicked');

                    const icon = star.querySelector('.star-rating__icon');
                    if (icon) icon.classList.remove('star-rating__icon--filled');
                }
            });
        };

        // 1. Hover
        container.addEventListener('mousemove', (e) => {
            const targetStar = e.target.closest('.star-rating__star');
            if (targetStar) {
                const hoverValue = parseInt(targetStar.getAttribute('data-number'));
                updateStars(hoverValue);
            }
        });

        // 2. Rời chuột
        container.addEventListener('mouseleave', () => {
            updateStars(currentRating);
        });

        // 3. Click
        container.addEventListener('click', (e) => {
            const targetStar = e.target.closest('.star-rating__star');
            if (targetStar) {
                currentRating = parseInt(targetStar.getAttribute('data-number'));
                updateStars(currentRating);
                console.log("Selected:", currentRating);
            }
        });
    }
}

customElements.define('star-content-section', StarRating);