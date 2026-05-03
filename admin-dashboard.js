import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
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
const auth = getAuth(app);

// =============================================
// SINGLE SIGN-ON: Check session before Firebase
// =============================================
if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin-login.html';
}

let allProducts = [];
let currentAdminEmail = '';

// =============================================
// AUTH GUARD — Firebase confirms user identity
// =============================================
onAuthStateChanged(auth, (user) => {
    if (!user || sessionStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
    } else {
        currentAdminEmail = user.email;
        loadProductsTable();
    }
});

// =============================================
// SECTION NAVIGATION
// =============================================
window.showSection = function (sectionName, clickedEl) {
    document.querySelectorAll('main > section').forEach(s => s.style.display = 'none');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById('section-' + sectionName).style.display = 'block';
    clickedEl.classList.add('active');

    if (sectionName === 'users') loadUsers();
};

// =============================================
// PRODUCTS — Firebase Firestore
// =============================================
async function fetchProducts() {
    const snap = await getDocs(collection(db, 'products'));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;">
        <i class="fas fa-spinner fa-spin"></i> Loading products...</td></tr>`;

    try {
        allProducts = await fetchProducts();

        if (allProducts.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="empty-state">
                <i class="fas fa-box-open"></i><p>No products found. Add your first product!</p></td></tr>`;
            return;
        }

        tbody.innerHTML = allProducts.map(product => {
            const name = product.name?.en || product.name || 'N/A';
            const desc = product.description?.en || product.description || 'N/A';
            return `
            <tr>
                <td><img src="${product.image}" alt="${name}" class="product-img" onerror="this.src='https://via.placeholder.com/65x65?text=IMG'"></td>
                <td><strong>${name}</strong><br><small style="color:#7f8c8d">${desc}</small></td>
                <td><strong>${parseFloat(product.price).toFixed(2)} EGP</strong></td>
                <td>${product.rating} ⭐ <small style="color:#7f8c8d">(${product.reviews} reviews)</small></td>
                <td>
                    <button class="action-btn btn-edit" onclick="editProduct('${product.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>`;
        }).join('');
    } catch (err) {
        console.error("Error loading products:", err);
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:2rem;color:#e74c3c;">
            <i class="fas fa-exclamation-triangle"></i> Error loading products.</td></tr>`;
    }
}

// Open add modal
window.openAddModal = function () {
    document.getElementById('modalTitle').textContent = 'Add New Product';
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    document.getElementById('mainImagePreview').innerHTML = '';
    document.getElementById('galleryPreview').innerHTML = '';
    document.getElementById('galleryCount').textContent = '0 images selected';
    galleryImages = [];
    document.getElementById('productModal').classList.add('active');
};

window.closeModal = function () {
    document.getElementById('productModal').classList.remove('active');
};

window.editProduct = function (id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productNameEn').value = product.name?.en || product.name || '';
    document.getElementById('productNameAr').value = product.name?.ar || '';
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescriptionEn').value = product.description?.en || product.description || '';
    document.getElementById('productDescriptionAr').value = product.description?.ar || '';
    document.getElementById('productFullDescriptionEn').value = product.fullDescription?.en || product.fullDescription || '';
    document.getElementById('productFullDescriptionAr').value = product.fullDescription?.ar || '';
    document.getElementById('productRating').value = product.rating;
    document.getElementById('productReviews').value = product.reviews;
    document.getElementById('productUsesEn').value = product.uses?.en || product.uses || '';
    document.getElementById('productUsesAr').value = product.uses?.ar || '';

    document.getElementById('productMainImage').value = product.image;
    document.getElementById('mainImagePreview').innerHTML =
        `<img src="${product.image}" alt="Preview" style="max-width:200px;max-height:200px;border-radius:8px;margin-top:0.5rem;">`;

    galleryImages = product.images || [];
    document.getElementById('productGallery').value = galleryImages.join('|||');
    const galleryPreview = document.getElementById('galleryPreview');
    galleryPreview.innerHTML = '';
    galleryImages.forEach((imgData, i) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${imgData}" alt="Gallery ${i + 1}">
            <button type="button" class="remove-gallery-btn" onclick="removeGalleryImage(${i})">
                <i class="fas fa-times"></i>
            </button>`;
        galleryPreview.appendChild(div);
    });
    document.getElementById('galleryCount').textContent =
        `${galleryImages.length} image${galleryImages.length !== 1 ? 's' : ''} selected`;

    document.getElementById('productModal').classList.add('active');
};

window.deleteProduct = async function (id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
        await deleteDoc(doc(db, "products", id));
        alert('Product deleted successfully!');
        loadProductsTable();
    } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete: " + err.message);
    }
};

// Cloudinary
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dc4xsnahf/upload';
const CLOUDINARY_PRESET = 'photos';

async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);
    const res = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
    if (!res.ok) throw new Error("Cloudinary upload failed");
    const data = await res.json();
    return data.secure_url;
}

