// CustomHeader.js

class CustomHeader extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = this.getInitialHTML();

        // Các element quan trọng
        this.authContainer = this.querySelector('#auth-container');
        this.dropdownMenu = this.querySelector('#profile-dropdown-menu');

        // Khởi tạo
        this.init();
    }

    init() {
        // 1. Kiểm tra trạng thái đăng nhập và render giao diện tương ứng
        this.renderAuthUI();

        // 2. Lắng nghe sự kiện 'auth-change' (Sự kiện tùy chỉnh khi đăng nhập/đăng xuất)
        window.addEventListener('auth-change', () => {
            this.renderAuthUI();
        });

        // 3. Lắng nghe sự kiện storage (để đồng bộ giữa các tab trình duyệt)
        window.addEventListener('storage', () => {
            this.renderAuthUI();
        });
    }

    // HTML Khung sườn (Skeleton)
    getInitialHTML() {
        return `
            <link rel="stylesheet" href="/assets/css/style.css">
            <link rel="stylesheet" href="/assets/css/SettingTab.css">
            <link rel="stylesheet" href="/assets/css/header.css">
            
            <header class="header" id="header">
                <nav class="nav">
                    <a href="/index.html" aria-label="Biểu trưng của App Market" class="header__logo-link">
                        <img src="/assets/images/logo.png" alt="App Market logo" />
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

                        <div id="auth-container"></div>
                    </div>
                </nav>
            </header>
        `;
    }

    // Hàm render UI dựa trên trạng thái đăng nhập
    renderAuthUI() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        this.authContainer = this.querySelector('#auth-container');

        if (isLoggedIn) {
            // TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP: Hiển thị Avatar và Dropdown
            this.authContainer.innerHTML = `
                <div class="profile-menu-container">
                    <button class="icon-button" id="avatar-button">
                        <img src="/assets/images/banhrang.png" alt="Cài đặt" style="width: 24px; height: 24px; object-fit: contain;">
                    </button>

                    <div class="profile-dropdown" id="profile-dropdown-menu">
                        <div class="dropdown-header">
                            <div class="user-info">
                                <span class="user-name" id="user-name-display">Đang tải...</span>
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
                            <li><a href="#" id="logout-btn">Đăng xuất</a></li>
                        </ul>
                    </div>
                </div>
            `;

            // Setup sự kiện cho Avatar (Toggle Dropdown)
            this.setupAvatarEvents();

            // Tải dữ liệu user
            this.fetchUserDataAndRender();
        } else {
            // TRƯỜNG HỢP CHƯA ĐĂNG NHẬP: Hiển thị component AuthModal
            this.authContainer.innerHTML = `<auth-modal></auth-modal>`;
        }
    }

    setupAvatarEvents() {
        const avatarBtn = this.querySelector('#avatar-button');
        const dropdown = this.querySelector('#profile-dropdown-menu');
        const logoutBtn = this.querySelector('#logout-btn');

        // 1. Toggle Dropdown khi click avatar
        if (avatarBtn && dropdown) {
            avatarBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Ngăn chặn click lan ra window
                dropdown.classList.toggle('show'); // Bạn cần thêm CSS class .show display:block

                // Nếu chưa có class show trong CSS, ta dùng style inline tạm thời
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    dropdown.style.display = 'block';
                }
            });

            // Đóng dropdown khi click ra ngoài
            window.addEventListener('click', () => {
                if (dropdown) dropdown.style.display = 'none';
            });

            // Ngăn đóng khi click vào bên trong dropdown
            dropdown.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        // 2. Xử lý Đăng xuất
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleLogout();
            });
        }
    }

    handleLogout() {
        // Xóa trạng thái đăng nhập
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser"); // Nếu có lưu info user

        // Phát sự kiện để các component khác biết (nếu cần)
        window.dispatchEvent(new Event('auth-change'));
    }

    async fetchUserDataAndRender() {
        // Chỉ fetch nếu đang đăng nhập
        if (localStorage.getItem("isLoggedIn") !== "true") return;

        try {
            const response = await fetch("/assets/json/userData.json");
            const data = await response.json();
            const userData = data.User[0];

            if (userData) {
                const userNameElement = this.querySelector("#user-name-display");
                const userEmailElement = this.querySelector("#user-email-display");

                if (userNameElement)
                    userNameElement.textContent = userData.FullName || userData.Username;
                if (userEmailElement) userEmailElement.textContent = userData.Email;
            }
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
        }
    }
}

customElements.define("custom-header", CustomHeader);