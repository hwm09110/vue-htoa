<template>
  <div class="page-container">
    <h1 class="page-title">我的出差记录</h1>
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
          title: '出差时间',
          key: 'time'
        },
        {
          title: '出差地点',
          key: 'address'
        },
        {
          title: '出差报告',
          key: 'isReport'
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
          time: "2019-11-15 10:30",
          address: "北京",
          isReport: "不需要提交",
          next: "李白",
          status: "待审批",
        },
        {
          time: "2019-11-15 10:30",
          address: "北京",
          isReport: "待提交/修改",
          next: "李白2",
          status: "待审批",
        },
      ],
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

