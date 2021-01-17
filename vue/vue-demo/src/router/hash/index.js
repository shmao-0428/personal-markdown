import Vue from 'vue';
// import VueRouter from 'vue-router';
import VueRouter from '../custom';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/components/home'),
    // component: () => import(/* webpackChunkName: "home" */ '@/views/home'),
  },
  {
    path: '/extend',
    name: 'extend',
    component: () => import(/* webpackChunkName: "extend" */ '@/views/extend/index.vue'),
  },
  {
    path: '/render',
    name: 'render',
    component: () => import(/* webpackChunkName: "render" */ '@/views/render/index.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const paths = routes.map((route) => route.path);
  // console.log(paths);
  if (paths.includes(to.path)) {
    next();
  } else {
    next({ path: '/' });
  }
});
export default router;
