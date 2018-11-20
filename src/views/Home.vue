<template>
  <div id="home">
    <Header></Header>
    <TopNav></TopNav>
    <div class="container-main clearfix">
      <div class="container-left">
        <UserInfo></UserInfo>
        <div class="nav-group-wrap">
          <NavGroup></NavGroup>
        </div>
      </div>
      <div class="container-right">
        <div class="main-content">
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
            <Wish></Wish>
            <Calendar></Calendar>
            <ToItem></ToItem>
          </div>
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
import NewMsg from '@c/layout/NewMsg';
import Wish from '@c/layout/Wish';
import Calendar from '@c/layout/Calendar';
import ToItem from '@c/layout/ToItem';


export default {
  name: 'home',
  components: {
    Header,
    TopNav,
    UserInfo,
    NavGroup,
    NewMsg,
    Wish,
    Calendar,
    ToItem
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
      }
    }
  }
</style>


