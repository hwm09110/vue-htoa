<template>
  <div id="home">
    <Header />
    <div class="container-main cls">
      <div class="container-left">
        <UserInfo />
        <MyNav style="border-bottom:5px solid #f1f4f7;" />
        <div class="nav-list-wrap" v-show="isShowNavList">
          <LeftNav />
        </div>
      </div>
      <div class="container-right">
        <Sitepath />
        <div class="main-content cls">
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
import LeftNav from '@c/layout/LeftNav';
import MyNav from '@c/layout/MyNav';
import Sitepath from '@c/layout/Sitepath';

export default {
  name: 'Index',
  components: {
    Header,
    TopNav,
    UserInfo,
    LeftNav,
    MyNav,
    Sitepath,
  },
  data () {
    return {
      //是否显示折叠导航
      isShowNavList:true
    }
  },
  created () {
    this.$store.dispatch('getTopNavList') //拉取顶部导航菜单
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
        background-color: #f1f4f7;
        // min-height: 1358px;
        .main-content{
          height: 100%;
          padding: 15px;
          margin: 0 15px 15px;
          background-color: #fff;
        }
      }
    }
  }
</style>


