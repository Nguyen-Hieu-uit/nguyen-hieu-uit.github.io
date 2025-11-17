/* --- theme-manager.js (PHIÊN BẢN MỚI) --- */

// --- 1. CÁC BIẾN VÀ HÀM HIỆU ỨNG RƠI ---
// (Giữ nguyên các hàm cốt lõi)
let isSeasonEffectActive = false;
let particleContainer = null;

function getSeasonalEffect() {
    const now = new Date();
    const month = now.getMonth();
    if (month >= 2 && month <= 4) return { type: 'spring', image: 'petal.svg' };
    if (month >= 5 && month <= 7) return { type: 'summer', image: 'leaf.svg' };
    if (month >= 8 && month <= 10) return { type: 'autumn', image: 'autumn-leaf.svg' };
    if (month === 11 || month === 0 || month === 1) return { type: 'snow', image: 'snow.svg' };
    return { type: 'spring', image: 'petal.svg' };
}

function createParticleContainer() {
    if (document.getElementById('particle-container')) {
        particleContainer = document.getElementById('particle-container');
        return;
    }
    const container = document.createElement('div');
    container.id = 'particle-container';
    document.body.appendChild(container);
    particleContainer = container;
}

function createFallingEffect(imageSrc, particleType) {
    if (!particleContainer) createParticleContainer();
    const particle = document.createElement('section');
    particle.className = 'falling-particle';
    const size = Math.random() * 15 + 15;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundImage = `url('${imageSrc}')`;
    let x = Math.random() * window.innerWidth, y = -50, fallSpeed = Math.random() * 2 + 1;
    let angle = Math.random() * Math.PI * 2, rotateSpeed = Math.random() * 0.05;
    let swayAmount = 1.5, swaySpeed = Math.random() * 0.02 + 0.01;
    if (particleType === 'snow') { swayAmount = 0.5; rotateSpeed = 0; }
    if (particleType === 'autumn') { swayAmount = 2.0; }
    particleContainer.appendChild(particle);
    function animateParticle() {
        y += fallSpeed; angle += rotateSpeed;
        x += Math.sin(angle * swaySpeed) * swayAmount;
        let rotation = (particleType === 'snow') ? 0 : angle;
        particle.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}rad)`;
        if (y < window.innerHeight + 50 && isSeasonEffectActive) {
            requestAnimationFrame(animateParticle);
        } else {
            particle.remove();
            if (isSeasonEffectActive) createFallingEffect(imageSrc, particleType);
        }
    }
    if (isSeasonEffectActive) requestAnimationFrame(animateParticle);
}

function startSeasonalEffect() {
    if (isSeasonEffectActive) return;
    isSeasonEffectActive = true;
    createParticleContainer();
    const effect = getSeasonalEffect();
    const totalParticles = 20;
    if (!effect) return;
    for (let i = 0; i < totalParticles; i++) {
        setTimeout(() => {
            if (isSeasonEffectActive) createFallingEffect(effect.image, effect.type);
        }, Math.random() * 3000);
    }
}

function stopSeasonalEffect() {
    isSeasonEffectActive = false;
    const container = document.getElementById('particle-container');
    if (container) {
        container.innerHTML = '';
    }
}

// --- 2. CÁC HÀM HELPER (ĐỂ script_setting.js GỌI) ---
function applyThemeColors(theme) {
    document.body.className = (theme === 'Tối') ? 'dark-theme' : 'light-theme';
}

function applyThemeEffects(theme) {
    if (theme === 'Mùa') {
        startSeasonalEffect();
    } else {
        stopSeasonalEffect();
    }
}

// --- 3. LOGIC CHẠY KHI TẢI (CHO TẤT CẢ CÁC TRANG) ---
// (Áp dụng hiệu ứng nếu người dùng đã lưu 'Mùa' từ trước)
document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme') || 'Sáng';
    // Chỉ áp dụng hiệu ứng. 
    // Việc gắn listener sẽ do script_setting.js tự xử lý
    applyThemeEffects(currentTheme);
});