<template>
  <div class="page-container">
    <h1 class="page-title">员工建议</h1>
    <div class="operate-wrap">
      <Button type="primary" class="btn" @click="handleExport">导出</Button>
    </div>
    <div class="tab-wrap">
      <Tabs value="name1" :animated="false">
        <TabPane label="待反馈" name="name1"></TabPane>
        <TabPane label="持续跟进" name="name2"></TabPane>
        <TabPane label="完结" name="name3"></TabPane>
        <TabPane label="全部" name="name4"></TabPane>
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
  name: "List",
  data() {
    return {
      tableColumns: [
        {
          title: '问题编号',
          key: 'number',
        },
        {
          title: '反馈对象',
          key: 'obj',
        },
        {
          title: '问题',
          key: 'question',
        },
        {
          title: '建议方案',
          key: 'suggest',
        },
        {
          title: '提交时间',
          key: 'time',
        },
        {
          title: '状态',
          key: 'status',
        },
      ],
      tableData: [
        {
          number: "13512",
          obj: "人事部",
          question: "问题内容",
          suggest: "建议内容",
          time: "2019-12-03 15:20",
          status: "跟进中",
        },
        {
          number: "13512",
          obj: "人事部",
          question: "问题内容",
          suggest: "建议内容",
          time: "2019-12-03 15:20",
          status: "跟进中",
        },
        {
          number: "13512",
          obj: "人事部",
          question: "问题内容",
          suggest: "建议内容",
          time: "2019-12-03 15:20",
          status: "跟进中",
        },
      ],
    }
  },
  methods: {
    handleExport() {}
  }
}
</script>


<style lang="scss" scoped>

</style>

