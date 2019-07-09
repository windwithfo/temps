<template lang="pug">
  router-view
</template>

<script>
  import {
    Vue,
    Component
  } from 'vue-property-decorator';

  @Component
  export default class extends Vue {}
</script>

<style lang="less">
  @import '../../assets/style/common';
  @import '../../assets/style/mixin';
  @import './css/index';

  #app {
    font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;

    .nav-a {
      color: #c0ccda;
      text-decoration: none;
    }

    .subnav-a {
      color: #666;
      text-decoration: none;
    }

    .el-submenu__icon-arrow {
      display: none;
    }
  }
</style>
