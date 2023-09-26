import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './plugins/axios'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false
Vue.use(BootstrapVue);

Vue.filter('money', value => {
  return `R$ ${parseFloat(value).toFixed(2)}`.replace('.',',')
})

Vue.filter('cpf', value => {
  return `${value[0]}${value[1]}${value[2]}.***.***-**`
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
