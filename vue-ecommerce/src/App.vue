<script setup>
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Breadcrumb from '@/components/Breadcrumb.vue'
import Footer from '@/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
import ToastNotification from '@/components/ToastNotification.vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <div class="app-wrapper">
    <Navbar />
    <Breadcrumb />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
    <BackToTop />
    <ToastNotification />
  </div>
</template>

<style>
.app-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

@media (max-width: 768px) {
  .main-content {
    padding-top: 4rem;
  }
}
</style>