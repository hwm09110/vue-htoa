<template>
  <div class="page-container">
    <h1 class="page-title">会议室管理</h1>
    <div class="search-wrap">
      <div class="item-box">
        <span class="label">会议开始时间 </span>
        <DatePicker type="date" placeholder="开始时间" class="search-time"></DatePicker> 至 
        <DatePicker type="date" placeholder="结束时间" class="search-time"></DatePicker>
      </div>
      <div class="item-box">
        <Button type="primary">查询</Button>
      </div>
    </div>
    <div class="tab-wrap">
      <Tabs value="name1" :animated="false">
        <TabPane label="待审核" name="name1"></TabPane>
        <TabPane label="已审核" name="name2"></TabPane>
        <TabPane label="已完成" name="name3"></TabPane>
        <TabPane label="全部" name="name4"></TabPane>
        <TabPane label="已退回" name="name5"></TabPane>
        <TabPane label="已取消" name="name6"></TabPane>
    </Tabs>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData"></Table>
    </div>
    <div class="page-wrap">
      <Page :total="100" show-total show-elevator />
    </div>
  </div>
</template>

<script>
export default {
  name: "Check",
  data() {
    return {
      cateList: [],
      tableColumns: [
        {
          title: '申请人',
          key: 'applyer'
        },
        {
          title: '会议主题',
          key: 'theme'
        },
        {
          title: '会议室',
          key: 'roomName'
        },
        {
          title: '会议开始时间',
          key: 'time'
        },
      ],
      tableData: [
        {
          applyer: "张三",
          theme: "事件",
          roomName: "一楼会议室",
          time: "2019-12-03 15:20",
        },
        {
          applyer: "张三",
          theme: "事件",
          roomName: "一楼会议室",
          time: "2019-12-03 15:20",
        },
        {
          applyer: "张三",
          theme: "事件",
          roomName: "一楼会议室",
          time: "2019-12-03 15:20",
        },
        {
          applyer: "张三",
          theme: "事件",
          roomName: "一楼会议室",
          time: "2019-12-03 15:20",
        },
      ],
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

