<script setup>
import { ref, onMounted } from 'vue'
import { getAllProducts } from '@/api/products'
import ProductCard from '@/components/ProductCard.vue'

const products = ref([])

onMounted(async () => {
  products.value = await getAllProducts()
})
</script>

<template>
  <div class="grid">
    <ProductCard
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
</template>
