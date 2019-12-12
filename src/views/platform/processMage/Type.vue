<template>
  <div class="process">
    <h4 class="process-title">流程分类列表</h4>
    <Row class="process-addBtn">
      <i-button type="info" @click="handleBtn('add')">新增</i-button>
    </Row>
    <Table stripe :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="action">
        <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button> -->
        <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
        <span class="edit" @click="handleBtn('edit',row)">编辑</span>
        <span class="delete" @click="remove(row)">删除</span>
      </template>
    </Table>
    <Modal :title="type== 'add'?'添加':'编辑'" v-model="moda" :mask-closable="false" :loading="loading" :transfer="false" @on-ok="handleOk('addForm')" @on-cancel="handleCancel('addForm')" >
      <div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
      <Form ref="addForm" :model="addForm" :label-width="80" :rules="ruleForm" label-position="left">
        <FormItem label="分类名称" prop="name" >
          <Input v-model="addForm.name" />
        </FormItem>
        <FormItem label="排序" prop="sort" >
          <InputNumber :min="1" v-model="addForm.sort"></InputNumber>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "流程分类",
      type:'add',
      loading:true,
      moda: false,
      columns: [
        {
          title: "序号",
          key: "sort"
        },
        {
          title: "分类名称",
          key: "type_name"
        },
        {
          title: "操作",
          slot: "action",
          width: 150,
          align: "center"
        }
      ],
      data: [
    
      ],
      addForm: {
        name: "",
        sort: 1,
        type_guid:''
      },
      ruleForm:{
        name: [
            { required: true, message: '分类名称不能为空', trigger: 'blur' }
        ],
        sort: [
            { type:'number', required: true, message: '分类排序不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  created(){
    this.getProcessType();
  },
  methods: {
    // 获取列表
    getProcessType(){
      this.$http.getProcessType().then( res => {
        if(res.code == 200){
          this.data = res.extraData.ptype
        }
      })
    },
    // 编辑回填
    fillForm(item){
      this.addForm.name = item.type_name
      this.addForm.sort = parseInt(item.sort)
      this.addForm.type_guid = item.type_guid
    },
    handleBtn(type,item){
      switch(type){
        case 'add':
            this.type = 'add';
            this.moda = true;
          break;
        case 'edit':
            this.type = 'edit';
            this.moda = true;    
            this.fillForm(item);      
          break;  
      }
    },
    async handleType(){
      let res = '';
      if(this.type == 'add'){
        delete this.addForm.type_guid;
        res = await this.$http.addProcessType(this.addForm)
      }else {
        res = await this.$http.editProcessType(this.addForm)
        
      }
      if(res.code == 200){
        this.moda = false;
        this.handleCancel('addForm');
        this.getProcessType();
        this.$Message.success(res.message);
      }else {
        this.loading = false;
        setTimeout(() =>{
          this.loading = true;
        },100) 
      }

    },
    handleOk(v){
    this.$refs[v].validate((valid) => {
          if (valid) {
              this.handleType();
          } else {
              this.loading = false;
              setTimeout(() =>{
              this.loading = true;
              },100)                   
          }
      })
    },
    handleCancel(name){
      this.$refs[name].resetFields();
    },
    // 删除
    delProcessType(type_guid){
      this.$http.delProcessType({type_guid}).then( res => {
        if(res.code == 200){
          this.getProcessType();
          this.$Message.success(res.message);
        }else{  
          this.$Message.error(res.message);
        }
      })
    },
    
    remove(item) {
      this.$Modal.confirm({
          title: '是否删除？',
          onOk: () => {
              this.delProcessType(item.type_guid);
          },
          onCancel: () => {
            
          }
      });
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