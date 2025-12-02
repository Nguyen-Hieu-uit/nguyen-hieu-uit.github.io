class AuthModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEvents(); // Gắn event sau khi DOM nội bộ được render
  }

  // Danh sách quốc gia với tên bản ngữ
  getCountries() {
    return [
      { code: "Vietnam", name: "Việt Nam" },
      { code: "USA", name: "United States" },
      { code: "UK", name: "United Kingdom" },
      { code: "China", name: "中国" },
      { code: "Japan", name: "日本" },
      { code: "Korea", name: "한국" },
      { code: "France", name: "France" },
      { code: "Germany", name: "Deutschland" },
      { code: "Russia", name: "Россия" },
      { code: "Spain", name: "España" },
    ];
  }

  render() {
    // Tạo danh sách các thẻ <option> cho select
    const countryOptions = this.getCountries()
      .map((c) => `<option value="${c.name}">${c.name}</option>`)
      .join("");

    this.innerHTML = `
      <style>
        /* CẤU HÌNH KHU VỰC BUTTON BÊN NGOÀI */
        .auth-actions { display: flex; gap: 10px; align-items: center; margin-left: 10px; }
        .trigger-btn { background: none; border: none; cursor: pointer; font-family: "Google Sans", Roboto, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #5f6368; padding: 8px 16px; border-radius: 4px; transition: background 0.2s, color 0.2s; white-space: nowrap; }
        .trigger-btn:hover { background-color: #f1f3f4; color: #202124; }
        .trigger-btn.primary { background-color: #C98747; color: white; }
        .trigger-btn.primary:hover { background-color: #a36e3a; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }

        /* LỚP OVERLAY CHE MÀN HÌNH */
        .modal-overlay { 
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
          background-color: rgba(0, 0, 0, 0.6);
          z-index: 9999; 
          display: flex; justify-content: center; align-items: center;
          opacity: 0; visibility: hidden; transition: all 0.3s ease;
        }

        /* Khi mở modal */
        .modal-overlay.open { opacity: 1; visibility: visible; }

        /* KHUNG HỘP MODAL */
        .modal-box { 
          background: white; width: 400px; max-width: 90%; 
          border-radius: 8px; padding: 40px 30px 30px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          transform: translateY(-20px); 
          transition: transform 0.3s ease;
          display: flex; flex-direction: column;
          max-height: 90vh; overflow-y: auto;
          position: relative;
        }

        /* Animation khi modal hiển thị */
        .modal-overlay.open .modal-box { transform: translateY(0); }

        /* Nút đóng modal */
        .close-btn { 
          position: absolute; top: 10px; right: 15px;
          font-size: 28px; cursor: pointer;
          color: #5f6368;
          background: none; border: none;
        }
        .close-btn:hover { color: #202124; }

        /* Logo ở giữa modal */
        .modal-logo-wrapper { display: flex; justify-content: center; margin-bottom: 24px; }
        .modal-logo { width: 64px; object-fit: contain; }

        /* Tabs chuyển đổi Login / Register */
        .auth-tabs { display: flex; margin-bottom: 24px; border-bottom: 1px solid #dadce0; }
        .tab-btn { flex: 1; padding: 12px; background: none; border: none; font-size: 16px; font-weight: 500; color: #5f6368; cursor: pointer; text-align: center; position: relative; }
        .tab-btn.active { color: #C98747; }
        .tab-btn.active::after { 
          content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 3px; 
          background-color: #C98747; border-radius: 3px;
        }

        /* Form login / register */
        .auth-form { display: none; flex-direction: column; gap: 15px; }
        .auth-form.active { display: flex; animation: fadeIn 0.3s ease; }

        /* Animation mượt */
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

        /* Input + Label */
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 13px; font-weight: 500; color: #202124; }
        .form-group input, .form-group select {
          padding: 10px 12px; border: 1px solid #dadce0; border-radius: 4px;
          font-size: 14px; outline: none; transition: border 0.2s;
          background-color: white; 
        }
        .form-group input:focus, .form-group select:focus {
          border: 1px solid #C98747; box-shadow: 0 0 0 1px #C98747;
        }

        /* --- PHẦN ĐÃ SỬA --- */
        /* Nút Submit - Phiên bản chỉnh sửa */
        .submit-btn {
          background-color: #C98747;
          olor: white;
          padding: 10px 30px; /* Tăng padding ngang cho đẹp hơn */
          border: none;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 700; /* In đậm chữ hơn một chút cho rõ */
          cursor: pointer;
          /* CẤU HÌNH CĂN GIỮA */
          width: auto; /* 1. Để nút tự co giãn theo nội dung, không full 100% */
          min-width: 150px; /* Đảm bảo nút không quá bé */
          margin: 10px auto 0; /* 2. margin: auto giúp nút tự động ra giữa form */
          display: flex; /* Sử dụng flexbox để căn chữ bên trong */
          justify-content: center; /* Căn giữa ngang */
          align-items: center; /* Căn giữa dọc (khắc phục lỗi chữ bị lệch lên/xuống) */
          box-sizing: border-box; /* Đảm bảo padding không làm vỡ khung */
          }
        /* ------------------- */
        
        .submit-btn:hover { background-color: #a36e3a; }

        /* Text chuyển đổi giữa login/register */
        .switch-text { text-align: center; margin-top: 16px; font-size: 14px; color: #5f6368; }
        .switch-text span { color: #C98747; cursor: pointer; font-weight: 500; }
        .switch-text span:hover { text-decoration: underline; }

        /* Lỗi mật khẩu hoặc đăng nhập sai */
        .error-message { color: #d93025; font-size: 12px; display: none; }
      </style>

      <div class="auth-actions">
        <button class="trigger-btn" data-action="login">Đăng nhập</button>
        <button class="trigger-btn primary" data-action="register">Đăng ký</button>
      </div>

      <div class="modal-overlay" id="auth-overlay">
        <div class="modal-box">

          <button class="close-btn" id="close-modal">&times;</button>

          <div class="modal-logo-wrapper">
            <img src="/assets/images/logo.png" class="modal-logo" />
          </div>

          <div class="auth-tabs">
            <button class="tab-btn active" data-target="login-form">Đăng nhập</button>
            <button class="tab-btn" data-target="register-form">Đăng ký</button>
          </div>

          <form id="login-form" class="auth-form active">
            <div class="form-group">
              <label>Tên hiển thị (Username)</label>
              <input type="text" name="login_username" required />
            </div>

            <div class="form-group">
              <label>Mật khẩu</label>
              <input type="password" name="login_password" required />
            </div>

            <div class="error-message" id="login-error">Tên đăng nhập hoặc mật khẩu không đúng</div>

            <button type="submit" class="submit-btn">Đăng nhập</button>

            <div class="switch-text">Chưa có tài khoản? <span data-switch="register-form">Tạo tài khoản</span></div>
          </form>

          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label>Tên hiển thị (*)</label>
              <input type="text" name="username" required />
            </div>

            <div class="form-group">
              <label>Email (*)</label>
              <input type="email" name="email" required />
            </div>

            <div class="form-group">
              <label>Mật khẩu (*)</label>
              <input type="password" name="password" id="reg_password" required />
            </div>

            <div class="form-group">
              <label>Nhập lại mật khẩu (*)</label>
              <input type="password" name="confirm_password" id="reg_confirm_password" required />
              <div class="error-message" id="pass-error">Mật khẩu không khớp</div>
            </div>

            <div class="form-group">
              <label>Tên đầy đủ</label>
              <input type="text" name="fullname" required />
            </div>

            <div class="form-group">
              <label>Tuổi</label>
              <input type="number" name="age" min="1" max="120" required />
            </div>

            <div class="form-group">
              <label>Giới tính</label>
              <select name="gender" required>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <div class="form-group">
              <label>Quốc gia</label>
              <select name="location" required>
                <option value="" disabled selected>Chọn quốc gia</option>
                ${countryOptions}
              </select>
            </div>

            <button type="submit" class="submit-btn">Đăng ký</button>

            <div class="switch-text">Đã có tài khoản? <span data-switch="login-form">Đăng nhập</span></div>
          </form>

        </div>
      </div>
    `;
  }

  setupEvents() {
    // Lấy element quan trọng
    const overlay = this.querySelector("#auth-overlay");
    const closeBtn = this.querySelector("#close-modal");
    const tabBtns = this.querySelectorAll(".tab-btn");
    const forms = this.querySelectorAll(".auth-form");
    const switchLinks = this.querySelectorAll(".switch-text span");
    const loginTrigger = this.querySelector('button[data-action="login"]');
    const registerTrigger = this.querySelector('button[data-action="register"]');

    /* LOGIC CHUYỂN TAB LOGIN / REGISTER */
    const switchTab = (targetId) => {
      // Set active tab
      tabBtns.forEach(btn =>
        btn.classList.toggle("active", btn.dataset.target === targetId)
      );

      // Set active form
      forms.forEach(form =>
        form.classList.toggle("active", form.id === targetId)
      );

      // Ẩn các lỗi cũ
      this.querySelector("#pass-error").style.display = "none";
      this.querySelector("#login-error").style.display = "none";
    };

    /* HÀM MỞ MODAL */
    const openModal = (tabId) => {
      switchTab(tabId);
      overlay.classList.add("open");
    };

    /* HÀM ĐÓNG MODAL */
    const closeModal = () => overlay.classList.remove("open");


    /* GẮN EVENT CHO NÚT KÍCH HOẠT */
    loginTrigger?.addEventListener("click", () => openModal("login-form"));
    registerTrigger?.addEventListener("click", () => openModal("register-form"));

    /* ĐÓNG MODAL KHI NHẤN X */
    closeBtn.addEventListener("click", closeModal);

    /* ĐÓNG MODAL KHI NHẤN RA NGOÀI */
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal();
    });

    /* CHUYỂN TAB */
    tabBtns.forEach(btn =>
      btn.addEventListener("click", () => switchTab(btn.dataset.target))
    );
    switchLinks.forEach(link =>
      link.addEventListener("click", () => switchTab(link.dataset.switch))
    );


    /* XỬ LÝ FORM ĐĂNG KÝ
       Lưu user vào localStorage (giả lập database)*/
    const registerForm = this.querySelector("#register-form");

    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(registerForm);

      const password = fd.get("password");
      const confirmPass = fd.get("confirm_password");

      // Kiểm tra mật khẩu trùng khớp
      if (password !== confirmPass) {
        this.querySelector("#pass-error").style.display = "block";
        return;
      }

      // Object user mới
      const newUser = {
        username: fd.get("username").trim(),
        email: fd.get("email").trim(),
        password,
        fullName: fd.get("fullname").trim(),
        age: fd.get("age"),
        gender: fd.get("gender"),
        location: fd.get("location"), // Đã sửa: Lấy giá trị từ select
        language: "Tiếng Việt",
        theme: "Sáng",
      };

      // Lấy danh sách users từ localStorage
      let users = JSON.parse(localStorage.getItem("users_db") || "[]");

      // Check username tồn tại
      if (users.some(u => u.username === newUser.username)) {
        alert("Tên hiển thị này đã được sử dụng!");
        return;
      }

      // Lưu user
      users.push(newUser);
      localStorage.setItem("users_db", JSON.stringify(users));

      // Tự động đăng nhập luôn
      this.performLogin(newUser);

      alert("Đăng ký thành công!");
      closeModal();
    });


    /* XỬ LÝ FORM ĐĂNG NHẬP */
    const loginForm = this.querySelector("#login-form");

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const fd = new FormData(loginForm);
      const username = fd.get("login_username").trim();
      const password = fd.get("login_password");

      let users = JSON.parse(localStorage.getItem("users_db") || "[]");

      // Tìm user hợp lệ
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        this.performLogin(user);
        closeModal();
      } else {
        this.querySelector("#login-error").style.display = "block";
      }
    });
  }

  // Lưu user hiện tại + thông báo cho UI cập nhật
  performLogin(user) {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Header sẽ lắng nghe sự kiện này để tự cập nhật nút Đăng nhập -> Avatar
    window.dispatchEvent(new Event("auth-change"));
  }
}

customElements.define("auth-modal", AuthModal);