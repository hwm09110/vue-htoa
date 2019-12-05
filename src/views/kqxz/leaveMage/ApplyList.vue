<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">我的申请记录</h2>
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
          title: '请假类别',
          key: 'category'
        },
        {
          title: '请假天数',
          key: 'daycount'
        },
        {
          title: '申请时间',
          key: 'time'
        },
        {
          title: '下一步操作人',
          key: 'next'
        },
        {
          title: '审批结果',
          key: 'status'
        },
      ],
      tableData: [
        {
          category: "事件",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
        {
          category: "事件",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
        {
          category: "事件",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
        {
          category: "事件",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
        {
          category: "事件",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
      ],
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

