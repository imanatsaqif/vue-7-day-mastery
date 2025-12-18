<!-- Main App -->
<script setup>
  import { ref, reactive, computed } from "vue";
  import TaskInput from './components/TaskInput.vue'

  // References and reactive state
  const todos = reactive([]); // array of todo objects

  // Computed property to count remaining todos
  const remaining = computed(() => todos.filter(t => !t.done).length);

  // Functions to add and delete todos
  const addTodo = (text) => {
    todos.push({
      id: Date.now(),
      text: text,
      done: false,
    });
  }

  const deleteTodo = (id) => {
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
  };
</script>

<template>
  <!-- Main container -->
  <div class="min-h-screen w-full flex justify-center items-start sm:items-center px-4 sm:pt-0 pt-4">
    <!-- Card container -->
    <div
      class="w-full max-w-3xl
             bg-white rounded-xl shadow
             p-4 sm:p-6
             flex flex-col gap-y-4"
    >
      <h1 class="text-2xl font-semibold text-gray-800">
        Todo List
      </h1>
      <!-- Input and Add button -->
      <TaskInput @add-task="addTodo" />
      <!-- Todo list -->
      <ul v-if="todos.length" class="flex flex-col gap-2">
        <li
          v-for="todo in todos"
          :key="todo.id"
          class="flex items-center justify-between
                 rounded-lg border px-3 py-3"
        >
          <div class="flex items-center gap-2">
            <input type="checkbox" v-model="todo.done" class="h-4 w-4" />
            <span
              :class="todo.done ? 'line-through text-gray-400' : 'text-gray-700'"
              class="text-sm"
            >
              {{ todo.text }}
            </span>
          </div>
          <!-- Delete button -->
          <button
            @click="deleteTodo(todo.id)"
            class="text-sm text-red-500 hover:text-red-700 transition"
          >
            Delete
          </button>
        </li>
      </ul>
      <!-- No todos message -->
      <p v-else class="text-sm italic text-gray-400">
        No todos yet. Add one above!
      </p>
      <!-- Remaining todos count -->
      <p class="text-sm text-gray-600">
        Remaining:
        <span class="font-medium">{{ remaining }}</span>
      </p>
    </div>
  </div>
</template>
