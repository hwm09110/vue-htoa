<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">申请详情</h2>
      <div class="top-btn">
        <Button type="error" class="btn" v-if="isShowRevokeBtn" @click="handleRevoke">撤销</Button>
        <Button type="error" class="btn" v-if="isShowRepeatSubmitBtn" @click="handleReSubmit">重新提交</Button>
        <Button class="btn" @click="handleGoBack">返回</Button>
      </div>
    </div>
    <div class="progress-wrap">
      <Steps current="1" :status="error" v-if="applyInfo.process_status == 4 && applyInfo.user_guid == userInfo.user_guid">
        <Step title="申请人发布"></Step>
        <Step title="申请人撤销"></Step>
      </Steps>
      <Steps :current="nowStep" :status="stepStatus" v-else>
        <Step title="请假申请"></Step>
        <Step title="部门经理审批"></Step>
        <Step title="部门总监审批" v-if="applyInfo.days > 7"></Step>
        <Step title="分管副总审批"  v-if="applyInfo.days > 7"></Step>
      </Steps>
    </div>
    <div class="msg-tips" v-if="applyTips > 0">
      <span class="wait" v-if="applyTips == 1">你的申请正在审批中，请等待...</span>
      <span class="pass" v-if="applyTips == 2">请假申请已被批准</span>
      <span class="back" v-if="applyTips == 3">你的申请已被退回，你可以修改并重新申请 <Button type="primary" @click="handleEditApply">修改申请</Button></span>
    </div>
    <div class="apply-info">
      <div>
        <div class="info-item">
          <span class="item-label">姓名：</span>
          <span class="item-val">{{applyInfo.insert_operator_name}}</span>
        </div>
        <div class="info-item">
          <span class="item-label">部门：</span>
          <span class="item-val">{{applyInfo.dept_name}}</span>
        </div>
        <div class="info-item">
          <span class="item-label">职务：</span>
          <span class="item-val">{{applyInfo.duty}}</span>
        </div>
        <div class="info-item">
          <span class="item-label">申请时间：</span>
          <span class="item-val">{{applyInfo.insert_time|formatToDateTime}}</span>
        </div>
        <div class="info-item">
          <span class="item-label">单号： </span>
          <span class="item-val">{{applyInfo.flow_number}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">请假类别：</span>
          <span class="item-val">{{applyInfo.type|convertLeveaType(leaveTypes)}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">请假天数：</span>
          <span class="item-val">{{applyInfo.days?applyInfo.days:"0"}}天{{applyInfo.hours?applyInfo.hours:"0"}}小时</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">离开日期：</span>
          <span class="item-val">{{applyInfo.sdate|formatToDateTime}}</span>
        </div>
        <div class="info-item">
          <span class="item-label">报到日期 ：</span>
          <span class="item-val">{{applyInfo.edate|formatToDateTime}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">工作暂代人：</span>
          <span class="item-val">{{applyInfo.replaceman}}</span>
        </div>
      </div>
      <div>
        <div class="info-item" style="display:block;">
          <span class="item-label">请假原因：</span>
          <span class="item-val reason">{{applyInfo.reason}}</span>
        </div>
      </div>
    </div>
    <div class="check-info">
      <!-- 部门经理 start -->
      <div class="check-item" v-if="isShowLevelOnePassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门经理：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[2] ? flowInfo[2].remark : "-无-"}}</div>
      </div>
      <div class="check-item" v-if="isShowLevelOneNoPassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-close-circle" style="color:#ff6666;" size="20" /> <span class="result pass">不批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门经理：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[2] ? flowInfo[2].remark : "-无-"}}</div>
      </div>
      <!-- 部门经理 end -->
      <!-- 部门总监 start -->
      <div class="check-item" v-if="isShowLevelTwoPassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门总监：</span>
            <span class="item-val">{{flowInfo[3] && flowInfo[3].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[3] && flowInfo[3].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[3] ? flowInfo[3].remark : "-无-"}}</div>
      </div>
      <div class="check-item" v-if="isShowLevelTwoNoPassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-close-circle" style="color:#ff6666;" size="20" /> <span class="result pass">不批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门总监：</span>
            <span class="item-val">{{flowInfo[3] && flowInfo[3].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[3] && flowInfo[3].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[3] ? flowInfo[3].remark : "-无-"}}</div>
      </div>
      <!-- 部门总监 end -->
      <!-- 分管副总 start -->
      <div class="check-item" v-if="isShowLevelThreePassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">分管副总：</span>
            <span class="item-val">{{flowInfo[4] && flowInfo[4].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[4] && flowInfo[4].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[4] ? flowInfo[4].remark : "-无-"}}</div>
      </div>
      <div class="check-item" v-if="isShowLevelThreeNoPassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-close-circle" style="color:#ff6666;" size="20" /> <span class="result pass">不批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">分管副总：</span>
            <span class="item-val">{{flowInfo[4] && flowInfo[4].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[4] && flowInfo[4].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[4] ? flowInfo[4].remark : "-无-"}}</div>
      </div>
      <!-- 分管副总 end -->
    </div>
    <div class="check-form" v-if="isShowCheckStep > 0">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input v-model="checkForm.content" style="width:calc(100% - 80px); margin-left:10px;" type="textarea" :rows="5" placeholder="填写审批意见" />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn" @click="handlePassByCheck">通过</Button>
        <Button type="error"  class="btn" @click="handleNoPassByCheck">退回申请人</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTimestamp } from "@/utils/moment"
