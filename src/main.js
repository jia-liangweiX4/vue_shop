import Vue from 'vue'
import App from './App.vue'
// 把路由下面的index.js改名为router.js后要在这里改导入的路径
import router from './router/router.js'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import './assets/css/common.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
