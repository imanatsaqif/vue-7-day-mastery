<!-- TaskItem Component -->
<template>
  <li class="card-item">
    <!-- Checkbox -->
    <input 
      type="checkbox" 
      :checked="todo.is_completed" 
      @change="toggleDone" 
      class="w-5 h-5" 
    />

    <!-- Todo title -->
    <div class="flex-1 flex flex-col">
      <span :class="todoClass">
        {{ todo.title }}
      </span>
      <span v-if="todo.author?.email" class="text-[10px] text-muted font-medium italic">
        Author: {{ todo.author.email.split('@')[0] }}
      </span>
    </div>

    <!-- Delete button -->
    <button 
      @click="emit('delete-task', todo.id)" 
      class="ml-auto inline-flex items-center px-3 py-1.5 text-sm font-medium btn-danger"
    >
      Delete
    </button>
  </li>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true,
    validator: (value) => {
      const valid = value.id &&
                    typeof value.title === 'string' &&
                    typeof value.is_completed === 'boolean'
      if (!valid) console.warn('Invalid todo prop:', value)
      return valid
    }
  }
})

const emit = defineEmits(['delete-task', 'toggle-task'])

// Toggle checkbox
const toggleDone = () => {
  emit('toggle-task', props.todo.id)
}

// Computed class for todo title
const todoClass = computed(() => ({
  'flex-1': true,
  'line-through text-muted': props.todo.is_completed,
  '': !props.todo.is_completed
}))
</script>