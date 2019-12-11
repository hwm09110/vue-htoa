<template>
  <div class="page-container">
    <div class="page-title">
        <h2 class="title">请假申请</h2>
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
        <Input v-model="listParams.user_name" placeholder="输入申请人姓名" class="search-input" />
      </div>
      <div class="item-box">
        <span class="label">部门 </span>
        <Select class="search-select" v-model="listParams.dept">
            <Option v-for="item in deptList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="item-box">
        <span class="label">请假类别 </span>
        <Select class="search-select" v-model="listParams.type">
            <Option v-for="item in leaveTypes" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </div>
      <br/>
      <div class="item-box">
        <span class="label">时间范围 </span>
        <DatePicker v-model="listParams.stime" type="date" placeholder="开始时间" class="search-time"></DatePicker> 至 
        <DatePicker v-model="listParams.etime" type="date" placeholder="结束时间" class="search-time"></DatePicker>
      </div>
      <div class="item-box">
        <Button type="primary" @click="handleSearch">查询</Button>
      </div>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData" @on-row-click="handleRowClick">
        <template slot="type" slot-scope="{ row, index }">
          <span>{{row.type|convertLeveaType(leaveTypes)}}</span>
        </template>
        <template slot="daycount" slot-scope="{ row, index }">
          <span>{{row.days?row.days:"0"}}天{{row.hours?row.hours:"0"}}小时</span>
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
  name: "AllRecord",
  data() {
    return {
      deptList: [],
      cateList: [],
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
          title: '请假类别',
          key: 'type',
          slot: 'type',
        },
        {
          title: '离开时间',
          key: 'sdate'
        },
        {
          title: '报到时间',
          key: 'edate'
        },
        {
          title: '请假天数',
          key: 'daycount',
          slot: 'daycount',
        },
      ],
      tableData: [],

      listCount: 0,
      listLen: 10,
      listCurpage: 1,
      listParams: {
        user_name: "", //申请人
        dept: "", //部门guid
        type: "", //请假类别
        stime: "",
        etime: "",
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
        item.sdate = item.sdate ? formatTimestamp(item.sdate*1000, "YYYY-MM-DD HH:mm") : "-"
        item.edate = item.edate ? formatTimestamp(item.edate*1000, "YYYY-MM-DD HH:mm") : "-"
        return item
      })
      return newData
    },

    // 拉取列表数据
    async getTabeData() {
      try {
        this.listParams.page = this.listCurpage
        const res = await this.$http.getLeaveAllList(this.listParams)
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

