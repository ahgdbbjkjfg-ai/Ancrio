/* ============================
   ANCRIO E-COMMERCE - JAVASCRIPT
   ============================ */

// Product Database
const products = [
    {
        id: 1,
        name: 'Premium Black T-Shirt',
        category: 't-shirts',
        collection: 'casual',
        price: 799,
        originalPrice: 999,
        image: '👕',
        description: 'Premium 100% cotton t-shirt with comfortable fit. Crafted for everyday wear with Indian comfort standards.',
        stock: 25,
        rating: 4.5,
        reviews: 0,
        isNew: true
    },
    {
        id: 2,
        name: 'Classic White T-Shirt',
        category: 't-shirts',
        collection: 'casual',
        price: 699,
        originalPrice: 899,
        image: '🤍',
        description: 'Timeless white t-shirt perfect for Indian summers. Made from 100% premium cotton.',
        stock: 30,
        rating: 4.8,
        reviews: 0,
        isNew: false
    },
    {
        id: 3,
        name: 'Luxury Hoodie - Black',
        category: 'hoodies',
        collection: 'casual',
        price: 1399,
        originalPrice: 1799,
        image: '🖤',
        description: 'Ultra-soft luxury hoodie for Indian winters. Premium materials with premium comfort.',
        stock: 15,
        rating: 4.7,
        reviews: 0,
        isNew: true
    },
    {
        id: 4,
        name: 'Gray Hoodie Collection',
        category: 'hoodies',
        collection: 'sporty',
        price: 1299,
        originalPrice: 1699,
        image: '🩶',
        description: 'Modern gray hoodie with breathable fabric. Perfect for Indian metro lifestyle.',
        stock: 20,
        rating: 4.6,
        reviews: 0,
        isNew: true
    },
    {
        id: 5,
        name: 'Elegant Denim Jacket',
        category: 'jackets',
        collection: 'formal',
        price: 1999,
        originalPrice: 2599,
        image: '🧥',
        description: 'Classic denim jacket with modern twist. Made for Indian fashion enthusiasts.',
        stock: 12,
        rating: 4.9,
        reviews: 0,
        isNew: false
    },
    {
        id: 6,
        name: 'Premium Leather Jacket',
        category: 'jackets',
        collection: 'formal',
        price: 3199,
        originalPrice: 3999,
        image: '🖤',
        description: 'Sophisticated leather jacket with genuine materials. Perfect for Indian celebrations.',
        stock: 8,
        rating: 5.0,
        reviews: 0,
        isNew: true
    },
    {
        id: 7,
        name: 'Designer Sunglasses',
        category: 'accessories',
        collection: 'premium',
        price: 1599,
        originalPrice: 1999,
        image: '😎',
        description: 'UV-protected designer sunglasses. Perfect for Indian summers with premium protection.',
        stock: 40,
        rating: 4.5,
        reviews: 0,
        isNew: false
    },
    {
        id: 8,
        name: 'Premium Watch',
        category: 'accessories',
        collection: 'premium',
        price: 2999,
        originalPrice: 3999,
        image: '⌚',
        description: 'Luxury watch with precision movement. An Indian favorite for any occasion.',
        stock: 18,
        rating: 4.8,
        reviews: 0,
        isNew: true
    },
    {
        id: 9,
        name: 'Silk Scarf Collection',
        category: 'accessories',
        collection: 'premium',
        price: 899,
        originalPrice: 1199,
        image: '🎀',
        description: 'Luxurious Indian silk scarf with beautiful patterns. Perfect for Indian wear.',
        stock: 35,
        rating: 4.7,
        reviews: 0,
        isNew: true
    },
    {
        id: 10,
        name: 'Canvas Sneakers',
        category: 'accessories',
        collection: 'casual',
        price: 1199,
        originalPrice: 1599,
        image: '👟',
        description: 'Comfortable canvas sneakers for Indian streets. Durable and stylish.',
        stock: 50,
        rating: 4.6,
        reviews: 0,
        isNew: false
    },
    {
        id: 11,
        name: 'Premium Poster - Fashion',
        category: 'accessories',
        collection: 'casual',
        price: 499,
        originalPrice: 699,
        image: '🖼️',
        description: 'High-quality fashion poster. Perfect for Indian homes and studios.',
        stock: 100,
        rating: 4.4,
        reviews: 0,
        isNew: false
    },
    {
        id: 12,
        name: 'Designer Backpack',
        category: 'accessories',
        collection: 'sporty',
        price: 1799,
        originalPrice: 2399,
        image: '🎒',
        description: 'Versatile designer backpack for Indian travelers. Multiple compartments for convenience.',
        stock: 22,
        rating: 4.7,
        reviews: 0,
        isNew: true
    }
];

// Offers Database
let offers = [
    { id: 1, name: 'Summer Sale', discount: 20, category: '', endDate: '2026-02-28' },
    { id: 2, name: 'Accessories Discount', discount: 15, category: 'accessories', endDate: '2026-02-15' }
];

// Support configuration
const SUPPORT_WHATSAPP_NUMBER = '919279559939'; // Replace with your WhatsApp business number (country code + number)
const OPENAI_MODEL = 'gpt-3.5-turbo'; // Change to gpt-4o-mini or gpt-4 if you have access

function formatWhatsAppNumber(number) {
    if (!number) return '';
    // Format as +91 79999 99999 for easier reading (India style)
    if (number.startsWith('91') && number.length === 12) {
        return `+91 ${number.slice(2, 7)} ${number.slice(7)}`;
    }
    return number;
}

// State Management
let currentUser = null;
let cart = [];
let wishlist = [];
let reviews = {};
let orders = [];
let currentPage = 'home';
let currentProductId = null;
let currentReviewRating = 0;
let selectedSize = null;
let currentProduct = null;

// Unified Marketplace Products Array (from all sellers)
let marketplaceProducts = [];

// Seller's personal products (for seller dashboard)
let sellerProducts = [
    { id: 201, name: 'Cyber Luxe Jacket', category: 'streetwear', price: 2199, stock: 34, status: 'Active', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=80', description: 'Premium cyber streetwear jacket with futuristic design.' },
    { id: 202, name: 'Sonic Runner Sneakers', category: 'sneakers', price: 3499, stock: 18, status: 'Active', image: 'https://images.unsplash.com/photo-1519741491332-0f7c39f40bd8?auto=format&fit=crop&w=500&q=80', description: 'High-performance running sneakers with advanced comfort.' },
    { id: 203, name: 'Neon Anime Tee', category: 'anime', price: 799, stock: 92, status: 'Active', image: 'https://images.unsplash.com/photo-1530845643445-4c0b992f8b7a?auto=format&fit=crop&w=500&q=80', description: 'Limited edition neon anime graphic tee.' }
];

let sellerOrders = [
    { id: 'ORD-5782', customer: 'Nisha M.', total: '₹3,249', status: 'Dispatching', date: 'Apr 25' },
    { id: 'ORD-5810', customer: 'Rajeev K.', total: '₹1,799', status: 'Preparing', date: 'Apr 24' },
    { id: 'ORD-5893', customer: 'Aarav S.', total: '₹2,949', status: 'Delivered', date: 'Apr 23' }
];

let sellerNotifications = [
    { id: 1, message: 'New order received from Nisha M.', time: '10m ago' },
    { id: 2, message: 'Stock low for Neon Anime Tee.', time: '1h ago' },
    { id: 3, message: 'Payout processed to your account.', time: 'Yesterday' }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    // Initialize splash screen and premium entrance
    initializeSplashScreen();
    
    loadFromStorage();
    initializeApp();
    setTimeout(() => {
        updateAllUI();
    }, 2800);
    
    // Initialize scroll animations
    initializeScrollAnimations();
    addFloatingAnimations();
    addEntranceAnimations();
});

/* ============================
   PREMIUM SPLASH SCREEN & ENTRANCE
   ============================ */

function initializeSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    
    if (splashScreen) {
        // Hide splash after animation completes (5.5 seconds total - slower, more premium)
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            
            // Animate main content entrance
            const mainContent = document.querySelector('main.main-content');
            if (mainContent) {
                mainContent.style.animation = 'fadeIn 1s ease-out';
            }
            
            // Animate navbar
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                navbar.style.animation = 'slideInDown 0.8s ease-out';
            }
        }, 5500);
    }
}

/* ============================
   SCROLL ANIMATIONS & PARALLAX
   ============================ */

function initializeScrollAnimations() {
    // Create Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add appropriate animation based on data attribute
                const animationType = element.dataset.animation || 'slide-in-up';
                element.classList.add(animationType);
                
                // Add stagger delay for child elements
                const children = element.querySelectorAll('[data-stagger]');
                children.forEach((child, index) => {
                    child.classList.add(`stagger-delay-${Math.min(index + 1, 6)}`);
                    child.classList.add(animationType);
                });
                
                // Stop observing after animation
                observer.unobserve(element);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all elements with data-animation attribute
    document.querySelectorAll('[data-animation]').forEach(el => {
        observer.observe(el);
    });
    
    // Auto add animations to major sections
    const sectionsToAnimate = [
        '.hero-premium',
        '.category-showcase',
        '.trending-section',
        '.arrivals-section',
        '.premium-features',
        '.flash-banner',
        '.testimonials',
        '.cta-final',
        '.story-header',
        '.story-content'
    ];
    
    sectionsToAnimate.forEach(selector => {
        const element = document.querySelector(selector);
        if (element && !element.dataset.animation) {
            element.dataset.animation = 'slide-in-up';
            observer.observe(element);
        }
    });
}

function addFloatingAnimations() {
    // Add floating animation to specific elements
    const floatingElements = [
        '.hero-emoji',
        '.hero-shape',
        '.category-icon',
        '.feature-icon',
        '.value-icon'
    ];
    
    floatingElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('floating');
        });
    });
}

function addEntranceAnimations() {
    // Animate hero section on page load
    const heroSection = document.querySelector('.hero-premium');
    if (heroSection) {
        heroSection.classList.add('slide-in-up');
    }
    
    // Animate navigation
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.add('slide-in-down');
    }
    
    // Add entrance animations to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('scale-in');
    });
}

/* ============================
   PARALLAX SCROLL EFFECT
   ============================ */

window.addEventListener('scroll', () => {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-premium');
    if (heroSection) {
        const scrollY = window.scrollY;
        const offset = scrollY * 0.5;
        heroSection.style.transform = `translateY(${offset}px)`;
    }
    
    // Parallax effect for background
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const speed = element.dataset.parallax || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

/* ============================
   ANIMATION TRIGGERS
   ============================ */

function triggerAnimation(element, animationClass) {
    element.classList.remove(animationClass);
    void element.offsetWidth; // Trigger reflow
    element.classList.add(animationClass);
}

// Trigger animations on button clicks
document.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
        const button = e.target.closest('button');
        triggerAnimation(button, 'scale-in');
    }
});

/* ============================
   MOUSE MOVEMENT PARALLAX
   ============================ */

document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 10;
    const mouseY = (e.clientY / window.innerHeight) * 10;
    
    // Apply subtle parallax to hero elements
    const heroShape = document.querySelector('.hero-shape');
    if (heroShape) {
        heroShape.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    }
    
    // Apply subtle parallax to other elements
    const parallaxElements = document.querySelectorAll('.floating');
    parallaxElements.forEach((el, index) => {
        if (index < 5) { // Limit to first 5 for performance
            el.style.transform = `translate(${mouseX * 0.1}px, ${mouseY * 0.1}px)`;
        }
    });
});

// Initialize App
function initializeApp() {
    buildMarketplaceProducts();
    renderNewArrivals();
    renderShopGrid();
    updateCartBadge();
    updateWishlistBadge();
    checkUserLogin();
}

// Build unified marketplace products from all sources
function buildMarketplaceProducts() {
    marketplaceProducts = [
        // Convert demo products to marketplace format
        ...products.map(p => ({
            id: p.id,
            sellerId: 'demo-seller-' + p.id,
            sellerName: 'ANCRIO Curated',
            storeName: 'Official Store',
            title: p.name,
            description: p.description || 'Premium product from ANCRIO curated collection.',
            category: p.category,
            price: p.price,
            originalPrice: p.originalPrice || p.price,
            discount: Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) || 0,
            stock: p.stock,
            rating: p.rating || 4.5,
            soldCount: Math.floor(Math.random() * 500) + 50,
            tags: [p.collection, 'official'],
            variants: [],
            images: [p.image],
            featured: p.isNew || false,
            trending: p.isNew || false,
            createdAt: new Date().toLocaleDateString('en-IN')
        })),
        // Add seller uploaded products
        ...sellerProducts.map(p => ({
            id: p.id,
            sellerId: 'seller-' + p.id,
            sellerName: 'Premium Seller',
            storeName: 'Luxury Store',
            title: p.name,
            description: p.description || 'Premium marketplace product',
            category: p.category,
            price: p.price,
            originalPrice: p.price + Math.round(p.price * 0.15),
            discount: 15,
            stock: p.stock,
            rating: 4.6,
            soldCount: Math.floor(Math.random() * 300) + 20,
            tags: [p.category, 'seller-verified'],
            variants: p.variants || [],
            images: Array.isArray(p.images) ? p.images : [p.image],
            featured: false,
            trending: true,
            createdAt: p.createdAt || new Date().toLocaleDateString('en-IN')
        }))
    ];
}

// Load data from localStorage
function loadFromStorage() {
    const savedUser = localStorage.getItem('luxeUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }

    const savedCart = localStorage.getItem('luxeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }

    const savedWishlist = localStorage.getItem('luxeWishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
    }

    const savedReviews = localStorage.getItem('luxeReviews');
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    }

    const savedOrders = localStorage.getItem('luxeOrders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders);
    }

    const savedOffers = localStorage.getItem('luxeOffers');
    if (savedOffers) {
        offers = JSON.parse(savedOffers);
    }
}

// Save to localStorage
function saveToStorage() {
    localStorage.setItem('luxeCart', JSON.stringify(cart));
    localStorage.setItem('luxeWishlist', JSON.stringify(wishlist));
    localStorage.setItem('luxeReviews', JSON.stringify(reviews));
    localStorage.setItem('luxeOrders', JSON.stringify(orders));
    localStorage.setItem('luxeOffers', JSON.stringify(offers));
}

// Navigation
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
    
    currentPage = page;
    window.scrollTo(0, 0);

    // Handle specific page rendering
    if (page === 'shop') {
        renderShopGrid();
    } else if (page === 'new-arrivals') {
        renderNewArrivalsPage();
    } else if (page === 'collections') {
        // Collections page already has default content
    } else if (page === 'cart') {
        renderCart();
    } else if (page === 'wishlist') {
        renderWishlist();
    } else if (page === 'account') {
        if (!currentUser) {
            openLoginModal();
            return;
        }
        renderAccount();
    } else if (page === 'admin') {
        // Reload data from storage to ensure we have latest orders
        loadFromStorage();
        console.log('🔄 Admin panel opened. Loading data from storage...');
        console.log('📊 Total orders loaded:', orders.length);
        console.log('📋 All orders:', orders);
        updateAdminDashboard();
        renderAdminProducts();
    } else if (page === 'seller-dashboard') {
        renderSellerDashboard();
    }

    // Close mobile menu
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) navMenu.classList.remove('active');
}

function showSellerPanel(panel) {
    // Update sidebar menu items
    const menuItems = document.querySelectorAll('.seller-menu-item');
    menuItems.forEach(btn => {
        if (btn.dataset.panel === panel) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Hide all panels with fade transition
    const allPanels = document.querySelectorAll('.seller-panel');
    allPanels.forEach(p => {
        if (p.classList.contains('active')) {
            p.classList.add('fade-out');
            setTimeout(() => {
                p.classList.remove('active', 'fade-out');
            }, 150);
        }
    });
    
    // Show selected panel with fade-in transition
    setTimeout(() => {
        const panelEl = document.getElementById('seller-panel-' + panel);
        if (panelEl) {
            panelEl.classList.add('active', 'fade-in');
            setTimeout(() => panelEl.classList.remove('fade-in'), 150);
        }
    }, 150);
}

function renderSellerDashboard() {
    showSellerPanel('dashboard');
    renderSellerProductLibrary();
    renderSellerOrders();
    renderSellerNotifications();
}

function renderSellerProductLibrary() {
    const tbody = document.getElementById('sellerProductsTable');
    if (!tbody) return;
    
    if (sellerProducts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;padding:3rem;color:var(--text-secondary);">
                    <div style="font-size:2rem;margin-bottom:0.5rem;">📦</div>
                    <div>No products yet. <a href="#" onclick="showSellerPanel('upload'); return false;" style="color:var(--gold-accent);text-decoration:underline;">Upload your first product</a></div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = sellerProducts.map((product, idx) => `
        <tr style="animation:slideIn 0.3s ease ${idx * 50}ms both;">
            <td><img src="${product.image}" alt="${product.name}" style="width:60px;height:60px;border-radius:14px;object-fit:cover;"></td>
            <td><strong>${product.name}</strong><div style="font-size:0.85rem;color:var(--text-secondary);">${product.category}</div></td>
            <td><strong>${product.stock}</strong><div style="font-size:0.85rem;color:var(--text-secondary);">in stock</div></td>
            <td><strong>₹${product.price.toFixed(0)}</strong>${product.discount ? `<div style="font-size:0.85rem;color:var(--text-secondary);">${product.discount}% off</div>` : ''}</td>
            <td><span class="product-status">${product.status}</span></td>
            <td>
                <button class="action-button" onclick="editSellerProduct(${product.id})" title="Edit">✎</button>
                <button class="action-button" onclick="deleteSellerProduct(${product.id})" title="Delete">🗑</button>
            </td>
        </tr>
    `).join('');
}

function editSellerProduct(productId) {
    const product = sellerProducts.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('sellerProductTitle').value = product.name;
    document.getElementById('sellerProductPrice').value = product.price;
    document.getElementById('sellerProductDiscount').value = product.discount || 0;
    document.getElementById('sellerProductStock').value = product.stock;
    document.getElementById('sellerProductCategory').value = product.category;
    document.getElementById('sellerProductDescription').value = product.description;
    document.getElementById('sellerProductVariants').value = product.variants;
    document.getElementById('sellerProductImagesData').value = JSON.stringify(product.images);
    
    const preview = document.getElementById('sellerImagePreview');
    preview.innerHTML = '';
    product.images.forEach((img, idx) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'image-thumbnail';
        thumbnail.innerHTML = `
            <img src="${img}" alt="Product Image ${idx + 1}">
            <button type="button" class="remove-thumbnail" onclick="removeSellerImageThumbnail(${idx})" title="Remove">×</button>
            <span class="image-number">${idx + 1}</span>
        `;
        preview.appendChild(thumbnail);
    });
    
    showSellerPanel('upload');
    showNotification('Edit mode: Update and save to apply changes.');
}

function deleteSellerProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        sellerProducts = sellerProducts.filter(p => p.id !== productId);
        renderSellerProductLibrary();
        showNotification('Product deleted successfully.');
    }
}

