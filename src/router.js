
import { createWebHistory, createRouter } from "vue-router";

import Home from "@/views/Home";
import About from "@/views/About";
import Error from "@/views/Error";
import CoinDetail from "@/views/CoinDetail";

const history = createWebHistory();

export default createRouter({
  history,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "about",
      component: About,
    },
    {
      path: "/coin/:id",
      name: "coin-detail",
      component: CoinDetail,
    },
    {
      path: "/:catchAll(.*)",
      name: "error",
      component: Error,
    },
  ],
});