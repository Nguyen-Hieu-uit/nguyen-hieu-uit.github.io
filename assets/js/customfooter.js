class CustomFooter extends HTMLElement {
  constructor() {
    super();

    // Thêm HTML trực tiếp vào component
    this.innerHTML = `
            <link rel="stylesheet" href="../assets/css/style.css">

            <footer class="footer">
      <div class="footer__divider"></div>
      <div class="footer__sections">
        <div>
          <section>
            <span class="footer__section-title">App Market</span>

            <div>
              <a
                href="#"
                class="footer__link"
              >
                <p class="footer__link-text">Thẻ App Market</p>
              </a>
            </div>

            <div>
              <a
                href="#"
                
                class="footer__link"
              >
                <p class="footer__link-text">Đổi phần thưởng</p>
              </a>
            </div>

            <div>
              <a
                href="#"
                
                class="footer__link"
              >
                <p class="footer__link-text">Chính sách hoàn tiền</p>
              </a>
            </div>
          </section>
        </div>

        <div>
          <section>
            <span class="footer__section-title">Trẻ em và gia đình</span>

            <div
              
            >
              <a
                href="#"
                
                class="footer__link"
              >
                <p class="footer__link-text">Hướng dẫn dành cho cha mẹ</p>
              </a>
            </div>

            <div">
              <a
                href="#"
                
                class="footer__link"
              >
                <p class="footer__link-text">Chia sẻ với gia đình</p>
              </a>
            </div>
          </section>
        </div>
      </div>

      <div class="footer__bottom-links">
        <div
          class="footer__bottom-item"
          
        >
          <a
            href="#"
           
            class="footer__link"
          >
            <p class="footer__bottom-item">Điều khoản dịch vụ</p>
          </a>
        </div>

        <div
          class="footer__bottom-item"
          
        >
          <a
            href="#"
            
            class="footer__link"
          >
            <p class="footer__bottom-item">Quyền riêng tư</p>
          </a>
        </div>

        <div
          class="footer__bottom-item"
          
        >
          <a
            href="#"
           
            
            class="footer__link"
          >
            <p class="footer__bottom-item">Giới thiệu về App Market</p>
          </a>
        </div>

        <div
          class="footer__bottom-item"
          
        >
          <a
            href="#"
          
            class="footer__link"
          >
            <p class="footer__bottom-item">Nhà phát triển</p>
          </a>
        </div>

        <div class="footer__bottom-item footer__locale">
          <div class="footer__locale-switcher">
            <div>Việt Nam (Tiếng Việt)</div>
          </div>
        </div>
      </div>
    </footer>
        `;
  }
}

customElements.define("custom-footer", CustomFooter);
