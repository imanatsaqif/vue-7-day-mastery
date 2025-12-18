# Vue.js Mastery - Concepts & References

*Documenting my journey from React to Vue.js with practical examples*

## Day 1 & 2: Core Concepts & Component Architecture

---

### 1. Reactivity System (Day 1)

#### `ref()` vs `reactive()`
```javascript
// ref() for primitives (like useState)
const count = ref(0)
console.log(count.value) // .value in script
// In template: {{ count }} (auto-unwrapped)

// reactive() for objects (like useState with object)
const state = reactive({ count: 0 })
console.log(state.count) // no .value needed
// In template: {{ state.count }}
```

**Key Difference from React:**
- React: `const [count, setCount] = useState(0)`
- Vue: `const count = ref(0)` then `count.value = 1`
- No setter function needed - direct assignment triggers re-render

---

### 2. Directives (Day 1)

| Directive | React Equivalent | Example |
|-----------|------------------|---------|
| `v-if` | Conditional rendering | `<div v-if="show">` |
| `v-for` | `array.map()` | `<li v-for="item in items" :key="item.id">` |
| `v-bind` | Props/attributes | `<img :src="url">` (shorthand) |
| `v-model` | Controlled component | `<input v-model="name">` (two-way binding) |
| `@click` | `onClick` | `<button @click="handleClick">` |
| `@input` | `onChange` | `<input @input="handleInput">` |

---

### 3. Single File Components (SFC) (Day 2)

**Structure:**
```vue
<template>
  <!-- HTML-like template -->
</template>

<script setup>
// JavaScript logic (Composition API)
import { ref, computed } from 'vue'
</script>

<style scoped>
/* Scoped CSS - only affects this component */
</style>
```

**vs React:**
- Vue: `.vue` file with template, script, style
- React: `.jsx` file with JSX + CSS-in-JS or separate CSS

---

### 4. Props System (Day 2)

#### Basic Props Declaration
```vue
<script setup>
// Automatic runtime validation
const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>
```

#### Advanced Props Validation
```vue
<script setup>
// With validation rules
const props = defineProps({
  todo: {
    type: Object,
    required: true,
    validator: (value) => {
      const isValid = value.id && typeof value.text === 'string'
      if (!isValid) console.warn('Invalid todo:', value)
      return isValid
    }
  },
  // Multiple types
  count: [Number, String],
  
  // Array with type
  items: {
    type: Array,
    default: () => []
  }
})
</script>
```

**React Equivalent:**
```javascript
// React PropTypes
TaskItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    done: PropTypes.bool.isRequired
  }).isRequired
}

// Or TypeScript interface
interface Props { todo: Todo }
```

**Key Differences:**
- Vue props are **immutable** (child cannot modify)
- Use `.value` on refs in props inside `<script setup>`
- In template: `{{ todo.text }}` not `{{ props.todo.text }}`

---

### 5. Events/Emits (Day 2)

#### Child → Parent Communication
```vue
<!-- Child Component: TaskInput.vue -->
<script setup>
const emit = defineEmits(['add-task', 'clear-all'])

const handleSubmit = () => {
  emit('add-task', inputValue.value)
}

const handleClear = () => {
  emit('clear-all') // No data payload
}
</script>

<template>
  <button @click="handleSubmit">Add</button>
  <button @click="handleClear">Clear All</button>
</template>
```

#### Parent Component Usage
```vue
<!-- Parent: App.vue -->
<script setup>
const handleAddTask = (text) => {
  console.log('Received from child:', text)
  todos.value.push({ id: Date.now(), text })
}

const handleClear = () => {
  todos.value = []
}
</script>

<template>
  <TaskInput 
    @add-task="handleAddTask"
    @clear-all="handleClear"
  />
</template>
```

**vs React:**
- Vue: `emit('event-name', data)`
- React: `props.onEventName(data)`
- **Naming convention**: Kebab-case in template (`@add-task`), camelCase in script

---

### 6. Slots System (Day 2)

#### Basic Slot (Default)
```vue
<!-- Child: TaskList.vue -->
<template>
  <div v-if="todos.length === 0">
    <slot>
      <!-- Default content if parent provides nothing -->
      No tasks yet
    </slot>
  </div>
</template>
```

#### Named Slots
```vue
<!-- Child: TaskList.vue -->
<template>
  <div class="list">
    <slot name="header"></slot>
    
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <slot name="item" :todo="todo"></slot>
      </li>
    </ul>
    
    <slot name="footer"></slot>
  </div>
</template>
```

#### Parent Usage (Named + Scoped)
```vue
<!-- Parent: App.vue -->
<TaskList :todos="todos">
  <template #header>
    <h2>My Tasks</h2>
  </template>
  
  <!-- Scoped slot: receives todo from child -->
  <template #item="{ todo }">
    <TaskItem :todo="todo" />
  </template>
  
  <template #footer>
    <p>Total: {{ todos.length }} tasks</p>
  </template>
</TaskList>
```

**React Equivalent:**
```javascript
// React children pattern
<TaskList>
  <h2>My Tasks</h2> {/* No named slots */}
  {todos.map(todo => <TaskItem key={todo.id} todo={todo} />)}
  <p>Total: {todos.length}</p>
</TaskList>
```

**Key Difference:** Vue slots are more powerful with named + scoped slots combined

---

### 7. Component v-model (Day 2)

