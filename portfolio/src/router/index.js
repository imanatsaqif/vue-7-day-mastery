// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Projects from '@/views/Projects.vue'
import ProjectDetail from '@/views/ProjectDetail.vue'
import Contact from '@/views/Contact.vue'
import { useProjectsStore } from '@/stores/projects'

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

          const { useProjectsStore } = await import('@/stores/projects')
          const store = useProjectsStore()
          const project = store.getProjectBySlug(slug)

          if (!project) {
            return { name: 'projects' }
          }
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

router.afterEach((to) => {
  let title = to.meta?.title || ''

  if (to.name === 'project-detail') {
    const slug = to.params.slug
    import('@/stores/projects').then(({ useProjectsStore }) => {
      const store = useProjectsStore()
      const project = store.getProjectBySlug(slug)
      if (project) {
        title = project.title
        document.title = `${title} | Imana's Portfolio`
      }
    })
  }

  if (to.name !== 'project-detail') {
    document.title = title ? `${title} | Imana's Portfolio` : "Imana's Portfolio"
  }
})

export default router