document.getElementById('productForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        const id = document.getElementById('productId').value;
        const mainFile = document.getElementById('productMainImageFile').files[0];
        const galleryFiles = document.getElementById('productGalleryFiles').files;

        let finalMainImage = document.getElementById('productMainImage').value;
        let finalGallery = [...galleryImages];

        if (mainFile) finalMainImage = await uploadToCloudinary(mainFile);

        if (galleryFiles.length > 0) {
            const urls = [];
            for (const file of galleryFiles) urls.push(await uploadToCloudinary(file));
            finalGallery = urls;
        }

        if (!finalMainImage && finalGallery.length > 0) finalMainImage = finalGallery[0];

        const productData = {
            name: {
                en: document.getElementById('productNameEn').value,
                ar: document.getElementById('productNameAr').value
            },
            price: parseFloat(document.getElementById('productPrice').value),
            description: {
                en: document.getElementById('productDescriptionEn').value,
                ar: document.getElementById('productDescriptionAr').value
            },
            fullDescription: {
                en: document.getElementById('productFullDescriptionEn').value,
                ar: document.getElementById('productFullDescriptionAr').value
            },
            rating: parseFloat(document.getElementById('productRating').value),
            reviews: parseInt(document.getElementById('productReviews').value),
            uses: {
                en: document.getElementById('productUsesEn').value,
                ar: document.getElementById('productUsesAr').value
            },
            image: finalMainImage,
            images: finalGallery
        };

        if (id) {
            await updateDoc(doc(db, "products", id), productData);
            alert('Product updated successfully!');
        } else {
            await addDoc(collection(db, 'products'), productData);
            alert('Product added successfully!');
        }

        closeModal();
        loadProductsTable();
    } catch (err) {
        console.error("Save error:", err);
        alert("Error saving product: " + err.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

// Image previews
document.getElementById('productMainImageFile').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
        document.getElementById('mainImagePreview').innerHTML =
            `<img src="${ev.target.result}" style="max-width:200px;border-radius:8px;margin-top:0.5rem;">`;
    };
    reader.readAsDataURL(file);
});

let galleryImages = [];

document.getElementById('productGalleryFiles').addEventListener('change', function (e) {
    const files = Array.from(e.target.files);
    const preview = document.getElementById('galleryPreview');
    preview.innerHTML = '<p style="color:#7f8c8d;font-size:0.9rem;">Loading preview...</p>';

    let loaded = 0;
    const tempGallery = [];

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = ev => {
            tempGallery.push(ev.target.result);
            loaded++;
            if (loaded === files.length) {
                preview.innerHTML = '';
                tempGallery.forEach(src => {
                    preview.innerHTML += `<div class="gallery-item"><img src="${src}"></div>`;
                });
                document.getElementById('galleryCount').textContent = `${files.length} new images selected`;
            }
        };
        reader.readAsDataURL(file);
    });
});

window.removeGalleryImage = function (index) {
    galleryImages.splice(index, 1);
    document.getElementById('productGallery').value = galleryImages.join('|||');
    const preview = document.getElementById('galleryPreview');
    preview.innerHTML = '';
    galleryImages.forEach((img, i) => {
        preview.innerHTML += `
            <div class="gallery-item">
                <img src="${img}">
                <button type="button" class="remove-gallery-btn" onclick="removeGalleryImage(${i})">
                    <i class="fas fa-times"></i>
                </button>
            </div>`;
    });
    document.getElementById('galleryCount').textContent = `${galleryImages.length} images remaining`;
};

// =============================================
// USER ACCOUNTS — MySQL via PHP API
// =============================================
let allUsers = [];

async function loadUsers() {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;">
        <i class="fas fa-spinner fa-spin"></i> Loading users...</td></tr>`;

    try {
        const res  = await fetch('user_api.php?action=list');
        const data = await res.json();

        if (!data.success) throw new Error(data.message);

        allUsers = data.users || [];
        renderUsersTable(allUsers);
        renderUserStats(allUsers);
    } catch (err) {
        console.error("Load users error:", err);
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:2rem;color:#e74c3c;">
            <i class="fas fa-exclamation-triangle"></i> Error loading users. Make sure user_api.php is set up.</td></tr>`;
    }
}

function renderUserStats(users) {
    const counts = { total: users.length, standard: 0, premium: 0 };
    users.forEach(u => {
        const t = (u.account_type || '').toLowerCase();
        if (t === 'standard')      counts.standard++;
        else if (t === 'premium')  counts.premium++;
    });

    document.getElementById('usersStats').innerHTML = `
        <div class="stat-card">
            <div class="stat-icon total"><i class="fas fa-users"></i></div>
            <div class="stat-info"><div class="stat-num">${counts.total}</div><div class="stat-label">Total Users</div></div>
        </div>
        <div class="stat-card">
            <div class="stat-icon standard"><i class="fas fa-star-half-alt"></i></div>
            <div class="stat-info"><div class="stat-num">${counts.standard}</div><div class="stat-label">Standard</div></div>
        </div>
        <div class="stat-card">
            <div class="stat-icon premium"><i class="fas fa-crown"></i></div>
            <div class="stat-info"><div class="stat-num">${counts.premium}</div><div class="stat-label">Premium</div></div>
        </div>`;
}

