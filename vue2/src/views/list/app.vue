<template lang="pug">
  router-view
</template>

<script lang="ts">
  import {
    Vue,
    Component
  } from 'vue-property-decorator'

  @Component({
    name: 'list'
  })
  export default class App extends Vue {}
</script>

<style lang="scss">
  @import '../../assets/style/common';
  @import './style/index';

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
