/**
 * @file list 入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
import { createApp } from 'vue';
import store  from './store';
import router from './router';

// global css
import '@/assets/style/common.less';

// pages
import app from './app.vue';

// components
// import {
//   Button,
//   Select
// } from 'element-ui';

const _app = createApp(app);

// _app.use(Button);
// _app.use(Select);
_app.use(store);
_app.use(router);
// router.isReady().then(() => _app.mount('#app'));
_app.mount('#app');
