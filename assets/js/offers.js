// Static offer data for the Offers page
const offersData = [
  {
    id: "offer-1",
    title: "Giảm 20% game chiến thuật hot",
    description:
      "Tiết kiệm khi mua các tựa game chiến thuật yêu thích trong tuần này.",
    badge: "Ưu đãi nổi bật",
    image:
      "https://cdn2.unrealengine.com/egs-fortnite-sidekicks-carousel-desktop-1920x1080-ab679c4d991d.jpg?resize=1&w=854&h=480&quality=medium",
    link: "./index.html#pc-games-row",
    discountPercent: "-20%",
    priceOld: "899.000 ₫",
    priceNew: "719.200 ₫",
    expiresText: "Kết thúc sau 3 ngày",
  },
  {
    id: "offer-2",
    title: "Combo game phiêu lưu siêu tiết kiệm",
    description:
      "Mua 2 tặng 1 cho các game phiêu lưu được chọn trên App Market.",
    badge: "Combo",
    image:
      "https://cdn2.unrealengine.com/egs-anno-117-pax-romana-carousel-desktop-1920x1080-38235212f6fb.jpg?resize=1&w=854&h=480&quality=medium",
    link: "./index.html#featured-games-row",
    discountPercent: "Mua 2 tặng 1",
    priceOld: "1.200.000 ₫",
    priceNew: "800.000 ₫",
    expiresText: "Chỉ trong cuối tuần này",
  },
  {
    id: "offer-3",
    title: "Ưu đãi cho game thủ mới",
    description: "Người dùng mới nhận voucher 50.000 ₫ cho đơn hàng đầu tiên.",
    badge: "Người dùng mới",
    image: "https://placehold.co/854x480/0F9D58/FFFFFF?text=Welcome+Offer",
    link: "./register.html",
    discountPercent: "-50.000 ₫",
    priceOld: "",
    priceNew: "Áp dụng tự động khi thanh toán",
    expiresText: "Áp dụng trong 7 ngày sau khi đăng ký",
  },
];

function createOfferCard(offer) {
  const card = document.createElement("article");
  card.className = "offer-card";
  card.innerHTML = `
    <a href="${offer.link}" class="offer-card__link">
      <div class="offer-card__image-wrapper">
        <img
          src="${offer.image}"
          alt="${offer.title}"
          class="offer-card__image"
        />
        ${
          offer.badge
            ? `<span class="offer-card__badge">${offer.badge}</span>`
            : ""
        }
      </div>
      <div class="offer-card__body">
        <h2 class="offer-card__title">${offer.title}</h2>
        <p class="offer-card__description">${offer.description}</p>
        ${
          offer.discountPercent
            ? `<p class="offer-card__discount">${offer.discountPercent}</p>`
            : ""
        }
        ${
          offer.expiresText
            ? `<p class="offer-card__expires">${offer.expiresText}</p>`
            : ""
        }
      </div>
    </a>
  `;

  return card;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("offers-list-container");
  if (!container) return;

  if (!Array.isArray(offersData) || offersData.length === 0) return;

  offersData.forEach((offer) => {
    container.appendChild(createOfferCard(offer));
  });
});
