<template>
  <header class="top-wrap">
    <div class="img-logo"></div>
  </header>
</template>

<script>
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
  .top-wrap{
    position: relative;
    width: 100%;
    min-width: 1300px;
    height: 75px;
    background: url('../../assets/img/titlebg.png') no-repeat;
    background-size: cover;
    background-position: center;
    .img-logo{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 395px;
      height: 46px;
      background: url('../../assets/img/logo.png') no-repeat;
    }
  }
</style>


