<template>
    <div class="form-container">
        <h2 style="margin-bottom:20px">人员信息</h2>
        <div class="form-box" style="width:800px">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                <FormItem label="人员名称：" prop="name">
                    <Input v-model="formValidate.name" placeholder="输入人员名称" />
                </FormItem>
                <FormItem label="区域：" prop="area">
                    <Select v-model="formValidate.area" filterable>
                        <Option value="1" >1</Option>
                    </Select>
                </FormItem>   
                <FormItem label="所属部门：" prop="unit">
                    <Select v-model="formValidate.unit" filterable>
                        <Option value="1" >1</Option>
                    </Select>
                </FormItem>          
                <FormItem label="人员类型：" prop="type">
                    <Select v-model="formValidate.type" >
                        <Option value="1" >1</Option>
                    </Select>
                </FormItem>                     
                <FormItem label="工作城市：" prop="city">
                    <Select v-model="formValidate.city">
                        <Option value="1" >1</Option>
                    </Select>
                </FormItem> 
                <FormItem label="职位职级：" prop="post">
                    <Select v-model="formValidate.post">
                        <Option value="1" >1</Option>
                    </Select>
                </FormItem>    
                <FormItem label="直接上级：" prop="boss">
                    <Select v-model="formValidate.boss">
                        <Option value="1" >1</Option>
                    </Select>
                </FormItem>         
                <FormItem label="性别：" prop="sex">
                    <Select v-model="formValidate.sex">
                        <Option value="1" >1</Option>
                    </Select>
                </FormItem>  
                <FormItem label="入职时间：" >
                    
                  <p>在职时长(年)：</p>
                    
                </FormItem> 
                <div class="flex">
                    <FormItem label="试用期：" prop="probation" style="width:400px">
                        <Select v-model="formValidate.probation">
                            <Option value="1" >无</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="试用期截至时间：" prop="probationTime"  style="width:400px">

                    </FormItem>
                </div>                 
                <FormItem label="手机号码：" prop="phone"  >
                    <Input v-model="formValidate.phone" placeholder="输入手机号码" />
                </FormItem>          
                <FormItem label="工号：" prop="jobNum"  >
                    <Input v-model="formValidate.phone" placeholder="输入工号" />
                </FormItem>       
                <FormItem label="短号：" prop="dNum"  >
                    <Input v-model="formValidate.dNum" placeholder="输入短号" />
                </FormItem>      
                <FormItem label="邮箱：" prop="mailbox"  >
                    <Input v-model="formValidate.mailbox" placeholder="输入邮箱编号" />
                </FormItem>               
                <FormItem label="身份证号码：" prop="idCardNum"  >
                    <Input v-model="formValidate.idCardNum" placeholder="输入身份证号码" />
                </FormItem>     
                <div class="flex">
                    <FormItem label="出生年：" prop="year" style="width:400px">
                       
                    </FormItem>
                    <FormItem label="出生月：" prop="month"  style="width:400px">

                    </FormItem>
                </div>         
                <FormItem label="考核类型：" prop="khType"  >
                    
                </FormItem>           
                <FormItem label="基本工资(元)：" prop="khType"  >
                   <Input v-model="formValidate.wage" placeholder="输入基本工资" />
                </FormItem>        
                <FormItem label="合同类型：" prop=""  >
                    <Select v-model="formValidate.htType">
                        <Option value="1" >无</Option>
                    </Select>
                </FormItem>   
                <FormItem label="合同时间：" prop=""  >
                  
                </FormItem>                                                                                            
             </Form>
        </div>
        <div class="btn text_align_center" style="width:800px">
            
                <Button type="primary" style="margin-right:20px">确定</Button>
                <Button @click="handleBtn('cancel')">取消</Button>
        </div>
    </div>
</template>

<script>
export default {
  name:'employeeMage_form',
  data () {
    return {
        formValidate:{
            name:'',
            area:'',
            unit:'',
            type:'',
            city:'',
            post:'',
            boss:'',
            sex:'1',
            probation:'1',
            probationTime:[],
            phone:'',
            jobNum:'',
            dNum:'',
            mailbox:'',
            idCardNum:'',
            wage:'',
            htType:'1',
            
        },
        ruleValidate:{
            name:[
                { required: true, message: '人员名称不能为空', trigger: 'blur' }
            ],
            jobNum:[
                { required: true, message: '工号不能为空', trigger: 'blur' }
            ]
        }
    }
  },
  created(){

  },
  methods:{
      handleBtn(type){
          switch(type){
              case 'cancel':
                  this.$router.go(-1); 
                  break;
          }
      }
  }
}
</script>

<style lang="scss" scoped>
  .form-container{
 
  }
</style>