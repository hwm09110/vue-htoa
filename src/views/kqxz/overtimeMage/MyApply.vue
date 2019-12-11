<template>
  <div class="apply-container myApply">
    <div class="page-title">
      <h2 class="title">我的申请</h2>
    </div>
    <div class="tab">
      <Tabs value="all" :animated="false">
        <TabPane label="处理中" name="inPutrocessing"></TabPane>
        <TabPane label="已完成" name="completed"></TabPane>
        <TabPane label="所有" name="all"></TabPane>
        <TabPane label="已退回" name="hasBeenReturned"></TabPane>
        <TabPane label="已撤回" name="withdrawn"></TabPane>
      </Tabs>
      <i-button type="primary" icon="refresh">刷新</i-button>
    </div>
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
            title: "加班时长",
            key: "overtimeHours"
          },
          {
            title: "加班费",
            key: "cost"
          },
          {
            title: "申请时间",
            key: "time"
          },
          {
            title: "下一步操作人",
            key: "nextOperator"
          },
          {
            title: "审批结果",
            key: "result"
          }
        ],
        // 处理中
        inPutrocessing: [
          {
            overtimeHours: "1小时",
            cost: "--",
            time: "2016-10-03 12:32",
            nextOperator: "梧桐语",
            result: "待审批"
          }
        ],
        // 已完成
        completed: [
          {
            overtimeHours: "1小时",
            cost: "--",
            time: "2016-10-03 12:32",
            nextOperator: "梧桐语",
            result: "已批准"
          }
        ],
        // 所有
        all: [
          {
            overtimeHours: "1小时",
            cost: "--",
            time: "2016-10-03 12:32",
            nextOperator: "梧桐语",
            result: "已撤销"
          },
          {
            overtimeHours: "1小时",
            cost: "--",
            time: "2016-10-03 12:32",
            nextOperator: "梧桐语",
            result: "待审批"
          },
          {
            overtimeHours: "1小时",
            cost: "--",
            time: "2016-10-03 12:32",
            nextOperator: "梧桐语",
            result: "不批准"
          },
          {
            overtimeHours: "1小时",
            cost: "--",
            time: "2016-10-03 12:32",
            nextOperator: "梧桐语",
            result: "已批准"
          }
        ],
        // 已退回
        hasBeenReturned: [
          {
            overtimeHours: "1小时",
            cost: "--",
            time: "2016-10-03 12:32",
            nextOperator: "梧桐语",
            result: "不批准"
          }
        ],
        // 已撤回
        withdrawn: [
          {
            overtimeHours: "1小时",
            cost: "--",
            time: "2016-10-03 12:32",
            nextOperator: "梧桐语",
            result: "已撤销"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.myApply {
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
