<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">通知中心</h2>
    </div>
    <div class="search-wrap" style="display:none;">
      <div class="item-box">
        <span class="label">工作流 </span>
        <Select class="search-select">
            <Option v-for="item in cateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="item-box">
        <span class="label">创建时间 </span>
        <DatePicker type="date" placeholder="开始时间" class="search-time"></DatePicker> 至 
        <DatePicker type="date" placeholder="结束时间" class="search-time"></DatePicker>
      </div>
      <br/>
      <div class="item-box">
        <span class="label">审核内容 </span>
        <Input placeholder="输入审核内容" class="search-input" />
      </div>
      <div class="item-box">
        <Button type="primary">查询</Button>
      </div>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData"></Table>
    </div>
    <div class="page-wrap">
      <Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "NoticeList",
  data() {
    return {
      cateList: [],
      tableColumns: [
        {
          title: '通知标题',
          key: 'sn_title'
        },
        {
          title: '通知内容',
          key: 'sn_content'
        },
        {
          title: '时间',
          key: 'insert_time'
        },
      ],
      tableData: [],
      listCount: 0,
      listLen: 10,
      listCurpage: 1,

      listParams: {
        page: 1
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {

    //分页
    handleListPage() {
      this.init()
    },

    // 拉取列表数据
    async getTabeData() {
      try {
        this.listParams.page = this.listCurpage
        this.listParams.user_guid = this.userInfo.user_guid
        const res = await this.$http.getNoticeList(this.listParams)
        console.log(res)
        if(res.code ===  '200'){
          const { info, count, len } = res.extraData
          this.listCount = parseInt(count)
          this.listLen = len
          this.tableData = info
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
      let sClass = ""
      if(value == 1) {
        sClass = ""
      }else if(value == 2) {
        sClass = "text-blue"
      }else if(value == 3) {
        sClass = "text-maroon"
      }
      return sClass
    },
    convertStatus(value) {
      let sText = ""
      if(value == 1) {
        sText = "进行中"
      }else if(value == 2) {
        sText = "已完成"
      }else if(value == 3) {
        sText = "已退回"
      }
      return sClass
    }
  }
}
</script>


<style lang="scss" scoped>

</style>

