<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  message: { type: String, required: true },
  duration: { type: Number, default: 3000 },
  type: { type: String, default: 'success' } // 'success' | 'error'
});

const emit = defineEmits(['close']);

const progress = ref(100);
let timer = null;
let startTime = null;

const updateProgress = () => {
  const elapsed = Date.now() - startTime;
  const remaining = Math.max(0, props.duration - elapsed);
  progress.value = (remaining / props.duration) * 100;

  if (remaining > 0) {
    timer = requestAnimationFrame(updateProgress);
  } else {
    emit('close');
  }
};

onMounted(() => {
  startTime = Date.now();
  timer = requestAnimationFrame(updateProgress);
});

onUnmounted(() => {
  if (timer) cancelAnimationFrame(timer);
});
</script>

<template>
  <div class="fixed bottom-6 left-6 z-50 overflow-hidden rounded-lg toast-success shadow-2xl min-w-[280px] animate-slide-in">
    <div class="px-5 py-4 flex items-center gap-3">
      <!-- Icon Container -->
      <div 
        class="bg-[var(--color-card-item-bg)] p-2 rounded-full"
        :class="type === 'error' ? 'text-red-500 dark:text-red-400' : 'text-[var(--color-accent)]'"
      >
        <!-- Success Icon -->
        <svg v-if="type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <!-- Error Icon -->
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </div>
      
      <div>
        <h4 class="font-semibold text-sm">{{ type === 'error' ? 'Gagal!' : 'Berhasil!' }}</h4>
        <p class="text-xs text-muted">{{ message }}</p>
      </div>
    </div>

    <!-- Timer / Progress Bar -->
    <div 
      class="toast-progress transition-all duration-100 ease-linear" 
      :style="{ 
        width: progress + '%',
        backgroundColor: type === 'error' ? '#ef4444' : 'var(--color-accent)'
      }"
    ></div>
  </div>
</template>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
