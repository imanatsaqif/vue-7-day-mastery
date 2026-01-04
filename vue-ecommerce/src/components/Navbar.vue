<!-- src/components/Navbar.vue -->
<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
</script>

<template>
  <nav class="navbar">
    <div class="container navbar-container">
      <div class="navbar-brand">
        <router-link to="/" class="logo">
          🛍️ VueShop
        </router-link>
      </div>
      
      <div class="navbar-menu">
        <router-link to="/" class="nav-link">
          Home
        </router-link>
        <router-link to="/cart" class="nav-link cart-link">
          🛒 Cart
          <span class="cart-badge" v-if="cartStore.totalItems">
            {{ cartStore.totalItems }}
          </span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: white;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 20px;
}

.logo {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary);
  text-decoration: none;
}

.navbar-menu {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
}

.nav-link:hover {
  background: var(--gray-light);
  color: var(--primary);
}

.nav-link.router-link-active {
  color: var(--primary);
  font-weight: 600;
}

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-badge {
  background: var(--danger);
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.6rem;
  border-radius: 50px;
  min-width: 24px;
  text-align: center;
}
</style>