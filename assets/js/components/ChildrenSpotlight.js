class ChildrenSpotlight extends HTMLElement {
  connectedCallback() {
    const bgColor = this.getAttribute("bg-color") || "#69c5ba";
    const imgMain = this.getAttribute("img-main") || "";
    const title = this.getAttribute("title") || "";
    const subtitle = this.getAttribute("subtitle") || "";
    const icon = this.getAttribute("icon") || "";
    const appName = this.getAttribute("app-name") || "";
    const category = this.getAttribute("category") || "";
    const link = this.getAttribute("href") || "#";

    this.innerHTML = `
      <div class="platform-item spotlight-grid__cell-spacing" style="list-style: none;">
        <div class="card card--outlined card--elevated card--flat spotlight-banner__container spotlight-app-card">
          <div>
            <div class="card-container spotlight-banner__content-wrapper">
              <a href="#" class="card-link pos-relative">
                <div class="spotlight-card" style="background-color: ${bgColor}">
                  <img src="${imgMain}" class="img-contain spotlight-card__image" loading="lazy" />
                  <div class="spotlight-card__footer"></div>
                  <div class="spotlight-card__image-overlay" style="background-image: linear-gradient(transparent 43.83%, ${bgColor} 79.64%);"></div>
                </div>
                <div class="spotlight-card__content-overlay">
                  <div class="spotlight-card__title text-color-black" style="color: white;">${title}</div>
                  <div class="spotlight-card__subtitle text-color-black" style="color: white;">${subtitle}</div>
                </div>
              </a>
            </div>
            <div class="spotlight-card__footer-grid">
              <a href="#">
                <div class="spotlight-card__app-info-group">
                  <img src="${icon}" class="img-contain spotlight-card__app-icon" alt="Icon" loading="lazy" />
                  <div class="spotlight-card__app-details">
                    <div class="spotlight-card__detail-line">
                      <span class="spotlight-card__app-name text-color-black">${appName}</span>
                    </div>
                    <div class="spotlight-card__detail-line">
                      <span class="spotlight-card__app-category text-color-black">${category}</span>
                    </div>
                  </div>
                </div>
              </a>
              <div class="util-flex-center-column">
                <div class="button-wrapper">
                  <div class="button__touch-wrapper">
                    <button class="button button--theme-green button--contained button--typography button--padding-x-large button--shape-rounded button--text-light button--min-width-medium spotlight-button--small text-color-black spotlight-button--secondary">
                    <div class="ripple--bounded"></div>  
                    <span class="button__label">Cài đặt</span>
                    </button>
                  </div>
                </div>
                <span class="app-purchase-note text-color-black">Mua trong ứng dụng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define("children-spotlight", ChildrenSpotlight);
