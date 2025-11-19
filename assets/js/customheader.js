// CustomHeader.js

class CustomHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = this.getInitialHTML();
    this.fetchUserDataAndRender();
  }

  // HTML ban đầu của component (giữ nguyên cấu trúc)
  getInitialHTML() {
    return `
            <link rel="stylesheet" href="./assets/css/style.css">
            <link rel="stylesheet" href="./assets/css/SettingTab.css">
            <link rel="stylesheet" href="./assets/css/header.css">
            

            <header class="header" id="header">
                <nav class="nav">
                    <a href="/index.html" aria-label="Biểu trưng của App Market" class="header__logo-link">
                        <img src="/assets/logo/logo.png" alt="App Market logo" />
                        <span aria-hidden="true">App Market</span>
                    </a>

                    <span class="navigation-tabs">
                        <a role="tab" class="nav-tab nav-tab-selected nav-tab--auto-width nav-tab--styled FEsNhd YmRZ5d" 
                           aria-selected="true" tabindex="0" id="11" href="/index.html">
                            <span class="nav-tab__inner">
                                <span class="nav-tab__label">Trò chơi</span>
                                <span class="nav-tab__indicator-wrapper nav-tab__indicator-wrapper-selected nav-tab__indicator-border kte1hc">
                                    <span class="nav-tab__indicator nav-tab__indicator-format indicator-length"></span>
                                </span>
                            </span>
                            
                        </a>

                        <a role="tab" class="nav-tab nav-tab--auto-width nav-tab--styled FEsNhd YmRZ5d q2wkXd" 
                           aria-selected="true" tabindex="-1" id="1" href="/html/app_nav.html">
                            <span class="nav-tab__inner">
                                <span class="nav-tab__label">Ứng dụng</span>
                                <span class="nav-tab__indicator-wrapper nav-tab__indicator-border kte1hc">
                                    <span class="nav-tab__indicator nav-tab__indicator-format indicator-length"></span>
                                </span>
                            </span>
                            
                        </a>

                        <a role="tab" class="nav-tab nav-tab--auto-width nav-tab--styled FEsNhd YmRZ5d dUghbc" 
                           aria-selected="false" tabindex="-1" id="13" href="/html/children_nav.html">
                            <span class="nav-tab__inner">
                                <span class="nav-tab__label">Trẻ em</span>
                                <span class="nav-tab__indicator-wrapper nav-tab__indicator-border kte1hc">
                                    <span class="nav-tab__indicator nav-tab__indicator-format indicator-length"></span>
                                </span>
                            </span>
                           
                        </a>
                    </span>

                    <div class="header-actions">
                        <div class="search__box" id="search-button">
                            <input class="search__input" id="search-input" type="text" placeholder="Search" />
                            <span class="clear__button" id="clear-button" style="cursor: pointer; display: none">×</span>
                            <div class="suggestions__box" id="suggestions-box" style="display: none"></div>
                        </div>

                        <button class="icon-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                            </svg>
                        </button>

                        <div class="profile-menu-container">
                            <button class="icon-button icon_container" id="avatar-button">
                                <img src="" class="icon_inner" alt="Avatar Button" id="header-avatar-1"/>
                            </button>

                            <div class="profile-dropdown" id="profile-dropdown-menu">
                                <div class="dropdown-header">
                                    <img src="" class="dropdown-avatar" alt="Avatar" id="header-avatar-2"/>
                                    <div class="user-info">
                                        <span class="user-name" id="user-name-display"></span>
                                        <span class="user-email" id="user-email-display"></span>
                                    </div>
                                </div>

                                <ul class="dropdown-list">
                                    <li><a href="/html/library.html">Thư viện và thiết bị</a></li>
                                    <li><a href="/html/payment.html">Thông tin thanh toán và gói thuê bao</a></li>
                                    <li><a href="/html/offers.html">Ưu đãi</a></li>
                                    <li><a href="/html/setting.html">Cài đặt</a></li>
                                </ul>

                                <div class="dropdown-divider"></div>

                                <ul class="dropdown-list">
                                    <li><a href="#">Đăng xuất</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        `;
  }

  // Hàm lấy dữ liệu và cập nhật DOM
  async fetchUserDataAndRender() {
    try {
      // Giả sử file userData.json nằm cùng cấp hoặc có thể truy cập được
      const response = await fetch("/assets/json/userData.json");
      const data = await response.json();

      // Lấy thông tin người dùng đầu tiên trong mảng "User"
      const userData = data.User[0];

      if (userData) {
        // Lấy các phần tử cần cập nhật
        const userNameElement = this.querySelector("#user-name-display");
        const userEmailElement = this.querySelector("#user-email-display");
        const headerAvatar1 = this.querySelector("#header-avatar-1");
        const headerAvatar2 = this.querySelector("#header-avatar-2");

        // Cập nhật nội dung và thuộc tính
        if (userNameElement)
          userNameElement.textContent = userData.FullName || userData.Username;
        if (userEmailElement) userEmailElement.textContent = userData.Email;

        // Cập nhật Avatar (cả ở nút và trong dropdown header)
        if (headerAvatar1) headerAvatar1.src = userData.Avatar;
        if (headerAvatar2) headerAvatar2.src = userData.Avatar;
      }
    } catch (error) {
      console.error("Lỗi khi tải hoặc phân tích dữ liệu người dùng:", error);
      // Có thể giữ lại các giá trị placeholder nếu không tải được
    }
  }
}

// Đăng ký component
customElements.define("custom-header", CustomHeader);
