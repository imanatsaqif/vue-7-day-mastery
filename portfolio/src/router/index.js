import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Contact from '../views/Contact.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: Home },
      { path: 'about', name: 'about', component: About },
      { path: 'projects', name: 'projects', component: Projects },
      { path: 'projects/:slug', name: 'project-detail', component: ProjectDetail },
      { path: 'contact', name: 'contact', component: Contact }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router