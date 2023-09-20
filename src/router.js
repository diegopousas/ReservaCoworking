import Vue from "vue";
import Router from "vue-router";
import Home from "./components/Home.vue";
import Users from "./components/List.vue";
import Register from "./components/Register.vue";
import RegisterList from "./components/RegisterList.vue";
import Reserves from "./components/Reserve.vue";

import TesteQuery from "./components/Teste.vue";
import ResTeste from "./components/RespostaTask.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      name: "Teste",
      path: "/testeQuery",
      component: TesteQuery,
      // apagar !!!!!!!!!!!!!
    },
    {
      name: "respTeste",
      path: "/resTeste",
      component: ResTeste,
      // apagar !!!!!!!!!!!!!
    },
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "users",
      path: "/users",
      component: Users
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
      name: "reserves",
      path: "/reserves",
      component: Reserves,
    },
  ],
});

export default router
