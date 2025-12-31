# Vue Portfolio with Pinia State Management

## Overview

This project documents the learning progression from a basic Vue 3 single-page application to a more structured, scalable application using Pinia for centralized state management. The primary focus is architectural understanding and learning outcomes rather than visual complexity.

---

## Learning Progress

### Day 3: Vue Fundamentals and Routing

**What was implemented**
- Vue 3 Composition API using `<script setup>`
- Vue Router with dynamic routes and route guards
- Layout and view separation
- Static project data managed locally
- Tailwind CSS for responsive layout
- Project list and dynamic project detail pages

**Key learnings**
- Understanding SPA navigation with Vue Router
- Using route params safely
- Separating layout components from page views
- Validating routes using navigation guards
- Managing static data in a small Vue application

**Structure (Day 3)**
```

src/
├── views/
├── layouts/
├── router/
├── data/
└── components/

```

---

### Day 4: Centralized State Management with Pinia

**Architecture shift**
- Moved from component-level and local data to centralized stores
- Introduced Pinia as the single source of truth
- Refactored components to consume store state instead of importing data directly

**Stores introduced**
- Theme store: light/dark mode with persistence
- Projects store: centralized project data and lookup logic
- App store: global UI state and basic statistics

**Key learnings**
- When centralized state is necessary
- Separating business logic from UI components
- Using computed properties for derived state
- Managing side effects with watchers
- Integrating stores with router guards

**Before vs After**
- Day 3: components handled data and logic directly
- Day 4: components consume state, stores handle logic

**Structure (Day 4)**
```

src/
├── stores/
│   ├── theme.js
│   ├── projects.js
│   └── app.js
├── views/
├── layouts/
├── router/
├── data/
└── components/

````

---

## Technical Stack

- Vue 3 (Composition API)
- Pinia
- Vue Router 4
- Tailwind CSS v4
- Vite
- JavaScript (ES6+)

---

## Key Features (Learning-Oriented)

- Centralized project data access via Pinia
- Route validation using store-based logic
- Persistent theme preference with localStorage
- Reactive UI updates driven by computed state
- Clear separation between UI, state, and routing

---

## Setup

```bash
npm install
npm run dev
````

Optional build steps:

```bash
npm run build
npm run preview
```

---

## Lessons Learned

* Centralized state reduces duplication and improves scalability
* Stores are better suited for business logic than components
* Computed properties simplify derived data management
* Router guards should rely on synchronous or awaited logic
* Early architectural decisions impact future flexibility

---

## Day 5: API Integration ✅

### Features Added
- **GitHub API Integration**: Real-time project data from your GitHub repositories
- **Custom Composables**: `useGitHub`, `useProjects` for reusable API logic
- **Professional Error Handling**: Graceful fallback to static data
- **Loading States**: Skeleton loaders for smooth UX
- **Data Transformation**: GitHub repos → Portfolio projects with custom mappings

### Tech Stack Added
- Axios for HTTP requests
- Environment variable management
- GitHub REST API v3
- LocalStorage caching strategy

### Key Files

---

src/
├── services/
│ ├── api.js # Axios instance with interceptors
│ └── githubService.js # GitHub API service
├── composables/
│ ├── useGitHub.js # GitHub API composable
│ └── useProjects.js # Projects data composable
└── utils/
└── repoTransformer.js # Data transformation logic

---


### Environment Variables
```env
VITE_GITHUB_TOKEN=your_token_here
VITE_GITHUB_USERNAME=imanatsaqif
VITE_API_TIMEOUT=10000

---

Live Demo
[View Day 5 Deployment](https://portfolio-api.vercel.app/)

---