import sqlite3
import json

print("Đang tiến hành import...")

# 1. KẾT NỐI DATABASE (Tự động tạo file 'user_data.db' nếu chưa có)
con = sqlite3.connect('mydatabase.db')
cur = con.cursor()

# 2. TẠO BẢNG [User]
# (Dùng dấu ngoặc vuông [User] vì 'User' là một từ khóa trong SQL)
# Chúng ta sẽ lưu Age là INTEGER (số nguyên)
cur.execute('''
    CREATE TABLE IF NOT EXISTS [User] (
        Username TEXT PRIMARY KEY,
        Email TEXT UNIQUE,
        Password TEXT,
        FullName TEXT,
        Age INTEGER,
        Gender TEXT,
        Location TEXT
    )
''')
print("Đã chuẩn bị xong Table [User].")

# 3. ĐỌC FILE JSON
# (Dùng encoding='utf-8' để đọc tiếng Việt)
with open('data_setting.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    
    # Lấy danh sách user từ key "User"
    user_list = data['User']

# 4. DUYỆT QUA DANH SÁCH VÀ INSERT VÀO DATABASE
count = 0
for user in user_list:
    try:
        # Lấy từng giá trị
        username = user['Username']
        email = user['Email']
        password = user['Password'] # Xem cảnh báo bảo mật bên dưới
        full_name = user['FullName']
        age = int(user['Age']) # Chuyển chuỗi "20" thành số 20
        gender = user['Gender']
        location = user['Location']
        
        # Dùng "INSERT OR IGNORE" để bỏ qua nếu Username đã tồn tại
        cur.execute("""
            INSERT OR IGNORE INTO [User] 
            (Username, Email, Password, FullName, Age, Gender, Location) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (username, email, password, full_name, age, gender, location))
        
        count += 1
        
    except Exception as e:
        print(f"Lỗi khi import user {user.get('Username')}: {e}")

# 5. LƯU THAY ĐỔI (COMMIT) VÀ ĐÓNG KẾT NỐI
con.commit()
print(f"\nĐã import thành công {count} user.")
print("--- Đang kiểm tra dữ liệu trong DB ---")

# 6. KIỂM TRA LẠI DỮ LIỆU TRONG DATABASE
res = cur.execute("SELECT * FROM [User]")
print(res.fetchall())

con.close()