import Vue from 'vue'
import Router from 'vue-router'
import StockTask from '@/components/StockTask'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'StockTask',
      component: StockTask
    }
  ]
})
