// ===== Cart State =====
let cart = [];
let cartCount = 0;

// ===== Product Data =====
const product = {
    id: 1,
    name: 'Smart Digital Calendar 15.6-inch Wall Planner & Family Organizer',
    price: 229.00,
    image: 'https://m.media-amazon.com/images/I/61CBS64TYsL.jpg',
    color: 'White Frame'
};

// ===== DOM Elements =====
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const cartItems = document.getElementById('cartItems');
const cartFooter = document.getElementById('cartFooter');
const cartTotal = document.getElementById('cartTotal');
const cartCountEl = document.querySelector('.cart-count');
const toast = document.getElementById('toast');
const mainImage = document.getElementById('mainImage');
const quantityInput = document.getElementById('quantity');

// ===== Image Gallery =====
function changeImage(src) {
    mainImage.src = src;
    mainImage.style.opacity = '0';
    setTimeout(() => {
        mainImage.style.opacity = '1';
    }, 50);

    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
        if (thumb.querySelector('img').src === src) {
            thumb.classList.add('active');
        }
    });
}

// ===== Quantity Functions =====
function updateQuantity(change) {
    let currentQty = parseInt(quantityInput.value);
    let newQty = currentQty + change;

    if (newQty >= 1 && newQty <= 10) {
        quantityInput.value = newQty;
    }
}

// ===== Cart Functions =====
function toggleCart() {
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
    document.body.style.overflow = cartSidebar.classList.contains('open') ? 'hidden' : '';
}

function addToCart() {
    const quantity = parseInt(quantityInput.value);

    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    updateCart();
    showToast();

    // Reset quantity
    quantityInput.value = 1;
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Add product to cart by ID (for product cards)
function addProductToCart(productId) {
    const catalogProduct = ProductCatalog.getById(productId);
    if (!catalogProduct) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: catalogProduct.id,
            name: catalogProduct.name,
            price: catalogProduct.price,
            image: catalogProduct.images[0],
            color: catalogProduct.colors[0]?.name || 'Default',
            quantity: 1
        });
    }

    updateCart();
    showToast();
}

function updateCart() {
    // Update cart count
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountEl.textContent = cartCount;

    // Update cart items display
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartFooter.style.display = 'none';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name.substring(0, 40)}...</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <p class="cart-item-qty">Qty: ${item.quantity}</p>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');

        // Update total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
        cartFooter.style.display = 'block';
    }
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ===== Color Swatch Selection =====
document.querySelectorAll('.swatch').forEach(swatch => {
    swatch.addEventListener('click', function() {
        document.querySelectorAll('.swatch').forEach(s => s.classList.remove('active'));
        this.classList.add('active');

        // Update color label
        const colorName = this.getAttribute('title');
        document.querySelector('.option-label strong').textContent = colorName;
    });
});

// ===== Cart Button =====
document.querySelector('.cart-btn').addEventListener('click', toggleCart);

// ===== Smooth Scroll =====
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

// ===== Newsletter Form =====
function handleSubscribe(e) {
    e.preventDefault();
    const email = e.target.querySelector('input').value;

    // Show success message
    toast.querySelector('span').textContent = 'Successfully subscribed!';
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
        toast.querySelector('span').textContent = 'Added to cart!';
    }, 3000);

    e.target.reset();
}

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ===== Image Transition =====
mainImage.style.transition = 'opacity 0.3s ease';

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    updateCart();

    // Add entrance animations (excluding hero elements which should be visible immediately)
    const animateElements = document.querySelectorAll('.feature-card, .section-header:not(.hero *)');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animate hero elements immediately with a slight delay
    const heroElements = document.querySelectorAll('.hero-content, .hero-image');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 + (index * 200));
    });
});

// ===== Mobile Menu (placeholder for future implementation) =====
document.querySelector('.mobile-menu-btn')?.addEventListener('click', () => {
    // Mobile menu toggle functionality
    console.log('Mobile menu clicked');
});

// ===== Quantity Input Validation =====
quantityInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
        this.value = 1;
    } else if (value > 10) {
        this.value = 10;
    }
});

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Close cart with Escape key
    if (e.key === 'Escape' && cartSidebar.classList.contains('open')) {
        toggleCart();
    }
});

// =========================================
// ===== PAYMENT MODULE (PLACEHOLDER) =====
// =========================================
// This section contains placeholder code for payment integration
// To implement: Uncomment and configure with your payment provider credentials

