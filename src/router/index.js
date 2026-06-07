import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('../views/Products.vue')
  },
  {
    path: '/solutions',
    name: 'Solutions',
    component: () => import('../views/Solutions.vue')
  },
  {
    path: '/cases',
    name: 'Cases',
    component: () => import('../views/Cases.vue')
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('../views/Service.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/online-service',
    name: 'OnlineService',
    component: () => import('../views/OnlineService.vue')
  },
  {
    path: '/support',
    name: 'Support',
    component: () => import('../views/Support.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
