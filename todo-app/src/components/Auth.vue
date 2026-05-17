<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const loading = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const isSignUp = ref(false)
const errorMsg = ref('')

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  errorMsg.value = ''
}

const validateForm = () => {
  errorMsg.value = ''
  
  // 1. Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMsg.value = 'Format email tidak valid!'
    return false
  }
  
  // 2. Password length check
  if (password.value.length < 6) {
    errorMsg.value = 'Password minimal harus 6 karakter!'
    return false
  }

  // 3. Password complexity check (only for Sign Up)
  if (isSignUp.value) {
    const hasLetter = /[a-zA-Z]/.test(password.value)
    const hasNumber = /\d/.test(password.value)
    if (!hasLetter || !hasNumber) {
      errorMsg.value = 'Password harus memiliki minimal 1 huruf dan 1 angka!'
      return false
    }
  }
  
  // 3. Confirm Password (only for Sign Up)
  if (isSignUp.value && password.value !== confirmPassword.value) {
    errorMsg.value = 'Konfirmasi password tidak cocok!'
    return false
  }
  
  return true
}

const handleAuth = async () => {
  if (!validateForm()) return
  
  loading.value = true
  
  if (isSignUp.value) {
    // Logic Register
    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })
    if (error) {
      errorMsg.value = error.message
    } else {
      // Supabase by default requires email confirmation, let's inform the user
      alert('Pendaftaran berhasil! Silakan periksa kotak masuk email Anda untuk verifikasi.')
      toggleMode()
    }
  } else {
    // Logic Login
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })
    if (error) {
      // Map common Supabase auth errors to friendly language
      if (error.message === 'Invalid login credentials') {
        errorMsg.value = 'Email atau password salah. Silakan coba lagi.'
      } else {
        errorMsg.value = error.message
      }
    }
  }
  
  loading.value = false
}
</script>

<template>
  <div class="app-card p-8 w-full max-w-md relative overflow-hidden flex flex-col">
    <!-- Premium Brand Logo and Welcoming Messaging -->
    <div class="flex flex-col items-center gap-2 mb-6">
      <div class="bg-[var(--color-accent)] text-white p-3 rounded-2xl shadow-md transform rotate-6 hover:rotate-12 transition-transform duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      </div>
      <h2 class="text-2xl font-extrabold tracking-tight mt-3 text-center text-[var(--color-text)]">
        {{ isSignUp ? 'Mulai Bersama ImTodo' : 'Selamat Datang Kembali!' }}
      </h2>
      <p class="text-xs text-muted text-center max-w-[290px] leading-relaxed">
        {{ isSignUp ? 'Buat akun gratis hari ini untuk merancang produktivitas terbaikmu dan selesaikan tugas-tugas hebat!' : 'Senang melihat Anda lagi! Masuk untuk mulai merapikan dan menyelesaikan rencana tugas harian Anda.' }}
      </p>
    </div>
    
    <!-- Premium Error Alert Banner -->
    <div v-if="errorMsg" class="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-sm text-center flex items-center justify-center gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{{ errorMsg }}</span>
    </div>

    <form @submit.prevent="handleAuth" class="flex flex-col gap-4">
      <div class="flex flex-col gap-1">
        <input v-model="email" type="email" placeholder="Email" class="input" required />
      </div>

      <div class="flex flex-col gap-1">
        <input v-model="password" type="password" placeholder="Password" class="input" required />
      </div>
      
      <!-- Confirm Password (Sign Up Only) -->
      <div v-if="isSignUp" class="flex flex-col gap-1">
        <input v-model="confirmPassword" type="password" placeholder="Konfirmasi Password" class="input" required />
        <span class="text-[10px] text-muted ml-1">Minimal 6 karakter dengan kombinasi huruf & angka</span>
      </div>
      
      <button :disabled="loading" class="btn-primary mt-2 flex items-center justify-center gap-2 min-h-[42px] cursor-pointer">
        <!-- Spinner Loader -->
        <svg v-if="loading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ loading ? 'Memproses...' : (isSignUp ? 'Daftar Sekarang' : 'Masuk') }}</span>
      </button>
    </form>
    
    <p class="mt-5 text-center text-sm">
      {{ isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?' }}
      <button @click="toggleMode" class="text-muted underline ml-1 hover:text-[var(--color-accent)] transition-colors cursor-pointer" style="color: var(--color-accent);">
        {{ isSignUp ? 'Log In di sini' : 'Daftar di sini' }}
      </button>
    </p>
  </div>
</template>