<template>
  <div class="SettingStep">
    <h4 class="SettingStep-title">流程名称:{{p_name}}</h4>
    <Row class="SettingStep-addBtn" >
      <i-button type="info" @click="handleBtn('add')">新增</i-button>
    </Row>
    <Table stripe :columns="columns" :data="data">
       <template slot-scope="{ row }" slot="type">
         <span>{{row.type | initType() }}</span>
       </template>
      <template slot-scope="{ row }" slot="action">
        <span class="edit" @click="handleBtn('edit',row)">编辑</span>
        <span class="edit" @click="handleBtn('setting',row)">下一步骤设置</span>
        <span class="delete" @click="remove(row)">删除</span>
      </template>
    </Table>
    <Modal :title="type== 'add'?'添加':'编辑'" v-model="moda" :mask-closable="false" :loading="loading" :transfer="false" @on-ok="handleOk('addForm')" @on-cancel="handleCancel('addForm')" >
      <div slot="header" :style="{fontSize: '16px', fontWeight: 600}">{{title}}</div>
      <Form ref="addForm" :model="addForm" :label-width="120" :rules="ruleForm" label-position="left">
        <FormItem label="步骤名称" prop="name" >
          <Input v-model="addForm.name" />
        </FormItem>
        <FormItem label="步骤序号" prop="sort" >
          <InputNumber :min="1" v-model="addForm.sort"></InputNumber>
        </FormItem>
        <FormItem label="步骤类型" prop="type_guid" >
          <Select v-model="addForm.type" style="width:200px"   >
               <Option value="1">审批类</Option>
               <Option value="2">任务类</Option>
               <Option value="3">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="经办人" prop="type_guid" >
          <Select v-model="addForm.operator_guid" style="width:200px"   >

          </Select>
        </FormItem>
        <FormItem label="对应角色" prop="type_guid" >
          <Select v-model="addForm.role_guid" style="width:200px"   >
             <Option :value="item.role_guid" v-for="(item,key) in roleData" :key="key" >{{item.role_name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="起始点" prop="type_guid" >
           <RadioGroup v-model="addForm.is_start">
              <Radio label="1">起点步骤</Radio>
              <Radio label="2">终点步骤</Radio>
          </RadioGroup>
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
      p_name:this.$route.query.name ? this.$route.query.name :'',
      formInline:{
        guid:this.$route.query.guid ? this.$route.query.guid :'',
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
          title: "名称",
          key: "step_name"
        },
        {
          title: "步骤类型",
          slot: "type"
        },
        {
          title: "下一步骤",
          key: "next_step_sort"
        },
        {
          title: "经办人",
          key: "step_operator_name"
        },
        {
          title: "经办角色",
          key: "role_name"
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

      roleData:[],
      addForm: {
        p_guid:this.$route.query.guid ? this.$route.query.guid :'',
        name: "",
        sort: 1,
        type:'1',
        operator_guid:'',
        operator_name:'',
        role_guid:'',
        is_start:'',
        step_guid:''
      },
      ruleForm:{
        name: [
            { required: true, message: '步骤名称不能为空', trigger: 'blur' }
        ],
        sort: [
            { type:'number', required: true, message: '步骤序号不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  created(){


    this.getProstep();
    this.getSystemRole();
  },
  methods: {

    // 获取角色列表
    getSystemRole(){
      this.$http.getSystemRole().then( res => {
        if(res.code == 200){
          this.roleData = res.extraData
        }
      })
    },
    // 获取列表
    getProstep(){
      this.$http.getProstep({
        guid:this.formInline.guid
      }).then( res => {
        if(res.code == 200){
          this.data = res.extraData
        }
      })
    },

    onSelectFormChange(){

    },
    // 编辑回填
    fillForm(item){
      this.addForm.name = item.step_name
      this.addForm.sort = parseInt(item.sort)
      this.addForm.type = item.type
      this.addForm.operator_guid = item.operator_guid
      this.addForm.operator_name = item.operator_name
      this.addForm.role_guid = item.role_guid
      this.addForm.is_start = item.is_start
      this.addForm.step_guid = item.step_guid
      
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
    // getParameter(){
    //   return {
    //     p_guid:this.$route.query.guid ? this.$route.query.guid :'',
    //     name: this.addForm.name,
    //     sort: this.addForm.sort,
    //     type:this.addForm.type,
    //     operator_guid:this.addForm.operator_guid,
    //     operator_name:this.addForm.operator_name,
    //     role_guid:this.addForm.role_guid,
    //     is_start:this.addForm.is_start
    //   }
    // },
    async handleType(){
      let res = '';
          
      if(this.type == 'add'){
        delete this.addForm.step_guid
        res = await this.$http.addProstep(this.addForm)
      }else {
        res = await this.$http.editProstep(this.addForm)
        
      }
      if(res.code == 200){
        this.moda = false;
        this.handleCancel('addForm');
        this.getProstep();
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
              if(!this.addForm.role_guid){
                if(!this.addForm.operator_guid){
                  this.$Message.warning('需要选择经办人 或者 对应角色');
                }
              }
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
    delProstep(step_guid){
      this.$http.delProstep({step_guid}).then( res => {
        if(res.code == 200){
          this.getProstep();
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
              this.delProstep(item.step_guid);
          },
          onCancel: () => {
            
          }
      });
    }
  },
  filters:{
    initType(v){
      switch(v){
        case '1':
          return '审批类'
          break
        case '2':
          return '任务类'
          break;
        default:
          return '其他类'    
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.SettingStep {
  .SettingStep-addBtn{
  
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