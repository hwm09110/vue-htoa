<template>
  <nav id="top-nav-wrap">
    <ul class="nav-list clearfix">
      <li v-for="(item,index) of navList" :key="index" :class="{item,active:item.isActive}" @click="handleItemClick(item)">{{item.name}}</li>
    </ul>
    <TopSearch style="float:right; margin-top:10px; margin-right:15px;"></TopSearch>
  </nav>
</template>

<script>
import TopSearch from '@c/layout/TopSearch'
export default {
  name: 'TopNav',
  components:{
    TopSearch
  },
  data (){
    return {
      navList: [
        {name:'首页',path:'/home',isActive:true},
        {name:'新闻中心',path:'/home',isActive:false},
        {name:'行政人事',path:'/home',isActive:false},
        {name:'个人办公',path:'/home',isActive:false}
      ]
    }
  },
  methods: {
    handleItemClick (item){
      console.log(item);
    }
  },
  created (){
  },
  mounted (){
  }
}
</script>

<style lang="scss" scoped>
  #top-nav-wrap{
    width: 100%;
    min-width: 1300px;
    height: 50px;
    background-color: #333333;
    .nav-list{
      margin-left: 265px;
      display: inline-block;
      .item{
        width: 100px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        float: left;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        &.active{
          background-color: #30A5FF;
          font-weight: 700;
        }
      }
    }
  }
</style>


