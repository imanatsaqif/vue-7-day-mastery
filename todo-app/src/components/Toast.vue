<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  message: { type: String, required: true },
  duration: { type: Number, default: 3000 }
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
  <div class="fixed bottom-6 left-6 z-50 overflow-hidden rounded-lg bg-white shadow-2xl border border-gray-100 min-w-[280px] animate-slide-in">
    <div class="px-5 py-4 flex items-center gap-3">
      <!-- Icon -->
      <div class="bg-green-100 p-2 rounded-full text-green-600">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      
      <div>
        <h4 class="font-semibold text-gray-900">Success!</h4>
        <p class="text-sm text-gray-600">{{ message }}</p>
      </div>
    </div>

    <!-- Timer / Progress Bar -->
    <div 
      class="h-1 bg-green-500 transition-all duration-100 ease-linear"
      :style="{ width: progress + '%' }"
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
