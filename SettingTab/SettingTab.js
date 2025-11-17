// Chạy code khi trang đã tải xong
document.addEventListener('DOMContentLoaded', function () {

    // Lấy nút bấm và menu thả xuống bằng ID
    const avatarButton = document.getElementById('avatar-button');
    const dropdownMenu = document.getElementById('profile-dropdown-menu');

    // Chỉ chạy nếu cả hai phần tử tồn tại
    if (avatarButton && dropdownMenu) {

        // 1. Thêm sự kiện 'click' cho nút avatar
        avatarButton.addEventListener('click', function (event) {
            event.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // 2. Thêm sự kiện 'click' cho toàn bộ cửa sổ
        window.addEventListener('click', function (event) {
            if (!dropdownMenu.contains(event.target) && !avatarButton.contains(event.target)) {
                dropdownMenu.classList.remove('show');
            }
        });
    }
});