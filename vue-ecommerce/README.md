# Vue.js E-Commerce App — VueShop

## Overview

This project represents the culmination of a **7-day Vue.js mastery program**. It synthesizes all previously learned concepts—Vue fundamentals, component architecture, routing, state management, and API integration—into a fully-featured e-commerce application called **VueShop**. The focus is on building scalable architecture with a clear separation of concerns, modern UI/UX design, and real-world patterns.

---

## Learning Progress

### Day 7: E-Commerce Application

**What was implemented**
- Full product catalog with category filtering, search, and sorting
- Complete shopping cart system with quantity management and order summary
- User authentication (Login & Register) with demo account support
- Dark/Light theme switching with system preference detection
- Toast notification system for user feedback
- Responsive, mobile-first UI with a custom Navy & Gold color palette
- Breadcrumb navigation and Back-to-Top button for UX polish
- Integration with FakeStoreAPI for product and user data
- API layer separated into dedicated modules (`api/auth`, `api/products`, `api/users`)

**Key learnings**
- Structuring complex global state across multiple Pinia stores (cart, products, auth, theme, toast)
- Implementing user authentication flow with API integration and local fallback mechanism
- Building a complete dark/light theme system using CSS custom properties and `localStorage`
- Separating API calls into a dedicated `api/` layer for clean architecture
- Creating reusable, event-driven UI components (`ProductCard`, `ToastNotification`, `BackToTop`)
- Managing responsive navigation with scroll-locking on mobile menu
- Using CSS transitions and micro-animations to create a premium, polished feel

**Architecture**
```
src/
├── api/             # API service layer (auth.js, products.js, users.js)
├── components/      # Reusable UI components
│   ├── BackToTop.vue
│   ├── Breadcrumb.vue
│   ├── Footer.vue
│   ├── Navbar.vue
│   ├── ProductCard.vue
│   └── ToastNotification.vue
├── router/          # Vue Router configuration (index.js)
├── stores/          # Pinia stores
│   ├── auth.js      # Authentication state & login/register logic
│   ├── cart.js      # Cart items, quantities, and totals
│   ├── products.js  # Product list & detail fetching
│   ├── theme.js     # Dark/Light mode toggle & system preference
│   └── toast.js     # Notification queue management
├── views/           # Page-level components
│   ├── Cart.vue     # Shopping bag with order summary & checkout
│   ├── Home.vue     # Product catalog with filters & search
│   ├── Login.vue    # Login & Register forms with validation
│   └── ProductDetail.vue  # Single product detail page
├── App.vue          # Root component (layout shell)
├── main.js          # App entry point
└── style.css        # Global design system (variables, reset, utilities)
```

---

## Technical Stack

| Technology | Purpose |
|---|---|
| **Vue 3** | Core framework (Composition API, `<script setup>`) |
| **Pinia 3** | State management (5 stores) |
| **Vue Router 4** | Client-side routing with scroll behavior |
| **Vanilla CSS** | Custom design system with CSS custom properties, dark/light mode, glassmorphism |
| **Vite 7** | Build tool & dev server |
| **Axios** | HTTP client for API communication |
| **UUID** | Unique ID generation for local user registration |
| **FakeStoreAPI** | External REST API for product & user data |
| **Vercel** | Deployment platform |

---

## Key Features

### Product Catalog
- Fetches and displays products from a live API
- Category filtering via dropdown
- Search by product title
- Sort by price (low-high, high-low)
- Loading spinners and error states with retry

### Shopping Cart
- Add, remove, increment, and decrement item quantities
- Real-time subtotal, shipping cost, and total calculation
- Free shipping progress bar (free at $50+)
- Order summary sidebar
- Checkout flow with authentication guard (redirects to login if not signed in)

### Authentication
- **Login**: Authenticates against FakeStoreAPI with local fallback for custom-registered users
- **Register**: Creates new user via API and stores locally
- Tab-based UI switching between Login and Register
- Form validation with error messages
- Demo account quick-fill for development convenience
- Persistent session via `localStorage` (token + user data)

### Theme System
- Manual dark/light toggle via Navbar button
- Automatic detection of system `prefers-color-scheme`
- Smooth CSS transitions between themes
- Persistent preference in `localStorage`
- Custom color palette: Navy (`#003566`) & Gold (`#ffc300`) tones

### UI/UX Polish
- **Navbar**: Sticky header with animated gradient logo, mobile hamburger menu with scroll-lock
- **Breadcrumb**: Dynamic breadcrumb navigation based on current route
- **Back to Top**: Floating button that appears on scroll
- **Toast Notifications**: Stackable success/error toasts with auto-dismiss (max 3 visible)
- **Footer**: Project info, tech stack links, GitHub CTA, author credits
- **Responsive**: Fully responsive from mobile to desktop, with breakpoints at 640px and 768px
- **Animations**: Fade-in, slide transitions, gradient-flow logo animation, hover effects

---

## Project Structure and Logic

### State Management (Pinia Stores)
The application uses **5 Pinia stores** as the single source of truth:

