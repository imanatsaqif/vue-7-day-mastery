<template>
  <div class="login-page">
    <div class="auth-card">
      <div class="auth-tabs">
        <div class="tab-indicator" :class="{ 'is-signup': authMode === 'signup' }"></div>
        <button 
          @click="authMode = 'login'" 
          :class="{ active: authMode === 'login' }"
          class="tab-btn"
        >
          Login
        </button>
        <button 
          @click="authMode = 'signup'" 
          :class="{ active: authMode === 'signup' }"
          class="tab-btn"
        >
          Register
        </button>
      </div>

      <div class="auth-content">
        <transition name="fade-slide" mode="out-in">
          <!-- LOGIN FORM -->
          <form v-if="authMode === 'login'" @submit.prevent="handleLogin" class="auth-form" novalidate key="login">
            <div class="form-header">
              <h2>Welcome Back</h2>
              <p class="form-desc">Login to your account to continue shopping.</p>
            </div>
            
            <div class="form-group">
              <label for="login-username">Username</label>
              <div class="input-wrapper">
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <input 
                  id="login-username"
                  v-model.trim="loginData.username" 
                  type="text" 
                  required 
                  placeholder="Enter your username"
                  :disabled="loading"
                  :class="{ 'input-error': validationErrors.loginUsername }"
                >
              </div>
              <span v-if="validationErrors.loginUsername" class="field-error">{{ validationErrors.loginUsername }}</span>
            </div>

            <div class="form-group">
              <label for="login-password">Password</label>
              <div class="input-wrapper">
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <input 
                  id="login-password"
                  v-model="loginData.password" 
                  type="password" 
                  required 
                  placeholder="Enter your password"
                  :disabled="loading"
                  :class="{ 'input-error': validationErrors.loginPassword }"
                >
              </div>
              <span v-if="validationErrors.loginPassword" class="field-error">{{ validationErrors.loginPassword }}</span>
            </div>

            <button type="submit" class="btn btn-auth" :disabled="loading">
              <span v-if="loading" class="btn-spinner"></span>
              {{ loading ? 'Authenticating...' : 'Login to Account' }}
            </button>
          </form>

          <!-- SIGNUP FORM -->
          <form v-else @submit.prevent="handleSignup" class="auth-form" novalidate key="signup">
            <div class="form-header">
              <h2>Create Account</h2>
              <p class="form-desc">Join VueShop to start your shopping journey.</p>
            </div>
            
            <div class="form-group">
              <label for="signup-username">Username</label>
              <div class="input-wrapper">
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                <input 
                  id="signup-username"
                  v-model.trim="signupData.username" 
                  type="text" 
                  required 
                  placeholder="Min 3 characters"
                  :disabled="loading"
                  :class="{ 'input-error': validationErrors.signupUsername }"
                >
              </div>
              <span v-if="validationErrors.signupUsername" class="field-error">{{ validationErrors.signupUsername }}</span>
            </div>

            <div class="form-group">
              <label for="signup-email">Email Address</label>
              <div class="input-wrapper">
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <input 
                  id="signup-email"
                  v-model.trim="signupData.email" 
                  type="email" 
                  required 
                  placeholder="e.g. john@example.com"
                  :disabled="loading"
                  :class="{ 'input-error': validationErrors.signupEmail }"
                >
              </div>
              <span v-if="validationErrors.signupEmail" class="field-error">{{ validationErrors.signupEmail }}</span>
            </div>

            <div class="form-group">
              <label for="signup-password">Password</label>
              <div class="input-wrapper">
                <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <input 
                  id="signup-password"
                  v-model="signupData.password" 
                  type="password" 
                  required 
                  placeholder="Min 6 characters"
                  :disabled="loading"
                  :class="{ 'input-error': validationErrors.signupPassword }"
                >
              </div>
              <span v-if="validationErrors.signupPassword" class="field-error">{{ validationErrors.signupPassword }}</span>
            </div>

            <button type="submit" class="btn btn-auth" :disabled="loading">
              <span v-if="loading" class="btn-spinner"></span>
              {{ loading ? 'Creating Account...' : 'Create Account' }}
            </button>
          </form>
        </transition>

        <!-- GLOBAL ERROR MESSAGE -->
        <div v-if="error" class="error-banner">
          <svg class="error-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          {{ error }}
        </div>
      </div>

      <!-- DEMO ACCOUNTS HELPER -->
      <div class="demo-helper">
        <p class="helper-title">Quick Access (Dev Mode)</p>
        <div class="demo-chips">
          <button 
            v-for="profile in demoProfiles" 
            :key="profile.id"
            @click="fillDemoAccount(profile)"
            class="demo-chip"
            type="button"
            :title="'Fill ' + profile.username"
          >
            {{ profile.username }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const authMode = ref('login')
const loading = ref(false)
const error = ref('')
const validationErrors = reactive({
  loginUsername: '',
  loginPassword: '',
  signupUsername: '',
  signupEmail: '',
  signupPassword: ''
})

const loginData = reactive({ username: '', password: '' })
const signupData = reactive({ username: '', email: '', password: '' })

const demoProfiles = [
  { id: 1, username: "johnd", password: "m38rmF$" },
  { id: 2, username: "mor_2314", password: "83r5^_" },
  { id: 3, username: "kevinryan", password: "kev02937@" }
]

onMounted(async () => {
  if (route.query.signup) authMode.value = 'signup'
  if (authStore.users.length === 0) await authStore.fetchUsers()
})

const validateLogin = () => {
  let isValid = true
  validationErrors.loginUsername = ''
  validationErrors.loginPassword = ''
  if (!loginData.username) { validationErrors.loginUsername = 'Username is required'; isValid = false }
  if (!loginData.password) { validationErrors.loginPassword = 'Password is required'; isValid = false }
  return isValid
}

const validateSignup = () => {
  let isValid = true
  Object.keys(validationErrors).forEach(key => validationErrors[key] = '')

  if (signupData.username.length < 3) {
    validationErrors.signupUsername = 'Username must be at least 3 characters'
    isValid = false
  } else if (authStore.users.some(u => u.username === signupData.username)) {
    validationErrors.signupUsername = 'Username is already taken'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(signupData.email)) {
    validationErrors.signupEmail = 'Please enter a valid email address'
    isValid = false
  }

  if (signupData.password.length < 6) {
    validationErrors.signupPassword = 'Password must be at least 6 characters'
    isValid = false
  }
  return isValid
}

const handleLogin = async () => {
  if (!validateLogin()) return
  loading.value = true; error.value = ''
  try {
    const success = await authStore.login(loginData.username, loginData.password)
    if (success) router.push(route.query.redirect || '/')
    else error.value = 'Invalid username or password. Please try again.'
  } catch (err) {
    error.value = 'An unexpected error occurred. Please try again.'
  } finally { loading.value = false }
}

const handleSignup = async () => {
  if (!validateSignup()) return
  loading.value = true; error.value = ''
  try {
    const user = await authStore.addUser(signupData)
    if (user) {
      const success = await authStore.login(signupData.username, signupData.password)
      if (success) router.push(route.query.redirect || '/')
    } else {
      error.value = 'Failed to create profile. Please try again.'
    }
  } catch (err) {
    error.value = 'Failed to create profile.'
  } finally { loading.value = false }
}

const fillDemoAccount = (profile) => {
  authMode.value = 'login'
  loginData.username = profile.username
  loginData.password = profile.password
  error.value = ''
  validationErrors.loginUsername = ''
  validationErrors.loginPassword = ''
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 4rem);
  padding: 4rem 2rem;
  background-attachment: fixed;
}

