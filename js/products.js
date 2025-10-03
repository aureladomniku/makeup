// Products page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeProductsPage();
});

function initializeProductsPage() {
    // Initialize category filters
    initializeCategoryFilters();
    
    // Initialize product cards
    initializeProductCards();
    
    // Initialize shopping cart
    initializeShoppingCart();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize scroll animations
    initializeScrollAnimations();
}

function initializeCategoryFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter product cards
            filterProducts(category, productCards);
        });
    });
}

function filterProducts(category, cards) {
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.classList.add('visible');
            card.classList.remove('hidden');
            
            // Add animation
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.classList.add('hidden');
            card.classList.remove('visible');
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect for product details
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                const productName = this.querySelector('h3').textContent;
                const productPrice = this.querySelector('.current-price').textContent;
                const productDescription = this.querySelector('p').textContent;
                
                showProductDetails(productName, productPrice, productDescription);
            }
        });
        
        // Add to cart functionality
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const productName = card.querySelector('h3').textContent;
                const productPrice = card.querySelector('.current-price').textContent;
                
                addToCart(productName, productPrice, card);
            });
        }
        
        // Add wishlist functionality
        addWishlistButton(card);
    });
}

function showProductDetails(name, price, description) {
    // Create modal for product details
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        transition: transform 0.3s ease;
    `;
    
    modalContent.innerHTML = `
        <h3 style="color: #2c3e50; margin-bottom: 1rem; font-size: 1.5rem;">${name}</h3>
        <p style="color: #e74c3c; font-size: 1.3rem; font-weight: bold; margin-bottom: 1rem;">${price}</p>
        <p style="color: #666; margin-bottom: 1.5rem; line-height: 1.6;">${description}</p>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button class="add-to-cart-modal" style="
                background: #27ae60;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
            ">Add to Cart</button>
            <button class="close-modal" style="
                background: #95a5a6;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        </div>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    };
    
    modalContent.querySelector('.close-modal').addEventListener('click', closeModal);
    modalContent.querySelector('.add-to-cart-modal').addEventListener('click', function() {
        addToCart(name, price, null);
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close on Escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

function addWishlistButton(card) {
    const wishlistBtn = document.createElement('button');
    wishlistBtn.className = 'wishlist-btn';
    wishlistBtn.innerHTML = '♡';
    wishlistBtn.style.cssText = `
        position: absolute;
        top: 15px;
        right: 15px;
        background: rgba(255, 255, 255, 0.9);
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.3s ease;
        z-index: 10;
    `;
    
    card.style.position = 'relative';
    card.appendChild(wishlistBtn);
    
    // Add wishlist functionality
    wishlistBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const productName = card.querySelector('h3').textContent;
        const isWishlisted = toggleWishlist(productName);
        
        if (isWishlisted) {
            this.innerHTML = '♥';
            this.style.color = '#e74c3c';
        } else {
            this.innerHTML = '♡';
            this.style.color = '#666';
        }
    });
    
    // Add hover effect
    wishlistBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    wishlistBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

function toggleWishlist(productName) {
    const wishlist = JSON.parse(localStorage.getItem('product_wishlist') || '[]');
    const index = wishlist.indexOf(productName);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        utils.showNotification('Product removed from wishlist', 'info');
    } else {
        wishlist.push(productName);
        utils.showNotification('Product added to wishlist!', 'success');
    }
    
    localStorage.setItem('product_wishlist', JSON.stringify(wishlist));
    return wishlist.includes(productName);
}

function initializeShoppingCart() {
    // Initialize cart from localStorage
    const cart = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
    updateCartDisplay(cart);
}

function addToCart(productName, productPrice, cardElement) {
    const cart = JSON.parse(localStorage.getItem('shopping_cart') || '[]');
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
        utils.showNotification(`${productName} quantity updated in cart`, 'info');
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
        utils.showNotification(`${productName} added to cart!`, 'success');
    }
    
    localStorage.setItem('shopping_cart', JSON.stringify(cart));
    updateCartDisplay(cart);
    
    // Add visual feedback
    if (cardElement) {
        const addToCartBtn = cardElement.querySelector('.add-to-cart-btn');
        if (addToCartBtn) {
            const originalText = addToCartBtn.textContent;
            addToCartBtn.textContent = 'Added!';
            addToCartBtn.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                addToCartBtn.textContent = originalText;
                addToCartBtn.style.backgroundColor = '';
            }, 2000);
        }
    }
}

function updateCartDisplay(cart) {
    // Update cart count in header (if cart icon exists)
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function initializeSearch() {
    // Create search input if it doesn't exist
    const searchContainer = document.querySelector('.product-categories');
    if (searchContainer && !document.querySelector('.product-search')) {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search beauty products...';
        searchInput.className = 'product-search';
        searchInput.style.cssText = `
            padding: 10px 15px;
            border: 2px solid #ddd;
            border-radius: 25px;
            margin-bottom: 1rem;
            width: 100%;
            max-width: 400px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s ease;
        `;
        
        searchContainer.insertBefore(searchInput, searchContainer.firstChild);
        
        // Add search functionality
        searchInput.addEventListener('input', utils.debounce(function() {
            const searchTerm = this.value.toLowerCase();
            const productCards = document.querySelectorAll('.product-card');
            
            productCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.classList.add('visible');
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                    card.classList.remove('visible');
                    
                    setTimeout(() => {
                        if (card.classList.contains('hidden')) {
                            card.style.display = 'none';
                        }
                    }, 300);
                }
            });
        }, 300));
        
        // Add focus styles
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = '#3498db';
        });
        
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = '#ddd';
        });
    }
}

function initializeScrollAnimations() {
    // Animate product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    productCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .product-card {
        transition: all 0.3s ease;
    }
    
    .product-card.hidden {
        opacity: 0;
        transform: scale(0.8);
    }
    
    .product-card.visible {
        opacity: 1;
        transform: scale(1);
    }
    
    .product-search:focus {
        border-color: #3498db !important;
        box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }
    
    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: #e74c3c;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 0.8rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
`;
document.head.appendChild(style);