import { mapState } from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      applyInfo: {},
      flowInfo: {},

      nowStep: 0, //当前进度 0：发布请假申请  1：部门经理审批  2：部门总监审批  3：分管副总审批
      stepStatus: "wait", //可选值为 wait, process, finish, error

      isShowRevokeBtn: false, //是否显示撤销按钮
      isShowRepeatSubmitBtn: false, //是否显示重新提交按钮
      applyTips: 0, // 1审核中  2已被批准 3已被退回

      isShowLevelOnePassCheck: false, //是否显示部门经理审批同意内容
      isShowLevelOneNoPassCheck: false, //是否显示部门经理审批不同意内容
      isShowLevelTwoPassCheck: false, //是否显示部门总监审批同意内容
      isShowLevelTwoNoPassCheck: false, //是否显示部门总监审批不同意内容
      isShowLevelThreePassCheck: false, //是否显示分管副总审批同意内容
      isShowLevelThreeNoPassCheck: false, //是否显示分管副总审批不同意内容
      
      isShowCheckStep: 0, //0 不出现审核按钮，大于0出现   1部门经理审批  2部门总监审批  3分管副总审批


      checkForm: {
        content: ""
      },
    }
  },
  computed: {
    ...mapState(["userInfo", "leaveTypes"])
  },
  methods: {

    // 返回
    handleGoBack() {
      this.$router.go(-1)
    },

    // 撤销
    handleRevoke() {
      let vm = this
      this.$Modal.confirm({
        title: "消息提示",
        content: "确定撤销预约？",
        onOk(){
          const post_data = {
            apply_guid: vm.applyInfo.apply_guid,
            flow_guid: vm.flowInfo[2]?vm.flowInfo[2]["flow_guid"]:"",
            now_step_guid: vm.applyInfo.now_step_guid,
            applyer_guid: vm.applyInfo.user_guid,
          }
          vm.$http.revokeApply(post_data).then(res => {
            if(res.code === '200'){
              vm.$Message.success(res.message)
              vm.getDetailData()
            }else{
              vm.$Message.warning(res.message)
            }
          })
        }
      })
    },

    // 重新提交
    handleReSubmit() {
      this.$router.push({name: "leaveMage_apply", query: this.$route.query})
    },

    //修改申请
    handleEditApply() {
      this.$router.push({name: "leaveMage_apply", query: this.$route.query})
    },

    //审核-同意
    async handlePassByCheck() {
      let post_data = {
        apply_guid: this.applyInfo.apply_guid,
        now_step_guid: this.applyInfo.now_step_guid,
        remark: this.checkForm.content,
      }
      let res = null
      
      
      if(this.isShowCheckStep == 1) {// 部门经理
        post_data['flow_guid'] = this.flowInfo[2]?this.flowInfo[2]["flow_guid"]:""

        // 小于7天不需要部门总监审批
        if(this.applyInfo < 7) {
          post_data['flow_guid'] = this.flowInfo[4]?this.flowInfo[4]["flow_guid"]:""
          post_data['v_guid'] = this.applyInfo.v_guid
          post_data['days'] = this.applyInfo.days
          post_data['hours'] = this.applyInfo.hours
          post_data['type'] = this.applyInfo.type
          res = await this.$http.checkFinallyForLeaveApply(post_data)
        }else{
          res = await this.$http.checkForLeaveApply(post_data)
        }
      }else if(this.isShowCheckStep == 2) { //部门总监
        post_data['flow_guid'] = this.flowInfo[3]?this.flowInfo[3]["flow_guid"]:""
        res = await this.$http.checkForLeaveApply(post_data)
      }else if(this.isShowCheckStep == 3){ //分管副总 最后审批
        post_data['flow_guid'] = this.flowInfo[4]?this.flowInfo[4]["flow_guid"]:""
        post_data['v_guid'] = this.applyInfo.v_guid
        post_data['days'] = this.applyInfo.days
        post_data['hours'] = this.applyInfo.hours
        post_data['type'] = this.applyInfo.type
        res = await this.$http.checkFinallyForLeaveApply(post_data)
      }

      if(res.code === '200'){
        this.$Message.success(res.message)
        this.getDetailData()
      }else{
        this.$Message.warning(res.message)
      }
    },

    //审核-不同意
    handleNoPassByCheck() {
      if(!this.checkForm.content.trim()) {
        return this.$Message.warning("审批意见不能为空")
      }

      let post_data = {
        apply_guid: this.applyInfo.apply_guid,
        now_step_guid: this.applyInfo.now_step_guid,
        applyer_guid: this.applyInfo.user_guid,
        remark: this.checkForm.content,
      }

      if(this.isShowCheckStep == 1) {
        post_data['flow_guid'] =  this.flowInfo[2] ? this.flowInfo[2]["flow_guid"] : ""
      }else if(this.isShowCheckStep == 2) {
        post_data['flow_guid'] =  this.flowInfo[3] ? this.flowInfo[3]["flow_guid"] : ""
      }else if(this.isShowCheckStep == 3) {
        post_data['flow_guid'] =  this.flowInfo[4] ? this.flowInfo[4]["flow_guid"] : ""
      }

      this.$http.returnApply(post_data).then(res => {
        if(res.code === '200'){
          this.$Message.success(res.message)
          this.getDetailData()
        }else{
          this.$Message.warning(res.message)
        }
      })
    },

    //数据处理
    transformData(applyInfo, flowInfo) {
      if(this.userInfo.user_guid == applyInfo.user_guid) {
        if(flowInfo[2] && flowInfo[2]["result"] == '0') {
          this.isShowRevokeBtn = true
        }else{
          this.isShowRevokeBtn = false
        }

        if(applyInfo.process_status == '4') {
          this.isShowRepeatSubmitBtn = true
        }else{
          this.isShowRepeatSubmitBtn = false
        }

        // 显示提示信息
        if(flowInfo[2] && flowInfo[2]["result"] == '0') {
          this.applyTips = 1
        }else if(applyInfo.process_status == '2') {
          this.applyTips = 2
        }else if(applyInfo.process_status == '3') {
          this.applyTips = 3
        }else{
          this.applyTips = 0
        }
      }

      if(flowInfo[2] && flowInfo[2]["result"] == '1') {
        this.isShowLevelOnePassCheck = true
      }else{
        this.isShowLevelOnePassCheck = false
      }

      if(flowInfo[2] && flowInfo[2]["result"] == '3') {
        this.isShowLevelOneNoPassCheck = true
      }else{
        this.isShowLevelOneNoPassCheck = false
      }

      if(flowInfo[3] && flowInfo[3]["result"] == '1') {
        this.isShowLevelTwoPassCheck = true
      }else{
        this.isShowLevelTwoPassCheck = false
      }
      
      if(flowInfo[3] && flowInfo[3]["result"] == '3') {
        this.isShowLevelTwoNoPassCheck = true
      }else{
        this.isShowLevelTwoNoPassCheck = false
      }

      if(flowInfo[4] && flowInfo[4]["result"] == '1') {
        this.isShowLevelThreePassCheck = true
      }else{
        this.isShowLevelThreePassCheck = false
      }
      
      if(flowInfo[4] && flowInfo[4]["result"] == '3') {
        this.isShowLevelThreeNoPassCheck = true
      }else{
        this.isShowLevelThreeNoPassCheck = false
      }

      // 判断是否到部门经理审核
      if(applyInfo.now_step_sort == 2 && flowInfo[2]["operator_guid"] == this.userInfo.user_guid && flowInfo[2]["result"] == ''){
        this.isShowCheckStep = 1
      }else if(applyInfo.now_step_sort == 3 && flowInfo[3]["operator_guid"] == this.userInfo.user_guid && flowInfo[3]["result"] == ''){
        this.isShowCheckStep = 2
      }else if(applyInfo.now_step_sort == 4 && flowInfo[4]["operator_guid"] == this.userInfo.user_guid && flowInfo[4]["result"] == ''){
        this.isShowCheckStep = 2
      }else{
        this.isShowCheckStep = 0
      }


    },

    //处理申请进度
    handleStep(applyInfo, flowInfo) {
      if(flowInfo[2] && flowInfo[2]["result"] == 1) {
        this.nowStep = 1
        this.stepStatus = 'finish'
      }else if(flowInfo[2] && (flowInfo[2]["result"] == 2 || flowInfo[2]["result"] == 3)) {
        this.nowStep = 1
        this.stepStatus = 'error'
      }

      if(flowInfo[3] && flowInfo[3]["result"] == 1) {
        this.nowStep = 2
        this.stepStatus = 'wait'
      }else if(flowInfo[3] && (flowInfo[3]["result"] == 2 || flowInfo[3]["result"] == 3)) {
        this.nowStep = 2
        this.stepStatus = 'error'
      }

      if(flowInfo[4] && flowInfo[4]["result"] == 1) {
        this.nowStep = 3
        this.stepStatus = 'finish'
      }else if(flowInfo[4] && (flowInfo[4]["result"] == 2 || flowInfo[4]["result"] == 3)) {
        this.nowStep = 3
        this.stepStatus = 'error'
      }

    },

    // 拉取详情数据
    async getDetailData() {
      try {
        const params = { 
          apply_guid: this.$route.query.apply_guid,
          now_step_guid: this.$route.query.now_step_guid,
        }
        const res = await this.$http.getLeaveApplyDetail(params)
        console.log(res)
        if(res.code ===  '200'){
          const { info, p_info, step_flow, type_a } = res.extraData
          this.applyInfo = info
          this.flowInfo = step_flow
          this.$nextTick(() => {
            this.transformData(info, step_flow)
            this.handleStep(info, step_flow)
          })
        }else{
          this.$Message.warning(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },

    init() {
      this.getDetailData()
    }
  },
  created() {
    this.init()
  },
  filters: {
    // 请假类型转换
    convertLeveaType(typeVal, typeList) {
      let text = ''
      typeList.forEach(item => {
        if(typeVal == item.value){
          text = item.name
        }
      })
      return text
    }
  }
}
</script>


<style lang="scss" scoped>
.page-container{
  background-color: #fff;
  padding-bottom: 100px;
}

.progress-wrap{
  padding: 50px 20px;
  width: 900px;
}

.msg-tips{
  background-color: #F9F9F9;
  padding: 15px;
  .pass{
    color: #30A5FF;
  }
  .wait{
    color: #30A5FF;
  }
  .back{
    color: #ff6666;
  }
}

// 申请信息
.apply-info{
  background-color: #F9F9F9;
  padding: 0 15px 0 15px;
  margin-top:15px;
  .info-item{
    display: inline-block;
    padding: 15px 0;
    margin-right: 60px;
    font-size: 14px;
    .item-label{
      display: inline-block;
      font-weight: 700;
      color: #999;
    }
    .item-val{
      display: inline-block;
      color: #6F7377;
      font-weight: 600;
      font-size: 15px;
    }
    .reason{
      width:calc(100% - 100px);
      vertical-align: top;
      line-height: 1.5;
      margin-top: -5px;
    }
  }
}

//审核信息
.check-info{
  margin-top:15px;
  .check-item{
    margin-bottom: 15px;
    padding: 1px 15px 10px;
    background-color: #F9F9F9;
    .checker-info{
      .info-item{
        display: inline-block;
        padding: 10px 0;
        margin-right: 60px;
        font-size: 14px;
        .item-label{
          display: inline-block;
          font-weight: 700;
          color: #999;
        }
        .item-val{
          display: inline-block;
          color: #6F7377;
          font-weight: 600;
          font-size: 15px;
        }
        .result{
          font-weight: 600;
          font-size: 15px;
          margin-left: 2px;
          &.pass{
            color: #000;
          }
          &.nopass{
            color: #ff6666;
          }
        }
      }
    }
    .check-content{
      padding: 5px 10px;
      line-height: 1.5;
      background-color: #E9ECF2;
    }
  }
}

// 审核操作
.check-form{
  .form-item{
    margin-bottom: 20px;
    .label{
      display: inline-block;
    }
  }
  .form-operate{
    text-align: center;
    .btn{
      margin: 0 20px;
      width: 120px;
    }
  }
}
</style>

