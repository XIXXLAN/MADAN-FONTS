import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";

import VueChartkick from "vue-chartkick";
import "chartkick/chart.js";

import router from "@/router";

createApp(App).use(router).use(VueChartkick).mount("#app");
