<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <!-- Navigation -->
         <header class="border-b">
            <nav class="max-w-5xl mx-auto p-4 flex gap-4">
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/projects">Projects</router-link>
                <router-link to="/contact">Contact</router-link>
            </nav>
         </header>

        <!-- Main Content -->
         <main class="flex-1 max-w-5xl mx-auto w-full p-6">
            <router-view />
        </main>
    </div>
</template>