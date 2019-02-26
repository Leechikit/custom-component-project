import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './router'

Vue.use(VueRouter)

// 路由配置
const RouterConfig = {
  routes: routers,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
}

const router = new VueRouter(RouterConfig)

export default router
