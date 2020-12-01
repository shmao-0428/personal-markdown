import Vue from 'vue';
import VueRouter from 'vue-router';
import SellerPage from '@/views/seller-page';
Vue.use(VueRouter);

const routes = [
  {
    path: '/seller',
    component: SellerPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
