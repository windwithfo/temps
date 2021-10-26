/**
 * @file 路由配置
 * @author dongkunshan(dongkunshan210816@credithc.com)
 */

import { createApp } from '../lib/vue3.js'

const app = {
  template: `
  <div class="container">
    <div class="flex">
      <span class="label">查询输入：</span>
      <em></em>
      <span class="label">查询输出：</span>
    </div>
    <div class="flex">
      <textarea v-model="input" class="left"></textarea>
      <button @click="search">查询</button>
      <textarea v-model="output" class="right"></textarea>
    </div>
  </div>
  `,
  data() {
    return {
      input: `{

}`,
      output: '',
    }
  },
  mounted() {
  },
  methods: {
    search() {
      this.output = this.input
    }
  },
}

createApp(app).mount('#app')
