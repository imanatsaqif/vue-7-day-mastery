<!-- Main App-->
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { supabase } from "./lib/supabase";
import TaskInput from "./components/TaskInput.vue";
import TaskList from "./components/TaskList.vue";
import TaskFilters from "./components/TaskFilters.vue";
import Auth from "./components/Auth.vue";
import Toast from "./components/Toast.vue";

const session = ref(null);
const userRole = ref(null);
const allUsers = ref([]);
const selectedUserFilter = ref("all");
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success");
const filter = ref("all");

const triggerToast = (message, type = "success") => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
};

/* [Belajar Reactive]
const todos = reactive([]);
*/
const todos = ref([]); // Sekarang pakai ref

// Menyesuaikan agar menggunakan .value karena todos sekarang adalah ref
const remaining = computed(() => todos.value.filter((t) => !t.is_completed).length);
const hasTasks = computed(() => todos.value.length > 0);

const filteredTodos = computed(() => {
  switch (filter.value) {
    case "active":
      return todos.value.filter((t) => !t.is_completed);
    case "completed":
      return todos.value.filter((t) => t.is_completed);
    default:
      return todos.value;
  }
});

// 1. Ambil Data
const fetchTodos = async () => {
  // Join dengan profiles untuk dapat email author
  let query = supabase.from("todos").select("*, author:profiles(email)");
  
  if (userRole.value === 'admin' && selectedUserFilter.value !== 'all') {
    query = query.eq('user_id', selectedUserFilter.value);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) console.error("Error fetching:", error);
  else todos.value = data;
};

// Ambil list user (hanya untuk Admin)
const fetchAllUsers = async () => {
  const { data } = await supabase.from('profiles').select('id, email');
  allUsers.value = data || [];
};

// 2. Tambah Data
const addTodo = async (title) => {
  // todos.push({ id: Date.now(), text, done: false }); // Local Add, sekarang pakai supabase

  const { data, error } = await supabase
    .from("todos")
    .insert([{ 
      title, 
      user_id: session.value.user.id 
    }])
    .select();

  if (error) triggerToast(error.message, 'error');
  else todos.value.unshift(data[0]);
};

// 3. Update Data (Toggle)
const toggleTodo = async (id) => {
  // Local Update, sekarang pakai Supabase
  // const todo = todos.find(t => t.id === id);
  // if (todo) todo.done = !todo.done;

  const todo = todos.value.find((t) => t.id === id);
  const { error } = await supabase
    .from("todos")
    .update({ is_completed: !todo.is_completed })
    .eq("id", id);

  if (error) triggerToast(error.message, 'error');
  else todo.is_completed = !todo.is_completed;
};

// 4. Hapus Data
const deleteTodo = async (id) => {
  // Local Delete, sekarang pakai Supabase
  // const index = todos.findIndex(t => t.id === id);
  // if (index !== -1) todos.splice(index, 1);

  const { error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id);

  if (error) triggerToast(error.message, 'error');
  else todos.value = todos.value.filter((t) => t.id !== id);
};

const isDark = ref(false);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

onMounted(() => {
  // Sync the theme switcher switch state with current HTML class
  isDark.value = document.documentElement.classList.contains('dark');

  // Cek session saat awal load
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
    if (session.value) fetchTodos(); // Langsung ambil data jika sudah login
  });

  // Selalu periksa perubahan status auth (login/logout/signup)
  supabase.auth.onAuthStateChange((event, _session) => {
    const isLogin = !session.value && _session; // Sebelumnya null, sekarang ada
    session.value = _session;

    if (_session) {
      // Cek role saat login
      supabase.from('profiles').select('role').eq('id', _session.user.id).single()
        .then(({ data }) => {
          userRole.value = data?.role;
          if (userRole.value === 'admin') fetchAllUsers();
          fetchTodos();

          if (isLogin || event === 'SIGNED_UP') {
            const msg = userRole.value === 'admin' 
              ? "Sembah Sujud, Admin" 
              : (event === 'SIGNED_UP' ? "Akun berhasil dibuat!" : "Selamat datang kembali!");
            triggerToast(msg, 'success');
          }
        });
    } else {
      session.value = null;
      userRole.value = null;
      todos.value = [];
    }
  });
});

const handleLogout = async () => {
  await supabase.auth.signOut();
};
</script>

<template>
  <div
    class="min-h-screen w-full flex justify-center items-start sm:items-center px-4 sm:pt-0 pt-4 py-12 app-root relative"
  >
    <!-- Floating Theme Switcher Button -->
    <button 
      @click="toggleTheme" 
      class="fixed top-6 right-6 p-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 z-50 text-[var(--color-text)] cursor-pointer"
      aria-label="Toggle Theme"
    >
      <!-- Sun Icon (shows in Dark Mode) -->
      <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
      <!-- Moon Icon (shows in Light Mode) -->
      <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
    <Auth v-if="!session" />
    <div
      v-else
      class="w-full max-w-3xl app-card p-4 sm:p-6 flex flex-col gap-y-4 my-12"
    >
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-semibold">Todo List</h1>
        <button @click="handleLogout" class="btn-ghost btn-danger text-sm">
          Logout
        </button>
      </div>

      <!-- Input -->
      <TaskInput @add-task="addTodo" />

      <!-- Remaining count -->
      <p v-if="hasTasks" class="text-sm text-muted">
        Remaining:
        <span class="font-medium">{{ remaining }}</span>
      </p>

      <!-- Combined Filters (Status + Admin User) -->
      <TaskFilters 
        v-if="hasTasks" 
        v-model="filter"
        :is-admin="userRole === 'admin'"
        :users="allUsers"
        v-model:user-filter="selectedUserFilter"
        @update:user-filter="fetchTodos"
      />

      <!-- Task list -->
      <TaskList
        :todos="filteredTodos"
        @delete-task="deleteTodo"
        @toggle-task="toggleTodo"
      >
        <!-- Empty state message tetap sederhana -->
        <template #empty>
          <p class="text-xl text-center py-8 text-muted">
            No tasks added yet
          </p>
        </template>
      </TaskList>
    </div>

    <!-- Notification Toast -->
    <Toast 
      v-if="showToast" 
      :message="toastMessage" 
      :type="toastType"
      :duration="4000"
      @close="showToast = false" 
    />
  </div>
</template>
