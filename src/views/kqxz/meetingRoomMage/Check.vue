<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">会议室管理</h2>
    </div>
    <div class="search-wrap">
      <div class="item-box">
        <span class="label">会议开始时间 </span>
        <DatePicker v-model="listParams.stime" type="date" placeholder="开始时间" class="search-time"></DatePicker> 至 
        <DatePicker v-model="listParams.etime" type="date" placeholder="结束时间" class="search-time"></DatePicker>
      </div>
      <div class="item-box">
        <Button type="primary" @click="handleSearch">查询</Button>
      </div>
    </div>
    <div class="tab-wrap">
      <Tabs :value="listParams.status" :animated="false" @on-click="handleSwitchTab">
        <TabPane :label="item.name" :name="item.value" v-for="(item, index) of statusList" :key="index"></TabPane>
    </Tabs>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData" @on-row-click="handleRowClick">
        <template slot="result" slot-scope="{ row, index }">
          <span :class="row.result|setStatusClass(row)">{{row.result|convertStatus(row)}}</span>
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
  name: "Check",
  data() {
    return {
      statusList: [
        {name: "待审核", value: "0"},
        {name: "已审核", value: "1"},
        {name: "已完成", value: "2"},
        {name: "已退回", value: "3"},
        {name: "全部", value: "4"},
        {name: "已取消", value: "5"},
      ],
      tableColumns: [
        {
          title: '申请人',
          key: 'user_name'
        },
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
          title: '操作/结果',
          key: 'result',
          slot: 'result'
        },
      ],
      tableData: [],

      listCount: 0,
      listLen: 10,
      listCurpage: 1,
      listParams: {
        status: "0",
        stime: "",
        etime: "",
        page: 1,
      },
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      this.init()
    },

    //切换tab
    handleSwitchTab(name) {
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
        this.listParams.stime = this.listParams.stime ? (formatTimestamp(this.listParams.stime, "YYYY-MM-DD")) : ""
        this.listParams.etime = this.listParams.etime ? (formatTimestamp(this.listParams.etime, "YYYY-MM-DD")) : ""
        const res = await this.$http.getBoardRoomCheckList(this.listParams)
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
    setStatusClass(value, rowItem) {
      console.log(value)
      let sClass = ""
      if(rowItem.is_allow == 2) {
        sClass = "text-maroon"
      }else if(value == 1) {
        sClass = ""
      }else if(value == 3 || value == 4) {
        sClass = "text-maroon"
      }else{
        sClass = "text-blue"
      }
      return sClass
    },
    convertStatus(value, rowItem) {
      let sText = ""
      if(rowItem.is_allow == 2) {
        sText = "已取消"
      }else if(value == 1) {
        sText = "已批准"
      }else if(value == 3 || value == 4) {
        sText = "已退回"
      }else{
        sText = "待处理"
      }
      return sText
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

