<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">我的申请记录</h2>
      <div class="top-btn">
        <Button type="primary" class="btn" @click="handleRefresh">刷新</Button>
      </div>
    </div>
    <div class="tab-wrap">
      <Tabs :value="listParams.status" :animated="false" @on-click="handleSwitchTab">
        <TabPane :label="item.name" :name="item.value" v-for="(item, index) of statusList" :key="index"></TabPane>
      </Tabs>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData" @on-row-click="handleRowClick">
        <template slot="report" slot-scope="{ row, index }">
          <span :class="row.process_status|convertReportTextClass(row)">{{row.report|convertReportText(row)}}</span>
        </template>
        <template slot="process_status" slot-scope="{ row, index }">
          <span :class="row.process_status|setStatusClass(row)">{{row.process_status|convertStatus(row)}}</span>
        </template>
      </Table>
    </div>
    <div class="page-wrap">
      <Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
    </div>
  </div>
</template>

<script>
import { formatTimestamp } from "@/utils/moment"
import { mapState } from 'vuex'
export default {
  name: "ApplyList",
  data() {
    return {
      statusList: [
        {name: "处理中", value: "1"},
        {name: "已完成", value: "2"},
        {name: "全部", value: "0"},
        {name: "已退回", value: "3"},
        {name: "已撤销", value: "4"},
      ],
      tableColumns: [
        {
          title: '出差时间',
          key: 'sdate'
        },
        {
          title: '出差地点',
          key: 'location'
        },
        {
          title: '出差报告',
          key: 'report',
          slot: 'report',
        },
        {
          title: '下一步操作人',
          key: 'operator_name'
        },
        {
          title: '审批结果',
          key: 'process_status',
          slot: 'process_status'
        },
      ],
      tableData: [],

      listCount: 0,
      listLen: 10,
      listCurpage: 1,
      listParams: {
        status: "0",
        page: 1,
      },
    }
  },
   computed: {
    ...mapState(["userInfo", "leaveTypes"])
  },
  methods: {
    // 搜索
    handleSearch() {
      this.listCurpage = 1
      this.listParams.status = "0"
      this.init()
    },

    //刷新
    handleRefresh() {
      this.listCurpage = 1
      this.listParams.status = "0"
      this.init()
    },

    //切换tab
    handleSwitchTab(name) {
      this.listCurpage = 1
      this.listParams.status = name
      this.init()
    },

    //分页
    handleListPage() {
      this.init()
    },

    //点击行查看详情
    handleRowClick(rowItem) {
      console.log(rowItem)
      this.$router.push({name: "businesstripMage_detail", query: {apply_guid: rowItem.apply_guid, now_step_guid: rowItem.now_step_guid}})
    },

    //数据处理
    transformData(sourceData) {
      let newData = sourceData.map(item => {
        item.sdate = item.sdate ? formatTimestamp(item.sdate*1000, "YYYY-MM-DD HH:mm") : "-"
        return item
      })
      return newData
    },

    // 拉取列表数据
    async getTabeData() {
      try {
        this.listParams.page = this.listCurpage
        const res = await this.$http.getBusinesstripApplyList(this.listParams)
        console.log(res)
        if(res.code ===  '200'){
          const { info, count, len } = res.extraData
          this.listCount = parseInt(count)
          this.listLen = len || 10
          this.tableData = this.transformData(info)
        }else{
          this.$Message.warning(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },

    init() {
      this.getTabeData()
    }
  },
  created() {
    this.init()
  },
  filters: {
    convertReportTextClass(report, rowItem) {
      let sClass = "-"

      if((rowItem.now_step_sort == 5 && rowItem.result == 1) || rowItem.now_step_sort > 5) {
        sClass = ''
      }else if(rowItem.process_status == 3) {
        sClass = ''
      }else if(rowItem.leader_report == 1 || (rowItem.report == '1' && rowItem.leader_report == '0')) {
        sClass = 'text-blue'
      }else{
        sClass = ''
      }
      return sClass
    },
    convertReportText(report, rowItem) {
      let sText = "-"

      if((rowItem.now_step_sort == 5 && rowItem.result == 1) || rowItem.now_step_sort > 5) {
        sText = '已提交'
      }else if(rowItem.process_status == 3) {
        sText = '-'
      }else if(rowItem.leader_report == 1 || (rowItem.report == '1' && rowItem.leader_report == '0')) {
        sText = '待提交/修改'
      }else{
        sText = '不需要提交'
      }
      return sText
    },
    setStatusClass(value, rowItem) {
      let sClass = ""
      if(value == 3) {
        sClass = "text-maroon"
      }else if(value == 2 || rowItem.now_step_sort > 4) {
        sClass = ""
      }else if(value == 4) {
        sClass = "text-maroon"
      }else{
        sClass = "text-blue"
      }
      return sClass
    },
    convertStatus(value, rowItem) {
      let sText = ""
      if(value == 3) {
        sText = "不批准"
      }else if(value == 2 || rowItem.now_step_sort > 4) {
        sText = "已批准"
      }else if(value == 4) {
        sText = "已撤销"
      }else{
        sText = "待审批"
      }
      return sText
    },
  }
}
</script>


<style lang="scss" scoped>

</style>

