<template>
    <div  class="first-container" >
        <header style="margin-bottom:20px"> 
            <Button type="primary">新建部门</Button>
        </header>
        
        <div class="table">
            <Table border :columns="columns" :data="data">
                <template slot-scope="{ row }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 10px" @click="handleBtn('edit')">编辑</Button>
                    <Button type="error" size="small" style="margin-right: 10px" @click="handleBtn('delete')">删除</Button>
                    <Button  size="small" @click="handleBtn('next')">下一级</Button>
                </template>
            </Table>
        </div>
    </div>

</template>


<script>
export default {
  name:'departmentFirst',
  data () {
    return {
        columns:[{
            title:'部门序号',
            width: 150,
            key:'index',
            align: 'center'
        },{
            title:'部门名称',
            key:'name',
            align: 'center'
        },{
            title:'备注',
            key:'remark',
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
              case 'edit':
                  break;
              case 'delete':
                  break;
              case 'next':
                  break;        

          }
      }
  }
}
</script>

<style lang="scss" scoped>
  .first-container{
 
  }
</style>
