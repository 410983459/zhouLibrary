import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 适配插件
import 'lib-flexible'
// 初始化全局样式
import './assets/css/rest.css'
// 路由守卫
import './utils/permission'
// 按需引入vant
import './assets/js/impvant'
import 'vant/lib/index.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
