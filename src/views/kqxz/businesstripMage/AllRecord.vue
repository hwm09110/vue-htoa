<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">公司出差记录</h2>
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
        <span class="label">出差地点 </span>
        <Input placeholder="输入地点关键字" class="search-input" />
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
          title: '申请人',
          key: 'applyer'
        },
        {
          title: '部门',
          key: 'department'
        },
        {
          title: '出差开始时间',
          key: 'btime'
        },
        {
          title: '出差结束时间',
          key: 'etime'
        },
        {
          title: '出差地点',
          key: 'address'
        },
      ],
      tableData: [
        {
          address: "北京",
          department: "技术部",
          btime: "2019-12-03 15:20",
          etime: "2019-12-11 12:20",
          applyer: "李白",
        },
        {
          address: "北京",
          department: "技术部",
          btime: "2019-12-03 15:20",
          etime: "2019-12-11 12:20",
          applyer: "李白",
        },
        {
          address: "北京",
          department: "技术部",
          btime: "2019-12-03 15:20",
          etime: "2019-12-11 12:20",
          applyer: "李白",
        },
      ],
    }
  }
}
</script>


<style lang="scss" scoped>
</style>

