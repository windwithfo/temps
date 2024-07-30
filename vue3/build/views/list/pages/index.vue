<template lang="pug">
block content
  .indexPage
    .txt list
    img(src="../img/bg.jpg" alt="img")
    br
    i.icon.iconfont &#xe660;
    el-button 默认按钮
</template>

<script setup>
  import { name } from '../js'
  import axios    from 'axios'
  import { onMounted } from 'vue'

  console.log(name)

  let ret

  onMounted(async () => {
    ret = await axios('/mock/errorCode.json')
    console.log(ret.data)
  })
</script>
