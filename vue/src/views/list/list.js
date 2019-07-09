/**
 * @file list 入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
import Vue    from 'vue';
import store  from './store';
import router from './router';

// global css
import '@/assets/style/common.less';

// pages
import app from './app.vue';

// components
import {
  Button,
  Select
} from 'element-ui';

Vue.use(Button);
Vue.use(Select);

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: (h) => h(app)
}).$mount('#app');
