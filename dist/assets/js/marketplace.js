import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
        heroTitle1: "Smart Water Solutions",
        heroTitle2: "FOR SMART LIVING",
        heroSubtitle: "Discover innovative products designed to help you save water and protect the environment",
        productsSectionTitle: "Our Products",
        productsSectionSubtitle: "Discover our range of innovative water solutions",
        viewDetails: "View Details",
        currency: "EGP",
        noProducts: "No products available at the moment.",
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
        heroTitle1: "حلول مياه ذكية",
        heroTitle2: "لحياة ذكية",
        heroSubtitle: "اكتشف منتجات مبتكرة مصممة لمساعدتك على توفير المياه وحماية البيئة",
        productsSectionTitle: "منتجاتنا",
        productsSectionSubtitle: "اكتشف مجموعتنا من حلول المياه المبتكرة",
        viewDetails: "عرض التفاصيل",
        currency: "ج.م",
        noProducts: "لا توجد منتجات متاحة في الوقت الحالي.",
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

let currentProducts = [];

async function getProducts() {
    try {
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);
        return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

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
}

function renderProducts() {
    const lang = getLang();
    const t = translations[lang] || translations.en;
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    if (currentProducts.length === 0) {
        productsGrid.innerHTML = `<p style="text-align: center; grid-column: 1/-1; padding: 3rem; color: #666;">${t.noProducts}</p>`;
        return;
    }

    productsGrid.innerHTML = '';
    currentProducts.forEach(product => {
        // Handle both old (string) and new (object) data structures
        const name = lang === 'ar' 
            ? (product.name?.ar || product.name_ar || product.name?.en || product.name || 'N/A')
            : (product.name?.en || product.name || 'N/A');
            
        const description = lang === 'ar'
            ? (product.description?.ar || product.description_ar || product.description?.en || product.description || '')
            : (product.description?.en || product.description || '');
        
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-area">
                <img src="${product.image}" alt="${name}">
            </div>
            <div class="product-info">
                <h2 class="product-name">${name}</h2>
                <p class="product-description">${description}</p>
                <p class="product-price">${parseFloat(product.price).toFixed(2)} ${t.currency}</p>
                <button class="view-details-btn" onclick="viewProductDetails('${product.id}')">
                    ${t.viewDetails}
                </button>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

window.viewProductDetails = function(productId) {
    sessionStorage.setItem('selectedProductId', productId);
    window.location.href = 'product-details.html';
};

document.addEventListener('DOMContentLoaded', async () => {
    updateStaticText();
    currentProducts = await getProducts();
    renderProducts();
    
    // Observe language changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                updateStaticText();
                renderProducts();
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
});