function renderSellerOrders() {
    const ordersList = document.getElementById('sellerOrdersList');
    const recentOrders = document.getElementById('sellerRecentOrders');
    
    if (ordersList) {
        if (sellerOrders.length === 0) {
            ordersList.innerHTML = '<div style="padding:2rem;text-align:center;color:var(--text-secondary);">📭 No orders yet. Keep your product catalog updated to attract customers.</div>';
        } else {
            ordersList.innerHTML = sellerOrders.map((order, idx) => `
                <div class="recent-order-row" style="animation:slideIn 0.3s ease ${idx * 50}ms both;">
                    <div>
                        <strong>${order.id}</strong>
                        <div>${order.customer} · ${order.date}</div>
                    </div>
                    <div style="text-align:right;">
                        <span>${order.total}</span>
                        <div class="product-status">${order.status}</div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    if (recentOrders) {
        if (sellerOrders.length === 0) {
            recentOrders.innerHTML = '<div style="padding:1rem;text-align:center;color:var(--text-secondary);font-size:0.9rem;">Awaiting orders</div>';
        } else {
            recentOrders.innerHTML = sellerOrders.slice(0, 3).map((order, idx) => `
                <div class="recent-order-row" style="animation:slideIn 0.3s ease ${idx * 50}ms both;">
                    <div>
                        <strong>${order.customer}</strong>
                        <div>${order.id}</div>
                    </div>
                    <div>
                        <span class="product-status">${order.status}</span>
                    </div>
                </div>
            `).join('');
        }
    }
}

function renderSellerNotifications() {
    const notificationList = document.getElementById('sellerNotificationsList');
    if (!notificationList) return;
    
    if (sellerNotifications.length === 0) {
        notificationList.innerHTML = '<div style="padding:1rem;text-align:center;color:var(--text-secondary);font-size:0.9rem;">🎉 All caught up!</div>';
    } else {
        notificationList.innerHTML = sellerNotifications.map((note, idx) => `
            <div class="notification-row" style="animation:slideIn 0.3s ease ${idx * 50}ms both;">
                <div>
                    <strong>${note.message}</strong>
                    <div style="font-size:0.85rem;color:var(--text-secondary);margin-top:0.25rem;">${note.time}</div>
                </div>
            </div>
        `).join('');
    }
}

function handleSellerImageUpload(event) {
    const files = Array.from(event.target.files);
    const preview = document.getElementById('sellerImagePreview');
    const imageDataInput = document.getElementById('sellerProductImagesData');

    if (files.length === 0) {
        return;
    }

    // Validate only image files
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
        showNotification('Please select only image files');
        event.target.value = '';
        return;
    }

    // Show max 10 images warning
    if (validFiles.length > 10) {
        showNotification('Maximum 10 images allowed');
        event.target.value = '';
        return;
    }

    const imageDataArray = [];
    let loadedCount = 0;

    preview.innerHTML = '<div class="upload-loading">Processing images...</div>';

    validFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageDataArray[index] = e.target.result;
            loadedCount++;

            if (loadedCount === validFiles.length) {
                // All images loaded
                preview.innerHTML = '';
                imageDataArray.forEach((imgData, idx) => {
                    if (imgData) {
                        const thumbnail = document.createElement('div');
                        thumbnail.className = 'image-thumbnail';
                        thumbnail.innerHTML = `
                            <img src="${imgData}" alt="Product Image ${idx + 1}">
                            <button type="button" class="remove-thumbnail" onclick="removeSellerImageThumbnail(${idx})" title="Remove image">×</button>
                            <span class="image-number">${idx + 1}</span>
                        `;
                        preview.appendChild(thumbnail);
                    }
                });
                imageDataInput.value = JSON.stringify(imageDataArray.filter(Boolean));
                showNotification(`${validFiles.length} image(s) added successfully`);
            }
        };
        reader.onerror = function() {
            showNotification(`Failed to load image: ${file.name}`);
        };
        reader.readAsDataURL(file);
    });
}

function removeSellerImageThumbnail(index) {
    const preview = document.getElementById('sellerImagePreview');
    const thumbnails = preview.querySelectorAll('.image-thumbnail');
    const imageDataInput = document.getElementById('sellerProductImagesData');

    if (thumbnails[index]) {
        // Animate removal
        thumbnails[index].style.animation = 'fadeOut 0.2s ease';
        setTimeout(() => {
            thumbnails[index].remove();
            
            // Update data
            const currentData = JSON.parse(imageDataInput.value || '[]');
            currentData.splice(index, 1);
            imageDataInput.value = JSON.stringify(currentData);
            
            // Refresh all thumbnails with correct indices
            const remainingThumbnails = preview.querySelectorAll('.image-thumbnail');
            remainingThumbnails.forEach((thumb, newIndex) => {
                const numberBadge = thumb.querySelector('.image-number');
                if (numberBadge) numberBadge.textContent = newIndex + 1;
                const removeBtn = thumb.querySelector('.remove-thumbnail');
                if (removeBtn) {
                    removeBtn.onclick = () => removeSellerImageThumbnail(newIndex);
                }
            });
            
            if (currentData.length === 0) {
                preview.innerHTML = '';
            }
        }, 200);
    }
}

function saveSellerProduct(event) {
    event.preventDefault();
    
    const title = document.getElementById('sellerProductTitle').value.trim();
    const price = parseFloat(document.getElementById('sellerProductPrice').value);
    const discount = parseFloat(document.getElementById('sellerProductDiscount').value) || 0;
    const stock = parseInt(document.getElementById('sellerProductStock').value);
    const category = document.getElementById('sellerProductCategory').value;
    const description = document.getElementById('sellerProductDescription').value.trim();
    const variants = document.getElementById('sellerProductVariants').value.trim();
    const imageData = document.getElementById('sellerProductImagesData').value;

    // Validation
    if (!title || !price || !stock || !description) {
        showNotification('Please fill in all required fields.');
        return;
    }

    if (!imageData) {
        showNotification('Please upload at least one product image.');
        return;
    }

    try {
        const imageArray = JSON.parse(imageData);
        if (imageArray.length === 0) {
            showNotification('Please upload at least one product image.');
            return;
        }

        // Validate price and stock
        if (price <= 0) {
            showNotification('Price must be greater than 0.');
            return;
        }
        if (stock < 0) {
            showNotification('Stock cannot be negative.');
            return;
        }
        if (discount < 0 || discount > 100) {
            showNotification('Discount must be between 0 and 100.');
            return;
        }

        // Create product object
        const product = {
            id: Date.now(),
            name: title,
            category,
            price,
            discount,
            stock,
            status: 'Active',
            image: imageArray[0],
            description,
            variants,
            images: imageArray,
            createdAt: new Date().toLocaleDateString('en-IN')
        };

        // Add to seller products
        sellerProducts.unshift(product);
        
        // Reset form
        document.getElementById('sellerProductForm').reset();
        document.getElementById('sellerImagePreview').innerHTML = '';
        document.getElementById('sellerProductImagesData').value = '';
        
        // Show success and navigate
        showNotification(`✓ "${title}" uploaded successfully!`);
        setTimeout(() => {
            renderSellerProductLibrary();
            showSellerPanel('products');
        }, 500);
    } catch (error) {
        console.error('Error saving product:', error);
        showNotification('Error uploading product. Please try again.');
    }
}

// Filter by category
function filterByCategory(category) {
    navigateTo('shop');
    selectedCategory = category;
    renderShopGrid();
}

// Check if user is logged in
function checkUserLogin() {
    const userBtn = document.getElementById('userBtn');
    if (currentUser) {
        userBtn.innerHTML = '<span class="icon">✓</span>';
        userBtn.onclick = () => navigateTo('account');
    } else {
        userBtn.innerHTML = '<span class="icon">👤</span>';
        userBtn.onclick = openLoginModal;
    }
}

// Login/Signup Modal
function openLoginModal() {
    document.getElementById('loginModal').classList.add('active');
    switchLoginTab('login');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('active');
}

function switchLoginTab(tab) {
    document.querySelectorAll('.login-tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.login-tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
    document.querySelector(`[onclick="switchLoginTab('${tab}')"]`).classList.add('active');
}

// Handle Login
function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
        showNotification('Please fill in all fields');
        return;
    }

    const users = JSON.parse(localStorage.getItem('luxeUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('luxeUser', JSON.stringify(user));
        closeLoginModal();
        checkUserLogin();
        showNotification('Login successful!');
    } else {
        showNotification('Invalid email or password');
    }
}

// Handle Admin Login
function handleAdminLogin() {
    const password = document.getElementById('adminPassword').value;

    if (password === 'admin123') {
        currentUser = { id: 'admin_000', name: 'Admin', email: 'admin@ancrio.com', isAdmin: true };
        localStorage.setItem('luxeUser', JSON.stringify(currentUser));
        closeLoginModal();
        checkUserLogin();
        loadFromStorage();
        console.log('📊 Admin logged in. Total orders in localStorage:', orders.length);
        console.log('All orders:', orders);
        updateAdminDashboard();
        navigateTo('admin');
        showNotification('Admin panel accessed');
    } else {
        showNotification('Invalid admin password');
    }
}

// Handle Signup
function handleSignup() {
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        showNotification('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('Passwords do not match');
        return;
    }

    let users = JSON.parse(localStorage.getItem('luxeUsers') || '[]');
    
    if (users.find(u => u.email === email)) {
        showNotification('Email already registered');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        joinDate: new Date().toLocaleDateString()
    };

    users.push(newUser);
    localStorage.setItem('luxeUsers', JSON.stringify(users));

    currentUser = newUser;
    localStorage.setItem('luxeUser', JSON.stringify(newUser));
    closeLoginModal();
    checkUserLogin();
    showNotification('Account created successfully!');
}

// Logout
function logout() {
    currentUser = null;
    localStorage.removeItem('luxeUser');
    checkUserLogin();
    navigateTo('home');
    showNotification('Logged out successfully');
}

// Product Grid Rendering
function renderShopGrid() {
    const grid = document.getElementById('shopGrid');
    grid.innerHTML = '';

    let filteredProducts = [...products];

    // Apply filters
    const categoryCheckboxes = document.querySelectorAll('.filter-checkbox input:checked');
    const selectedCategories = Array.from(categoryCheckboxes).map(cb => cb.value).filter(v => v !== 'all');
    
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(p => selectedCategories.includes(p.category));
    }

    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || 500;
    
    filteredProducts = filteredProducts.filter(p => {
        const finalPrice = applyDiscount(p);
        return finalPrice >= minPrice && finalPrice <= maxPrice;
    });

    filteredProducts.forEach(product => {
        grid.appendChild(createProductCard(product));
    });

    if (filteredProducts.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No products found</p>';
    }
}

function renderNewArrivals() {
    const newProducts = products.filter(p => p.isNew).slice(0, 8);
    const grid = document.getElementById('newArrivalsGrid');
    grid.innerHTML = '';
    newProducts.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
    
    // Also render trending section
    renderTrendingProducts();
}

function renderTrendingProducts() {
    const trendingProducts = products.slice(0, 8);
    const grid = document.getElementById('trendingGrid');
    if (grid) {
        grid.innerHTML = '';
        trendingProducts.forEach(product => {
            grid.appendChild(createProductCard(product));
        });
    }
}

function renderNewArrivalsPage() {
    const newProducts = products.filter(p => p.isNew);
    const grid = document.getElementById('newArrivalsPageGrid');
    grid.innerHTML = '';
    newProducts.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card scale-in';
    card.dataset.stagger = true;
    
    const finalPrice = applyDiscount(product);
    const discount = product.originalPrice ? Math.round(((product.originalPrice - finalPrice) / product.originalPrice) * 100) : 0;
    const savings = product.originalPrice ? (product.originalPrice - finalPrice).toFixed(2) : 0;
    
    const isInWishlist = wishlist.some(item => item.id === product.id);

    card.innerHTML = `
        <div class="product-image" onclick="openProductDetail(${product.id})">
            ${renderProductImage(product.image)}
            ${discount > 0 ? `<span class="discount-badge">-${discount}%<br><small>Save ₹${Math.round(savings)}</small></span>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-name" onclick="openProductDetail(${product.id})">${product.name}</h3>
            <div class="product-rating">
                <span class="stars">${renderStars(product.rating)}</span>
                <span class="review-count">(${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="price">₹${Math.round(finalPrice)}</span>
                ${product.originalPrice ? `<span class="original-price">₹${Math.round(product.originalPrice)}</span>` : ''}
            </div>
            <div class="product-action">
                <button onclick="addToCart(${product.id})">Add Cart</button>
                <button onclick="toggleWishlistProduct(${product.id})" style="background: ${isInWishlist ? 'var(--gold-accent)' : 'var(--tertiary-dark)'};color: ${isInWishlist ? 'var(--primary-dark)' : 'var(--text-primary)'};">♡</button>
            </div>
        </div>
    `;

    card.style.cursor = 'pointer';
    card.onclick = () => openProductDetail(product.id);

    return card;
}

// Render Stars
function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalf) stars += '✦';
    stars += '☆'.repeat(5 - Math.ceil(rating));
    return stars;
}

// Apply Discount
function applyDiscount(product) {
    let finalPrice = product.price;
    
    const applicableOffers = offers.filter(offer => 
        (!offer.category || offer.category === product.category) &&
        new Date(offer.endDate) > new Date()
    );

    if (applicableOffers.length > 0) {
        const maxDiscount = Math.max(...applicableOffers.map(o => o.discount));
        finalPrice = product.price * (1 - maxDiscount / 100);
    }

    return finalPrice;
}

// Filter Products
function filterProducts() {
    renderShopGrid();
}

function resetFilters() {
    document.querySelectorAll('.filter-checkbox input').forEach(cb => cb.checked = false);
    document.getElementById('minPrice').value = 0;
    document.getElementById('maxPrice').value = 5000;
    renderShopGrid();
}

// Collection Filter
function filterByCollection(collection) {
    navigateTo('collections');
    const filteredProducts = products.filter(p => p.collection === collection);
    const grid = document.getElementById('collectionGrid');
    grid.innerHTML = '';
    filteredProducts.forEach(product => {
        grid.appendChild(createProductCard(product));
    });
}

// Product Detail Page
function openProductDetail(productId) {
    currentProductId = productId;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const detailImage = document.getElementById('detailImage');
    const detailImageAlt = document.getElementById('detailImageAlt');
    if (isImageSource(product.image)) {
        detailImage.src = product.image;
        detailImage.style.display = 'block';
        detailImageAlt.style.display = 'none';
        detailImageAlt.textContent = '';
    } else {
        detailImage.src = '';
        detailImage.style.display = 'none';
        detailImageAlt.style.display = 'flex';
        detailImageAlt.textContent = product.image || '📦';
    }
    
    document.getElementById('detailName').textContent = product.name;
    
    const finalPrice = applyDiscount(product);
    const discount = product.originalPrice ? Math.round(((product.originalPrice - finalPrice) / product.originalPrice) * 100) : 0;
    
    document.getElementById('detailPrice').textContent = `₹${Math.round(finalPrice)}`;
    document.getElementById('detailOriginalPrice').textContent = product.originalPrice ? `₹${Math.round(product.originalPrice)}` : '';
    document.getElementById('detailDiscount').textContent = discount > 0 ? `-${discount}%` : '';
    document.getElementById('detailDescription').textContent = product.description;
    
    const ratingCount = Object.keys(reviews).filter(key => reviews[key].some(r => r.productId === productId)).length;
    document.getElementById('detailRating').innerHTML = renderStars(product.rating);
    document.getElementById('detailReviewCount').textContent = `${ratingCount} reviews`;

    // Size options
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const sizeOptions = document.getElementById('sizeOptions');
    sizeOptions.innerHTML = '';
    sizes.forEach(size => {
        const btn = document.createElement('button');
        btn.className = 'size-option';
        btn.textContent = size;
        btn.onclick = () => selectSize(size);
        sizeOptions.appendChild(btn);
    });

    selectedSize = null;
    document.getElementById('quantity').value = 1;

    // Update wishlist button
    const wishlistBtn = document.getElementById('wishlistBtn');
    const isInWishlist = wishlist.some(item => item.id === productId);
    wishlistBtn.classList.toggle('added', isInWishlist);

    // Related Products
    const relatedProducts = products.filter(p => p.category === product.category && p.id !== productId).slice(0, 6);
    const relatedGrid = document.getElementById('relatedProducts');
    relatedGrid.innerHTML = '';
    relatedProducts.forEach(p => {
        relatedGrid.appendChild(createProductCard(p));
    });

    // Load and display reviews
    loadProductReviews(productId);

    navigateTo('product-detail');
}

function selectSize(size) {
    selectedSize = size;
    // Use safe button selection instead of event.target
    const allSizeButtons = document.querySelectorAll('.size-option');
    allSizeButtons.forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent.trim() === size) {
            btn.classList.add('selected');
        }
    });
}

function increaseQuantity() {
    document.getElementById('quantity').value = parseInt(document.getElementById('quantity').value) + 1;
}

function decreaseQuantity() {
    const current = parseInt(document.getElementById('quantity').value);
    if (current > 1) {
        document.getElementById('quantity').value = current - 1;
    }
}

// Add to Cart - IMPROVED WITH ERROR HANDLING
function addToCart(productId = null) {
    try {
        // Step 1: Validate product ID
        const id = productId || currentProductId;
        
        if (!id || id === undefined || id === null) {
            showNotification('❌ Error: Could not identify product. Please refresh and try again.', 'error');
            console.error('addToCart failed: No valid product ID provided');
            return false;
        }
        
        // Step 2: Find product
        const product = products.find(p => p.id === id);
        
        if (!product) {
            showNotification('❌ Product not found. Please refresh the page.', 'error');
            console.error(`addToCart failed: Product ${id} not found in database`);
            return false;
        }
        
        // Step 3: Validate quantity (if from detail page)
        let quantity = 1;
        if (!productId) {
            const quantityInput = document.getElementById('quantity');
            if (!quantityInput) {
                showNotification('⚠️ Quantity selector not found. Using quantity: 1', 'warning');
                quantity = 1;
            } else {
                quantity = parseInt(quantityInput.value) || 1;
                if (isNaN(quantity) || quantity < 1 || quantity > 100) {
                    showNotification('❌ Please select a valid quantity (1-100)', 'error');
                    return false;
                }
            }
        }
        
        // Step 4: Validate/set size - SIZE IS MANDATORY
        let size = null;
        if (!productId) {
            // When called from product detail page
            size = selectedSize;
            if (!size) {
                showNotification('⚠️ Please select a size before adding to cart', 'error');
                return false;
            }
        }
        
        // Step 5: Check stock availability
        if (product.stock <= 0) {
            showNotification('❌ Sorry, this item is out of stock', 'error');
            return false;
        }
        
        // Step 6: Create cart item
        const cartItem = {
            id: Date.now(),
            productId: product.id,
            name: product.name,
            price: applyDiscount(product),
            originalPrice: product.originalPrice,
            quantity: quantity,
            size: size,
            image: product.image,
            addedAt: new Date().toISOString()
        };
        
        // Step 7: Add to cart with error handling
        try {
            cart.push(cartItem);
            saveToStorage();
            updateCartBadge();
            
            // Success notification
            showNotification(`✅ ${product.name} added to cart!`, 'success');
            
            return true;
        } catch (storageError) {
            // Handle localStorage quota exceeded or other storage errors
            console.error('Storage error when adding to cart:', storageError);
            showNotification('⚠️ Cart temporarily unavailable. Trying alternative method...', 'warning');
            
            // Fallback: Offer direct checkout
            suggestDirectCheckout(product, quantity, size);
            return false;
        }
        
    } catch (error) {
        // Catch any unexpected errors
        console.error('Unexpected error in addToCart:', error);
        showNotification('❌ Something went wrong. Please try again or contact support: 9279559939', 'error');
        return false;
    }
}

// FALLBACK: Direct checkout if cart fails
function suggestDirectCheckout(product, quantity = 1, size = null) {
    const userConfirmed = confirm(
        `${product.name} is ready to buy!\n\n` +
        `Since cart is temporarily unavailable, would you like to proceed to checkout directly?`
    );
    
    if (userConfirmed) {
        try {
            // Create temporary cart with just this item
            const tempCart = [{
                id: Date.now(),
                productId: product.id,
                name: product.name,
                price: applyDiscount(product),
                originalPrice: product.originalPrice,
                quantity: quantity || 1,
                size: size || null,
                image: product.image
            }];
            
            // Store in temporary session storage
            sessionStorage.setItem('tempCart', JSON.stringify(tempCart));
            
            // Open checkout modal
            checkoutWithTemp();
        } catch (e) {
            console.error('Fallback checkout error:', e);
            showNotification('❌ Checkout unavailable. Contact support: 9279559939', 'error');
        }
    }
}

