<!-- src/components/ProductCard.vue -->
<script setup>
defineProps({
  product: Object
})

defineEmits(['add-to-cart'])

const truncateDescription = (desc) => {
  return desc.length > 100 ? desc.substring(0, 100) + '...' : desc
}
</script>

<template>
  <div class="product-card">
    <div class="product-image-container">
      <img :src="product.image" :alt="product.title" class="product-image" />
      <div class="product-category">
        {{ product.category }}
      </div>
    </div>
    
    <div class="product-content">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-description">{{ truncateDescription(product.description) }}</p>
      
      <div class="product-footer">
        <div class="product-price">${{ product.price.toFixed(2) }}</div>
        <div class="product-actions">
          <router-link :to="`/product/${product.id}`" class="btn btn-sm">
            View Details
          </router-link>
          <button @click="$emit('add-to-cart', product)" class="btn btn-secondary btn-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background: white;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.product-image-container {
  position: relative;
  padding: 20px;
  background: white;
  text-align: center;
  border-bottom: 1px solid var(--gray-light);
}

.product-image {
  height: 200px;
  width: 100%;
  object-fit: contain;
  transition: var(--transition);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-category {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--primary);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  text-transform: capitalize;
}

.product-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: var(--dark);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-description {
  color: var(--gray);
  font-size: 0.9rem;
  margin-bottom: 20px;
  flex: 1;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

.product-actions {
  display: flex;
  gap: 10px;
}
</style>