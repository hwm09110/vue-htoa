<template>
    <div class="onjob-container">
        <header style="margin-bottom:20px"> 
            <Form ref="formInline" :model="formInline" :label-width="80" inline>
                <FormItem label="姓名：">
                    <Input type="text" v-model="formInline.kw" placeholder="输入人员姓名" clearable  />
                  
                </FormItem>
                <Button type="primary" @click="handleSubmit">确定</Button>
            </Form>
            <div>
                <Button type="primary" style="margin-right:15px" @click="handleBtn('add')">新增人员</Button>
                <Button type="primary" style="margin-right:15px" @click="handleBtn('export')">导出excel</Button>
                <Button type="primary" style="margin-right:15px">导入人员</Button>

                <a class="text" :href="baseUrl+'/hthr/organization/getusertml'" target="view_window">（导入仅限xlsx文件，下载导入模板）</a>

            </div>
        </header>
        <section class="flex">
            <nav class="flex-none" style="margin-right:50px;width:200px" >
                <Tree :data="treeData" @on-select-change="onTreeSelectChange"></Tree>
            </nav>
            <div class="table" >
                <Table border :columns="columns" :data="data">
                    <template slot-scope="{ row }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 10px" @click="handleBtn('edit')">编辑</Button>
                        <!-- <Button type="primary" size="small" style="margin-right: 10px" @click="handleBtn('post')">修改职位</Button> -->
                        <Button type="error" size="small" style="margin-right: 10px" @click="handleBtn('delete',row)">删除</Button>
                    </template>
                </Table>
                <div class="page-wrap">
                    <Page :total="pageInfo.count" show-total :current="pageInfo.page" :page-size="pageInfo.size" @on-change="handlePageChange" />
                </div>
            </div>

        </section>
    </div>
</template>

<script>
export default {
  name:'Onjob',
  data () {
    return {
        baseUrl: process.env.BASE_URL ? process.env.BASE_URL : window.location.origin,
        pageInfo:{
            page:1,
            count:0,
            size:10
        },
        treeData:[
            {
            title: '全部',
            expand: true,

            children:[]
        }
        ],
        formInline:{
            kw:'',
            dept_guid:'',
            
        },
        columns:[{
            title:'人员名称',
            width: 150,
            key:'user_name',
            align: 'center'
        },
        // {
        //     title:'区域',
        //     key:'location_name',
        //     align: 'center'
        // },
        {
            title:'职位',
            key:'duty',
            align: 'center'
        },{
            title:'入职时间',
            key:'workdate',
            align: 'center'
        },{
            title:'工号',
            key:'work_num',
            align: 'center'
        },{
            title:'手机号码',
            key:'tel',
            align: 'center'
        },{
            title:'操作',
            slot:'action',
            width: 250,
            align: 'center'
        }],
        data:[]
    }
  },
  created(){
      this.getMployeeUsers();
      this.getlevedepts();
  },
  methods:{
      // 在职人员列表
      getMployeeUsers(){
          this.$http.getMployeeUsers({
              kw:this.formInline.kw,
              dept_guid:this.formInline.dept_guid,
              page:this.pageInfo.page,
              dc:0

          }).then( res => {
              if(res.code == 200){
                  if(this.pageInfo.page == 1){
                      this.pageInfo.count = parseInt(res.extraData.count)
                      this.pageInfo.size = parseInt(res.extraData.len)
                  }
                  this.data = res.extraData.info
              }
          })
      },
      // 部门列表
      getlevedepts(){
          this.$http.getlevedepts({
              level:''
          }).then( res => {
              if(res.code == 200){
                  res.extraData.forEach((v) => {
                      let children =[];
                      v.child.forEach((v_1 => {
                          let children_1 =[];
                          v_1.child.forEach(v_2 => {
                              children_1.push({
                                  title:v_2.dept_name+ `(${v.dept_pers})`,
                                  dept_guid:v_2.dept_guid,
                                  expand:false
                              })
                          })
                          children.push({
                             title: v_1.dept_name+ `(${v.dept_pers})`,
                             expand:false,
                             dept_guid:v_1.dept_guid,
                             children:children_1
                          })
                      }))
                      this.treeData[0].children.push({
                          title:v.dept_name + `(${v.dept_pers})`,
                          expand:true,
                          dept_guid:v.dept_guid,
                          children:children
                      })
                  })
              }
          })
      },
      // 点击tree
      onTreeSelectChange(v){
          if(v[0].title == '全部'){
              this.formInline.dept_guid = '';
          }else{
              this.formInline.dept_guid = v[0].dept_guid;
          }
    
          
          this.pageInfo.page = 1;
          this.getMployeeUsers()
          
      },
      // 确定搜索
      handleSubmit(){
          this.pageInfo.page = 1;
          this.getMployeeUsers();
      },
      handlePageChange(v){
          this.pageInfo.page = v;
          this.getMployeeUsers();          
      },
      // 删除
      detMployeeUsers(user_guid){
          this.$http.detMployeeUsers({user_guid}).then(res => {
              if(res.code == 200){
                  this.pageInfo.page = 1;
                  this.getMployeeUsers();
                  this.$Message.success(res.message);
              }else{
                  this.$Message.error(res.message);
              }
          })
      },
      handleBtn(type,item){
          switch(type){
              case 'add':
                  this.$router.push({ name : "employeeMage_form",query:{type:'add'}});
                  break;
              case 'edit':
                  break;
              case 'delete':
                    this.$Modal.confirm({
                        title: '是否删除',
                        duration:3,
                        onOk: () => {
                            this.detMployeeUsers(item.user_guid)
                        },
                        onCancel: () => {
                            
                        }
                    });
                  break;
              case 'export':
                    let formInline = this.formInline;
                    let kw = formInline.kw,
                        dept_guid = formInline.dept_guid;

                    if (!this.data.length) {
                        return this.$Message.warning("暂无数据导出");
                    }
                    window.open(
                        this.baseUrl +
                        "/hthr/organization/getusers?kw" +
                        kw +
                        "&dept_guid=" +
                        dept_guid +
                        "&dc=1"
                    );                  
                  break;          
          }
      }
  }
}
</script>

<style lang="scss" scoped>
  .onjob-container{
      .text{
          color: #2d8cf0;
          cursor: pointer;
      }
      .table{
          padding: 12px;
      }
  }
</style>