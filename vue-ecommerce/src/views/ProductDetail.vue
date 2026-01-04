<!-- src/views/ProductDetail.vue -->
<template>
  <div class="product-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading product...</p>
      </div>
      
      <div v-else-if="product" class="product-container">
        <button @click="$router.back()" class="back-btn">
          ← Back to Products
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
                <span class="stars">★★★★★</span>
                <span class="rating-count">({{ product.rating?.rate || 0 }}/5)</span>
              </div>
            </div>
            
            <p class="product-description">{{ product.description }}</p>
            
            <div class="product-meta">
              <div class="price-section">
                <div class="current-price">${{ product.price.toFixed(2) }}</div>
                <div v-if="product.price > 50" class="free-shipping">
                  🚚 Free Shipping
                </div>
              </div>
            </div>
            
            <div class="product-actions">
              <button @click="addToCart" class="btn btn-primary add-to-cart-btn">
                🛒 Add to Cart - ${{ product.price.toFixed(2) }}
              </button>
              <button @click="buyNow" class="btn btn-secondary">
                Buy Now
              </button>
            </div>
            
            <div class="product-features">
              <div class="feature">
                <span class="feature-icon">🔄</span>
                <div>
                  <strong>30-Day Return</strong>
                  <p>Hassle-free returns</p>
                </div>
              </div>
              <div class="feature">
                <span class="feature-icon">🛡️</span>
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

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductById } from '@/api/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)

const fetchProduct = async () => {
  try {
    loading.value = true
    const productId = route.params.id
    product.value = await getProductById(productId)
  } catch (error) {
    console.error('Error fetching product:', error)
    // Optional: You could redirect to 404 page here
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addItem(product.value)
    // Optional: Show success message or notification
    alert(`${product.value.title} added to cart!`)
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
</script>

<style scoped>
.product-detail {
  padding: 40px 0;
}

.back-btn {
  background: none;
  border: none;
  color: var(--gray);
  cursor: pointer;
  margin-bottom: 30px;
  padding: 10px 0;
  font-size: 1rem;
}

.back-btn:hover {
  color: var(--primary);
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  background: white;
  padding: 40px;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.product-gallery {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gray-light);
  border-radius: var(--border-radius);
  padding: 40px;
}

.main-image {
  max-width: 100%;
  height: 400px;
  object-fit: contain;
}

.product-category {
  display: inline-block;
  background: var(--gray-light);
  color: var(--gray);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  text-transform: capitalize;
  margin-bottom: 15px;
}

.product-title {
  font-size: 2.2rem;
  margin: 10px 0;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.stars {
  color: var(--warning);
  font-size: 1.2rem;
}

.rating-count {
  color: var(--gray);
}

.product-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--dark);
  margin-bottom: 30px;
}

.price-section {
  margin-bottom: 30px;
}

.current-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
}

.free-shipping {
  color: var(--success);
  font-weight: 600;
  margin-top: 5px;
}

.product-actions {
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
}

.add-to-cart-btn {
  flex: 2;
  font-size: 1.1rem;
}

.product-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding-top: 30px;
  border-top: 1px solid var(--gray-light);
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 15px;
}

.feature-icon {
  font-size: 1.5rem;
}

.not-found {
  text-align: center;
  padding: 60px 0;
}

.loading {
  text-align: center;
  padding: 100px 0;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--gray-light);
  border-top-color: var(--primary);
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 992px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .product-gallery {
    padding: 20px;
  }
  
  .main-image {
    height: 300px;
  }
}
</style>