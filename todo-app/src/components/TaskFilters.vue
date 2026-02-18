<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    users: { type: Array, default: () => [] },
    userFilter: { type: String, default: 'all' }
});

const emit = defineEmits(['update:modelValue', 'update:userFilter']);
const isDropdownOpen = ref(false);

const filters = [
    { label: 'All', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Completed', value: 'completed' }
];

const setFilter = (value) => {
    emit('update:modelValue', value)
}

const setUserFilter = (id) => {
    emit('update:userFilter', id);
    isDropdownOpen.value = false; // Tutup dropdown setelah pilih
}

// Helper to get nice name from email
const getName = (email) => email ? email.split('@')[0] : 'Unknown';

// Ambil nama user yang sedang dipilih untuk label tombol
const selectedUserName = () => {
    if (props.userFilter === 'all') return 'Author';
    const user = props.users.find(u => u.id === props.userFilter);
    return getName(user?.email);
};
</script>

<template>
    <div class="flex flex-wrap gap-2 mb-6 justify-center items-center">
        <!-- Status Filters -->
        <button v-for="f in filters" :key="f.value" @click="setFilter(f.value)" :class="[
            'px-4 py-2 rounded-lg border text-sm font-medium transition',
            modelValue === f.value ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        ]">
            {{ f.label }}
        </button>

        <!-- Admin Author Dropdown -->
        <div v-if="isAdmin && users.length > 0" class="relative">
            <button 
                @click="isDropdownOpen = !isDropdownOpen"
                :class="[
                    'px-4 py-2 rounded-lg border text-sm font-medium transition flex items-center gap-2',
                    userFilter !== 'all' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                ]"
            >
                <span>{{ selectedUserName() }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transition-transform" :class="{ 'rotate-180': isDropdownOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <!-- Dropdown Menu -->
            <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in duration-200">
                <button 
                    @click="setUserFilter('all')"
                    class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition"
                    :class="userFilter === 'all' ? 'text-indigo-600 font-bold bg-indigo-50' : 'text-gray-700'"
                >
                    All Authors (Everyone)
                </button>
                <div class="border-t border-gray-50"></div>
                <button 
                    v-for="u in users" 
                    :key="u.id" 
                    @click="setUserFilter(u.id)"
                    class="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition truncate"
                    :class="userFilter === u.id ? 'text-indigo-600 font-bold bg-indigo-50' : 'text-gray-700'"
                >
                    {{ getName(u.email) }}
                </button>
            </div>
        </div>
    </div>
</template>