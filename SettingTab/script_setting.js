/* --- script_setting.js (ĐÃ CẬP NHẬT HOÀN CHỈNH) --- */

// --- HÀM XỬ LÝ SỰ KIỆN CHỈNH SỬA ---
async function handleEditClick(event) {
    const editButton = event.target.closest('.edit-btn');
    if (!editButton) return;

    event.stopPropagation();

    const itemContainer = editButton.closest('.seamless-item');
    if (!itemContainer) return;

    const labelElement = itemContainer.querySelector('.label-text');
    const valueElement = itemContainer.querySelector('.value-text');

    if (labelElement && valueElement) {
        const fieldName = labelElement.textContent.replace(':', '').trim();
        let currentValue = valueElement.textContent.trim();

        if (currentValue === '********') {
            currentValue = '';
        }

        // --- SỬ DỤNG CUSTOM PROMPT ---
        const newValue = await showCustomPrompt(`Sửa ${fieldName}:`, currentValue);
        // --- END CUSTOM PROMPT ---

        if (newValue !== null) {
            let updatedValue = newValue.trim();

            if (fieldName === 'Mật khẩu') {
                updatedValue = '********';
            }

            valueElement.innerHTML = updatedValue;
            console.log(`[Cập nhật UI] Trường "${fieldName}" đã được sửa thành: "${newValue.trim()}"`);
        }
    }
}

// --- HÀM XỬ LÝ CHỌN/BỎ CHỌN GIỚI TÍNH ---
function handleGenderToggle(event) {
    const clickedButton = event.target.closest('.gender-btn');
    if (!clickedButton) return;

    const optionsContainer = clickedButton.closest('.gender-options');
    const buttons = optionsContainer.querySelectorAll('.gender-btn');

    if (clickedButton.classList.contains('active')) {
        clickedButton.classList.remove('active');
    }
    else {
        buttons.forEach(btn => btn.classList.remove('active'));
        clickedButton.classList.add('active');
    }
}

// --- HÀM TẠO CẤU TRÚC MODAL ĐỘNG ---
let modalElement;
let modalInput;
let modalTitle;

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

        const handleOk = () => {
            modalElement.style.display = 'none';
            resolve(modalInput.value);
            cleanupListeners();
        };

        const handleCancel = () => {
            modalElement.style.display = 'none';
            resolve(null);
            cleanupListeners();
        };

        okButton.addEventListener('click', handleOk);
        cancelButton.addEventListener('click', handleCancel);

        const cleanupListeners = () => {
            okButton.removeEventListener('click', handleOk);
            cancelButton.removeEventListener('click', handleCancel);
        };
    });
}


