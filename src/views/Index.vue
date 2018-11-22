<template>
  <div id="home">
    <Header></Header>
    <TopNav></TopNav>
    <div class="container-main clearfix">
      <div class="container-left">
        <UserInfo></UserInfo>
        <div class="nav-group-wrap" v-show="!isShowNavList">
          <NavGroup></NavGroup>
        </div>
        <div class="nav-list-wrap" v-show="isShowNavList">
          <LeftNav></LeftNav>
        </div>
      </div>
      <div class="container-right">
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@c/layout/Header';
import TopNav from '@c/layout/TopNav';
import UserInfo from '@c/layout/UserInfo';
import NavGroup from '@c/layout/NavGroup';
import LeftNav from '@c/layout/LeftNav';

export default {
  name: 'Index',
  components: {
    Header,
    TopNav,
    UserInfo,
    NavGroup,
    LeftNav
  },
  data () {
    return {
      //是否显示折叠导航
      isShowNavList:true
    }
  },
  created () {
    this.$store.dispatch('getTopModule')
  }
}
</script>

<style lang="scss" scoped>
  #home{
    .container-main{
      width: 100%;
      .container-left{
        float: left;
        width: 265px;
        border-right: solid 1px #F0F0F0;
        // min-height: 1358px;
      }
      .container-right{
        float: left;
        width: calc(100% - 265px);
        background-color: #F9F9F9;
        padding: 15px;
        // min-height: 1358px;
        .main-content{
          width: 100%;
          height: 100%;
          background-color: #fff;
        }
      }
    }
  }
</style>


