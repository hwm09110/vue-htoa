<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">通讯录</h2>
    </div>
    <div class="search-wrap">
      <div class="item-box">
        <Input placeholder="输入人员姓名" class="search-input" v-model="listParams.kw" />
      </div>
      <div class="item-box">
        <Button type="primary" @click="handleSearch">查询</Button>
      </div>
    </div>
    <div class="div-line"></div>
    <div class="main-wrap">
      <div class="tree-wrap">
        <Tree :data="treeData" @on-select-change="handleNodeSelect"></Tree>
      </div>
      <div class="content-wrap">
        <div class="table-wrap">
          <Table :columns="tableColumns" :data="tableData" @on-row-click="handleRowClick"></Table>
        </div>
        <div class="page-wrap">
          <Page :current.sync="listCurpage" :total="listCount" :page-size="listLen" show-total show-elevator @on-change="handleListPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MailList",
  data() {
    return {
      treeData: [
        {
          title: '宏途',
          guid: "0",
          expand: true,
          children: []
        }
      ],
      tableColumns: [
        {
          title: '人员名称',
          key: 'user_name'
        },
        {
          title: '所属部门',
          key: 'dept_name'
        },
        {
          title: '区域',
          key: 'location_name'
        },
        {
          title: '职务',
          key: 'duty'
        },
        {
          title: '直接上级',
          key: 'monitor_name'
        },
      ],
      tableData: [],

      listCount: 0,
      listLen: 10,
      listCurpage: 1,
      listParams: {
        dept_guid: "",
        kw: "",
        page: 1,
      }
    }
  },
  methods: {

    // 搜索
    handleSearch() {
      this.listParams.page = 1
      this.init()
    },

    //分页
    handleListPage() {
      this.init()
    },

    //选中树节点
    handleNodeSelect(node) {
      console.log('node', node)
      const dept_guid = node[0] && node[0]["guid"]
      this.listParams.dept_guid = dept_guid
      this.listParams.page = 1
      this.getTabeData()
    },

    //点击行
    handleRowClick(rowItem) {
      console.log(rowItem)
      this.$router.push({name: "my_txlDetail", query: {user_guid: rowItem.user_guid}})
    },
    

    //数据处理
    transformData(sourceData) {
      let newData = sourceData.map(item => {
        item.monitor_name = item.monitor_name ? item.monitor_name : "-"
        return item
      })
      return newData
    },

    // 拉取列表数据
    async getTabeData() {
      try {
        this.listParams.page = this.listCurpage
        const res = await this.$http.getTxlList(this.listParams)
        console.log(res)
        if(res.code ===  '200'){
          const { user, count, len } = res.extraData
          this.listCount = parseInt(count)
          this.listLen = len
          this.tableData = this.transformData(user)
        }else{
          this.$Message(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },

    // 处理tree数据
    handleTreeData(sourceData) {
      let newData = []
      if(sourceData.length == 0) {
        return newData
      }

      sourceData.forEach(item => {
        let child = item.child
        let newItem = {title: item.dept_name, guid: item.dept_guid}
        if(child.length > 0) {
          newItem.children = this.handleTreeData(child)
        }
        newData.push(newItem)
      })

      return newData
    },

    // 拉取部门tree数据
    async getTreeData() {
      try {
        const res = await this.$http.getDeptsLevel()
        console.log(res)
        if(res.code ===  '200'){
          let treeData = this.handleTreeData(res.extraData)
          console.log(treeData)
          this.treeData[0]["children"] = treeData
        }else{
          this.$Message.warning(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },

    init() {
      this.getTreeData()
      this.getTabeData()
    }
  },
  created() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.main-wrap{
  margin-top: 20px;
  display: flex;
  .tree-wrap{
    width: 200px;
    max-height: 800px;
    overflow: auto;
  }
  .content-wrap{
    flex: 1;
  }
}
</style>
