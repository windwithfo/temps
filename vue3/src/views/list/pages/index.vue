<template lang="pug">
block content
  .indexPage
    .txt list
    img(src="../img/bg.jpg" alt="img")
    br
    i.icon.iconfont &#xe660;
    el-button 默认按钮
</template>

<script>
  import { name } from '../js'
  import axios    from 'axios'
  import { onMounted } from 'vue'

  export default {
    name: 'listPage',
    setup() {
      console.log(name)
      let ret
      onMounted(async () => {
        ret = await axios('/static/mock/errorCode.json')
        console.log(ret.data)
      })

      return {
        ret
      }
    }
  }
</script>
