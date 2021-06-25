<template lang="pug">
  #app
    .txt list
    img(src="../img/bg.jpg" alt="img")
    br
    i.icon.iconfont &#xe660;
    el-button 默认按钮
</template>

<script lang="ts">
  import { name } from '../js';
  import axios    from 'axios';

  import {
    Vue,
    Component
  } from 'vue-property-decorator';

  @Component({
    name: 'list'
  })
  export default class List extends Vue {
    mounted() {
      console.log(name);
      axios('/static/mock/errorCode.json').then((json) => {
        // success callback
        console.log(json.data);
      }, (error) => {
        // error callback
        console.log(error);
      });
    }
  }
</script>
