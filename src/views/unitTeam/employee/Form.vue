<template>
    <div class="form-container">
        <h2 style="margin-bottom:20px">人员信息</h2>
        <div class="form-box" style="width:800px">
             <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="150">
                <FormItem label="人员名称：" prop="name">
                    <Input v-model="formValidate.name" placeholder="输入人员名称" />
                </FormItem>
                <!-- <FormItem label="区域：" prop="area">
                    <Select v-model="formValidate.area" filterable>
                        <Option value="1" >1</Option>
                    </Select>
                </FormItem>    -->
                <FormItem label="所属部门：" prop="unit">
                     <Cascader :data="deptData" change-on-select @on-change="ondeptChange"></Cascader>
                
                </FormItem>          
                <FormItem label="人员类型：" prop="type">
                    <Select v-model="formValidate.type_guid"  @on-change='onTypeSelectChange' >
                        <Option :value="item.type_guid" v-for="(item) in userTypeData" :key="item.type_guid" >{{item.type_name}}</Option>
                    </Select>
                </FormItem>                     
                <FormItem label="工作城市：" prop="city">
                    <Select v-model="formValidate.prov_guid" style="width:40%;margin-right:20px" placeholder="选择省" clearable @on-change='onProvSelectChange' >
                        <Option :value="item.guid" v-for="(item) in provsData" :key="item.guid"   >{{item.name}}</Option>
                    </Select>
                    <Select v-model="formValidate.city_guid" style="width:40%;margin-right:20px" placeholder="选择市" clearable   @on-change='onCitySelectChange' >
                        <Option :value="item.guid" v-for="(item) in cityData" :key="item.guid" >{{item.name}}</Option>
                    </Select>
                    <span v-if="formValidate.city_level">{{formValidate.city_level}}级</span>
                </FormItem> 
                <FormItem label="职位职级：" prop="guidstr">
                    <Select v-model="formValidate.guidstr">
                        <!-- <Option value="1" >1</Option> -->
                    </Select>
                </FormItem>    
                <FormItem label="直接上级：" prop="monitor_guid">
                    <Select v-model="formValidate.monitor_guid">
                        <!-- <Option value="1" >1</Option> -->
                    </Select>
                </FormItem>         
                <FormItem label="性别：" prop="sex">
                    <Select v-model="formValidate.gender">
                        <Option value="1" >男</Option>
                        <Option value="2" >女</Option>
                    </Select>
                </FormItem>  
                <FormItem label="入职时间：" >
                   <DatePicker type="date" @on-change="onWorkDateChange" placeholder="入职时间" format="yyyy-MM-dd" style="width: 200px;margin-right:20px"></DatePicker>  
                   <span>在职时长(年)：{{formValidate.work_time}}</span>
                    
                </FormItem> 
                <div class="flex">
                    <FormItem label="试用期：" prop="probation_status" style="width:400px">
                        <Select v-model="formValidate.probation_status" @on-change='onProbationSelectChange'>
                            <Option value="0" >无</Option>
                            <Option value="1" >有</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="试用期截至时间：" prop="probation_endtime"  style="width:400px" v-if="formValidate.probation_status == 1">
                        <DatePicker type="date" @on-change="onProbationDateChange" placeholder="试用期截至时间" format="yyyy-MM-dd" style="width: 200px;margin-right:20px"></DatePicker>  
                    </FormItem>
                </div>                 
                <FormItem label="手机号码：" prop="tel"  >
                    <Input v-model="formValidate.tel" placeholder="输入手机号码" />
                </FormItem>          
                <FormItem label="工号：" prop="work_num"  >
                    <Input v-model="formValidate.work_num" placeholder="输入工号" />
                </FormItem>       
                <FormItem label="短号：" prop="short_number"  >
                    <Input v-model="formValidate.short_number" placeholder="输入短号" />
                </FormItem>      
                <FormItem label="邮箱：" prop="email"  >
                    <Input v-model="formValidate.email" placeholder="输入邮箱编号" />
                </FormItem>               
                <FormItem label="身份证号码：" prop="IDnum"  >
                    <Input v-model="formValidate.IDnum" placeholder="输入身份证号码" />
                </FormItem>     
                <div class="flex ">
                    <FormItem label="出生日期：" prop="year" style="width:800px">
                       <DatePicker type="date" @on-change="onBirthdayChange" placeholder="出生日期" format="yyyy-MM-dd" style="width: 200px;margin-right:20px"></DatePicker>  
                        <span>年龄(周岁)：{{formValidate.age}}</span>
                    </FormItem>
                    
                </div>         
                <FormItem label="考核类型：" prop="assessment_type"  >
                    <Select v-model="formValidate.assessment_type">
                        <Option value="1" >月考核</Option>
                    </Select>                    
                </FormItem>           
                <FormItem label="基本工资(元)：" prop="basic_salary"  >
                   <Input v-model="formValidate.basic_salary" placeholder="输入基本工资" />
                </FormItem>        
                <FormItem label="合同类型：" prop=""  >
                    <Select v-model="formValidate.contract_type">
                        <Option value="1" >标准工时制</Option>
                    </Select>
                </FormItem>   
                <FormItem label="合同时间：" prop=""  >
                   <DatePicker type="daterange" @on-change="onHtChange" placement="bottom-end" placeholder="开始时间-结束时间" style="width: 300px"></DatePicker>
                </FormItem>                                                                                            
             </Form>
        </div>
        <div class="btn text_align_center" style="width:800px">
                <Button type="primary" @click="handleBtn('submit')" style="margin-right:20px">确定</Button>
                <Button @click="handleBtn('cancel')">取消</Button>
        </div>
    </div>
