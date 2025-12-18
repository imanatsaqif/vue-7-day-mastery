<!-- Task Item Component -->
<template>
    <li class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-2">
        <input type="checkbox" :checked="todo.done" @change="toggleDone" class="w-5 h-5" />
        <span :class="{ 'line-through text-gray-400': todo.done, 'flex-1': true, 'text-gray-800': !todo.done }">
            {{ todo.text }}
        </span>
        <button @click="emit('delete-task', todo.id)" class="
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
        ">
            Delete
        </button>
    </li>
</template>

<script setup>
    const props = defineProps({
        todo: {
            type: Object,
            required: true,
            validator: (value) => {
                return value.hasOwnProperty('id') &&
                    value.hasOwnProperty('text') &&
                    value.hasOwnProperty('done')
            }
        }
    })

    const emit = defineEmits(['delete-task', 'toggle-task'])

    const toggleDone = () => {
        emit('toggle-task', props.todo.id)
    }
</script>