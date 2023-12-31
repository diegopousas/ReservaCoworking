import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
import RegisterList from "./components/RegisterList.vue";
import CheckIn from './components/CheckIn.vue'
import Schedulling from './components/Schedulling.vue'
import MyReserves from './components/MyReserves.vue'

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "register",
      path: "/register",
      component: Register,
      children: [
        {
          name: "usersList",
          path: "list",
          component: RegisterList,
        },
      ],
    },
    {
      name: "schedulling",
      path: "/schedulling",
      component: Schedulling,
    },
    {
      name: 'checkIn',
      path: '/checkIn',
      component: CheckIn,
    },
    {
      name: 'myReserves',
      path: '/myReserves',
      component: MyReserves
    }
  ],
});

export default router
