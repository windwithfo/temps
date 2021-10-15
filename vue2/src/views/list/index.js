/**
 * @file list 入口文件
 * @author windwithfo(windwithfo@yeah.net)
 */

// core js
// components
// import {
//   Button,
//   Select
// } from 'element-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vue from 'vue'
import '../../assets/style/font.css'
// pages
import app from './app.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)

// const components = [
//   Button,
//   Select
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
