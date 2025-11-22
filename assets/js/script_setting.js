/* --- script_setting.js --- */

// --- HÀM UPDATE DỮ LIỆU NGƯỜI DÙNG (LƯU VÀO STORAGE) ---
function updateCurrentUser(key, value) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) return;

    currentUser[key] = value;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    let users = JSON.parse(localStorage.getItem('users_db') || '[]');
    const index = users.findIndex(u => u.username === currentUser.username);
    if (index !== -1) {
        users[index] = currentUser;
        localStorage.setItem('users_db', JSON.stringify(users));
    }
}

// --- HÀM XỬ LÝ SỰ KIỆN CHỈNH SỬA (EDIT) ---
async function handleEditClick(event) {
    const editButton = event.target.closest('.edit-btn');
    if (!editButton) return;
    event.stopPropagation();

    const itemContainer = editButton.closest('.seamless-item');
    const labelElement = itemContainer.querySelector('.label-text');
    const valueElement = itemContainer.querySelector('.value-text');

    const labelText = labelElement.textContent.replace(':', '').trim();
    let dataKey = '';
    if (labelText === 'Tên hiển thị') dataKey = 'username';
    if (labelText === 'Email') dataKey = 'email';
    if (labelText === 'Mật khẩu') dataKey = 'password';

    let currentValue = valueElement.textContent.trim();
    if (currentValue === '********') currentValue = '';

    const newValue = await showCustomPrompt(`Sửa ${labelText}:`, currentValue);

    if (newValue !== null && newValue.trim() !== '') {
        let displayValue = newValue.trim();

        if (dataKey === 'password') {
            valueElement.innerHTML = '********';
        } else {
            valueElement.innerHTML = displayValue;
        }

        updateCurrentUser(dataKey, displayValue);

        if (dataKey === 'username') {
            window.dispatchEvent(new Event('auth-change'));
        }
    }
}

// --- HÀM XỬ LÝ CHỌN GIỚI TÍNH ---
function handleGenderToggle(event) {
    const clickedButton = event.target.closest('.gender-btn');
    if (!clickedButton) return;

    const optionsContainer = clickedButton.closest('.gender-options');
    const buttons = optionsContainer.querySelectorAll('.gender-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    clickedButton.classList.add('active');

    const selectedGender = clickedButton.textContent.trim();
    updateCurrentUser('gender', selectedGender);
}

// --- HÀM XỬ LÝ XÓA TÀI KHOẢN ---
function handleDeleteAccount() {
    if (confirm("Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản này? Hành động này không thể hoàn tác.")) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        let users = JSON.parse(localStorage.getItem('users_db') || '[]');
        const newUsers = users.filter(u => u.username !== currentUser.username);
        localStorage.setItem('users_db', JSON.stringify(newUsers));

        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('selectedGender');
        localStorage.removeItem('theme'); // Xóa luôn theme đã cài

        window.dispatchEvent(new Event('auth-change'));
        alert("Tài khoản đã bị xóa.");
        window.location.href = "/index.html";
    }
}

