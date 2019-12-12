<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">公司出差记录</h2>
      <div class="top-btn">
        <Button type="primary" class="btn" @click="handleExport">
          <Icon type="ios-download-outline" size="22" style="vertical-align:middle;"/>
          <span style="vertical-align:middle;">导出统计信息表</span>
        </Button>
        <Button class="btn" type="primary" @click="handleRefresh">
          <Icon type="ios-refresh" size="22" style="vertical-align:middle;"/>
          <span style="vertical-align:middle;">刷新</span>
        </Button>
      </div>
    </div>
    <div class="search-wrap">
      <div class="item-box">
        <span class="label">申请人 </span>
        <Input v-model="listParams.user_name" clearable placeholder="输入申请人姓名" class="search-input" />
      </div>
      <div class="item-box">
        <span class="label">部门 </span>
        <Input v-model="listParams.dept_name"  @click.native="handleChooseDept" placeholder="点击选择部门" readonly class="search-input" />
      </div>
      <div class="item-box">
        <span class="label">出差地点 </span>
        <Input v-model="listParams.location" clearable placeholder="输入地点关键字" class="search-input" />
      </div>
      <br/>
      <div class="item-box">
        <span class="label">时间范围 </span>
        <DatePicker v-model="listParams.stime" @on-change="date =>{ (listParams.stime = date) }"  type="date" placeholder="开始时间" class="search-time"></DatePicker> 至 
        <DatePicker v-model="listParams.etime" @on-change="date =>{ (listParams.etime = date) }"  type="date" placeholder="结束时间" class="search-time"></DatePicker>
      </div>
      <div class="item-box">
        <Button type="primary" @click="handleSearch">查询</Button>
      </div>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData" @on-row-click="handleRowClick"></Table>
    </div>
    <div class="page-wrap">
      <Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
    </div>


    <!-- 选择部门 弹窗 -->
    <ChooseDeptModal :show.sync="showChooseDeptModal" @on-finish="handleFinishChooseDept" />

  </div>
</template>

<script>
import { formatTimestamp } from "@/utils/moment"
import ChooseDeptModal from "@c/common/ChooseDeptModal"
export default {
  components: {
    ChooseDeptModal
  },
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
          title: '出差开始时间',
          key: 'sdate'
        },
        {
          title: '出差结束时间',
          key: 'edate'
        },
        {
          title: '出差地点',
          key: 'location'
        },
      ],
      tableData: [],

      listCount: 0,
      listLen: 10,
      listCurpage: 1,
      listParams: {
        user_name: "", //申请人
        dept_name: "", //部门名称
        dept: "", //部门guid
        type: "", //请假类别
        stime: "",
        etime: "",
        page: 1,
      },

      showChooseDeptModal: false, //显示选择部门弹窗
    }
  },
  methods: {
    // 搜索
    handleSearch() {
      this.listCurpage = 1
      this.init()
    },

    //选择部门
    handleChooseDept() {
      this.showChooseDeptModal = true
    },

    //选择好部门
    handleFinishChooseDept(res) {
      console.log(res)
      this.listParams.dept_name = res.dept_guid ? res.dept_name : ""
      this.listParams.dept = res.dept_guid
      this.listParams.page = 1
      this.getTabeData()
    },

    //导出
    handleExport() {
      let conds = this.listParams
      let params = ''
      for(let p in conds){
        params += p +'='+ conds[p]+ '&'
      }
      params = params.substring(0, params.length - 1)
      const url = this.$http.exportBusinesstripAllList() + `?${ params }&dc=1`
      console.log(url)
      window.open(url)
    },

    //刷新
    handleRefresh() {
      this.listCurpage = 1
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
        item.edate = item.edate ? formatTimestamp(item.edate*1000, "YYYY-MM-DD HH:mm") : "-"
        return item
      })
      return newData
    },

    // 拉取列表数据
    async getTabeData() {
      try {
        this.listParams.page = this.listCurpage
        const res = await this.$http.getBusinesstripAllList(this.listParams)
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
  }
}
</script>


<style lang="scss" scoped>
</style>