// Improved notification function with type styling
function showNotification(message, type = 'info') {
    try {
        // Remove existing notification if any
        const existing = document.querySelector('.notification-popup');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification-popup notification-${type}`;
        notification.setAttribute('role', 'alert');
        
        // Color coding
        const colors = {
            success: '#51cf66',  // Green
            error: '#ff6b6b',    // Red
            warning: '#ffd93d',  // Yellow
            info: '#4dabf7'      // Blue
        };
        
        const textColor = type === 'warning' ? '#000' : '#fff';
        const bgColor = colors[type] || colors.info;
        
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: ${textColor};
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-weight: 500;
            max-width: 350px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInNotification 0.3s ease-out;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutNotification 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 4000);
    } catch (e) {
        // Fallback: use alert if DOM manipulation fails
        console.warn('Notification system error, using fallback alert');
        console.log(`[${type.toUpperCase()}] ${message}`);
    }
}

// Buy Now - Add to cart and direct checkout
function buyNow() {
    try {
        const product = products.find(p => p.id === currentProductId);
        
        if (!product) {
            showNotification('❌ Product not found', 'error');
            return false;
        }

        // SIZE IS MANDATORY - must be selected
        if (!selectedSize) {
            showNotification('⚠️ Please select a size before proceeding', 'error');
            return false;
        }

        // Get quantity
        const quantityEl = document.getElementById('quantity');
        const quantity = quantityEl ? parseInt(quantityEl.value) || 1 : 1;
        
        if (isNaN(quantity) || quantity < 1 || quantity > 100) {
            showNotification('❌ Invalid quantity', 'error');
            return false;
        }

        // Check stock
        if (product.stock <= 0) {
            showNotification('❌ Out of stock', 'error');
            return false;
        }

        // Create cart item
        const cartItem = {
            id: Date.now(),
            productId: product.id,
            name: product.name,
            price: applyDiscount(product),
            originalPrice: product.originalPrice,
            quantity: quantity,
            size: selectedSize,
            image: product.image,
            addedAt: new Date().toISOString()
        };

        // Add to cart
        cart.push(cartItem);
        saveToStorage();
        updateCartBadge();
        
        showNotification(`✅ ${product.name} (Size: ${selectedSize}) added! Proceeding to checkout...`, 'success');
        
        // Open checkout after brief delay
        setTimeout(() => {
            checkout();
        }, 600);
        
        return true;
    } catch (error) {
        console.error('buyNow error:', error);
        showNotification('❌ Something went wrong. Please try again or contact 9279559939', 'error');
        return false;
    }
}

// Cart Functions
function renderCart() {
    const cartList = document.getElementById('cartItemsList');
    
    if (cart.length === 0) {
        document.getElementById('emptyMessage').style.display = 'block';
        document.getElementById('emptyText').textContent = 'Your cart is empty';
        cartList.innerHTML = '';
        document.querySelector('.cart-container').style.display = 'none';
        return;
    }

    document.getElementById('emptyMessage').style.display = 'none';
    document.querySelector('.cart-container').style.display = 'grid';

    cartList.innerHTML = '';

    let subtotal = 0;

    cart.forEach(item => {
        subtotal += item.price * item.quantity;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>${item.size ? 'Size: ' + item.size : ''}</p>
                <div class="cart-item-price">₹${Math.round(item.price * item.quantity)}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartList.appendChild(itemDiv);
    });

    document.getElementById('subtotal').textContent = `₹${Math.round(subtotal)}`;
    document.getElementById('shipping').textContent = subtotal > 500 ? 'Free' : '₹99';
    const total = subtotal + (subtotal > 500 ? 0 : 99);
    document.getElementById('total').textContent = `₹${Math.round(total)}`;
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveToStorage();
            renderCart();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    saveToStorage();
    updateCartBadge();
    renderCart();
    showNotification('Item removed from cart');
}

function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartBadge').textContent = total > 0 ? total : '0';
}

// Checkout
function checkout() {
    if (!currentUser) {
        openLoginModal();
        return;
    }

    const total = parseFloat(document.getElementById('total').textContent.replace('₹', ''));
    document.getElementById('checkoutTotal').textContent = `₹${Math.round(total)}`;
    
    if (currentUser) {
        document.getElementById('checkoutName').value = currentUser.name;
        document.getElementById('checkoutEmail').value = currentUser.email;
    }

    document.getElementById('checkoutModal').classList.add('active');
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').classList.remove('active');
}

function placeOrder() {
    const name = document.getElementById('checkoutName').value;
    const email = document.getElementById('checkoutEmail').value;
    const address = document.getElementById('checkoutAddress').value;
    const city = document.getElementById('checkoutCity').value;
    const zip = document.getElementById('checkoutZip').value;

    if (!name || !email || !address || !city || !zip) {
        showNotification('Please fill in all fields');
        return;
    }

    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = 0; // Free shipping
    const taxAmount = Math.round(subtotal * 0.05); // 5% tax
    const total = subtotal + shippingCost + taxAmount;
    
    // Calculate estimated delivery date (5-7 business days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 6);

    const order = {
        id: Date.now(),
        userId: currentUser ? currentUser.id : null,
        customerName: name,
        customerEmail: email,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
        })),
        subtotal: subtotal,
        tax: taxAmount,
        shipping: shippingCost,
        total: total,
        paymentMethod: 'Credit Card', // Default - can be enhanced
        couponApplied: null,
        discountAmount: 0,
        date: new Date().toISOString(),
        orderedDate: new Date().toLocaleDateString('en-IN'),
        status: 'Processing',
        estimatedDeliveryDate: deliveryDate.toISOString(),
        actualDeliveryDate: null,
        shippingAddress: `${address}, ${city} ${zip}`,
        deliveryPreferences: {
            leaveAtDoor: false,
            preferredTimeSlot: 'Anytime'
        },
        trackingNumber: 'TRK' + String(Date.now()).slice(-8),
        canCancel: true,
        returnEligible: false,
        returnWindow: null,
        refundStatus: null,
        returnRequest: null,
        reviews: [],
        trackingHistory: [
            { status: 'Processing', date: new Date().toISOString(), message: 'Order received and being prepared' }
        ]
    };

    orders.push(order);
    console.log('✅ Order placed successfully:', order);
    console.log('📦 Total orders after placement:', orders.length);
    console.log('💾 Saving to localStorage...');
    cart = [];
    saveToStorage();
    console.log('✅ Saved to localStorage. luxeOrders:', JSON.parse(localStorage.getItem('luxeOrders')));
    updateCartBadge();
    closeCheckoutModal();
    navigateTo('home');
    showNotification('Order placed successfully! You will receive a confirmation email shortly.');
}

// Wishlist Functions
function toggleWishlist() {
    toggleWishlistProduct(currentProductId);
}

function toggleWishlistProduct(productId) {
    const product = products.find(p => p.id === productId);
    const exists = wishlist.some(item => item.id === productId);

    if (exists) {
        wishlist = wishlist.filter(item => item.id !== productId);
        showNotification('Removed from wishlist');
    } else {
        wishlist.push({
            id: product.id,
            name: product.name,
            price: applyDiscount(product),
            image: product.image,
            originalPrice: product.originalPrice
        });
        showNotification('Added to wishlist!');
    }

    saveToStorage();
    updateWishlistBadge();

    if (currentProductId === productId) {
        const wishlistBtn = document.getElementById('wishlistBtn');
        wishlistBtn.classList.toggle('added');
    }
}

function renderWishlist() {
    const grid = document.getElementById('wishlistGrid');
    
    if (wishlist.length === 0) {
        document.getElementById('emptyMessage').style.display = 'block';
        document.getElementById('emptyText').textContent = 'Your wishlist is empty';
        grid.innerHTML = '';
        return;
    }

    document.getElementById('emptyMessage').style.display = 'none';
    grid.innerHTML = '';

    wishlist.forEach(item => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image" onclick="openProductDetail(${item.id})">
                <span style="font-size: 3rem;">${item.image}</span>
            </div>
            <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <div class="product-price">
                    <span class="price">₹${Math.round(item.price)}</span>
                    ${item.originalPrice ? `<span class="original-price">₹${Math.round(item.originalPrice)}</span>` : ''}
                </div>
                <div class="product-action">
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                    <button onclick="toggleWishlistProduct(${item.id})" style="background: var(--gold-accent); color: var(--primary-dark);">✓</button>
                </div>
            </div>
        `;
        grid.appendChild(productCard);
    });
}

function updateWishlistBadge() {
    document.getElementById('wishlistBadge').textContent = wishlist.length > 0 ? wishlist.length : '0';
}

// Reviews System - DISABLED (Only showing ratings)
function toggleReviewForm() {
    showNotification('Review submission is disabled');
}

function setReviewRating(rating) {
    // Disabled - ratings are read-only
}

function submitReview() {
    showNotification('Review submission is currently disabled');
    return;
}

function loadProductReviews(productId) {
    // Rating and review display disabled
    return;
}

function sortReviews() {
    // Sort functionality disabled - showing authentic ratings only
    return;
}

