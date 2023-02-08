<template lang="pug">
  router-view
</template>

<script lang="ts">
  import {
    Vue,
    Component
  } from 'vue-property-decorator'

  @Component({
    name: 'index',
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
@import '../assets/style/common';
@import '../assets/style/mixin';
@import './style/index';

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
