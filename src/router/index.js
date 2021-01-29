import Vue from 'vue'
import VueRouter from 'vue-router'
import DrawImage from '../views/DrawImage.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'DrawImage',
    component: DrawImage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
