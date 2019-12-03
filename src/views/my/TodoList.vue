<template>
  <div class="page-container">
    <h1 class="page-title">我的待办</h1>
    <div class="search-wrap">
      <div class="item-box">
        <span class="label">工作流 </span>
        <Select v-model="model1" class="search-select">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="item-box">
        <span class="label">创建时间 </span>
        <DatePicker type="date" placeholder="开始时间" class="search-time"></DatePicker> 至 
        <DatePicker type="date" placeholder="结束时间" class="search-time"></DatePicker>
      </div>
      <br/>
      <div class="item-box">
        <span class="label">创建人 </span>
        <Input v-model="value" placeholder="输入创建人姓名" class="search-input" />
      </div>
      <div class="item-box">
        <span class="label">审核内容 </span>
        <Input v-model="value" placeholder="输入审核内容" class="search-input" />
      </div>
      <div class="item-box">
        <Button type="primary">查询</Button>
      </div>
    </div>
    <div class="tab-wrap">
      <Tabs value="name1" :animated="false">
        <TabPane label="待处理(1)" name="name1"></TabPane>
        <TabPane label="已处理(11)" name="name2"></TabPane>
        <TabPane label="全部(12)" name="name3"></TabPane>
    </Tabs>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData"></Table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
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
          title: '创建部门',
          key: 'department'
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
      ]
    }
  }
}
</script>


<style lang="scss" scoped>
.page-title{
  font-size: 18px;
  margin-bottom: 25px;
}

.search-wrap{
  .search-time,
  .search-select,
  .search-input{
    width: 200px;
    margin-left: 5px;
  }
  .item-box{
    display: inline-block;
    margin-left: 30px;
    margin-bottom: 20px;
  }
}

.tab-wrap{
  margin-top: 15px;
}

</style>

