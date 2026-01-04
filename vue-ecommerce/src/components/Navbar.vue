<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>

<template>
  <nav>
    <router-link to="/">Home</router-link>
    <router-link to="/cart">
      Cart ({{ cartStore.totalItems }})
    </router-link>
  </nav>
</template>
