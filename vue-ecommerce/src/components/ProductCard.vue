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
      <div class="product-rating">
        <!-- Static rating for visual completeness if API doesn't provide rating in list view -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>{{ product.rating?.rate || 4.5 }}</span> <span class="text-muted">({{ product.rating?.count || 10 }})</span>
      </div>
      
      <div class="product-footer">
        <div class="product-price">${{ product.price.toFixed(2) }}</div>
        <button @click.stop="$emit('add-to-cart', product)" class="btn btn-sm btn-icon" title="Add to Cart">
          Add to Cart
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
  transform: translateY(-4px) !important; /* Overrides reveal animation transform */
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}

.product-image-container {
  position: relative;
  padding: 1.5rem;
  background-color: white; /* Always white for product visibility */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 220px;
  border-bottom: 1px solid var(--border-color);
}

.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-category {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: rgba(255, 255, 255, 0.9);
  color: var(--ink-black);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  text-transform: capitalize;
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(4px);
  border: 1px solid var(--gray-200);
}

.product-content {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 0.75rem;
}

.product-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
  color: var(--text-main);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s;
}

.product-card:hover .product-title {
  color: var(--primary);
}

.product-rating {
  font-size: 0.875rem;
  color: var(--school-bus-yellow);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.text-muted {
  color: var(--text-muted);
}

.product-footer {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
}

.btn-icon {
  background-color: var(--regal-navy);
  color: var(--white);
  transition: background-color 0.2s ease;
}

.btn-icon:hover {
  background-color: var(--prussian-blue);
  color: var(--white);
}

@media (prefers-color-scheme: dark) {
  .btn-icon {
    background-color: var(--gold);
    color: var(--ink-black);
  }
  
  .btn-icon:hover {
    background-color: var(--school-bus-yellow);
    color: var(--ink-black);
  }
}
</style>