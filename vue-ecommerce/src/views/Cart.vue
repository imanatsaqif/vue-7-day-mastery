<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <div>
    <h1>Cart</h1>

    <div v-for="item in cartStore.items" :key="item.id">
      <p>{{ item.title }} - ${{ item.price }}</p>
      <button @click="cartStore.removeItem(item.id)">Remove</button>
    </div>

    <hr />
    <p>Total: ${{ cartStore.totalPrice }}</p>
  </div>
</template>
    