<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">我的申请</h2>
    </div>
    <div class="search-wrap">
      <div class="item-box">
        <span class="label">状态 </span>
        <Select class="search-select" v-model="listParams.type">
            <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
      </div>
      <div class="item-box">
        <span class="label">关键字 </span>
        <Input placeholder="输入标题关键字" class="search-input" clearable v-model="listParams.keyword" />
      </div>
      <div class="item-box">
        <Button type="primary" @click="handleSearch">查询</Button>
      </div>
    </div>
    <div class="table-wrap">
      <Table :columns="tableColumns" :data="tableData">
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
export default {
  name: "ApplyList",
  data() {
    return {
      statusList: [
        {name: "全部", value: 0},
        {name: "进行中", value: 1},
        {name: "已完成", value: 2},
        {name: "已退回", value: 3},
        {name: "已撤销", value: 4},
      ],
      tableColumns: [
        {
          title: '工作流',
          key: 'apply_name'
        },
        {
          title: '当前节点',
          key: 'now_step_name'
        },
        {
          title: '创建时间',
          key: 'apply_time'
        },
        {
          title: '流程状态',
          key: 'process_status',
          slot: 'process_status',
        },
      ],
      tableData: [],

      listCount: 0,
      listLen: 10,
      listCurpage: 1,
      listParams: {
        type: 1,
        keyword: "",
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
      this.listParams.type = name
      this.init()
    },

    //分页
    handleListPage() {
      this.init()
    },

    // 拉取列表数据
    async getTabeData() {
      try {
        this.listParams.page = this.listCurpage
        const res = await this.$http.getApplyList(this.listParams)
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
      }else if(value == 3 || value == 4) {
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
      }else if(value == 4) {
        sText = "已撤销"
      }
      return sText
    }
  }
}
</script>


<style lang="scss" scoped>


</style>

