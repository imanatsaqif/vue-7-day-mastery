<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getProductById } from '@/api/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const product = ref(null)

onMounted(async () => {
  product.value = await getProductById(route.params.id)
})
</script>

<template>
  <div v-if="product">
    <img :src="product.image" />
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
    <strong>${{ product.price }}</strong>

    <button @click="cartStore.addItem(product)">
      Add to Cart
    </button>
  </div>
</template>