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
        footerDesc: "Empowering communities with smart water solutions for a sustainable future.",
        quickLinks: "Quick Links",
        home: "Home",
        stories: "Stories & Charts",
        aquaguard: "AquaGuard",
        interactive: "Interactive House",
        marketplace: "Market Place",
        copyright: "2026 AquaMind. All rights reserved."
    },
    ar: {
        descriptionTitle: "الوصف",
        usesTitle: "الاستخدامات",
        buyNowBtn: "اشتر الآن",
        backToProducts: "عودة للمنتجات",
        currency: "ج.م",
        reviews: "مراجعات",
        footerDesc: "تمكين المجتمعات بحلول مياه ذكية لمستقبل مستدام.",
        quickLinks: "روابط سريعة",
        home: "الرئيسية",
        stories: "قصص ورسوم بيانية",
        aquaguard: "أكواجارد",
        interactive: "المنزل التفاعلي",
        marketplace: "المتجر",
        copyright: "2026 AquaMind. جميع الحقوق محفوظة."
    }
};

let currentProduct = null;
let quantity = 1;

function getLang() {
    return localStorage.getItem("language") || "en";
}

function updateStaticText() {
    const lang = getLang();
    const t = translations[lang] || translations.en;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
    
    // Update dynamic content if product is loaded
    if (currentProduct) {
        renderProductDetails();
    }
}

async function loadProductDetails(productId) {
    try {
        const productDoc = await getDoc(doc(db, "products", productId));
        if (!productDoc.exists()) {
            window.location.href = 'marketplace.html';
            return;
        }
        currentProduct = { id: productDoc.id, ...productDoc.data() };
        renderProductDetails();
    } catch (error) {
        console.error("Error loading product:", error);
        window.location.href = 'marketplace.html';
    }
}

function renderProductDetails() {
    if (!currentProduct) return;
    
    const lang = getLang();
    const t = translations[lang] || translations.en;
    
    // Handle both old (string) and new (object) data structures
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
    document.getElementById('productPrice').textContent = `${parseFloat(currentProduct.price).toFixed(2)} ${t.currency}`;
    
    const ratingHTML = `
        <span class="stars">${getStarRating(currentProduct.rating)}</span>
        <span>(${currentProduct.reviews} ${t.reviews})</span>
    `;
    document.getElementById('productRating').innerHTML = ratingHTML;
    
    // Images (only set once or if changed? actually re-setting is fine)
    const mainImg = document.getElementById('mainImage');
    if (!mainImg.src || mainImg.src === window.location.href) { // simple check
         mainImg.src = currentProduct.image || (currentProduct.images ? currentProduct.images[0] : '');
    }
    
    // Thumbnails
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
        const usesArray = uses.split('\n').filter(use => use.trim());
        usesArray.forEach(use => {
            const li = document.createElement('li');
            li.textContent = use.trim();
            usesList.appendChild(li);
        });
    }
    
    updatePrice();
}

function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '★';
    if (hasHalfStar) stars += '★'; // You might want a half-star character or icon
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) stars += '☆';
    return stars;
}

window.changeMainImage = function(imageSrc, thumbnailElement) {
    document.getElementById('mainImage').src = imageSrc;
    document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
    thumbnailElement.classList.add('active');
}

window.increaseQuantity = function() {
    quantity++;
    document.getElementById('quantity').value = quantity;
    updatePrice();
}

window.decreaseQuantity = function() {
    if (quantity > 1) {
        quantity--;
        document.getElementById('quantity').value = quantity;
        updatePrice();
    }
}

function updatePrice() {
    if (!currentProduct) return;
    const lang = getLang();
    const t = translations[lang] || translations.en;
    const totalPrice = (parseFloat(currentProduct.price) * quantity).toFixed(2);
    document.getElementById('priceLarge').textContent = `${totalPrice} ${t.currency}`;
}

window.buyNow = function() {
    if (!currentProduct) return;
    const lang = getLang();
    const t = translations[lang] || translations.en;
    
    const phoneNumber = '+201152292951';
    
    // Handle both old (string) and new (object) data structures
    const name = lang === 'ar'
        ? (currentProduct.name?.ar || currentProduct.name_ar || currentProduct.name?.en || currentProduct.name || 'N/A')
        : (currentProduct.name?.en || currentProduct.name || 'N/A');
        
    const price = parseFloat(currentProduct.price);
    const totalPrice = (price * quantity).toFixed(2);
    
    let message = `Hello! I'm interested in purchasing:\n\nProduct: ${name}\nQuantity: ${quantity}\nPrice per unit: ${price} ${t.currency}\nTotal: ${totalPrice} ${t.currency}\n\nPlease let me know how to proceed with the order.`;
    
    if (lang === 'ar') {
        message = `مرحباً! أنا مهتم بشراء:\n\nالمنتج: ${name}\nالكمية: ${quantity}\nالسعر للوحدة: ${price} ${t.currency}\nالإجمالي: ${totalPrice} ${t.currency}\n\nيرجى إخباري بكيفية إتمام الطلب.`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

document.addEventListener('DOMContentLoaded', async () => {
    const productId = sessionStorage.getItem('selectedProductId');
    if (productId) {
        await loadProductDetails(productId);
        updateStaticText();
    } else {
        window.location.href = 'marketplace.html';
    }
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                updateStaticText();
            }
        });
    });
    observer.observe(document.documentElement, { attributes: true });
});
