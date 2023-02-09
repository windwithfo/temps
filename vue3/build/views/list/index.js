/**
 * @file list 入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
import { createApp } from 'vue'
import '../../assets/style/font.css'
// pages
import app from './app.vue'
import router from './router'
import store from './store'

const _app = createApp(app)
_app.use(store)
_app.use(router)
// router.isReady().then(() => _app.mount('#app'))
_app.mount('#app')
