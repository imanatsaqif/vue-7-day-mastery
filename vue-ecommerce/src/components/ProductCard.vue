<!-- src/components/ProductCard.vue -->
<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  product: Object
})

defineEmits(['add-to-cart'])

const router = useRouter()
const cardRef = ref(null)
const isVisible = ref(false)

let observer = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      isVisible.value = true
      observer.unobserve(cardRef.value)
    }
  }, { threshold: 0.1 })

  if (cardRef.value) {
    observer.observe(cardRef.value)
  }
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

const navigateToDetail = () => {
  router.push(`/product/${props.product.id}`)
}
</script>

<template>
  <div 
    ref="cardRef"
    class="product-card" 
    :class="{ 'reveal-active': isVisible }"
    @click="navigateToDetail"
  >
    <div class="product-image-container">
      <img :src="product.image" :alt="product.title" class="product-image" loading="lazy" />
      <span class="product-category">{{ product.category }}</span>
    </div>
    
    <div class="product-content">
      <h3 class="product-title">{{ product.title }}</h3>
      
      <div class="product-info-row">
        <div class="product-rating">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <span class="rating-val">{{ product.rating?.rate || 4.5 }}</span>
          <span class="text-muted rating-count">({{ product.rating?.count || 10 }})</span>
        </div>
      </div>
      
      <div class="product-footer">
        <div class="product-price">${{ product.price.toFixed(2) }}</div>
        <button @click.stop="$emit('add-to-cart', product)" class="add-cart-btn" aria-label="Add to Cart">
          <span class="btn-text">Add to Cart</span>
          <svg class="btn-icon-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  position: relative;
  
  /* Initial state for lazy reveal */
  opacity: 0;
  transform: translateY(30px);
  transition: 
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), 
    opacity 0.6s ease,
    box-shadow 0.3s ease,
    border-color 0.3s ease;
}

.product-card.reveal-active {
  opacity: 1;
  transform: translateY(0);
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.product-image-container {
  position: relative;
  padding: 1.5rem;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  margin: 0.5rem;
  border-radius: var(--radius);
  transition: background-color 0.3s ease;
}

.dark-mode .product-image-container {
  background-color: rgba(255, 255, 255, 0.95);
}

.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.product-category {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: var(--bg-header);
  color: var(--primary);
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(4px);
  border: 1px solid var(--border-color);
  z-index: 2;
}

.product-content {
  padding: 1rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  color: var(--text-main);
  /* Force precisely 2 lines of text height for alignment */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 2.8em; 
  transition: color 0.2s;
}

.product-info-row {
  margin-bottom: 1rem;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--school-bus-yellow);
}

.rating-val {
  color: var(--text-main);
}

.rating-count {
  font-weight: 400;
  font-size: 0.8rem;
}

.product-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.product-price {
  font-size: 1.2rem;
  font-weight: 800;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.add-cart-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.btn-icon-svg {
  display: block;
}

.btn-text {
  display: none; /* Hide text by default for compact view */
}

/* On larger screens or single column mobile, show text */
@media (min-width: 480px) {
  .add-cart-btn {
    width: auto;
    height: auto;
    padding: 0.6rem 1rem;
    border-radius: var(--radius);
  }
  
  .btn-text {
    display: inline;
    font-size: 0.85rem;
    font-weight: 700;
  }
  
  .btn-icon-svg {
    display: none;
  }
}

.add-cart-btn:hover {
  background-color: var(--primary-hover);
  transform: scale(1.05);
}

.dark-mode .add-cart-btn {
  background-color: var(--school-bus-yellow);
  color: var(--ink-black);
}

.dark-mode .add-cart-btn:hover {
  background-color: var(--gold);
}

@media (max-width: 640px) {
  .product-image-container {
    height: 160px;
    padding: 1rem;
  }
  
  .product-content {
    padding: 0.85rem 1rem 1rem;
  }

  .product-title {
    font-size: 0.85rem;
    height: 2.8em;
  }
  
  .product-price {
    font-size: 1.1rem;
  }
}
</style>