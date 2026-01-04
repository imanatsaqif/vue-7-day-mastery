# Vue 7-Day Mastery

This repository documents a structured 7-day learning program to master Vue 3 through progressive, project-based learning. Each day builds on the previous one, emphasizing architectural understanding, correct mental models, and practical application.

## Repository Structure

```
vue-7-day-mastery/
├── todo-app/          # Day 1–2: Vue fundamentals and component architecture
├── portfolio/         # Day 3–5: Routing, Pinia, and real API integration
└── weather-dashboard/ # Day 6: Advanced composables and external API services
```

## Learning Progress

### Day 1: Todo App, Vue Fundamentals
**Project:** `/todo-app`  
**Focus:**
- Vue 3 fundamentals using the Composition API
- Reactive state with `ref()` and `reactive()`
- Template syntax and core directives (`v-if`, `v-for`, `v-model`)
- Basic event handling and conditional rendering
- Hour-by-hour project building with GitHub-focused workflow

### Day 2: Todo App, Component Architecture
**Project:** `/todo-app`  
**Focus:**
- Component decomposition and Single File Components (SFCs)
- Props and emits for parent-child communication
- Slot usage for flexible, reusable component design
- Refactoring a monolithic app into a scalable component architecture

### Day 3: Portfolio Website, Routing Fundamentals
**Project:** `/portfolio`  
**Focus:**
- Vue Router setup and navigation
- Dynamic routes and route parameters
- Layout and view separation for clean structure
- Route guards for navigation control and data validation
- Managing static data locally

### Day 4: Portfolio Website, State Management with Pinia
**Project:** `/portfolio`  
**Focus:**
- Centralized state management using Pinia
- Creating stores for theme, projects, and application state
- Implementing design tokens and a persistent dark/light theme
- Refactoring components to consume reactive store state
- Integrating stores with router logic

### Day 5: Portfolio Website, API Integration & Composables
**Project:** `/portfolio`  
**Focus:**
- Professional API integration using Axios and service layers
- Building custom composables (`useGitHub`, `useProjects`) for reusable logic
- Implementing a graceful fallback strategy (API → Cache → Static data)
- Environment variable management for API keys
- Advanced error handling and loading state UX

### Day 6: Weather Dashboard, Advanced Patterns
**Project:** `/weather-dashboard`  
**Focus:**
- Integrating with a complex external API (WeatherAPI.com)
- Advanced composable patterns with debounced search and caching
- Multi-layer state with favorites persisted to localStorage

## Projects & Live Demos

| Project | Focus | Live Demo |
| :--- | :--- | :--- |
| **Todo App** | Vue fundamentals, component architecture | [Live Demo](https://todo-vueproject.vercel.app/) |
| **Portfolio** | Routing, Pinia, API integration, composables | [Live Demo](https://imana-portfolio.vercel.app/) |
| **Weather Dashboard** | Advanced composables, external APIs, geolocation | [Live Demo](https://weather-dashboard-imana.vercel.app/) |

## Technical Stack

- **Vue 3** (Composition API, `<script setup>`)
- **State Management:** Pinia
- **Routing:** Vue Router
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **APIs Integrated:** GitHub REST API, WeatherAPI.com
- **Deployment:** Vercel

## Core Learning Outcomes

Through this progression, the journey covers:
1. **Reactive Foundations:** From `ref()` to full Pinia stores.
2. **Component Design:** From simple components to complex, slot-based architectures.
3. **Application State:** From local component state to global, cached, and persistent state.
4. **External Data:** From static JSON to dynamic API integration with robust error handling.
5. **Architecture:** Learning to structure services, composables, and stores for maintainable and scalable applications.

## What's Next?

The final project (**Day 7: E-Commerce App**) will synthesize all learned concepts:
- Complex global state (cart, user, products)
- Advanced component communication patterns
- Simulated checkout and order flow
- Full integration of routing, state management, and composables.

---

## About
A 7-day intensive journey to master Vue.js through incremental, project-based learning. The focus is on building a correct mental model and professional application architecture.

**Languages:**
- Vue 59.4%
- JavaScript 30.4%
- CSS 9.1%
- HTML 1.1%