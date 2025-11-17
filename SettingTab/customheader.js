// CustomHeader.js

class CustomHeader extends HTMLElement {
    constructor() {
        super();

        // Thêm HTML trực tiếp vào component
        this.innerHTML = `
            <link rel="stylesheet" href="../assets/css/style.css">
            <link rel="stylesheet" href="SettingTab.css">

            <header class="header">
                <nav class="nav">
                    <a href="/store/games" aria-label="Biểu trưng của Google Play" class="header__logo-link"><svg
                            class="brand-logo" aria-hidden="true" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0,0h40v40H0V0z"></path>
                            <g>
                                <path
                                    d="M19.7,19.2L4.3,35.3c0,0,0,0,0,0c0.5,1.7,2.1,3,4,3c0.8,0,1.5-0.2,2.1-0.6l0,0l17.4-9.9L19.7,19.2z"
                                    fill="#EA4335"></path>
                                <path
                                    d="M35.3,16.4L35.3,16.4l-7.5-4.3l-8.4,7.4l8.5,8.3l7.5-4.2c1.3-0.7,2.2-2.1,2.2-3.6C37.5,18.5,36.6,17.1,35.3,16.4z"
                                    fill="#FBBC04"></path>
                                <path d="M4.3,4.7C4.2,5,4.2,5.4,4.2,5.8v28.5c0,0.4,0,0.7,0.1,1.1l16-15.7L4.3,4.7z"
                                    fill="#4285F4"></path>
                                <path
                                    d="M19.8,20l8-7.9L10.5,2.3C9.9,1.9,9.1,1.7,8.3,1.7c-1.9,0-3.6,1.3-4,3c0,0,0,0,0,0L19.8,20z"
                                    fill="#34A853"></path>
                            </g>
                        </svg><span aria-hidden="true">Google Play</span></a>

                    <span class="navigation-tabs">
                        <a role="tab" class="nav-tab nav-tab-selected nav-tab--auto-width nav-tab--styled FEsNhd YmRZ5d"
                           aria-selected="true" tabindex="0" id="11" href="./index.html">
                            <span class="nav-tab__inner">
                                <span class="nav-tab__label">Trò chơi</span>
                                <span class="nav-tab__indicator-wrapper nav-tab__indicator-wrapper-selected nav-tab__indicator-border kte1hc">
                                    <span class="nav-tab__indicator nav-tab__indicator-format indicator-length"></span>
                                </span>
                            </span>
                        </a>
                        <a role="tab" class="nav-tab nav-tab--auto-width nav-tab--styled FEsNhd YmRZ5d q2wkXd"
                           aria-selected="true" tabindex="-1" id="1" href="./app_nav.html">
                            <span class="nav-tab__inner">
                                <span class="nav-tab__label">Ứng dụng</span>
                                <span class="nav-tab__indicator-wrapper nav-tab__indicator-border kte1hc">
                                    <span class="nav-tab__indicator nav-tab__indicator-format indicator-length"></span>
                                </span>
                            </span>
                        </a>
                        <a role="tab" class="nav-tab nav-tab--auto-width nav-tab--styled FEsNhd YmRZ5d dUghbc"
                           aria-selected="false" tabindex="-1" id="13" href="./children_nav.html">
                            <span class="nav-tab__inner">
                                <span class="nav-tab__label">Trẻ em</span>
                                <span class="nav-tab__indicator-wrapper nav-tab__indicator-border kte1hc">
                                    <span class="nav-tab__indicator nav-tab__indicator-format indicator-length"></span>
                                </span>
                            </span>
                        </a>
                    </span>

                    <div class="header-actions">
                        <button class="search__box">
                            <input class="search__input" type="text" placeholder="Search" />
                        </button>

                        <button class="icon-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                            </svg>
                        </button>

                        <div class="profile-menu-container">
                            <button class="icon-button icon_container" id="avatar-button">
                                <img src="https://lh3.googleusercontent.com/a/ACg8ocLy4_GnkIHGe1yeIk6TVmY8FNzNneyNjrQtrPKyFiHhxFSFvg=s32-c-k-cc-mo"
                                     class="icon_inner" />
                            </button>

                            <div class="profile-dropdown" id="profile-dropdown-menu">
                                <div class="dropdown-header">
                                    <img src="https://lh3.googleusercontent.com/a/ACg8ocLy4_GnkIHGe1yeIk6TVmY8FNzNneyNjrQtrPKyFiHhxFSFvg=s32-c-k-cc-mo"
                                         class="dropdown-avatar" alt="Avatar" />
                                    <div class="user-info">
                                        <span class="user-name">Tên Của Bạn</span>
                                        <span class="user-email">email@cuaban.com</span>
                                    </div>
                                </div>

                                <ul class="dropdown-list">
                                    <li><a href="./library.html">Thư viện và thiết bị</a></li>
                                    <li><a href="./payment.html">Thông tin thanh toán và gói thuê bao</a></li>
                                    <li><a href="./setting.html">Cài đặt</a></li>
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
}

// Đăng ký component
customElements.define('custom-header', CustomHeader);
