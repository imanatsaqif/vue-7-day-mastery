<!-- TaskInput.vue -->
<template>
    <div class="flex gap-2 mb-4">
        <input
            v-model="inputValue"
            @keyup.enter="handleSubmit"
            placeholder="Add a new task..."
            class="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm
                   text-gray-800 placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
            @click="handleSubmit"
            class="w-full sm:w-auto rounded-lg bg-blue-600 px-4 py-2 text-sm
                   text-white hover:bg-blue-700 transition"
        >
            Add
        </button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// Define a reactive variable for the input value
const emit = defineEmits(['add-task']);
// Reactive variable to hold the input value
const inputValue = ref('');
// Function to handle submission of the task
const handleSubmit = () => {
    const trimmedValue = inputValue.value.trim();
    if (trimmedValue) {
        // Emit the 'add-task' event with the input value
        emit('add-task', trimmedValue);
        // Clear the input field
        inputValue.value = '';
    }
};

</script>