<template>
  <nav class="breadcrumb-nav container" v-if="breadcrumbs.length > 0">
    <ol class="breadcrumb-list">
      <li class="breadcrumb-item">
        <router-link to="/">Home</router-link>
      </li>
      <li v-for="(crumb, index) in breadcrumbs" :key="index" class="breadcrumb-item">
        <span class="separator">/</span>
        <router-link v-if="index < breadcrumbs.length - 1" :to="crumb.path">
          {{ crumb.name }}
        </router-link>
        <span v-else class="current">{{ crumb.name }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/products'

const route = useRoute()
const productStore = useProductStore()

const breadcrumbs = computed(() => {
  const path = route.path
  const parts = path.split('/').filter(p => p)
  const crumbs = []

  if (parts[0] === 'product' && parts[1]) {
    // We are on product detail
    const product = productStore.products.find(p => p.id === parseInt(parts[1]))
    crumbs.push({ name: 'Products', path: '/' })
    crumbs.push({ name: product ? product.title : 'Details', path: route.path })
  } else if (parts[0] === 'cart') {
    crumbs.push({ name: 'Shopping Cart', path: '/cart' })
  } else if (parts[0] === 'login') {
    crumbs.push({ name: 'Login', path: '/login' })
  }

  return crumbs
})
</script>

<style scoped>
.breadcrumb-nav {
  padding-top: 1.5rem;
  padding-bottom: 0.5rem;
  animation: fadeIn 0.5s ease-out;
}

.breadcrumb-list {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-muted);
}

.breadcrumb-item a {
  text-decoration: none;
  color: var(--text-muted);
  transition: color 0.2s;
}

.breadcrumb-item a:hover {
  color: var(--primary);
}

.separator {
  margin-right: 0.5rem;
  color: var(--border-color);
  font-weight: 300;
}

.current {
  color: var(--primary);
  font-weight: 700;
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 640px) {
  .current {
    max-width: 150px;
  }
}
</style>
