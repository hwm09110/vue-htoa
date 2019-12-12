<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">出差申请</h2>
    </div>
    
    <div class="applyer-info">
      <div class="info-item">
        <span class="item-label">姓名：</span>
        <span class="item-val">{{userInfo.user_name}}</span>
      </div>
      <div class="info-item">
        <span class="item-label">部门：</span>
        <span class="item-val">{{userInfo.dept_name}}</span>
      </div>
      <div class="info-item">
        <span class="item-label">职务：</span>
        <span class="item-val">{{userInfo.duty}}</span>
      </div>
      <div class="info-item">
        <span class="item-label">单号：</span>
        <span class="item-val">{{orderNumber}}</span>
      </div>
    </div>
    
    <div class="form-wrap">
      <div class="form-box">
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>出差时间：</span>
            <DatePicker v-model="formData.sdate"  @on-ok="handlePickDatetime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker> 至 
            <DatePicker v-model="formData.edate"  @on-ok="handlePickDatetime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>出差地点：</span>
            <Input class="form-input" v-model="formData.location"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>出差原因：</span>
            <Input style="width:800px;" v-model="formData.reason" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label" style="width: 150px;"><i class="require"></i>是否提交出差报告：</span>
            <RadioGroup class="form-radio" v-model="formData.isReport">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>出差安排：</span>
            <Input v-model="formData.plan" style="width:800px;" type="textarea" :rows="5" placeholder="填写出差安排" />
          </div>
        </div>
      </div>
      <div class="form-operate">
        <Button type="primary" class="submit-btn" @click="handleSubmit">提交</Button>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'Apply',
  data () {
    return {
      formData: {
        sdate: "", //开始日期，Date对象
        edate: "", //结束日期，Date对象
        stimeStamps: "", //开始日期，时间截
        etimeStamps: "", //结束日期，时间截
        location: "", //出差地点
        reason: "", //出差原因
        isReport: "0", //是否要提交出差报告
        plan: "", //出差计划
      },

      orderNumber: (Math.round(Date.now()/1000)), //单号
      p_info: {
        p_guid: "",
        p_name: "",
        step_guid: "",
      },
    }
  },
  computed: {
    ...mapState(["userInfo", "leaveTypes"])
  },
  methods: {

    
    //选择离开时间、报到时间
    handlePickDatetime() {
      this.checkPickDateTime()
    },

    // 检查时间是否正确
    checkPickDateTime() {
      let stimeStamps = 0
      let etimeStamps = 0

      if(this.formData.sdate) {
        stimeStamps = Math.floor(new Date(this.formData.sdate).getTime() / 1000)
      }
      if(this.formData.edate) {
        etimeStamps = Math.floor(new Date(this.formData.edate).getTime() / 1000)
      }
      console.log(stimeStamps, etimeStamps)
      if(stimeStamps > 0 && etimeStamps > 0) {
        if(etimeStamps <= stimeStamps) {
          this.$Message.warning("报到时间不能小于离开时间")
          return false
        }
      }

      this.formData.stimeStamps = stimeStamps
      this.formData.etimeStamps = etimeStamps
      return true
    },

    // 检查表单数据
    checkFormData() {
      let result = { code: 200, message: ""}

      if(!this.formData.sdate) {
        result.code = 2001
        result.message = "选择离开日期"
        return result  
      }
      if(!this.formData.edate) {
        result.code = 2001
        result.message = "选择报到日期"
        return result  
      }
      if(!this.formData.location) {
        result.code = 2001
        result.message = "出差地点不能为空"
        return result  
      }
      if(!this.formData.reason) {
        result.code = 2001
        result.message = "请假原因不能为空"
        return result  
      }
      if(this.formData.isReport == 0) {
        result.code = 2001
        result.message = "请选择是否提交出差报告"
        return result  
      }
      if(!this.formData.plan) {
        result.code = 2001
        result.message = "出差安排不能为空"
        return result  
      }
      return result
    },

    // 提交申请
    handleSubmit() {
      const result = this.checkFormData()
      if(result.code != '200') {
        this.$Message.warning(result.message)
        return false
      }
      const post_data = {
        p_guid: this.p_info.p_guid,
        p_name: this.p_info.p_name,
        step_guid: this.p_info.step_guid,
        flow_number: this.orderNumber,
        sdate: this.formData.stimeStamps,
        edate: this.formData.etimeStamps,
        location: this.formData.location,
        reason: this.formData.reason,
        report: this.formData.isReport,
        plan: this.formData.plan,
      }
      console.log(post_data)
      this.$http.addBusinesstripApply(post_data).then(res => {
        if(res.code === '200'){
          this.$Message.success(res.message)
          this.$router.push({name: "businesstripMage_applylist"})
        }else{
          this.$Message.warning(res.message)
        }
      })
      
    },

    //回填编辑表单
    fillEditForm(applyInfo) {
      this.flow_number = applyInfo.flow_number
      this.formData.sdate = applyInfo.sdate ? new Date(applyInfo.sdate*1000) : ""
      this.formData.edate = applyInfo.edate ? new Date(applyInfo.edate*1000) : ""
      this.formData.stimeStamps = applyInfo.sdate
      this.formData.etimeStamps = applyInfo.edate
      this.formData.location = applyInfo.location
      this.formData.reason = applyInfo.reason
      this.formData.plan = applyInfo.plan
      this.formData.isReport = applyInfo.report
    },

    async init() {
      try {
        const params = { 
          apply_guid: this.$route.query.apply_guid,
          now_step_guid: this.$route.query.now_step_guid,
        }
        const ret = await this.$http.getBusinesstripApplyConfig(params)
        if(ret.code === '200'){
          const { p_info, info, step_flow, document } = ret.extraData
          this.p_info = p_info

          // 编辑时
          if(info) {
            this.fillEditForm(info)
          }
        }
      } catch (error) {
        console.log(error)
      }
      
    },
  },
  created() {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
// 申请人信息
.applyer-info{
  background-color: #F9F9F9;
  padding: 0 15px 0 30px;
  margin-bottom:15px;
  .info-item{
    display: inline-block;
    height: 45px;
    line-height: 45px;
    margin-right: 60px;
    font-size: 14px;
    .item-label{
      font-weight: 700;
    }
    .item-val{}
  }
}

// 表单
.form-wrap{
  margin-top: 20px;
  padding: 20px;
  width: 1000px;
  .form-box{
    .form-row{
      margin-bottom: 20px;
      .form-item{
        display: inline-block;
        .label{
          color: #666;
          display: inline-block;
          width: 90px;
          text-align: right;
        }
        .require{
          position: relative;
          font-style: normal;
          &::before{
            position: absolute;
            left: -10px;
            top: 50%;
            transform: translateY(-35%);
            content: "*";
            color: #ff0000;
          }
        }
        .form-time,
        .form-select,
        .form-input{
          width: 200px;
          margin-left: 5px;
        }
        .form-radio{
          margin-left: 4px;
        }
      }
      .tips{
        color: #ff0000;
        margin-left: 30px;
      }
      .calcTime-tips{
        color: #ff0000;
        margin-left: 30px;
        display:inline-block; 
        width:290px;
        vertical-align: middle;
      }
    }
  }
  .form-operate{
    text-align: center;
    .submit-btn{
      width: 150px;
    }
  }
}
</style>
