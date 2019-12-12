<template>
  <div class="Setting">
    <h4 class="Setting-title">流程设置</h4>
    <header style="margin-top:15px">
        <Form  inline>
          <FormItem label="按流程类型筛选:" style="width:500px" >
            <Select v-model="formInline.type_guid" style="width:200px" @on-change="onSelectChange" clearable >
                <Option v-for="(item,key) in typeData" :value="item.type_guid" :key="key">{{ item.type_name }}</Option>
            </Select>
          </FormItem>
        </Form>
    </header>
    
    <Row class="Setting-addBtn" >
      <i-button type="info" @click="handleBtn('add')">新增</i-button>
    </Row>
    <Table stripe :columns="columns" :data="data">
      <template slot-scope="{ row }" slot="action">
        <!-- <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button> -->
        <!-- <Button type="error" size="small" @click="remove(index)">删除</Button> -->
        <span class="edit" @click="handleBtn('setting',row)">步骤设置</span>
        <span class="edit" @click="handleBtn('edit',row)">编辑</span>
        <span class="delete" @click="remove(row)">删除</span>
      </template>
    </Table>
    <Modal :title="type== 'add'?'添加':'编辑'" v-model="moda" :mask-closable="false" :loading="loading" :transfer="false" @on-ok="handleOk('addForm')" @on-cancel="handleCancel('addForm')" >
      <div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
      <Form ref="addForm" :model="addForm" :label-width="120" :rules="ruleForm" label-position="left">
        <FormItem label="流程名称" prop="p_name" >
          <Input v-model="addForm.p_name" />
        </FormItem>
        <FormItem label="流程序号" prop="sort" >
          <InputNumber :min="1" v-model="addForm.sort"></InputNumber>
        </FormItem>
        <FormItem label="所属分类" prop="type_guid" >
          <Select v-model="addForm.type_guid" style="width:200px"   >
              <Option v-for="(item,key) in typeData" :value="item.type_guid" :key="key">{{ item.type_name }}</Option>
          </Select>
        </FormItem>
        <FormItem label="绑定表单" prop="apply_url" >
          <Select v-model="addForm.form_guid" style="width:200px"  >
              <Option v-for="(item,key) in formData" :value="item.form_id" :key="key">{{ item.form_name }}</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "流程信息",
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
          title: "流程名称",
          key: "p_name"
        },
        {
          title: "操作",
          slot: "action",
          width: 250,
          align: "center"
        }
      ],
      data: [
    
      ],
      typeData:[],
      formData:[],
      addForm: {
        p_name: "",
        sort: 1,
        type_guid:'',
        form_guid:'',
        p_guid:''
      },
      ruleForm:{
        p_name: [
            { required: true, message: '表单名称不能为空', trigger: 'blur' }
        ],
        sort: [
            { type:'number', required: true, message: '表单序号不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  created(){
    this.getProcessType();
    this.getFormshow();
    this.getProcessShow();
  },
  methods: {
   // 获取流程类型列表
    getProcessType(){
      this.$http.getProcessType().then( res => {
        if(res.code == 200){
          this.typeData = res.extraData.ptype
        }
      })
    },
    // 获取表单列表
    getFormshow(){
      this.$http.getFormshow().then( res => {
        if(res.code == 200){
          this.formData = res.extraData
        }
        console.log(this.formData);
      })
    },
    // 获取列表
    getProcessShow(){
      this.$http.getProcessShow({
        type_guid:this.formInline.type_guid
      }).then( res => {
        if(res.code == 200){
          this.data = res.extraData
        }
      })
    },
    onSelectChange(){
      this.getProcessShow();
    },
    onSelectFormChange(){

    },
    // 编辑回填
    fillForm(item){
      this.addForm.p_name = item.p_name
      this.addForm.sort = parseInt(item.sort)
      this.addForm.type_guid = item.type_guid
      this.addForm.form_guid = item.form_guid
      this.addForm.p_guid = item.p_guid
      
    },
    handleBtn(type,item){
      switch(type){
        case 'add':
            this.type = 'add';
            this.moda = true;
            if(this.typeData.length){
              this.addForm.type_guid = this.typeData[0].type_guid
            }
            if(this.formData.length){
              this.addForm.form_guid = this.formData[0].form_id
            }
          break;
        case 'edit':
            this.type = 'edit';
            this.moda = true;    
            this.fillForm(item);      
          break;  
        case 'setting':
            this.$router.push({ name: "processMage_settingStep" ,query:{guid:item.p_guid,name:item.p_name}});
          break;   
      }
    },
    async handleType(){
      let res = '';
      if(this.type == 'add'){
        delete this.addForm.p_guid
        res = await this.$http.addProcessShow(this.addForm)
      }else {
        res = await this.$http.editProcessShow(this.addForm)
        
      }
      if(res.code == 200){
        this.moda = false;
        this.handleCancel('addForm');
        this.getProcessShow();
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
    delProcessShow(p_guid){
      this.$http.delProcessShow({p_guid}).then( res => {
        if(res.code == 200){
          this.getProcessShow();
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
              this.delProcessShow(item.p_guid);
          },
          onCancel: () => {
            
          }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.Setting {
  .Setting-addBtn{
  
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