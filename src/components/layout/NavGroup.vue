<template>
  <div class="nav-group-box">
    <div class="group-title">
      <span class="icon1"></span>
      <span class="text">行政人事平台</span>
      <span class="icon2"></span>
    </div>
    <ul class="group-list-box clearfix">
      <li>采购管理</li>
      <li>仓库管理</li>
      <li>出库管理</li>
      <li>付款管理</li>
      <li>公章管理</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavGroup',
  data (){
    return {
      }
  },
  methods: {
  },
  created (){
  },
  mounted (){
  }
}
</script>

<style lang="scss" scoped>
.nav-group-box{
  background-color: #F5F5F5;
  padding-bottom: 15px;
  .group-title{
    padding: 0 15px;
    height: 52px;
    line-height: 52px;
    border-bottom: 1px solid #F0F0F0;
    background-color: #fff;
    .icon1{
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 2px;
      vertical-align: middle;
      background: url('../../assets/img/nav-icon.png') no-repeat;
      background-position: -1px -52px;
      margin-top: -3px;
    }
    .text{
      vertical-align: middle;
      font-size: 16px;
      font-weight: 700;
      margin-left: 4px;
    }
    .icon2{
      width: 16px;
      height: 16px;
      float: right;
      margin-top: 18px;
      background: url('../../assets/img/icons.png') no-repeat;
      background-position: 0 -63px;
    }
  }
  .group-list-box{
    margin: 0 15px;
    background-color: #fff;
    li{
      display: block;
      float: left;
      width: 50%;
      height: 40px;
      line-height: 40px;
      background-color: #fff;
      padding-left: 20px;
      cursor: pointer;
    }
    font-size: 14px;
  }
}
</style>