const PaymentModule = {
    // Payment provider configuration
    config: {
        stripePublicKey: '', // Add your Stripe public key
        paypalClientId: '', // Add your PayPal client ID
        currency: 'USD',
        locale: 'en-US'
    },

    // Initialize payment providers
    init: function() {
        console.log('Payment module initialized (placeholder)');
        // Uncomment when ready to implement:
        // this.initStripe();
        // this.initPayPal();
    },

    // Stripe integration placeholder
    initStripe: function() {
        /*
        if (typeof Stripe !== 'undefined' && this.config.stripePublicKey) {
            this.stripe = Stripe(this.config.stripePublicKey);
            this.elements = this.stripe.elements();
            console.log('Stripe initialized');
        }
        */
    },

    // PayPal integration placeholder
    initPayPal: function() {
        /*
        if (typeof paypal !== 'undefined' && this.config.paypalClientId) {
            paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: this.getCartTotal()
                            }
                        }]
                    });
                },
                onApprove: (data, actions) => {
                    return actions.order.capture().then((details) => {
                        this.handlePaymentSuccess(details);
                    });
                },
                onError: (err) => {
                    this.handlePaymentError(err);
                }
            }).render('#paypal-button-container');
        }
        */
    },

    // Get cart total for payment
    getCartTotal: function() {
        return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    },

    // Process checkout
    checkout: function() {
        if (cart.length === 0) {
            showToast('Your cart is empty');
            return;
        }

        const orderData = {
            items: cart,
            total: this.getCartTotal(),
            currency: this.config.currency,
            timestamp: new Date().toISOString()
        };

        console.log('Checkout initiated:', orderData);
        // Implement actual checkout flow here
        alert('Payment integration coming soon! Order total: $' + orderData.total);
    },

    // Handle successful payment
    handlePaymentSuccess: function(details) {
        console.log('Payment successful:', details);
        cart = [];
        updateCart();
        toggleCart();
        showToast('Payment successful! Thank you for your order.');
    },

    // Handle payment error
    handlePaymentError: function(error) {
        console.error('Payment error:', error);
        showToast('Payment failed. Please try again.');
    }
};

// =========================================
// ===== SEO & ANALYTICS MODULE =====
// =========================================

const Analytics = {
    // Track page views
    trackPageView: function(page) {
        const data = {
            event: 'page_view',
            page: page || window.location.pathname,
            timestamp: new Date().toISOString(),
            referrer: document.referrer,
            userAgent: navigator.userAgent
        };
        console.log('Page view tracked:', data);
        // Send to analytics service
        // this.sendToAnalytics(data);
    },

    // Track product views
    trackProductView: function(product) {
        const data = {
            event: 'view_item',
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            currency: 'USD'
        };
        console.log('Product view tracked:', data);
        // Send to analytics service
    },

    // Track add to cart
    trackAddToCart: function(product, quantity) {
        const data = {
            event: 'add_to_cart',
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: quantity,
            currency: 'USD'
        };
        console.log('Add to cart tracked:', data);
        // Send to analytics service
    },

    // Track checkout initiation
    trackBeginCheckout: function(cartItems, total) {
        const data = {
            event: 'begin_checkout',
            items: cartItems,
            value: total,
            currency: 'USD'
        };
        console.log('Checkout tracked:', data);
        // Send to analytics service
    },

    // Track conversions (for GEO/SEO campaigns)
    trackConversion: function(conversionType, value) {
        const data = {
            event: 'conversion',
            type: conversionType,
            value: value,
            timestamp: new Date().toISOString()
        };
        console.log('Conversion tracked:', data);
        // Send to analytics service
    },

    // Send data to analytics service (placeholder)
    sendToAnalytics: function(data) {
        // Implement your analytics service integration here
        // Example: Google Analytics, Mixpanel, etc.
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', data.event, data);
        }
        */
    }
};

// =========================================
// ===== PRODUCT DATA MODULE (for SEO) =====
// =========================================

