<template>
  <div class="wish-box">
    <strong class="text">生日祝福(0)</strong>
    <span class="icon"></span>
  </div>
</template>

<script>
export default {
  name: 'Wish',
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
  .wish-box{
    height: 57px;
    line-height: 57px;
    border: solid 1px #F0F0F0;
    padding: 0 15px;
    margin:15px 0;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
    .text{
      font-size: 16px;
      color: #666;
    }
    .icon{
      width: 40px;
      height: 40px;
      background: url('../../assets/img/gift.png') no-repeat;
      margin-top: 7px;
      display: block;
      float: right;
    }
  }
</style>


