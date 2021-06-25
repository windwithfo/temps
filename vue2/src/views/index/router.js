import Vue       from 'vue';
import VueRouter from 'vue-router';

// 首页
const Index = () => import('./pages/index.vue');

/** 插件注册 */
Vue.use(VueRouter);

/** 路由配置 */
const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

router.beforeEach(async (to, from, next) => {
  console.log('beforeEach');
  next();
});

export default router;