const ProductCatalog = {
    // Product database (extendable for multiple products)
    products: [
        {
            id: 1,
            sku: 'LOCVMIKY-CAL-156',
            name: 'Smart Digital Calendar 15.6-inch Wall Planner & Family Organizer',
            slug: 'smart-digital-calendar',
            brand: 'LOCVMIKY',
            price: 229.00,
            originalPrice: 299.00,
            currency: 'USD',
            description: 'Touchscreen Chore Chart, Meal & Task Scheduler - Easy Wi-Fi Sync - No Subscription - Home & Office Display',
            features: [
                'All-in-One Smart Family Organizer',
                'Easy Setup & Calendar Sync',
                'Interactive Chore Chart & Meal Planner',
                'Digital Photo Frame When Idle',
                'Smart Alerts & Time-Aware Reminders',
                'Flexible Placement, Family Focus'
            ],
            specifications: {
                size: '15.6 inches',
                display: 'IPS HD Touchscreen',
                format: 'Organizer, Wall Calendar',
                connectivity: 'Wi-Fi',
                compatibility: ['Google Calendar', 'iCloud', 'Outlook', 'Yahoo', 'Cozi']
            },
            images: [
                'https://m.media-amazon.com/images/I/61CBS64TYsL.jpg',
                'https://m.media-amazon.com/images/I/51QsFhngk1L.jpg',
                'https://m.media-amazon.com/images/I/51jplAj8KEL.jpg',
                'https://m.media-amazon.com/images/I/51XXJAfm8ZL.jpg',
                'https://m.media-amazon.com/images/I/51pgcdJb1pL.jpg'
            ],
            colors: [
                { name: 'White Frame', hex: '#f5f5f5' },
                { name: 'Wood Frame', hex: '#d4a373' },
                { name: 'Black Frame', hex: '#2d2d2d' }
            ],
            rating: 5.0,
            reviewCount: 2,
            inStock: true,
            stockQuantity: 13,
            category: 'Smart Home',
            tags: ['calendar', 'family organizer', 'smart home', 'touchscreen', 'wall planner'],
            seo: {
                title: 'Smart Digital Calendar 15.6-inch | Family Organizer | LUXE HOME',
                description: 'Shop the Smart Digital Calendar with 15.6-inch touchscreen. Perfect family organizer with Wi-Fi sync, chore chart, and meal planner. No subscription fees.',
                keywords: ['smart calendar', 'digital calendar', 'family organizer', 'wall calendar', 'touchscreen calendar']
            }
        },
        {
            id: 2,
            sku: 'ORB-ARCADE-240',
            name: 'Mini Arcade Machine - 240 Built-In 8-Bit Games',
            slug: 'mini-arcade-machine',
            brand: 'Orb Gaming by ThumbsUp!',
            price: 29.99,
            originalPrice: 39.99,
            currency: 'USD',
            description: '2.5" Full Colour Screen, 8-Way Joystick, Handheld Retro Games Console',
            features: [
                'Hours of Entertainment - 240 retro arcade games',
                'Nostalgic Gameplay - Authentic 8-way joystick',
                '2.5" Full Colour Screen Display',
                'Upgrade Your Space - Fun desk gadget',
                'Classic Retro Gaming Experience',
                'Compact & Portable Design'
            ],
            specifications: {
                screen: '2.5 inches',
                display: 'Full Colour LCD',
                games: '240 Built-In 8-Bit Games',
                controls: '8-Way Joystick',
                type: 'Handheld Retro Console'
            },
            images: [
                'https://m.media-amazon.com/images/I/41tJgzNw+rL.jpg',
                'https://m.media-amazon.com/images/I/516-xE+bJ3L.jpg',
                'https://m.media-amazon.com/images/I/61clBNZmpYL.jpg',
                'https://m.media-amazon.com/images/I/51onzFWSziL.jpg',
                'https://m.media-amazon.com/images/I/51-tmGi6wIL.jpg'
            ],
            colors: [
                { name: 'Classic Black', hex: '#1a1a1a' }
            ],
            rating: 4.4,
            reviewCount: 2485,
            inStock: true,
            stockQuantity: 50,
            category: 'Gaming',
            tags: ['arcade', 'retro gaming', 'handheld console', '8-bit games', 'mini arcade'],
            seo: {
                title: 'Mini Arcade Machine 240 Games | Retro Gaming | LUXE HOME',
                description: 'Shop the Mini Arcade Machine with 240 built-in 8-bit games. Features 2.5" colour screen and 8-way joystick. Perfect retro gaming gift.',
                keywords: ['mini arcade', 'retro games', 'handheld console', '8-bit games', 'arcade machine']
            }
        }
    ],

    // Get product by ID
    getById: function(id) {
        return this.products.find(p => p.id === id);
    },

    // Get product by slug (for SEO-friendly URLs)
    getBySlug: function(slug) {
        return this.products.find(p => p.slug === slug);
    },

    // Get all products
    getAll: function() {
        return this.products;
    },

    // Get products by category
    getByCategory: function(category) {
        return this.products.filter(p => p.category === category);
    },

    // Search products
    search: function(query) {
        const q = query.toLowerCase();
        return this.products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tags.some(tag => tag.toLowerCase().includes(q))
        );
    }
};

// Initialize modules on page load
document.addEventListener('DOMContentLoaded', () => {
    PaymentModule.init();
    Analytics.trackPageView();
    Analytics.trackProductView(ProductCatalog.getById(1));
});

// Override addToCart to include analytics
const originalAddToCart = addToCart;
addToCart = function() {
    const quantity = parseInt(quantityInput.value);
    Analytics.trackAddToCart(product, quantity);
    originalAddToCart();
};
