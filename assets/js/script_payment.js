let paymentData = {};

// HÀM ĐÃ ĐƯỢC CẬP NHẬT: Xử lý hiển thị 4 số cuối
function createPaymentMethodHtml(method) {
    // Lấy 4 ký tự cuối cùng từ chuỗi full_digits
    const lastFourDigits = method.full_digits.slice(-4);

    return `
        <div class="method-item">
            <div class="method-info">
                <img src="${method.icon}" alt="${method.type} icon" class="method-icon">
                <p class="method-title">${method.name}: **** ${lastFourDigits}</p>
            </div>
            
        </div>
    `;
}

// 2. Hàm tạo HTML cho Gói thuê bao (GIỮ NGUYÊN)
function createSubscriptionHtml(sub) {
    return `
        <div class="sub-item">
            <p class="sub-title">${sub.name}</p>
            <p class="sub-detail">Trạng thái: <span>${sub.status}</span></p>
            <p class="sub-detail">Giá: ${sub.price}</p>
            <p class="sub-detail">Gia hạn: ${sub.renewal_date}</p>
        </div>
    `;
}

// 3. Hàm tạo Bảng Lịch sử Giao dịch (GIỮ NGUYÊN)
function createHistoryTable(history) {
    let tableHTML = `
        <h2 class="section-title">Lịch sử giao dịch</h2>
        <table class="history-table">
            <thead>
                <tr>
                    <th>NGÀY</th>
                    <th>MÔ TẢ</th>
                    <th>SỐ TIỀN</th>
                    <th>TRẠNG THÁI</th>
                </tr>
            </thead>
            <tbody>
    `;

    history.forEach(item => {
        tableHTML += `
            <tr>
                <td>${item.date}</td>
                <td>${item.description}</td>
                <td class="amount">${item.amount}</td>
                <td>${item.status}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;
    return tableHTML;
}

// 4. Hàm hiển thị nội dung chính (GIỮ NGUYÊN)
function renderContent(type) {
    const container = document.getElementById("payment-container");
    container.innerHTML = '';
    const listToDisplay = paymentData[type] || [];

    if (listToDisplay.length === 0) {
        container.innerHTML = `<p class="no-data">Không có dữ liệu nào trong ${type}.</p>`;
        return;
    }

    if (type === 'history') {
        container.innerHTML = createHistoryTable(listToDisplay);
        return;
    }

    const ulList = document.createElement("ul");
    ulList.className = "payment-list-ul";

    listToDisplay.forEach(item => {
        const liItem = document.createElement("li");
        liItem.className = "payment-item";

        if (type === 'payment_methods') {
            liItem.innerHTML = createPaymentMethodHtml(item);
        } else if (type === 'subscriptions') {
            liItem.innerHTML = createSubscriptionHtml(item);
        }

        ulList.appendChild(liItem);
    });

    container.appendChild(ulList);

    if (type === 'payment_methods') {
        container.innerHTML += `
            <div class="actions">
                <a href="#" class="action-link"><i class="fa-solid fa-plus"></i> Thêm phương thức thanh toán</a>
                <a href="#" class="action-link"><i class="fa-solid fa-pencil"></i> Chỉnh sửa phương thức thanh toán</a>
            </div>
        `;
    }
}

// 5. Hàm xử lý chuyển tab (GIỮ NGUYÊN)
function handleTabSwitch(event) {
    const button = event.target;
    if (!button.classList.contains('tab-button')) return;

    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');

    const contentType = button.getAttribute('data-content-type');
    renderContent(contentType);
}

// 6. Load data và thiết lập listener (GIỮ NGUYÊN)
document.addEventListener('DOMContentLoaded', () => {
    fetch("/assets/json/data_payment.json")
        .then(response => response.json())
        .then(data => {
            paymentData = data;

            const tabsContainer = document.querySelector('.tabs');
            if (tabsContainer) {
                tabsContainer.addEventListener('click', handleTabSwitch);
            }

            renderContent('payment_methods');
        })
        .catch(error => console.error("Lỗi load data:", error));
});