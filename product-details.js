import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzILt4x3T9zwlLdXAMUn1jzjEPSIWybg0",
    authDomain: "nilevo-production.firebaseapp.com",
    projectId: "nilevo-production",
    storageBucket: "nilevo-production.firebasestorage.app",
    messagingSenderId: "185264790897",
    appId: "1:185264790897:web:851bf66f2cf11d9609ead0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const translations = {
    en: {
        descriptionTitle: "Description",
        usesTitle: "Uses",
        buyNowBtn: "Buy Now",
        backToProducts: "Back to Products",
        currency: "EGP",
        reviews: "reviews",
        loginToBuy: "Please login to purchase",
        loginBtn: "Login",
        voucherPlaceholder: "Have a voucher? Enter code",
        voucherApply: "Apply",
        voucherValid: "✅ Voucher applied!",
        voucherInvalid: "❌ Invalid or expired code",
        voucherChecking: "Checking...",
        originalPrice: "Original:",
        discountedPrice: "After discount:",
    },
    ar: {
        descriptionTitle: "الوصف",
        usesTitle: "الاستخدامات",
        buyNowBtn: "اشتر الآن",
        backToProducts: "عودة للمنتجات",
        currency: "ج.م",
        reviews: "مراجعات",
        loginToBuy: "يرجى تسجيل الدخول للشراء",
        loginBtn: "تسجيل الدخول",
        voucherPlaceholder: "عندك قسيمة؟ اكتب الكود",
        voucherApply: "تطبيق",
        voucherValid: "✅ تم تطبيق الخصم!",
        voucherInvalid: "❌ كود غير صحيح أو منتهي",
        voucherChecking: "جاري التحقق...",
        originalPrice: "السعر الأصلي:",
        discountedPrice: "بعد الخصم:",
    }
};

let currentProduct = null;
let quantity = 1;
let appliedVoucher = null; // { code, discount }

function getLang() {
    return localStorage.getItem("language") || "en";
}

function updateStaticText() {
    const lang = getLang();
    const t = translations[lang] || translations.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.textContent = t[key];
    });
    if (currentProduct) renderProductDetails();
}

async function loadProductDetails(productId) {
    try {
        const productDoc = await getDoc(doc(db, "products", productId));
        if (!productDoc.exists()) { window.location.href = 'marketplace.php'; return; }
        currentProduct = { id: productDoc.id, ...productDoc.data() };
        renderProductDetails();
        // بعد ما المنتج يتحمل، تحقق من قسيمة موجودة
        checkExistingVoucher();
    } catch (error) {
        console.error("Error loading product:", error);
        window.location.href = 'marketplace.php';
    }
}

function renderProductDetails() {
    if (!currentProduct) return;
    const lang = getLang();
    const t = translations[lang] || translations.en;

    const name = lang === 'ar'
        ? (currentProduct.name?.ar || currentProduct.name_ar || currentProduct.name?.en || currentProduct.name || 'N/A')
        : (currentProduct.name?.en || currentProduct.name || 'N/A');

    const description = lang === 'ar'
        ? (currentProduct.fullDescription?.ar || currentProduct.fullDescription_ar || currentProduct.fullDescription?.en || currentProduct.fullDescription || currentProduct.description?.ar || currentProduct.description || '')
        : (currentProduct.fullDescription?.en || currentProduct.fullDescription || currentProduct.description?.en || currentProduct.description || '');

    const uses = lang === 'ar'
        ? (currentProduct.uses?.ar || currentProduct.uses_ar || currentProduct.uses?.en || currentProduct.uses || '')
        : (currentProduct.uses?.en || currentProduct.uses || '');

    document.title = `${name} - AquaMind`;
    document.getElementById('productTitle').textContent = name;

    const ratingHTML = `
        <span class="stars">${getStarRating(currentProduct.rating)}</span>
        <span>(${currentProduct.reviews} ${t.reviews})</span>
    `;
    document.getElementById('productRating').innerHTML = ratingHTML;

    const mainImg = document.getElementById('mainImage');
    if (!mainImg.getAttribute('data-loaded')) {
        mainImg.src = currentProduct.image || (currentProduct.images ? currentProduct.images[0] : '');
        mainImg.setAttribute('data-loaded', '1');
    }

    const thumbnailContainer = document.getElementById('thumbnailImages');
    if (thumbnailContainer.children.length === 0) {
        const images = currentProduct.images || [currentProduct.image];
        images.forEach((img, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${img}" alt="Thumbnail ${index + 1}">`;
            thumbnail.onclick = () => changeMainImage(img, thumbnail);
            thumbnailContainer.appendChild(thumbnail);
        });
    }

    document.getElementById('productDescription').textContent = description;

    const usesList = document.getElementById('productUses');
    usesList.innerHTML = '';
    if (uses) {
        uses.split('\n').filter(u => u.trim()).forEach(use => {
            const li = document.createElement('li');
            li.textContent = use.trim();
            usesList.appendChild(li);
        });
    }

    updatePrice();
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    let stars = '★'.repeat(fullStars);
    if (rating % 1 >= 0.5) stars += '★';
    stars += '☆'.repeat(5 - Math.ceil(rating));
    return stars;
}

window.changeMainImage = function(imageSrc, thumbnailElement) {
    document.getElementById('mainImage').src = imageSrc;
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnailElement.classList.add('active');
};

window.increaseQuantity = function() {
    quantity++;
    document.getElementById('quantity').value = quantity;
    updatePrice();
};

window.decreaseQuantity = function() {
    if (quantity > 1) { quantity--; document.getElementById('quantity').value = quantity; updatePrice(); }
};

