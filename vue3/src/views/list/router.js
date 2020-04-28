/**
 * @file list 路由配置
 * @author windwithfo(windwithfo@yeah.net)
 */

import { createRouter, createWebHashHistory } from 'vue-router';

// 首页
import Index from './pages/index.vue';

/** 路由配置 */
const routes = [
  {
    path: '',
    name: 'index',
    component: Index
  }
];

const router = createRouter({
  history: createWebHashHistory('list.html'),
  routes
});

router.beforeEach(async (to, from, next) => {
  console.log('beforeEach');
  next();
});

export default router;