function renderUsersTable(users) {
    const tbody = document.getElementById('usersTableBody');

    if (users.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center;padding:3rem;color:#95a5a6;">
            <i class="fas fa-search" style="font-size:2rem;display:block;margin-bottom:0.8rem;opacity:0.4;"></i>
            No users found.</td></tr>`;
        return;
    }

    tbody.innerHTML = users.map(user => {
        const fullName  = `${user.first_name} ${user.last_name}`;
        const initial   = user.first_name.charAt(0).toUpperCase();
        const planRaw   = (user.account_type || '').toLowerCase();
        const planClass = planRaw === 'premium' ? 'plan-premium' : 'plan-standard';
        const planLabel = planRaw === 'premium' ? 'Premium' : 'Standard';
        const joined    = user.created_at ? new Date(user.created_at).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
        }) : '—';

        return `
        <tr>
            <td style="color:#7f8c8d;font-weight:600;">#${user.user_id}</td>
            <td>
                <div class="user-name-cell">
                    <div class="user-avatar-sm">${initial}</div>
                    <div>
                        <div class="user-full-name">${fullName}</div>
                        <div class="user-id-label">ID: ${user.user_id}</div>
                    </div>
                </div>
            </td>
            <td>${user.email}</td>
            <td>${user.phone || '—'}</td>
            <td><span class="plan-badge ${planClass}">${planLabel}</span></td>
            <td class="date-cell">${joined}</td>
            <td>
                <button class="action-btn btn-edit" onclick="openEditUserModal(${user.user_id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
            </td>
        </tr>`;
    }).join('');
}

// Search
window.searchUsers = function () {
    const query = document.getElementById('userSearchInput').value.trim().toLowerCase();
    document.getElementById('searchClearBtn').style.display = query ? 'flex' : 'none';

    if (!query) {
        renderUsersTable(allUsers);
        return;
    }

    const filtered = allUsers.filter(u =>
        u.email.toLowerCase().includes(query) ||
        u.first_name.toLowerCase().includes(query) ||
        u.last_name.toLowerCase().includes(query) ||
        (u.phone && u.phone.includes(query))
    );
    renderUsersTable(filtered);
};

window.clearSearch = function () {
    document.getElementById('userSearchInput').value = '';
    document.getElementById('searchClearBtn').style.display = 'none';
    renderUsersTable(allUsers);
};

// Edit user modal
window.openEditUserModal = function (userId) {
    // user_id from PHP API comes as string — use == or cast
    const user = allUsers.find(u => Number(u.user_id) === Number(userId));
    if (!user) { console.error('User not found:', userId); return; }

    document.getElementById('editUserId').value    = user.user_id;
    document.getElementById('editFirstName').value = user.first_name;
    document.getElementById('editLastName').value  = user.last_name;
    document.getElementById('editEmail').value     = user.email;
    document.getElementById('editPhone').value     = user.phone || '';

    // Set plan — options are "standard" and "premium" (lowercase values)
    const planRaw   = (user.account_type || 'standard').toLowerCase();
    const selectEl  = document.getElementById('editAccountType');
    // Default to standard if value doesn't match any option
    selectEl.value  = (planRaw === 'premium') ? 'premium' : 'standard';

    // Avatar header inside modal
    const fullName = `${user.first_name} ${user.last_name}`;
    const initial  = user.first_name.charAt(0).toUpperCase();
    document.getElementById('userModalAvatar').innerHTML = `
        <div class="avatar-circle">${initial}</div>
        <div class="avatar-name">${fullName}</div>
        <div class="avatar-id">User #${user.user_id} · ${user.email}</div>`;

    document.getElementById('userModal').classList.add('active');
};

window.closeUserModal = function () {
    document.getElementById('userModal').classList.remove('active');
};

document.getElementById('userForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn  = this.querySelector('button[type="submit"]');
    const origText   = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

    const id        = document.getElementById('editUserId').value;
    const firstName = document.getElementById('editFirstName').value.trim();
    const lastName  = document.getElementById('editLastName').value.trim();
    const email     = document.getElementById('editEmail').value.trim();
    const phone     = document.getElementById('editPhone').value.trim();
    const plan      = document.getElementById('editAccountType').value;

    try {
        const formData = new FormData();
        formData.append('action',       'update');
        formData.append('user_id',      id);
        formData.append('first_name',   firstName);
        formData.append('last_name',    lastName);
        formData.append('email',        email);
        formData.append('phone',        phone);
        formData.append('account_type', plan);

        const res  = await fetch('user_api.php', { method: 'POST', body: formData });
        const data = await res.json();

        if (data.success) {
            alert('User updated successfully!');
            closeUserModal();
            loadUsers();
        } else {
            alert('Error: ' + data.message);
        }
    } catch (err) {
        console.error("Update user error:", err);
        alert("Error: " + err.message);
    } finally {
        submitBtn.disabled  = false;
        submitBtn.innerHTML = origText;
    }
});

// =============================================
// LOGOUT
// =============================================
window.logout = function () {
    auth.signOut().then(() => {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    }).catch(err => console.error("Logout error:", err));
};