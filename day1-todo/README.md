# Live Demo
[![Deploy with Vercel](https://vercel.com/button)](https://vue-day1-todo.vercel.app)

**URL:** https://vue-day1-todo.vercel.app
## Day 1: Vue.js Todo App

## What I Learned Today
- Vue 3 Composition API: `ref()` vs `reactive()`
- Directives: `v-model`, `v-for`, `v-if`, `@click`
- Component structure & reactivity
- Vercel deployment workflow

## Features
- Add todos (v-model)
- Delete todos (@click)
- Toggle complete state
- Responsive Tailwind design
- Live deployment

# Key Learnings

## Differences from React
1. **No JSX Needed**:
   - Vue uses templates instead of JSX for defining the UI structure.
   - Example:

     ```html
     <template>
       <div>{{ message }}</div>
     </template>
     ```

2. **`ref()` vs `useState()`**:
   - `ref()` is used to create reactive primitive values in Vue.
   - Access the value in the script using `.value`, but it is auto-unwrapped in the template.
   - Example:

     ```javascript
     import { ref } from 'vue';

     const count = ref(0);
     console.log(count.value); // Access in script
     ```

     ```html
     <template>
       <p>{{ count }}</p> <!-- Auto-unwrapped in template -->
     </template>
     ```

3. **`reactive()` for Objects**:
   - Similar to `useState` in React, but specifically for objects.
   - Example:

     ```javascript
     import { reactive } from 'vue';

     const state = reactive({ name: 'John', age: 30 });
     state.name = 'Jane'; // Updates reactively
     ```

4. **Directives vs No Directives in React**:
   - Vue provides built-in directives (e.g., `v-if`, `v-for`, `v-bind`) to simplify common tasks.
   - React does not have directives; you use JavaScript logic directly in JSX.
   - Example of `v-if`:

     ```html
     <template>
       <p v-if="isVisible">Visible</p>
     </template>
     ```

     In React:

     ```jsx
     {isVisible && <p>Visible</p>}
     ```

  ## Screenshot
<img width="1861" height="884" alt="image" src="https://github.com/user-attachments/assets/ec930877-afdb-4854-9267-079c894a7118" />

## Day 2: Vue.js Component Architecture

## What I Learned Today
- Single File Components (SFC) with `<script setup>`
- Props: `defineProps()` with validation
- Emits: `defineEmits()` for child→parent events
- Slots: named slots & default fallback content
- Computed properties for derived state
- Component v-model for two-way binding

## Features Added
- **Modular Architecture**: 4 focused components
- **TaskInput**: Independent input with validation
- **TaskItem**: Reusable todo with props validation
- **TaskList**: Container with empty state slots
- **TaskFilters**: All/Pending/Completed filtering
- **Computed Filtering**: Efficient derived state

## Component Tree
```
App.vue (state management)
├── TaskInput (@add-task)
├── TaskFilters (v-model="filter")
└── TaskList (:todos)
    └── TaskItem (:todo, @delete-task, @toggle-task)
```

# Key Learnings

## Differences from React

1. **Single File Components**:
   - Template, script, and styles in one `.vue` file
   - Example:

     ```vue
     <template>
       <button @click="handleClick">Click</button>
     </template>
     
     <script setup>
     const emit = defineEmits(['click'])
     const handleClick = () => emit('click')
     </script>
     ```

2. **`defineProps()` vs `propTypes`**:
   - Built-in prop validation in Vue
   - Example:

     ```javascript
     defineProps({
       todo: {
         type: Object,
         required: true,
         validator: (value) => value.id && value.text
       }
     })
     ```

3. **`defineEmits()` vs Callback Props**:
   - Explicit event declaration in Vue
   - Example:

     ```javascript
     const emit = defineEmits(['delete-task'])
     emit('delete-task', todo.id)
     ```

4. **Computed vs `useMemo()`**:
   - Auto-tracked dependencies in Vue
   - Example:

     ```javascript
     const filteredTodos = computed(() => {
       return todos.filter(t => t.done) // Auto-cached
     })
     ```

5. **Slots vs `props.children`**:
   - Named slots with fallback content
   - Example:

     ```vue
     <!-- TaskList.vue -->
     <slot name="empty">No tasks yet!</slot>
     
     <!-- Parent.vue -->
     <TaskList>
       <template #empty>🎉 All done!</template>
     </TaskList>
     ```

## Screenshot
<img width="1857" height="885" alt="image" src="https://github.com/user-attachments/assets/ae6dee15-8fd5-4979-9535-477d9def8c50" />
<img width="1852" height="888" alt="image" src="https://github.com/user-attachments/assets/5498f4b3-b590-4810-969d-845b2217953f" />

---

*Day 1 progress preserved in git history. Day 3: Vue Router & Multi-Page Blog App coming next!*
