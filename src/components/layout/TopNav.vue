<template>
  <div class="top-nav-wrap">
    <ul class="nav cls">
      <li class="item" v-for="(item, index) of topNavList" :key="index" :class="{'active': item.name == topNavActive}">
        <span class="text" @click="handleFirstClick(item)">{{item.text}}</span>
        <ul class="second-nav" v-if="item.subNav && item.subNav.length > 0 && item.name !='home' ">
          <li v-for="(secondItem , i) of item.subNav" :key="i">
            <span class="text" @click="handleSecondClick(secondItem)">{{secondItem.text}}</span>
            <ul class="sub-nav" v-if="secondItem.subNav && secondItem.subNav.length > 0">
              <li v-for="(subItem , j) of secondItem.subNav" :key="j" >
                <span class="text" @click="handleThirdClick(subItem)">{{subItem.text}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>


<script>
import { mapState } from 'vuex'
export default {
  name: "TopNav",
  data() {
    return {
    }
  },
  computed: {
    ...mapState(['topNavList', 'topNavActive'])
  },
  methods: {
    handleFirstClick(item) {
      console.log('点击第一级菜单', item)
      //点击首页直接跳转
      if(item.name == 'home'){
        this.$router.push({name: item.name})
      }else{
        if(item.subNav.length > 0){
          this.$store.commit('SET_LEFTNAVLIST', item.subNav)
          this.$store.state.topNavActive = item.name
          this.$store.state.leftNavActive = null
          this.$store.state.leftNavOpen = []
        }
      }
    },

    //点击第二级菜单时，默认打开第一个页面
    handleSecondClick(item) {
      console.log('点击第二级菜单时', item)
      this.$store.state.leftNavOpen = []
      if(item.subNav.length > 0) {
        this.$router.push({name: item.subNav[0]['name']})
      }
    },

    //点击第三级菜单
    handleThirdClick(item) {
      console.log('点击第三级菜单', item)
      if(item.name){  
        this.$router.push({name: item.name})
      }
    },
  },
  created() {
  }
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/variable.scss";
.top-nav-wrap{
  height: 64px;
  background-color: #fff;
  padding: 10px 15px;
  .nav{
    .item{
      float: left;
      width: 100px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      color: #333;
      font-size: 16px;
      cursor: pointer;
      position: relative;
      margin-bottom: 2px;
      margin-right: 2px;
      > .text{
        display: inline-block;
        height: 100%;
        width: 100%;
        font-size: 16px;
      }
      &:hover,
      &.active{
        background-color: $top_nav_hover_bgcolor;
        color: #fff;
        border-radius: 20px 20px;
      }
      &:hover{
        > .second-nav{
          display: block;
        }
      }
    }
    .second-nav{
      display: none;
      background-color: #fff;
      z-index: 20000;
      position: relative;
      box-shadow: 1px 2px 10px #eee;
      li{
        &:hover{
          color: $top_nav_hover_fontcolor !important;
        }
        width: 100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        color: #333;
        font-size: 16px;
        cursor: pointer;
        position: relative;
        &:hover{
          color: #57a3f3;
          .sub-nav{
            display: block;
          }
        }
      }
    }
    .sub-nav{
      display: none;
      position: absolute;
      left: 100px;
      top: 0;
      background-color: #fff;
      box-shadow: 1px 2px 10px #eee;
      > li {
        width: auto;
        white-space: nowrap;
        padding: 0 15px;
      }
    }
  }
}
</style>
