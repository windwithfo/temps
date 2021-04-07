/**
 * @file home入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
// components
import {
  ElBreadcrumb,
  ElBreadcrumbItem, ElCheckbox,
  ElCheckboxGroup,
  ElMenu,
  ElMenuItem, ElOption,
  ElPagination,
  ElPopover, ElRadio,
  ElRadioGroup, ElSelect,
  ElSubmenu, ElTable,
  ElTableColumn, ElTabPane, ElTabs,
  ElTree
} from 'element-plus';
import { createApp } from 'vue';
// pages
import app from './app.vue';
import router from './router';
import store from './store';

const _app = createApp(app);
_app.use(ElSelect);
_app.use(ElRadio);
_app.use(ElRadioGroup);
_app.use(ElCheckbox);
_app.use(ElCheckboxGroup);
_app.use(ElOption);
_app.use(ElTabs);
_app.use(ElTabPane);
_app.use(ElBreadcrumb);
_app.use(ElBreadcrumbItem);
_app.use(ElTable);
_app.use(ElTableColumn);
_app.use(ElPagination);
_app.use(ElTree);
_app.use(ElMenu);
_app.use(ElSubmenu);
_app.use(ElMenuItem);
_app.use(ElPopover);

_app.use(store);
_app.use(router);
// router.isReady().then(() => _app.mount('#app'));
_app.mount('#app');
