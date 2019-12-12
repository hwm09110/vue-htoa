<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">我的申请记录</h2>
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
        <template slot="process_status" slot-scope="{ row, index }">
          <span :class="row.process_status|setStatusClass">{{row.process_status|convertStatus}}</span>
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
          title: '请假类别',
          key: 'type',
          slot: 'type',
        },
        {
          title: '请假天数',
          key: 'daycount',
          slot: 'daycount'
        },
        {
          title: '申请时间',
          key: 'apply_time'
        },
        {
          title: '下一步操作人',
          key: 'operator_name'
        },
        {
          title: '审批结果',
          key: 'process_status',
          slot: 'process_status',
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
      this.init()
    },

    //切换tab
    handleSwitchTab(name) {
      this.listParams.status = name
      this.listCurpage = 1
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
        const res = await this.$http.getLeaveApplyList(this.listParams)
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
      if(value == 2) {
        sClass = "text-blue"
      }else if(value == 3 || value == 4) {
        sClass = "text-maroon"
      }else{
        sClass = "text-blue"
      }
      return sClass
    },
    convertStatus(value) {
      let sText = ""
      if(value == 2) {
        sText = "已批准"
      }else if(value == 3) {
        sText = "不批准"
      }else if(value == 4) {
        sText = "已撤销"
      }else{
        sText = "待审批"
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