</template>

<script>
import { getTodayDate } from "@/utils/moment"
export default {
  name:'employeeMage_form',
  data () {
    return {
        type:this.$route.query.type,
        formValidate:{
            name:'',
            location_name:'',
            location_guid:'',
            dept_guid:'',
            type_guid:'',
            type_name:'',
            prov_guid:'',
            prov_name:'',
            city_guid:'',
            city_name:'',
            city_level:'',
            guidstr:'',
            monitor_guid:'',
            monitor_name:'',
            gender:'1',
            workdate:'',
            work_time:'',
            probation_status:'1',
            probation_endtime:'',
            tel:'',
            work_num:'',
            short_number:'',
            email:'',
            IDnum:'',
            year:'',
            month:'',
            age:'',
            day:'',
            assessment_type:'1',
            basic_salary:'',
            contract_type:'1',
            
        },
        ruleValidate:{
            name:[
                { required: true, message: '人员名称不能为空', trigger: 'blur' }
            ],
            work_num:[
                { required: true, message: '工号不能为空', trigger: 'blur' }
            ]
        },
        deptData:[],     // 部门列表
        userTypeData:[], // 人员类型列表
        provsData:[],   // 省份列表
        cityData:[],    // 省市份列表
    }
  },
  created(){
      this.getlevedepts();
      this.getusertype();
      this.getprovs();
  },
  methods:{
      // 获取城市
      getprovcity(guid){
        this.$http.getprovcity({
            guid
        }).then(res => {
            if(res.code == 200){
                this.cityData = res.extraData
            
            }
        })
      },
      // 获取省份
      getprovs(){
        this.$http.getprovs().then(res => {
            if(res.code == 200){
                this.provsData = res.extraData
            
            }
        })
      },
      // 获取人员类型
      getusertype(){
          this.$http.getusertype().then(res => {
              if(res.code == 200){
                  this.userTypeData = res.extraData
              }
          })
      },
      //  省改变
      onProvSelectChange(v){
          if(v){
              this.getprovcity(v);
          }else {
              this.cityData = [];
              this.formValidate.city_guid = ''
          }
      },
      // 省市改变
      onCitySelectChange(v){
          if(v){
              this.cityData.forEach(val=>{
                  
                  if(val.guid == v){
                      this.formValidate.city_name = val.name
                      this.formValidate.city_level = val.level
                  }
              })
              
          }else {
              this.formValidate.city_level = ''
              this.formValidate.city_name = ''
          }
          console.log(v)
      },
      // 人员类型改变
      onTypeSelectChange(v){
          this.userTypeData.forEach(val => {
              if(val.type_guid == v){
                  this.formValidate.type_name = val.type_name
              }
          })
         
      },
      // 入职时间改变
      onWorkDateChange(v){
          this.formValidate.workdate = v;
          this.formValidate.work_time = (this.getTime2Time(getTodayDate(),v)/365).toFixed(1)
        
      },
      // 部门选择改变
      ondeptChange(v){
          let id = v[v.length-1];
          this.deptData.forEach(val => {
              if(val.value == id){
                  this.formValidate.dept_guid = id;
                  this.formValidate.dept_name = val.label
              }
              val.children.forEach(val_1 => {
                if(val_1.value == id){
                  this.formValidate.dept_guid = id;
                  this.formValidate.dept_name = val_1.label
                }
                val_1.children.forEach(val_2 => {
                    if(val_2.value == id){
                        this.formValidate.dept_guid = id;
                        this.formValidate.dept_name = val_2.label
                    }
                })
              })
          })
          
      },
      // 试用期时间改变
      onProbationDateChange(v){
          this.formValidate.probation_endtime = v;
      },
      // 是否有试用期改变
      onProbationSelectChange(v){
          if(v == 0){
              this.formValidate.probation_endtime = ''
          }
          
      },
      // 计算两个时间段 转换为年
      getTime2Time($time1, $time2){
          var time1 = arguments[0], time2 = arguments[1];
                time1 = Date.parse(time1)/1000;
                time2 = Date.parse(time2)/1000;
                var time_ = time1 - time2;
                return (time_/(3600*24));
      },
      // 出生日期
      onBirthdayChange(v){
          this.formValidate.year = v.split('-')[0]
          this.formValidate.month = v.split('-')[1]
          this.formValidate.day = v.split('-')[2]
          this.formValidate.age =  (this.getTime2Time(getTodayDate(),v)/365).toFixed(1)
       
      },
      // 合同时间改变
      onHtChange(v){
          this.formValidate.contract_btime = v[0];
          this.formValidate.contract_etime = v[1];
     
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
                                  value:v_2.dept_guid,
                                  label:v_2.dept_name,
                              })
                          })
                          children.push({
                             value: v_1.dept_guid,
                             label:v_1.dept_name,
                             children:children_1
                          })
                      }))
                      this.deptData.push({
                          value:v.dept_guid,
                          label:v.dept_name,
                          children:children
                      })
                  })
             
              }
          })
      },
      async handleSubmit(){
          let data = this.getParameter(),
              res = '';
          console.log(data);    
      
          if(this.type == 'add'){
              res = await this.$http.addMployeeUsers(data)
          }else {

          }
          if(res.code == 200){
              this.$router.push({ name : "employeeMage_onjob"});
              this.$Message.success(res.message);
          }else{
              this.$Message.error(res.message);
          }
      },
      getParameter(){
         return  {  name : this.formValidate.name,
                    location_guid : this.formValidate.location_guid,
                    location_name : this.formValidate.location_name,
                    dept_guid : this.formValidate.dept_guid,
                    dept_name : this.formValidate.dept_name,
                    type_guid : this.formValidate.type_guid,
                    type_name : this.formValidate.type_name,
                    prov_guid : this.formValidate.prov_guid,
                    prov_name : this.formValidate.prov_name,
                    city_guid : this.formValidate.city_guid,
                    city_name : this.formValidate.city_name,
                    city_level : this.formValidate.city_level,
                    guidstr : this.formValidate.guidstr,
                    monitor_guid : this.formValidate.monitor_guid,
                    monitor_name : this.formValidate.monitor_name,
                    gender : this.formValidate.gender,
                    workdate : this.formValidate.workdate,
                    probation_status : this.formValidate.probation_status,
                    work_time : this.formValidate.work_time,
                    probation_endtime : this.formValidate.probation_endtime,
                    tel : this.formValidate.tel,
                    work_num : this.formValidate.work_num,
                    short_number : this.formValidate.short_number,
                    email : this.formValidate.email,
                    IDnum : this.formValidate.IDnum,
                    year : this.formValidate.year,
                    month : this.formValidate.month,
                    day : this.formValidate.day,
                    age : this.formValidate.age,
                    assessment_type : this.formValidate.assessment_type,
                    basic_salary : this.formValidate.basic_salary,
                    contract_type : this.formValidate.contract_type,
                    contract_btime : this.formValidate.contract_btime,
                    contract_etime : this.formValidate.contract_etime
            }
      },
      handleBtn(type){
          switch(type){
              case 'cancel':
                    this.$router.go(-1); 
                  break;
              case 'submit':
                    if(!this.formValidate.name){
                        return this.$Message.warning('人员名称不能为空');
                    }
                    if(!this.formValidate.work_num){
                        return this.$Message.warning('工号不能为空');
                    }
                    this.handleSubmit();
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