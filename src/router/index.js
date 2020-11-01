import Vue from 'vue'
import Router from 'vue-router'
import StockTask from '@/components/StockTask'
import StockQuery from '@/components/StockQuery'
import StockTest from '@/components/StockTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StockTask',
      component: StockTask
    },
    {
      path: '/stockTask',
      name: 'StockTask',
      component: StockTask
    },
    {
      path: '/stockQuery',
      name: 'StockQuery',
      component: StockQuery
    },
    {
      path: '/stockTest',
      name: 'StockTest',
      component: StockTest
    }
  ]
})
