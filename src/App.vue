<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  watch:{
    $route(to,from) {
    }
  },
  created () {
  }
}
</script>

<style lang="scss">
  html,body{
    width: 100%;
    height: 100%;
  }
  #app{
    width: 100%;
    min-width: 1200px;
    height: 100%;
    min-height: 100%;
    background-color: #f1f4f7;
    overflow: auto;
  }
</style>
