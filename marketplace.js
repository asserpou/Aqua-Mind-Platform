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
        copyright: "2026 AquaMind. All rights reserved.",
        aiSearchPlaceholder: "Ask AI to find a product..."
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
        copyright: "2026 AquaMind. جميع الحقوق محفوظة.",
        aiSearchPlaceholder: "اسأل الذكاء الاصطناعي للبحث عن منتج..."
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

function renderProducts(productsToRender = currentProducts) {
    const lang = getLang();
    const t = translations[lang] || translations.en;
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) return;
    
    if (productsToRender.length === 0) {
        productsGrid.innerHTML = `<p style="text-align: center; width: 100%; padding: 3rem; color: #666;">${t.noProducts}</p>`;
        return;
    }

    productsGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
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

function setupCarousel() {
    const grid = document.getElementById('productsGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!grid || !prevBtn || !nextBtn) return;
    
    // Smooth scrolling for carousel
    prevBtn.addEventListener('click', () => {
        // Adjust for RTL support. Scroll EXACT viewport width (showing 2 columns)
        const scrollAmount = getLang() === 'ar' ? grid.clientWidth : -grid.clientWidth;
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
        const scrollAmount = getLang() === 'ar' ? -grid.clientWidth : grid.clientWidth;
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

// Egyptian slang dictionary
const egDict = {
    'ماية': 'مياه', 'ميه': 'مياه', 'حنفية': 'صنبور', 'حنفيه': 'صنبور',
    'دش': 'استحمام', 'حمام': 'دورة مياه', 'اوضة': 'غرفة', 'فلتر': 'تنقية',
    'شطاف': 'صنبور', 'موفر': 'توفير', 'حنفيت': 'صنبور', 'مايه': 'مياه'
};

async function performAISearch() {
    const input = document.getElementById('aiSearchInput');
    const btn = document.getElementById('aiSearchBtn');
    const status = document.getElementById('aiSearchStatus');
    
    if (!input || !btn || !status) return;
    
    const query = input.value.trim();
    const lang = getLang();
    const t = translations[lang] || translations.en;
    
    if (!query) {
        renderProducts(currentProducts);
        status.textContent = '';
        return;
    }
    
    // UI Feedback for AI analyzing
    status.style.color = '#64b5f6';
    status.textContent = lang === 'ar' ? 'جاري تحليل طلبك بالذكاء الاصطناعي...' : 'AI is analyzing your request...';
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    
    // Simulate API delay for UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerQuery = query.toLowerCase();
    const rawTokens = lowerQuery.split(' ').filter(t => t.length > 1);
    const tokens = [];
    
    // Expand tokens with Arabic Synonyms
    rawTokens.forEach(t => {
        tokens.push(t);
        for (let key in egDict) {
            if (t === key) tokens.push(egDict[key]);
            if (t === egDict[key]) tokens.push(key);
        }
    });
    
    // Smart token matching (acting as local AI with relevancy score)
    const scoredProducts = currentProducts.map(product => {
        const nameEn = (product.name?.en || product.name || '').toLowerCase();
        const descEn = (product.description?.en || product.description || '').toLowerCase();
        const nameAr = (product.name?.ar || product.name_ar || '').toLowerCase();
        const descAr = (product.description?.ar || product.description_ar || '').toLowerCase();
        
        const fullText = `${nameEn} ${descEn} ${nameAr} ${descAr}`;
        let score = 0;
        
        if (fullText.includes(lowerQuery)) score += 100;
        
        tokens.forEach(token => {
            if (fullText.includes(token)) score += 10;
            if (nameEn.includes(token) || nameAr.includes(token)) score += 15;
        });
        
        return { product, score };
    }).filter(item => item.score > 0);
    
    // Sort deeply relevant items primarily
    scoredProducts.sort((a, b) => b.score - a.score);
    const filteredProducts = scoredProducts.map(item => item.product);
    
    renderProducts(filteredProducts);
    
    btn.innerHTML = '<i class="fas fa-search"></i>';
    if (filteredProducts.length > 0) {
        status.style.color = '#4CAF50';
        status.textContent = lang === 'ar' 
            ? `تم العثور على ${filteredProducts.length} منتج.` 
            : `Found ${filteredProducts.length} suitable products.`;
    } else {
        status.style.color = '#F44336';
        status.textContent = lang === 'ar' 
            ? 'ولم نجد منتجات تطابق بحثك بدقة. جرب كلمات اخرى.' 
            : 'No exact matches found. Try different keywords.';
    }
}

window.viewProductDetails = function(productId) {
    sessionStorage.setItem('selectedProductId', productId);
    // Updated to point to the PHP file
    window.location.href = 'product-details.php';
};

document.addEventListener('DOMContentLoaded', async () => {
    updateStaticText();
    currentProducts = await getProducts();
    renderProducts();
    setupCarousel();
    
    const aiSearchBtn = document.getElementById('aiSearchBtn');
    const aiSearchInput = document.getElementById('aiSearchInput');
    
    if (aiSearchBtn) {
        aiSearchBtn.addEventListener('click', performAISearch);
    }
    
    if (aiSearchInput) {
        aiSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performAISearch();
        });
    }
    
    // Observer for language/placeholder updates
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
                updateStaticText();
                
                // Update placeholder manually since it's an attribute
                if (aiSearchInput) {
                    const lang = document.documentElement.dir === 'rtl' ? 'ar' : 'en';
                    const t = translations[lang] || translations.en;
                    if (t.aiSearchPlaceholder) {
                         aiSearchInput.placeholder = t.aiSearchPlaceholder;
                    }
                }
                
                // Re-render based on current searched state or all products
                const currentSearch = aiSearchInput ? aiSearchInput.value.trim() : '';
                if (currentSearch) {
                    performAISearch();
                } else {
                    renderProducts();
                }
            }
        });
    });
    
    observer.observe(document.documentElement, { attributes: true });
});