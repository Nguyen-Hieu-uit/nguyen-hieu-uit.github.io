class CustomFooter extends HTMLElement {
    constructor() {
        super();

        // Thêm HTML trực tiếp vào component
        this.innerHTML = `
            <link rel="stylesheet" href="../assets/css/style.css">

            <footer class="footer">
                <div class="footer__divider"></div>
                <div class="footer__sections">

                    <div ssk="11:Google Play">
                        <section>
                            <span class="footer__section-title">Google Play</span>

                            <div ssk="22:/store/pass/getstarted">
                                <a href="/store/pass/getstarted" target="_blank" jslog="197536; 1:3121|qgIF0gECEAE=; track:click;" class="footer__link">
                                    <p class="footer__link-text">Play Pass</p>
                                </a>
                            </div>

                            <div ssk="20:/store/points/enroll">
                                <a href="/store/points/enroll" target="_blank" jslog="197536; 1:3121|qgIF0gECEAI=; track:click;" class="footer__link">
                                    <p class="footer__link-text">Điểm Play</p>
                                </a>
                            </div>

                            <div ssk="39:https://play.google.com/about/giftcards">
                                <a href="https://play.google.com/about/giftcards" target="_blank" jslog="197536; 1:3121|qgIF0gECEAM=; track:click;" class="footer__link">
                                    <p class="footer__link-text">Thẻ Google Play</p>
                                </a>
                            </div>

                            <div ssk="7:/redeem">
                                <a href="/redeem" target="_blank" jslog="197536; 1:3121|qgIF0gECEAQ=; track:click;" class="footer__link">
                                    <p class="footer__link-text">Đổi phần thưởng</p>
                                </a>
                            </div>

                            <div ssk="51:https://support.google.com/googleplay/answer/134336">
                                <a href="https://support.google.com/googleplay/answer/134336" target="_blank" jslog="197536; 1:3121|qgIF0gECEAU=; track:click;" class="footer__link">
                                    <p class="footer__link-text">Chính sách hoàn tiền</p>
                                </a>
                            </div>
                        </section>
                    </div>

                    <div ssk="18:Trẻ em và gia đình">
                        <section>
                            <span class="footer__section-title">Trẻ em và gia đình</span>

                            <div ssk="55:https://support.google.com/googleplay?p=pff_parentguide">
                                <a href="https://support.google.com/googleplay?p=pff_parentguide" target="_blank" jslog="197536; 1:3121|qgIF0gECEAc=; track:click;" class="footer__link">
                                    <p class="footer__link-text">Hướng dẫn dành cho cha mẹ</p>
                                </a>
                            </div>

                            <div ssk="52:https://support.google.com/googleplay/answer/7007852">
                                <a href="https://support.google.com/googleplay/answer/7007852" target="_blank" jslog="197536; 1:3121|qgIF0gECEAg=; track:click;" class="footer__link">
                                    <p class="footer__link-text">Chia sẻ với gia đình</p>
                                </a>
                            </div>
                        </section>
                    </div>

                </div>

                <div class="footer__bottom-links">

                    <div class="footer__bottom-item" ssk="56:https://play.google.com/intl/vi_vn/about/play-terms.html">
                        <a href="https://play.google.com/intl/vi_vn/about/play-terms.html" target="_blank" jslog="197536; 1:3121; track:click;" class="footer__link">
                            <p class="footer__bottom-item">Điều khoản dịch vụ</p>
                        </a>
                    </div>

                    <div class="footer__bottom-item" ssk="35:https://policies.google.com/privacy">
                        <a href="https://policies.google.com/privacy" target="_blank" jslog="197536; 1:3121; track:click;" class="footer__link">
                            <p class="footer__bottom-item">Quyền riêng tư</p>
                        </a>
                    </div>

                    <div class="footer__bottom-item" ssk="51:https://support.google.com/googleplay/?p=about_play">
                        <a href="https://support.google.com/googleplay/?p=about_play" target="_blank" jslog="197536; 1:3121; track:click;" class="footer__link">
                            <p class="footer__bottom-item">Giới thiệu về Google Play</p>
                        </a>
                    </div>

                    <div class="footer__bottom-item" ssk="39:http://developer.android.com/index.html">
                        <a href="http://developer.android.com/index.html" target="_blank" jslog="197536; 1:3121; track:click;" class="footer__link">
                            <p class="footer__bottom-item">Nhà phát triển</p>
                        </a>
                    </div>

                    <div class="footer__bottom-item" ssk="43:https://store.google.com/?playredirect=true">
                        <a href="https://store.google.com/?playredirect=true" target="_blank" jslog="197536; 1:3121; track:click;" class="footer__link">
                            <p class="footer__bottom-item">Google Store</p>
                        </a>
                    </div>

                    <div class="footer__bottom-item footer__locale">
                        <div class="footer__locale-switcher">
                            <div class="yVZQTb">Việt Nam (Tiếng Việt)</div>
                        </div>
                    </div>

                </div>
            </footer>
        `;
    }
}

customElements.define('custom-footer', CustomFooter);
