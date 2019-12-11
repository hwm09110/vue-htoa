<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">申请详情</h2>
      <div class="top-btn">
        <Button type="error" class="btn" v-if="isShowRevokeBtn">撤销</Button>
        <Button type="error" class="btn" v-if="isShowRepeatSubmitBtn">重新提交</Button>
        <Button class="btn" @click="handleGoBack">返回</Button>
      </div>
    </div>
    <div class="msg-tips">
      <span class="wait" v-if="applyTips == 1">你的申请正在审批中，请等待...</span>
      <span class="pass" v-if="applyTips == 2">会议室预约成功</span>
      <span class="back" v-if="applyTips == 3">你的申请已被退回，你可以修改并重新申请 <Button type="primary">修改申请</Button></span>
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
          <span class="item-label">会议主题：</span>
          <span class="item-val">{{applyInfo.theme}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">参会人数：</span>
          <span class="item-val">{{applyInfo.num}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">会议室：</span>
          <span class="item-val">{{applyInfo.room_name}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">会议开始时间：</span>
          <span class="item-val">{{applyInfo.stime|formatToDateTime}}</span>
        </div>
        <div class="info-item">
          <span class="item-label">会议结束时间：</span>
          <span class="item-val">{{applyInfo.etime|formatToDateTime}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">是否需要投影设备：</span>
          <span class="item-val">{{applyInfo.device == 1?"是":"否"}}</span>
        </div>
      </div>
    </div>
    <div class="check-info">
      <div class="check-item" v-if="isShowPassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">审批人：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[2] ? flowInfo[2].remark : "-无-"}}</div>
      </div>
      <div class="check-item" v-if="isShowNoPassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-close-circle" style="color:#ff6666;" size="20" /> <span class="result pass">不批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">审批人：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[2] ? flowInfo[2].remark : "-无-"}}</div>
      </div>
    </div>
    <div class="check-form" v-if="isShowCheckForm">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input style="width:calc(100% - 80px); margin-left:10px;" type="textarea" :rows="5" placeholder="填写审批意见" />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn">同意</Button>
        <Button type="error"  class="btn">退回</Button>
      </div>
    </div>
    <div class="cancel-operate" v-if="isShowCancelBtn">
      <span class="op-tips">如计划有更改，可取消预约。</span>
      <Button type="primary" class="btn" @click="handleCancel">取消预约</Button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      applyInfo: {},
      flowInfo: {},

      isShowRevokeBtn: false, //是否显示撤销按钮
      isShowRepeatSubmitBtn: false, //是否显示重新提交按钮
      applyTips: 1, // 1审核中  2预约成功 3被退回
      isShowCheckForm: false, //是否显示审核入口
      isShowPassCheck: false, //是否显示审批同意内容
      isShowNoPassCheck: false, //是否显示审批不同意内容
      isShowCancelBtn: false, //是否显示撤销按钮
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {

    // 返回
    handleGoBack() {
      this.$router.go(-1)
    },

    //取消预约
    handleCancel() {
      let vm = this
      this.$Modal.confirm({
        title: "消息",
        content: "确定取消预约？",
        onOk(){
          vm.$http.cancelBoardRoomApply({ apply_guid: vm.applyInfo.apply_guid }).then(res => {
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

    //数据处理
    transformData(applyInfo, flowInfo) {
      if(this.userInfo.user_guid == applyInfo.user_guid) {
        if(flowInfo[2] && flowInfo[2]["result"] == '0' || (flowInfo[applyInfo.now_step_sort] && flowInfo[applyInfo.now_step_sort]["result"] == '0' && !flowInfo[applyInfo.now_step_sort - 1])) {
          this.isShowRevokeBtn = true
        }
      }else if(applyInfo.process_status == '4') {
        this.isShowRepeatSubmitBtn = true
      }

      if(this.userInfo.user_guid == applyInfo.user_guid) {
        if(flowInfo[2] && flowInfo[2]["result"] == '0') {
          this.applyTips = 1
        }else if(applyInfo.process_status == '2') {
          this.applyTips = 2
        }else if(applyInfo.process_status == '3') {
          this.applyTips = 3
        }
      }

      if(applyInfo.now_step_sort == '2' && flowInfo[2].operator_guid == this.userInfo.user_guid && empty(flowInfo[2].result) && applyInfo.is_allow != 2) {
        this.isShowCheckForm = true
      }

      if(flowInfo[2] && flowInfo[2].result == 1 && applyInfo.is_allow != 2) {
        this.isShowPassCheck = true
      }

      if(flowInfo[2] && flowInfo[2].result == 3 && applyInfo.is_allow != 2) {
        this.isShowNoPassCheck = true
      }

      if(this.userInfo.user_guid == applyInfo.user_guid && applyInfo.process_status == '2') {
        this.isShowCancelBtn = true
      }

    },

    // 拉取详情数据
    async getDetailData() {
      try {
        const params = { 
          apply_guid: this.$route.query.apply_guid,
          now_step_guid: this.$route.query.now_step_guid,
        }
        const res = await this.$http.getBoardRoomApplyDetail(params)
        console.log(res)
        if(res.code ===  '200'){
          const { info, p_info, room, step_flow, room_dated } = res.extraData
          this.applyInfo = info
          this.flowInfo = step_flow
          this.transformData(info, step_flow)
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
  }
}
</script>


<style lang="scss" scoped>
.page-container{
  background-color: #fff;
  padding-bottom: 100px;
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

//取消预约
.cancel-operat{
  .op-tips{
    font-size: 14px;
  }
  .btn{
    margin-left: 20px;
  }
}
</style>

