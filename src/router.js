import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Users from './components/List.vue'
import Register from './components/Register.vue'
import RegisterList from './components/RegisterList.vue'
import Reserves from './components/Reserve.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Home
    }, {
        path: '/users',
        component: Users
    }, {
        path: '/register',
        component: Register,
        children: [{
            path: 'list',
            component: RegisterList
        }]
    }, {
        path: '/reserves',
        component: Reserves
    }]
})  