import Vue from 'vue'
import Router from 'vue-router'
import StockTask from '@/components/StockTask'
import StockQuery from '@/components/StockQuery'
import Home from '@/components/Home'
import Login from '@/components/Login'
import SignIn from '@/components/SignIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/',
      name: 'home',
      redirect: '/stockTask',
      component: Home,
      meta: {
        requireAuth:true
      },
      children: [
        {
          path: '/stockTask',
          name: 'stockTask',
          component: StockTask,
          meta: {
            requireAuth:true
          }
        },
        {
          path: '/stockQuery',
          name: 'stockQuery',
          component: StockQuery,
          meta: {
            requireAuth:true
          }
        }
      ]
    }
  ]
})
