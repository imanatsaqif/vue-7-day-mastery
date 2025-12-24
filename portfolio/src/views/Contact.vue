<template>
  <h1 class="text-2xl font-semibold">Contact</h1>
</template>

<script setup>
import { useThemeStore } from '../stores/theme.js'
const themeStore = useThemeStore()
console.log(themeStore.isDark)

</script>