import { createRouter, createWebHistory } from 'vue-router'
import RequestView from '../views/RequestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Request',
      component: RequestView
    }
  ]
})

export default router