#### How v-model works on components
```vue
<!-- Child: TaskFilters.vue -->
<script setup>
const props = defineProps({
  modelValue: String // Required name for v-model
})

const emit = defineEmits(['update:modelValue'])

const setFilter = (value) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <button @click="setFilter('all')">All</button>
</template>
```

#### Parent Usage (Single v-model)
```vue
<TaskFilters v-model="currentFilter" />
<!-- Equivalent to: -->
<TaskFilters 
  :modelValue="currentFilter" 
  @update:modelValue="currentFilter = $event"
/>
```

#### Multiple v-models (Vue 3.2+)
```vue
<!-- Child -->
<script setup>
const props = defineProps({
  title: String,
  content: String
})
const emit = defineEmits(['update:title', 'update:content'])
</script>

<!-- Parent -->
<Editor 
  v-model:title="postTitle"
  v-model:content="postContent"
/>
```

**React Equivalent:**
```javascript
// React controlled component pattern
<TaskFilters
  value={currentFilter}
  onChange={setCurrentFilter}
/>
```

**Key Difference:** Vue's `v-model` is syntactic sugar for prop + emit pair

---

### 8. Computed Properties (Day 2)

**Caching & Derived State:**
```javascript
import { ref, computed } from 'vue'

const todos = ref([])
const filter = ref('all')

// Computed automatically caches, re-runs only when dependencies change
const filteredTodos = computed(() => {
  console.log('Recomputing...') // Only runs when todos or filter changes
  switch (filter.value) {
    case 'pending':
      return todos.value.filter(t => !t.done)
    case 'completed':
      return todos.value.filter(t => t.done)
    default:
      return todos.value
  }
})

// Computed is READ-ONLY
filteredTodos.value.push(...) // ❌ Error!
```

**vs React:**
```javascript
// React useMemo
const filteredTodos = useMemo(() => {
  return todos.filter(t => {
    if (filter === 'pending') return !t.done
    if (filter === 'completed') return t.done
    return true
  })
}, [todos, filter]) // Manual dependency array
```

**Key Differences:**
- Vue: Automatic dependency tracking, no dependency array needed
- Vue: Computed is readonly by default (use `get`/`set` for writable)

---

### 9. Component Communication Patterns (Day 2)

#### Pattern 1: Props Down, Events Up (Parent ↔ Child)
```
Parent State
├── Props → Child
└── ← Events (emits) Child
```

#### Pattern 2: Multiple v-model (Two-way binding)
```vue
<Child v-model:name="name" v-model:age="age" />
```

#### Pattern 3: Provide/Inject (Coming Day 4 with Pinia)
```javascript
// For deeply nested components (avoid prop drilling)
// Similar to React Context
```

**Best Practices:**
1. **Never mutate props** - treat as immutable
2. **Use emits for child→parent** - don't pass setters as props
3. **kebab-case in templates** (`@add-task`), **camelCase in JS** (`addTask`)
4. **Props validation for all** - catch bugs early
5. **Slots for flexible content** - more powerful than React children

---

### 10. React vs Vue Mind Map

| Concept | React | Vue | Key Difference |
|---------|-------|-----|----------------|
| **State** | `useState()` | `ref()` / `reactive()` | No setter function needed |
| **Props** | `props.x` | `defineProps()` | Readonly, auto-unwrapped in template |
| **Events** | `onX={handler}` | `@x="handler"` / `emit()` | Explicit emit declaration |
| **Conditionals** | `&&` / ternary | `v-if` / `v-show` | `v-show` keeps DOM, `v-if` removes |
| **Lists** | `array.map()` | `v-for` | No key needed in script |
| **Forms** | Controlled component | `v-model` | Syntactic sugar for 2-way binding |
| **Side Effects** | `useEffect()` | `watch()` / lifecycle | Automatic dependency tracking |
| **Computed** | `useMemo()` | `computed()` | No dependency array |
| **Components** | `.jsx` + CSS-in-JS | `.vue` SFC | Template, script, style in one file |
| **Re-render** | Manual optimization | Automatic tracking | Fine-grained reactivity |

---

### 11. Common Pitfalls & Solutions

**Pitfall 1: Forgetting `.value` in script**
```javascript
// ❌ Wrong
const count = ref(0)
count = 5 // Assigns to ref object

// ✅ Correct
count.value = 5
```

**Pitfall 2: Mutating props**
```javascript
// ❌ Wrong
const props = defineProps(['todo'])
props.todo.done = true // Mutates parent state!

// ✅ Correct
emit('update:todo', { ...props.todo, done: true })
```

**Pitfall 3: Using `v-for` without key**
```vue
<!-- ❌ Wrong -->
<li v-for="todo in todos">{{ todo.text }}</li>

<!-- ✅ Correct -->
<li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
```

**Pitfall 4: Not declaring emits**
```javascript
// ❌ Wrong - works but triggers warning
emit('random-event')

// ✅ Correct
const emit = defineEmits(['random-event'])
```

---

### 12. Essential API References

- **Props**: https://vuejs.org/guide/components/props.html
- **Emits**: https://vuejs.org/guide/components/events.html
- **Slots**: https://vuejs.org/guide/components/slots.html
- **v-model**: https://vuejs.org/guide/components/v-model.html
- **Computed**: https://vuejs.org/guide/essentials/computed.html
- **SFC**: https://vuejs.org/guide/scaling-up/sfc.html

---

*Last Updated: Day 2 - Component Architecture Mastery*