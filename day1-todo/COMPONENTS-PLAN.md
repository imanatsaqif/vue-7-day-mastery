## Day 2: Component Architecture Plan

### Refactoring Strategy
1. App.vue (parent) - state management only
2. components/TaskInput.vue - v-model + emits
3. components/TaskList.vue - props + slots
4. components/TaskItem.vue - props + emits
5. components/TaskFilters.vue - emits filter events

### Concepts to Implement
- Props validation (like PropTypes)
- Emits declaration (like callback props)
- Scoped slots (advanced pattern)

App.vue (state)
├── TaskInput (@add-task)
├── TaskFilters (@update-filter)
└── TaskList (:todos)
    └── TaskItem (:todo, @delete-task, @toggle-task)

