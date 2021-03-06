import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '/',
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
  {
    path: '/custom-store',
    name: 'custom-store',
    component: () => import(/* webpackChunkName: "custom-store" */ '@/views/custom-store/index.vue'),
  },
  {
    path: '/web-worker',
    name: 'web-worker',
    component: () => import(/* webpackChunkName: "web-worker" */ '@/views/web-worker/index.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes,
});

// router.beforeEach((to, from, next) => {
//   const paths = routes.map((route) => route.path);
//   // console.log(paths);
//   if (paths.includes(to.path)) {
//     next();
//   } else {
//     next({ path: '/' });
//   }
// });
export default router;
