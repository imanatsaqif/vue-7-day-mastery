// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Projects from '@/views/Projects.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import Contact from '@/views/Contact.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
        meta: { title: 'Home' }
      },
      {
        path: 'about',
        name: 'about',
        component: About,
        meta: { title: 'About' }
      },
      {
        path: 'projects',
        name: 'projects',
        component: Projects,
        meta: { title: 'Projects' }
      },
      {
        path: 'projects/:slug',
        name: 'project-detail',
        component: ProjectDetail,
        meta: { title: 'Project Details' },
        beforeEnter: async (to) => {
          const slug = to.params.slug
          if (typeof slug !== 'string') {
            return { name: 'projects' }
          }

          // Use store inside component instead of router guard
          // Component will handle the validation
          return true
        }
      },
      {
        path: 'contact',
        name: 'contact',
        component: Contact,
        meta: { title: 'Contact' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Update page title dynamically
router.afterEach((to) => {
  let title = to.meta?.title || 'Imana\'s Portfolio'
  
  if (to.name === 'project-detail') {
    const slug = to.params.slug
    // Title will be updated by ProjectDetail component
    title = `Project | Imana's Portfolio`
  }
  
  document.title = title
})

export default router