// --- CUSTOM MODAL ---
let modalElement, modalInput, modalTitle;
function createModalElements() {
    const modalHtml = `
        <section id="custom-modal-overlay" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:1000;">
            <div id="custom-modal-box" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); background:white; padding:20px; border-radius:8px; box-shadow:0 5px 15px rgba(0,0,0,0.3); min-width:300px; max-width: 90%;">
                <h3 id="modal-title" style="margin-top:0; font-size:1.2em; font-weight: 600;"></h3>
                <input type="text" id="modal-input" style="width: calc(100% - 10px); padding:8px; margin-bottom:15px; border:1px solid #ccc; border-radius:4px;">
                <div style="text-align:right;">
                    <button id="modal-cancel" style="padding: 8px 12px; margin-right: 10px; background: #ddd; border: none; border-radius: 4px; cursor: pointer;">Hủy</button>
                    <button id="modal-ok" style="padding: 8px 12px; background: #01875f; color: white; border: none; border-radius: 4px; cursor: pointer;">OK</button>
                </div>
            </div>
        </section>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    modalElement = document.getElementById('custom-modal-overlay');
    modalInput = document.getElementById('modal-input');
    modalTitle = document.getElementById('modal-title');
}

async function showCustomPrompt(title, currentValue) {
    return new Promise(resolve => {
        modalTitle.textContent = title;
        modalInput.value = currentValue;
        modalElement.style.display = 'block';
        const okButton = document.getElementById('modal-ok');
        const cancelButton = document.getElementById('modal-cancel');
        const handleOk = () => { modalElement.style.display = 'none'; resolve(modalInput.value); cleanupListeners(); };
        const handleCancel = () => { modalElement.style.display = 'none'; resolve(null); cleanupListeners(); };
        okButton.addEventListener('click', handleOk);
        cancelButton.addEventListener('click', handleCancel);
        const cleanupListeners = () => { okButton.removeEventListener('click', handleOk); cancelButton.removeEventListener('click', handleCancel); };
    });
}

// --- HÀM CHÍNH DỰNG HTML TỪ LOCAL STORAGE ---
function loadSettingsFromStorage() {
    const container = document.getElementById("full-content-area");

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        container.innerHTML = `
            <div style="text-align:center; padding: 50px;">
                <p>Bạn chưa đăng nhập.</p>
                <p>Vui lòng đăng nhập để xem cài đặt.</p>
            </div>`;
        return;
    }

    const username = currentUser.username || "N/A";
    const email = currentUser.email || "N/A";
    const fullName = currentUser.fullName || "N/A";
    const currentGender = currentUser.gender || "Khác";
    const location = currentUser.location || "N/A";
    const language = currentUser.language || "Tiếng Việt";

    // Nhóm tuổi
    const ageValue = parseInt(currentUser.age, 10);
    let ageDisplay = "N/A";
    if (!isNaN(ageValue)) {
        if (ageValue < 13) ageDisplay = "Dưới 13 tuổi";
        else if (ageValue >= 13 && ageValue < 18) ageDisplay = "13+";
        else ageDisplay = "18+";
    }

    const emailDisplay = email.replace(/(.)(.+)(@)/, "$1****$3");

    // --- BUILD HTML ---
    let finalHtml = '';

    // 1. Tài khoản
    finalHtml += `<h2 class="section-title">Thông tin Tài khoản</h2>`;
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Tên hiển thị:</p>
            <p class="value-text">${username}</p>
            <button class="edit-btn">✎</button>
        </section>
        <section class="seamless-item">
            <p class="label-text">Email:</p>
            <p class="value-text">${emailDisplay}</p>
            <button class="edit-btn">✎</button>
        </section>
        <section class="seamless-item">
            <p class="label-text">Mật khẩu:</p>
            <p class="value-text">********</p>
            <button class="edit-btn">✎</button>
        </section>
    `;

    // 2. Thông tin Người dùng
    finalHtml += `<h2 class="section-title">Thông tin Người dùng</h2>`;
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Tên đầy đủ:</p>
            <p class="value-text">${fullName}</p>
        </section>
        <section class="seamless-item">
            <p class="label-text">Nhóm tuổi:</p>
            <p class="value-text">${ageDisplay}</p>
        </section>
    `;

    const isMaleActive = currentGender === "Nam" ? 'active' : '';
    const isFemaleActive = currentGender === "Nữ" ? 'active' : '';

    finalHtml += `
        <section class="seamless-item gender-select">
            <p class="label-text">Giới tính:</p>
            <p class="gender-options">
                <button class="gender-btn ${isMaleActive}">Nam</button>
                <button class="gender-btn ${isFemaleActive}">Nữ</button>
            </p>
        </section>
    `;

    const languageOptions = `
        <option value="Tiếng Việt" ${language === 'Tiếng Việt' ? 'selected' : ''}>Tiếng Việt</option>
        <option value="English" ${language === 'English' ? 'selected' : ''}>English</option>
    `;

    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Ngôn ngữ:</p>
            <select class="select-control" id="lang-select">${languageOptions}</select>
        </section>
        <section class="seamless-item">
            <p class="label-text">Quốc gia:</p>
            <p class="value-text">${location}</p>
        </section>
    `;

    // 3. Cài đặt giao diện
    finalHtml += `<h2 class="section-title">Cài đặt giao diện</h2>`;
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Chủ đề:</p>
            <select class="select-control" id="theme-select">
                <option value="Thường">Thường</option>
                <option value="Mùa">Mùa</option>
            </select>
        </section>
    `;

    // 4. Vùng nguy hiểm
    finalHtml += `<h2 class="section-title" style="color: #d93025; margin-top: 30px;">Vùng nguy hiểm</h2>`;
    finalHtml += `
        <section class="seamless-item" style="border-bottom: none;">
            <button id="delete-acc-btn" style="width: 100%; padding: 12px; background-color: #fff; color: #d93025; border: 1px solid #dadce0; border-radius: 8px; font-weight: 500; cursor: pointer;">
                Xóa tài khoản vĩnh viễn
            </button>
        </section>
    `;

    container.innerHTML = finalHtml;

    // --- GẮN SỰ KIỆN ---

    // Sự kiện Theme (Chủ đề) - ĐÃ SỬA LOGIC
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        let storedTheme = localStorage.getItem('theme');

        // Kiểm tra chặt chẽ: Nếu không phải 'Mùa', mặc định hết về 'Thường'
        if (storedTheme !== 'Mùa') {
            storedTheme = 'Thường';
        }

        // Gán giá trị cho select
        themeSelect.value = storedTheme;

        // Kích hoạt hiệu ứng nếu là 'Mùa'
        if (typeof applyThemeEffects === 'function') {
            applyThemeEffects(storedTheme);
        }

        themeSelect.addEventListener('change', (e) => {
            const newTheme = e.target.value;
            localStorage.setItem('theme', newTheme);

            if (typeof applyThemeEffects === 'function') {
                applyThemeEffects(newTheme);
            }
        });
    }

    const langSelect = document.getElementById('lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            updateCurrentUser('language', e.target.value);
        });
    }

    const deleteBtn = document.getElementById('delete-acc-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', handleDeleteAccount);
    }
}

// --- KHỞI TẠO ---
document.addEventListener('DOMContentLoaded', () => {
    createModalElements();
    document.addEventListener('click', handleGenderToggle);
    document.addEventListener('click', handleEditClick);

    loadSettingsFromStorage();
    window.addEventListener('auth-change', loadSettingsFromStorage);
});