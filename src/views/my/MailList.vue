<template>
  <div class="page-container">
    <h1 class="page-title">通讯录</h1>
    <div class="search-wrap">
      <div class="item-box">
        <Input placeholder="输入人员姓名" class="search-input" />
      </div>
      <div class="item-box">
        <Button type="primary">查询</Button>
      </div>
    </div>
    <div class="div-line"></div>
    <div class="main-wrap">
      <div class="tree-wrap">
        <Tree :data="treeData"></Tree>
      </div>
      <div class="content-wrap">
        <div class="table-wrap">
          <Table :columns="tableColumns" :data="tableData"></Table>
        </div>
        <div class="page-wrap">
          <Page :total="100" show-total show-elevator />
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
          expand: true,
          children: [
              {
                title: '总经办',
                expand: true,
              },
              {
                title: '技术支持',
                expand: true,
                children: [
                  {
                      title: '开放部',
                      expand: false,
                      children: [
                        {
                          title: "后端开放"
                        },
                        {
                          title: "前端开放"
                        },
                        {
                          title: "移动端开放"
                        },
                        {
                          title: "UI设计"
                        },
                        {
                          title: "测试"
                        },
                      ]
                  },
                  {
                      title: '研发部'
                  }
                ]
              }
          ]
        }
      ],
      tableColumns: [
        {
          title: '人员名称',
          key: 'name'
        },
        {
          title: '区域',
          key: 'area'
        },
        {
          title: '职务',
          key: 'duty'
        },
        {
          title: '直接上级',
          key: 'superior'
        },
      ],
      tableData: [
        {
          name: "张三丰",
          area: "广州",
          duty: "部门经理",
          superior: "李帅",
        },
        {
          name: "张三丰",
          area: "广州",
          duty: "部门经理",
          superior: "李帅",
        },
        {
          name: "张三丰",
          area: "广州",
          duty: "部门经理",
          superior: "李帅",
        },
        {
          name: "张三丰",
          area: "广州",
          duty: "部门经理",
          superior: "李帅",
        },
        {
          name: "张三丰",
          area: "广州",
          duty: "部门经理",
          superior: "李帅",
        },
        {
          name: "张三丰",
          area: "广州",
          duty: "部门经理",
          superior: "李帅",
        },
      ],
    }
  },
  methods: {

  }
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
