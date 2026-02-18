<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const loading = ref(false)
const email = ref('')
const password = ref('')
const isSignUp = ref(false)

const handleAuth = async () => {
  loading.value = true
  
  if (isSignUp.value) {
    // Logic Register
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) alert(error.message)
  } else {
    // Logic Login
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) alert(error.message)
  }
  
  loading.value = false
}
</script>

<template>
  <div class="app-card p-8 w-full max-w-md">
    <h2 class="text-2xl font-bold mb-6 text-center">
      {{ isSignUp ? 'Daftar Akun' : 'Selamat Datang' }}
    </h2>
    <form @submit.prevent="handleAuth" class="flex flex-col gap-4">
      <input v-model="email" type="email" placeholder="Email" class="input" required />
      <input v-model="password" type="password" placeholder="Password" class="input" required />
      
      <button :disabled="loading" class="btn-primary">
        {{ loading ? 'Sabar ya...' : (isSignUp ? 'Sign Up' : 'Log In') }}
      </button>
    </form>
    
    <p class="mt-4 text-center text-sm">
      {{ isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?' }}
      <button @click="isSignUp = !isSignUp" class="text-muted underline ml-1" style="color: var(--color-accent);">
        {{ isSignUp ? 'Log In di sini' : 'Daftar di sini' }}
      </button>
    </p>
  </div>
</template>