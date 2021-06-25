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
} from 'element-plus'
import { createApp } from 'vue'
// pages
import app from './app.vue'
import router from './router'
import store from './store'

const components = [
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
]

const _app = createApp(app)

components.forEach((component) => {
  _app.use(component)
})

_app.use(store)
_app.use(router)
// router.isReady().then(() => _app.mount('#app'))
_app.mount('#app')
