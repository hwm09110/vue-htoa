<template>
    <div  class="first-container" >
        <header style="margin-bottom:20px"> 
            <Button type="primary" @click="handleBtn('add')" >新建子部门</Button>
        </header>
        
        <div class="table">
            <Table border :columns="columns" :data="data">
                <template slot-scope="{ row }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 10px" @click.stop="handleBtn('edit',row)">编辑</Button>
                    <Button type="error" size="small" style="margin-right: 10px" @click.stop="handleBtn('delete',row)">删除</Button>
                    <Button  size="small" @click="handleBtn('next')">下一级</Button>
                </template>
            </Table>
            <div class="page-wrap">
                 <Page :total="pageInfo.count" show-total :current="pageInfo.page" :page-size="pageInfo.size" @on-change="handlePageChange" />
            </div>
        </div>
            <Modal
                v-model="modal"
                :loading="loading"
                :title="type == 'add' ?'新建部门':'编辑部门'"
                @on-ok="handleOk('formValidate')"
                @on-cancel="handleCancel('formValidate')">
                <div>
                    <Form ref="formValidate" :rules="ruleValidate" :model="formValidate" :label-width="120">
                        <FormItem label="部门层级：" >
                            <p v-if="type == 'add'">三级部门</p>
                            <Select v-model="formValidate.level" style="width:200px" @on-change="onSelectChange"  v-if="type == 'edit'">
                                <Option value="1" >一级部门</Option>
                                <Option value="2" >二级部门</Option>
                                <Option value="3" >三级部门</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="上级部门：" v-if="formValidate.level != '1'" >
                            <p  v-if="type == 'add'">{{this.name_2}}</p>
                            <Select v-model="formValidate.pid" style="width:200px"  v-if="type == 'edit'">
                                <Option :value="item.id" v-for="(item,key) in levelData" :key="key"  >{{item.dept_name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="部门名称：" prop="name" >
                            <Input v-model="formValidate.name" placeholder="输入部门名称" />
                        </FormItem>
                        <FormItem label="部门序号：" prop="sort"  >
                            <InputNumber :min="1" v-model="formValidate.sort" placeholder="输入部门序号" style="width:100%" ></InputNumber>
                          
                        </FormItem>
                        <FormItem label="备注："  prop="remarks" >
                            <Input v-model="formValidate.remarks" placeholder="备注" />
                        </FormItem>
                    </Form>
                </div>
            </Modal>
    </div>

</template>


<script>
export default {
  name:'departmentThird',
  data () {
    return {
        modal:false,
        loading:true,
        id:this.$route.query.id ? this.$route.query.id :'',
        name_1:this.$route.query.name_1 ? this.$route.query.name_1 :'',
        name_2:this.$route.query.name_2 ? this.$route.query.name_2 :'',
        type:'add',
        pageInfo:{
            page:1,
            size:10,
            count:0
        },
        formValidate:{
            level:'3',
            pid:this.$route.query.id ? this.$route.query.id :'',
            ids:'',
            name:'',
            sort:1,
            remarks:'',
            id:''
        },
        ruleValidate:{
            name: [
                { required: true, message: '请输入部门名称', trigger: 'blur' }
            ],
            sort: [
                { type:'number', required: true, message: '请输入部门序号', trigger: 'blur' }
            ],
            remarks: [
                { required: false, message: '请输入部门序号', trigger: 'blur' }
            ],
        },
        columns:[{
            title:'部门序号',
            width: 150,
            key:'sort',
            align: 'center'
        },{
            title:'部门名称',
            key:'dept_name',
            align: 'center'
        },{
            title:'备注',
            key:'remarks',
            align: 'center'
        },{
            title:'操作',
            slot:'action',
            width: 250,
            align: 'center'
        }],
        data:[],
        levelData:[]
    }
  },
  created(){
    this.getdeptlevellists();
    this.getlevedepts('3');
  },
  mounted(){
    //   document.getElementsByClassName('site-path')[0].getElementsByTagName('li')[0].innerHTML = this.name_1;
    //   document.getElementsByClassName('site-path')[0].getElementsByTagName('li')[1].innerHTML = this.name_2;
    //   document.getElementsByClassName('site-path')[0].getElementsByTagName('li')[2].innerHTML = '三级部门管理';
     
  },
  methods:{
      handleCancel(v){
          this.handleReset(v)
      },
      handleOk(v){
          this.$refs[v].validate((valid) => {
                if (valid) {
                    this.handleDept();
                } else {
                    this.loading = false;
                    setTimeout(() =>{
                    this.loading = true;
                    },100)                   
                }
            })

      },
      handlePageChange(v){
          this.pageInfo.page = v;
          this.getdeptlevellists();
      },
      handleReset (name) {
            this.$refs[name].resetFields();
      },
      async onSelectChange(item){
          switch(item){
              case '2':
                await  this.getlevedepts('2');
                this.levelData.length ? this.formValidate.pid =  this.levelData[0].id :''
                break;
              case '3':
                await  this.getlevedepts('3');
                this.levelData.length ? this.formValidate.pid =  this.levelData[0].id :''
                break;    
          }
         
      },
      // 编辑回填
      fillForm(item){
          this.formValidate.level = '3'
          this.formValidate.name = item.dept_name
          this.formValidate.sort = parseInt(item.sort)
          this.formValidate.remarks = item.remarks
          this.formValidate.id = item.id
          this.formValidate.pid = item.pid
      },
      async handleBtn(type,item){
          switch(type){
              case 'add':
                  this.modal = true;
                  this.type = 'add'
                  this.formValidate.level = '3'
                  this.formValidate.pid = this.$route.query.id ? this.$route.query.id :'';
                  //this.initFormValidate();
                  break
              case 'edit':
                  this.modal = true;
                  this.type = 'edit'
                  
                  await this.getlevedepts('3');
                  this.fillForm(item)
                  break;
              case 'delete':
                  this.$Modal.confirm({
                    title: '是否删除',
                    onOk: () => {
                        this.deldept(item.id)
                    },
                    onCancel: () => {
                        
                    }
                });
                  break;
              case 'next':
                  break;        

          }
      },
      // 删除
      async deldept(id){
        let res = await this.$http.deldept({id})
        if(res.code == 200){
            this.pageInfo.page = 1;
            this.getdeptlevellists();
            this.$Message.success(res.message);
        }else {
            this.$Message.error(res.message);
        }
      },
      // 部门层级列表 - 上级
      getlevedepts(level){
          return new Promise((resolve,reject) => {
            this.$http.getlevedepts({
                level:level
            }).then( res => {
                if(res.code == 200){
                    this.levelData = res.extraData
                  
                    resolve()
                }
            })
          })
      },
      //获取列表  - 下级
      async getdeptlevellists(){
          let res =await this.$http.getdeptlevellists({
              page:this.pageInfo.page,
              id:this.id,
              level:'2'
          })
          if(res.code == 200){
              if(this.pageInfo.page == 1){
                  this.pageInfo.count = parseInt(res.extraData.count)
                  this.pageInfo.size = parseInt(res.extraData.len);
              }
              this.data = res.extraData.info
          }
      },
      // 获取参数
      getParameter(){
          return {
              level:this.formValidate.level,
              name:this.formValidate.name,
              sort:this.formValidate.sort,
              pid:this.formValidate.pid,
              remarks:this.formValidate.remarks,
              ids:this.formValidate.ids,
              id:this.formValidate.id
          }
      },
      // 新增 or 编辑
      async handleDept(){
          let data = this.getParameter(),
              res;
        if(this.type == 'add'){
           delete data.id
           res =  await  this.$http.adddept(data) 
        }else{
            if(data.level == '1'){
                data.pid = '';
            }
            console.log(data);
           
           res =  await  this.$http.editdept(data) 
            
        }
        
        if(res.code == 200){
            this.modal = false;
            this.pageInfo.page = 1;
            this.handleReset('formValidate')
            this.getdeptlevellists();
            this.$Message.success(res.message);
        }else{
            this.loading = false;
            setTimeout(() =>{
            this.loading = true;
            },100)              
            this.$Message.error(res.message);
        }
      },
      
  }
}
</script>

<style lang="scss" scoped>
  .first-container{
    .table{
        padding: 12px;
    }
  }
</style>
