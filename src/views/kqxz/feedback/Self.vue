<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">爱宏途我建议</h2>
    </div>
    <div class="tab-wrap">
      <Tabs v-model="activeTab" type="card" @on-click="handleTabClick">
        <TabPane label="基本信息" name="1"></TabPane>
        <TabPane label="爱宏途我建议"  name="2"></TabPane>
      </Tabs>
    </div>
    <div class="main-wrap">
      <div class="operate-wrap">
        <Button type="primary" class="btn" @click="handleSuggest">提建议</Button>
      </div>
      <div class="table-wrap">
        <Table :columns="tableColumns" :data="tableData"></Table>
      </div>
      <div class="page-wrap">
        <Page :total="100" show-total show-elevator />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      activeTab: "2",
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
    handleTabClick(value) {
      console.log(value)
      if(value == 1) {
        this.$router.push({name: "my_info"})
      }
    },

    // 提建议
    handleSuggest() {
        this.$router.push({name: "feedback_suggest"})
    }
  }
}
</script>


<style lang="scss" scoped>
.tab-wrap{
  margin-top: 15px;
}

.main-wrap{
  margin-top: 20px;
}

.operate-wrap{
  margin-bottom: 20px;
}
</style>


