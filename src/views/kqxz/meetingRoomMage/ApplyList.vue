<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">我的预约</h2>
    </div>
    <div class="tab-wrap">
      <Tabs :value="listParams.status" :animated="false" @on-click="handleSwitchTab">
        <TabPane :label="item.name" :name="item.value" v-for="(item, index) of statusList" :key="index"></TabPane>
      </Tabs>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData" @on-row-click="handleRowClick">
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
export default {
  name: "ApplyList",
  data() {
    return {
      statusList: [
        {name: "处理中", value: "1"},
        {name: "已完成", value: "2"},
        {name: "已退回", value: "3"},
        {name: "全部", value: "0"},
        {name: "已撤销", value: "4"},
      ],
      tableColumns: [
        {
          title: '会议主题',
          key: 'theme'
        },
        {
          title: '会议室',
          key: 'room_name'
        },
        {
          title: '会议开始时间',
          key: 'stime'
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
      this.listParams.type = name
      this.init()
    },

    //分页
    handleListPage() {
      this.init()
    },

    //点击行查看详情
    handleRowClick(rowItem) {
      console.log(rowItem)
      this.$router.push({name: "meetingRoomMage_detail", query: {apply_guid: rowItem.apply_guid, now_step_guid: rowItem.now_step_guid}})
    },

    //数据处理
    transformData(sourceData) {
      let newData = sourceData.map(item => {
        item.stime = item.stime ? formatTimestamp(item.stime*1000, "YYYY-MM-DD HH:mm") : "-"
        return item
      })
      return newData
    },

    // 拉取列表数据
    async getTabeData() {
      try {
        this.listParams.page = this.listCurpage
        const res = await this.$http.getBoardRoomApplyList(this.listParams)
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
        sClass = ""
      }else if(value == 3 || value == 4 || value == 5) {
        sClass = "text-maroon"
      }else{
        sClass = "text-blue"
      }
      return sClass
    },
    convertStatus(value) {
      let sText = ""
      if(value == 2) {
        sText = "预约成功"
      }else if(value == 3) {
        sText = "不批准"
      }else if(value == 4) {
        sText = "已撤销"
      }else if(value == 5) {
        sText = "取消预约"
      }else{
        sText = "待审批"
      }
      return sText
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

