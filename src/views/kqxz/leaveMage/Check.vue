<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">请假审批</h2>
    </div>
    <div class="tab-wrap">
      <Tabs :value="listParams.status" :animated="false" @on-click="handleSwitchTab">
        <TabPane :label="item.name" :name="item.value" v-for="(item, index) of statusList" :key="index"></TabPane>
      </Tabs>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData" @on-row-click="handleRowClick">
        <template slot="type" slot-scope="{ row, index }">
          <span>{{row.type|convertLeveaType(leaveTypes)}}</span>
        </template>
        <template slot="daycount" slot-scope="{ row, index }">
          <span>{{row.days?row.days:"0"}}天{{row.hours?row.hours:"0"}}小时</span>
        </template>
        <template slot="result" slot-scope="{ row, index }">
          <span :class="row.result|setStatusClass">{{row.result|convertStatus}}</span>
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
  name: "Check",
  data() {
    return {
      statusList: [
        {name: "待审核", value: "0"},
        {name: "已审核", value: "1"},
        {name: "已完成", value: "2"},
        {name: "全部", value: "4"},
        {name: "已退回", value: "3"},
      ],
      tableColumns: [
        {
          title: '申请人',
          key: 'user_name'
        },
        {
          title: '部门',
          key: 'dept_name'
        },
        {
          title: '申请时间',
          key: 'apply_time'
        },
        {
          title: '请假类别',
          key: 'type',
          slot: 'type',
        },
        {
          title: '请假天数',
          key: 'daycount',
          slot: 'daycount',
        },
        {
          title: '审批结果',
          key: 'result',
          slot: 'result',
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
      this.$router.push({name: "leaveMage_detail", query: {apply_guid: rowItem.apply_guid, now_step_guid: rowItem.now_step_guid}})
    },

    //数据处理
    transformData(sourceData) {
      let newData = sourceData.map(item => {
        item.apply_time = item.apply_time ? formatTimestamp(item.apply_time*1000, "YYYY-MM-DD HH:mm") : "-"
        return item
      })
      return newData
    },

    // 拉取列表数据
    async getTabeData() {
      try {
        this.listParams.page = this.listCurpage
        const res = await this.$http.getLeaveCheckList(this.listParams)
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
    setStatusClass(value) {
      console.log(value)
      let sClass = ""
      if(value == 0) {
        sClass = "text-blue"
      }else if(value == 3) {
        sClass = "text-maroon"
      }
      return sClass
    },
    convertStatus(value) {
      let sText = "-"
      if(value == 0) {
        sText = "待审批"
      }else if(value == 1) {
        sText = "已批准"
      }else if(value == 3) {
        sText = "不批准"
      }
      return sText
    },
    // 请假类型转换
    convertLeveaType(typeVal, typeList) {
      let text = ''
      typeList.forEach(item => {
        if(typeVal == item.value){
          text = item.name
        }
      })
      return text
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

