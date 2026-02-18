<!-- TaskItem Component -->
<template>
  <li class="flex items-center gap-3 p-3 bg-gray-100 rounded-lg shadow-sm">
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
      <span v-if="todo.author?.email" class="text-[10px] text-gray-400 font-medium italic">
        Author: {{ todo.author.email.split('@')[0] }}
      </span>
    </div>

    <!-- Delete button -->
    <button 
      @click="emit('delete-task', todo.id)" 
      class="
        ml-auto
        inline-flex items-center
        px-3 py-1.5
        text-sm font-medium
        text-red-600
        border border-red-300
        rounded-md
        hover:bg-red-50
        hover:border-red-400
        hover:text-red-700
        transition
      "
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
  'line-through text-gray-400': props.todo.is_completed,
  'text-gray-800': !props.todo.is_completed
}))
</script>