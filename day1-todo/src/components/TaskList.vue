<!-- TaskList Component -->
<template>
    <div v-if="todos.length === 0" class="text-gray-500 text-center py-8">
        <slot name="empty">No tasks yet. Add one above!</slot>
    </div>

    <!-- Tambahkan list-none untuk menghilangkan bullet points default -->
    <ul v-else class="space-y-2 list-none p-0 m-0">
        <TaskItem
            v-for="todo in todos"
            :key="todo.id"
            :todo="todo"
            @delete-task="$emit('delete-task', $event)"
            @toggle-task="$emit('toggle-task', $event)"
        />
    </ul>
</template>

<script setup>
    import TaskItem from './TaskItem.vue';

    // Define props
    const props = defineProps({
        todos: {
            type: Array,
            required: true
        }
    });

    // Define emits
    const emit = defineEmits(['delete-task', 'toggle-task']);
</script>