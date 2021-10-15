/**
 * @file list 入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
// components
import {
  ElButton,
  ElSelect
} from 'element-plus'
import { createApp } from 'vue'
import '../../assets/style/font.css'
// pages
import app from './app.vue'
import router from './router'
import store from './store'

const components = [
  ElButton,
  ElSelect
]

const _app = createApp(app)

components.forEach((component) => {
  _app.use(component)
})

_app.use(store)
_app.use(router)
// router.isReady().then(() => _app.mount('#app'))
_app.mount('#app')
