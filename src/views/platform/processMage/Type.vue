<template>
  <div class="process">
    <h4 class="process-title">流程分类列表</h4>
    <Row class="process-addBtn">
      <i-button type="info" @click="moda =! moda">新增</i-button>
    </Row>
    <Table stripe :columns="columns12" :data="data6">
      <template slot-scope="{ row, index }" slot="action">
        <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button> -->
        <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
        <span class="edit" @click="show(index)">编辑</span>
        <span class="delete" @click="remove(index)">删除</span>
      </template>
    </Table>
    <Modal title="Title" v-model="moda" :mask-closable="false" :transfer="false">
      <div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
      <Form ref="addForm" :model="addForm" :label-width="80" label-position="left">
        <FormItem label="分类名称">
          <Input v-model="addForm.name"></Input>
        </FormItem>
        <FormItem label="排序">
          <Input v-model="addForm.order"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="error">确定</Button>
        <Button>取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "流程分类",
      moda: false,
      columns12: [
        {
          title: "序号",
          key: "order"
        },
        {
          title: "分类名称",
          key: "classification"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data6: [
        {
          order: 18,
          classification: "品牌推广"
        },
        {
          order: 24,
          classification: "人事行政"
        },
        {
          order: 30,
          classification: "采购"
        },
        {
          order: 26,
          classification: "技术服务"
        }
      ],
      addForm: {
        name: "",
        order: ""
      }
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.process {
  /deep/ .ivu {
    &-table {
      span.edit,
      span.delete {
        color: #30a5ff;
        cursor: pointer;
        margin: 0 6px;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    &-modal {
      &-header {
        border-bottom: none;
      }
      &-body {
        padding: 0 16px;
      }
      &-footer {
        border-top: none;
        > div {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
  &-title {
    font-size: 16px;
  }
  &-addBtn {
    margin: 10px 0 15px;
  }
}
</style>