| Store | Pattern | Responsibility |
|---|---|---|
| `auth.js` | Options API | User login/register, session persistence, local fallback auth |
| `cart.js` | Options API | Cart items, quantities, totals, add/remove/increment/decrement |
| `products.js` | Composition API | Product list, categories, single product detail, fetch caching |
| `theme.js` | Composition API | Dark/light mode toggle, system preference detection |
| `toast.js` | Composition API | Notification queue, auto-dismiss, max-3 limit |

> **Note**: Some stores use the Options API pattern (`state`, `actions`, `getters`) while others use the Composition API pattern (`ref`, functions, `return`). Both are valid Pinia approaches — this project uses both as a learning exercise to understand the differences.

### Data Flow
1. **API Layer** (`src/api/`): Thin wrappers around Axios calls to FakeStoreAPI endpoints (`/products`, `/auth/login`, `/users`).
2. **Stores** (`src/stores/`): Consume the API layer, manage reactive state, and handle business logic (e.g., auth fallback, fetch caching).
3. **Views** (`src/views/`): Page-level components that use stores and render the main content.
4. **Components** (`src/components/`): Reusable, presentational UI pieces used across views.

### Component Design
- **`ProductCard.vue`**: Presentational card that emits `add-to-cart` event. Parent handles the business logic.
- **`Navbar.vue`**: Manages navigation links, cart badge count, auth state display, theme toggle, and mobile menu.
- **`ToastNotification.vue`**: Renders a stack of toast messages from the toast store with CSS transition animations.
- **`BackToTop.vue`**: Listens to scroll events, shows a floating button when scrolled past threshold.
- **`Breadcrumb.vue`**: Reads `$route` to dynamically generate breadcrumb trail.
- **`Footer.vue`**: Static footer with project info, tech stack links, and GitHub repository link.

### Styling Architecture
The global design system is defined in `src/style.css` using **CSS custom properties**:
- **Color tokens**: Defined in `:root` for light mode and `.dark-mode` for dark mode
- **Typography**: Primary font `Raleway` for headings, `Nunito` for body text (loaded from Google Fonts)
- **Component styles**: Scoped per-component using `<style scoped>`, referencing global CSS variables
- **Glassmorphism**: Cards use `backdrop-filter: blur()` in dark mode for a frosted-glass effect
- **No CSS framework**: All styling is hand-written Vanilla CSS for full control and learning purposes

---

## Setup and Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/imanatsaqif/vue-7-day-mastery.git
    cd vue-7-day-mastery/vue-ecommerce
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run the development server**
    ```bash
    npm run dev
    ```

4. **Build for production**
    ```bash
    npm run build
    npm run preview
    ```

---

## Lessons Learned and Architectural Decisions

### Authentication Strategy
- **Dual login mechanism**: The app first tries the FakeStoreAPI login endpoint. If it fails (e.g., for locally registered users), it falls back to matching credentials against the locally stored user list. This allows the app to work with both API-registered and locally-registered users.
- **Session persistence**: Token and user data are stored in `localStorage` so the session survives page reloads, though this is a simplified approach — a real app would use httpOnly cookies and refresh tokens.

### Cart Logic
- **Quantity aggregation**: Adding the same product multiple times increments the quantity counter rather than creating duplicate entries. This keeps the cart clean and enables proper subtotal calculations.
- **Price snapshotting**: Cart items capture the price at the time of addition, which is standard e-commerce practice to prevent checkout surprises from price changes.

### Theme System
- **Three-tier priority**: (1) Explicit user toggle, (2) `localStorage` preference, (3) System `prefers-color-scheme`. This ensures the user's explicit choice always wins.
- **CSS-first approach**: Theme switching is done entirely via CSS custom properties toggled by a `data-theme` attribute and CSS classes, keeping JavaScript minimal.

### Styling Decisions
- **Vanilla CSS over frameworks**: Tailwind CSS was intentionally removed in favor of hand-written CSS. This decision was made to deepen understanding of CSS fundamentals, custom property systems, and responsive design patterns.
- **CSS variable-driven theming**: All colors, spacing, and shadows are defined as CSS variables, making the entire design system swappable by simply changing the variable values.

### Architecture Patterns
- **API layer separation**: API calls are isolated in `src/api/` files. Stores never call `axios` directly — they always go through the API layer. This makes it easy to swap the backend or add interceptors later.
- **Mixed store patterns**: Deliberately using both Options API and Composition API store definitions to practice and compare both approaches within the same project.
- **Component communication**: Using `defineEmits` keeps components decoupled and reusable, with the parent component or store handling the business logic.

---

## Routes

| Path | View | Description |
|---|---|---|
| `/` | `Home.vue` | Product catalog with filters, search, and sorting |
| `/product/:id` | `ProductDetail.vue` | Detailed view of a single product |
| `/cart` | `Cart.vue` | Shopping bag with order summary |
| `/login` | `Login.vue` | Authentication (Login & Register tabs) |

---

## Live Demo

[View the Live E-Commerce Application](https://vue-commerce-imana.vercel.app/)

---

## Repository

This project is part of the **Vue 7-Day Mastery** series. View the full learning journey and code:
[imanatsaqif/vue-7-day-mastery on GitHub](https://github.com/imanatsaqif/vue-7-day-mastery)