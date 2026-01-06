```
# Vue.js E-Commerce App with Pinia State Management

## Overview

This project represents the culmination of a 7-day Vue.js mastery program. It synthesizes all previously learned concepts—Vue fundamentals, component architecture, routing, state management, and API integration—into a fully-featured e-commerce application. The focus is on building scalable architecture with a clear separation of concerns.

---

## Learning Progress

### Day 7: E-Commerce Application

**What was implemented**
- Full product catalog with browsing and detailed views
- Complete shopping cart system with persistence
- Multi-step checkout simulation
- Advanced Pinia store patterns for global state
- Integration with FakeStoreAPI for product data
- Responsive UI with a custom earthy color palette

**Key learnings**
- Structuring complex global state (cart, products, UI)
- Implementing persistent state with localStorage
- Building reusable, event-driven components (ProductCard)
- Managing API services, composables, and stores in a layered architecture
- Creating a cohesive user flow from product discovery to checkout

**Architecture**
```
src/
├── views/           # Page-level components (ProductList, Cart, Checkout)
├── layouts/         # Reusable layout wrapper (MainLayout)
├── components/      # Reusable UI components (ProductCard)
├── stores/          # Pinia stores (cartStore, productStore)
├── services/        # API service layer (productService)
├── composables/     # Reusable logic (useProduct, useFetch)
└── router/          # Vue Router configuration
```

---

## Technical Stack

- **Vue 3** (Composition API, `<script setup>`)
- **State Management:** Pinia
- **Routing:** Vue Router 4
- **Styling:** Tailwind CSS v4 with custom theme
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **API:** FakeStoreAPI
- **Deployment:** Vercel

---

## Key Features

- **Product Catalog**: Fetches and displays products from a live API.
- **Shopping Cart**: Add, remove, and update item quantities with real-time calculations. State is persisted to localStorage.
- **Product Details**: Dedicated view for detailed product information.
- **Checkout Flow**: Simulated multi-step checkout process.
- **Responsive Design**: Fully responsive layout using Tailwind CSS with a custom earthy color palette.

---

## Project Structure and Logic

### State Management
The application uses Pinia stores as the single source of truth:
- `cartStore`: Manages cart items, quantities, totals, and persistence.
- `productStore`: Manages the product list and single product state, often integrating a `useFetch` composable for data fetching.

### Data Flow
1.  **API Layer**: The `productService` handles all communication with FakeStoreAPI.
2.  **Composables**: Logic like `useFetch` is used to create reusable data-fetching patterns.
3.  **Stores**: Pinia stores consume composables or services to update reactive application state.
4.  **Components**: UI components (views and components) reactively render store state and dispatch actions.

### Component Design
- `ProductCard.vue`: A presentational component that emits events for user actions (`add-to-cart`, `view-details`).
- `MainLayout.vue`: Provides a consistent layout with a navigation bar showing the cart item count.

---

## Setup and Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/imanatsaqif/vue-7-day-mastery.git
    cd vue-7-day-mastery/vue-ecommerce
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    npm run preview
    ```

---

## Lessons Learned and Architectural Decisions

*   **Cart Persistence**: Using `localStorage` provides a better user experience than a volatile session, though it differs from the FakeStoreAPI's user-based cart system.
*   **Price Consistency**: Cart items snapshot the price at the time of addition, which is standard e-commerce practice to prevent checkout surprises.
*   **Layered Architecture**: Separating API calls (services), data-fetching logic (composables), and global state (stores) creates maintainable and testable code.
*   **Component Communication**: Using emits (`defineEmits`) keeps components decoupled and reusable, with the parent component or store handling the business logic.

---

## Live Demo

[View the Live E-Commerce Application](https://vue-commerce-imana.vercel.app/)

---

## Repository

This project is part of the **Vue 7-Day Mastery** series. View the full learning journey and code:
[imanatsaqif/vue-7-day-mastery on GitHub](https://github.com/imanatsaqif/vue-7-day-mastery)
```