function updatePrice() {
    if (!currentProduct) return;
    const lang = getLang();
    const t = translations[lang] || translations.en;
    const basePrice = parseFloat(currentProduct.price);
    const priceLarge = document.getElementById('priceLarge');
    const priceHeader = document.getElementById('productPrice');

    if (appliedVoucher) {
        const discounted = basePrice * (1 - appliedVoucher.discount / 100);
        const total = (discounted * quantity).toFixed(2);
        if (priceLarge) priceLarge.innerHTML = `
            <span class="pd-price-original"><s>${(basePrice * quantity).toFixed(2)}</s></span>
            <span class="pd-price-final">${total} ${t.currency}</span>
            <span class="pd-badge">${appliedVoucher.discount}% OFF</span>
        `;
        if (priceHeader) priceHeader.innerHTML = `
            <s class="pd-price-original-sm">${basePrice.toFixed(2)}</s>
            <span class="pd-price-header">${discounted.toFixed(2)} ${t.currency}</span>
        `;
    } else {
        const total = (basePrice * quantity).toFixed(2);
        if (priceLarge) priceLarge.textContent = `${total} ${t.currency}`;
        if (priceHeader) priceHeader.textContent = `${basePrice.toFixed(2)} ${t.currency}`;
    }
}

/* ══════════════════════════════════════
   VOUCHER LOGIC
══════════════════════════════════════ */
async function checkExistingVoucher() {
    if (!USER_DATA.isLoggedIn) return;
    try {
        const res  = await fetch('voucher.php?api=check');
        const data = await res.json();
        if (data.hasVoucher) {
            // أظهر الـ input بالكود جاهز
            const input = document.getElementById('pdVoucherInput');
            if (input) input.value = data.voucher.code;
        }
    } catch (e) {}
}

window.applyVoucher = async function() {
    const lang  = getLang();
    const t     = translations[lang] || translations.en;
    const input = document.getElementById('pdVoucherInput');
    const msg   = document.getElementById('pdVoucherMsg');
    const code  = input ? input.value.trim().toUpperCase() : '';

    if (!code) return;
    msg.textContent = t.voucherChecking;
    msg.className   = 'pd-voucher-msg';

    try {
        const res  = await fetch('voucher.php?api=check');
        const data = await res.json();

        if (data.hasVoucher && data.voucher.code === code) {
            appliedVoucher = { code, discount: data.voucher.discount };
            msg.textContent = t.voucherValid;
            msg.className   = 'pd-voucher-msg pd-voucher-ok';
            updatePrice();
        } else {
            appliedVoucher = null;
            msg.textContent = t.voucherInvalid;
            msg.className   = 'pd-voucher-msg pd-voucher-err';
            updatePrice();
        }
    } catch (e) {
        msg.textContent = t.voucherInvalid;
        msg.className   = 'pd-voucher-msg pd-voucher-err';
    }
};

/* ══════════════════════════════════════
   BUY NOW
══════════════════════════════════════ */
window.buyNow = async function() {
    if (!USER_DATA.isLoggedIn) { window.location.href = 'login.php'; return; }
    if (!currentProduct) return;

    const lang = getLang();
    const t    = translations[lang] || translations.en;
    const name = lang === 'ar'
        ? (currentProduct.name?.ar || currentProduct.name || 'N/A')
        : (currentProduct.name?.en || currentProduct.name || 'N/A');

    const basePrice      = parseFloat(currentProduct.price);
    const discountedUnit = appliedVoucher ? basePrice * (1 - appliedVoucher.discount / 100) : basePrice;
    const totalPrice     = (discountedUnit * quantity).toFixed(2);
    const userName       = `${USER_DATA.firstName} ${USER_DATA.lastName}`.trim();
    const userEmail      = USER_DATA.email;
    const discountNote   = appliedVoucher ? (lang === 'ar' ? ` (خصم ${appliedVoucher.discount}% مطبّق)` : ` (${appliedVoucher.discount}% discount applied)`) : '';

    // استخدم الكود في الداتابيز
    if (appliedVoucher) {
        try {
            await fetch('voucher.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `api=use&code=${encodeURIComponent(appliedVoucher.code)}`
            });
        } catch (e) { console.error('Voucher use error:', e); }
    }

    let message = lang === 'ar'
        ? `مرحباً! أنا مهتم بشراء:\n\nالعميل: ${userName}\nالبريد: ${userEmail}\n\nالمنتج: ${name}\nالكمية: ${quantity}\nسعر الوحدة: ${discountedUnit.toFixed(2)} ${t.currency}${discountNote}\nالإجمالي: ${totalPrice} ${t.currency}\n\nيرجى إخباري بكيفية إتمام الطلب.`
        : `Hello! I'm interested in purchasing:\n\nCustomer: ${userName}\nEmail: ${userEmail}\n\nProduct: ${name}\nQuantity: ${quantity}\nPrice per unit: ${discountedUnit.toFixed(2)} ${t.currency}${discountNote}\nTotal: ${totalPrice} ${t.currency}\n\nPlease let me know how to proceed with the order.`;

    window.open(`https://wa.me/+201152292951?text=${encodeURIComponent(message)}`, '_blank');
};

document.addEventListener('DOMContentLoaded', async () => {
    const productId = sessionStorage.getItem('selectedProductId');
    if (productId) {
        await loadProductDetails(productId);
        updateStaticText();
    } else {
        window.location.href = 'marketplace.php';
    }

    // Enter key on voucher input
    const vInput = document.getElementById('pdVoucherInput');
    if (vInput) vInput.addEventListener('keydown', e => { if (e.key === 'Enter') applyVoucher(); });

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'dir') updateStaticText();
        });
    });
    observer.observe(document.documentElement, { attributes: true });
});