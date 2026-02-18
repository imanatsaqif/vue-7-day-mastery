<!-- TaskInput.vue -->
<template>
    <div class="card-item mb-4">
        <input 
            ref="inputRef"
            v-model="inputValue" 
            @keyup.enter="handleSubmit" 
            placeholder="Add a new task..." 
            class="input flex-1 text-sm" 
        />
        <button @click="handleSubmit" class="btn-primary">
            Add
        </button>
    </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    // Define a reactive variable for the input value
    const emit = defineEmits(['add-task']);
    // Reactive variable to hold the input value
    const inputValue = ref('');
    // Ref for the input element
    const inputRef = ref(null);

    // Auto focus when mounted
    onMounted(() => {
        inputRef.value?.focus();
    });

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