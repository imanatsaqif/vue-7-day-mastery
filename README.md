# Vue 7-Day Mastery

## Day 1: Todo App - Vue.js Fundamentals

### Key Learnings

#### Differences from React
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