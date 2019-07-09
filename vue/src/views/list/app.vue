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
  @import './css/index';

  #app {
    font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    background: url('img/bg.jpg') 0 0 no-repeat;

    a {
      color: #ff0;
    }
  }
</style>
