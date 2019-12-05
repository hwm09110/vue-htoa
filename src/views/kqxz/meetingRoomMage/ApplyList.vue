<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">我的预约</h2>
    </div>
    <div class="tab-wrap">
      <Tabs value="name1" :animated="false">
        <TabPane label="处理中" name="name1"></TabPane>
        <TabPane label="已完成" name="name2"></TabPane>
        <TabPane label="全部" name="name3"></TabPane>
        <TabPane label="已退回" name="name4"></TabPane>
        <TabPane label="已撤回" name="name5"></TabPane>
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
  name: "ApplyList",
  data() {
    return {
      cateList: [],
      tableColumns: [
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
          key: 'stime'
        },
        {
          title: '下一步操作人',
          key: 'next'
        },
      ],
      tableData: [
        {
          theme: "事件",
          roomName: "一楼会议室",
          stime: "2019-12-03 15:20",
          next: "李白",
        },
        {
          theme: "事件",
          roomName: "一楼会议室",
          stime: "2019-12-03 15:20",
          next: "李白",
        },
        {
          theme: "事件",
          roomName: "一楼会议室",
          stime: "2019-12-03 15:20",
          next: "李白",
        },
        {
          theme: "事件",
          roomName: "一楼会议室",
          stime: "2019-12-03 15:20",
          next: "李白",
        },
      ],
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

