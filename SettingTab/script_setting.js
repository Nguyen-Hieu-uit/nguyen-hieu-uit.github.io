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

        // **ĐÃ LOẠI BỎ logic xử lý thẻ "Đã xác minh" khỏi giá trị hiện tại**
        if (currentValue === '********') {
            currentValue = '';
        }

        // --- SỬ DỤNG CUSTOM PROMPT ---
        const newValue = await showCustomPrompt(`Sửa ${fieldName}:`, currentValue);
        // --- END CUSTOM PROMPT ---

        if (newValue !== null) {
            let updatedValue = newValue.trim();

            // **ĐÃ LOẠI BỎ logic thêm lại thẻ "Đã xác minh" sau khi sửa**
            if (fieldName === 'Mật khẩu') {
                updatedValue = '********';
            }

            valueElement.innerHTML = updatedValue;
            console.log(`[Cập nhật UI] Trường "${fieldName}" đã được sửa thành: "${newValue.trim()}"`);
        }
    }
}

// --- HÀM XỬ LÝ CHỌN/BỎ CHỌN GIỚI TÍNH (GIỮ NGUYÊN) ---
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

// --- HÀM TẠO CẤU TRÚC MODAL ĐỘNG (GIỮ NGUYÊN) ---
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


// --- HÀM CHÍNH DỰNG HTML (ĐÃ SỬA EMAIL) ---
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
    // Email (ĐÃ XÓA SPAN "Đã xác minh")
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
    // Nhóm tuổi (SỬ DỤNG GIÁ TRỊ ĐÃ SUY LUẬN)
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
            <select class="select-control">
                <option>Sáng</option>
                <option>Tối</option>
                <option>Mùa</option>
            </select>
        </section>
    `;

    container.innerHTML = finalHtml;
}

// Khởi tạo ứng dụng
document.addEventListener('DOMContentLoaded', () => {
    // 0. Tạo cấu trúc Modal trước
    createModalElements();

    // 1. Thêm listener cho chức năng bật/tắt giới tính
    document.addEventListener('click', handleGenderToggle);

    // 2. Thêm listener cho chức năng chỉnh sửa
    document.addEventListener('click', handleEditClick);

    // 3. Tải dữ liệu và hiển thị UI
    fetch("data_setting.json")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            loadAllSettings(data);
        })
        .catch(error => {
            console.error("Lỗi khi tải dữ liệu cài đặt:", error);
            document.getElementById("full-content-area").innerHTML = `<p style="color: red;">Không thể tải dữ liệu cài đặt. Vui lòng kiểm tra file data_setting.json.</p>`;
        });
});

// --- HIỆU ỨNG LÁ RỤNG ---
function createFallingLeaf() {
    const leaf = document.createElement('section');
    leaf.className = 'falling-leaf';

    // Kích thước ngẫu nhiên
    const size = Math.random() * 15 + 15; // 15px -> 30px
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;

    // Vị trí xuất hiện ban đầu
    let x = Math.random() * window.innerWidth;
    let y = -50;
    let sway = Math.random() * 60 - 30; // Biên độ lắc
    let swaySpeed = Math.random() * 0.02 + 0.01; // Tốc độ lắc
    let fallSpeed = Math.random() * 2 + 1; // Tốc độ rơi
    let angle = Math.random() * Math.PI * 2; // Góc ban đầu
    let rotateSpeed = Math.random() * 0.05; // Tốc độ xoay

    document.body.appendChild(leaf);

    function animateLeaf() {
        y += fallSpeed;
        angle += rotateSpeed;
        x += Math.sin(angle * swaySpeed) * 1.5; // Lắc qua trái phải
        leaf.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;

        if (y < window.innerHeight + 50) {
            requestAnimationFrame(animateLeaf);
        } else {
            leaf.remove(); // Khi ra ngoài màn hình thì xóa
            createFallingLeaf(); // Tạo lá mới liên tục
        }
    }

    requestAnimationFrame(animateLeaf);
}

// Khởi động hiệu ứng
function startLeafEffect() {
    const totalLeaves = 20; // Số lượng lá cùng lúc
    for (let i = 0; i < totalLeaves; i++) {
        setTimeout(createFallingLeaf, Math.random() * 3000); // Tạo lá ngẫu nhiên
    }
}

// Bắt đầu sau khi DOM load
document.addEventListener('DOMContentLoaded', () => {
    startLeafEffect();
});

