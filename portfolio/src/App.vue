<script setup>
import { RouterView } from 'vue-router'
import ApiStatus from '@/components/ApiStatus.vue'

const isDev = import.meta.env.DEV
</script>

<template>
  <RouterView />
  <ApiStatus v-if="isDev" />
</template>