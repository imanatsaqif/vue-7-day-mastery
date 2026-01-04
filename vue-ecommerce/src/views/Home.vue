<!-- src/views/Home.vue -->
<script setup>
import { ref, onMounted } from 'vue'
import { getAllProducts } from '@/api/products'
import ProductCard from '@/components/ProductCard.vue'
import { useCartStore } from '@/stores/cart'

const products = ref([])
const loading = ref(true)
const error = ref('')
const cartStore = useCartStore()

const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = ''
    products.value = await getAllProducts()
  } catch (err) {
    error.value = 'Failed to load products. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const addToCart = (product) => {
  cartStore.addItem(product)
  // You could add a toast notification here
}

onMounted(fetchProducts)
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="page-header">
        <h1>Our Products</h1>
        <p class="subtitle">Discover amazing products at great prices</p>
      </div>
      
      <div class="products-grid">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
          class="fade-in"
        />
      </div>
      
      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading products...</p>
      </div>
      
      <div v-if="error" class="error-message">
        <p>⚠️ {{ error }}</p>
        <button @click="fetchProducts" class="btn">Try Again</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 40px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header .subtitle {
  color: var(--gray);
  font-size: 1.1rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.loading {
  text-align: center;
  padding: 60px 0;
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

.error-message {
  text-align: center;
  padding: 40px;
  background: white;
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

.fade-in {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>