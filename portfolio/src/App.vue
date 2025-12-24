<script setup>
import { ref } from 'vue';
import { useThemeStore } from './stores/theme.js'
    const themeStore = useThemeStore()
    const status = ref(localStorage.getItem('portfolio-theme') || 'not set')
    console.log('App.vue loaded, current theme:', status.value);
    function changeTheme() {
        themeStore.toggleTheme()
        status.value = localStorage.getItem('portfolio-theme') || 'not set'
        console.log('Theme changed to:', status.value);
    }
</script>

<template>
  <span class="mr-4">Our state now is {{ themeStore.themeClass }} {{ themeStore.themeIcon }}</span>
  <button class="button-sm" @click="changeTheme">Toggle Theme</button>
  <router-view />
</template>