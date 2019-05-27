import Vue from 'vue'
import Router from 'vue-router'
import utils from '../common/cookieUtils'
import {cookies} from '@/common/cookieUtils'
// import index from '@/components/index'

Vue.use(Router)

const router = new Router({
  // mode: 'history', // 切换路径模式，变成history模式,不然路径为/#/home
  scrollBehavior: () => ({ // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    y: 0
  }),
  routes: [
    {
      path: '/test',
      name: 'test',
      component: () => import('@/components/test'),
    },
    {
      path: '/',
      name: 'index',
      // redirect: '/portal',
      title: 'Home',
      component: () => import('@/components/visual/visual'),
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (cookies.getCookie('Authorization') && to.name === 'login'){
    next({name:from.name})
  } else {
    next()
  }
})

router.afterEach(transition => {
  router.options.routes.forEach(ele => {
    if (ele.name === transition.name) {
      utils.setTitle(ele.title)
    }
  })
})

export default router
