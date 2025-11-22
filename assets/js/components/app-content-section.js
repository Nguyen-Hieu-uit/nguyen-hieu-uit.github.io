class AppContentSection extends HTMLElement {
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
        const type = this.getAttr("type", "text");
        const title = this.getAttr("title", "Tiêu đề");

        let bodyContent = "";

        if (type === "safety") {
            // Lấy nội dung chi tiết từ HTML attribute (hoặc dùng mặc định của Candy Crush)
            const summary = this.getAttr("content", "Sự an toàn bắt đầu từ việc nắm được cách nhà phát triển thu thập và chia sẻ dữ liệu của bạn.");
            const packageId = this.getAttr("package-id", "#");

            // Nội dung chi tiết cho từng mục (để bạn có thể thay đổi cho app khác)
            const shareInfo = this.getAttr("safety-share", "Vị trí, Thông tin cá nhân và Mã nhận dạng thiết bị hoặc mã nhận dạng khác");
            const collectInfo = this.getAttr("safety-collect", "Vị trí, Thông tin cá nhân và 5 loại dữ liệu khác");

            bodyContent = `
        ${summary}
        <div class="data-safety-promo">
          
          <div class="media-item">
            <img src="https://play-lh.googleusercontent.com/iFstqoxDElUVv4T3KxkxP3OTcuFvWF5ZQQjT7aIxy4n2uaVigCCykxeG6EZV9FQ10X1itPj1oORm=s20-rw" 
                 srcset="https://play-lh.googleusercontent.com/iFstqoxDElUVv4T3KxkxP3OTcuFvWF5ZQQjT7aIxy4n2uaVigCCykxeG6EZV9FQ10X1itPj1oORm=s40-rw 2x" 
                 class="img-contain media-item__icon" aria-hidden="true" alt="Icon" />
            <div>
              Ứng dụng này có thể chia sẻ những loại dữ liệu sau đây với bên thứ ba
              <div class="media-item__body">${shareInfo}</div>
            </div>
          </div>

          <div class="media-item">
            <img src="https://play-lh.googleusercontent.com/12USW7aflgz466ifDehKTnMoAep_VHxDmKJ6jEBoDZWCSefOC-ThRX14Mqe0r8KF9XCzrpMqJts=s20-rw" 
                 srcset="https://play-lh.googleusercontent.com/12USW7aflgz466ifDehKTnMoAep_VHxDmKJ6jEBoDZWCSefOC-ThRX14Mqe0r8KF9XCzrpMqJts=s40-rw 2x"
                 class="img-contain media-item__icon" aria-hidden="true" alt="Icon" />
            <div>
              Ứng dụng này có thể thu thập những loại dữ liệu sau đây
              <div class="media-item__body">${collectInfo}</div>
            </div>
          </div>

          <div class="media-item">
            <img src="https://play-lh.googleusercontent.com/W5DPtvB8Fhmkn5LbFZki_OHL3ZI1Rdc-AFul19UK4f7np2NMjLE5QquD6H0HAeEJ977u3WH4yaQ=s20-rw" 
                 srcset="https://play-lh.googleusercontent.com/W5DPtvB8Fhmkn5LbFZki_OHL3ZI1Rdc-AFul19UK4f7np2NMjLE5QquD6H0HAeEJ977u3WH4yaQ=s40-rw 2x"
                 class="img-contain media-item__icon" aria-hidden="true" alt="Icon" />
            <div>Dữ liệu được mã hóa trong khi chuyển</div>
          </div>

          <div class="media-item">
            <img src="https://play-lh.googleusercontent.com/ohRyQRA9rNfhp7xLW0MtW1soD8SEX45Oec7MyH3FaxtukWUG_6GKVpvh3JiugzryLi7Bia02HPw=s20-rw" 
                 srcset="https://play-lh.googleusercontent.com/ohRyQRA9rNfhp7xLW0MtW1soD8SEX45Oec7MyH3FaxtukWUG_6GKVpvh3JiugzryLi7Bia02HPw=s40-rw 2x"
                 class="img-contain media-item__icon" aria-hidden="true" alt="Icon" />
            <div>Bạn có thể yêu cầu xóa dữ liệu</div>
          </div>

          <div class="button-wrapper">
            <div class="button__touch-wrapper">
              <div class="button button--contained button--secondary focus-visible button--text-green button--margin-y-medium">
                <div class="ripple--bounded"></div>
                <span class="button__label">Xem chi tiết</span>
                <a class="stretched-link button__touch-target" 
                   href="/store/apps/datasafety?id=${packageId}" 
                   aria-label="Xem thêm thông tin chi tiết về an toàn dữ liệu"></a>
                <div class="button__focus-ring"></div>
              </div>
            </div>
          </div>
        </div>
      `;
        } else {
            // Render văn bản thường (Tính năng mới)
            const content = this.getAttr("content", "");
            bodyContent = `<div itemprop="description">${content}</div>`;
        }

        this.innerHTML = `
      <section class="content-section">
        <header class="content-section__header">
          <div class="section-header-inner">
            <div class="content-section__title-wrapper">
              <h2 class="content-section__title">${title}</h2>
            </div>
            ${type === 'safety' ? `
            <div class="icon-button icon-button--fix-stacking is-focussed icon-button--pull-margin">
                <div class="icon-button--fix-stacking"></div>
                <svg class="app-actions content-section__header-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                  <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                </svg>
                <a class="stretched-link" href="/store/apps/datasafety?id=${this.getAttr("package-id")}" aria-label="Xem chi tiết"></a>
            </div>` : ''}
          </div>
        </header>
        <div class="content-section__body">
          ${bodyContent}
        </div>
      </section>
    `;
    }
}

customElements.define('app-content-section', AppContentSection);