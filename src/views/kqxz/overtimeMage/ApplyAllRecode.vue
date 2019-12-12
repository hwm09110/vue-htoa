<template>
  <div class="apply-container allRecord">
    <div class="page-title">
      <h2 class="title">公司加班记录</h2>
      <Button type="primary" icon="ios-exit-outline" @click="handleExportData">导出统计信息表</Button>
      <Button type="primary" icon="ios-refresh" @click="handleRefresh">刷新</Button>
    </div>
    <i-form :model="formValidate" :label-width="80" ref="formValidate">
      <Form-item label="申请人" prop="name">
        <i-input v-model="formValidate.user_name" placeholder="输入申请人姓名关键字"></i-input>
      </Form-item>
      <Form-item label="部门" prop="department">
        <i-select v-model="formValidate.dept_guid" placeholder="请选择所在地">
          <i-option value>全部</i-option>
          <i-option value="shanghai">测试部门</i-option>
          <i-option value="shenzhen">iOS部门</i-option>
        </i-select>
      </Form-item>
      <Form-item label="时间范围">
        <Row>
          <i-col span="11">
            <Form-item prop="date">
              <Date-picker
                type="date"
                placeholder="开始时间"
                v-model="formValidate.stime"
                @on-change="formValidate.stime=$event"
              ></Date-picker>
            </Form-item>
          </i-col>
          <i-col span="2" style="text-align: center">-</i-col>
          <i-col span="11">
            <Form-item prop="time">
              <Date-picker
                type="date"
                placeholder="结束时间"
                v-model="formValidate.etime"
                @on-change="formValidate.etime=$event"
              ></Date-picker>
            </Form-item>
          </i-col>
        </Row>
      </Form-item>
      <Form-item>
        <i-button type="primary" icon="ios-search" @click="handleSeach">查询</i-button>
      </Form-item>
    </i-form>
    <Table
      height="calc(100% - 220px)"
      :columns="table.columns"
      :data="table.data"
      @on-row-click="handleRowClick"
    >
      <template slot-scope="{ row }" slot="stime">{{ row.stime | formatTime }}</template>
      <template slot-scope="{ row }" slot="hours">{{ row.hours | formatHours }}</template>
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
    formatTime(dateStr) {
      if (dateStr.length === 10) {
        return moment(new Date(parseInt(dateStr) * 1000)).format(
          "YYYY-MM-DD HH:mm"
        );
      } else if (dateStr.length === 13) {
        return moment(new Date(parseInt(dateStr))).format("YYYY-MM-DD HH:mm");
      } else {
        return `--`;
      }
    }
  },
  data() {
    return {
      listCount: 0,
      listLen: 10,
      currentPage: 1,
      formValidate: {
        user_name: "",
        dept_guid: "",
        stime: "",
        etime: ""
      },
      table: {
        columns: [
          {
            title: "申请人",
            key: "user_name"
          },
          {
            title: "部门",
            key: "dept_name"
          },
          {
            title: "加班时间",
            key: "stime",
            slot: "stime"
          },
          {
            title: "加班内容",
            key: "content"
          },
          {
            title: "加班地点",
            key: "place"
          },
          {
            title: "加班时长",
            key: "hours",
            slot: "hours"
          },
          {
            title: "加班费",
            key: "money"
          }
        ],
        data: []
      }
    };
  },
  methods: {
    init() {
      this.getAllApplyList();
    },
    handleListPage() {
      this.init();
    },
    handleSeach() {
      this.currentPage = 1;
      this.init();
    },
    handleRefresh() {
      this.init();
    },
    handleExportData() {
      // TODO:导出表格
    },
    handleRowClick(data, index) {
      console.log("点击table行", data);
    },
    // 拉取公司加班记录
    async getAllApplyList() {
      try {
        const res = await this.$http.getOvertimeAllApplyList(
          Object.assign({}, this.formValidate, {
            page: this.currentPage
          })
        );
        if (res.code === "200") {
          const { info, count, len } = res.extraData;
          this.listCount = parseInt(count);
          this.listLen = len;
          this.table.data = info;
        } else {
          this.$Message.warning(res.message);
        }
      } catch (error) {
        throw error;
      }
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.allRecord {
  /deep/ .ivu-form {
    display: flex;
    flex-wrap: wrap;
    &-item {
      &:not(:last-of-type) {
        margin-right: 30px;
      }
      &:last-of-type {
        width: 100%;
        .ivu-form-item-content {
          margin-left: 0 !important;
        }
        .ivu-btn {
          padding: 0 30px;
        }
      }
    }
  }
  /deep/ .ivu-page {
    display: flex;
    justify-content: flex-end;
    margin: 15px 0;
  }
  .page-title {
    display: flex;
    h2 {
      flex: 1;
    }
    /deep/ .ivu-btn {
      margin-left: 16px;
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
