## Vue.js Concepts

### DAY 1

#### Interpolation with `{{ }}`
In Vue.js, `{{ }}` is used for data binding within the template. It allows you to display dynamic content directly in the HTML. For example:

```html
<p>{{ message }}</p>
```
Here, the `message` property from the Vue instance will be rendered inside the `<p>` tag.

---

#### `v-bind` (Shorthand `:`) vs Props in React
- **Vue.js (`v-bind`)**:
  - `v-bind` is used to bind attributes or props dynamically to an element or component.
  - Shorthand: Instead of `v-bind:`, you can use `:`.
  - Example:

    ```html
    <img :src="imageUrl" alt="Dynamic Image">
    ```

- **React (Props)**:
  - Props in React are passed as attributes to components.
  - Example:

    ```jsx
    <img src={imageUrl} alt="Dynamic Image" />
    ```

- **Key Difference**:
  - Vue uses `v-bind` for dynamic binding, while React directly uses curly braces `{}` within JSX.

---

#### `v-model` vs Controlled Components in React
- **Vue.js (`v-model`)**:
  - `v-model` is a directive for two-way data binding.
  - It simplifies the process of syncing input fields with data.
  - Example:

    ```html
    <input v-model="username" placeholder="Enter your name">
    ```

- **React (Controlled Components)**:
  - Controlled components rely on `value` and `onChange` to manage state.
  - Example:

    ```jsx
    const [username, setUsername] = useState("");

    return (
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
      />
    );
    ```

- **Key Difference**:
  - Vue's `v-model` provides a simpler syntax for two-way binding, while React requires explicit state management with `value` and `onChange`.

### Day 2: Component Architecture Plan

#### Refactoring Strategy
1. App.vue (parent) - state management only
2. components/TaskInput.vue - v-model + emits
3. components/TaskList.vue - props + slots
4. components/TaskItem.vue - props + emits
5. components/TaskFilters.vue - emits filter events

#### Concepts to Implement
- Props validation (like PropTypes)
- Emits declaration (like callback props)
- Scoped slots (advanced pattern)