// Account Page
function renderAccount() {
    if (!currentUser) return;

    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('userJoined').textContent = currentUser.joinDate || 'Recently';

    const ordersList = document.getElementById('ordersList');
    const userOrders = orders.filter(o => o.userId === currentUser.id);

    if (userOrders.length === 0) {
        ordersList.innerHTML = '<p style="color: var(--text-secondary);">No orders yet</p>';
        return;
    }

    ordersList.innerHTML = '';
    userOrders.forEach(order => {
        const orderDate = new Date(order.date);
        const deliveryDate = new Date(order.estimatedDeliveryDate);
        const formattedOrderDate = orderDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
        const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

        // Calculate return window (7 days from actual delivery date)
        // Use actualDeliveryDate if order is delivered, otherwise use estimated date
        const deliveryRefDate = order.actualDeliveryDate ? new Date(order.actualDeliveryDate) : new Date(order.estimatedDeliveryDate);
        const returnWindowDate = new Date(deliveryRefDate);
        returnWindowDate.setDate(returnWindowDate.getDate() + 7);
        const daysLeftForReturn = Math.ceil((returnWindowDate - new Date()) / (1000 * 60 * 60 * 24));
        const returnWindowOpen = daysLeftForReturn > 0 && order.status === 'Delivered';

        // Order status colors
        let statusColor = '#f59e0b';
        let statusEmoji = '📦';
        if (order.status === 'Delivered') {
            statusColor = '#4ade80';
            statusEmoji = '✅';
        } else if (order.status === 'Shipped') {
            statusColor = '#3b82f6';
            statusEmoji = '🚚';
        } else if (order.status === 'Cancelled') {
            statusColor = '#ef4444';
            statusEmoji = '❌';
        }

        const orderDiv = document.createElement('div');
        orderDiv.style.cssText = `background: linear-gradient(135deg, rgba(212,175,55,0.05) 0%, rgba(26,26,26,0.5) 100%); padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; border: 1px solid rgba(212,175,55,0.2); transition: all 0.3s ease;`;
        
        // Build status timeline
        let statusTimeline = '';
        const statusSequence = ['Processing', 'Shipped', 'Delivered'];
        statusSequence.forEach((status, idx) => {
            const isActive = statusSequence.indexOf(order.status) >= idx;
            const isCompleted = statusSequence.indexOf(order.status) > idx;
            statusTimeline += `
                <div style="display: flex; align-items: center; margin-bottom: ${idx < statusSequence.length - 1 ? '1rem' : '0'};">
                    <div style="width: 28px; height: 28px; border-radius: 50%; background: ${isCompleted ? '#4ade80' : isActive ? '#f59e0b' : '#666'}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; margin-right: 1rem;">
                        ${isCompleted ? '✓' : (isActive ? '●' : '○')}
                    </div>
                    <div>
                        <p style="margin: 0; color: ${isActive ? 'var(--gold-accent)' : 'var(--text-secondary)'}; font-weight: 600;">${status}</p>
                    </div>
                    ${idx < statusSequence.length - 1 ? '<div style="flex: 1; height: 2px; background: ' + (isCompleted ? '#4ade80' : '#666') + '; margin: 0 1rem;"></div>' : ''}
                </div>
            `;
        });

        orderDiv.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem; gap: 1rem;">
                <div style="flex: 1;">
                    <h4 style="color: var(--gold-accent); margin: 0 0 0.5rem 0; font-size: 1.1rem;">Order #${String(order.id).padStart(6, '0')}</h4>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;">
                        <strong>Ordered:</strong> ${formattedOrderDate}
                    </p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;">
                        <strong>Est. Delivery:</strong> ${formattedDeliveryDate}
                    </p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;">
                        <strong>Tracking:</strong> ${order.trackingNumber}
                    </p>
                </div>
                <div style="text-align: right;">
                    <div style="background: rgba(212, 175, 55, 0.1); padding: 0.8rem 1.2rem; border-radius: 8px; margin-bottom: 0.5rem;">
                        <p style="margin: 0; color: var(--gold-accent); font-weight: 700; font-size: 1.3rem;">₹${Math.round(order.total).toLocaleString('en-IN')}</p>
                    </div>
                    <p style="margin: 0; padding: 0.4rem 0.8rem; background: ${statusColor}20; border: 1px solid ${statusColor}; border-radius: 6px; color: ${statusColor}; font-size: 0.85rem; font-weight: 600;">
                        ${statusEmoji} ${order.status}
                    </p>
                </div>
            </div>

            <div style="background: rgba(26, 26, 26, 0.5); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <p style="margin: 0 0 0.8rem 0; color: var(--text-primary); font-weight: 600;">📍 Delivery Progress</p>
                ${statusTimeline}
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1rem;">
                <div style="background: rgba(212, 175, 55, 0.05); padding: 0.8rem; border-radius: 8px;">
                    <p style="margin: 0 0 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;">Payment Method</p>
                    <p style="margin: 0; color: var(--text-primary); font-weight: 600;">💳 ${order.paymentMethod}</p>
                </div>
                <div style="background: rgba(212, 175, 55, 0.05); padding: 0.8rem; border-radius: 8px;">
                    <p style="margin: 0 0 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;">Shipping Cost</p>
                    <p style="margin: 0; color: #4ade80; font-weight: 600;">🚚 FREE</p>
                </div>
            </div>

            <div style="margin-bottom: 1rem;">
                <p style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-weight: 600;">Items (${order.items.length})</p>
                <div style="background: rgba(212, 175, 55, 0.05); border-radius: 8px; padding: 0.8rem;">
                    ${order.items.map((item, idx) => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: ${idx < order.items.length - 1 ? '1px solid rgba(212,175,55,0.1)' : 'none'};">
                            <div style="flex: 1;">
                                <p style="margin: 0; font-size: 0.9rem; color: var(--text-primary);"><strong>${item.name}</strong></p>
                                <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: var(--text-secondary);">Qty: ${item.quantity}</p>
                                ${returnWindowOpen ? `<button onclick="openReturnModal(${order.id}, ${idx})" style="margin-top: 0.4rem; padding: 0.3rem 0.8rem; background: rgba(139, 92, 246, 0.3); border: 1px solid #8b5cf6; border-radius: 4px; color: #8b5cf6; cursor: pointer; font-size: 0.8rem; font-weight: 600;">🔄 Request Return</button>` : ''}
                            </div>
                            <p style="margin: 0; font-weight: 600; color: var(--gold-accent);">₹${Math.round(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="background: rgba(26, 26, 26, 0.7); padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                    <p style="margin: 0; color: var(--text-secondary);">Subtotal</p>
                    <p style="margin: 0; color: var(--text-secondary);">₹${Math.round(order.subtotal).toLocaleString('en-IN')}</p>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
                    <p style="margin: 0; color: var(--text-secondary);">Tax (5%)</p>
                    <p style="margin: 0; color: var(--text-secondary);">₹${Math.round(order.tax).toLocaleString('en-IN')}</p>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 0.4rem; border-top: 1px solid rgba(212,175,55,0.2);">
                    <p style="margin: 0; color: var(--gold-accent); font-weight: 700;">Total</p>
                    <p style="margin: 0; color: var(--gold-accent); font-weight: 700;">₹${Math.round(order.total).toLocaleString('en-IN')}</p>
                </div>
            </div>

            <div style="background: rgba(26, 26, 26, 0.7); padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem;">
                <p style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-weight: 600;">📍 Shipping Address:</p>
                <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">${order.shippingAddress}</p>
            </div>

            ${returnWindowOpen ? `
                <div style="background: rgba(74, 222, 128, 0.1); border: 1px solid rgba(74, 222, 128, 0.3); border-radius: 8px; padding: 0.8rem; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.3rem 0; color: #4ade80; font-weight: 600;">✓ Return Window Open</p>
                    <p style="margin: 0; font-size: 0.85rem; color: var(--text-secondary);">You can return this order within <strong>${daysLeftForReturn} days</strong></p>
                </div>
            ` : order.status === 'Delivered' ? `
                <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 0.8rem; margin-bottom: 1rem;">
                    <p style="margin: 0; color: #ef4444; font-size: 0.85rem;">Return window closed</p>
                </div>
            ` : ''}

            ${order.returnRequest ? `
                <div style="background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 0.8rem; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.5rem 0; color: #8b5cf6; font-weight: 600;">🔄 Return Request - ${order.returnRequest.status}</p>
                    <p style="margin: 0.3rem 0; font-size: 0.9rem; color: var(--text-secondary);">
                        <strong>Reason:</strong> ${order.returnRequest.reason}
                    </p>
                    <p style="margin: 0.3rem 0; font-size: 0.9rem; color: var(--text-secondary);">
                        <strong>Requested:</strong> ${new Date(order.returnRequest.requestDate).toLocaleDateString('en-IN')}
                    </p>
                </div>
            ` : (order.returnRequests && order.returnRequests.length > 0 ? `
                <div style="background: linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(212, 175, 55, 0.1) 100%); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                    <div style="display: flex; align-items: start; justify-content: space-between; gap: 1rem;">
                        <div>
                            <p style="margin: 0 0 0.5rem 0; color: #8b5cf6; font-weight: 700; font-size: 1rem;">🔄 Return Request Submitted</p>
                            ${order.returnRequests.map((req, idx) => `
                                <div data-order-id="${order.id}" data-return-id="${req.id}" style="background: rgba(0,0,0,0.2); padding: 0.8rem; border-radius: 6px; margin: 0.5rem 0; border-left: 3px solid ${req.status === 'Approved' ? '#4ade80' : req.status === 'Rejected' ? '#ef4444' : '#f59e0b'};">
                                    <p style="margin: 0 0 0.3rem 0; color: var(--text-primary); font-weight: 600;">📦 ${req.productName}</p>
                                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; font-size: 0.85rem;">
                                        <p style="margin: 0; color: var(--text-secondary);"><strong>Type:</strong> ${req.type}</p>
                                        <p style="margin: 0; color: var(--text-secondary);"><strong>Reason:</strong> ${req.reason}</p>
                                        <p style="margin: 0; color: #f59e0b;"><strong>Status:</strong> ${req.status}</p>
                                        <p style="margin: 0; color: var(--gold-accent);"><strong>Refund:</strong> ₹${req.refundDetails?.amount ? Math.round(req.refundDetails.amount).toLocaleString('en-IN') : 'Pending'}</p>
                                    </div>
                                    ${req.verificationStatus ? `
                                        <p style="margin: 0.3rem 0 0 0; padding: 0.4rem 0.8rem; background: ${req.verificationStatus === 'verified' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(245, 158, 11, 0.2)'}; border-radius: 4px; color: ${req.verificationStatus === 'verified' ? '#4ade80' : '#f59e0b'}; font-size: 0.8rem; font-weight: 600; display: inline-block;">
                                            ${req.verificationStatus === 'verified' ? '✅ Verified' : '⏳ Pending Verification'} (${req.photoCount || 0} 📸)
                                        </p>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                        <div style="text-align: right; min-width: 150px;">
                            <p style="margin: 0 0 0.5rem 0; color: var(--text-secondary); font-size: 0.85rem;">Estimated Decision</p>
                            <p style="margin: 0; color: var(--gold-accent); font-weight: 700; font-size: 1rem;">${order.returnRequests[0]?.estimatedApprovalDate ? new Date(order.returnRequests[0].estimatedApprovalDate).toLocaleDateString('en-IN') : 'Soon'}</p>
                        </div>
                    </div>
                </div>
            ` : '')}

            <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                ${(order.status === 'Processing' || order.status === 'Shipped') ? `
                    <button onclick="cancelUserOrder(${order.id})" style="flex: 1; min-width: 120px; padding: 0.6rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; font-size: 0.9rem;" 
                            onmouseover="this.style.boxShadow='0 0 15px rgba(239, 68, 68, 0.4)'" 
                            onmouseout="this.style.boxShadow='none'">
                        ❌ Cancel Order
                    </button>
                ` : ''}
                <button onclick="downloadInvoice(${order.id})" style="flex: 1; min-width: 120px; padding: 0.6rem; background: var(--gold-accent); color: black; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s ease; font-size: 0.9rem;" 
                        onmouseover="this.style.boxShadow='0 0 15px rgba(212, 175, 55, 0.4)'" 
                        onmouseout="this.style.boxShadow='none'">
                    📄 Invoice
                </button>
            </div>
        `;
        ordersList.appendChild(orderDiv);
    });
}

function switchTab(tab) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
    event.target.classList.add('active');
}

// ============================
// DISCOUNT CALCULATOR FUNCTION
// ============================
function calculateDiscount() {
    const actualPrice = parseFloat(document.getElementById('calcActualPrice').value) || 0;
    const discountPrice = parseFloat(document.getElementById('calcDiscountPrice').value) || 0;

    let percentage = 0;
    let savings = 0;

    if (actualPrice > 0 && discountPrice < actualPrice) {
        savings = actualPrice - discountPrice;
        percentage = ((savings / actualPrice) * 100).toFixed(0);
    }

    // Update display
    document.getElementById('calcPercentage').textContent = percentage + '%';
    document.getElementById('calcSavings').textContent = '₹' + savings.toFixed(0);
}

// Admin Panel
function switchAdminTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tab + 'Tab').classList.add('active');
    event.target.classList.add('active');

    if (tab === 'dashboard') {
        updateAdminDashboard();
    } else if (tab === 'products') {
        renderAdminProducts();
    } else if (tab === 'offers') {
        renderAdminOffers();
    } else if (tab === 'orders') {
        renderAdminOrders();
    } else if (tab === 'returns') {
        renderAdminReturnRequests();
    } else if (tab === 'vendors') {
        renderVendorsList();
    }
}

function updateAdminDashboard() {
    loadFromStorage();
    
    document.getElementById('statProducts').textContent = products.length;
    document.getElementById('statOrders').textContent = orders.length;
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('statRevenue').textContent = `₹${Math.round(revenue).toLocaleString('en-IN')}`;
    const users = JSON.parse(localStorage.getItem('luxeUsers') || '[]');
    document.getElementById('statUsers').textContent = users.length;
    
    // Render orders directly in dashboard
    renderDashboardOrders();
    
    // Render return requests
    renderReturnRequests();
}

function renderDashboardOrders() {
    const container = document.getElementById('dashboardOrdersList');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary); grid-column: 1/-1;">
                <p style="font-size: 2rem; margin-bottom: 1rem;">📭</p>
                <p><strong>No Orders Yet</strong></p>
                <p style="font-size: 0.9rem;">Orders will appear here when customers purchase</p>
            </div>
        `;
        return;
    }
    
    // Show all orders
    orders.forEach((order, index) => {
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('en-IN');
        const statusColor = order.status === 'Delivered' ? '#4ade80' : 
                           order.status === 'Shipped' ? '#3b82f6' :
                           order.status === 'Processing' ? '#f59e0b' : '#ef4444';

        const orderCard = document.createElement('div');
        orderCard.style.cssText = `
            background: rgba(26,26,26,0.8); 
            border: 2px solid ${statusColor}; 
            border-radius: 12px; 
            padding: 1.5rem; 
            margin-bottom: 1.5rem;
        `;
        
        // Calculate totals
        const subtotal = order.subtotal || 0;
        const tax = order.tax || 0;
        const shipping = order.shipping || 0;
        const total = order.total || 0;

        orderCard.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr 200px; gap: 1.5rem; margin-bottom: 1rem; align-items: start;">
                <!-- Customer Info -->
                <div>
                    <p style="color: var(--gold-accent); font-weight: 700; margin: 0 0 0.5rem 0;">👤 CUSTOMER DETAILS</p>
                    <div style="background: rgba(0,0,0,0.4); padding: 0.8rem; border-radius: 8px;">
                        <p style="margin: 0.3rem 0; color: var(--text-primary); font-weight: 600;">${order.customerName}</p>
                        <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;">📧 ${order.customerEmail}</p>
                        <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;">📱 ${order.shippingAddress}</p>
                        <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;">📅 Order Date: ${formattedDate}</p>
                    </div>
                </div>

                <!-- Items Purchased -->
                <div>
                    <p style="color: var(--gold-accent); font-weight: 700; margin: 0 0 0.5rem 0;">📦 PURCHASED ITEMS</p>
                    <div style="background: rgba(0,0,0,0.4); padding: 0.8rem; border-radius: 8px; max-height: 150px; overflow-y: auto;">
                        ${order.items.map((item, idx) => `
                            <div style="padding: 0.5rem 0; border-bottom: ${idx < order.items.length - 1 ? '1px solid rgba(212,175,55,0.2)' : 'none'}; cursor: pointer;" onclick="showProductDetails(${item.id})">
                                <div style="display: flex; justify-content: space-between; align-items: center; border-radius: 6px; padding: 0.4rem; transition: all 0.3s; background: rgba(212,175,55,0.1);">
                                    <span style="color: var(--gold-accent); font-weight: 500; hover: text-decoration: underline;">${item.name}</span>
                                    <span style="color: var(--gold-accent); font-size: 0.85rem; font-weight: 600;">×${item.quantity}</span>
                                </div>
                                <p style="margin: 0.2rem 0 0 0; color: var(--text-secondary); font-size: 0.8rem;">₹${Math.round(item.price).toLocaleString('en-IN')} each 👆 Click to view</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Order Summary -->
                <div>
                    <p style="color: var(--gold-accent); font-weight: 700; margin: 0 0 0.5rem 0;">💰 ORDER SUMMARY</p>
                    <div style="background: rgba(212,175,55,0.15); padding: 0.8rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.3);">
                        <div style="margin: 0.4rem 0; display: flex; justify-content: space-between; font-size: 0.85rem;">
                            <span style="color: var(--text-secondary);">Subtotal:</span>
                            <span style="color: var(--text-primary); font-weight: 600;">₹${Math.round(subtotal).toLocaleString('en-IN')}</span>
                        </div>
                        <div style="margin: 0.4rem 0; display: flex; justify-content: space-between; font-size: 0.85rem;">
                            <span style="color: var(--text-secondary);">Tax (5%):</span>
                            <span style="color: var(--text-primary); font-weight: 600;">₹${Math.round(tax).toLocaleString('en-IN')}</span>
                        </div>
                        <div style="margin: 0.4rem 0; display: flex; justify-content: space-between; font-size: 0.85rem;">
                            <span style="color: var(--text-secondary);">Shipping:</span>
                            <span style="color: var(--text-primary); font-weight: 600;">FREE</span>
                        </div>
                        <div style="margin-top: 0.6rem; padding-top: 0.6rem; border-top: 1px solid rgba(212,175,55,0.3); display: flex; justify-content: space-between;">
                            <span style="color: var(--gold-accent); font-weight: 700;">Total:</span>
                            <span style="color: var(--gold-accent); font-size: 1.2rem; font-weight: 700;">₹${Math.round(total).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Status & Actions -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding-top: 1rem; border-top: 1px solid rgba(212,175,55,0.2);">
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.3rem;">🚚 Shipping Status</p>
                    <select onchange="updateOrderStatus(${order.id}, this.value)" style="width: 100%; padding: 0.6rem; background: var(--tertiary-dark); color: ${statusColor}; border: 2px solid ${statusColor}; border-radius: 6px; cursor: pointer; font-weight: 600;">
                        <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>🔄 Processing</option>
                        <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>📤 Shipped</option>
                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>✅ Delivered</option>
                        <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
                    </select>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.3rem;">📍 Tracking: ${order.trackingNumber}</p>
                    <p style="color: var(--gold-accent); font-weight: 600; margin: 0; padding: 0.6rem; background: rgba(212,175,55,0.2); border-radius: 6px; text-align: center;">Order #${String(order.id).padStart(6, '0')}</p>
                </div>
            </div>

            <!-- Quick Actions -->
            <div style="display: flex; gap: 0.8rem; margin-top: 1rem; flex-wrap: wrap;">
                <button onclick="generateShippingLabel(${order.id})" style="flex: 1; min-width: 120px; padding: 0.6rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">🏷️ Shipping Label</button>
                <button onclick="downloadInvoice(${order.id})" style="flex: 1; min-width: 120px; padding: 0.6rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">📄 Invoice</button>
                <button onclick="deleteOrder(${order.id})" style="flex: 1; min-width: 120px; padding: 0.6rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.85rem;">🗑️ Delete</button>
            </div>
        `;
        
        container.appendChild(orderCard);
    });
    
    console.log('✅ Dashboard orders rendered:', orders.length);
}

// Handle Return Request Decision
function handleReturnRequest(orderId, productName, decision) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    if (!order.returnRequests) {
        order.returnRequests = [];
    }
    
    // Find and update the specific return request
    const returnReq = order.returnRequests.find(r => r.productName === productName);
    if (returnReq) {
        returnReq.status = decision;
        returnReq.processedDate = new Date().toISOString();
        
        if (decision === 'Approved') {
            // Add refund info
            returnReq.refundAmount = returnReq.amount || 0;
            returnReq.refundStatus = 'Processing';
        }
        
        saveToStorage();
        updateAdminDashboard();
        renderReturnRequests();
        
        const message = decision === 'Approved' 
            ? `✅ Return approved! Refund of ₹${returnReq.refundAmount} will be processed`
            : `❌ Return request rejected`;
        showNotification(message);
    }
}
function renderReturnRequests() {
    const container = document.getElementById('returnRequestsContainer');
    
    if (!container) {
        // Container doesn't exist, create it
        const dashboardOrdersList = document.getElementById('dashboardOrdersList');
        if (dashboardOrdersList && dashboardOrdersList.parentElement) {
            const returnSection = document.createElement('div');
            returnSection.id = 'returnRequestsContainer';
            returnSection.style.cssText = `
                margin-top: 3rem;
                border-top: 3px solid rgba(139, 92, 246, 0.5);
                padding-top: 2rem;
            `;
            returnSection.innerHTML = '<p>Loading return requests...</p>';
            dashboardOrdersList.parentElement.appendChild(returnSection);
        }
        return;
    }
    
    container.innerHTML = '';
    
    // Get all return requests from orders
    const returnRequests = [];
    orders.forEach(order => {
        if (order.returnRequests && Array.isArray(order.returnRequests)) {
            order.returnRequests.forEach(req => {
                returnRequests.push({
                    ...req,
                    orderId: order.id,
                    customerName: order.customerName,
                    customerEmail: order.customerEmail
                });
            });
        }
    });
    
    const header = document.createElement('h3');
    header.style.cssText = `color: #8b5cf6; margin: 0 0 1.5rem 0;`;
    header.innerHTML = '🔄 Return/Refund Requests (' + returnRequests.length + ')';
    container.appendChild(header);
    
    if (returnRequests.length === 0) {
        const emptyDiv = document.createElement('div');
        emptyDiv.style.cssText = `
            text-align: center;
            padding: 2rem;
            color: var(--text-secondary);
            background: rgba(139, 92, 246, 0.1);
            border-radius: 8px;
        `;
        emptyDiv.innerHTML = `
            <p style="font-size: 1.5rem; margin: 0 0 0.5rem 0;">✨</p>
            <p>No return requests at the moment</p>
        `;
        container.appendChild(emptyDiv);
        return;
    }
    
    returnRequests.forEach(request => {
        const statusColor = request.status === 'Pending' ? '#f59e0b' :
                           request.status === 'Approved' ? '#4ade80' :
                           request.status === 'Rejected' ? '#ef4444' : '#999';
        
        const requestCard = document.createElement('div');
        requestCard.style.cssText = `
            background: rgba(139, 92, 246, 0.15);
            border: 2px solid ${statusColor};
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
        `;
        
        // Build photos section if photos exist
        let photosHTML = '';
        if (request.photos && request.photos.length > 0) {
            photosHTML = `
                <div style="margin-bottom: 1rem;">
                    <p style="color: #8b5cf6; font-weight: 700; margin: 0 0 0.8rem 0;">📸 Proof Photos</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.8rem;">
                        ${request.photos.map((photo, idx) => `
                            <div style="position: relative; overflow: hidden; border-radius: 8px; background: rgba(0,0,0,0.3); aspect-ratio: 1;">
                                <img src="${photo}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer;" onclick="expandPhoto('${photo}')">
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        requestCard.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 1fr 200px; gap: 1.5rem; margin-bottom: 1rem;">
                <!-- Customer & Order Info -->
                <div>
                    <p style="color: #8b5cf6; font-weight: 700; margin: 0 0 0.5rem 0;">👤 Customer</p>
                    <div style="background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
                        <p style="margin: 0.3rem 0; color: var(--text-primary); font-weight: 600;">${request.customerName}</p>
                        <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;">${request.customerEmail}</p>
                        <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;">📦 Order #${String(request.orderId).padStart(6, '0')}</p>
                    </div>
                </div>

                <!-- Return Details -->
                <div>
                    <p style="color: #8b5cf6; font-weight: 700; margin: 0 0 0.5rem 0;">📋 Return Details</p>
                    <div style="background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
                        <p style="margin: 0.3rem 0; color: var(--text-primary); font-weight: 600;">${request.productName || 'Product'}</p>
                        <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;"><strong>Reason:</strong> ${request.reason || 'Not specified'}</p>
                        <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.85rem;"><strong>Type:</strong> ${request.type || 'Return'}</p>
                    </div>
                </div>

                <!-- Status -->
                <div>
                    <p style="color: #8b5cf6; font-weight: 700; margin: 0 0 0.5rem 0;">Status</p>
                    <p style="margin: 0; padding: 0.6rem; background: ${statusColor}20; border: 2px solid ${statusColor}; border-radius: 6px; color: ${statusColor}; font-weight: 700; text-align: center;">
                        ${request.status || 'Pending'}
                    </p>
                </div>
            </div>

            <!-- Proof Photos -->
            ${photosHTML}

            <!-- Comments -->
            <div style="background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem;">
                <p style="color: var(--text-secondary); font-weight: 600; margin: 0 0 0.5rem 0;">💬 Customer Message</p>
                <p style="color: var(--text-secondary); margin: 0; font-size: 0.9rem; line-height: 1.5;">${request.message || 'No message provided'}</p>
            </div>

            <!-- Admin Actions (Only if Pending) -->
            ${request.status === 'Pending' ? `
                <div style="display: flex; gap: 0.8rem;">
                    <button onclick="handleReturnRequest(${request.orderId}, '${request.productName}', 'Approved')" style="flex: 1; padding: 0.6rem; background: #4ade80; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">✅ Approve</button>
                    <button onclick="handleReturnRequest(${request.orderId}, '${request.productName}', 'Rejected')" style="flex: 1; padding: 0.6rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">❌ Reject</button>
                </div>
            ` : `
                <div style="background: ${statusColor}20; padding: 0.8rem; border-radius: 6px;">
                    <p style="color: ${statusColor}; margin: 0; font-weight: 600;">
                        ${request.status === 'Approved' ? '✅ Approved - Refund to be processed' : '❌ Rejected - No refund issued'}
                    </p>
                </div>
            `}
        `;
        
        // If AI analysis exists, show a small AI risk summary at the top of the card
        if (request.aiRiskScore !== undefined) {
            const aiDiv = document.createElement('div');
            aiDiv.style.cssText = 'display:flex; justify-content:flex-end; gap:0.6rem; margin-bottom:0.8rem;';
            const flagsHtml = request.aiFlags && request.aiFlags.length > 0 ? `<div style="background:#222; color:#ffd700; padding:4px 8px; border-radius:6px; font-size:12px;">${request.aiFlags.join(', ')}</div>` : '';
            aiDiv.innerHTML = `<div style="background:#111; color:#fff; padding:6px 10px; border-radius:6px; font-weight:700;">AI Risk: ${request.aiRiskScore}%</div>${flagsHtml}`;
            requestCard.insertBefore(aiDiv, requestCard.firstChild);
        }

        container.appendChild(requestCard);
    });
}

// ============================
// ADMIN RETURN/REPLACE PANEL
// ============================
function renderAdminReturnRequests() {
    const container = document.getElementById('adminReturnsContainer');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    // Collect all return requests from all orders
    const allReturnRequests = [];
    orders.forEach(order => {
        if (order.returnRequests && Array.isArray(order.returnRequests)) {
            order.returnRequests.forEach(req => {
                allReturnRequests.push({
                    ...req,
                    orderId: order.id,
                    customerName: order.customerName,
                    customerEmail: order.customerEmail,
                    orderDate: order.date,
                    orderTotal: order.total,
                    itemName: req.productName
                });
            });
        }
    });
    
    if (allReturnRequests.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p style="font-size: 2rem; margin-bottom: 1rem;">✨</p>
                <p><strong>No Return Requests</strong></p>
                <p style="font-size: 0.9rem;">Return requests will appear here when customers submit them</p>
            </div>
        `;
        return;
    }
    
    // Render each return request
    allReturnRequests.forEach(request => {
        const statusColor = request.status === 'Pending' ? '#f59e0b' :
                           request.status === 'Approved' ? '#4ade80' :
                           request.status === 'Rejected' ? '#ef4444' : '#999';
        
        const riskColor = request.aiRiskScore && request.aiRiskScore <= 35 ? '#4ade80' :
                         request.aiRiskScore && request.aiRiskScore <= 65 ? '#f59e0b' : '#ef4444';
        
        const card = document.createElement('div');
        card.style.cssText = `
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(26, 26, 26, 0.7) 100%);
            border: 2px solid ${statusColor};
            border-radius: 12px;
            padding: 1.5rem;
            overflow: hidden;
        `;
        
        // Build photos HTML
        let photosSection = '';
        if (request.photos && request.photos.length > 0) {
            photosSection = `
                <div style="margin-bottom: 1.5rem; background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px;">
                    <p style="color: #8b5cf6; font-weight: 700; margin: 0 0 0.8rem 0;">📸 Proof Photos (${request.photos.length})</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.8rem;">
                        ${request.photos.map((photo, idx) => `
                            <div style="position: relative; overflow: hidden; border-radius: 8px; background: rgba(0,0,0,0.5); aspect-ratio: 1;">
                                <img src="${photo}" style="width: 100%; height: 100%; object-fit: cover; cursor: pointer; transition: transform 0.2s;" 
                                     onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'"
                                     onclick="expandAdminPhoto('${photo}')">
                                <div style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.8); color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">${idx + 1}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // Build video indicator
        let videoSection = '';
        if (request.hasVideo) {
            videoSection = `
                <div style="background: rgba(78, 205, 196, 0.2); padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid rgba(78, 205, 196, 0.5);">
                    <p style="margin: 0; color: #4ecdc4; font-weight: 600;">🎥 Video Evidence Attached</p>
                </div>
            `;
        }
        
        card.innerHTML = `
            <!-- Header with AI Score -->
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(139, 92, 246, 0.3);">
                <div>
                    <h4 style="color: var(--gold-accent); margin: 0 0 0.3rem 0;">Return #${request.id}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin: 0;">Order #${String(request.orderId).padStart(6, '0')}</p>
                </div>
                <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: flex-end;">
                    <div style="background: ${riskColor}; color: white; padding: 0.5rem 0.8rem; border-radius: 6px; font-size: 0.85rem; font-weight: 700;">
                        AI Risk: ${request.aiRiskScore || '?'}%
                    </div>
                    <div style="background: ${statusColor}; color: white; padding: 0.5rem 0.8rem; border-radius: 6px; font-size: 0.85rem; font-weight: 700;">
                        ${request.status}
                    </div>
                </div>
            </div>

            <!-- Verification Status Badge -->
            <div style="background: ${request.verificationStatus === 'verified' ? 'rgba(74, 222, 128, 0.15)' : 'rgba(245, 158, 11, 0.15)'}; border: 1px solid ${request.verificationStatus === 'verified' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(245, 158, 11, 0.3)'}; border-radius: 8px; padding: 0.8rem; margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.2rem;">${request.verificationStatus === 'verified' ? '✅' : '⏳'}</span>
                        <div>
                            <p style="margin: 0; color: ${request.verificationStatus === 'verified' ? '#4ade80' : '#f59e0b'}; font-weight: 700;">Verification Status: ${request.verificationStatus.toUpperCase()}</p>
                            <p style="margin: 0.2rem 0 0 0; color: var(--text-secondary); font-size: 0.85rem;">${request.verificationMethod === 'multi-photo-verification' ? '🖼️ Multi-Photo Verification' : '📷 Single Photo Verification'}</p>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Submitted:</p>
                        <p style="margin: 0; color: var(--text-primary); font-weight: 600;">${new Date(request.submittedDate).toLocaleDateString('en-IN')}</p>
                    </div>
                </div>
            </div>

            <!-- Refund Details -->
            ${request.refundDetails ? `
                <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border-left: 3px solid var(--gold-accent);">
                    <p style="color: var(--text-secondary); font-weight: 600; margin: 0 0 0.5rem 0;">💰 Refund Details</p>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
                        <div>
                            <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Amount</p>
                            <p style="margin: 0.2rem 0 0 0; color: var(--gold-accent); font-weight: 700; font-size: 1.1rem;">₹${Math.round(request.refundDetails.amount).toLocaleString('en-IN')}</p>
                        </div>
                        <div>
                            <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Method</p>
                            <p style="margin: 0.2rem 0 0 0; color: var(--text-primary); font-weight: 600;">${request.refundDetails.method}</p>
                        </div>
                        <div>
                            <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Est. Approval</p>
                            <p style="margin: 0.2rem 0 0 0; color: var(--text-primary); font-weight: 600;">${new Date(request.estimatedApprovalDate).toLocaleDateString('en-IN')}</p>
                        </div>
                        <div>
                            <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Status</p>
                            <p style="margin: 0.2rem 0 0 0; color: #f59e0b; font-weight: 600;">${request.refundDetails.status}</p>
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- Customer & Return Info -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                <div style="background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
                    <p style="color: var(--text-secondary); font-weight: 600; margin: 0 0 0.5rem 0;">👤 Customer</p>
                    <p style="margin: 0.2rem 0; color: var(--text-primary); font-weight: 500;">${request.customerName}</p>
                    <p style="margin: 0.2rem 0; color: var(--text-secondary); font-size: 0.85rem;">${request.customerEmail}</p>
                    <p style="margin: 0.5rem 0 0 0; color: var(--text-secondary); font-size: 0.8rem;">Ordered: ${new Date(request.orderDate).toLocaleDateString('en-IN')}</p>
                </div>
                <div style="background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px;">
                    <p style="color: var(--text-secondary); font-weight: 600; margin: 0 0 0.5rem 0;">📋 Return Details</p>
                    <p style="margin: 0.2rem 0; color: var(--text-primary); font-weight: 500;">${request.productName || request.itemName}</p>
                    <p style="margin: 0.2rem 0; color: var(--text-secondary); font-size: 0.85rem;"><strong>Reason:</strong> ${request.reason}</p>
                    <p style="margin: 0.2rem 0; color: var(--text-secondary); font-size: 0.85rem;"><strong>Type:</strong> ${request.type}</p>
                </div>
            </div>

            <!-- Photo Count & Verification Method -->
            <div style="background: rgba(212, 175, 55, 0.1); padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid rgba(212, 175, 55, 0.2);">
                <p style="color: var(--gold-accent); font-weight: 600; margin: 0 0 0.5rem 0;">📸 Photo Verification</p>
                <div style="display: flex; gap: 1rem; justify-content: space-between;">
                    <div>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Photos Uploaded</p>
                        <p style="margin: 0.2rem 0 0 0; color: var(--text-primary); font-weight: 700; font-size: 1.1rem;">${request.photoCount || request.photos?.length || 0}</p>
                    </div>
                    <div>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Verification</p>
                        <p style="margin: 0.2rem 0 0 0; color: var(--gold-accent); font-weight: 600; font-size: 0.9rem;">
                            ${request.verificationMethod === 'multi-photo-verification' ? '✅ Multi-Photo' : request.verificationMethod === 'single-photo-verification' ? '📷 Single Photo' : '📂 File Upload'}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Photos Section -->
            ${photosSection}

            <!-- Customer Message -->
            <div style="background: rgba(0,0,0,0.3); padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem;">
                <p style="color: var(--text-secondary); font-weight: 600; margin: 0 0 0.5rem 0;">💬 Customer Message</p>
                <p style="color: var(--text-secondary); margin: 0; font-size: 0.9rem; line-height: 1.5;">${request.message || 'No additional message'}</p>
            </div>

            <!-- AI Risk Details -->
            ${request.aiFlags && request.aiFlags.length > 0 ? `
                <div style="background: rgba(212, 175, 55, 0.1); padding: 0.8rem; border-radius: 8px; margin-bottom: 1rem; border-left: 3px solid var(--gold-accent);">
                    <p style="color: var(--gold-accent); font-weight: 600; margin: 0 0 0.3rem 0;">🔍 AI Analysis Flags</p>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">${request.aiFlags.join(' • ')}</p>
                </div>
            ` : ''}

            <!-- Admin Actions -->
            ${request.status === 'Pending' ? `
                <div style="display: flex; gap: 0.8rem;">
                    <button onclick="approveAdminReturn('${request.id}', ${request.orderId})" style="flex: 1; padding: 0.8rem; background: #4ade80; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;" onmouseover="this.style.boxShadow='0 0 15px rgba(74, 222, 128, 0.4)'" onmouseout="this.style.boxShadow='none'">
                        ✅ Approve
                    </button>
                    <button onclick="rejectAdminReturn('${request.id}', ${request.orderId})" style="flex: 1; padding: 0.8rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;" onmouseover="this.style.boxShadow='0 0 15px rgba(239, 68, 68, 0.4)'" onmouseout="this.style.boxShadow='none'">
                        ❌ Reject
                    </button>
                    <button onclick="pickupAdminReturn('${request.id}', ${request.orderId})" style="flex: 1; padding: 0.8rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;" onmouseover="this.style.boxShadow='0 0 15px rgba(59, 130, 246, 0.4)'" onmouseout="this.style.boxShadow='none'">
                        🚚 Schedule Pickup
                    </button>
                </div>
            ` : `
                <div style="background: ${statusColor}20; padding: 1rem; border-radius: 8px; border: 1px solid ${statusColor};">
                    <p style="color: ${statusColor}; margin: 0; font-weight: 600; text-align: center;">
                        ${request.status === 'Approved' ? '✅ Approved - Awaiting customer return shipment' : 
                          request.status === 'Rejected' ? '❌ Rejected - No action required' :
                          request.status === 'Picked' ? '📦 Picked up - Awaiting return' : request.status}
                    </p>
                </div>
            `}
        `;
        
        container.appendChild(card);
    });
}

// Admin approval/rejection functions
function approveAdminReturn(requestId, orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order || !order.returnRequests) return;
    
    const request = order.returnRequests.find(r => r.id === requestId);
    if (request) {
        request.status = 'Approved';
        request.approvalDate = new Date().toISOString();
        request.trackingHistory = request.trackingHistory || [];
        request.trackingHistory.push({
            status: 'Approved',
            date: new Date().toISOString(),
            note: 'Admin approved - Awaiting customer shipment'
        });
        
        saveToStorage();
        
        // 🔴 BROADCAST REAL-TIME UPDATE TO CUSTOMER
        broadcastReturnStatusUpdate(orderId, requestId, 'Approved');
        
        // Trigger live update for any customer viewing this order
        triggerLiveCustomerUpdate(orderId);
        
        renderAdminReturnRequests();
        showNotification('✅ Return request approved! Customer notified in real-time.', 'success');
    }
}

function rejectAdminReturn(requestId, orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order || !order.returnRequests) return;
    
    const reason = prompt('Enter reason for rejection (optional):');
    
    const request = order.returnRequests.find(r => r.id === requestId);
    if (request) {
        request.status = 'Rejected';
        request.rejectionReason = reason || 'Does not meet return criteria';
        request.rejectionDate = new Date().toISOString();
        request.trackingHistory = request.trackingHistory || [];
        request.trackingHistory.push({
            status: 'Rejected',
            date: new Date().toISOString(),
            note: `Rejected - ${request.rejectionReason}`
        });
        
        saveToStorage();
        
        // 🔴 BROADCAST REAL-TIME UPDATE TO CUSTOMER
        broadcastReturnStatusUpdate(orderId, requestId, 'Rejected', request.rejectionReason);
        
        // Trigger live update for any customer viewing this order
        triggerLiveCustomerUpdate(orderId);
        
        renderAdminReturnRequests();
        showNotification('❌ Return request rejected. Customer notified in real-time.', 'info');
    }
}

function pickupAdminReturn(requestId, orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order || !order.returnRequests) return;
    
    const request = order.returnRequests.find(r => r.id === requestId);
    if (request && request.status === 'Pending') {
        // First approve it
        request.status = 'Approved';
        request.approvalDate = new Date().toISOString();
    }
    
    if (request) {
        // Then mark as picked
        request.status = 'Picked';
        request.pickupDate = new Date().toISOString();
        request.trackingHistory = request.trackingHistory || [];
        request.trackingHistory.push({
            status: 'Picked',
            date: new Date().toISOString(),
            note: 'Pickup scheduled - Awaiting customer return shipment'
        });
        
        saveToStorage();
        
        // 🔴 BROADCAST REAL-TIME UPDATE TO CUSTOMER
        broadcastReturnStatusUpdate(orderId, requestId, 'Picked', 'Return pickup scheduled');
        
        // Trigger live update for any customer viewing this order
        triggerLiveCustomerUpdate(orderId);
        
        renderAdminReturnRequests();
        showNotification('📦 Pickup scheduled! Customer notified in real-time.', 'success');
    }
}

// Photo expansion modal
function expandAdminPhoto(photoUrl) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        cursor: pointer;
    `;
    modal.onclick = () => modal.remove();
    
    const img = document.createElement('img');
    img.src = photoUrl;
    img.style.cssText = `
        max-width: 90vw;
        max-height: 90vh;
        border-radius: 12px;
        object-fit: contain;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: rgba(255,0,0,0.8);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 10000;
    `;
    closeBtn.onclick = (e) => {
        e.stopPropagation();
        modal.remove();
    };
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
}

function handleImageFileChange(event) {
    const files = Array.from(event.target.files);
    const preview = document.getElementById('formImagePreview');
    const imageDataInput = document.getElementById('formImageData');

    preview.innerHTML = '';
    imageDataInput.value = '';

    if (files.length === 0) {
        return;
    }

    // Validate minimum 2, maximum 6 images
    if (files.length < 2) {
        showNotification('Please select at least 2 images');
        event.target.value = '';
        return;
    }

    if (files.length > 6) {
        showNotification('Please select maximum 6 images');
        event.target.value = '';
        return;
    }

    // Validate all files are images
    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
        showNotification('Please select only image files');
        event.target.value = '';
        return;
    }

    const imageDataArray = [];

    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageDataArray[index] = e.target.result;

            // Create thumbnail
            const thumbnail = document.createElement('div');
            thumbnail.className = 'image-thumbnail';
            thumbnail.innerHTML = `
                <img src="${e.target.result}" alt="Image ${index + 1}">
                <button class="remove-thumbnail" onclick="removeImageThumbnail(${index})" title="Remove image">×</button>
            `;
            preview.appendChild(thumbnail);

            // Store all image data when all are loaded
            if (imageDataArray.filter(Boolean).length === files.length) {
                imageDataInput.value = JSON.stringify(imageDataArray);
            }
        };
        reader.readAsDataURL(file);
    });
}

function removeImageThumbnail(index) {
    const preview = document.getElementById('formImagePreview');
    const thumbnails = preview.querySelectorAll('.image-thumbnail');
    const imageDataInput = document.getElementById('formImageData');

    if (thumbnails[index]) {
        thumbnails[index].remove();

        // Update stored image data
        const currentData = JSON.parse(imageDataInput.value || '[]');
        currentData.splice(index, 1);
        imageDataInput.value = JSON.stringify(currentData);

        // Reassign onclick handlers for remaining thumbnails
        const remainingThumbnails = preview.querySelectorAll('.image-thumbnail');
        remainingThumbnails.forEach((thumb, newIndex) => {
            const removeBtn = thumb.querySelector('.remove-thumbnail');
            if (removeBtn) {
                removeBtn.onclick = () => removeImageThumbnail(newIndex);
            }
        });

        // Check if we still have minimum images
        if (currentData.length < 2) {
            showNotification('Please keep at least 2 images');
            // Could add logic to prompt user to add more images
        }
    }
}

function clearImageData() {
    const imageDataInput = document.getElementById('formImageData');
    if (imageDataInput) {
        imageDataInput.value = '';
    }
}

function isImageSource(value) {
    return typeof value === 'string' && (value.startsWith('data:image') || /^https?:\/\//i.test(value));
}

function renderProductImage(image) {
    // Handle both single image (backward compatibility) and array of images
    const imageSrc = Array.isArray(image) ? image[0] : image;

    if (isImageSource(imageSrc)) {
        return `<img src="${imageSrc}" alt="Product image" style="width:100%; height:100%; object-fit:cover; border-radius:10px;">`;
    }
    return `<span style="font-size: 3rem;">${imageSrc || '📦'}</span>`;
}

function toggleProductForm() {
    const form = document.getElementById('productForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display === 'block') {
        document.getElementById('productFormId').value = '';
        document.getElementById('formName').value = '';
        document.getElementById('formPrice').value = '';
        document.getElementById('formDescription').value = '';
        document.getElementById('formImageFile').value = '';
        document.getElementById('formImageData').value = '';
        document.getElementById('formImagePreview').innerHTML = '';
        document.getElementById('formStock').value = '';
    }
}

function saveProduct() {
    const id = document.getElementById('productFormId').value;
    const name = document.getElementById('formName').value.trim();
    const category = document.getElementById('formCategory').value;
    const price = parseFloat(document.getElementById('formPrice').value);
    const description = document.getElementById('formDescription').value.trim();
    const imageData = document.getElementById('formImageData').value;
    const stock = parseInt(document.getElementById('formStock').value);
    const returnPolicy = document.getElementById('formReturnPolicy').value;

    if (!name || !price || !description || !stock) {
        showNotification('Please fill in all fields');
        return;
    }

    let images = [];
    if (imageData) {
        try {
            images = JSON.parse(imageData);
        } catch (e) {
            showNotification('Invalid image data');
            return;
        }
    }

    if (images.length < 2) {
        showNotification('Please upload at least 2 product images');
        return;
    }

    const existingProduct = id ? products.find(p => p.id === parseInt(id)) : null;
    if (id && images.length === 0 && existingProduct) {
        images = existingProduct.images || [existingProduct.image];
    }

    if (id) {
        // Edit existing product
        const product = products.find(p => p.id === parseInt(id));
        if (product) {
            product.name = name;
            product.category = category;
            product.price = price;
            product.description = description;
            product.stock = stock;
            product.returnPolicy = returnPolicy;
            product.images = images.length > 0 ? images : product.images;
            // Keep backward compatibility
            product.image = images[0] || product.image;
        }
    } else {
        // Add new product
        const newProduct = {
            id: Math.max(...products.map(p => p.id)) + 1,
            name: name,
            category: category,
            collection: 'casual',
            price: price,
            originalPrice: price,
            images: images,
            image: images[0] || '📦', // Keep backward compatibility
            description: description,
            stock: stock,
            rating: 4.5,
            reviews: 0,
            isNew: true,
            returnPolicy: returnPolicy
        };
        products.push(newProduct);
    }

    toggleProductForm();
    renderAdminProducts();
    saveToStorage();
    showNotification('Product saved successfully!');
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const index = products.findIndex(p => p.id === productId);
        if (index > -1) {
            products.splice(index, 1);
            renderAdminProducts();
            showNotification('Product deleted successfully');
        }
    }
}

function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productFormId').value = productId;
        document.getElementById('formName').value = product.name;
        document.getElementById('formCategory').value = product.category;
        document.getElementById('formPrice').value = product.price;
        document.getElementById('formDescription').value = product.description;
        document.getElementById('formStock').value = product.stock;
        document.getElementById('formReturnPolicy').value = product.returnPolicy || 'No returns allowed';
        document.getElementById('formImageFile').value = '';
        document.getElementById('formImageData').value = '';

        const preview = document.getElementById('formImagePreview');
        preview.innerHTML = '';

        // Handle images (new array format or old single image)
        const images = product.images || [product.image];
        if (images.length > 0) {
            images.forEach((imageSrc, index) => {
                if (isImageSource(imageSrc)) {
                    const thumbnail = document.createElement('div');
                    thumbnail.className = 'image-thumbnail';
                    thumbnail.innerHTML = `
                        <img src="${imageSrc}" alt="Image ${index + 1}">
                        <button class="remove-thumbnail" onclick="removeImageThumbnail(${index})" title="Remove image">×</button>
                    `;
                    preview.appendChild(thumbnail);
                }
            });
            document.getElementById('formImageData').value = JSON.stringify(images.filter(img => isImageSource(img)));
        }

        document.getElementById('productForm').style.display = 'block';
        document.querySelector('.admin-content').scrollTop = 0;
    }
}

function renderAdminProducts() {
    const list = document.getElementById('adminProductsList');
    list.innerHTML = '';

    products.forEach(product => {
        const imageContent = isImageSource(product.image)
            ? `<img src="${product.image}" alt="${product.name}">`
            : product.image;

        const item = document.createElement('div');
        item.className = 'admin-product-item';
        item.innerHTML = `
            <div class="admin-product-image">${imageContent}</div>
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p>Category: ${product.category}</p>
                <p>Price: ₹${Math.round(product.price)} | Stock: ${product.stock}</p>
            </div>
            <div class="admin-product-actions">
                <button onclick="editProduct(${product.id})">Edit</button>
                <button onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function toggleOfferForm() {
    const form = document.getElementById('offerForm');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
    if (form.style.display === 'block') {
        document.getElementById('offerFormId').value = '';
        document.getElementById('formOfferName').value = '';
        document.getElementById('formDiscount').value = '';
        document.getElementById('formOfferCategory').value = '';
        document.getElementById('formOfferEndDate').value = '';
    }
}

function saveOffer() {
    const id = document.getElementById('offerFormId').value;
    const name = document.getElementById('formOfferName').value;
    const discount = parseInt(document.getElementById('formDiscount').value);
    const category = document.getElementById('formOfferCategory').value;
    const endDate = document.getElementById('formOfferEndDate').value;

    if (!name || !discount || !endDate) {
        showNotification('Please fill in all fields');
        return;
    }

    if (id) {
        const offer = offers.find(o => o.id === parseInt(id));
        if (offer) {
            offer.name = name;
            offer.discount = discount;
            offer.category = category;
            offer.endDate = endDate;
        }
    } else {
        const newOffer = {
            id: Math.max(...offers.map(o => o.id), 0) + 1,
            name: name,
            discount: discount,
            category: category,
            endDate: endDate
        };
        offers.push(newOffer);
    }

    saveToStorage();
    toggleOfferForm();
    renderAdminOffers();
    renderShopGrid();
    showNotification('Offer saved successfully!');
}

function deleteOffer(offerId) {
    if (confirm('Are you sure?')) {
        offers = offers.filter(o => o.id !== offerId);
        saveToStorage();
        renderAdminOffers();
        renderShopGrid();
        showNotification('Offer deleted');
    }
}

function editOffer(offerId) {
    const offer = offers.find(o => o.id === offerId);
    if (offer) {
        document.getElementById('offerFormId').value = offerId;
        document.getElementById('formOfferName').value = offer.name;
        document.getElementById('formDiscount').value = offer.discount;
        document.getElementById('formOfferCategory').value = offer.category;
        document.getElementById('formOfferEndDate').value = offer.endDate;
        document.getElementById('offerForm').style.display = 'block';
    }
}

function renderAdminOffers() {
    const list = document.getElementById('offersList');
    list.innerHTML = '';

    offers.forEach(offer => {
        const item = document.createElement('div');
        item.className = 'offer-item';
        item.innerHTML = `
            <h4>${offer.name} - ${offer.discount}% OFF</h4>
            <p>Category: ${offer.category || 'All Products'}</p>
            <p>Valid until: ${offer.endDate}</p>
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <button onclick="editOffer(${offer.id})" style="padding: 0.5rem 1rem; background: var(--secondary-dark); border: 1px solid var(--border-color); color: var(--text-secondary); cursor: pointer; border-radius: 5px;">Edit</button>
                <button onclick="deleteOffer(${offer.id})" style="padding: 0.5rem 1rem; background: var(--danger-color); border: none; color: white; cursor: pointer; border-radius: 5px;">Delete</button>
            </div>
        `;
        list.appendChild(item);
    });
}

function renderAdminOrders() {
    const list = document.getElementById('adminOrdersList');
    list.innerHTML = '';

    if (orders.length === 0) {
        list.innerHTML = `
            <div class="empty-state" style="text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p style="font-size: 2rem; margin-bottom: 1rem;">📦</p>
                <p>No orders placed yet</p>
                <p style="font-size: 0.9rem;">Orders will appear here when customers place them</p>
            </div>
        `;
        return;
    }

    // Stats
    const totalOrders = orders.length;
    const processingOrders = orders.filter(o => o.status === 'Processing').length;
    const shippedOrders = orders.filter(o => o.status === 'Shipped').length;
    const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

    const statsSummary = document.createElement('div');
    statsSummary.style.cssText = `display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 1rem; margin-bottom: 2rem;`;
    statsSummary.innerHTML = `
        <div style="background: rgba(212,175,55,0.1); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(212,175,55,0.2);">
            <p style="margin: 0 0 0.5rem 0; color: var(--text-secondary); font-size: 0.85rem;">Total</p>
            <p style="margin: 0; color: var(--gold-accent); font-size: 1.6rem; font-weight: 700;">${totalOrders}</p>
        </div>
        <div style="background: rgba(245,158,11,0.1); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(245,158,11,0.2);">
            <p style="margin: 0 0 0.5rem 0; color: var(--text-secondary); font-size: 0.85rem;">Processing</p>
            <p style="margin: 0; color: #f59e0b; font-size: 1.6rem; font-weight: 700;">${processingOrders}</p>
        </div>
        <div style="background: rgba(59,130,246,0.1); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(59,130,246,0.2);">
            <p style="margin: 0 0 0.5rem 0; color: var(--text-secondary); font-size: 0.85rem;">Shipped</p>
            <p style="margin: 0; color: #3b82f6; font-size: 1.6rem; font-weight: 700;">${shippedOrders}</p>
        </div>
        <div style="background: rgba(74,222,128,0.1); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(74,222,128,0.2);">
            <p style="margin: 0 0 0.5rem 0; color: var(--text-secondary); font-size: 0.85rem;">Delivered</p>
            <p style="margin: 0; color: #4ade80; font-size: 1.6rem; font-weight: 700;">${deliveredOrders}</p>
        </div>
        <div style="background: rgba(212,175,55,0.1); padding: 1rem; border-radius: 8px; text-align: center; border: 1px solid rgba(212,175,55,0.2);">
            <p style="margin: 0 0 0.5rem 0; color: var(--text-secondary); font-size: 0.85rem;">Revenue</p>
            <p style="margin: 0; color: var(--gold-accent); font-size: 1.4rem; font-weight: 700;">₹${Math.round(totalRevenue/100000)}L</p>
        </div>
    `;
    list.appendChild(statsSummary);

    orders.forEach((order) => {
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('en-IN');
        const statusColor = order.status === 'Delivered' ? '#4ade80' : 
                           order.status === 'Shipped' ? '#3b82f6' :
                           order.status === 'Processing' ? '#f59e0b' : '#ef4444';

        const item = document.createElement('div');
        item.style.cssText = `background: rgba(26,26,26,0.6); border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;`;

        item.innerHTML = `
            <div style="display: grid; grid-template-columns: 1fr 200px; gap: 1.5rem; margin-bottom: 1rem;">
                <div>
                    <h3 style="color: var(--gold-accent); margin: 0 0 0.5rem 0; font-size: 1.1rem;">Order #${String(order.id).padStart(6, '0')}</h3>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;"><strong>👤 Customer:</strong> ${order.customerName}</p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;"><strong>📧 Email:</strong> ${order.customerEmail}</p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;"><strong>📅 Date:</strong> ${formattedDate}</p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;"><strong>🏷️ Tracking:</strong> ${order.trackingNumber}</p>
                </div>
                <div style="text-align: right;">
                    <div style="background: rgba(212, 175, 55, 0.2); padding: 0.8rem; border-radius: 8px; margin-bottom: 0.5rem;">
                        <p style="margin: 0; color: var(--gold-accent); font-size: 1.6rem; font-weight: 700;">₹${Math.round(order.total).toLocaleString('en-IN')}</p>
                        <p style="margin: 0.3rem 0 0 0; color: var(--text-secondary); font-size: 0.8rem;">Total</p>
                    </div>
                    <p style="margin: 0; padding: 0.4rem 0.8rem; background: ${statusColor}20; border: 2px solid ${statusColor}; border-radius: 6px; color: ${statusColor}; font-weight: 700; text-align: center;">${order.status}</p>
                </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <p style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-weight: 600; font-size: 0.9rem;">📍 Delivery Address</p>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">${order.shippingAddress}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-weight: 600; font-size: 0.9rem;">🚚 Delivery Preferences</p>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">
                            ${order.deliveryPreferences ? `<strong>${order.deliveryPreferences.preferredTimeSlot || 'Anytime'}</strong>` : 'Not specified'}
                        </p>
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <p style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-weight: 600; font-size: 0.9rem;">💳 Payment</p>
                        <p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">${order.paymentMethod}</p>
                    </div>
                    <div>
                        <p style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-weight: 600; font-size: 0.9rem;">💰 Refund Status</p>
                        <p style="margin: 0; color: ${order.refundStatus === 'Completed' ? '#4ade80' : order.refundStatus === 'Processing' ? '#f59e0b' : '#999'}; font-size: 0.85rem; font-weight: 600;">
                            ${order.refundStatus ? order.refundStatus : 'No Refund'}
                        </p>
                    </div>
                </div>
            </div>

            <div style="background: rgba(212, 175, 55, 0.05); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 8px; padding: 0.8rem; margin-bottom: 1rem;">
                <p style="margin: 0 0 0.5rem 0; color: var(--text-primary); font-weight: 600;">📦 Items</p>
                ${order.items.map((item, idx) => `
                    <div style="display: flex; justify-content: space-between; padding: 0.4rem; border-bottom: ${idx < order.items.length - 1 ? '1px solid rgba(212,175,55,0.1)' : 'none'};">
                        <span style="color: var(--text-secondary);">${item.name} × ${item.quantity}</span>
                        <span style="color: var(--gold-accent); font-weight: 600;">₹${Math.round(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                `).join('')}
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 0.8rem; padding-top: 0.8rem; border-top: 1px solid rgba(212,175,55,0.2);">
                    <div><p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Subtotal: <strong style="color: var(--text-primary);">₹${Math.round(order.subtotal).toLocaleString('en-IN')}</strong></p></div>
                    <div><p style="margin: 0; color: var(--text-secondary); font-size: 0.85rem;">Tax (5%): <strong style="color: var(--text-primary);">₹${Math.round(order.tax).toLocaleString('en-IN')}</strong></p></div>
                </div>
            </div>

            ${order.returnRequest ? `
                <div style="background: rgba(139, 92, 246, 0.15); border: 2px solid rgba(139, 92, 246, 0.3); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.5rem 0; color: #8b5cf6; font-weight: 700;">🔄 Return Request</p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;"><strong>Reason:</strong> ${order.returnRequest.reason}</p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;"><strong>Status:</strong> <span style="color: #8b5cf6; font-weight: 600;">${order.returnRequest.status}</span></p>
                    ${order.returnRequest.status === 'Pending' ? `
                        <div style="display: flex; gap: 0.5rem; margin-top: 0.8rem;">
                            <button onclick="approveReturn(${order.id})" style="flex: 1; padding: 0.5rem; background: #4ade80; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">✓ Approve</button>
                            <button onclick="rejectReturn(${order.id})" style="flex: 1; padding: 0.5rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;">✕ Reject</button>
                        </div>
                    ` : ''}
                </div>
            ` : ''}

            ${order.reviews && order.reviews.length > 0 ? `
                <div style="background: rgba(59, 130, 246, 0.15); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 1rem; margin-bottom: 1rem;">
                    <p style="margin: 0 0 0.5rem 0; color: #3b82f6; font-weight: 700;">⭐ Customer Review</p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;"><strong>Rating:</strong> ${'⭐'.repeat(order.reviews[0].rating)}</p>
                    <p style="margin: 0.3rem 0; color: var(--text-secondary); font-size: 0.9rem;">${order.reviews[0].comment}</p>
                </div>
            ` : ''}

            <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                <select onchange="updateOrderStatus(${order.id}, this.value)" style="flex: 1; min-width: 140px; padding: 0.6rem; background: var(--tertiary-dark); color: var(--gold-accent); border: 2px solid rgba(212, 175, 55, 0.3); border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">
                    <option value="">-- Status --</option>
                    <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
                <button onclick="updateRefundStatus(${order.id}, 'Initiated')" style="padding: 0.6rem 1rem; background: #8b5cf6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">💰 Refund</button>
                <button onclick="generateShippingLabel(${order.id})" style="padding: 0.6rem 1rem; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">🏷️ Label</button>
                <button onclick="deleteOrder(${order.id})" style="padding: 0.6rem 1rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 0.9rem;">🗑 Delete</button>
            </div>
        `;
        list.appendChild(item);
    });

    const statOrders = document.getElementById('statOrders');
    if (statOrders) statOrders.textContent = orders.length;
}

function exitAdminPanel() {
    currentUser = null;
    localStorage.removeItem('luxeUser');
    checkUserLogin();
    navigateTo('home');
    showNotification('Admin panel closed');
}

// Update Order Status
function updateOrderStatus(orderId, status) {
    if (!status) return; // Skip if no status selected
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const oldStatus = order.status;
        order.status = status;
        
        // Set actual delivery date when marked as Delivered
        if (status === 'Delivered' && !order.actualDeliveryDate) {
            order.actualDeliveryDate = new Date().toISOString();
        }
        
        // Add to tracking history
        if (!order.trackingHistory) {
            order.trackingHistory = [];
        }
        
        let message = `Order status updated to ${status}`;
        if (status === 'Shipped') {
            message = 'Order has been shipped! Track your package.';
        } else if (status === 'Delivered') {
            message = 'Order delivered successfully!';
        } else if (status === 'Cancelled') {
            message = 'Order has been cancelled.';
        }
        
        order.trackingHistory.push({
            status: status,
            date: new Date().toISOString(),
            message: message
        });
        
        saveToStorage();
        renderAdminOrders();
        showNotification(`Order #${orderId} updated to ${status}`);
    }
}

// Delete Order
function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        orders = orders.filter(o => o.id !== orderId);
        saveToStorage();
        updateAdminDashboard();
        showNotification(`Order #${orderId} deleted successfully`);
    }
}

// Show Product Details
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found');
        return;
    }

    const modal = document.getElementById('productDetailsModal');
    if (!modal) {
        showNotification('Modal not found');
        return;
    }
    const container = document.getElementById('productDetailsContainer');
    if (!container) {
        showNotification('Container not found');
        return;
    }
    
    container.innerHTML = `
        <div style="text-align: center;">
            <p style="font-size: 3rem; margin: 0 0 1rem 0;">${product.image}</p>
            <h2 style="color: var(--gold-accent); margin: 0 0 0.5rem 0;">${product.name}</h2>
            <p style="color: var(--text-secondary); margin: 0 0 1.5rem 0; font-size: 0.9rem;">Category: ${product.category}</p>
        </div>

        <div style="background: rgba(212,175,55,0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.3rem;">Price</p>
                    <p style="color: var(--gold-accent); font-size: 1.5rem; font-weight: 700; margin: 0;">₹${Math.round(product.price).toLocaleString('en-IN')}</p>
                </div>
                <div>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.3rem;">Stock Available</p>
                    <p style="color: ${product.stock > 0 ? '#4ade80' : '#ef4444'}; font-size: 1.2rem; font-weight: 700; margin: 0;">${product.stock} units</p>
                </div>
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: var(--gold-accent); margin: 0 0 0.5rem 0;">Description</h4>
            <p style="color: var(--text-secondary); margin: 0; line-height: 1.6;">${product.description}</p>
        </div>

        <div style="background: rgba(212,175,55,0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
            <h4 style="color: var(--gold-accent); margin: 0 0 0.5rem 0;">📋 Return Policy</h4>
            <p style="color: var(--text-secondary); margin: 0; font-weight: 600;">
                ${product.returnPolicy || 'No returns allowed'}
            </p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
            <div>
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.3rem;">Rating</p>
                <p style="color: var(--gold-accent); font-size: 1.2rem; font-weight: 700; margin: 0;">⭐ ${product.rating || 0}</p>
            </div>
            <div>
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.3rem;">Reviews</p>
                <p style="color: var(--gold-accent); font-size: 1.2rem; font-weight: 700; margin: 0;">${product.reviews || 0}</p>
            </div>
        </div>

        <button onclick="closeProductDetails()" style="width: 100%; padding: 0.8rem; background: var(--gold-accent); color: var(--tertiary-dark); border: none; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 1rem;">Close</button>
    `;
    
    modal.classList.remove('active');
    modal.style.display = 'flex';
    modal.classList.add('active');
}

function closeProductDetails() {
    const modal = document.getElementById('productDetailsModal');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
}

// Photo expansion function for return requests
function expandPhoto(photoUrl) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        cursor: zoom-out;
    `;
    modal.onclick = () => modal.remove();
    
    const img = document.createElement('img');
    img.src = photoUrl;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 12px;
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
    `;
    img.onclick = (e) => e.stopPropagation();
    
    modal.appendChild(img);
    document.body.appendChild(modal);
}

// Return request modal functions
function openReturnModal(orderId, itemIndex) {
    const returnModal = document.getElementById('returnRequestModal');
    if (!returnModal) {
        showNotification('Return modal not found');
        return;
    }
    
    // Store order ID and item index for submission
    document.getElementById('returnForm').dataset.orderId = orderId;
    document.getElementById('returnForm').dataset.itemIndex = itemIndex;
    
    // Clear form
    document.getElementById('returnForm').reset();
    document.getElementById('photoPreview').innerHTML = '';
    
    returnModal.style.display = 'flex';
    returnModal.classList.add('active');
}

function closeReturnModal() {
    const returnModal = document.getElementById('returnRequestModal');
    if (returnModal) {
        returnModal.classList.remove('active');
        returnModal.style.display = 'none';
    }
    // Clean up camera if open
    closeCameraModal();
}

// ============================================
// LIVE CAMERA VERIFICATION FUNCTIONS
// ============================================

let cameraStream = null;
let mediaRecorder = null;
let recordedChunks = [];
let recordingStartTime = null;
let recordingInterval = null;

// Start camera capture
async function startCameraCapture() {
    try {
        const cameraModal = document.getElementById('cameraModal');
        const cameraStream_el = document.getElementById('cameraStream');
        
        if (!cameraModal || !cameraStream_el) {
            showNotification('❌ Camera interface not found', 'error');
            return;
        }
        
        // Request camera access
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment', // Back camera for showing product
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });
        
        cameraStream = stream;
        cameraStream_el.srcObject = stream;
        cameraModal.style.display = 'flex';
        
        // Show photo capture button
        document.getElementById('capturePhotoBtn').style.display = 'block';
        document.getElementById('toggleRecordBtn').style.display = 'none';
        document.getElementById('recordingTimer').style.display = 'none';
        
        showNotification('📷 Camera ready! Take a photo.', 'success');
        
    } catch (error) {
        console.error('Camera error:', error);
        
        let errorMsg = '❌ Camera access denied. ';
        if (error.name === 'NotAllowedError') {
            errorMsg += 'Please allow camera access in browser settings.';
        } else if (error.name === 'NotFoundError') {
            errorMsg += 'No camera found on device.';
        } else {
            errorMsg += error.message;
        }
        
        showNotification(errorMsg, 'error');
    }
}

