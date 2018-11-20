<template>
  <div class="new-message-box">
    <h2 class="module-title">
      <span class="text">新消息(0)</span>
      <div class="btn-box">
        <Button type="primary">
          全部<Icon type="ios-arrow-forward" size="18" style="margin-top:-2px;"/>
        </Button>
      </div>
    </h2>
    <ul class="message-num-list">
      <li>
        <span class="text">已完成</span>
        <span class="num">0</span>
      </li>
      <li>
        <span class="text">待办</span>
        <span class="num">0</span>
      </li>
      <li>
        <span class="text">待阅</span>
        <span class="num">0</span>
      </li>
      <li>
        <span class="text">会议</span>
        <span class="num">0</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NewMsg',
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
  .new-message-box{
    background-color: #fff;
    border:1px solid #f0f0f0;
    border-radius: 5px;
    .module-title{
      height: 57px;
      border-bottom: solid 1px #F0F0F0;
      line-height: 57px;
      padding: 0 15px;
      color: #666;
      font-size: 16px;
      .btn-box{
        float: right;
      }
    }
    .message-num-list{
      li{
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 25px;
        border-bottom: 1px solid #f0f0f0;
        font-size: 14px;
        &:last-child{
          border-bottom: none;
        }
        .text{
          color: #666;
        }
        .num{
          display: block;
          width: 34px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          color: #fff;
          float: right;
          margin-top: 15px;
          background-color: #1EBFAE;
          border-radius: 5px;
        }
      }
    }
  }
</style>


