<!-- Task Filters Component -->
<template>
    <div class="flex gap-2 mb-4 justify-center">
        <button v-for="filter in filters" :key="filter.value" @click="setFilter(filter.value)" :class="[
            'px-4 py-2 rounded-lg border transition',
            modelValue === filter.value ? 'bg-blue-500 text-white border-blue-500' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
        ]">
            {{ filter.label }}
        </button>

    </div>
</template>

<script setup>
// Define props
defineProps({
    modelValue: {
        type: String,
        required: true
    }
});
// Define emits
const emit = defineEmits(['update:modelValue']);

// Define filter options
const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' }
];

// Function to set the current filter
const setFilter = (value) => {
    emit('update:modelValue', value)
}
</script>