// Capture photo from camera
function capturePhotoFromCamera() {
    const canvas = document.createElement('canvas');
    const cameraStream_el = document.getElementById('cameraStream');
    
    canvas.width = cameraStream_el.videoWidth;
    canvas.height = cameraStream_el.videoHeight;
    canvas.getContext('2d').drawImage(cameraStream_el, 0, 0);
    
    // Convert canvas to blob and add to form
    canvas.toBlob((blob) => {
        const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
        
        // Create a DataTransfer-like object
        const dataTransfer = new DataTransfer();
        
        // Add existing files
        const existingInput = document.getElementById('returnPhotos');
        if (existingInput && existingInput.files) {
            Array.from(existingInput.files).forEach(f => {
                dataTransfer.items.add(f);
            });
        }
        
        // Add new photo
        dataTransfer.items.add(file);
        
        // Update input
        if (existingInput) {
            existingInput.files = dataTransfer.files;
            handlePhotoUpload(existingInput);
        }
        
        updatePhotoCounter();
        showNotification('✅ Photo captured and added!', 'success');
        closeCameraModal();
        
    }, 'image/jpeg', 0.9);
}

// Start video recording
async function startVideoCapture() {
    try {
        const cameraModal = document.getElementById('cameraModal');
        const cameraStream_el = document.getElementById('cameraStream');
        
        if (!cameraModal || !cameraStream_el) {
            showNotification('❌ Camera interface not found', 'error');
            return;
        }
        
        // Request camera with audio for defect explanation
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: true
        });
        
        cameraStream = stream;
        cameraStream_el.srcObject = stream;
        cameraModal.style.display = 'flex';
        
        // Hide photo button, show record button
        document.getElementById('capturePhotoBtn').style.display = 'none';
        document.getElementById('toggleRecordBtn').style.display = 'block';
        document.getElementById('toggleRecordBtn').textContent = '⏹️ Start Recording';
        document.getElementById('toggleRecordBtn').onclick = () => toggleVideoRecording();
        
        // Setup media recorder
        const options = { mimeType: 'video/webm;codecs=vp8,opus' };
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options.mimeType = 'video/webm';
        }
        
        mediaRecorder = new MediaRecorder(stream, options);
        recordedChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = () => {
            saveVideoRecording();
        };
        
        showNotification('🎥 Video capture ready! Press to record.', 'success');
        
    } catch (error) {
        console.error('Video capture error:', error);
        showNotification('❌ Video capture error: ' + error.message, 'error');
    }
}

