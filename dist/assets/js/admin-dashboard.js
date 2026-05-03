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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Check if logged in (Session check)
if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
    window.location.href = 'admin-login.html';
}

// Store products globally for easy access
let allProducts = [];

// Get all products from Firestore
async function fetchProducts() {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    return productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Load products table
async function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;"><i class="fas fa-spinner fa-spin"></i> Loading products...</td></tr>';

    try {
        allProducts = await fetchProducts();

        if (allProducts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem;">No products found in Firebase. Add your first product!</td></tr>';
            return;
        }

        tbody.innerHTML = allProducts.map(product => `
            <tr>
                <td><img src="${product.image}" alt="${product.name}" class="product-img"></td>
                <td><strong>${product.name}</strong><br><small>${product.description}</small></td>
                <td>${parseFloat(product.price).toFixed(2)} EGP</td>
                <td>${product.rating} ⭐ (${product.reviews} reviews)</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editProduct('${product.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="action-btn btn-delete" onclick="deleteProduct('${product.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `).join('');
    } catch (error) {
        console.error("Error loading products:", error);
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 2rem; color: red;">Error loading products. Check console for details.</td></tr>';
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

// Close modal
window.closeModal = function () {
    document.getElementById('productModal').classList.remove('active');
};

// Edit product
window.editProduct = function (id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    document.getElementById('modalTitle').textContent = 'Edit Product';
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productFullDescription').value = product.fullDescription;
    document.getElementById('productRating').value = product.rating;
    document.getElementById('productReviews').value = product.reviews;
    document.getElementById('productUses').value = product.uses;

    // Set main image preview
    document.getElementById('productMainImage').value = product.image;
    const mainPreview = document.getElementById('mainImagePreview');
    mainPreview.innerHTML = `<img src="${product.image}" alt="Preview" style="max-width: 200px; max-height: 200px; border-radius: 8px;">`;

    // Set gallery images preview
    galleryImages = product.images || [];
    document.getElementById('productGallery').value = galleryImages.join('|||');
    const galleryPreview = document.getElementById('galleryPreview');
    galleryPreview.innerHTML = '';
    galleryImages.forEach((imgData, i) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item';
        imgContainer.innerHTML = `
            <img src="${imgData}" alt="Gallery ${i + 1}">
            <button type="button" class="remove-gallery-btn" onclick="removeGalleryImage(${i})">
                <i class="fas fa-times"></i>
            </button>
        `;
        galleryPreview.appendChild(imgContainer);
    });
    document.getElementById('galleryCount').textContent = `${galleryImages.length} image${galleryImages.length !== 1 ? 's' : ''} selected`;

    document.getElementById('productModal').classList.add('active');
};

// Delete product
window.deleteProduct = async function (id) {
    if (!confirm('Are you sure you want to delete this product from Firebase?')) return;

    try {
        await deleteDoc(doc(db, "products", id));
        alert('Product deleted successfully!');
        loadProductsTable();
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product: " + error.message);
    }
};

// Cloudinary configuration
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dw22ybii8/upload';
const CLOUDINARY_PRESET = 'admin_photos';

async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_PRESET);

    const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) throw new Error("Cloudinary upload failed");
    const data = await response.json();
    return data.secure_url;
}

// Handle form submission
document.getElementById('productForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        const id = document.getElementById('productId').value;
        const mainImageFile = document.getElementById('productMainImageFile').files[0];
        const galleryFiles = document.getElementById('productGalleryFiles').files;

        let finalMainImage = document.getElementById('productMainImage').value;
        let finalGallery = galleryImages;

        // Upload main image if new one selected
        if (mainImageFile) {
            finalMainImage = await uploadToCloudinary(mainImageFile);
        }

        // Upload gallery images if new ones selected
        if (galleryFiles.length > 0) {
            const newGalleryUrls = [];
            for (const file of galleryFiles) {
                const url = await uploadToCloudinary(file);
                newGalleryUrls.push(url);
            }
            // Replace gallery with new images when new files are selected
            finalGallery = newGalleryUrls;
        }

        if (!finalMainImage && finalGallery.length > 0) {
            finalMainImage = finalGallery[0];
        }

        const productData = {
            name: document.getElementById('productName').value,
            price: parseFloat(document.getElementById('productPrice').value),
            description: document.getElementById('productDescription').value,
            fullDescription: document.getElementById('productFullDescription').value,
            rating: parseFloat(document.getElementById('productRating').value),
            reviews: parseInt(document.getElementById('productReviews').value),
            uses: document.getElementById('productUses').value,
            image: finalMainImage,
            images: finalGallery
        };

        if (id) {
            // Update
            await updateDoc(doc(db, "products", id), productData);
            alert('Product updated successfully in Firebase!');
        } else {
            // Add
            await addDoc(collection(db, 'products'), productData);
            alert('New product added to Firebase!');
        }

        closeModal();
        loadProductsTable();
    } catch (error) {
        console.error("Error saving product:", error);
        alert("Error saving product: " + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Logout
window.logout = function () {
    sessionStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
};

// Image selection previews (Real-time)
document.getElementById('productMainImageFile').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById('mainImagePreview').innerHTML = `<img src="${event.target.result}" style="max-width: 200px; border-radius: 8px;">`;
        };
        reader.readAsDataURL(file);
    }
});

let galleryImages = []; // Local ref for new uploads or existing
document.getElementById('productGalleryFiles').addEventListener('change', function (e) {
    const files = Array.from(e.target.files);
    const preview = document.getElementById('galleryPreview');
    preview.innerHTML = '<p>Loading selection...</p>';

    let loaded = 0;
    const tempGallery = [];

    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
            tempGallery.push(event.target.result);
            loaded++;
            if (loaded === files.length) {
                preview.innerHTML = '';
                tempGallery.forEach((src, i) => {
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
                <button type="button" class="remove-gallery-btn" onclick="removeGalleryImage(${i})"><i class="fas fa-times"></i></button>
            </div>`;
    });
    document.getElementById('galleryCount').textContent = `${galleryImages.length} images remaining`;
};

// Start
loadProductsTable();
