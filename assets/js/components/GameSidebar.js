class GameSidebar extends HTMLElement {
    constructor() {
        super();
        // Dữ liệu của các game gợi ý.
        // Bạn có thể dễ dàng thêm/xóa game tại đây mà không cần sửa HTML phức tạp.
        this.games = [
            {
                name: "Candy Crush Soda Saga",
                producer: "King",
                rating: "4,5",
                url: "/store/apps/details?id=com.king.candycrushsodasaga",
                img: "https://play-lh.googleusercontent.com/zFQMxlqWiz8Ok9JH5QHgJDG4O01vYpBTak-BnuzkcKmDqQibYJ5wv6MipzJc4HFgkzw=s64-rw",
                srcset: "https://play-lh.googleusercontent.com/zFQMxlqWiz8Ok9JH5QHgJDG4O01vYpBTak-BnuzkcKmDqQibYJ5wv6MipzJc4HFgkzw=s128-rw 2x"
            },
            {
                name: "Clash of Clans",
                producer: "Supercell",
                rating: "4,6",
                url: "/store/apps/details?id=com.supercell.clashofclans",
                img: "https://play-lh.googleusercontent.com/sFmWfYbYp_2ea7VRMTnwd3gjIBrPGXHj_d_ab1_k1q1p2OMk4riGMF1vqxdhONOtTYOt_BVpk7a4AYcKU68LNGQ=s64-rw",
                srcset: "https://play-lh.googleusercontent.com/sFmWfYbYp_2ea7VRMTnwd3gjIBrPGXHj_d_ab1_k1q1p2OMk4riGMF1vqxdhONOtTYOt_BVpk7a4AYcKU68LNGQ=s128-rw 2x"
            },
            {
                name: "Infinity Loop - Thư giãn",
                producer: "Infinity Games, Lda",
                rating: "4,8",
                url: "/store/apps/details?id=com.balysv.loop",
                img: "https://play-lh.googleusercontent.com/Zn0e1ULoepwefhCTvz1z3QJMzEBvMxxZuZGALkPnkeNV99NcR62VrvkN3QOZ9XbtfA=s64-rw",
                srcset: "https://play-lh.googleusercontent.com/Zn0e1ULoepwefhCTvz1z3QJMzEBvMxxZuZGALkPnkeNV99NcR62VrvkN3QOZ9XbtfA=s128-rw 2x"
            },
            {
                name: "Blossom Blast Saga",
                producer: "King",
                rating: "4,2",
                url: "/store/apps/details?id=com.king.blossomblast",
                img: "https://play-lh.googleusercontent.com/_rRsidWlPPfMk8ObFcphrtAJH9O73Hcywc_u3gsLzX6Jj0SOzDK-hgUsHvH3GfXsEPk=s64-rw",
                srcset: "https://play-lh.googleusercontent.com/_rRsidWlPPfMk8ObFcphrtAJH9O73Hcywc_u3gsLzX6Jj0SOzDK-hgUsHvH3GfXsEPk=s128-rw 2x"
            },
            {
                name: "Mosaic Match - Trò Chơi Ô Gạch",
                producer: "Tripledot Studios Limited",
                rating: "5,0",
                url: "/store/apps/details?id=com.tripledot.tiles.mosaic",
                img: "https://play-lh.googleusercontent.com/n7d6s1XcPTkAIs_lbJY9uyfGFpioNpKhJfihpFPgL0mJcInikWNVfl9sJXwtwBYirNVQEW7OqKcLWClMr644vtE=s64-rw",
                srcset: "https://play-lh.googleusercontent.com/n7d6s1XcPTkAIs_lbJY9uyfGFpioNpKhJfihpFPgL0mJcInikWNVfl9sJXwtwBYirNVQEW7OqKcLWClMr644vtE=s128-rw 2x"
            },
            {
                name: "Homescapes – VTC Game",
                producer: "Playrix",
                rating: "4,7",
                url: "/store/apps/details?id=com.playrix.homescapes",
                img: "https://play-lh.googleusercontent.com/gP9f7EaDjnr73WWSQiXs6qi9UgsPdnf2YFz4imdR5v4Qmj1mszkzCORP8M4uvlxNrA=s64-rw",
                srcset: "https://play-lh.googleusercontent.com/gP9f7EaDjnr73WWSQiXs6qi9UgsPdnf2YFz4imdR5v4Qmj1mszkzCORP8M4uvlxNrA=s128-rw 2x"
            }
        ];
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
      <section class="content-section">
        <header class="content-section__header">
          <div class="section-header-inner">
            <div class="content-section__title-wrapper">
              <h2 class="content-section__title">
                <span>Có thể bạn cũng thích</span>
              </h2>
            </div>
            <div class="icon-button icon-button--fix-stacking is-focussed icon-button--pull-margin">
              <div class="icon-button--fix-stacking"></div>
              <svg class="button__icon content-section__header-arrow" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960">
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"></path>
              </svg>
              <a class="stretched-link"
                href="/store/apps/collection/cluster?gsr=Sk1qGHhLcEg3YzlYUUtaS3VTaXJveFFIZVE9PZoILQobChdjb20ua2luZy5jYW5keWNydXNoc2FnYRAHEAIaBggCEAAYACAAMAE4ALASAA%3D%3D:S:ANO1ljKULGU"
                aria-label="Xem thêm thông tin về Có thể bạn cũng thích"></a>
            </div>
          </div>
        </header>
        <div class="content-section__body">
          <div class="grid-container--gap-large grid--cols-2-to-1">
            ${this.renderGames()}
          </div>
        </div>
      </section>
    `;
    }

    // Hàm này tạo HTML cho từng thẻ game dựa trên mảng dữ liệu
    renderGames() {
        return this.games.map(game => `
      <div class="card-container grid-item--inset">
        <a class="card-link flex-container--relative" href="${game.url}">
          <div class="app-info pacing--margin-medium">
            <img src="${game.img}" srcset="${game.srcset}" class="img-contain app-icon" aria-hidden="true" loading="lazy" alt="${game.name}" />
            <div class="app-details">
              <div class="app-detail-row">
                <span class="app-name">${game.name}</span>
              </div>
              <div class="app-detail-row">
                <span class="producer-app-name">${game.producer}</span>
              </div>
              <div class="app-detail-row">
                <div aria-label="Được xếp hạng ${game.rating} sao/5 sao" style="display: inline-flex; align-items: center;">
                  <span class="app-category">${game.rating}</span>
                  <span class="app-rating-icon">
                    <svg class="app-rating-icon-detail" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    `).join('');
    }
}

// Đăng ký thẻ custom element
customElements.define('game-sidebar', GameSidebar);