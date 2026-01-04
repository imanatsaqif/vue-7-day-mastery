<!-- src/views/Cart.vue -->
<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const calculateTotal = () => {
    const shipping = cartStore.totalPrice > 50 ? 0 : 5.99
    return cartStore.totalPrice + shipping
}
</script>

<template>
    <div class="cart">
        <div class="container">
            <div class="page-header">
                <h1>Your Shopping Cart</h1>
                <p class="subtitle">{{ cartStore.totalItems }} item(s) in cart</p>
            </div>

            <div v-if="cartStore.items.length === 0" class="empty-cart">
                <div class="empty-icon">🛒</div>
                <h2>Your cart is empty</h2>
                <p>Add some products to get started!</p>
                <router-link to="/" class="btn btn-primary">
                    Browse Products
                </router-link>
            </div>

            <div v-else class="cart-layout">
                <div class="cart-items">
                    <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
                        <div class="item-image">
                            <img :src="item.image" :alt="item.title" />
                        </div>

                        <div class="item-details">
                            <h3 class="item-title">{{ item.title }}</h3>
                            <p class="item-category">{{ item.category }}</p>
                            <div class="item-price">${{ item.price.toFixed(2) }}</div>
                        </div>

                        <div class="item-actions">
                            <button @click="cartStore.removeItem(item.id)" class="remove-btn">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>

                <div class="cart-summary">
                    <div class="summary-card">
                        <h3>Order Summary</h3>

                        <div class="summary-row">
                            <span>Subtotal</span>
                            <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
                        </div>

                        <div class="summary-row">
                            <span>Shipping</span>
                            <span>
                                {{ cartStore.totalPrice > 50 ? 'FREE' : '$5.99' }}
                            </span>
                        </div>

                        <div class="summary-row total">
                            <span>Total</span>
                            <span>${{ calculateTotal().toFixed(2) }}</span>
                        </div>

                        <div class="shipping-note" v-if="cartStore.totalPrice < 50">
                            Add ${{ (50 - cartStore.totalPrice).toFixed(2) }} more for free shipping!
                        </div>

                        <button class="btn btn-primary checkout-btn">
                            Proceed to Checkout
                        </button>

                        <button @click="cartStore.items = []" class="btn btn-danger clear-btn">
                            Clear Cart
                        </button>

                        <router-link to="/" class="continue-shopping">
                            ← Continue Shopping
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.cart {
    padding: 40px 0;
}

.page-header {
    margin-bottom: 40px;
}

.empty-cart {
    text-align: center;
    padding: 80px 0;
    background: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.empty-icon {
    font-size: 4rem;
    margin-bottom: 20px;
}

.cart-layout {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 40px;
}

.cart-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.cart-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 20px;
    align-items: center;
    background: white;
    padding: 20px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    transition: var(--transition);
}

.cart-item:hover {
    box-shadow: var(--shadow-lg);
}

.item-image {
    width: 120px;
    height: 120px;
    background: var(--gray-light);
    border-radius: 12px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-image img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
}

.item-details {
    flex: 1;
}

.item-title {
    font-size: 1.2rem;
    margin-bottom: 8px;
}

.item-category {
    color: var(--gray);
    font-size: 0.9rem;
    margin-bottom: 10px;
    text-transform: capitalize;
}

.item-price {
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--primary);
}

.remove-btn {
    background: none;
    border: none;
    color: var(--danger);
    cursor: pointer;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 6px;
    transition: var(--transition);
}

.remove-btn:hover {
    background: var(--gray-light);
}

.cart-summary {
    position: sticky;
    top: 100px;
}

.summary-card {
    background: white;
    padding: 30px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
}

.summary-card h3 {
    margin-bottom: 25px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--gray-light);
}

.summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.summary-row.total {
    font-size: 1.4rem;
    font-weight: 700;
    color: var(--primary);
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid var(--gray-light);
}

.shipping-note {
    background: var(--warning);
    color: var(--dark);
    padding: 10px 15px;
    border-radius: 8px;
    margin: 20px 0;
    text-align: center;
    font-weight: 600;
}

.checkout-btn {
    width: 100%;
    padding: 16px;
    font-size: 1.1rem;
    margin-bottom: 15px;
}

.clear-btn {
    width: 100%;
    margin-bottom: 20px;
}

.continue-shopping {
    display: block;
    text-align: center;
    color: var(--gray);
    text-decoration: none;
    padding: 10px;
    transition: var(--transition);
}

.continue-shopping:hover {
    color: var(--primary);
}

@media (max-width: 992px) {
    .cart-layout {
        grid-template-columns: 1fr;
    }

    .cart-item {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .item-image {
        margin: 0 auto;
    }
}
</style>