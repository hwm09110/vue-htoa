<template>
  <div class="page-container">
    <div class="page-title">
      <div class="page-title">
        <h2 class="title">请假申请</h2>
      </div>
      <div class="top-btn">
        <Button type="primary" class="btn">
          <Icon type="ios-download-outline" size="22" style="vertical-align:middle;"/>
          <span style="vertical-align:middle;">导出统计信息表</span>
        </Button>
        <Button class="btn" type="primary">
          <Icon type="ios-refresh" size="22" style="vertical-align:middle;"/>
          <span style="vertical-align:middle;">刷新</span>
        </Button>
      </div>
    </div>
    <div class="search-wrap">
      <div class="item-box">
        <span class="label">申请人 </span>
        <Input placeholder="输入申请人姓名" class="search-input" />
      </div>
      <div class="item-box">
        <span class="label">部门 </span>
        <Select class="search-select">
            <Option v-for="item in deptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="item-box">
        <span class="label">请假类别 </span>
        <Select class="search-select">
            <Option v-for="item in cateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <br/>
      <div class="item-box">
        <span class="label">时间范围 </span>
        <DatePicker type="date" placeholder="开始时间" class="search-time"></DatePicker> 至 
        <DatePicker type="date" placeholder="结束时间" class="search-time"></DatePicker>
      </div>
      <div class="item-box">
        <Button type="primary">查询</Button>
      </div>
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
  name: "AllRecord",
  data() {
    return {
      deptList: [],
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
          category: "事假",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
        {
          category: "事假",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
        {
          category: "事假",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
        {
          category: "事假",
          daycount: "2天0小时",
          time: "2019-12-03 15:20",
          next: "李白",
          status: "待审批",
        },
        {
          category: "事假",
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

