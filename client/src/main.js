import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import MintUI from 'mint-ui';
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';
import 'mint-ui/lib/style.css'
import '@/assets/main.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(MintUI)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
