<script setup>
  import { ref, reactive } from "vue";

  //method 1: primitive ref
  const newTodo = ref("");
  //method 2: reactive object
  const todos = reactive([]);

  const addTodo = () => {
    if (newTodo.value.trim() !== "") {
      todos.push({
        id: Date.now(),
        text: newTodo.value.trim(),
        done: false,
      });
      newTodo.value = "";
    }
  };

  const deleteTodo = (id) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.splice(index, 1);
    }
  };

</script>

<template>
  <div class="app-container">
    <h1>Todo List</h1>
    <div class="input-section">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        type="text"
        placeholder="Add a new todo"
      />
      <button @click="addTodo">Add</button>
    </div>
    <ul class="todo-list">
      <li v-for="todo in todos" :key="todo.id" :class="{ done: todo.done }">
        <input type="checkbox" v-model="todo.done" />
        <span>{{ todo.text }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>