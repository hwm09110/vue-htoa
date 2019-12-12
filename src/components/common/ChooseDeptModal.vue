<template>
  <div class="custom-modal-wrap">
    <!-- 选择部门弹窗 start -->
    <Modal
        v-model="isShow"
        width="500"
        title="选择部门"
        class-name="vertical-center-modal"
        @on-ok="handleOk"
    >
    <div class="modal-content-wrap">
      <div class="tree-wrap">
        <Tree :data="treeData" ref="deptTree"></Tree>
      </div>
    </div>
    </Modal>
    <!-- 选择部门弹窗 end -->
  </div>
</template>

<script>
export default {
  name: 'ChooseDeptModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      isShow: false,
      treeData: [
        {
          title: '宏途',
          guid: "",
          expand: true,
          children: []
        }
      ],
    }
  },
  watch: {
    'show': function(newVal, oldVal){
      this.isShow = newVal
    },
    'isShow': function(newVal, oldVal){
      this.$emit('update:show', newVal)
    },
  },
  methods: {

    handleOk() {
      const selectedNodes = this.$refs['deptTree'].getSelectedNodes()
      const ret = {
        dept_guid: selectedNodes.length > 0 ? selectedNodes[0]["guid"] : "",
        dept_name: selectedNodes.length > 0 ? selectedNodes[0]["title"] : "",
      }
      this.$emit("on-finish", ret)
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
    }
  },
  created() {
    this.init()
  }
}
</script>


<style lang="scss" scoped>
.tree-wrap{
  height: 550px;
  overflow: auto;
}
</style>
