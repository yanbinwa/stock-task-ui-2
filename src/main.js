// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api'
import http from './api/http'

Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$http = http

// 在切换页面时，需要判断用户是否有权限
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    api.checkAuth().then(checkRet => {
      if (checkRet === true) {
        next()
      } else {
        next({path: '/login'})
      }
    });
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
