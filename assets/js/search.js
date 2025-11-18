// Hàm tải dữ liệu từ file JSON và hiển thị kết quả tìm kiếm
function loadAppData() {
  const jsonFilePath = "/assets/json/appData.json";

  fetch(jsonFilePath)
    .then((response) => {
      // Bước 1: Kiểm tra xem việc tải file có thành công (status 200) không
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Bước 2: Phân tích cú pháp (parse) dữ liệu JSON
      return response.json();
    })
    .then((data) => {
      displayResults(data);
    })
    .catch((error) => {
      // Bắt lỗi nếu file không tồn tại hoặc lỗi mạng
      console.error("Lỗi khi tải hoặc xử lý JSON:", error);
    });
}
// Hàm lấy tham số truy vấn 'q' từ URL
function getSearchQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  // Lấy giá trị của tham số 'q' và decode nó (nếu có ký tự đặc biệt)
  return urlParams.get("q") ? decodeURIComponent(urlParams.get("q")) : "";
}

// Hàm lọc và sắp xếp kết quả (Logic giống như trên trang gợi ý)
function getSortedResults(query, allApps) {
  if (!query) return [];
  const lowerQuery = query.toLowerCase();

  let startsWith = [];
  let contains = [];

  allApps.forEach((app) => {
    const lowerKeyword = app.name.toLowerCase();

    if (lowerKeyword.startsWith(lowerQuery)) {
      startsWith.push(app);
    } else if (lowerKeyword.includes(lowerQuery)) {
      contains.push(app);
    }
  });

  // Kết hợp và ưu tiên kết quả bắt đầu bằng từ khóa
  return startsWith.concat(contains);
}

// Hàm hiển thị kết quả trên trang
function displayResults(allApps) {
  const query = getSearchQuery();
  const resultsListFeatured = document.getElementById("results-list-featured");
  const resultsListPlain = document.getElementById("results-list-plain");
  const queryDisplay = document.getElementById("query-display");
  const resultCountDisplay = document.getElementById("result-count-display");
  const noResults = document.getElementById("no-results");

  // 1. Hiển thị từ khóa đã tìm
  queryDisplay.textContent = query || "Không có từ khóa";

  if (!query) {
    resultsListFeatured.innerHTML = "";
    resultsListPlain.innerHTML = "";
    noResults.style.display = "block";
    resultCountDisplay.textContent = "Vui lòng nhập từ khóa tìm kiếm.";
    return;
  }

  // 2. Lấy kết quả đã sắp xếp
  const sortedResults = getSortedResults(query, allApps);
  const resultCount = sortedResults.length;

  // 3. Xử lý hiển thị
  if (resultCount > 0) {
    noResults.style.display = "none";

    // --- XỬ LÝ ỨNG DỤNG ĐẦU TIÊN (FEATURED) ---
    // Xóa nội dung cũ
    resultsListFeatured.innerHTML = "";
    resultsListPlain.innerHTML = "";

    // Featured
    const featuredApp = sortedResults[0];
    const featuredItem = createResultItem(featuredApp, query, true);
    resultsListFeatured.appendChild(featuredItem);

    // Các kết quả thường
    sortedResults.slice(1).forEach((app) => {
      const item = createResultItem(app, query, false);
      resultsListPlain.appendChild(item);
    });

    resultCountDisplay.textContent = `Tìm thấy ${resultCount} kết quả.`;
  } else {
    // Xử lý khi không có kết quả
    // ... (phần code này giữ nguyên)
    resultsListFeatured.innerHTML = "";
    resultsListPlain.innerHTML = "";
    resultCountDisplay.textContent = "Tìm thấy 0 kết quả.";
    noResults.style.display = "block";
  }
}

