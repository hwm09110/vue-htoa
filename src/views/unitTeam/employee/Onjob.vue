<template>
    <div class="onjob-container">
        <header style="margin-bottom:20px"> 
            <Form ref="formInline" :model="formInline" :label-width="80" inline>
                <FormItem label="姓名：">
                    <Input type="text" v-model="formInline.kw" placeholder="输入人员姓名">
                     
                    </Input>
                </FormItem>
                <Button type="primary">确定</Button>
            </Form>
            <div>
                <Button type="primary" style="margin-right:15px" @click="handleBtn('add')">新增人员</Button>
                <Button type="primary" style="margin-right:15px">导出excel</Button>
                <Button type="primary" style="margin-right:15px">导入人员</Button>
            </div>
        </header>
        <section class="flex">
            <nav style="margin-right:50px">
                <Tree :data="treeData"></Tree>
            </nav>
            <div class="table">
                <Table border :columns="columns" :data="data">
                    <template slot-scope="{ row }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 10px" @click="handleBtn('edit')">编辑</Button>
                        <Button type="primary" size="small" style="margin-right: 10px" @click="handleBtn('post')">修改职位</Button>
                        <Button type="error" size="small" style="margin-right: 10px" @click="handleBtn('delete')">删除</Button>
                    </template>
                </Table>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name:'Onjob',
  data () {
    return {
        treeData:[{
            title: 'parent 1',
            expand: true,
            children:[{
                title: 'parent 1-1',
                expand:true,
                children:[{
                    title: 'leaf 1-1-1'
                }]
            }]
        }],
        formInline:{
            kw:''
        },
        columns:[{
            title:'人员名称',
            width: 150,
            key:'name',
            align: 'center'
        },{
            title:'区域',
            key:'area',
            align: 'center'
        },{
            title:'职位',
            key:'position',
            align: 'center'
        },{
            title:'入职时间',
            key:'time',
            align: 'center'
        },{
            title:'工号',
            key:'jobnum',
            align: 'center'
        },{
            title:'手机号码',
            key:'phone',
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

  },
  methods:{
      handleBtn(v){
          switch(v){
              case 'add':
                  this.$router.push({ name : "employeeMage_form",query:{type:'add'}});
                  break;
              case 'edit':
                  break;
              case 'delete':
                  break;      
          }
      }
  }
}
</script>

<style lang="scss" scoped>
  .onjob-container{
 
  }
</style>