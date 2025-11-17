// ... require, app, port, cors ...
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// ... kết nối database ...
const db = new sqlite3.Database('./mydatabase.db', /* ... */);

// --- THAY ĐỔI Ở ĐÂY ---
// Thay vì /api/user/CGS3010
// Chúng ta dùng /api/user/:username
app.get('/api/user/:username', (req, res) => {

    // 1. Lấy username từ URL mà frontend đã gửi
    const username = req.params.username;
    console.log(`Nhận được yêu cầu cho user: ${username}`);

    const sql = "SELECT * FROM [User] WHERE Username = ?";

    // 2. Dùng biến 'username' để truy vấn
    db.get(sql, [username], (err, row) => {
        if (err) {
            console.error("LỖI TRUY VẤN DATABASE:", err.message);
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Không tìm thấy user" });
        }

        // Định dạng lại dữ liệu cho hàm loadAllSettings
        const formattedData = {
            User: [row]
        };
        res.json(formattedData);
    });
});
// --- KẾT THÚC THAY ĐỔI ---

app.listen(port, () => {
    console.log(`API Server đang lắng nghe tại http://localhost:${port}`);
});