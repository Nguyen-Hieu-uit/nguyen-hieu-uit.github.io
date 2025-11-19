// Render dynamic sections on home page (ranking + one featured games row)

document.addEventListener("DOMContentLoaded", () => {
  // Render ranking list
  const rankingContainer = document.getElementById("ranking-list");

  if (rankingContainer && Array.isArray(rankingItems)) {
    rankingItems.forEach((item) => {
      const el = document.createElement("div");
      el.className = "ranking-item";
      el.innerHTML = `
        <div class="ranking-number">${item.rank}</div>
        <img
          src="${item.icon}"
          alt="${item.name} Icon"
          class="app-icon"
        />
        <div class="app-details">
          <div class="app-name">${item.name}</div>
          <div class="app-category">${item.category}</div>
          <div class="app-rating">
            <span>${item.rating}</span>
            <i class="material-icons">star</i>
          </div>
        </div>
      `;
      rankingContainer.appendChild(el);
    });
  }

  // Render one featured games row
  const featuredRow = document.getElementById("featured-games-row");

  if (featuredRow && Array.isArray(featuredGames)) {
    featuredGames.forEach((g) => {
      const item = document.createElement("div");
      item.className = "platform-item app-row-spacing";
      item.innerHTML = `
        <div class="card card--flat card--responsive">
          <div class="card__content">
            <div class="card-container card-inner">
              <a class="card-link card-content" href="${g.href}">
                <div class="app-thumbnail">
                  <img
                    src="${g.thumb}"
                    class="img-contain app-thumbnail-img"
                  />
                </div>
                <div class="app-info">
                  <img
                    src="${g.icon}"
                    class="img-contain app-icon"
                  />
                  <div class="app-details">
                    <div class="app-detail-row">
                      <span class="app-info__text app-name">${g.name}</span>
                    </div>
                    <div class="app-detail-row">
                      <span class="app-info__text app-category">${g.category}</span>
                    </div>
                    <div class="app-detail-row">
                      <span class="app-info__text app-rating">
                        <span class="app-category">${g.rating}</span>
                        <span class="app-rating-icon">
                          <svg
                            class="app-rating-icon-detail"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 -960 960 960"
                          >
                            <path
                              d="M480 -940 L375 -640 L60 -620 L300 -420 L210 -100 L480 -280 L750 -100 L660 -420 L900 -620 L585 -640 Z"
                            />
                          </svg>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      `;
      featuredRow.appendChild(item);
    });
  }

  // Render "Google Play Games on PC" row
  const pcGamesContainer = document.getElementById("pc-games-row");

  if (pcGamesContainer && Array.isArray(pcGamesRow)) {
    pcGamesRow.forEach((g) => {
      const item = document.createElement("div");
      item.className = "platform-item app-row-spacing";
      item.innerHTML = `
        <div class="card card--flat card--responsive">
          <div class="card__content">
            <div class="card-container card-inner">
              <a class="card-link card-content" href="${g.href}">
                <div class="app-thumbnail">
                  <img
                    src="${g.thumb}"
                    class="img-contain app-thumbnail-img"
                  />
                </div>
                <div class="app-info">
                  <img
                    src="${g.icon}"
                    class="img-contain app-icon"
                  />
                  <div class="app-details">
                    <div class="app-detail-row">
                      <span class="app-info__text app-name">${g.name}</span>
                    </div>
                    <div class="app-detail-row">
                      <span class="app-info__text app-category">${g.categoryMain}</span>
                      <span class="app-info__text app-rating-separator">•</span>
                      <span class="app-info__text app-category">${g.categoryExtra}</span>
                    </div>
                    <div class="app-detail-row">
                      <div>
                        <span class="app-info__text app-rating">
                          <span class="app-category">${g.rating}</span>
                          <span class="app-rating-icon">
                            <svg
                              class="app-rating-icon-detail"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 -960 960 960"
                            >
                              <path
                                d="M480 -940 L375 -640 L60 -620 L300 -420 L210 -100 L480 -280 L750 -100 L660 -420 L900 -620 L585 -640 Z"
                              />
                            </svg>
                          </span>
                        </span>
                      </div>
                      <span class="app-info__text app-category ePXqnb"></span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      `;
      pcGamesContainer.appendChild(item);
    });
  }

  // Render second "Google Play Games on PC" row (pc-games-row-2)
  const pcGamesContainer2 = document.getElementById("pc-games-row-2");

  if (pcGamesContainer2 && Array.isArray(pcGamesRow)) {
    pcGamesRow.forEach((g) => {
      const item = document.createElement("div");
      item.className = "platform-item app-row-spacing";
      item.innerHTML = `
        <div class="card card--flat card--responsive">
          <div class="card__content">
            <div class="card-container card-inner">
              <a class="card-link card-content" href="${g.href}">
                <div class="app-thumbnail">
                  <img
                    src="${g.thumb}"
                    class="img-contain app-thumbnail-img"
                  />
                </div>
                <div class="app-info">
                  <img
                    src="${g.icon}"
                    class="img-contain app-icon"
                  />
                  <div class="app-details">
                    <div class="app-detail-row">
                      <span class="app-info__text app-name">${g.name}</span>
                    </div>
                    <div class="app-detail-row">
                      <span class="app-info__text app-category">${g.categoryMain}</span>
                      <span class="app-info__text app-rating-separator">•</span>
                      <span class="app-info__text app-category">${g.categoryExtra}</span>
                    </div>
                    <div class="app-detail-row">
                      <div>
                        <span class="app-info__text app-rating">
                          <span class="app-category">${g.rating}</span>
                          <span class="app-rating-icon">
                            <svg
                              class="app-rating-icon-detail"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 -960 960 960"
                            >
                              <path
                                d="M480 -940 L375 -640 L60 -620 L300 -420 L210 -100 L480 -280 L750 -100 L660 -420 L900 -620 L585 -640 Z"
                              />
                            </svg>
                          </span>
                        </span>
                      </div>
                      <span class="app-info__text app-category ePXqnb"></span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      `;
      pcGamesContainer2.appendChild(item);
    });
  }

  // Render "Lựa chọn của biên tập viên" row
  const editorPicksContainer = document.getElementById("editor-picks-row");

  if (editorPicksContainer && Array.isArray(editorPicksRow)) {
    editorPicksRow.forEach((g) => {
      const item = document.createElement("div");
      item.className = "platform-item spotlight-grid__cell-spacing";
      item.innerHTML = `
        <div class="card card--flat spotlight-banner__container">
          <div class="card__content">
            <div class="card-container spotlight-banner__content-wrapper">
              <a href="${g.bannerHref}" class="card-link pos-relative">
                <div class="spotlight-card__badge">
                  <div class="spotlight-card__badge-text text-color-black">${
                    g.badgeText
                  }</div>
                </div>
                <div class="spotlight-card" style="background-color: ${
                  g.bannerBg
                }">
                  <img
                    src="${g.bannerImg}"
                    class="img-contain spotlight-card__image"
                    aria-hidden="true"
                  />
                  <div class="spotlight-card__footer"></div>
                  <div
                    class="spotlight-card__image-overlay"
                    style="
                      background-image: linear-gradient(
                        180deg,
                        transparent 43.83%,
                        ${g.bannerBg} 79.64%
                      );
                    "
                  ></div>
                </div>
                <div class="spotlight-card__content-overlay">
                  <div class="spotlight-card__title text-color-black">${
                    g.title
                  }</div>
                  ${
                    g.subtitle
                      ? `<div class="spotlight-card__subtitle text-color-black">${g.subtitle}</div>`
                      : ""
                  }
                </div>
              </a>

            
            </div>
              <div class="spotlight-card__footer-grid">
                <a href="${g.appHref}">
                  <div class="spotlight-card__app-info-group">
                    <img
                      src="${g.appIcon}"
                      class="img-contain spotlight-card__app-icon"
                      aria-hidden="true"
                      alt="Hình thu nhỏ"
                    />
                    <div class="spotlight-card__app-details">
                      <div class="spotlight-card__detail-line">
                        <span class="spotlight-card__app-name text-color-black">${
                          g.appName
                        }</span>
                      </div>
                      <div class="spotlight-card__detail-line">
                        <span class="spotlight-card__app-category text-color-black">${
                          g.appDev
                        }</span>
                        <span aria-hidden="true" class="spotlight-card__rating-spacer text-color-black">•</span>
                        <img
                          src="${g.appAgeIcon}"
                          class="img-contain spotlight-card__rating-star-icon"
                          alt="${g.appAgeAlt}"
                        />
                      </div>
                    </div>
                  </div>
                </a>
                <div class="util-flex-center-column">
                  <div>
                    <div class="button-wrapper">
                      <div class="button__touch-wrapper">
                        <button
                          class="button button--theme-green button--contained button--typography button--padding-x-large focus-visible button--shape-rounded button--text-light button--min-width-medium spotlight-button--small text-color-black spotlight-button--secondary"
                      
                          aria-label="${g.buttonAria}"
                        >
                          <div class="ripple--bounded"></div>
                         
                          <span class="button__label">${g.buttonLabel}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <span class="text-color-black">${g.purchaseNote}</span>
                </div>
            </div>
          </div>
        </div>
      `;
      editorPicksContainer.appendChild(item);
    });
  }
});
