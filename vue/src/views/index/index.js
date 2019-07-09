/**
 * @file home入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
import Vue    from 'vue';
import store  from './store';
import router from './router';

// pages
import app from './app.vue';

// components
import {
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Option,
  Tabs,
  TabPane,
  Breadcrumb,
  BreadcrumbItem,
  Table,
  TableColumn,
  Pagination,
  Tree,
  Menu,
  Submenu,
  MenuItem,
  Popover
} from 'element-ui';

Vue.use(Select);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Option);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Tree);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Popover);

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: (h) => h(app)
}).$mount('#app');
