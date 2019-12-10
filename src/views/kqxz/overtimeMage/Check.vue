<template>
  <div class="apply-container checkApply">
    <div class="page-title">
      <h2 class="title">加班审批</h2>
    </div>
    <Tabs value="all" :animated="false">
      <TabPane label="待审核" name="checkPending"></TabPane>
      <TabPane label="已审核" name="audited"></TabPane>
      <TabPane label="已完成" name="completed"></TabPane>
      <TabPane label="全部" name="all"></TabPane>
      <TabPane label="已退回" name="hasBeenReturned"></TabPane>
    </Tabs>
    <Table height="calc(100% - 220px)" :columns="table.columns" :data="table.all"></Table>
    <Page :total="100" show-total show-elevator />
  </div>
</template>

<script>
export default {
  data() {
    return {
      table: {
        columns: [
          {
            title: "申请人",
            key: "name"
          },
          {
            title: "部门",
            key: "department"
          },
          {
            title: "申请时间",
            key: "time"
          },
          {
            title: "加班时长",
            key: "overtimeHours"
          },
          {
            title: "加班费",
            key: "overtimePay"
          },
          {
            title: "操作/结果",
            key: "operation"
          }
        ],
        // 所有
        all: [
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            overtimeHours: "2小时",
            overtimePay: "--",
            operation: "待审批"
          },
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            overtimeHours: "2小时",
            overtimePay: "--",
            operation: "待审批"
          },
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            overtimeHours: "2小时",
            overtimePay: "--",
            operation: "待审批"
          },
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            overtimeHours: "2小时",
            overtimePay: "--",
            operation: "待审批"
          },
          {
            name: "Ggg",
            department: "测试部门",
            time: "2016-10-03 12:32",
            overtimeHours: "2小时",
            overtimePay: "--",
            operation: "待审批"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.checkApply {
  /deep/ .ivu-page {
    display: flex;
    justify-content: flex-end;
    margin: 15px 0;
  }
}
.apply-container {
  .page-title {
    padding-bottom: 15px;
    margin-bottom: 10px;
    border-bottom: solid 1px #ccc;
    .title {
      color: #666;
      font-size: 16px;
    }
  }
  // 申请人信息
  .applyer-info {
    background-color: #f9f9f9;
    padding: 0 15px 0 30px;
    margin-bottom: 15px;
    .info-item {
      display: inline-block;
      height: 45px;
      line-height: 45px;
      margin-right: 60px;
      font-size: 14px;
      .item-label {
        font-weight: 700;
      }
      .item-val {
      }
    }
  }
}
</style>