// --- HÀM HỖ TRỢ: TẠO THẺ KẾT QUẢ ---
function createResultItem(app, query, isFeatured) {
  const item = document.createElement("a");

  // Đường dẫn chi tiết app (tạm thời fix cứng Candy Crush)
  item.href = "/html/candy-crush-saga.html";

  // Gán class khác nhau dựa trên tham số isFeatured
  if (isFeatured) {
    item.classList.add("result-item-featured");
  } else {
    item.classList.add("result-item");
  }

  const appName = app.name;

  const inlineRating = `
    <div class="rating-inline">
      <span class="rating-inline__value">${app.rating}</span>
      <svg
        class="rating-display__star"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path
          d="M480 -940 L375 -640 L60 -620 L300 -420 L210 -100 L480 -280 L750 -100 L660 -420 L900 -620 L585 -640 Z"
        ></path>
      </svg>
    </div>
  `;

  // Nội dung đơn giản (Bạn có thể thêm logo, rating, v.v. ở đây)
  const trailerSection = app.trailerHtml
    ? `<div class="trailer-display">${app.trailerHtml}</div>`
    : "";

  item.innerHTML = `
    <div class="app-overview">
      <div class="app-appearance">
        <img src="${app.logoUrl}" alt="${appName} Logo" class="app-icon" />
        <div>
          <div class="app-name">${appName}</div>
          <div class="app-identity__meta">
            <div class="publisher-display">${app.publisher}</div>
            ${!isFeatured ? inlineRating : ""}
            <div class="cost-type-display">${app.costType}</div>
          </div>
        </div>
      </div>
      <div class="app-identity__stats-bar">
        <div class="app-identity-stats-bar__content">
          <img src="${app.logoUrl}" alt="${appName} Logo" class="app-icon" />
          <div class="app__stats-bar__item">
            <div class="stat-item__value">
              ${app.rating}
              <svg
                class="rating-display__star"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
              >
                <path
                  d="M480 -940 L375 -640 L60 -620 L300 -420 L210 -100 L480 -280 L750 -100 L660 -420 L900 -620 L585 -640 Z"
                ></path>
              </svg>
            </div>
            <div class="stat-item__label">46,9 N bài đánh giá</div>
          </div>
          <div class="app__stats-bar__item">
            <div class="stat-item__value">${app.downloads}</div>
            <div class="stat-item__label">Lượt tải xuống</div>
          </div>
          <div class="app__stats-bar__item">
            <div class="stat-item__value">
              <!-- sẽ lấy từ json sau -->
              <img
                src="https://play-lh.googleusercontent.com/EbEX3AN4FC4pu3lsElAHCiksluOVU8OgkgtWC43-wmm_aHVq2D65FmEM97bPexilUAvlAY5_4ARH8Tb3RxQ=w96-h32-rw"
                srcset="
                  https://play-lh.googleusercontent.com/EbEX3AN4FC4pu3lsElAHCiksluOVU8OgkgtWC43-wmm_aHVq2D65FmEM97bPexilUAvlAY5_4ARH8Tb3RxQ=w192-h64-rw 2x
                "
                class="img-contain__age-limit-icon"
              />
            </div>
            <div class="stat-item__label">3 tuổi trở lên</div>
          </div>
        </div>
      </div>
      ${
        isFeatured
          ? `<div class="app-actions">
        <div class="app-actions__install-wrapper">
          <div class="install-button-wrapper">
            <div class="install-component-wrapper">
              <div class="flex-container layout-col-to-row">
                <div>
                  <div class="button-wrapper">
                    <div class="button__touch-wrapper">
                      <button
                        class="button button--theme-green button--contained button--typography button--padding-x-large focus-visible button--shape-rounded button--text-light button--sizing-responsive button--primary width-full-to-auto"
                      >
                        <div class="ripple--bounded"></div>
                        <div class="button__focus-ring"></div>
                        <div class="button__touch-target"></div>
                        <span class="button__label">Cài đặt</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`
          : ""
      }
    </div>
    ${trailerSection}
    `;

  return item;
}
// Chạy hàm khi trang được tải
window.onload = loadAppData;
