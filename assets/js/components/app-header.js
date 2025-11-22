class AppHeader extends HTMLElement {
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
        const title = this.getAttr("app-title", "Tên ứng dụng");
        const developer = this.getAttr("developer", "Nhà phát triển");
        const iconSrc = this.getAttr("icon-src", "");
        const videoPoster = this.getAttr("video-poster", "");
        const videoSrc = this.getAttr("video-src", "");
        const rating = this.getAttr("rating", "4.6");
        const reviews = this.getAttr("reviews", "0 bài đánh giá");
        const downloads = this.getAttr("downloads", "0+");
        const ageRatingSrc = this.getAttr("age-rating-src", "");
        const ageText = this.getAttr("age-text", "3 tuổi trở lên");
        const tagsAttr = this.getAttr("tags", "Ứng dụng");
        const price = this.getAttribute("price");
        const downloadLink = this.getAttr("download-link", "#");

        const tagsHtml = tagsAttr.split(',').map(tag => `<span class="app-identity__tag">${tag.trim()}</span>`).join('');

        let actionButtonHtml = "";
        if (price) {
            actionButtonHtml = `
        <button class="button button--theme-green button--contained button--typography button--padding-x-large focus-visible button--shape-rounded button--text-light button--sizing-responsive button--primary width-full-to-auto"
          id="component-open-payment">
          <div class="ripple--bounded"></div>
          <span class="button__label">Mua: ${price}</span>
        </button>
      `;
        } else {
            actionButtonHtml = `
        <a href="${downloadLink}" download>
          <button class="button button--theme-green button--contained button--typography button--padding-x-large focus-visible button--shape-rounded button--text-light button--sizing-responsive button--primary width-full-to-auto">
            <div class="ripple--bounded"></div>
            <span class="button__label">Cài đặt</span>
          </button>
        </a>
      `;
        }

        const mainHtml = `
      <div class="app-header-summary">
        <div class="app-header-summary__inner">
          <div class="app-header-content app-header-content-mwdth">
            <div class="trailer-container">
              <video class="trailer-container__video" preload="auto" muted="" autoplay poster="${videoPoster}" tabindex="-1" loop="">
                <source src="${videoSrc}" type="video/mp4" />
              </video>
              <div class="trailer-container__overlay"></div>
            </div>
            
            <div class="app-identity app-identity-info-section app-identity-hide-prop">
              <div class="app-identity__main">
                <div class="app-identity__title-group">
                  <img src="${iconSrc}" class="img-contain app-identity__icon app-identity-img-rounded" alt="Icon" />
                  
                  <!-- CẤU TRÚC GỐC: Một thẻ div bao bọc cả Title và Meta -->
                  <!-- Việc này giúp chúng xếp chồng lên nhau (block) thay vì ngang hàng (flex row) -->
                  <div>
                    <div class="app-identity__title-wrapper title-md title-lg">
                      <h1><span class="app-identity__title">${title}</span></h1>
                    </div>
                    <div class="app-identity__meta">
                      <div class="app-identity__developer app-identity__developer-text">
                        <a href="#"><span>${developer}</span></a>
                      </div>
                      <div class="app-identity__tags">${tagsHtml}</div>
                    </div>
                  </div>
                  
                </div>
              </div>

              <div class="app-identity__stats-bar">
                <div class="app-identity-stats-bar__content">
                   <img src="${iconSrc}" class="img-contain app-identity__stats-bar__icon" alt="Icon Small" />
                   <div class="app-identity__stats-bar__items">
                      <div class="app__stats-bar__item">
                        <div class="stat-item__value">${rating} <svg class="rating-display__star" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480 -940 L375 -640 L60 -620 L300 -420 L210 -100 L480 -280 L750 -100 L660 -420 L900 -620 L585 -640 Z" /></svg></div>
                        <div class="stat-item__label">${reviews}</div>
                      </div>
                      <div class="app__stats-bar__item">
                        <div class="stat-item__value">${downloads}</div>
                        <div class="stat-item__label">Lượt tải xuống</div>
                      </div>
                      <div class="app__stats-bar__item">
                        <div class="stat-item__value"><img src="${ageRatingSrc}" class="img-contain age-limit-icon" alt="Age" /></div>
                        <div class="stat-item__label"><span>${ageText}</span></div>
                      </div>
                   </div>
                </div>
              </div>
            </div>

            <div class="app-actions">
              <div class="app-actions__install-wrapper">
                <div class="install-button-wrapper">
                   <div class="install-component-wrapper">
                      <div class="flex-container layout-col-to-row">
                         <div class="button-wrapper">
                            <div class="button__touch-wrapper">
                               ${actionButtonHtml}
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </div>
              <div class="btn-container">
                 <div class="button-wrapper">
                    <div class="button__touch-wrapper">
                       <button class="button button--contained button--secondary focus-visible button--text-green" aria-label="Chia sẻ">
                          <div class="ripple--bounded"></div>
                          <span class="app-actions">
                            <svg width="24" height="24" viewBox="0 0 24 24" class="button--secondary">
                              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
                            </svg>
                          </span>
                          <span class="button__label">Chia sẻ</span>
                       </button>
                    </div>
                 </div>
              </div>
            </div>
            
            <div class="device-info">
               <div class="device-info__line">
                  <svg class="device-info__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-540ZM80-160v-80h400v80H80Zm120-120q-33 0-56.5-23.5T120-360v-360q0-33 23.5-56.5T200-800h560q33 0 56.5 23.5T840-720H200v360h280v80H200Zm600 40v-320H640v320h160Zm-180 80q-25 0-42.5-17.5T560-220v-360q0-25 17.5-42.5T620-640h200q25 0 42.5 17.5T880-580v360q0 25-17.5 42.5T820-160H620Zm100-300q13 0 21.5-9t8.5-21q0-13-8.5-21.5T720-520q-12 0-21 8.5t-9 21.5q0 12 9 21t21 9Zm0 60Z" /></svg>
                  <span>Ứng dụng này dùng được trên thiết bị của bạn</span>
               </div>
               <div class="device-info__line">
                  <svg class="device-info__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m480-840 440 330-48 64-72-54v380H160v-380l-72 54-48-64 440-330ZM294-478q0 53 57 113t129 125q72-65 129-125t57-113q0-44-30-73t-72-29q-26 0-47.5 10.5T480-542q-15-17-37.5-27.5T396-580q-42 0-72 29t-30 73Zm426 278v-360L480-740 240-560v360h480Zm0 0H240h480Z" /></svg>
                  Bạn có thể chia sẻ mục này với gia đình mình.
               </div>
            </div>
          </div>
        </div>
      </div>
    `;

        if (price) {
            this.innerHTML = mainHtml + this.getModalsHtml(title, price, iconSrc, downloadLink);
            this.initPaymentLogic();
        } else {
            this.innerHTML = mainHtml;
        }
    }

    getModalsHtml(title, price, iconSrc, downloadLink) {
        return `
      <a href="${downloadLink}" download id="comp-download-link" style="display: none"></a>
      
      <div class="modal-container modal-google modal-large modal-buy-screen modal-container--with-divider">
        <div class="modal-positioner"><div class="modal-content"><div class="modal-body">
           <div class="modal-sticky-header">
              <div class="modal-header-content"><div class="header-inner">
                 <img src="/assets/images/logo.png" class="logo-image" width="43" height="56" />
                 <button class="icon-button icon-button-zindex close-modal-btn"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></button>
              </div></div>
           </div>
           <div class="buy-screen-body">
              <div class="content-section-download"><div class="product-card"><div class="grid-container"><div class="grid-row" style="grid-column: span 2"><div class="grid-col-span2 align-start">
                 <div class="item-info align-center"><img src="${iconSrc}" class="logo-image item-image" width="56" height="56" /><span class="item-title">${title}</span></div>
                 <div class="grid-col-end"><div class="price-container"><div class="item-price"><span>${price}</span></div></div></div>
              </div></div></div></div></div>
              <hr class="divider" />
              <div class="clickable-row"><button class="clickable-row-button open-method-btn"><div class="content-section-download"><div class="grid-container"><div class="grid-row" style="grid-column: span 2"><div class="grid-col-span2 align-center">
                 <div class="item-info align-center"><div class="payment-icon-wrapper"><img src="https://play-lh.googleusercontent.com/m_kcv3h4YvWU_o3YaT3johv9ioR_NiQ9dB2XKvZKjbptJawl0IUZN1BfYBAeXoKcGvzYN0UpmA" class="logo-image payment-icon" style="max-width: 32px; max-height: 32px" /></div><span class="payment-name">MoMo e-wallet: •••• 7840</span></div>
                 <div class="grid-col-end"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1f1f1f"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg></div>
              </div></div></div></div></button></div>
              <hr class="divider" />
              <div class="content-section-download"><div class="disclaimer-group"><div class="disclaimer-text">Nhấp vào "Mua" để hoàn tất giao dịch.</div></div></div>
           </div>
        </div>
        <div class="modal-footer"><div class="footer-actions"><div class="button-wrapper-inline">
           <button class="button-filled button-filled-v-margin button-filled-wide open-qr-btn"><span class="button-label">Mua</span></button>
        </div></div></div>
        </div></div><div class="modal-scrim close-modal-scrim"></div>
      </div>

      <div class="modal-container modal-google modal-large modal-method-screen modal-container--with-divider">
         <div class="modal-positioner"><div class="modal-content"><div class="modal-body">
            <div class="method-header"><div class="back-button-container"><button class="icon-button icon-button-zindex back-to-buy-btn"><svg class="icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg></button></div><div class="header-text-group"><div class="modal-title">Phương thức thanh toán</div></div></div>
            <hr class="divider-indented" />
            <div class="list-item list-item-transparent"><div class="select-method-button"><div class="list-item-padding"><div class="grid-container"><div class="grid-row" style="grid-column: span 2"><div class="grid-col-span2 align-center">
               <div class="item-info align-center"><img src="https://play-lh.googleusercontent.com/m_kcv3h4YvWU_o3YaT3johv9ioR_NiQ9dB2XKvZKjbptJawl0IUZN1BfYBAeXoKcGvzYN0UpmA" class="logo-image payment-icon" /><span class="list-item-title">MoMo e-wallet</span></div>
            </div></div></div></div></div></div>
         </div></div></div><div class="modal-scrim close-modal-scrim"></div>
      </div>

      <div class="modal-container modal-google modal-large modal-qr-screen modal-container--with-divider">
         <div class="modal-positioner"><div class="modal-content"><div class="modal-body">
            <div class="method-header"><div class="back-button-container"><button class="icon-button icon-button-zindex back-to-buy-btn"><svg class="icon-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg></button></div><div class="header-text-group"><div class="modal-title">Thanh toán</div><div class="modal-subtitle-email">MoMo e-wallet</div></div></div>
            <hr class="divider-indented" />
            <div class="qr-code-container">
               <div class="qr-item-info"><img src="${iconSrc}" class="logo-image item-image qr-info-image" /><div class="qr-item-details"><div class="qr-info-title">${title}</div><div class="qr-info-price">${price}</div></div></div>
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=ThanhToanFake" class="qr-code-image" />
               <div class="qr-instructions-main">Mở ứng dụng MoMo để quét mã</div>
               <div class="qr-instructions-sub">Mã hết hạn sau <span class="qr-timer">4:59</span></div>
            </div>
         </div></div></div><div class="modal-scrim close-modal-scrim"></div>
      </div>

      <div class="modal-container modal-google modal-success-screen">
         <div class="modal-positioner"><div class="modal-content success-box">
            <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" /></svg>
            <div class="success-title">Giao dịch thành công!</div>
            <div class="success-message">Đang chuẩn bị tệp của bạn...</div>
         </div></div><div class="modal-scrim close-modal-scrim"></div>
      </div>
    `;
    }

    initPaymentLogic() {
        const buyScreen = this.querySelector(".modal-buy-screen");
        const methodScreen = this.querySelector(".modal-method-screen");
        const qrScreen = this.querySelector(".modal-qr-screen");
        const successScreen = this.querySelector(".modal-success-screen");
        const allModals = [buyScreen, methodScreen, qrScreen, successScreen];

        const openDemoBtn = this.querySelector("#component-open-payment");
        const openMethodBtn = this.querySelector(".open-method-btn");
        const openQrBtn = this.querySelector(".open-qr-btn");
        const closeBtns = this.querySelectorAll(".close-modal-btn, .close-modal-scrim");
        const backBtns = this.querySelectorAll(".back-to-buy-btn");

        const qrTimerDisplay = this.querySelector(".qr-timer");
        const downloadLink = this.querySelector("#comp-download-link");
        let qrTimerInterval = null;

        const hideAllModals = () => {
            allModals.forEach(m => { if (m) m.classList.remove("modal-container--visible"); });
        };

        hideAllModals();

        const showModal = (modal) => {
            if (qrTimerInterval) { clearInterval(qrTimerInterval); qrTimerInterval = null; }
            hideAllModals();
            if (modal) modal.classList.add("modal-container--visible");
        };

        const startQrTimer = () => {
            let displayTime = 300;
            let demoTime = 5;

            const formatTime = (s) => {
                const m = Math.floor(s / 60);
                const sec = s % 60;
                return `${m}:${sec < 10 ? '0' + sec : sec}`;
            };

            if (qrTimerDisplay) qrTimerDisplay.textContent = formatTime(displayTime);

            qrTimerInterval = setInterval(() => {
                displayTime--;
                demoTime--;
                if (qrTimerDisplay) qrTimerDisplay.textContent = formatTime(displayTime);

                if (demoTime <= 0) {
                    clearInterval(qrTimerInterval);
                    showModal(successScreen);
                    setTimeout(() => {
                        if (downloadLink) downloadLink.click();
                        hideAllModals();
                    }, 2000);
                }
            }, 1000);
        };

        if (openDemoBtn) openDemoBtn.addEventListener("click", () => showModal(buyScreen));
        if (openMethodBtn) openMethodBtn.addEventListener("click", () => showModal(methodScreen));
        if (openQrBtn) openQrBtn.addEventListener("click", () => {
            showModal(qrScreen);
            startQrTimer();
        });

        backBtns.forEach(btn => btn.addEventListener("click", () => showModal(buyScreen)));
        closeBtns.forEach(btn => btn.addEventListener("click", hideAllModals));
    }
}

customElements.define('app-header', AppHeader);