<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useThemeStore } from '@/stores/theme'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthStore()
const themeStore = useThemeStore()
const router = useRouter()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

// Watch for menu state to lock/unlock scroll
watch(isMenuOpen, (newVal) => {
  const html = document.documentElement
  const body = document.body
  if (newVal) {
    html.classList.add('no-scroll')
    body.classList.add('no-scroll')
  } else {
    html.classList.remove('no-scroll')
    body.classList.remove('no-scroll')
  }
})

const handleLogout = () => {
  authStore.logout()
  closeMenu()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar">
    <div class="container navbar-container">
      <router-link to="/" class="logo" @click="closeMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="logo-icon"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        <span class="logo-text">VueShop</span>
      </router-link>
      
      <!-- Hamburger Icon -->
      <button class="hamburger" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }" aria-label="Menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="navbar-menu" :class="{ 'is-open': isMenuOpen }">
        <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
        
        <router-link to="/cart" class="nav-link cart-link" @click="closeMenu">
          <span>Cart</span>
          <span v-if="cartStore.totalItems" class="cart-badge">{{ cartStore.totalItems }}</span>
        </router-link>

        <button @click="themeStore.toggleTheme" class="theme-toggle" aria-label="Toggle Theme">
          <svg v-if="themeStore.isDark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>

        <div v-if="authStore.isAuthenticated" class="user-menu">
           <span class="nav-user">Hi, {{ authStore.user?.username }}</span>
           <button @click="handleLogout" class="btn btn-sm btn-secondary">Logout</button>
        </div>
        <div v-else @click="closeMenu">
          <router-link to="/login" class="btn btn-sm">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: var(--bg-header);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: background 0.3s ease, border-color 0.3s ease;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Semi-transparent background for glass effect */
:root:not(.dark-mode) .navbar {
  background-color: rgba(255, 255, 255, 0.9);
}

.dark-mode .navbar {
  background-color: rgba(0, 8, 20, 0.9);
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem; /* Fixed height for consistency */
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-weight: 800; /* Raleway bold */
  font-size: 1.5rem;
  color: var(--text-main);
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  color: var(--primary);
}

.logo-text {
  font-family: var(--font-primary);
  /* 3 colors for smoother flow (start, middle, end) */
  background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 50%, var(--primary) 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: gradientFlow 4s ease-in-out infinite alternate;
  display: inline-block;
  vertical-align: middle;
}

/* Explicit dark mode adjustment for manual switch */
.dark-mode .logo-text {
  background-image: linear-gradient(90deg, var(--school-bus-yellow) 0%, var(--gold) 50%, var(--school-bus-yellow) 100%);
}

@keyframes gradientFlow {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: 100% center;
  }
}

.navbar-menu {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
}

.hamburger span {
  width: 24px;
  height: 2px;
  background: var(--text-main);
  border-radius: 10px;
  transition: all 0.3s linear;
  position: relative;
  transform-origin: 1px;
}

.hamburger.is-active span:first-child {
  transform: rotate(45deg);
}

.hamburger.is-active span:nth-child(2) {
  opacity: 0;
}

.hamburger.is-active span:nth-child(3) {
  transform: rotate(-45deg);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .navbar-menu {
    position: absolute; /* Relative to sticky header */
    top: 100%; 
    left: 0;
    width: 100%;
    height: calc(100vh - 4rem);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    flex-direction: column;
    padding: 2rem;
    gap: 2rem;
    transform: translateY(-10px);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 10px 15px -10px rgba(0,0,0,0.1);
    z-index: 1000;
  }

  .navbar-menu.is-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .dark-mode .navbar-menu {
    background: rgba(0, 8, 20, 0.98);
    border-top: 1px solid var(--border-color);
  }

  .nav-link {
    font-size: 1.25rem;
    width: 100%;
    justify-content: center;
  }

  .user-menu {
    flex-direction: column;
    width: 100%;
  }

  .theme-toggle {
    margin: 1rem 0;
  }
}

.nav-link {
  text-decoration: none;
  color: var(--text-muted);
  font-family: var(--font-secondary);
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem 0; /* Removed horizontal padding to tighten underline */
  margin: 0 0.5rem;
  transition: color 0.2s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link:hover {
  color: var(--primary);
}

.nav-link.router-link-active {
  color: var(--primary);
  font-weight: 700;
}

/* Underline animation for ALL links including Cart */
.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--primary);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.cart-badge {
  background-color: var(--accent);
  color: var(--ink-black);
  font-size: 0.75rem;
  font-weight: 700;
  height: 1.25rem;
  min-width: 1.25rem;
  padding: 0 0.4rem;
  border-radius: 9999px; /* Pill shape */
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  border-radius: var(--radius);
}

.theme-toggle:hover {
  color: var(--primary);
  background-color: rgba(0, 0, 0, 0.05);
}

.dark-mode .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-user {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-family: var(--font-secondary);
  display: none; /* Hide on very small screens? */
}

@media (min-width: 640px) {
  .nav-user {
    display: block;
  }
}
</style>