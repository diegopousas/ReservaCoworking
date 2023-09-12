import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Users from './components/List.vue'
import Register from './components/Register.vue'
import Reserves from './components/Reserves.vue'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        component: Home
    }, {
        path: '/users',
        component: Users
    }, {
        path: '/register',
        component: Register
    }, {
        path: '/reserves',
        component: Reserves
    }]
})  