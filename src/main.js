import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './http'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.prototype.BASE_URL = "http://127.0.0.1:3000"; //  生产

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
