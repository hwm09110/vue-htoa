<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">出差审批</h2>
    </div>
    <div class="tab-wrap">
      <Tabs value="name1" :animated="false">
        <TabPane label="待审批" name="name1"></TabPane>
        <TabPane label="已审批" name="name2"></TabPane>
        <TabPane label="已完成" name="name3"></TabPane>
        <TabPane label="全部" name="name4"></TabPane>
        <TabPane label="已退回" name="name5"></TabPane>
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
          title: '部门',
          key: 'department'
        },
        {
          title: '出差时间',
          key: 'time'
        },
        {
          title: '出差地点',
          key: 'address'
        },
        {
          title: '申请时间',
          key: 'applytime'
        },
        {
          title: '审批结果',
          key: 'status'
        },
      ],
      tableData: [
        {
          address: "事件",
          department: "技术部",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          applytime: "2019-12-01 12:20",
          applyer: "李白",
          status: "待审批",
        },
      ],
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

