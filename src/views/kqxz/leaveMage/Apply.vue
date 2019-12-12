<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">请假申请</h2>
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
        <span class="item-label">单号：  </span>
        <span class="item-val">{{orderNumber}}</span>
      </div>
    </div>
    
    <div class="form-wrap">
      <div class="form-box">
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>请假类别：</span>
            <Select class="form-select" v-model="formData.type" @on-change="handleChooseType">
                <Option v-for="item in leaveTypes" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
            <Select class="form-select" v-model="formData.type_a" v-show="formData.type == '7'">
                <Option v-for="(value, key) in typeAList" :value="key" :key="key">{{ value }}</Option>
            </Select>
            <span class="tips" v-show="formData.type == 1">一次性申请事假不超过10天</span>
            <span class="tips" v-show="formData.type == 3 && !showVacationTips">职工累计工作已满1年不满10年的，年休假5天；已满10年不满20年的，年休假10天；已满20年的，年休假15天。工作未满10年的员工，年假由公司统筹，具体请咨询人力资源部。</span>
            <span class="vacation-tips" v-show="formData.type == 3 && showVacationTips">
              在本单位工作已满<span class="text-blue">{{workYear}}</span>年，本年度已休年假<span class="text-blue">{{used_days}}</span>天，本年度年假剩余<span class="text-blue">{{v_days - used_days}}</span>天
            </span>
          </div>
        </div>
        <div class="form-row" v-show="formData.type == '1'">
          <Checkbox v-model="isAgree" style="margin-left:76px;">本人同意授权人力资源部，优先采用事假时长与加班时长相抵扣的原则计算相关薪酬</Checkbox>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>离开日期：</span>
            <DatePicker v-model="formData.sdate" @on-ok="handlePickDatetime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
          </div>
          <div class="form-item" style="margin-left:50px;">
            <span class="label"><i class="require"></i>报到日期：</span>
            <DatePicker v-model="formData.edate" @on-ok="handlePickDatetime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
          </div>
          <span class="calcTime-tips">*您的请假时间，将从请假之日起开始计算（包含节假日）。如分次休假，请分次提交。</span>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>请假天数：</span>
            <Input readonly style="width:100px;" v-model="formData.days" /> 天
            <Input readonly style="width:100px;" v-model="formData.hours" /> 时
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>工作代理人：</span>
            <Input class="form-input" v-model="formData.replace" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>请假原因：</span>
            <Input v-model="formData.reason" style="width:800px;" type="textarea" :rows="5" placeholder="填写请假原因" />
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
      // 产假类别
      typeAList: [],
      isAgree: true,
      formData: {
        type: "1", //请假类型
        type_a: "1", //1=>'顺产（1胎）',2=>'顺产（2胎）',3=>'顺产（3胎）',4=>'剖腹产',5=>'流产假（怀孕2个月以下）',6=>'流产假（2个月以上4个月以下）',7=>'流产假（4个月以上7个月以下）',8=>'流产假（7个月以上）'
        days: "", //请假天数
        hours: "", //减去请假天数的小时数
        sdate: "", //离开日期，Date对象
        edate: "", //报道日期，Date对象
        stimeStamps: "", //离开日期，时间截
        etimeStamps: "", //报到日期，时间截
        replace: "", //工作暂代人
        reason: "", //请假原因
      },

      showVacationTips: false, //提示剩余年假信息
      v_guid: "", //年假信息guid
      workYear: 0, //工作年限
      v_days: 0,  //年假天数
      used_days: 0, //已用年假天数

      orderNumber: (Math.round(Date.now()/1000)), //单号
      p_info: {
        p_guid: "",
        p_name: "",
        step_guid: "",
      },
      applyInfo: {}, //编辑申请单详情


    }
  },
  computed: {
    ...mapState(["userInfo", "leaveTypes"])
  },
  methods: {

    //切换请假类型
    handleChooseType(value) {
      if(value == 3) {
        this.getAnnualvaationInfo() //拉取年假信息
      }
    },

    //选择离开时间、报到时间
    handlePickDatetime() {
      this.checkPickDateTime()

      if(this.formData.sdate && this.formData.edate) {
        this.calcTime(this.formData.sdate, this.formData.edate) //计算时长
      }else{
        this.formData.days = ""
        this.formData.hours = ""
      }
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

    //计算请假时长
    calcTime(stime, etime) {
      let dateBegin = new Date(stime)
      let dateEnd = new Date(etime) //获取当前时间

      let dateDiff = dateEnd.getTime() - dateBegin.getTime() + 60*1000 //时间差的毫秒数 分钟只能选到59 所有加60秒
      let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) //计算出相差天数

      let leave1 = dateDiff % (24*3600*1000)    //计算天数后剩余的毫
      let hours = Math.floor(leave1 / (3600*1000))//计算出小时数

      console.log('天数', dayDiff)
      console.log('小时数', hours)

      this.formData.days = dayDiff
      this.formData.hours = hours
    },

    // 检查表单数据
    checkFormData() {
      let result = { code: 200, message: ""}

      if(this.formData.type == 1 && !this.isAgree) {
        result.code = 2001
        result.message = "请勾选同意按钮"
        return result  
      }
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
      if(this.formData.days == 0 && this.formData.hours == 0) {
        result.code = 2001
        result.message = "请假时长不正确"
        return result  
      }
      if(this.formData.type == 3 && (this.v_days - this.used_days) < this.days) {
        result.code = 2001
        result.message = "假期天数不能大于年假剩余天数"
        return result  
      }
      if(!this.formData.replace) {
        result.code = 2001
        result.message = "工作代理人不能为空"
        return result  
      }
      if(!this.formData.reason) {
        result.code = 2001
        result.message = "请假原因不能为空"
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
        v_guid: this.v_guid,
        type: this.formData.type,
        type_a: this.formData.type_a,
        days: this.formData.days,
        hours: this.formData.hours,
        sdate: this.formData.stimeStamps,
        edate: this.formData.etimeStamps,
        replace: this.formData.replace,
        reason: this.formData.reason,
      }
      console.log(post_data)

      this.$http.addLeaveApply(post_data).then(res => {
        if(res.code === '200'){
          this.$Message.success(res.message)
          this.$router.push({name: "leaveMage_applylist"})
        }else{
          this.$Message.warning(res.message)
        }
      })
      
    },

    //回填编辑表单
    fillEditForm(applyInfo) {
      this.flow_number = applyInfo.flow_number
      this.formData.type = applyInfo.type
      this.formData.type_a = applyInfo.type_a
      this.formData.days = applyInfo.days
      this.formData.hours = applyInfo.hours
      this.formData.sdate = applyInfo.sdate ? new Date(applyInfo.sdate*1000) : ""
      this.formData.edate = applyInfo.edate ? new Date(applyInfo.edate*1000) : ""
      this.formData.replace = applyInfo.replaceman
      this.formData.reason = applyInfo.reason
    },

    // 拉取申请人的年假信息
    async getAnnualvaationInfo() {
      try {
        const res = await this.$http.getAnnualvaation()
        console.log('年假信息', res)
        if(res.code ===  '200'){
          const info = res.extraData
          this.showVacationTips = true
          this.v_guid = info.v_guid
          this.workYear = info.work_years
          this.v_days = info.v_days
          this.used_days = info.used_days
        }else{

        }
      } catch (error) {
        console.log(error)
      }
    },

    async init() {
      try {
        const params = { 
          apply_guid: this.$route.query.apply_guid,
          now_step_guid: this.$route.query.now_step_guid,
        }
        const ret = await this.$http.getLeaveApplyConfig(params)
        if(ret.code === '200'){
          const { p_info, info, step_flow, type_a } = ret.extraData
          this.p_info = p_info
          this.typeAList = type_a

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
      }
      .tips,
      .calcTime-tips{
        color: #ff0000;
        margin-left: 30px;
        display:inline-block; 
        width:290px;
        vertical-align: top;
        line-height: 1.4;
      }
      .vacation-tips{
        margin-left: 30px;
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
