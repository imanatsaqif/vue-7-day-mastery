## Day 4: Pinia Integration Plan

### Stores to Create:
1. `useThemeStore` - Light/dark mode + persistence
2. `useProjectsStore` - Centralized project data + methods
3. `useAppStore` - Global UI state (loading, visitor count)

### Refactor Targets:
1. Move projects.js data to store
2. Add theme toggle to MainLayout
3. Add visitor counter to Home