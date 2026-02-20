<template>
  <div class="login-container">
    <div class="content-wrapper">
      <h1 class="page-title">Who's shopping?</h1>
      <p class="subtitle">Select a profile to continue</p>
      
      <div class="profile-grid">
        <!-- 4 Pre-filled Profiles -->
        <div 
          v-for="profile in preFilledProfiles" 
          :key="profile.id" 
          class="profile-card"
          @click="handleLogin(profile)"
        >
          <div class="profile-avatar">{{ profile.username[0].toUpperCase() }}</div>
          <div class="profile-name">{{ profile.username }}</div>
        </div>

        <!-- 1 Add Profile -->
        <div class="profile-card add-profile" @click="addProfile">
          <div class="profile-avatar add-icon">+</div>
          <div class="profile-name">Add Profile</div>
        </div>
      </div>
      
      <SignupModal 
        v-if="showSignup" 
        @close="showSignup = false" 
        @success="handleSignupSuccess"
      />

      <LoginModal 
        v-if="showLogin"
        @close="showLogin = false"
      />

      <div class="manual-login-prompt">
        <button @click="showLogin = true" class="btn-link">Don't see you in here?</button>
      </div>

      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SignupModal from '@/components/SignupModal.vue'
import LoginModal from '@/components/LoginModal.vue'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')
const showSignup = ref(false)
const showLogin = ref(false)

const preFilledProfiles = ref([
  { id: 1, email: "john@gmail.com", username: "johnd", password: "m38rmF$" },
  { id: 2, email: "morrison@gmail.com", username: "mor_2314", password: "83r5^_" },
  { id: 3, email: "kevin@gmail.com", username: "kevinryan", password: "kev02937@" },
  { id: 4, email: "don@gmail.com", username: "donero", password: "ewedon" }
])

onMounted(async () => {
  if (authStore.users.length === 0) {
    await authStore.fetchUsers()
  }
})

const handleLogin = async (profile) => {
  loading.value = true
  error.value = ''
  
  const success = await authStore.login(profile.username, profile.password)
  
  loading.value = false
  if (success) {
    router.push('/')
  } else {
    error.value = 'Failed to login with this profile. Please try again.'
  }
}

const addProfile = () => {
  showSignup.value = true
}

const handleSignupSuccess = (newUser) => {
  preFilledProfiles.value.push(newUser)
  showSignup.value = false
  // Maybe show a toast
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 4rem);
  text-align: center;
  padding: 2rem;
}

.content-wrapper {
  animation: fadeIn 0.5s ease-out;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: var(--text-muted);
  margin-bottom: 3rem;
  font-size: 1.1rem;
}

.profile-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 1000px;
}

.profile-card {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.profile-card:hover {
  transform: translateY(-8px);
}

.profile-avatar {
  width: 100px;
  height: 100px;
  background-color: var(--regal-navy); /* Matches theme */ 
  color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 600;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.profile-card:hover .profile-avatar {
  box-shadow: var(--shadow-lg);
  background-color: var(--prussian-blue);
  border-color: var(--school-bus-yellow);
}

.add-profile .profile-avatar {
  background-color: transparent;
  border: 2px dashed var(--gray-200);
  color: var(--text-muted);
}

.add-profile:hover .profile-avatar {
  border-color: var(--primary);
  color: var(--primary);
  background-color: transparent;
}

.profile-name {
  color: var(--text-muted);
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.profile-card:hover .profile-name {
  color: var(--text-main);
  font-weight: 600;
}

.loading-overlay {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--gray-200);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.error-message {
  margin-top: 2rem;
  color: #ef4444; /* Standard danger color might be safer than palette red if not defined */
  font-weight: 500;
}

.manual-login-prompt {
  margin-top: 3rem;
}

.btn-link {
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.5rem 1rem;
  border-radius: var(--radius);
}

.btn-link:hover {
  color: var(--primary);
  background-color: rgba(0, 0, 0, 0.05);
}

@media (prefers-color-scheme: dark) {
  .btn-link:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
}
</style>
