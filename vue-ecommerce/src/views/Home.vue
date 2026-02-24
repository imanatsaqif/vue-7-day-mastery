<!-- src/views/Home.vue -->
<script setup>
import { onMounted, ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { useCartStore } from '@/stores/cart'
import { useToastStore } from '@/stores/toast'
import { useProductStore } from '@/stores/products'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const toastStore = useToastStore()
const productStore = useProductStore()

const { products, categories, loading, error } = storeToRefs(productStore)

const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('default')
const mobileCols = ref(2) // Default to 2 columns on mobile

const filteredProducts = computed(() => {
  let result = products.value.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })

  // Apply Sorting
  if (sortBy.value === 'price-low') {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price-high') {
    result.sort((a, b) => b.price - a.price)
  }

  return result
})

const fetchProducts = () => {
  productStore.fetchProducts()
}

const addToCart = (product) => {
  cartStore.addItem(product)
  toastStore.addToast(`${product.title} added to bag`, 'success')
}

const setCategory = (category) => {
  selectedCategory.value = category
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = 'all'
}

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="page-header">
        <h1 class="gradient-text">Our Collection</h1>
        <p class="subtitle">Discover amazing products at great prices</p>
      </div>

      <div class="controls-row fade-in">
        <div class="left-controls">
          <div class="select-wrapper">
            <select v-model="selectedCategory" class="custom-select">
              <option value="all">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
              </option>
            </select>
          </div>

          <div class="select-wrapper">
            <select v-model="sortBy" class="custom-select">
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div class="right-controls">
          <div class="view-toggle mobile-only">
            <button 
              @click="mobileCols = 1" 
              :class="{ active: mobileCols === 1 }"
              class="toggle-btn"
              title="Large View (1 Column)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
            </button>
            <button 
              @click="mobileCols = 2" 
              :class="{ active: mobileCols === 2 }"
              class="toggle-btn"
              title="Grid View (2 Columns)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
          </div>
          
          <div class="search-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search by title..." 
              class="search-input"
            >
            <button v-if="searchQuery" @click="searchQuery = ''" class="clear-search">&times;</button>
          </div>
        </div>
      </div>
      
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Curating collection...</p>
      </div>
      
      <div v-else-if="error" class="error-message">
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-alert"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          {{ error }}
        </p>
        <button @click="fetchProducts" class="btn">Try Again</button>
      </div>
      
      <div v-else>
        <div v-if="filteredProducts.length > 0" class="products-grid" :class="`mobile-grid-${mobileCols}`">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
            class="fade-in"
          />
        </div>
        
        <!-- Empty Results -->
        <div v-else class="no-results fade-in">
          <div class="no-results-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="mb-4"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
            <h2>No matches found</h2>
            <p>We couldn't find anything matching your search. Try different keywords or reset filters.</p>
            <button @click="clearFilters" class="btn btn-secondary mt-4">Reset All Filters</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  padding: 3rem 0;
  min-height: calc(100vh - 4rem); /* Navbar is 4rem */
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.gradient-text {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--regal-navy), var(--school-bus-yellow));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

/* Adjust gradient for dark mode manual switch */
.dark-mode .gradient-text {
  background: linear-gradient(135deg, var(--school-bus-yellow), var(--white));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: var(--text-muted);
  font-size: 1.25rem;
  font-weight: 300;
}

/* New Controls Layout */
.controls-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 0.5rem 0; /* Tightened padding since no background */
}

.left-controls {
  display: flex;
  gap: 1rem;
  flex: 1;
}

.right-controls {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.select-wrapper {
  position: relative;
  min-width: 180px;
}

.custom-select {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--border-color);
  background-color: var(--bg-card); /* Fixed: color not gradient */
  color: var(--text-main);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 3rem;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-sm);
}

.custom-select:hover {
  border-color: var(--primary);
  background-color: var(--bg-card);
}

.custom-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 53, 102, 0.1);
}

.search-wrapper {
  position: relative;
  width: 100%;
  max-width: 400px;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 2.75rem; /* More right padding for clear button */
  font-size: 0.95rem;
  background-color: var(--bg-card); /* Fixed: color not gradient */
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  color: var(--text-main);
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(0, 53, 102, 0.1);
}

.clear-search {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: var(--gray-200);
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--regal-navy);
  font-size: 1rem;
  line-height: 1;
  transition: all 0.2s;
  padding: 0;
}

.clear-search:hover {
  background: var(--primary);
  color: var(--white);
}

.dark-mode .clear-search {
  background: rgba(255, 255, 255, 0.2);
  color: var(--white);
}

.dark-mode .clear-search:hover {
  background: var(--primary);
  color: var(--ink-black);
}

@media (max-width: 1024px) {
  .controls-row {
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }

  .left-controls {
    order: 2; /* Filters below search */
    justify-content: center;
  }

  .right-controls {
    order: 1; /* Search on top */
    justify-content: center;
  }

  .search-wrapper {
    max-width: 600px; /* Wider for tablet */
  }
}

@media (max-width: 768px) {
  .left-controls {
    flex-wrap: wrap;
  }
  
  .select-wrapper {
    flex: 1;
    min-width: 160px;
  }
}

@media (max-width: 640px) {
  .controls-row {
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .left-controls {
    flex-direction: row;
    gap: 0.5rem;
  }

  .select-wrapper {
    flex: 1;
    min-width: 0;
  }

  .custom-select {
    padding-left: 0.75rem;
    padding-right: 2rem;
    font-size: 0.85rem;
    background-position: right 0.5rem center;
  }

  .right-controls {
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
  }

  .search-wrapper {
    flex: 1;
    max-width: none;
  }

  .search-input {
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }

  .view-toggle {
    padding: 0;
    border: none;
    box-shadow: none;
    background: transparent;
  }

  .toggle-btn {
    width: 36px;
    height: 36px;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
  }
}

.view-toggle {
  display: flex;
  gap: 0.5rem;
  background: var(--bg-card);
  padding: 0.25rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.mobile-only {
  display: none;
}

@media (max-width: 640px) {
  .mobile-only {
    display: flex;
  }
  
  .products-grid.mobile-grid-1 {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .products-grid.mobile-grid-2 {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  border-radius: calc(var(--radius) - 2px);
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  background: rgba(0, 53, 102, 0.05);
  color: var(--primary);
}

.toggle-btn.active {
  background: var(--primary);
  color: var(--white);
  box-shadow: var(--shadow-sm);
}

.dark-mode .toggle-btn.active {
  background: var(--school-bus-yellow);
  color: var(--ink-black);
}

.dark-mode .toggle-btn:hover:not(.active) {
  background: rgba(255, 255, 255, 0.05);
}

/* Cleanup old styles */
.filters-container, .categories-wrapper, .cat-pill {
  display: none;
}

/* No Results Styling */
.no-results {
  text-align: center;
  padding: 6rem 0;
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  border: 1px dashed var(--border-color);
  margin: 2rem 0;
}

.no-results-content {
  max-width: 400px;
  margin: 0 auto;
}

.no-results-content h2 {
  margin-bottom: 0.5rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.loading-state {
  text-align: center;
  padding: 6rem 0;
  color: var(--text-muted);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--gray-200);
  border-top-color: var(--primary);
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  text-align: center;
  padding: 3rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  max-width: 500px;
  margin: 0 auto;
}

.fade-in {
  animation: fadeIn 0.6s ease-out backwards;
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

/* Stagger animation for grid items if possible, purely CSS solution requires child indices or JS */
</style>