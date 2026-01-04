<script setup>
defineProps({
  product: Object
})
</script>

<template>
  <div class="card">
    <img :src="product.image" />
    <h3>{{ product.title }}</h3>
    <p>${{ product.price }}</p>

    <router-link :to="`/product/${product.id}`">
      View Detail
    </router-link>
  </div>
</template>