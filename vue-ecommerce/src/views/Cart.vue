<script setup>
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const calculateTotal = () => {
    const shipping = cartStore.totalPrice >= 50 ? 0 : 5.99
    return cartStore.totalPrice + shipping
}

const handleCheckout = () => {
    if (!authStore.isAuthenticated) {
        // Guest Flow: Redirect to login but keep current page path so user can return after auth
        router.push({
            path: '/login',
            query: { redirect: '/cart' }
        })
        return
    }
    
    alert(`Thank you for your order, ${authStore.user.username}! Total: $${calculateTotal().toFixed(2)}`)
    cartStore.clearCart()
    router.push('/')
}
</script>

<template>
    <div class="cart-page">
        <div class="container">
            <header class="cart-header">
                <div class="header-content">
                    <h1>Your Bag</h1>
                    <p class="count-badge">{{ cartStore.totalItems }} items total</p>
                </div>
                <router-link to="/" class="back-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    Continue Shopping
                </router-link>
            </header>

            <div v-if="cartStore.items.length === 0" class="empty-state">
                <div class="empty-card">
                    <div class="empty-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </div>
                    <h2>Your bag is empty</h2>
                    <p>Looks like you haven't added anything to your bag yet.</p>
                    <router-link to="/" class="btn shop-now">
                        Explore Shop
                    </router-link>
                </div>
            </div>

            <div v-else class="cart-grid">
                <main class="cart-items-section">
                    <div class="items-list">
                        <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
                            <div class="item-visual">
                                <img :src="item.image" :alt="item.title" loading="lazy" />
                            </div>

                            <div class="item-info">
                                <div class="info-top">
                                    <span class="category-tag">{{ item.category }}</span>
                                    <router-link :to="`/product/${item.id}`" class="item-title-link">
                                        <h3 class="title">{{ item.title }}</h3>
                                    </router-link>
                                </div>
                                <div class="info-bottom">
                                    <div class="price-display">
                                        <span class="unit-price">${{ item.price.toFixed(2) }}</span>
                                        <span class="total-line-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
                                    </div>
                                    
                                    <div class="controls-wrapper">
                                        <div class="quantity-controller">
                                            <button @click="cartStore.decrementItem(item.id)" class="qty-btn" aria-label="Decrease quantity">−</button>
                                            <span class="qty-number">{{ item.quantity }}</span>
                                            <button @click="cartStore.incrementItem(item.id)" class="qty-btn" aria-label="Increase quantity">+</button>
                                        </div>
                                        <button @click="cartStore.removeItem(item.id)" class="remove-action" title="Remove item">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <aside class="cart-sidebar">
                    <div class="checkout-card">
                        <h3 class="summary-title">Order Summary</h3>
                        
                        <div class="summary-details">
                            <div class="summary-row">
                                <span class="label">Subtotal</span>
                                <span class="value">${{ cartStore.totalPrice.toFixed(2) }}</span>
                            </div>
                            <div class="summary-row">
                                <span class="label">Estimated Shipping</span>
                                <span class="value" :class="{ 'free': cartStore.totalPrice >= 50 }">
                                    {{ cartStore.totalPrice >= 50 ? 'Complimentary' : '$5.99' }}
                                </span>
                            </div>
                            
                            <div class="shipping-progress">
                                <div class="progress-info">
                                    <span v-if="cartStore.totalPrice < 50">Free shipping at $50</span>
                                    <span v-else class="free-badge">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        Free Shipping Achieved
                                    </span>
                                    <span v-if="cartStore.totalPrice < 50">${{ (50 - cartStore.totalPrice).toFixed(2) }} left</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" :style="{ width: Math.min((cartStore.totalPrice / 50) * 100, 100) + '%' }"></div>
                                </div>
                            </div>
                        </div>

                        <div class="total-row">
                            <span class="total-label">Estimated Total</span>
                            <span class="total-value">${{ calculateTotal().toFixed(2) }}</span>
                        </div>

                        <div class="summary-actions">
                            <button @click="handleCheckout" class="btn btn-block checkout-trigger">
                                Proceed to Checkout
                            </button>
                            <button @click="cartStore.clearCart()" class="clear-cart-link">
                                Empty Bag
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart-page {
    padding: 3rem 0;
    min-height: calc(100vh - 4rem);
}

.cart-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 2rem;
}

.header-content h1 {
    font-size: 2.5rem;
    margin-bottom: 0.25rem;
}

.count-badge {
    color: var(--text-muted);
    font-size: 1.1rem;
    font-weight: 500;
}

.back-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    transition: transform 0.2s ease;
}

.back-link:hover {
    transform: translateX(-4px);
}

/* Empty State */
.empty-state {
    display: flex;
    justify-content: center;
    padding: 4rem 0;
}

.empty-card {
    text-align: center;
    background-color: var(--bg-card);
    padding: 3rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
    max-width: 500px;
    width: 100%;
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
}

.empty-card h2 {
    font-size: 1.5rem;
    color: var(--text-main);
    margin-bottom: 0.5rem;
}

