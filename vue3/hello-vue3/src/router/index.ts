import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/computed",
    name: "Computed",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "computed" */ "../views/Computed.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/v-model",
    name: "v-model",
    component: () => import(/* webpackChunkName: "model" */ "../views/v-model/index.vue"),
  },
  {
    path: "/reactive",
    name: "Reactive",
    component: () => import(/* webpackChunkName: "reactive" */ "../views/reactive/reactive.vue"),
  },
  {
    path: "/ref",
    name: "Ref",
    component: () => import(/* webpackChunkName: "reactive" */ "../views/ref/ref.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default { router, routes };
