import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Search from '@/views/Search.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search/:query', 
    name: 'Search',
    component: Search,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
