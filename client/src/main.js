import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import router from './router/index'
import 'mint-ui/lib/style.css'
import '@/assets/main.scss'

Vue.config.productionTip = false
Vue.use(Mint)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
