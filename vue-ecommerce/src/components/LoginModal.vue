<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2>Welcome Back</h2>
      <p class="modal-subtitle">Login with your credentials</p>

      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Username</label>
          <input 
            v-model="formData.username" 
            type="text" 
            required 
            placeholder="johnd"
          >
        </div>
        <div class="form-group">
          <label>Password</label>
          <input 
            v-model="formData.password" 
            type="password" 
            required 
            placeholder="********"
          >
        </div>
        <div class="modal-actions">
          <button type="button" @click="$emit('close')" class="btn btn-secondary fill-width">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary fill-width" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </form>
      <div v-if="error" class="error-message">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['close'])
const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const formData = ref({
  username: '',
  password: ''
})

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  const success = await authStore.login(formData.value.username, formData.value.password)
  loading.value = false
  
  if (success) {
    emit('close')
    router.push('/')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.modal-content {
  background: var(--bg-card);
  padding: 2.5rem;
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 400px;
  color: var(--text-main);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  animation: modalIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-subtitle {
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

@keyframes modalIn {
  from { opacity: 0; transform: translateY(10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

h2 {
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main);
  text-align: center;
}

.form-group {
  margin-bottom: 1.25rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.85rem;
  background-color: var(--bg-body);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  color: var(--text-main);
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.1);
}

@media (prefers-color-scheme: dark) {
  .form-group input:focus {
    box-shadow: 0 0 0 3px rgba(255, 195, 0, 0.1);
  }
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.fill-width {
  flex: 1;
}

.error-message {
  margin-top: 1.5rem;
  color: #ef4444;
  font-size: 0.9rem;
  text-align: center;
  font-weight: 500;
}
</style>
