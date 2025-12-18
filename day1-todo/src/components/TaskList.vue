<!-- TaskList Component -->
<template>
    <div v-if="todos.length === 0" class="text-gray-500 text-center py-8">
        <!-- Slot for empty state message -->
        <slot name="empty">No tasks yet. Add one above!</slot>
    </div>

    <ul v-else class="space-y-2">
        <!-- Loop through todos and render TaskItem for each -->
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