// --- HÀM CHÍNH DỰNG HTML ---
function loadAllSettings(data) {
    const container = document.getElementById("full-content-area");

    if (!data || !data.User || data.User.length === 0) {
        container.innerHTML = `<p style="color: red;">Không có dữ liệu người dùng.</p>`;
        return;
    }

    const user = data.User[0];

    const username = user.Username || "N/A";
    const email = user.Email || "N/A";
    const fullName = user.FullName || "N/A";
    const gender = user.Gender || "N/A";
    const location = user.Location || "N/A";
    const language = user.Languague || "Tiếng Việt";

    const rawAge = user.Age;
    const ageValue = parseInt(rawAge, 10);
    let ageGroup;

    if (isNaN(ageValue)) {
        ageGroup = "N/A";
    } else if (ageValue < 13) {
        ageGroup = "Dưới 13 tuổi";
    } else if (ageValue >= 13 && ageValue < 18) {
        ageGroup = "13+";
    } else if (ageValue >= 18 && ageValue < 25) {
        ageGroup = "18+";
    } else {
        ageGroup = "25+";
    }

    const emailDisplay = email.replace(/(.)(.+)(@)/, "$1****$3");

    // --- BẮT ĐẦU XÂY DỰNG HTML ---
    let finalHtml = '';

    // --- Part 1: Thông tin Tài khoản ---
    finalHtml += `<h2 class="section-title">Thông tin Tài khoản</h2>`;

    // Tên hiển thị (Username)
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Tên hiển thị:</p>
            <p class="value-text">${username}</p>
            <button class="edit-btn">✎</button>
        </section>
    `;
    // Email
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Email:</p>
            <p class="value-text">${emailDisplay}</p>
            <button class="edit-btn">✎</button>
        </section>
    `;
    // Mật khẩu
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Mật khẩu:</p>
            <p class="value-text">********</p>
            <button class="edit-btn">✎</button>
        </section>
    `;

    // --- Part 2: Thông tin Người dùng (Gộp Cá nhân) ---
    finalHtml += `<h2 class="section-title">Thông tin Người dùng</h2>`;

    // Tên đầy đủ
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Tên đầy đủ:</p>
            <p class="value-text">${fullName}</p>
        </section>
    `;
    // Nhóm tuổi
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Nhóm tuổi:</p>
            <p class="value-text">${ageGroup}</p>
        </section>
    `;

    // Giới tính
    const isMaleActive = gender === "Nam" ? 'active' : '';
    const isFemaleActive = gender === "Nữ" ? 'active' : '';
    finalHtml += `
        <section class="seamless-item gender-select">
            <p class="label-text">Giới tính:</p>
            <p class="gender-options">
                <button class="gender-btn ${isMaleActive}">Nam</button>
                <button class="gender-btn ${isFemaleActive}">Nữ</button>
            </p>
        </section>
    `;
    // Ngôn ngữ
    const languageOptions = `
        <option value="Vietnamese" ${language === 'Tiếng Việt' ? 'selected' : ''}>Tiếng Việt</option>
        <option value="English" ${language === 'English' ? 'selected' : ''}>English</option>
    `;
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Ngôn ngữ:</p>
            <select class="select-control">${languageOptions}</select>
        </section>
    `;

    // Vị trí Tài khoản
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Quốc gia:</p>
            <p class="value-text">${location}</p>
        </section>
    `;

    // --- Part 3: Cài đặt Giao diện (Hardcoded Defaults) ---
    finalHtml += `<h2 class="section-title">Cài đặt giao diện</h2>`;

    // Màu sắc chủ đề (Select)
    finalHtml += `
        <section class="seamless-item">
            <p class="label-text">Màu sắc Chủ đề:</p>
            <select class="select-control" id="theme-select">
                <option>Sáng</option>
                <option>Tối</option>
                <option>Mùa</option>
            </select>
        </section>
    `;

    // Gắn HTML vào DOM
    container.innerHTML = finalHtml;

    // =======================================================
    // !! BẮT ĐẦU LOGIC SỬA LỖI (THÊM MỚI) !!
    // Gắn listener cho <select> chủ đề NGAY SAU KHI tạo ra nó
    // =======================================================
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {

        // 1. Đặt giá trị <select> cho đúng
        const currentTheme = localStorage.getItem('theme') || 'Sáng';
        themeSelect.value = currentTheme;

        // 2. Gắn listener 'change'
        themeSelect.addEventListener('change', (e) => {
            const newTheme = e.target.value;
            localStorage.setItem('theme', newTheme);

            // Gọi các hàm global từ file 'theme-manager.js'
            // (File này phải được tải TRƯỚC file 'script_setting.js')
            if (typeof applyThemeColors === 'function') {
                applyThemeColors(newTheme);
            }
            if (typeof applyThemeEffects === 'function') {
                applyThemeEffects(newTheme);
            }
        });
    }
    // =======================================================
    // !! KẾT THÚC LOGIC SỬA LỖI !!
    // =======================================================
}

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    // 0. Tạo cấu trúc Modal trước
    createModalElements();

    // 1. Thêm listener cho chức năng bật/tắt giới tính
    document.addEventListener('click', handleGenderToggle);

    // 2. Thêm listener cho chức năng chỉnh sửa
    document.addEventListener('click', handleEditClick);

    // 3. Giả sử bạn lấy được username của người đã đăng nhập
    const currentUsername = 'CGS3010';

    // 4. Tải dữ liệu và hiển thị UI (dùng username động)
    fetch(`http://localhost:3000/api/user/${currentUsername}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Dòng này sẽ gọi hàm loadAllSettings đã được cập nhật ở trên
            loadAllSettings(data);
        })
        .catch(error => {
            console.error("Lỗi khi gọi API:", error);
            document.getElementById("full-content-area").innerHTML = `<p style="color: red;">Không thể tải dữ liệu từ server.</p>`;
        });
});