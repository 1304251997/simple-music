import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import './http'

import Vant from 'vant';  // 引用 vant 组件
import 'vant/lib/index.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'   // 引用vue-awesome-swiper
import 'swiper/swiper-bundle.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import './assets/css/font.css'  // 引入特殊字体
// import 'http://at.alicdn.com/t/font_1921668_z0wsr6mz88d.css'  // 引入iconfont

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vant);
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// Vue.prototype.BASE_URL = "http://127.0.0.1:3000"; //  生产

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
