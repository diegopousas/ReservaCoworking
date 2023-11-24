import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './plugins/axios'
import router from './router'
import store from './store/store'
import 'animate.css';

Vue.config.productionTip = false
Vue.use(BootstrapVue);

Vue.filter('cpf', value => {
  return `${value[0]}${value[1]}${value[2]}.***.***-**`
})

Vue.filter('date', value => {
  const dateSplit = value.split('-')
  const dateReverse = dateSplit.reverse()
  const dateJoin = dateReverse.join('/')
  return `${dateJoin}`
})

Vue.filter('completeDate', value => {
  const d = new Date(value).getDay()
  if(d === 1) {
    return 'Terça Feira'
  } else if(d === 2) {
    return 'Quarta Feira'
  } else if(d === 3) {
    return 'Quinta Feira'
  } else if(d === 4) {
    return 'Quinta Feira'
  } else if(d === 5) {
    return 'Sexta Feira'
  } else if(d === 6) {
    return 'Sábado'
  } else if(d === 7) {
    return 'Domingo'
  } else {
    return 'Segunda Feira'
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
