const availableKeywords = [];
// Thêm các từ khóa khác vào đây

document.addEventListener("DOMContentLoaded", () => {
  (function loadKeywords() {
    const jsonFilePath = "./assets/json/appData.json";
    fetch(jsonFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          data.forEach((app) => {
            if (app && typeof app.name === "string") {
              availableKeywords.push(app.name);
            }
          });
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải appData.json:", error);
      });
  })();

  const inputElement = document.getElementById("search-input");
  const clearButton = document.getElementById("clear-button");
  const searchButton = document.getElementById("search-button");
  const suggestionsBox = document.getElementById("suggestions-box");

  if (!inputElement || !clearButton || !searchButton || !suggestionsBox) {
    return;
  }

  inputElement.addEventListener("input", () => {
    const inputValue = inputElement.value.toLowerCase();

    suggestionsBox.innerHTML = ""; // Xóa các đề xuất cũ

    if (inputValue.length > 0) {
      // Ẩn/hiện nút xóa và ảnh nền

      clearButton.style.display = "inline";

      suggestionsBox.style.display = "block";

      inputElement.style.backgroundImage = "none";

      // --- Bắt đầu Logic Hiển thị Suggestion Item ---

      // 1. Lọc danh sách từ khóa khớp

      let startsWith = []; // Nhóm 1: Từ khóa BẮT ĐẦU bằng ký tự nhập

      let contains = []; // Nhóm 2: Từ khóa CHỨA ký tự nhập (nhưng không bắt đầu)

      // 1. Phân loại từ khóa

      availableKeywords.forEach((keyword) => {
        const lowerCaseKeyword = keyword.toLowerCase();

        if (lowerCaseKeyword.startsWith(inputValue)) {
          // Ví dụ: Nhập "g" -> "Genshin Impact" vào đây

          startsWith.push(keyword);
        } else if (lowerCaseKeyword.includes(inputValue)) {
          // Ví dụ: Nhập "a" -> "Candy Crush Saga" (vì "a" nằm giữa) vào đây

          contains.push(keyword);
        }
      });

      // 2. Kết hợp và Sắp xếp: Ưu tiên nhóm startsWith

      // Sử dụng slice() để sao chép mảng trước khi nối

      const sortedKeywords = startsWith.concat(contains);

      // 2. Tạo và hiển thị tối đa 5 mục đề xuất đầu tiên

      sortedKeywords.slice(0, 5).forEach((keyword) => {
        const item = document.createElement("div");

        item.classList.add("suggestion-item");

        // Highlight phần text khớp (Tùy chọn)

        const highlightedText = keyword.replace(
          new RegExp(inputValue, "gi"),

          (match) => `<b>${match}</b>`
        );

        item.innerHTML = highlightedText;

        // 3. Xử lý khi người dùng nhấp vào mục đề xuất

        item.addEventListener("click", function () {
          inputElement.value = keyword; // Điền từ khóa vào ô input

          suggestionsBox.innerHTML = ""; // Xóa hộp đề xuất

          clearButton.style.display = "inline"; // Hiển thị nút xóa sau khi chọn

          inputElement.style.backgroundImage = "none"; // Ẩn kính lúp

          inputElement.focus();
        });

        suggestionsBox.appendChild(item);
      });
    } else {
      // Ẩn nút xóa và khôi phục ảnh nền khi rỗng

      clearButton.style.display = "none";

      inputElement.style.backgroundImage = "";

      suggestionsBox.style.display = "none";
    }
  });

  // Xử lý khi click vào nút xóa

  clearButton.addEventListener("click", () => {
    inputElement.value = "";

    clearButton.style.display = "none";

    inputElement.style.backgroundImage = "";

    suggestionsBox.innerHTML = ""; // Xóa luôn hộp đề xuất khi clear

    inputElement.focus();
  });

  // Ẩn hộp đề xuất khi click ra ngoài

  document.addEventListener("click", function (e) {
    const clickOutsideSuggestions =
      !suggestionsBox.contains(e.target) && e.target !== inputElement;

    if (clickOutsideSuggestions) {
      suggestionsBox.innerHTML = "";
      suggestionsBox.style.display = "none";

      // Trên màn hình nhỏ (< 950px), nếu click ngoài vùng search__box thì
      // ẩn clear button và khôi phục icon kính lúp (backgroundImage)
      if (window.innerWidth < 950) {
        clearButton.style.display = "none";
        inputElement.style.backgroundImage = "";
      }
    }
  });

  // Handle search button click

  suggestionsBox.addEventListener("click", () => {
    const query = inputElement.value.trim();

    if (query) {
      const encodedQuery = encodeURIComponent(query);

      // Tạo URL đích và chuyển trang

      window.location.assign(`/html/search.html?q=${encodedQuery}`);
    }
  });

  // Optional: Handle Enter key press in the input field to trigger search

  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      suggestionsBox.click();
    }
  });
});
