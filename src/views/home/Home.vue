<template>
  <div class="home-wrap">
    <div class="middle-box">
      <h2 class="module-title">
        <span class="text">通知</span>
        <div class="btn-box">
          <Button type="primary" style="margin-right:15px;">
            <Icon type="ios-refresh" size="18" style="margin-top:-2px;"/>刷新
          </Button>
          <Button type="primary">
            更多<Icon type="ios-arrow-forward" size="18" style="margin-top:-2px;"/>
          </Button>
        </div>
      </h2>
      <div class="table-content">
        <Table :columns="notice_columns" :data="notice_data"></Table>
      </div>
    </div>
    <div class="right-box">
      <NewMsg></NewMsg>
      <ToItem></ToItem>
    </div>
  </div>
</template>

<script>
import NewMsg from '@c/home/NewMsg';
import ToItem from '@c/home/ToItem';

export default {
  name:'Home',
  components:{
    NewMsg,
    ToItem,
  },
  data () {
    return {
      notice_columns:[
        {
            title: '通知标题',
            key: 'title'
        },
        {
            title: '发布时间',
            key: 'time'
        }
      ],
      notice_data:[
        {
          title: '明天下午放假了，哈哈哈',
          time: '2018-11-19 15:30'
        },
        {
          title: '明天下午放假了，哈哈哈',
          time: '2018-11-19 15:30'
        },
        {
          title: '明天下午放假了，哈哈哈',
          time: '2018-11-19 15:30'
        }
      ],
      date:null,
      flatConfig:{
        inline: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-wrap{
  .middle-box{
    float: left;
    width: calc(100% - 298px);
    height: 703px;
    background-color: #fff;
    border-radius: 5px;
    .module-title{
      height: 57px;
      border-bottom: solid 1px #F0F0F0;
      line-height: 57px;
      padding: 0 15px;
      color: #666;
      .btn-box{
        float: right;
      }
    }
    .table-content{
      padding: 15px;
    }
  }
  .right-box{
    float: left;
    width: 278px;
    margin-left: 20px;
    background-color: transparent;
  }
}
</style>
