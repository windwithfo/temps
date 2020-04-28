<template lang="pug">
block content
  router-view
</template>

<script>
  export default {};
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