// Toggle video recording
function toggleVideoRecording() {
    const btn = document.getElementById('toggleRecordBtn');
    const timer = document.getElementById('recordingTimer');
    
    if (!mediaRecorder) {
        showNotification('❌ Media recorder not initialized', 'error');
        return;
    }
    
    if (mediaRecorder.state === 'recording') {
        // Stop recording
        mediaRecorder.stop();
        btn.textContent = '⏹️ Start Recording';
        timer.style.display = 'none';
        clearInterval(recordingInterval);
        showNotification('✅ Video recording saved!', 'success');
    } else {
        // Start recording
        recordedChunks = [];
        mediaRecorder.start();
        recordingStartTime = Date.now();
        btn.textContent = '⏹️ Stop Recording';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        timer.style.display = 'block';
        
        // Update recording timer
        recordingInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            timer.textContent = `REC: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            
            // Limit to 2 minutes
            if (elapsed >= 120) {
                toggleVideoRecording();
            }
        }, 100);
        
        showNotification('🔴 Recording... (Max 2 minutes)', 'info');
    }
}

// Save video recording
function saveVideoRecording() {
    if (recordedChunks.length === 0) {
        showNotification('❌ No video data recorded', 'error');
        return;
    }
    
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const file = new File([blob], `video-${Date.now()}.webm`, { type: 'video/webm' });
    
    // Create a hidden input for video
    let videoInput = document.getElementById('returnVideo');
    if (!videoInput) {
        videoInput = document.createElement('input');
        videoInput.type = 'hidden';
        videoInput.id = 'returnVideo';
        document.getElementById('returnForm').appendChild(videoInput);
    }
    
    // Store video file
    videoInput.dataset.videoFile = file;
    
    // Create preview
    const videoUrl = URL.createObjectURL(blob);
    let videoPreview = document.getElementById('videoPreview');
    if (!videoPreview) {
        videoPreview = document.createElement('div');
        videoPreview.id = 'videoPreview';
        videoPreview.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(76, 175, 80, 0.1);
            border-radius: 8px;
            border: 1px solid #4ade80;
        `;
        document.getElementById('photoPreview').parentElement.appendChild(videoPreview);
    }
    
    videoPreview.innerHTML = `
        <p style="margin: 0 0 0.5rem 0; color: #4ade80; font-weight: 600;">🎥 Video Recorded</p>
        <video src="${videoUrl}" controls style="width: 100%; max-height: 200px; border-radius: 6px;"></video>
        <button type="button" onclick="removeVideoPreview()" style="margin-top: 0.5rem; padding: 0.4rem 0.8rem; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.85rem;">Remove Video</button>
    `;
    
    showNotification('✅ Video saved! (60 second limit)', 'success');
    closeCameraModal();
}

// Remove video preview
function removeVideoPreview() {
    const videoPreview = document.getElementById('videoPreview');
    if (videoPreview) {
        videoPreview.remove();
    }
    const videoInput = document.getElementById('returnVideo');
    if (videoInput) {
        videoInput.remove();
    }
}

// Close camera modal
function closeCameraModal() {
    const cameraModal = document.getElementById('cameraModal');
    if (cameraModal) {
        cameraModal.style.display = 'none';
    }
    
    // Stop camera stream
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }
    
    // Stop recording
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
    }
    
    // Clear timer
    if (recordingInterval) {
        clearInterval(recordingInterval);
    }
    
    const timer = document.getElementById('recordingTimer');
    if (timer) {
        timer.style.display = 'none';
    }
}

// Update photo counter
function updatePhotoCounter() {
    const photoInput = document.getElementById('returnPhotos');
    const counter = document.getElementById('photoCounter');
    
    if (photoInput && counter) {
        const count = photoInput.files.length;
        counter.textContent = `✓ ${count} photo(s) captured (minimum 1 required)`;
        counter.style.color = count > 0 ? '#4ade80' : 'var(--text-secondary)';
    }
}

// Lightweight mock AI analyzer for return requests (placeholder for real service)
// ============================================
// 🔴 REAL-TIME UPDATE SYSTEM FOR RETURNS
// ============================================

// Broadcast return status update to listening customers
function broadcastReturnStatusUpdate(orderId, requestId, status, details = '') {
    const event = new CustomEvent('returnStatusUpdate', {
        detail: {
            orderId: orderId,
            requestId: requestId,
            status: status,
            details: details,
            timestamp: new Date().toISOString()
        }
    });
    
    // Dispatch to window so any page listening can hear it
    window.dispatchEvent(event);
    
    // Also broadcast via localStorage for cross-tab communication
    localStorage.setItem('lastReturnUpdate', JSON.stringify({
        orderId: orderId,
        requestId: requestId,
        status: status,
        timestamp: new Date().toISOString()
    }));
}

// Listen for return status updates on customer side
function listenForReturnUpdates() {
    // Listen for custom events (same-tab instant updates)
    window.addEventListener('returnStatusUpdate', (event) => {
        const { orderId, requestId, status, details } = event.detail;
        console.log(`🔴 LIVE UPDATE RECEIVED: Return ${requestId} status changed to ${status}`);
        console.log(`📍 Current page: ${currentPage}, Orders data exists: ${orders && orders.length > 0}`);
        
        // Always process the update regardless of what page customer is on
        handleReturnStatusChange(orderId, requestId, status, details);
    });
    
    // Listen for localStorage changes (cross-tab communication)
    window.addEventListener('storage', (event) => {
        if (event.key === 'lastReturnUpdate') {
            const update = JSON.parse(event.newValue || '{}');
            console.log(`🔴 CROSS-TAB UPDATE RECEIVED: Return ${update.requestId} status changed to ${update.status}`);
            if (update.orderId) {
                handleReturnStatusChange(update.orderId, update.requestId, update.status, update.details);
            }
        }
    });
    
    console.log(`✅ listenForReturnUpdates() attached event listeners for real-time updates`);
}

