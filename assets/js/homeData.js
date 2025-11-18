// Data for home page dynamic sections (ranking + featured games)

// Bảng xếp hạng (ranking)
const rankingItems = [
  {
    rank: 1,
    name: "Teamfight Tactics",
    category: "Chiến thuật",
    rating: 4.1,
    icon: "https://play-lh.googleusercontent.com/LML01HqsS5NiQ9GDoNxaFMUQndr3osVA2LoVWck58hC9Vxe15GrmbUc2QhwlFOJlfGaR=s96-rw",
  },
  {
    rank: 2,
    name: "Block Blast!",
    category: "Giải đố • Xếp hình • Phổ thông",
    rating: 4.6,
    icon: "https://play-lh.googleusercontent.com/R0qgNDYYHbRhw6JFsdEbDMqONplEvJx0m0W9wzYVvY3eNF1c2rfBWYjQxW0sLEzFe1E=s64-rw",
  },
  {
    rank: 3,
    name: "Nghịch Thủy Hàn",
    category: "Nhập vai",
    rating: 4.5,
    icon: "https://play-lh.googleusercontent.com/TYNTOTufkgDXPlRZ44NxBfd2sCAfXB4qkIooR1jTiCwrJG0lMvJvJI8PAXUrYZDbKw=s64-rw",
  },
  {
    rank: 4,
    name: "Roblox VN",
    category: "Mô phỏng • Phổ thông",
    rating: 3.8,
    icon: "https://play-lh.googleusercontent.com/hkJ5oNiCo6LkLt0HuFk7S8uInQqqnDxAKmFfYURb8qYiY9aYzWoHb4ob3JE_TkUPs1M=s64-rw",
  },
  {
    rank: 5,
    name: "Chiến Tuyến Hướng Dương",
    category: "Phổ thông",
    rating: 4.6,
    icon: "https://play-lh.googleusercontent.com/esn4ChQLU0wnGiVcQ64-RfgcKYN3wvpNqRRuNgik25Z2-H9Rv9G_nayig6krd1GookqEyQxHq0RIaSHExe5W9BU=s64-rw",
  },
];

// Hàng "Lựa chọn của biên tập viên" (Editor Picks)
const editorPicksRow = [
  {
    // Banner
    bannerHref: "#",
    badgeText: "Lựa chọn của biên tập viên",
    title: "Thống trị chiến trường đầy biến động",
    subtitle: "Nhận thưởng trong sự kiện mới nhất",
    bannerImg:
      "https://play-lh.googleusercontent.com/b5yM2SZSenVV--tnu17T3Fk9m-myhsXjMuimZ_qXISqgLvzknSk3KB28cAGKP7wsKEgLRozaaqyY=w648-h364-rw",
    bannerBg: "rgba(158, 154, 234, 1)",

    // App info
    appHref: "/store/apps/details?id=com.hhgame.mlbbvn",
    appIcon:
      "https://play-lh.googleusercontent.com/t1qYs5Ern-dXiip7tUxlNbZQSTWm1wEeWe2-S5ViiIzgg3ccqcYGM0i-KhJ_zVIwd4bk3qqdhGBmy4ZN8nW8=s64-rw",
    appName: "Mobile Legends: Bang Bang FT",
    appDev: "Công ty cổ phần phát triển công nghệ số Hồng Hà",
    appAgeIcon:
      "https://play-lh.googleusercontent.com/yQChfa9XKlaXMIYTk8w8QwChjT8_SH-_2d2SS-kesw0TLQK1nxtw54bDcoZ09freZJgKrtg4f__is-31Vg=s16-rw",
    appAgeAlt: "Mức phân loại nội dung 12 tuổi trở lên",

    buttonLabel: "Cài đặt",
    buttonAria: "Cài đặt",
    purchaseNote: "Mua trong ứng dụng",
  },
  {
    bannerHref:
      "/store/apps/editorial?id=mc_games_liveops_editorialmd_candycrushsaga_musicseason_fcp",
    badgeText: "Lựa chọn của biên tập viên",
    title: "Bùng nổ nhịp điệu trong Mùa âm nhạc sôi động của Candy",
    subtitle: "Phá màn chơi, rinh quà cực đã",
    bannerImg:
      "https://play-lh.googleusercontent.com/-MVbayJyVS3JOF42R_boToANiZzLnEGtSuhVx7TmF10tjl5lt-PZR15w2kHTIYnYDxmVIB7HWg=w648-h364-rw",
    bannerBg: "rgba(229, 101, 251, 1)",

    appHref: "/store/apps/details?id=com.king.candycrushsaga",
    appIcon:
      "https://play-lh.googleusercontent.com/5rXW4qrknrqyM_rS8sMf9XchD-Pj4_oGthcVtu9zx7yl7_dOEPH_xpuD6nNg0yk7TyM=s64-rw",
    appName: "Candy Crush Saga",
    appDev: "King",
    appAgeIcon:
      "https://play-lh.googleusercontent.com/EbEX3AN4FC4pu3lsElAHCiksluOVU8OgkgtWC43-wmm_aHVq2D65FmEM97bPexilUAvlAY5_4ARH8Tb3RxQ=s16-rw",
    appAgeAlt: "Mức phân loại nội dung 3 tuổi trở lên",

    buttonLabel: "Cài đặt trên thiết bị khác",
    buttonAria: "Cài đặt trên thiết bị khác",
    purchaseNote: "Mua trong ứng dụng",
  },
  {
    bannerHref:
      "/store/apps/editorial?id=mc_games_liveops_editorialmd_junesjourney_wicked_fcp",
    badgeText: "Lựa chọn của biên tập viên",
    title: "Khám phá bí mật xứ Oz trong cuộc phiêu lưu mới của June",
    subtitle: "",
    bannerImg:
      "https://play-lh.googleusercontent.com/VOyZXy2necdypGut5qDzX_Yq7QuDyMNd0M06bq89wAJ6HfuNvxKcKAeSJ5eVPLWzum2ZuQblhKBx=w648-h364-rw",
    bannerBg: "rgba(33, 104, 51, 1)",

    appHref:
      "/store/apps/details?id=net.wooga.junes_journey_hidden_object_mystery_game",
    appIcon:
      "https://play-lh.googleusercontent.com/xgHxGP9kb43Mc_OMU8oZzhb2eDrKrW_ipbV2Pd_1VxsPx6oUhn1A9OTI_RcIvT-dwAMH6hwdvfoNNIMBI2tsxg=s64-rw",
    appName: "June's Journey: Wicked Mystery",
    appDev: "Wooga",
    appAgeIcon:
      "https://play-lh.googleusercontent.com/yQChfa9XKlaXMIYTk8w8QwChjT8_SH-_2d2SS-kesw0TLQK1nxtw54bDcoZ09freZJgKrtg4f__is-31Vg=s16-rw",
    appAgeAlt: "Mức phân loại nội dung 12 tuổi trở lên",

    buttonLabel: "Cài đặt",
    buttonAria: "Cài đặt",
    purchaseNote: "Mua trong ứng dụng",
  },
];

