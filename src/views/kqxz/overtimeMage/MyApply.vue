<template>
  <div class="apply-container myApply">
    <div class="page-title">
      <h2 class="title">我的申请</h2>
    </div>
    <div class="tab">
      <Tabs :value="status" :animated="false" @on-click="handleTabsClick">
        <TabPane v-for="item of tabPanes" :key="item.name" :label="item.label" :name="item.name"></TabPane>
      </Tabs>
      <Button type="primary" icon="ios-refresh" @click="handleRefresh">刷新</Button>
    </div>
    <Table
      height="calc(100% - 220px)"
      :columns="table.columns"
      :data="table.data"
      @on-row-click="handleRowClick"
    >
      <template slot-scope="{ row }" slot="hours">{{ row.hours | formatHours }}</template>
      <template slot-scope="{ row }" slot="apply_time">{{ row.apply_time | formatApplyTime }}</template>
      <template
        slot-scope="{ row }"
        slot="process_status"
      >{{ row.process_status | formatProcessStatus }}</template>
    </Table>
    <Page
      :current.sync="currentPage"
      :total="listCount"
      :page-size="listLen"
      show-total
      show-elevator
      @on-change="handleListPage"
    />
  </div>
</template>

<script>
import moment from "moment";
export default {
  filters: {
    formatHours(num) {
      return `${num}小时`;
    },
    formatApplyTime(dateStr) {
      if (dateStr.length === 10) {
        return moment(new Date(parseInt(dateStr) * 1000)).format(
          "YYYY-MM-DD HH:mm"
        );
      } else if (dateStr.length === 13) {
        return moment(new Date(parseInt(dateStr))).format("YYYY-MM-DD HH:mm");
      } else {
        return `--`;
      }
    },
    formatProcessStatus(status) {
      if (status == 1) {
        return `待审核`;
      } else if (status == 2) {
        return `已批准`;
      } else if (status == 3) {
        return `不批准`;
      } else if (status == 4) {
        return `已撤回`;
      } else {
        return `未知状态`;
      }
    }
    // "process_status": "4"    //流程状态：1待审核 2已批准 3不批准 4已撤回
  },
  data() {
    return {
      tabPanes: [
        { label: "处理中", name: "1" },
        { label: "已完成", name: "2" },
        { label: "所有", name: "0" },
        { label: "已退回", name: "3" },
        { label: "已撤回", name: "4" }
      ],
      status: "0", // 全部0 处理中1 已退回3 已撤销4 已完成2
      currentPage: 1,
      listCount: 0,
      listLen: 10,
      table: {
        columns: [
          {
            title: "加班时长",
            key: "hours",
            slot: "hours"
          },
          {
            title: "加班费",
            key: "money"
          },
          {
            title: "申请时间",
            key: "apply_time",
            slot: "apply_time"
          },
          {
            title: "下一步操作人",
            key: "operator_name"
          },
          {
            title: "审批结果",
            key: "process_status",
            slot: "process_status"
          }
        ],
        data: []
      }
    };
  },
  methods: {
    init() {
      this.getMyApplyList();
    },
    handleTabsClick(name) {
      this.status = name;
      this.currentPage = 1;
      this.init();
    },
    handleListPage() {
      this.init();
    },
    handleRefresh() {
      this.init();
    },
    handleRowClick(data) {
      console.log("我的申请记录表格行数据", data);
      this.$router.push({
        path: `myDetail?apply_guid=${data.apply_guid}&now_step_guid=${data.now_step_guid}`
      });
    },
    // 拉取列表数据
    async getMyApplyList() {
      try {
        const res = await this.$http.getOvertimeMyApplyList({
          page: this.currentPage,
          status: this.status
        });
        console.log(res);
        if (res.code === "200") {
          const { info, count, len } = res.extraData;
          this.listCount = parseInt(count);
          this.listLen = len;
          this.table.data = info;
        } else {
          this.$Message.warning(res.message);
        }
      } catch (err) {
        throw err;
      }
    }
  },
  created() {
    this.init();
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
  > .tab {
    position: relative;
    /deep/ .ivu-btn {
      position: absolute;
      top: 0;
      right: 60px;
    }
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
    }
  }
}
</style>