.empty-card p {
    color: var(--text-muted);
    margin-bottom: 2rem;
}

/* Cart Grid */
.cart-grid {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: 2rem;
    align-items: start;
}

.items-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.cart-item {
    display: flex;
    gap: 1.5rem;
    background-color: var(--bg-card);
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color);
    transition: all 0.2s ease;
}

.cart-item:hover {
    box-shadow: var(--shadow);
    border-color: var(--primary);
}

.item-visual {
    width: 120px;
    height: 120px;
    background-color: white; /* Always white for product image */
    border-radius: var(--radius);
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: inset 0 0 0 1px var(--gray-200);
}

.item-visual img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.category-tag {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent);
    font-weight: 700;
    margin-bottom: 0.25rem;
    display: block;
}

.item-title-link {
    text-decoration: none;
    color: inherit;
}

.title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-main);
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s;
}

.item-title-link:hover .title {
    color: var(--primary);
}

.info-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 1rem;
}

.price-display {
    display: flex;
    flex-direction: column;
}

.unit-price {
    color: var(--text-muted);
    font-size: 0.85rem;
}

.total-line-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-main);
}

.controls-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.quantity-controller {
    display: flex;
    align-items: center;
    background-color: var(--bg-body);
    padding: 0.25rem;
    border-radius: var(--radius);
    gap: 0.5rem;
    border: 1px solid var(--border-color);
}

.qty-btn {
    width: 28px;
    height: 28px;
    border: none;
    background-color: var(--bg-card);
    border-radius: var(--radius-sm);
    color: var(--text-main);
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
}

.qty-btn:hover {
    background-color: var(--primary);
    color: var(--white);
}

@media (prefers-color-scheme: dark) {
    .qty-btn:hover {
        color: var(--ink-black);
    }
}

.qty-number {
    font-weight: 600;
    font-size: 0.95rem;
    min-width: 24px;
    text-align: center;
    color: var(--text-main);
}

.remove-action {
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--radius);
    transition: all 0.2s;
    font-size: 1.2rem;
}

.remove-action:hover {
    background-color: rgba(239, 68, 68, 0.1); /* Red tint */
    transform: scale(1.1);
}

/* Sidebar */
.cart-sidebar {
    position: sticky;
    top: 5rem;
}

.checkout-card {
    background-color: var(--bg-card);
    padding: 2rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow);
    border: 1px solid var(--border-color);
}

.summary-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--text-main);
}

.summary-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 1.5rem;
    border-bottom: 2px dashed var(--border-color);
}

.summary-row {
    display: flex;
    justify-content: space-between;
}

.summary-row .label {
    color: var(--text-muted);
}

.summary-row .value {
    font-weight: 600;
    color: var(--text-main);
}

.summary-row .value.free {
    color: #10b981; /* Keep success green or match palette? Palette has no green, school bus yellow could work? */
    color: var(--primary); /* Use primary for good news */
}

.shipping-progress {
    margin-top: 0.5rem;
}

.progress-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
    color: var(--primary);
}

.free-badge {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #10b981; /* Success green */
}

@media (prefers-color-scheme: dark) {
    .free-badge {
        color: var(--school-bus-yellow);
    }
}

.progress-bar {
    height: 8px;
    background-color: var(--gray-200);
    border-radius: 100px;
    overflow: hidden;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

@media (prefers-color-scheme: dark) {
    .progress-bar {
        background-color: rgba(255, 255, 255, 0.1);
    }
}

.progress-fill {
    height: 100%;
    background-color: var(--primary);
    transition: width 0.4s ease;
}

.total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
}

.total-label {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-main);
}

.total-value {
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--primary);
}

.summary-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.checkout-trigger {
    text-transform: uppercase;
    letter-spacing: 0.025em;
    font-weight: 700;
}

.clear-cart-link {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-weight: 600;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s;
}

.clear-cart-link:hover {
    color: #ef4444; /* Keep red for destructive action */
}

@media (max-width: 1024px) {
    .cart-grid {
        grid-template-columns: 1fr;
    }
    
    .cart-sidebar {
        position: static;
        margin-top: 2rem;
    }
}

@media (max-width: 640px) {
    .cart-item {
        gap: 1rem;
        padding: 1rem;
    }

    .item-visual {
        width: 80px;
        height: 80px;
        padding: 0.5rem;
    }
    
    .item-info {
        text-align: left;
    }

    .title {
        font-size: 0.95rem;
        margin-bottom: 0.5rem;
    }
    
    .info-bottom {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-top: 0.75rem;
        width: 100%;
    }

    .total-line-price {
        font-size: 1.1rem;
    }
    
    .controls-wrapper {
        gap: 0.5rem;
    }

    .quantity-controller {
        padding: 0.15rem;
    }

    .qty-btn {
        width: 24px;
        height: 24px;
        font-size: 1rem;
    }

    .qty-number {
        font-size: 0.85rem;
        min-width: 18px;
    }

    .remove-action {
        padding: 0.25rem;
    }
}
</style>
