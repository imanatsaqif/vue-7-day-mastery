<!-- src/views/ProductDetail.vue -->
<script setup>
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'
import { useProductStore } from '@/stores/products'
import { storeToRefs } from 'pinia'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const toastStore = useToastStore()
const productStore = useProductStore()

const { currentProduct: product, loading } = storeToRefs(productStore)

const fetchProduct = () => {
  productStore.fetchProductById(route.params.id)
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value)
    toastStore.addToast(`${product.value.title} added to bag`, 'success')
  }
}

const buyNow = () => {
  if (product.value) {
    cartStore.addItem(product.value)
    router.push('/cart')
  }
}

onMounted(() => {
  fetchProduct()
})

// Watch for route changes to refetch product (e.g. related products navigation)
watch(() => route.params.id, (newId) => {
  if (newId) {
    productStore.fetchProductById(newId)
  }
})
</script>

<template>
  <div class="product-detail">
    <div class="container">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading product details...</p>
      </div>
      
      <div v-else-if="product" class="product-container fade-in">
        <button @click="$router.back()" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg> 
          Back to Products
        </button>
        
        <div class="product-layout">
          <div class="product-gallery">
            <img :src="product.image" :alt="product.title" class="main-image" />
          </div>
          
          <div class="product-info">
            <div class="product-header">
              <span class="product-category">{{ product.category }}</span>
              <h1 class="product-title">{{ product.title }}</h1>
              <div class="product-rating">
                <span class="stars">
                  <svg v-for="i in 5" :key="i" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </span>
                <span class="rating-count">({{ product.rating?.rate || 0 }}/5)</span>
              </div>
            </div>
            
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-meta">
              <div class="price-section">
                <div class="current-price">${{ product.price.toFixed(2) }}</div>
                <div v-if="product.price > 50" class="free-shipping">
                  <span class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                  </span> Free Shipping
                </div>
              </div>
            </div>
            
            <div class="product-actions">
              <button @click="addToCart" class="btn btn-secondary fill-width">
                Add to Cart
              </button>
              <button @click="buyNow" class="btn btn-primary fill-width">
                Buy Now
              </button>
            </div>
            
            <div class="product-features">
              <div class="feature">
                <span class="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                </span>
                <div>
                  <strong>30-Day Return</strong>
                  <p>Hassle-free returns</p>
                </div>
              </div>
              <div class="feature">
                <span class="feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </span>
                <div>
                  <strong>Warranty</strong>
                  <p>1-year manufacturer warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="not-found">
        <h2>Product not found</h2>
        <router-link to="/" class="btn">Browse Products</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail {
  padding: 3rem 0;
  min-height: calc(100vh - 4rem);
}

.back-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: var(--primary);
  text-decoration: underline;
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.product-gallery {
  background-color: white; /* Always white for product image clarity */
  border-radius: var(--radius-lg);
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  border: 1px solid var(--border-color);
  position: sticky;
  top: 6rem;
}

.main-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-header {
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1.5rem;
}

.product-category {
  display: inline-block;
  background-color: var(--bg-card);
  color: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  margin-bottom: 1rem;
  border: 1px solid var(--border-color);
}

.product-title {
  font-size: 2.25rem;
  line-height: 1.2;
  margin-bottom: 1rem;
  color: var(--text-main);
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  color: var(--school-bus-yellow);
  font-size: 1.1rem;
}

.rating-count {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.product-description {
  font-size: 1.05rem;
  line-height: 1.7;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.product-meta {
  margin-bottom: 2rem;
}

.price-section {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
}

.current-price {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-main);
}

.free-shipping {
  color: var(--primary); /* Using primary ("Regal Navy" or "Yellow" depending on mode) for positive attributes */
  font-weight: 600;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--bg-card);
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius);
}

.product-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 3rem;
}

.fill-width {
  width: 100%;
  height: 3.5rem;
  font-size: 1.1rem;
}

.product-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--border-color);
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.feature-icon {
  font-size: 1.5rem;
  background-color: var(--bg-card);
  padding: 0.5rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
}

.feature strong {
  display: block;
  color: var(--text-main);
  margin-bottom: 0.25rem;
}

.feature p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}

.not-found, .loading-state {
  text-align: center;
  padding: 6rem 0;
  color: var(--text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-top-color: var(--primary);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 992px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .product-gallery {
    position: static;
    height: auto;
    padding: 2rem;
  }
  
  .main-image {
    height: 300px;
  }
}
</style>