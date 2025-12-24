<script setup>
import { useThemeStore } from '../stores/theme.js'
import { RouterLink } from 'vue-router'
import { RouterView } from 'vue-router'

const themeStore = useThemeStore()
function toggleTheme() {
    themeStore.toggleTheme()
    console.log('Theme toggled to:', themeStore.isDark ? 'Dark' : 'Light')
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <nav class="bg-white dark:bg-gray-800 shadow-lg">
            <div class="container mx-auto px-4 py-3 flex justify-between items-center">
                <div class="text-xl font-bold">
                    <RouterLink to="/"
                        class="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                        Imana's Portfolio
                    </RouterLink>
                </div>

                <div class="flex items-center space-x-6">
                    <RouterLink v-for="route in [
                        { name: 'home', label: 'Home' },
                        { name: 'projects', label: 'Projects' },
                        { name: 'about', label: 'About' },
                        { name: 'contact', label: 'Contact' }
                    ]" :key="route.name" :to="{ name: route.name }"
                        class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        active-class="text-blue-600 dark:text-blue-400 font-semibold">
                        {{ route.label }}
                    </RouterLink>

                    <button @click="toggleTheme"
                        class="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                        :title="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'">
                        <span class="text-lg">{{ themeStore.themeIcon }}</span>
                    </button>
                </div>
            </div>
        </nav>

        <main class="container mx-auto px-4 py-8">
            <RouterView />
        </main>

        <footer class="mt-12 py-6 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div class="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
                <p>Built with Vue 3 & Pinia • {{ themeStore.isDark ? 'Dark' : 'Light' }} Mode Active</p>
            </div>
        </footer>
    </div>
</template>