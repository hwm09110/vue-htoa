<template>
  <div id="user-info-wrap">
    <div class="portrait">
      <img :src="userInfo.portrait" alt="portrait" v-if="userInfo.portrait != '' ">
      <img :src="userInfo.gender == 1?manPortraitSrc:womanPortraitSrc" alt="portrait" v-else>
    </div>
    <div class="user-name">
      <h2>{{userInfo.user_name}}</h2>
      <router-link tag="div" :to="{name:'my_info'}" class="entry">[个人中心]</router-link>
    </div>
    <span class="logout" @click="handleLogout">退出</span>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: 'UserInfo',
  data (){
    return {
      // portraitSrc: 'http://192.168.8.172:16620/img/htoa/man.png'
        manPortraitSrc: require('../../assets/img/man.png'),
        womanPortraitSrc: require('../../assets/img/woman.png'),
      }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    //退出登录
    handleLogout () {
      this.$store.dispatch('doLogout')
    }
  },
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


