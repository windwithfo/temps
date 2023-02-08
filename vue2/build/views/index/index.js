/**
 * @file home入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
// components
// import {
//   Breadcrumb,
//   BreadcrumbItem, Checkbox,
//   CheckboxGroup, Menu, MenuItem, Option, Pagination, Popover, Radio,
//   RadioGroup, Select, Submenu, Table,
//   TableColumn, TabPane, Tabs, Tree
// } from 'element-ui'
import ElementUI from 'element-ui'
import Vant from 'vant'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import 'vant/lib/index.css'
// pages
import app from './app.vue'
import router from './router'
import store from './store'

Vue.use(Vant)
Vue.use(ElementUI)

// const components = [
//   Select,
//   Radio,
//   RadioGroup,
//   Checkbox,
//   CheckboxGroup,
//   Option,
//   Tabs,
//   TabPane,
//   Breadcrumb,
//   BreadcrumbItem,
//   Table,
//   TableColumn,
//   Pagination,
//   Tree,
//   Menu,
//   Submenu,
//   MenuItem,
//   Popover
// ]

// components.forEach((component) => {
//   Vue.use(component)
// })

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: (h) => h(app)
}).$mount('#app')
