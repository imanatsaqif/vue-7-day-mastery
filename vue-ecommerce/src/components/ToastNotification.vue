<script setup>
import { useToastStore } from '@/stores/toast'

const toastStore = useToastStore()
</script>

<template>
  <div class="toast-container">
    <TransitionGroup name="toast" tag="div" class="toast-list">
      <div 
        v-for="toast in toastStore.toasts" 
        :key="toast.id"
        class="toast-item"
        :class="toast.type"
        @click="toastStore.removeToast(toast.id)"
      >
        <div class="toast-content">
          <span v-if="toast.type === 'success'" class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          </span>
          <span class="message">{{ toast.message }}</span>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  z-index: 9999;
  bottom: 24px;
  right: 24px;
  width: auto;
  pointer-events: none; /* Allow clicks to pass through container */
}

.toast-list {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align right on desktop */
  gap: 12px;
}

.toast-item {
  pointer-events: auto;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 20px;
  border-radius: var(--radius); /* Using global radius */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  backdrop-filter: blur(8px);
  border: 1px solid var(--border-color);
  min-width: 280px;
  max-width: 350px;
  cursor: pointer;
  transform-origin: center right;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon {
  color: var(--primary); /* Use primary color for success */
  display: flex;
  align-items: center;
}

.message {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-main);
  font-family: var(--font-secondary);
}

/* Transitions */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.9);
}

/* Ensure leaving items are taken out of flow smoothly */
.toast-leave-active {
  position: absolute; 
  /* Using absolute positioning on leave ensures the stack collapses correctly */
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .toast-item {
    background: rgba(0, 29, 61, 0.85); /* Prussian Blue tint */
    border-color: rgba(255, 214, 10, 0.2);
  }
  
  .message {
    color: var(--white);
  }
  
  .icon {
    color: var(--school-bus-yellow);
  }
}

/* Mobile Responsiveness */
@media (max-width: 640px) {
  .toast-container {
    bottom: 20px;
    left: 20px;
    right: 20px;
    width: auto;
    display: flex;
    justify-content: center;
  }
  
  .toast-list {
    align-items: center; /* Center align on mobile */
    width: 100%;
  }
  
  .toast-item {
    min-width: unset;
    width: 100%;
    justify-content: center;
    transform-origin: bottom center;
    margin-bottom: 0; /* Removing margin managed by gap */
    border-radius: 50px; /* Pill shape on mobile looks minimal */
    padding: 10px 24px;
    font-size: 0.9rem;
  }
  
  .toast-enter-from,
  .toast-leave-to {
    transform: translateY(20px) scale(0.9);
    opacity: 0;
  }
}
</style>
