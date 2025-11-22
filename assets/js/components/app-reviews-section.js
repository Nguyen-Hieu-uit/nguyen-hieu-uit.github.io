class AppReviewsSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    getAttr(name, fallback = "") {
        return this.getAttribute(name) || fallback;
    }

    render() {
        const rating = this.getAttr("rating", "4,6");
        const totalReviews = this.getAttr("reviews", "36,3 Tr bài đánh giá");
        const bars = JSON.parse(this.getAttr("bars", "[83, 8, 3, 1, 5]"));

        // --- 1. TẠO CÁC THANH BAR (DASHBOARD) ---
        let barsHtml = '';
        bars.forEach((percent, index) => {
            const starNum = 5 - index;
            barsHtml += `
        <div class="rating-bar" role="img" aria-label="${percent}%">
          <div class="rating-bar__label" aria-hidden="true">${starNum}</div>
          <div class="rating-bar__track" aria-hidden="true">
            <div class="rating-bar__progress rating-bar__progress--filled" title="${percent}" style="width: ${percent}%"></div>
          </div>
        </div>
      `;
        });

        // --- 2. TẠO SAO LỚN (DASHBOARD) ---
        // Lưu ý: Dùng class star-rating__icon--filled để CSS bên ngoài tô màu
        const bigStarsHtml = Array(5).fill(0).map(() => `
        <span class="rating-display__star">
            <span class="star-rating__icon--filled">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                </svg>
            </span>
        </span>
    `).join('');

        const dashboardHtml = `
      <div class="padding-bottom--responsive-medium">
        <div class="flex-group-spacing-top-large">
            <div class="grid-layout--auto-fit-column">
                <div>
                    <div class="text-display-large">${rating}</div>
                    <div role="img" aria-label="Được xếp hạng ${rating} sao/5 sao" class="rating-display__stars-wrapper">
                        ${bigStarsHtml}
                    </div>
                    <div class="total-reviews-label">${totalReviews}</div>
                </div>
                <div>
                    ${barsHtml}
                </div>
            </div>
        </div>
      </div>
    `;

        // --- 3. TẠO DANH SÁCH REVIEW MẪU ---
        const reviewsHtml = `
      <div class="review-item">
        <header class="c1bOId">
          <div class="review-item__header-content">
            <div class="review-user">
              <img src="https://play-lh.googleusercontent.com/a-/ALV-UjXJ2DbKsGGLWiJ4vHaZX1kRxFDjRGYeEwKBrcdKeLUyeOJJqnZL=s32-rw" class="img-contain review-user__avatar" />
              <div class="review-user__name">Khanh Trang Fukuoka</div>
            </div>
            <div class="Menu-trigger">
                <button class="icon-button icon-button--fix-stacking is-focussed" aria-label="Các thao tác khác">
                    <div class="icon-button--fix-stacking"></div>
                    <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" /></svg>
                </button>
            </div>
          </div>
          <div class="review-item__meta">
             <div role="img" class="review-rating__stars">${this.renderSmallStars(1)}</div>
             <span class="review-item__date">29 tháng 10, 2025</span>
          </div>
        </header>
        <div class="review-item__body">Game này xạo lắm nha, ghi vượt qua vòng là được thưởng xong cuối cùng không thưởng.</div>
        <div class="review-feedback__helpful-count">11 người thấy bài đánh giá này hữu ích</div>
        ${this.renderFeedbackFooter()}
      </div>

      <div class="review-item">
        <header class="c1bOId">
          <div class="review-item__header-content">
            <div class="review-user">
              <img src="https://play-lh.googleusercontent.com/a/ACg8ocJCg3SH-LXUqfn-jpuTmSedwTPodWWKmsqXMdlm3rbUgDfJ0A=s32-rw-mo" class="img-contain review-user__avatar" />
              <div class="review-user__name">Lộc Lương</div>
            </div>
            <div class="Menu-trigger">
                <button class="icon-button icon-button--fix-stacking is-focussed" aria-label="Các thao tác khác">
                    <div class="icon-button--fix-stacking"></div>
                    <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" /></svg>
                </button>
            </div>
          </div>
          <div class="review-item__meta">
             <div role="img" class="review-rating__stars">${this.renderSmallStars(5)}</div>
             <span class="review-item__date">30 tháng 10, 2025</span>
          </div>
        </header>
        <div class="review-item__body">I have to say that this game is one of the most interesting game i've ever found. Pure gold right here!</div>
        <div class="review-feedback__helpful-count">17 người thấy bài đánh giá này hữu ích</div>
        ${this.renderFeedbackFooter()}
      </div>

      <div class="review-item">
        <header class="c1bOId">
          <div class="review-item__header-content">
            <div class="review-user">
              <img src="https://play-lh.googleusercontent.com/a-/ALV-UjVaeKs1kQSNvyX5TSoHh-29pbV5ISHYrzsZqTUfugi788I5i30=s32-rw" class="img-contain review-user__avatar" />
              <div class="review-user__name">Henalia Như</div>
            </div>
            <div class="Menu-trigger">
                <button class="icon-button icon-button--fix-stacking is-focussed" aria-label="Các thao tác khác">
                    <div class="icon-button--fix-stacking"></div>
                    <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" /></svg>
                </button>
            </div>
          </div>
          <div class="review-item__meta">
             <div role="img" class="review-rating__stars">${this.renderSmallStars(1)}</div>
             <span class="review-item__date">2 tháng 11, 2025</span>
          </div>
        </header>
        <div class="review-item__body">nạp tiền mà không có vật phẩm. Ăn tiền của người khác</div>
        <div class="review-feedback__helpful-count">1 người thấy bài đánh giá này hữu ích</div>
        ${this.renderFeedbackFooter()}
      </div>
    `;

        // --- 4. RENDER CHÍNH (KHÔNG CÓ THẺ STYLE) ---
        this.innerHTML = `
      <section class="content-section">
        <header class="content-section__header">
          <div class="section-header-inner">
            <div class="content-section__title-wrapper">
              <h2 class="content-section__title">Xếp hạng và đánh giá</h2>
            </div>
            
            <button class="icon-button icon-button--fix-stacking is-focussed icon-button--pull-margin" aria-label="Xem thêm">
               <div class="icon-button--fix-stacking"></div>
               <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"></path>
               </svg>
            </button>

            <div class="show-desktop-push-right">
                <span class="show-desktop-inline">
                    <div class="button__touch-wrapper">
                        <button class="button button--contained text-button--style XhPA0b focus-visible">
                            <div class="ripple--bounded"></div>
                            <div class="button__focus-ring"></div>
                            <span class="button__label">Điểm xếp hạng và bài đánh giá đã được xác minh</span>
                            <svg class="button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="M436.41-276.41h87.18V-520h-87.18v243.59ZM480-595.22q19.03 0 31.91-12.87 12.87-12.88 12.87-31.91t-12.87-31.91q-12.88-12.87-31.91-12.87t-31.91 12.87q-12.87 12.88-12.87 31.91t12.87 31.91q12.88 12.87 31.91 12.87Zm0 523.35q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Zm0-91q133.04 0 225.09-92.04 92.04-92.05 92.04-225.09 0-133.04-92.04-225.09-92.05-92.04-225.09-92.04-133.04 0-225.09 92.04-92.04 92.05-92.04 225.09 0 133.04 92.04 225.09 92.05 92.04 225.09 92.04ZM480-480Z" />
                            </svg>
                        </button>
                    </div>
                </span>
            </div>

          </div>
        </header>
        
        <div class="content-section__body">
          <div class="grid-container--grow" data-g-id="reviews">
             ${dashboardHtml}
             ${reviewsHtml}
             <div class="button-wrapper">
                <div class="button__touch-wrapper">
                  <button class="button button--contained button--secondary focus-visible button--text-green">
                    <div class="ripple--bounded"></div>
                    <div class="button__focus-ring"></div>
                    <span class="button__label">Xem tất cả bài đánh giá</span>
                  </button>
                </div>
             </div>
          </div>
        </div>
      </section>
    `;
    }

    // Helper: Tạo 5 sao nhỏ cho review item
    renderSmallStars(filledCount) {
        let html = '';
        // Dùng class star-rating__icon--filled (đã có màu trong CSS của bạn)
        const filledStar = `<span class="star-rating__icon--filled"><svg class="small-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>`;
        // Dùng class star-rating__icon (không màu/xám)
        const emptyStar = `<span class="star-rating__icon"><svg class="small-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0z" fill="none"/><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg></span>`;

        for (let i = 1; i <= 5; i++) {
            html += `<span class="review-item__star">${(i <= filledCount) ? filledStar : emptyStar}</span>`;
        }
        return html;
    }

    // Helper: Footer Feedback
    renderFeedbackFooter() {
        return `
        <footer class="review-feedback">
            <div class="review-feedback__prompt">Nội dung này có hữu ích cho bạn không?</div>
            <div class="review-feedback__button-group">
                <div role="button" class="platform-button toggle-button Toggle-button--small rounded-full">
                    <div class="ripple-effect" aria-hidden="true"></div>
                    <div class="button-content"><span class="button-label">Có</span></div>
                </div>
                <div class="platform-button toggle-button Toggle-button--small rounded-full">
                    <div class="ripple-effect" aria-hidden="true"></div>
                    <div class="button-content"><span class="button-label">Không</span></div>
                </div>
            </div>
        </footer>
      `;
    }
}

customElements.define('app-reviews-section', AppReviewsSection);