<template>
  <div id="user-info-wrap">
    <div class="portrait"><img :src="portraitSrc" alt="portrait"></div>
    <div class="user-name">
      <h2>黄伟明</h2>
      <div class="entry">[个人中心]</div>
    </div>
    <span class="logout" @click="handleLogout">退出</span>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'UserInfo',
  data (){
    return {
      // portraitSrc: 'http://192.168.8.172:16620/img/htoa/man.png'
      portraitSrc: require('../../assets/img/man.png')
      }
  },
  methods: {
    //退出登录
    handleLogout () {
      Cookies.remove('isLogin');
      this.$store.dispatch('setLoginStatus',false);
      this.$router.push('/login');
    }
  },
  created (){
  },
  mounted (){
  }
}
</script>

<style lang="scss" scoped>
#user-info-wrap{
  position: relative;
  padding-bottom: 10px;
  border-bottom: 1px solid #F0F0F0;
  background-color: #fff;
  .portrait{
    display: inline-block;
    width: 70px;
    height: 100px;
    margin:10px 20px 0;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .user-name{
    display: inline-block;
    vertical-align: top;
    margin-top: 34px;
    h2{
      font-size: 18px;
    }
    .entry{
      margin-top: 12px;
      cursor: pointer;
      font-size: 13px;
      &:hover{
        color: #30A5FF;
      }
    }
  }
  .logout{
    display: inline-block;
    width: 58px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    background-color: #BFC5D0;
    color: #fff;
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
  }
}
</style>