// Handle real-time status change for customer
function handleReturnStatusChange(orderId, requestId, newStatus, details = '') {
    console.log(`🔄 HANDLER CALLED: Order=${orderId}, Request=${requestId}, Status=${newStatus}`);
    
    if (!orders || orders.length === 0) {
        console.warn(`⚠️ Orders array is empty`);
        return;
    }
    
    // Find the order
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        console.warn(`⚠️ Order ${orderId} not found in orders array`);
        return;
    }
    
    if (!order.returnRequests || order.returnRequests.length === 0) {
        console.warn(`⚠️ Order ${orderId} has no return requests`);
        return;
    }
    
    // Find the return request
    const request = order.returnRequests.find(r => r.id === requestId);
    if (!request) {
        console.warn(`⚠️ Return request ${requestId} not found in order ${orderId}`);
        console.log(`   Available requests:`, order.returnRequests.map(r => ({ id: r.id, status: r.status })));
        return;
    }
    
    // Update the status
    const oldStatus = request.status;
    request.status = newStatus;
    console.log(`✅ Updated status: ${oldStatus} → ${newStatus}`);
    
    // Update tracking history
    if (newStatus !== oldStatus) {
        request.trackingHistory = request.trackingHistory || [];
        request.trackingHistory.push({
            status: newStatus,
            date: new Date().toISOString(),
            note: details || `Admin updated status to ${newStatus}`
        });
        console.log(`✅ Updated tracking history`);
    }
    
    // Save to localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log(`✅ Saved to localStorage`);
    
    // Re-render if customer is viewing account
    if (currentPage === 'account') {
        console.log(`✅ CurrentPage is account, calling renderAccount()...`);
        renderAccount();
        console.log(`✅ renderAccount() completed`);
    } else {
        console.log(`⚠️ CurrentPage is not account (it's: ${currentPage}), skipping renderAccount()`);
    }
    
    // Show notification
    const notificationMap = {
        'Approved': `✅ Great news! Your return request was APPROVED! Please ship the item.`,
        'Rejected': `❌ Your return request was REJECTED. ${details || 'Reason: Does not meet return criteria'}`,
        'Picked': `📦 Your return pickup has been SCHEDULED! Please prepare your item for pickup.`
    };
    
    if (notificationMap[newStatus]) {
        console.log(`📢 Showing notification`);
        showNotification(notificationMap[newStatus], 'info');
        
        // Highlight the updated return card
        setTimeout(() => {
            highlightReturnUpdate(requestId);
        }, 500);
    }
}

// Visual highlight for updated return request
function highlightReturnUpdate(requestId) {
    const elements = document.querySelectorAll(`[data-return-id="${requestId}"]`);
    elements.forEach(el => {
        // Add a glowing animation
        el.style.animation = 'glow 2s ease-in-out 3';
        setTimeout(() => {
            el.style.animation = 'none';
        }, 6000);
    });
}

// Trigger live update without page refresh
function triggerLiveCustomerUpdate(orderId) {
    // This broadcasts to all listening customers in real-time
    broadcastReturnStatusUpdate(orderId, '', 'StatusCheck');
}

// Start listening for updates when page loads
document.addEventListener('DOMContentLoaded', () => {
    listenForReturnUpdates();
});

// If not using DOMContentLoaded, try this too
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        listenForReturnUpdates();
    });
} else {
    listenForReturnUpdates();
}

function analyzeReturnRequest(returnRequest) {
    try {
        const scoreBase = 20; // base trust
        let score = scoreBase;

        // More photos reduce risk
        if (returnRequest.photos && returnRequest.photos.length >= 3) score -= 10;
        else if (returnRequest.photos && returnRequest.photos.length === 2) score -= 6;
        else if (returnRequest.photos && returnRequest.photos.length === 1) score -= 2;

        // Video reduces risk more
        if (returnRequest.hasVideo) score -= 15;

        // Certain reasons are higher risk
        const highRiskReasons = ['Changed mind', 'Better price'];
        if (highRiskReasons.includes(returnRequest.reason)) score += 25;

        // Very recent orders marked suspicious
        const submitted = new Date(returnRequest.submittedDate || Date.now());
        const ageHours = (Date.now() - submitted.getTime()) / (1000 * 60 * 60);
        if (ageHours < 48) score += 5;

        // Clamp
        score = Math.max(0, Math.min(100, Math.round(score)));

        // Flags
        const flags = [];
        if (returnRequest.hasVideo) flags.push('VIDEO_EVIDENCE');
        if (returnRequest.photos && returnRequest.photos.length >= 3) flags.push('MULTI_PHOTO');
        if (highRiskReasons.includes(returnRequest.reason)) flags.push('HIGH_RISK_REASON');

        return { score, flags };
    } catch (e) {
        return { score: 50, flags: ['ANALYZER_ERROR'] };
    }
}

// Handle photo uploads for return request
function handlePhotoUpload(fileInput) {
    const files = fileInput.files;
    const photoPreview = document.getElementById('photoPreview');
    
    Array.from(files).forEach((file, idx) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const photoDiv = document.createElement('div');
            photoDiv.style.cssText = `
                position: relative;
                width: 120px;
                height: 120px;
                overflow: hidden;
                border-radius: 8px;
                background: rgba(0,0,0,0.3);
                border: 2px solid rgba(212,175,55,0.3);
            `;
            photoDiv.innerHTML = `
                <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">
                <button type="button" onclick="this.parentElement.remove(); updatePhotoCounter();" style="position: absolute; top: 2px; right: 2px; background: rgba(239, 68, 68, 0.9); color: white; border: none; width: 28px; height: 28px; cursor: pointer; border-radius: 4px; font-size: 16px; font-weight: bold;">×</button>
            `;
            photoPreview.appendChild(photoDiv);
            updatePhotoCounter();
        };
        reader.readAsDataURL(file);
    });
}

// Update photo counter
function updatePhotoCounter() {
    const photoElements = document.getElementById('photoPreview').querySelectorAll('img');
    const count = photoElements.length;
    const photoCountEl = document.getElementById('photoCount');
    if (photoCountEl) {
        photoCountEl.textContent = count;
    }
}

// Update verification steps based on selected reason
function updateVerificationSteps() {
    const reason = document.getElementById('returnReason').value;
    const type = document.querySelector('input[name="returnType"]:checked').value;
    
    // Update step indicators based on selections
    if (reason && type) {
        // All steps are relevant, no need to hide/show
        console.log(`Return setup: ${reason} - ${type}`);
    }
}

// Submit return request with photos
function submitReturnRequest(event) {
    event.preventDefault();
    
    const orderId = parseInt(document.getElementById('returnForm').dataset.orderId);
    const itemIndex = parseInt(document.getElementById('returnForm').dataset.itemIndex);
    const reason = document.getElementById('returnReason').value;
    const type = document.querySelector('input[name="returnType"]:checked').value;
    const message = document.getElementById('returnMessage').value;
    
    if (!reason) {
        showNotification('⚠️ Please select a reason for the return', 'warning');
        return;
    }
    
    // Validate photo requirement - minimum 2 photos for faster approval
    const photoElements = document.getElementById('photoPreview').querySelectorAll('img');
    const photoCount = photoElements.length;
    
    if (photoCount === 0) {
        showNotification('⚠️ Please upload at least 1 photo. Upload 2+ photos for faster approval!', 'warning');
        return;
    }
    
    const order = orders.find(o => o.id === orderId);
    if (!order) {
        showNotification('❌ Order not found', 'error');
        return;
    }
    
    const item = order.items[itemIndex];
    if (!item) {
        showNotification('❌ Item not found', 'error');
        return;
    }
    
    // Get photo URLs from preview
    const photos = [];
    photoElements.forEach(img => {
        photos.push(img.src);
    });
    
    // Create return request with Flipkart-style verification
    if (!order.returnRequests) {
        order.returnRequests = [];
    }
    
    const returnRequest = {
        id: `RET-${Date.now()}`,
        productName: item.name,
        itemPrice: item.price,
        reason: reason,
        type: type,
        message: message,
        photos: photos,
        photoCount: photoCount,
        verificationMethod: photoCount >= 2 ? 'multi-photo-verification' : 'single-photo-verification',
        verificationStatus: 'pending', // Can be: pending, verified, rejected
        status: 'Pending',
        submittedDate: new Date().toISOString(),
        estimatedApprovalDate: new Date(new Date().getTime() + (photoCount >= 2 ? 24 * 60 * 60 * 1000 : 48 * 60 * 60 * 1000)).toISOString(),
        refundDetails: {
            amount: item.price * item.quantity,
            currency: 'INR',
            method: 'Original Payment Method',
            status: 'Awaiting Approval'
        },
        trackingHistory: [
            {
                status: 'Submitted',
                date: new Date().toISOString(),
                note: `${type} request submitted with ${photoCount} photo(s) - ${reason}`
            }
        ]
    };
    
    // Run lightweight AI analysis to provide advisory risk score and flags
    try {
        const analysis = analyzeReturnRequest(returnRequest);
        returnRequest.aiRiskScore = analysis.score;
        returnRequest.aiFlags = analysis.flags;
        returnRequest.verificationStatus = analysis.score > 70 ? 'verified' : 'pending';
    } catch (e) {
        returnRequest.aiRiskScore = 50;
        returnRequest.aiFlags = ['ANALYZER_ERROR'];
        returnRequest.verificationStatus = 'pending';
    }
    
    order.returnRequests.push(returnRequest);
    
    saveToStorage();
    closeReturnModal();
    renderAccount();
    updateAdminDashboard();
    
    // Show appropriate success message with timeline
    const approvalTime = photoCount >= 2 ? '24 hours' : '48 hours';
    showNotification(`✅ Return request submitted! We'll verify within ${approvalTime}. Refund: ₹${Math.round(returnRequest.refundDetails.amount)}`, 'success');
}


// Cancel Order (User can cancel processing or shipped orders)
function cancelUserOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
        const order = orders.find(o => o.id === orderId);
        if (order && (order.status === 'Processing' || order.status === 'Shipped')) {
            order.status = 'Cancelled';
            order.trackingHistory.push({
                status: 'Cancelled',
                date: new Date().toISOString(),
                message: 'Order cancelled by customer'
            });
            saveToStorage();
            renderAccount();
            showNotification('Order cancelled successfully. Refund will be processed within 5-7 business days.');
        } else {
            showNotification('This order cannot be cancelled as it has already been delivered.');
        }
    }
}

// Request Return/Replacement
function requestReturn(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const reason = prompt('Please provide reason for return/replacement:\n\nOptions:\n1. Defective\n2. Wrong size/fit\n3. Wrong item\n4. Not as expected\n5. Other (specify)');
    
    if (reason) {
        if (!order.returnRequest) {
            order.returnRequest = {
                status: 'Pending',
                reason: reason,
                requestDate: new Date().toISOString(),
                approvalDate: null
            };
        }
        saveToStorage();
        renderAccount();
        showNotification('Return request submitted. Our team will review within 24 hours. You can track status in your orders.');
    }
}

// Approve Return Request (Admin)
function approveReturn(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order && order.returnRequest) {
        order.returnRequest.status = 'Approved';
        order.returnRequest.approvalDate = new Date().toISOString();
        saveToStorage();
        renderAdminOrders();
        renderAccount();
        showNotification('Return request approved! Customer will receive shipping label.');
    }
}

// Reject Return Request (Admin)
function rejectReturn(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order && order.returnRequest) {
        order.returnRequest.status = 'Rejected';
        saveToStorage();
        renderAdminOrders();
        renderAccount();
        showNotification('Return request rejected.');
    }
}

