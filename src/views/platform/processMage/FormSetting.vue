<template>
  <div class="formTypeSetting">
    <h4 class="formTypeSetting-title">表单设置</h4>
    <header style="margin-top:15px">
        <Form  inline>
          <FormItem label="按表单类型筛选:" style="width:500px" >
            <Select v-model="formInline.type_guid" style="width:200px" @on-change="onSelectChange" clearable >
                <Option v-for="item in typeData" :value="item.type_guid" :key="item.type_guid">{{ item.type_name }}</Option>
            </Select>
          </FormItem>
        </Form>
    </header>
    
    <Row class="formTypeSetting-addBtn" >
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
      <Form ref="addForm" :model="addForm" :label-width="120" :rules="ruleForm" label-position="left">
        <FormItem label="表单名称" prop="name" >
          <Input v-model="addForm.name" />
        </FormItem>
        <FormItem label="表单序号" prop="sort" >
          <InputNumber :min="1" v-model="addForm.sort"></InputNumber>
        </FormItem>
        <FormItem label="所属分类" prop="type_guid" >
          <Select v-model="addForm.type_guid" style="width:200px"   >
              <Option v-for="item in typeData" :value="item.type_guid" :key="item.type_guid">{{ item.type_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="申请页面url" prop="apply_url" >
          <Input v-model="addForm.apply_url" />
        </FormItem>
        <FormItem label="详情页面url" prop="detail_url" >
          <Input v-model="addForm.detail_url" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "表单信息",
      formInline:{
        type_guid:'',
      },
      
      type:'add',
      loading:true,
      moda: false,
      columns: [
        {
          title: "序号",
          key: "sort"
        },
        {
          title: "表单名称",
          key: "form_name"
        },
        {
          title: "所属分类",
          key: "type_name"
        },
        {
          title: "对应申请页面url",
          key: "apply_url"
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
      typeData:[],
      addForm: {
        name: "",
        sort: 1,
        type_guid:'',
        apply_url:'',
        detail_url:'',
        form_guid:''
      },
      ruleForm:{
        name: [
            { required: true, message: '表单名称不能为空', trigger: 'blur' }
        ],
        sort: [
            { type:'number', required: true, message: '表单序号不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  created(){
    this.getFormtype();
    this.getFormshow();
  },
  methods: {
        // 获取表单列表
    getFormtype(){
      this.$http.getFormtype().then( res => {
        if(res.code == 200){
          this.typeData = res.extraData;
          if(this.typeData.length){
            this.addForm.type_guid = this.typeData[0].type_guid
          }
        }

      })
    },
    // 获取列表
    getFormshow(){
      this.$http.getFormshow({
        type_guid:this.formInline.type_guid
      }).then( res => {
        if(res.code == 200){
          this.data = res.extraData
        }
      })
    },
    onSelectChange(){
      this.getFormshow();
    },
    // 编辑回填
    fillForm(item){
      this.addForm.name = item.form_name
      this.addForm.sort = parseInt(item.sort)
      this.addForm.type_guid = item.type_guid
      this.addForm.apply_url = item.apply_url
      this.addForm.detail_url = item.detail_url
      this.addForm.form_guid = item.form_guid
      
    },
    handleBtn(type,item){
      switch(type){
        case 'add':
            this.type = 'add';
            this.moda = true;
            if(this.typeData.length){
              this.addForm.type_guid = this.typeData[0].type_guid
            }
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
        delete this.addForm.form_guid
        res = await this.$http.addFormshow(this.addForm)
      }else {
        res = await this.$http.editFormshow(this.addForm)
        
      }
      if(res.code == 200){
        this.moda = false;
        this.handleCancel('addForm');
        this.getFormshow();
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
    delFormshow(form_guid){
      this.$http.delFormshow({form_guid}).then( res => {
        if(res.code == 200){
          this.getFormshow();
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
              this.delFormshow(item.form_guid);
          },
          onCancel: () => {
            
          }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.formTypeSetting {
  .formTypeSetting-addBtn{
  
  }
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