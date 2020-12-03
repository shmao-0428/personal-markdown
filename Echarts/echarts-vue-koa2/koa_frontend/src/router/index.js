import Vue from 'vue';
import VueRouter from 'vue-router';
import SellerPage from '@/views/seller-page';
import TrendPage from '@/views/trend-page';
Vue.use(VueRouter);

const routes = [
  {
    path: '/seller',
    component: SellerPage,
  },
  {
    path: '/trend',
    component: TrendPage,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
