let libraryData = {}; // Biến toàn cục để lưu trữ dữ liệu JSON

// HÀM QUAN TRỌNG: Cập nhật dữ liệu khi người dùng tương tác
function toggleVisibility(index, isVisible) {
    if (libraryData && libraryData.devices && libraryData.devices[index]) {
        // Cập nhật giá trị boolean trong bộ nhớ
        libraryData.devices[index].visibility = isVisible;

        // Hiển thị thông báo trong console (trong ứng dụng thực tế, sẽ lưu vào DB)
        console.log(`Trạng thái hiển thị của thiết bị '${libraryData.devices[index].name}' đã được cập nhật thành: ${isVisible}.`);
    }
}

// Hàm chung để tạo HTML cho một mục (ứng dụng/trò chơi/yêu thích)
function createItemHtml(item) {
    return `
        <img src="${item.icon}" alt="icon">
        <div>
            <p class="app-text-title">${item.title}</p>
            <p class="app-text-dev">${item.developer}</p>
        </div>
    `;
}

// Hàm tạo bảng thiết bị
function createDeviceTable(devices) {
    let tableHTML = `
        <h2 class="section-title">Các thiết bị của bạn</h2>
        <table class="devices-table">
            <thead>
                <tr>
                    <th>BIỆT HIỆU</th>
                    <th>HIỆN TRONG TRÌNH ĐƠN</th>
                    <th>NHÀ SẢN XUẤT</th>
                    <th>KIỂU MÁY</th>
                    <th>NHÀ MẠNG</th>
                    <th>LẦN SỬ DỤNG GẦN NHẤT</th>
                    <th>ĐÃ ĐĂNG KÝ VÀO</th>
                </tr>
            </thead>
            <tbody>
    `;

    devices.forEach((device, index) => {
        const deviceId = `device-${index}`;
        const isChecked = device.visibility ? 'checked' : '';

        tableHTML += `
            <tr>
                <td class="device-name">${device.name}</td>
                
                <td class="device-visibility toggle-cell">
                    <input type="checkbox" 
                           id="${deviceId}-toggle" 
                           ${isChecked} 
                           onchange="toggleVisibility(${index}, this.checked)">
                    <label for="${deviceId}-toggle" class="custom-checkbox"></label>
                </td>

                <td>${device.manufacturer}</td>
                <td>${device.model}</td>
                <td>${device.carrier}</td>
                <td>${device.lastUsed}</td>
                <td>${device.registered}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;
    return tableHTML;
}

// 1. Hàm hiển thị danh sách/bảng
function renderList(type) {
    const container = document.getElementById("list-container");
    container.innerHTML = '';

    const listToDisplay = libraryData[type] || [];

    if (type === 'devices') {
        container.innerHTML = createDeviceTable(listToDisplay);
    } else {
        if (listToDisplay.length === 0) {
            const title = type === 'apps' ? 'Ứng dụng' : type === 'games' ? 'Trò chơi' : 'Danh sách yêu thích';
            container.innerHTML = `<p class="no-data">Không có mục nào trong ${title}.</p>`;
            return;
        }

        const ulList = document.createElement("ul");
        ulList.className = "app-list-ul";

        listToDisplay.forEach(item => {
            const liItem = document.createElement("li");
            liItem.className = "app-item";
            liItem.innerHTML = createItemHtml(item);
            ulList.appendChild(liItem);
        });
        container.appendChild(ulList);
    }
}

// 2. Hàm xử lý chuyển tab
function handleTabSwitch(event) {
    const button = event.target;
    if (!button.classList.contains('tab-button')) return;

    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');

    const contentType = button.getAttribute('data-content-type');
    renderList(contentType);
}

// 3. Load data và thiết lập listener khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    fetch("data_library.json")
        .then(response => response.json())
        .then(data => {
            libraryData = data;

            // Chỉ thêm listener nếu các tab đã có sẵn trong DOM
            const tabsContainer = document.querySelector('.tabs');
            if (tabsContainer) {
                tabsContainer.addEventListener('click', handleTabSwitch);
            }

            renderList('apps'); // Hiển thị tab mặc định
        })
        .catch(error => console.error("Lỗi load data:", error));
});