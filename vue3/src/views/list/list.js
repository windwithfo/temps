/**
 * @file list 入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
// global css
import '@/assets/style/common.less';
// components
import {
  ElButton,
  ElSelect
} from 'element-plus';
import { createApp } from 'vue';
// pages
import app from './app.vue';
import router from './router';
import store from './store';

const _app = createApp(app);

_app.use(ElButton);
_app.use(ElSelect);
_app.use(store);
_app.use(router);
// router.isReady().then(() => _app.mount('#app'));
_app.mount('#app');
