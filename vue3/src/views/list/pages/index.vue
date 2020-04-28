<template lang="pug">
block content
  .indexPage
    .txt list
    img(src="../img/bg.jpg" alt="img")
    br
    i.icon.iconfont &#xe660;
    //- el-button 默认按钮
    button 默认按钮
</template>

<script>
  import { name } from '../js';
  import fetch    from 'isomorphic-fetch';
  import { onMounted } from 'vue';

  export default {
    setup() {
      console.log(name);
      let ret;
      onMounted(async () => {
        const response = await fetch('/static/mock/errorCode.json');
        ret = await response.json();
        console.log(ret);
      });

      return {
        ret
      };
    }
  };
</script>
