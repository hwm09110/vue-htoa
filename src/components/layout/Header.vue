<template>
  <header class="top-wrap">
    <div class="logo-box"></div>
    <div class="nav-wrap">
      <TopNav/>
    </div>
    <!-- <div class="nowtime">{{nowTime}}</div> -->
  </header>
</template>

<script>
import TopNav from "./TopNav"
export default {
  name: 'Header',
  components: {
    TopNav
  },
  data() {
    return {
      nowTime: '',
    }
  },
  methods: {
    
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
  .top-wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo-box{
      width: 264px;
      height: 64px;
      background-image: url('../../assets/img/logo.png');
      background-size: 264px 64px;
      border-bottom: 1px solid #eee;
    }
    .nav-wrap{
      flex: 1;
      border-left: 1px solid #eee;
    }
    .nowtime{
      color: #666;
    }
  }
</style>