// Generate Shipping Label
function generateShippingLabel(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const labelHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Shipping Label #${String(order.id).padStart(6, '0')}</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: white; }
            .label-container { max-width: 600px; margin: 0 auto; border: 3px dashed #333; padding: 20px; background: white; }
            .barcode { font-size: 24px; font-weight: bold; letter-spacing: 5px; text-align: center; margin: 20px 0; }
            .address-box { border: 2px solid #000; padding: 20px; margin: 20px 0; font-size: 16px; line-height: 1.8; }
            .sender { background: #f0f0f0; padding: 15px; margin-bottom: 20px; }
            .header { text-align: center; font-size: 20px; font-weight: bold; margin-bottom: 20px; }
            .tracking { background: #ffffcc; padding: 10px; text-align: center; font-weight: bold; margin: 10px 0; }
            .instructions { font-size: 12px; margin-top: 20px; color: #666; }
        </style>
    </head>
    <body>
        <div class="label-container">
            <div class="header">📦 SHIPPING LABEL</div>
            
            <div class="sender">
                <strong>FROM:</strong><br>
                ANCRIO<br>
                Mumbai, India<br>
                support@ancrio.com
            </div>

            <div class="address-box">
                <strong>TO:</strong><br>
                ${order.customerName}<br>
                ${order.shippingAddress}
            </div>

            <div class="tracking">
                Tracking: ${order.trackingNumber}
            </div>

            <div class="barcode">
                ${order.trackingNumber}
            </div>

            <div style="background: #f0f0f0; padding: 10px; text-align: center; margin: 10px 0;">
                <p style="margin: 0;"><strong>Order #${String(order.id).padStart(6, '0')}</strong></p>
                <p style="margin: 5px 0; font-size: 12px;">Items: ${order.items.length} | Total: ₹${Math.round(order.total).toLocaleString('en-IN')}</p>
            </div>

            <div class="instructions">
                <p><strong>Instructions:</strong></p>
                <ul>
                    <li>Print this label on an A4 sheet</li>
                    <li>Cut along the dashed lines</li>
                    <li>Stick this label on the top-left corner of the package</li>
                    <li>Keep the tracking number visible</li>
                    <li>Hand over to courier at pickup point</li>
                </ul>
            </div>

            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
                Generated: ${new Date().toLocaleString('en-IN')} | ANCRIO E-commerce
            </div>
        </div>
        <script>
            window.print();
        </script>
    </body>
    </html>
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(labelHTML));
    element.setAttribute('download', `Shipping_Label_${String(order.id).padStart(6, '0')}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showNotification('Shipping label generated! Ready to print.');
}

// Download Invoice
function downloadInvoice(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;

    const orderDate = new Date(order.date);
    const formattedDate = orderDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    
    let invoiceHTML = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Invoice #${String(order.id).padStart(6, '0')}</title>
        <style>
            body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
            .invoice-container { max-width: 800px; margin: 0 auto; padding: 20px; border: 2px solid #d4af37; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #d4af37; padding-bottom: 15px; }
            .header h1 { color: #d4af37; margin: 0; }
            .header p { margin: 5px 0; color: #666; }
            .order-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .order-info div { flex: 1; }
            .order-info strong { color: #d4af37; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th { background: #f0f0f0; padding: 10px; text-align: left; border-bottom: 2px solid #d4af37; }
            .items-table td { padding: 10px; border-bottom: 1px solid #ddd; }
            .items-table tr:last-child td { border-bottom: 2px solid #d4af37; }
            .total-section { text-align: right; margin-top: 20px; }
            .total-amount { font-size: 24px; color: #d4af37; font-weight: bold; margin-top: 10px; }
            .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <div class="header">
                <h1>ANCRIO</h1>
                <p>Premium Fashion Invoice</p>
            </div>
            
            <div class="order-info">
                <div>
                    <p><strong>Order ID:</strong> ${String(order.id).padStart(6, '0')}</p>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Status:</strong> ${order.status}</p>
                </div>
                <div>
                    <p><strong>Customer Name:</strong> ${order.customerName}</p>
                    <p><strong>Email:</strong> ${order.customerEmail}</p>
                    <p><strong>Address:</strong> ${order.shippingAddress}</p>
                </div>
            </div>

            <table class="items-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>₹${Math.round(item.price).toLocaleString('en-IN')}</td>
                            <td>${item.quantity}</td>
                            <td>₹${Math.round(item.price * item.quantity).toLocaleString('en-IN')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="total-section">
                <p><strong>Subtotal:</strong> ₹${Math.round(order.total).toLocaleString('en-IN')}</p>
                <p><strong>Shipping:</strong> FREE</p>
                <div class="total-amount">Total: ₹${Math.round(order.total).toLocaleString('en-IN')}</div>
            </div>

            <div class="footer">
                <p>Thank you for shopping with ANCRIO!</p>
                <p>This is an electronically generated invoice.</p>
            </div>
        </div>
    </body>
    </html>
    `;

    // Create and download PDF-like document
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(invoiceHTML));
    element.setAttribute('download', `ANCRIO_Invoice_${String(order.id).padStart(6, '0')}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showNotification('Invoice downloaded successfully!');
}

// Search Functionality
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    if (!query) {
        showNotification('Please enter a search term');
        return;
    }

    const searchResults = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );

    navigateTo('shop');
    document.querySelector('.filters-sidebar').style.display = 'none';
    
    const grid = document.getElementById('shopGrid');
    grid.innerHTML = '';

    if (searchResults.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">No products found matching your search</p>';
        return;
    }

    searchResults.forEach(product => {
        grid.appendChild(createProductCard(product));
    });

    document.getElementById('searchInput').value = '';
}

// Update Refund Status (Admin)
function updateRefundStatus(orderId, status) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.refundStatus = status;
        if (status === 'Initiated') {
            order.refundInitiatedDate = new Date().toISOString();
        }
        saveToStorage();
        renderAdminOrders();
        showNotification(`Refund status updated to ${status} for Order #${orderId}`);
    }
}

// ================================
// VENDOR MANAGEMENT SYSTEM
// ================================

// Initialize vendors array from localStorage
function initVendors() {
    if (!localStorage.getItem('vendors')) {
        const defaultVendors = [
            {
                id: 'vendor_001',
                name: 'Amazon India',
                type: 'Marketplace',
                email: 'seller@amazon.in',
                phone: '+91-XXXXXXXX01',
                commission: 15,
                status: 'Active',
                createdDate: '2024-01-15',
                totalOrders: 2850,
                totalRevenue: 4275000,
                riskScore: 2,
                fraudCount: 0,
                lastUpdated: new Date().toISOString()
            },
            {
                id: 'vendor_002',
                name: 'Flipkart Seller',
                type: 'Marketplace',
                email: 'seller@flipkart.com',
                phone: '+91-XXXXXXXX02',
                commission: 18,
                status: 'Active',
                createdDate: '2024-01-20',
                totalOrders: 1950,
                totalRevenue: 2925000,
                riskScore: 3,
                fraudCount: 1,
                lastUpdated: new Date().toISOString()
            }
        ];
        localStorage.setItem('vendors', JSON.stringify(defaultVendors));
    }
}

// Get all vendors
function getVendors() {
    initVendors();
    return JSON.parse(localStorage.getItem('vendors') || '[]');
}

// Save vendors to localStorage
function saveVendors(vendors) {
    localStorage.setItem('vendors', JSON.stringify(vendors));
}

// Toggle vendor form
function toggleVendorForm() {
    const form = document.getElementById('vendorForm');
    if (form.style.display === 'none') {
        form.style.display = 'block';
        document.getElementById('vendorName').focus();
        clearVendorForm();
    } else {
        form.style.display = 'none';
    }
}

// Clear vendor form
function clearVendorForm() {
    document.getElementById('vendorName').value = '';
    document.getElementById('vendorType').value = 'Marketplace';
    document.getElementById('vendorEmail').value = '';
    document.getElementById('vendorPhone').value = '';
    document.getElementById('vendorCommission').value = '';
    document.getElementById('vendorStatus').value = 'Active';
}

// Save new vendor
function saveVendor() {
    const name = document.getElementById('vendorName').value.trim();
    const type = document.getElementById('vendorType').value;
    const email = document.getElementById('vendorEmail').value.trim();
    const phone = document.getElementById('vendorPhone').value.trim();
    const commission = parseFloat(document.getElementById('vendorCommission').value);
    const status = document.getElementById('vendorStatus').value;

    if (!name || !email || !phone || !commission) {
        showNotification('❌ Please fill all required fields!', 'error');
        return;
    }

    if (commission < 0 || commission > 100) {
        showNotification('❌ Commission must be between 0-100%!', 'error');
        return;
    }

    const vendors = getVendors();
    const newVendor = {
        id: 'vendor_' + Date.now(),
        name,
        type,
        email,
        phone,
        commission,
        status,
        createdDate: new Date().toISOString().split('T')[0],
        totalOrders: 0,
        totalRevenue: 0,
        riskScore: 0,
        fraudCount: 0,
        lastUpdated: new Date().toISOString()
    };

    vendors.push(newVendor);
    saveVendors(vendors);
    toggleVendorForm();
    renderVendorsList();
    showNotification(`✅ Vendor "${name}" added successfully!`);
}

// Render vendors list
function renderVendorsList() {
    const vendors = getVendors();
    const container = document.getElementById('vendorsList');
    
    if (vendors.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 2rem; color: #666;">📭 No vendors registered yet. Add your first vendor!</div>';
        return;
    }

    container.innerHTML = vendors.map(vendor => {
        const riskLevel = vendor.riskScore <= 2 ? '🟢 Low Risk' : vendor.riskScore <= 5 ? '🟡 Medium Risk' : '🔴 High Risk';
        const statusBadge = vendor.status === 'Active' ? '✅ Active' : vendor.status === 'Inactive' ? '❌ Inactive' : vendor.status === 'Suspended' ? '⛔ Suspended' : '🔍 Under Review';
        
        return `
            <div style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%); padding: 1.5rem; border-radius: 10px; border-left: 5px solid #3b82f6; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                    <div>
                        <h4 style="margin: 0 0 0.5rem 0; color: #1f2937; font-size: 1.1rem;">🏪 ${vendor.name}</h4>
                        <p style="margin: 0.2rem 0; color: #4b5563; font-size: 0.9rem;">
                            <strong>Type:</strong> ${vendor.type}
                        </p>
                        <p style="margin: 0.2rem 0; color: #4b5563; font-size: 0.9rem;">
                            <strong>Email:</strong> ${vendor.email}
                        </p>
                        <p style="margin: 0.2rem 0; color: #4b5563; font-size: 0.9rem;">
                            <strong>Phone:</strong> ${vendor.phone}
                        </p>
                    </div>
                    <div>
                        <p style="margin: 0.2rem 0; color: #4b5563; font-size: 0.9rem;">
                            <strong>Status:</strong> ${statusBadge}
                        </p>
                        <p style="margin: 0.2rem 0; color: #4b5563; font-size: 0.9rem;">
                            <strong>Commission:</strong> ${commission}%
                        </p>
                        <p style="margin: 0.2rem 0; color: #4b5563; font-size: 0.9rem;">
                            <strong>Joined:</strong> ${vendor.createdDate}
                        </p>
                        <p style="margin: 0.2rem 0; color: #4b5563; font-size: 0.9rem;">
                            <strong>Risk Level:</strong> ${riskLevel}
                        </p>
                    </div>
                </div>

                <!-- Fraud Detection & Monitoring Section -->
                <div style="background: rgba(255,255,255,0.8); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 2px solid #3b82f6;">
                    <h5 style="margin: 0 0 0.8rem 0; color: #1f2937; display: flex; align-items: center; gap: 0.5rem;">
                        🔍 Fraud Detection & Monitoring
                    </h5>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-bottom: 0.8rem;">
                        <div style="background: #ecfdf5; padding: 0.8rem; border-radius: 6px; text-align: center;">
                            <div style="font-size: 1.3rem; font-weight: bold; color: #059669;">📦 ${vendor.totalOrders}</div>
                            <div style="font-size: 0.8rem; color: #047857;">Total Orders</div>
                        </div>
                        <div style="background: #fef3c7; padding: 0.8rem; border-radius: 6px; text-align: center;">
                            <div style="font-size: 1.3rem; font-weight: bold; color: #d97706;">₹${(vendor.totalRevenue / 100000).toFixed(1)}L</div>
                            <div style="font-size: 0.8rem; color: #b45309;">Total Revenue</div>
                        </div>
                        <div style="background: #fee2e2; padding: 0.8rem; border-radius: 6px; text-align: center;">
                            <div style="font-size: 1.3rem; font-weight: bold; color: #dc2626;">⚠️ ${vendor.fraudCount}</div>
                            <div style="font-size: 0.8rem; color: #991b1b;">Fraud Cases</div>
                        </div>
                    </div>

                    <!-- Risk Score Bar -->
                    <div style="margin-bottom: 0.8rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.3rem;">
                            <span style="font-size: 0.9rem; color: #4b5563;"><strong>Risk Score:</strong></span>
                            <span style="font-size: 0.9rem; color: ${vendor.riskScore <= 2 ? '#059669' : vendor.riskScore <= 5 ? '#d97706' : '#dc2626'}; font-weight: bold;">${vendor.riskScore}/10</span>
                        </div>
                        <div style="width: 100%; height: 8px; background: #e5e7eb; border-radius: 4px; overflow: hidden;">
                            <div style="width: ${vendor.riskScore * 10}%; height: 100%; background: ${vendor.riskScore <= 2 ? '#10b981' : vendor.riskScore <= 5 ? '#f59e0b' : '#ef4444'}; transition: width 0.3s;"></div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button onclick="editVendor('${vendor.id}')" style="background: #2563eb; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">✏️ Edit</button>
                        <button onclick="toggleVendorStatus('${vendor.id}', '${vendor.status}')" style="background: ${vendor.status === 'Active' ? '#dc2626' : '#059669'}; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">${vendor.status === 'Active' ? '⛔ Suspend' : '✅ Activate'}</button>
                        <button onclick="viewVendorDetails('${vendor.id}')" style="background: #8b5cf6; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">👁️ View Details</button>
                        <button onclick="deleteVendor('${vendor.id}')" style="background: #6b7280; color: white; padding: 0.5rem 1rem; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">🗑️ Delete</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Edit vendor
function editVendor(vendorId) {
    const vendors = getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    
    if (vendor) {
        document.getElementById('vendorName').value = vendor.name;
        document.getElementById('vendorType').value = vendor.type;
        document.getElementById('vendorEmail').value = vendor.email;
        document.getElementById('vendorPhone').value = vendor.phone;
        document.getElementById('vendorCommission').value = vendor.commission;
        document.getElementById('vendorStatus').value = vendor.status;
        
        const form = document.getElementById('vendorForm');
        form.style.display = 'block';
        form.dataset.editId = vendorId;
        document.getElementById('vendorName').focus();
    }
}

// Toggle vendor status (Active/Suspended)
function toggleVendorStatus(vendorId, currentStatus) {
    const vendors = getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    
    if (vendor) {
        vendor.status = currentStatus === 'Active' ? 'Suspended' : 'Active';
        vendor.lastUpdated = new Date().toISOString();
        saveVendors(vendors);
        renderVendorsList();
        showNotification(`✅ Vendor status updated to "${vendor.status}"`);
    }
}

// View vendor details with fraud history
function viewVendorDetails(vendorId) {
    const vendors = getVendors();
    const vendor = vendors.find(v => v.id === vendorId);
    
    if (vendor) {
        const riskStats = calculateVendorRiskStats(vendor);
        
        alert(`
╔════════════════════════════════════════════════════════════════╗
║          👨‍💼 VENDOR DETAILED AUDIT REPORT █████████████        ║
╚════════════════════════════════════════════════════════════════╝

📍 VENDOR INFORMATION
├─ ID: ${vendor.id}
├─ Name: ${vendor.name}
├─ Type: ${vendor.type}
└─ Status: ${vendor.status}

📧 CONTACT DETAILS
├─ Email: ${vendor.email}
├─ Phone: ${vendor.phone}
└─ Joined: ${vendor.createdDate}

💰 FINANCIAL METRICS
├─ Commission Rate: ${vendor.commission}%
├─ Total Orders: ${vendor.totalOrders}
├─ Total Revenue: ₹${vendor.totalRevenue.toLocaleString('en-IN')}
└─ Avg Order Value: ₹${Math.round(vendor.totalRevenue / Math.max(vendor.totalOrders, 1)).toLocaleString('en-IN')}

🔍 RISK ASSESSMENT
├─ Risk Score: ${vendor.riskScore}/10
├─ Fraud Cases: ${vendor.fraudCount}
├─ Return Rate: ${riskStats.returnRate}%
├─ Chargeback Rate: ${riskStats.chargebackRate}%
└─ Last Updated: ${new Date(vendor.lastUpdated).toLocaleString()}

⚠️ FRAUD INDICATORS
${vendor.riskScore <= 2 ? '✅ All clear - Low risk vendor' : vendor.riskScore <= 5 ? '⚠️ Medium risk - Monitor closely' : '🚨 High risk - Requires immediate action'}
        `);
    }
}

// Calculate vendor risk statistics
function calculateVendorRiskStats(vendor) {
    const returnRate = vendor.totalOrders > 0 ? Math.round((vendor.fraudCount / vendor.totalOrders) * 100) : 0;
    const chargebackRate = Math.random() < 0.3 ? Math.floor(Math.random() * 5) : 0;
    
    return {
        returnRate,
        chargebackRate
    };
}

// Delete vendor
function deleteVendor(vendorId) {
    if (confirm('⚠️ Are you sure you want to delete this vendor? This action cannot be undone!')) {
        const vendors = getVendors();
        const index = vendors.findIndex(v => v.id === vendorId);
        
        if (index > -1) {
            const deletedVendor = vendors[index];
            vendors.splice(index, 1);
            saveVendors(vendors);
            renderVendorsList();
            showNotification(`✅ Vendor "${deletedVendor.name}" deleted successfully!`);
        }
    }
}

// ================================
// Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('Please enter your email address');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address');
        return;
    }
    
    // Save newsletter subscription
    let newsletters = JSON.parse(localStorage.getItem('luxeNewsletters') || '[]');
    
    // Check if already subscribed
    if (newsletters.includes(email)) {
        showNotification('You are already subscribed to our newsletter!');
        return;
    }
    
    newsletters.push(email);
    localStorage.setItem('luxeNewsletters', JSON.stringify(newsletters));
    
    // Clear input
    emailInput.value = '';
    
    showNotification('✅ Successfully subscribed! Check your email for exclusive deals and updates.');
}

// Support - View Support Options
function viewSupport() {
    const supportHtml = `
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); padding: 2rem; border-radius: 12px; border: 1px solid rgba(212,175,55,0.2);">
            <h2 style="color: var(--gold-accent); margin-top: 0;">🆘 Customer Support</h2>
            <p style="color: var(--text-secondary);">We're here to help! Choose your preferred contact method:</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                <button type="button" onclick="openWhatsAppChat()" style="all: unset; cursor: pointer; text-align: left;">
                    <div style="background: rgba(76, 175, 80, 0.15); padding: 1.5rem; border-radius: 8px; border: 2px solid #4CAF50; transition: all 0.3s ease;">
                        <h3 style="color: #4CAF50; margin-top: 0;">💬 WhatsApp</h3>
                        <p style="color: var(--text-secondary); margin: 0;">Quick response • Available 24/7</p>
                        <p style="color: #4CAF50; font-weight: 600; margin: 0.5rem 0 0 0;">${formatWhatsAppNumber(SUPPORT_WHATSAPP_NUMBER)}</p>
                    </div>
                </button>
                
                <a href="mailto:support@ancrio.com" style="text-decoration: none;">
                    <div style="background: rgba(33, 150, 243, 0.15); padding: 1.5rem; border-radius: 8px; border: 2px solid #2196F3; cursor: pointer; transition: all 0.3s ease;">
                        <h3 style="color: #2196F3; margin-top: 0;">📧 Email</h3>
                        <p style="color: var(--text-secondary); margin: 0;">Detailed responses • Response in 24 hours</p>
                        <p style="color: #2196F3; font-weight: 600; margin: 0.5rem 0 0 0;">support@ancrio.com</p>
                    </div>
                </a>

                <button type="button" onclick="toggleAIChat()" style="all: unset; cursor: pointer; text-align: left;">
                    <div style="background: rgba(156, 39, 176, 0.12); padding: 1.5rem; border-radius: 8px; border: 2px solid #9C27B0; transition: all 0.3s ease;">
                        <h3 style="color: #9C27B0; margin-top: 0;">🤖 AI Chat</h3>
                        <p style="color: var(--text-secondary); margin: 0;">Instant answers — powered by AI</p>
                        <p style="color: #9C27B0; font-weight: 600; margin: 0.5rem 0 0 0;">Ask anything</p>
                    </div>
                </button>
                
                <div style="background: rgba(255, 152, 0, 0.15); padding: 1.5rem; border-radius: 8px; border: 2px solid #FF9800; cursor: pointer;">
                    <h3 style="color: #FF9800; margin-top: 0;">📱 Call Us</h3>
                    <p style="color: var(--text-secondary); margin: 0;">Phone support • Available 10 AM - 8 PM IST</p>
                    <p style="color: #FF9800; font-weight: 600; margin: 0.5rem 0 0 0;">1800-ANCRIO-1</p>
                </div>
            </div>
            
            <div style="background: rgba(212, 175, 55, 0.1); padding: 1rem; border-radius: 8px; border-left: 4px solid var(--gold-accent);">
                <h4 style="color: var(--gold-accent); margin-top: 0;">❓ FAQs</h4>
                <ul style="color: var(--text-secondary); margin: 0.5rem 0;">
                    <li>✓ How do I track my order?</li>
                    <li>✓ What is your return policy?</li>
                    <li>✓ How long does shipping take?</li>
                    <li>✓ Do you offer international shipping?</li>
                    <li>✓ How do I use a coupon code?</li>
                </ul>
            </div>
        </div>
    `;
    
    // Show in a modal or notification
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999;';
    modal.innerHTML = `
        <div style="background: var(--secondary-dark); padding: 2rem; border-radius: 12px; max-width: 800px; max-height: 80vh; overflow-y: auto; position: relative;">
            <button onclick="this.closest('div').parentElement.remove()" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--gold-accent); font-size: 1.5rem; cursor: pointer;">✕</button>
            ${supportHtml}
        </div>
    `;
    document.body.appendChild(modal);
}

// Policies - View Policies
function viewPolicies() {
    const policiesHtml = `
        <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); padding: 2rem; border-radius: 12px; border: 1px solid rgba(212,175,55,0.2);">
            <h2 style="color: var(--gold-accent); margin-top: 0;">📋 ANCRIO Policies</h2>
            
            <div style="display: grid; gap: 1.5rem;">
                <details style="background: rgba(212, 175, 55, 0.05); padding: 1rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2);">
                    <summary style="color: var(--gold-accent); font-weight: 600; cursor: pointer; font-size: 1.1rem;">🔒 Privacy Policy</summary>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">
                        At ANCRIO, we respect your privacy. We collect only necessary information to process your orders and improve your shopping experience. Your data is encrypted and never shared with third parties without your consent. For more details, please contact us at privacy@ancrio.com
                    </p>
                </details>
                
                <details style="background: rgba(212, 175, 55, 0.05); padding: 1rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2);">
                    <summary style="color: var(--gold-accent); font-weight: 600; cursor: pointer; font-size: 1.1rem;">📜 Terms & Conditions</summary>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">
                        By using ANCRIO, you agree to our terms of service. All products are sold as per the description. Users must be 18+ to make purchases. We reserve the right to cancel any order that violates our terms. Payment must be completed before order confirmation.
                    </p>
                </details>
                
                <details style="background: rgba(212, 175, 55, 0.05); padding: 1rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2);">
                    <summary style="color: var(--gold-accent); font-weight: 600; cursor: pointer; font-size: 1.1rem;">↩️ Return Policy</summary>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">
                        <strong>7-Day Return Window:</strong> You can return any item within 7 days of delivery if it's in original condition with tags attached. Returns are free for defective items. Refunds are processed within 5-7 business days. For returns, contact our support team.
                    </p>
                </details>
                
                <details style="background: rgba(212, 175, 55, 0.05); padding: 1rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2);">
                    <summary style="color: var(--gold-accent); font-weight: 600; cursor: pointer; font-size: 1.1rem;">📦 Shipping Policy</summary>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">
                        <strong>Free Shipping:</strong> All orders enjoy free shipping across India. Delivery takes 5-7 business days for metro cities and 7-10 business days for other areas. You'll receive a tracking number via email. Express shipping available for ₹99.
                    </p>
                </details>
                
                <details style="background: rgba(212, 175, 55, 0.05); padding: 1rem; border-radius: 8px; border: 1px solid rgba(212,175,55,0.2);">
                    <summary style="color: var(--gold-accent); font-weight: 600; cursor: pointer; font-size: 1.1rem;">💰 Refund Policy</summary>
                    <p style="color: var(--text-secondary); margin-top: 1rem;">
                        <strong>Full Refunds:</strong> For defective or damaged items, we offer 100% refund. For returned items in good condition, refund is 100% minus shipping charges (if applicable). Refunds are credited back to your original payment method within 5-7 business days.
                    </p>
                </details>
            </div>
        </div>
    `;
    
    // Show in a modal
    const modal = document.createElement('div');
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1rem;';
    modal.innerHTML = `
        <div style="background: var(--secondary-dark); padding: 2rem; border-radius: 12px; max-width: 700px; max-height: 80vh; overflow-y: auto; position: relative;">
            <button onclick="this.closest('div').parentElement.remove()" style="position: absolute; top: 1rem; right: 1rem; background: transparent; border: none; color: var(--gold-accent); font-size: 1.5rem; cursor: pointer;">✕</button>
            ${policiesHtml}
        </div>
    `;
    document.body.appendChild(modal);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// WhatsApp / AI Chat Helpers
function getWhatsAppUrl(prefilledMessage = '') {
    const base = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}`;
    if (!prefilledMessage) return base;
    return `${base}?text=${encodeURIComponent(prefilledMessage)}`;
}

function openWhatsAppChat(prefilledMessage) {
    const defaultMsg = prefilledMessage || 'Hi! I need help with my order.';
    window.open(getWhatsAppUrl(defaultMsg), '_blank');
}

let aiChatOpen = false;
function toggleAIChat() {
    const widget = document.getElementById('aiChatWidget');
    if (!widget) return;

    aiChatOpen = !aiChatOpen;
    widget.classList.toggle('hidden', !aiChatOpen);
    widget.setAttribute('aria-hidden', String(!aiChatOpen));

    if (aiChatOpen) {
        const input = document.getElementById('aiChatInput');
        input?.focus();
        if (!widget.dataset.inited) {
            appendAIMessage("Hi there! I'm your AI shopping assistant. Ask me anything about orders, returns, or product availability.", false);
            widget.dataset.inited = '1';
        }
    }
}

function appendAIMessage(text, isUser = false) {
    const container = document.getElementById('aiChatMessages');
    if (!container) return;
    const msg = document.createElement('div');
    msg.className = `ai-chat-message ${isUser ? 'user' : 'bot'}`;
    msg.textContent = text;
    container.appendChild(msg);
    container.scrollTop = container.scrollHeight;
}

async function sendAIMessage(userMessage) {
    const container = document.getElementById('aiChatMessages');
    if (!container) return;

    const loading = document.createElement('div');
    loading.className = 'ai-chat-message bot loading';
    loading.textContent = '🤖 Thinking...';
    container.appendChild(loading);
    container.scrollTop = container.scrollHeight;

    try {
        const response = await fetch('/api/ai-chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        const result = await response.json();
        loading.remove();

        if (!response.ok) {
            appendAIMessage(result.error || 'Sorry, something went wrong. Try again later.', false);
            return;
        }

        appendAIMessage(result.reply || 'Sorry, I could not find an answer right now.', false);
    } catch (err) {
        loading.remove();
        appendAIMessage('Network error: could not reach AI service.', false);
        console.error('AI Chat error', err);
    }
}

function handleAIChatSubmit(event) {
    event.preventDefault();
    const input = document.getElementById('aiChatInput');
    if (!input) return;

    const message = input.value.trim();
    if (!message) return;

    appendAIMessage(message, true);
    input.value = '';
    sendAIMessage(message);
}

// Update All UI
function updateAllUI() {
    updateCartBadge();
    updateWishlistBadge();
    renderNewArrivals();
}

// Secret Admin Panel Access - Ctrl+Shift+A
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        openSecretAdminPanel();
    }
});

function openSecretAdminPanel() {
    const adminPanel = document.getElementById('admin');
    const loginModal = document.getElementById('loginModal');
    
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
        // Show admin password prompt instead of login
        const password = prompt('🔐 Enter Admin Password:');
        if (password === 'admin123') {
            // Set as logged in user for admin access
            const adminUser = { id: 'admin_000', name: 'Admin', email: 'admin@ancrio.com', isAdmin: true };
            localStorage.setItem('currentUser', JSON.stringify(adminUser));
            loadFromStorage();
            console.log('🔐 Secret admin access granted. Orders:', orders.length);
            navigateTo('admin');
            updateAdminDashboard();
            renderAdminProducts();
            showNotification('✅ Admin Panel Access Granted!');
        } else if (password !== null) {
            showNotification('❌ Incorrect Password!');
        }
    } else {
        // Already logged in, just open admin panel
        loadFromStorage();
        console.log('🔓 Admin panel opened. Orders:', orders.length);
        navigateTo('admin');
        updateAdminDashboard();
        renderAdminProducts();
        showNotification('🔓 Admin Panel Opened');
    }
}