.auth-card {
  background: var(--bg-card);
  width: 100%;
  max-width: 480px;
  border-radius: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--border-color);
  overflow: hidden;
  backdrop-filter: blur(20px);
  animation: cardAppear 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes cardAppear {
  from { opacity: 0; transform: translateY(20px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.auth-tabs {
  display: flex;
  position: relative;
  background: rgba(var(--primary-rgb, 0, 53, 102), 0.03);
  padding: 0.5rem;
  margin: 1.5rem 1.5rem 0;
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.tab-indicator {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: calc(50% - 0.5rem);
  height: calc(100% - 1rem);
  background: var(--bg-card);
  border-radius: 0.75rem;
  box-shadow: var(--shadow);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
}

.tab-indicator.is-signup {
  transform: translateX(100%);
}

.tab-btn {
  flex: 1;
  padding: 0.85rem;
  background: none;
  border: none;
  font-weight: 700;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.3s;
  font-family: var(--font-primary);
  font-size: 0.95rem;
  position: relative;
  z-index: 2;
  border-radius: 0.75rem;
}

.tab-btn.active {
  color: var(--primary);
}

.auth-content {
  padding: 2.5rem;
  min-height: 480px; /* Prevent jumping */
}

.form-header {
  margin-bottom: 2rem;
  text-align: center;
}

.form-header h2 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-main);
  letter-spacing: -0.02em;
}

.form-desc {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 0.6rem;
  color: var(--text-main);
  opacity: 0.9;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-muted);
  transition: color 0.3s;
}

.input-wrapper input {
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border-radius: 1rem;
  border: 2px solid var(--border-color);
  background: var(--bg-body);
  color: var(--text-main);
  font-family: var(--font-secondary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(255, 195, 0, 0.15);
  background: var(--bg-card);
}

.input-wrapper input:focus + .input-icon {
  color: var(--accent);
}

.field-error {
  display: block;
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.5rem;
  padding-left: 1rem;
}

.input-error {
  border-color: rgba(239, 68, 68, 0.5) !important;
}

.btn-auth {
  width: 100%;
  padding: 1.1rem;
  font-size: 1.1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--regal-navy) 100%);
  color: white;
  border: none;
  border-radius: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  box-shadow: 0 10px 15px -3px rgba(0, 53, 102, 0.3);
}

.dark-mode .btn-auth {
  background: linear-gradient(135deg, var(--school-bus-yellow) 0%, var(--gold) 100%);
  color: var(--ink-black);
  box-shadow: 0 10px 15px -3px rgba(255, 195, 0, 0.3);
}

.btn-auth:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px -5px rgba(0, 53, 102, 0.4);
  filter: brightness(1.1);
}

.btn-auth:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.btn-spinner {
  width: 1.25rem;
  height: 1.25rem;
  border: 3px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
  margin-right: 0.75rem;
  vertical-align: middle;
}

.dark-mode .btn-spinner {
  border-color: rgba(0, 8, 20, 0.3);
  border-top-color: var(--ink-black);
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-banner {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 0.95rem;
  margin-top: 2rem;
  border: 1px solid rgba(239, 68, 68, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-weight: 600;
}

.demo-helper {
  padding: 1.5rem 2.5rem;
  background: rgba(var(--primary-rgb, 0, 53, 102), 0.05);
  border-top: 1px solid var(--border-color);
  text-align: center;
}

.helper-title {
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
}

.demo-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.demo-chip {
  padding: 0.5rem 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
}

.demo-chip:hover {
  border-color: var(--accent);
  color: var(--accent);
  transform: scale(1.05);
  box-shadow: var(--shadow);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 480px) {
  .auth-content { padding: 1.5rem; }
  .login-page { padding: 2rem 1rem; }
  .form-header h2 { font-size: 1.5rem; }
}
</style>
