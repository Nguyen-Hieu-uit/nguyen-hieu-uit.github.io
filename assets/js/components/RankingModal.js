class RankingModal extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEvents();
    this.loadRankingData();
  }

  render() {
    this.innerHTML = `
      <style>
        /* CSS cục bộ cho HomeFilter khi nằm trong Ranking Modal */
        #ranking-filter .filter_format {
            margin: 0 !important; 
            width: 100%;
        }
        #ranking-filter .filter-content-wrapper {
            margin: 0 !important;
        }
        #ranking-filter .filter-bar-scroll-container {
            justify-content: flex-start; 
            padding: 0 0 15px 0;
        }
        
        /* --- CẬP NHẬT: CHỈ ẨN NÚT "BẢNG XẾP HẠNG" --- */
        /* Giữ lại nút "Mới" (.js-btn-new) và "Clear" (.js-btn-clear) */
        #ranking-filter .js-btn-ranking {
            display: none !important;
        }
      </style>

      <div class="ranking-overlay" id="rankingOverlay">
        <div class="ranking-container">
          <div class="ranking-header">
            <h1>Bảng xếp hạng</h1>
            <button class="close-btn" id="closeRankingBtn"><span>×</span></button>
          </div>
          
          <div style="padding: 0 20px;">
             <home-filter id="ranking-filter"></home-filter>
          </div>

          <div class="ranking-list-scrollable" id="ranking-list-internal"></div>
        </div>
      </div>
    `;
  }

  initEvents() {
    const overlay = this.querySelector("#rankingOverlay");
    const closeBtn = this.querySelector("#closeRankingBtn");

    if (closeBtn)
      closeBtn.addEventListener("click", () =>
        overlay.classList.remove("visible")
      );
    if (overlay)
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) overlay.classList.remove("visible");
      });

    // Lắng nghe sự kiện mở từ bên ngoài
    document.addEventListener("click", (e) => {
      const openBtn = e.target.closest("#openRankingBtn");
      if (openBtn) {
        overlay.classList.add("visible");
      }
    });
  }

  loadRankingData() {
    const rankingItems = [
      {
        rank: 1,
        name: "Teamfight Tactics",
        category: "Chiến thuật",
        rating: 4.1,
        icon: "https://play-lh.googleusercontent.com/LML01HqsS5NiQ9GDoNxaFMUQndr3osVA2LoVWck58hC9Vxe15GrmbUc2QhwlFOJlfGaR=s96-rw",
      },
      {
        rank: 2,
        name: "Block Blast!",
        category: "Giải đố",
        rating: 4.6,
        icon: "https://play-lh.googleusercontent.com/R0qgNDYYHbRhw6JFsdEbDMqONplEvJx0m0W9wzYVvY3eNF1c2rfBWYjQxW0sLEzFe1E=s64-rw",
      },
      {
        rank: 3,
        name: "Nghịch Thủy Hàn",
        category: "Nhập vai",
        rating: 4.5,
        icon: "https://play-lh.googleusercontent.com/TYNTOTufkgDXPlRZ44NxBfd2sCAfXB4qkIooR1jTiCwrJG0lMvJvJI8PAXUrYZDbKw=s64-rw",
      },
      {
        rank: 4,
        name: "Roblox VN",
        category: "Mô phỏng",
        rating: 3.8,
        icon: "https://play-lh.googleusercontent.com/hkJ5oNiCo6LkLt0HuFk7S8uInQqqnDxAKmFfYURb8qYiY9aYzWoHb4ob3JE_TkUPs1M=s64-rw",
      },
      {
        rank: 5,
        name: "Chiến Tuyến Hướng Dương",
        category: "Phổ thông",
        rating: 4.6,
        icon: "https://play-lh.googleusercontent.com/esn4ChQLU0wnGiVcQ64-RfgcKYN3wvpNqRRuNgik25Z2-H9Rv9G_nayig6krd1GookqEyQxHq0RIaSHExe5W9BU=s64-rw",
      },
    ];

    const container = this.querySelector("#ranking-list-internal");
    if (!container) return;

    let html = "";
    rankingItems.forEach((item) => {
      html += `
        <div class="ranking-item">
            <div class="ranking-number">${item.rank}</div>
            <img src="${item.icon}" class="app-icon" />
            <div class="app-details">
                <div class="app-name">${item.name}</div>
                <div class="app-category">${item.category}</div>
                <div class="app-rating"><span>${item.rating}</span> <span><svg fill="currentColor" width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg></span></div>
            </div>
        </div>`;
    });
    container.innerHTML = html;
  }
}
customElements.define("ranking-modal", RankingModal);
