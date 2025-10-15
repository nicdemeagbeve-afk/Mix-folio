// Configuration - À personnaliser
const CONFIG = {
    whatsappNumber: '{{whatsapp_number}}', // Format: 22890123456 (sans le +)
    currency: 'FCFA',
    shopAddress: '{{address}}',
    shopPhone: '{{phone}}'
};

// Base de données produits - À personnaliser
const PRODUCTS = [
    {
        id: 1,
        name: 'Produit Premium 1',
        category: '{{category_1}}',
        price: 15000,
        image: 'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Produit+1',
        description: 'Description du produit 1',
        badge: 'Nouveau'
    },
    {
        id: 2,
        name: 'Produit Qualité 2',
        category: '{{category_1}}',
        price: 25000,
        image: 'https://via.placeholder.com/400x300/004E89/FFFFFF?text=Produit+2',
        description: 'Description du produit 2',
        badge: 'Populaire'
    },
    {
        id: 3,
        name: 'Produit Exclusif 3',
        category: '{{category_2}}',
        price: 35000,
        image: 'https://via.placeholder.com/400x300/F7931E/FFFFFF?text=Produit+3',
        description: 'Description du produit 3',
        badge: 'Promo'
    },
    {
        id: 4,
        name: 'Produit Spécial 4',
        category: '{{category_2}}',
        price: 20000,
        image: 'https://via.placeholder.com/400x300/FF6B35/FFFFFF?text=Produit+4',
        description: 'Description du produit 4'
    },
    {
        id: 5,
        name: 'Produit Unique 5',
        category: '{{category_3}}',
        price: 30000,
        image: 'https://via.placeholder.com/400x300/004E89/FFFFFF?text=Produit+5',
        description: 'Description du produit 5',
        badge: 'Nouveau'
    },
    {
        id: 6,
        name: 'Produit Premium 6',
        category: '{{category_3}}',
        price: 18000,
        image: 'https://via.placeholder.com/400x300/F7931E/FFFFFF?text=Produit+6',
        description: 'Description du produit 6'
    }
];

// État du panier (stocké en mémoire)
let cart = [];
let currentFilter = 'all';

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    setupFilterButtons();
    setupDeliveryOptions();
    updateCartDisplay();
});

// Rendu des produits
function renderProducts(filter = 'all') {
    const grid = document.getElementById('productsGrid');
    const filteredProducts = filter === 'all' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === filter);
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="col-lg-4 col-md-6">
            <div class="product-card" style="position: relative;">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="text-muted">${product.description}</p>
                    <div class="product-price">${formatPrice(product.price)}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">-</button>
                        <span class="quantity-display" id="qty-${product.id}">1</span>
                        <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                    </div>
                    <button class="btn btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Ajouter au panier
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Gestion des quantités
const quantities = {};

function getQuantity(productId) {
    return quantities[productId] || 1;
}

function updateQuantityDisplay(productId) {
    const display = document.getElementById(`qty-${productId}`);
    if (display) {
        display.textContent = getQuantity(productId);
    }
}

function increaseQuantity(productId) {
    quantities[productId] = getQuantity(productId) + 1;
    updateQuantityDisplay(productId);
}

function decreaseQuantity(productId) {
    const current = getQuantity(productId);
    if (current > 1) {
        quantities[productId] = current - 1;
        updateQuantityDisplay(productId);
    }
}

// Gestion du panier
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const quantity = getQuantity(productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    // Réinitialiser la quantité
    quantities[productId] = 1;
    updateQuantityDisplay(productId);
    
    updateCartDisplay();
    showNotification('Produit ajouté au panier !');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    showNotification('Produit retiré du panier');
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = formatPrice(totalPrice);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-muted">Votre panier est vide</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)} x ${item.quantity}</div>
                    <div><strong>${formatPrice(item.price * item.quantity)}</strong></div>
                </div>
                <i class="fas fa-trash cart-item-remove" onclick="removeFromCart(${item.id})"></i>
            </div>
        `).join('');
    }
}

// Filtres
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            currentFilter = filter;
            renderProducts(filter);
        });
    });
}

// Options de livraison
function setupDeliveryOptions() {
    const deliveryRadio = document.getElementById('delivery');
    const pickupRadio = document.getElementById('pickup');
    const deliveryAddress = document.getElementById('deliveryAddress');
    
    if (deliveryRadio && pickupRadio) {
        deliveryRadio.addEventListener('change', function() {
            if (this.checked) {
                deliveryAddress.style.display = 'block';
            }
        });
        
        pickupRadio.addEventListener('change', function() {
            if (this.checked) {
                deliveryAddress.style.display = 'none';
            }
        });
    }
}

// Procéder au paiement
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Votre panier est vide !', 'error');
        return;
    }
    
    const modal = new bootstrap.Modal(document.getElementById('deliveryModal'));
    modal.show();
}

// Confirmation de commande
function confirmOrder() {
    const deliveryOption = document.querySelector('input[name="deliveryOption"]:checked').value;
    const addressInput = document.getElementById('addressInput');
    
    let message = '*Nouvelle commande*\n\n';
    message += '*Produits:*\n';
    
    cart.forEach(item => {
        message += `- ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `\n*Total: ${formatPrice(total)}*\n\n`;
    
    if (deliveryOption === 'delivery') {
        const address = addressInput.value.trim();
        if (!address) {
            showNotification('Veuillez entrer votre adresse de livraison', 'error');
            return;
        }
        message += `*Livraison à:* ${address}`;
    } else {
        message += `*Retrait en boutique*\n`;
        message += `📍 Adresse: ${CONFIG.shopAddress}\n`;
        message += `📞 Tél: ${CONFIG.shopPhone}`;
        
        showPickupConfirmation();
    }
    
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Fermer le modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('deliveryModal'));
    modal.hide();
    
    // Vider le panier
    cart = [];
    updateCartDisplay();
    
    showNotification('Redirection vers WhatsApp...', 'success');
}

// Afficher confirmation de retrait
function showPickupConfirmation() {
    const confirmHtml = `
        <div class="alert alert-info alert-dismissible fade show mt-3" role="alert">
            <h5><i class="fas fa-info-circle"></i> Informations de retrait</h5>
            <p><strong>Adresse:</strong> ${CONFIG.shopAddress}</p>
            <p><strong>Téléphone:</strong> ${CONFIG.shopPhone}</p>
            <p>Merci de votre commande ! Vous pouvez venir retirer vos produits à notre boutique.</p>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const container = document.querySelector('.container');
    const alertDiv = document.createElement('div');
    alertDiv.innerHTML = confirmHtml;
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 8000);
}

// Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
        ${message}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Formatage du prix
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price) + ' ' + CONFIG.currency;
}

// Navigation smooth
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});