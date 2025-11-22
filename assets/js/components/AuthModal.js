class AuthModal extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.setupEvents();
  }

  render() {
    this.innerHTML = `
      <style>
        /* CSS giữ nguyên như cũ, chỉ thêm css cho select */
        .auth-actions { display: flex; gap: 10px; align-items: center; margin-left: 10px; }
        .trigger-btn { background: none; border: none; cursor: pointer; font-family: "Google Sans", Roboto, Arial, sans-serif; font-size: 14px; font-weight: 500; color: #5f6368; padding: 8px 16px; border-radius: 4px; transition: background 0.2s, color 0.2s; white-space: nowrap; }
        .trigger-btn:hover { background-color: #f1f3f4; color: #202124; }
        .trigger-btn.primary { background-color: #C98747; color: white; }
        .trigger-btn.primary:hover { background-color: #a36e3a; box-shadow: 0 1px 3px rgba(0,0,0,0.3); }
        .modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); z-index: 9999; display: flex; justify-content: center; align-items: center; opacity: 0; visibility: hidden; transition: all 0.3s ease; }
        .modal-overlay.open { opacity: 1; visibility: visible; }
        .modal-box { background: white; width: 400px; max-width: 90%; border-radius: 8px; padding: 40px 30px 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.15); transform: translateY(-20px); transition: transform 0.3s ease; position: relative; font-family: 'Roboto', sans-serif; display: flex; flex-direction: column; max-height: 90vh; overflow-y: auto; }
        .modal-overlay.open .modal-box { transform: translateY(0); }
        .close-btn { position: absolute; top: 10px; right: 15px; font-size: 28px; cursor: pointer; color: #5f6368; background: none; border: none; line-height: 1; z-index: 2; }
        .close-btn:hover { color: #202124; }
        .modal-logo-wrapper { display: flex; justify-content: center; margin-bottom: 24px; }
        .modal-logo { width: 64px; height: auto; object-fit: contain; }
        .auth-tabs { display: flex; margin-bottom: 24px; border-bottom: 1px solid #dadce0; }
        .tab-btn { flex: 1; padding: 12px; background: none; border: none; font-size: 16px; font-weight: 500; color: #5f6368; cursor: pointer; position: relative; font-family: "Google Sans", Roboto, Arial, sans-serif; }
        .tab-btn:hover { color: #202124; background-color: #f8f9fa; }
        .tab-btn.active { color: #C98747; }
        .tab-btn.active::after { content: ''; position: absolute; bottom: -1px; left: 0; width: 100%; height: 3px; background-color: #C98747; border-top-left-radius: 3px; border-top-right-radius: 3px; }
        .auth-form { display: none; flex-direction: column; gap: 15px; }
        .auth-form.active { display: flex; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-group label { font-size: 13px; font-weight: 500; color: #202124; }
        .form-group input, .form-group select { padding: 10px 12px; border: 1px solid #dadce0; border-radius: 4px; font-size: 14px; outline: none; transition: border 0.2s; font-family: inherit; }
        .form-group input:focus, .form-group select:focus { border: 1px solid #C98747; box-shadow: 0 0 0 1px #C98747; }
        .submit-btn { background-color: #C98747; color: white; padding: 10px 24px; border: none; border-radius: 4px; font-size: 14px; font-weight: 500; cursor: pointer; margin-top: 8px; transition: background 0.2s; font-family: "Google Sans", Roboto, Arial, sans-serif; }
        .submit-btn:hover { background-color: #a36e3a; box-shadow: 0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15); }
        .switch-text { text-align: center; margin-top: 16px; font-size: 14px; color: #5f6368; }
        .switch-text span { color: #C98747; cursor: pointer; font-weight: 500; }
        .switch-text span:hover { text-decoration: underline; }
        .error-message { color: #d93025; font-size: 12px; margin-top: -5px; display: none; }
      </style>

      <div class="auth-actions">
        <button class="trigger-btn" data-action="login">Đăng nhập</button>
        <button class="trigger-btn primary" data-action="register">Đăng ký</button>
      </div>

      <div class="modal-overlay" id="auth-overlay">
        <div class="modal-box">
          <button class="close-btn" id="close-modal">&times;</button>
          
          <div class="modal-logo-wrapper">
            <img src="/assets/images/logo.png" alt="App Market Logo" class="modal-logo" />
          </div>

          <div class="auth-tabs">
            <button class="tab-btn active" data-target="login-form">Đăng nhập</button>
            <button class="tab-btn" data-target="register-form">Đăng ký</button>
          </div>

          <form id="login-form" class="auth-form active">
            <div class="form-group">
              <label>Tên hiển thị (Username)</label>
              <input type="text" name="login_username" placeholder="Nhập tên hiển thị" required />
            </div>
            <div class="form-group">
              <label>Mật khẩu</label>
              <input type="password" name="login_password" placeholder="Nhập mật khẩu" required />
            </div>
            <div class="error-message" id="login-error">Tên đăng nhập hoặc mật khẩu không đúng</div>
            <button type="submit" class="submit-btn">Đăng nhập</button>
            <div class="switch-text">
              Chưa có tài khoản? <span data-switch="register-form">Tạo tài khoản</span>
            </div>
          </form>

          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label>Tên hiển thị (*)</label>
              <input type="text" name="username" placeholder="Dùng để đăng nhập" required />
            </div>
            <div class="form-group">
              <label>Email (*)</label>
              <input type="email" name="email" placeholder="example@email.com" required />
            </div>
            <div class="form-group">
              <label>Mật khẩu (*)</label>
              <input type="password" name="password" id="reg_password" placeholder="Tối thiểu 6 ký tự" required />
            </div>
            <div class="form-group">
              <label>Nhập lại mật khẩu (*)</label>
              <input type="password" name="confirm_password" id="reg_confirm_password" placeholder="Xác nhận mật khẩu" required />
              <div class="error-message" id="pass-error">Mật khẩu không khớp</div>
            </div>
            <div class="form-group">
              <label>Tên đầy đủ</label>
              <input type="text" name="fullname" placeholder="Họ và tên" required />
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
              <input type="text" name="location" placeholder="Vietnam" required />
            </div>

            <button type="submit" class="submit-btn">Đăng ký</button>
            <div class="switch-text">
              Đã có tài khoản? <span data-switch="login-form">Đăng nhập</span>
            </div>
          </form>

        </div>
      </div>
    `;
  }

  setupEvents() {
    const overlay = this.querySelector('#auth-overlay');
    const closeBtn = this.querySelector('#close-modal');
    const tabBtns = this.querySelectorAll('.tab-btn');
    const forms = this.querySelectorAll('.auth-form');
    const switchLinks = this.querySelectorAll('.switch-text span');
    const loginTrigger = this.querySelector('button[data-action="login"]');
    const registerTrigger = this.querySelector('button[data-action="register"]');

    // Switch Tab Logic
    const switchTab = (targetId) => {
      tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.target === targetId));
      forms.forEach(form => form.classList.toggle('active', form.id === targetId));
      // Reset errors
      this.querySelector('#pass-error').style.display = 'none';
      this.querySelector('#login-error').style.display = 'none';
    };

    const openModal = (tabId) => { switchTab(tabId); overlay.classList.add('open'); };
    const closeModal = () => overlay.classList.remove('open');

    if (loginTrigger) loginTrigger.addEventListener('click', () => openModal('login-form'));
    if (registerTrigger) registerTrigger.addEventListener('click', () => openModal('register-form'));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });

    tabBtns.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));
    switchLinks.forEach(link => link.addEventListener('click', () => switchTab(link.dataset.switch)));

    // --- XỬ LÝ ĐĂNG KÝ ---
    const registerForm = this.querySelector('#register-form');
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(registerForm);
      const password = fd.get('password');
      const confirmPass = fd.get('confirm_password');

      // 1. Kiểm tra mật khẩu trùng khớp
      if (password !== confirmPass) {
        this.querySelector('#pass-error').style.display = 'block';
        return;
      }

      // 2. Tạo object user mới
      const newUser = {
        username: fd.get('username').trim(),
        email: fd.get('email').trim(),
        password: password,
        fullName: fd.get('fullname').trim(),
        age: fd.get('age'),
        gender: fd.get('gender'),
        location: fd.get('location').trim(),
        language: "Tiếng Việt", // Mặc định
        theme: "Sáng" // Mặc định
      };

      // 3. Lưu vào danh sách users trong localStorage (Giả lập DB)
      let users = JSON.parse(localStorage.getItem('users_db') || '[]');

      // Check xem username tồn tại chưa
      const exists = users.find(u => u.username === newUser.username);
      if (exists) {
        alert('Tên hiển thị này đã được sử dụng!');
        return;
      }

      users.push(newUser);
      localStorage.setItem('users_db', JSON.stringify(users));

      // 4. Tự động đăng nhập luôn sau khi đăng ký
      this.performLogin(newUser);

      alert('Đăng ký thành công!');
      closeModal();
    });

    // --- XỬ LÝ ĐĂNG NHẬP ---
    const loginForm = this.querySelector('#login-form');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const username = fd.get('login_username').trim();
      const password = fd.get('login_password');

      // 1. Lấy danh sách user từ localStorage
      let users = JSON.parse(localStorage.getItem('users_db') || '[]');

      // 2. Tìm user khớp thông tin
      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        this.performLogin(user);
        closeModal();
      } else {
        this.querySelector('#login-error').style.display = 'block';
      }
    });
  }

  performLogin(user) {
    // Lưu thông tin user hiện tại vào localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user)); // Lưu toàn bộ thông tin user để trang setting dùng

    // Phát sự kiện để header cập nhật UI
    window.dispatchEvent(new Event('auth-change'));
  }
}

customElements.define('auth-modal', AuthModal);