// Hàng game "Google Play Games on PC"
const pcGamesRow = [
  {
    name: "Hades' Star",
    categoryMain: "Chiến thuật",
    categoryExtra: "4X",
    rating: 4.4,
    thumb: "https://i.ytimg.com/vi/QGD-WEqo_bQ/hqdefault.jpg",
    icon: "https://play-lh.googleusercontent.com/_VRSZ4h_Dcadat9mQAC33JhgL3UC1T5eCykBIOAVyPhfD_RhnNK6fXP9_6N09C8YQHg=s64-rw",
    href: "./candy-crush-saga.html",
  },
  {
    name: "Real Flight Simulator",
    categoryMain: "Chiến thuật",
    categoryExtra: "4X",
    rating: 4.4,
    thumb:
      "https://play-lh.googleusercontent.com/iiu_Iyy7PA2C8yzyTghBcbmilKKvAk5NABtEhgyiqvkkdSPBr_3WVFu5nH007rvZnr2a=w1052-h592-rw",
    icon: "https://play-lh.googleusercontent.com/kwlIDGuHPCwW6YVpmfEELagMBuwFYYdYczT_ueJxu-5YX6A5YlQclOnKsgV-ShlSBg=s48-rw",
    href: "/html/real-flight-simulator.html",
  },
  {
    name: "Hades' Star",
    categoryMain: "Chiến thuật",
    categoryExtra: "4X",
    rating: 4.4,
    thumb: "https://i.ytimg.com/vi/QGD-WEqo_bQ/hqdefault.jpg",
    icon: "https://play-lh.googleusercontent.com/_VRSZ4h_Dcadat9mQAC33JhgL3UC1T5eCykBIOAVyPhfD_RhnNK6fXP9_6N09C8YQHg=s64-rw",
    href: "./candy-crush-saga.html",
  },
  {
    name: "Hades' Star",
    categoryMain: "Chiến thuật",
    categoryExtra: "4X",
    rating: 4.4,
    thumb: "https://i.ytimg.com/vi/QGD-WEqo_bQ/hqdefault.jpg",
    icon: "https://play-lh.googleusercontent.com/_VRSZ4h_Dcadat9mQAC33JhgL3UC1T5eCykBIOAVyPhfD_RhnNK6fXP9_6N09C8YQHg=s64-rw",
    href: "./candy-crush-saga.html",
  },
];

// 1 hàng game nổi bật (featured games row)
const featuredGames = [
  {
    name: "Hades' Star",
    category: "Chiến thuật • 4X",
    rating: 4.4,
    thumb: "https://i.ytimg.com/vi/QGD-WEqo_bQ/hqdefault.jpg",
    icon: "https://play-lh.googleusercontent.com/_VRSZ4h_Dcadat9mQAC33JhgL3UC1T5eCykBIOAVyPhfD_RhnNK6fXP9_6N09C8YQHg=s64-rw",
    href: "./candy-crush-saga.html",
  },
  {
    name: "Another Strategy Game",
    category: "Chiến thuật",
    rating: 4.2,
    thumb: "https://i.ytimg.com/vi/QGD-WEqo_bQ/hqdefault.jpg",
    icon: "https://play-lh.googleusercontent.com/_VRSZ4h_Dcadat9mQAC33JhgL3UC1T5eCykBIOAVyPhfD_RhnNK6fXP9_6N09C8YQHg=s64-rw",
    href: "./candy-crush-saga.html",
  },
  {
    name: "Space Adventure",
    category: "Phiêu lưu",
    rating: 4.3,
    thumb: "https://i.ytimg.com/vi/QGD-WEqo_bQ/hqdefault.jpg",
    icon: "https://play-lh.googleusercontent.com/_VRSZ4h_Dcadat9mQAC33JhgL3UC1T5eCykBIOAVyPhfD_RhnNK6fXP9_6N09C8YQHg=s64-rw",
    href: "./candy-crush-saga.html",
  },
  {
    name: "Casual Puzzle",
    category: "Giải đố",
    rating: 4.0,
    thumb: "https://i.ytimg.com/vi/QGD-WEqo_bQ/hqdefault.jpg",
    icon: "https://play-lh.googleusercontent.com/_VRSZ4h_Dcadat9mQAC33JhgL3UC1T5eCykBIOAVyPhfD_RhnNK6fXP9_6N09C8YQHg=s64-rw",
    href: "./candy-crush-saga.html",
  },
];
