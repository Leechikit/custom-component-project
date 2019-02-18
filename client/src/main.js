import Vue from 'vue'
import App from './App.vue'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import '@/assets/main.scss'

Vue.config.productionTip = false
Vue.use(Mint)
new Vue({
  render: h => h(App),
}).$mount('#app')
