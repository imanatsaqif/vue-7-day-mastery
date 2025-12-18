<script setup>
import { ref, reactive, computed } from "vue";
import TaskInput from './components/TaskInput.vue'
import TaskList from './components/TaskList.vue'
import TaskFilters from './components/TaskFilters.vue'

// Reactive state
const todos = reactive([]);
const filter = ref('all');

// Computed property to count remaining todos
const remaining = computed(() => todos.filter(t => !t.done).length);

// Add, delete, toggle functions
const addTodo = (text) => {
  todos.push({
    id: Date.now(),
    text,
    done: false,
  });
}

const deleteTodo = (id) => {
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos.splice(index, 1);
  }
}

const toggleTodo = (id) => {
  const todo = todos.find(t => t.id === id);
  if (todo) {
    todo.done = !todo.done;
  }
}

// Filtered todos
const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'active':
      return todos.filter(t => !t.done)
    case 'completed':
      return todos.filter(t => t.done)
    default:
      return todos
  }
});
</script>

<template>
  <div class="min-h-screen w-full flex justify-center items-start sm:items-center px-4 sm:pt-0 pt-4">
    <div class="w-full max-w-3xl
             bg-white rounded-xl shadow
             p-4 sm:p-6
             flex flex-col gap-y-4">
      <h1 class="text-2xl font-semibold text-gray-800">
        Todo List
      </h1>

      <!-- Input -->
      <TaskInput @add-task="addTodo" />

      <!-- Remaining count -->
      <p class="text-sm text-gray-600">
        Remaining:
        <span class="font-medium">{{ remaining }}</span>
      </p>

      <!-- Filters -->
      <TaskFilters v-model="filter" />

      <!-- Task list -->
      <TaskList 
        :todos="filteredTodos" 
        @delete-task="deleteTodo"
        @toggle-task="toggleTodo"
      >
        <template #empty>
          <p class="text-xl text-center py-8 text-gray-400">
            {{ filter === 'completed' ? 'All tasks done!' : 'No tasks here!' }}
          </p>
        </template>
      </TaskList>
    </div>
  </div>
</template>