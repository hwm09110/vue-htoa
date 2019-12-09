<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">我的申请</h2>
    </div>
    <div class="search-wrap">
      <div class="item-box">
        <span class="label">工作流 </span>
        <Select class="search-select">
            <Option v-for="item in cateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="item-box">
        <span class="label">创建时间 </span>
        <DatePicker type="date" placeholder="开始时间" class="search-time"></DatePicker> 至 
        <DatePicker type="date" placeholder="结束时间" class="search-time"></DatePicker>
      </div>
      <br/>
      <div class="item-box">
        <span class="label">审核内容 </span>
        <Input placeholder="输入审核内容" class="search-input" />
      </div>
      <div class="item-box">
        <Button type="primary">查询</Button>
      </div>
    </div>
    <div class="tab-wrap">
      <Tabs value="name1" :animated="false">
        <TabPane label="待审批(1)" name="name1"></TabPane>
        <TabPane label="已审批(11)" name="name2"></TabPane>
        <TabPane label="全部(12)" name="name3"></TabPane>
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
          title: '工作流',
          key: 'category'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '当前节点',
          key: 'nowNode'
        },
        {
          title: '创建人',
          key: 'creater'
        },
        {
          title: '创建时间',
          key: 'time'
        },
        {
          title: '状态',
          key: 'status'
        },
      ],
      tableData: [
        {
          category: "test",
          content: "test content",
          department: "技术部",
          creater: "张三",
          time: "2019-12-03 15:20",
          status: "正常",
        },
        {
          category: "test",
          content: "test content",
          department: "技术部",
          creater: "张三",
          time: "2019-12-03 15:20",
          status: "正常",
        },
        {
          category: "test",
          content: "test content",
          department: "技术部",
          creater: "张三",
          time: "2019-12-03 15:20",
          status: "正常",
        },
        {
          category: "test",
          content: "test content",
          department: "技术部",
          creater: "张三",
          time: "2019-12-03 15:20",
          status: "正常",
        }
      ],
    }
  }
}
</script>


<style lang="scss" scoped>


</style>

