<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">申请详情</h2>
      <div class="top-btn">
        <Button type="error"  class="btn" v-if="isShowRevokeBtn" @click="handleRevoke">撤回</Button>
        <Button type="error"  class="btn" v-if="isShowRepeatSubmitBtn" @click="handleReSubmit">重新提交</Button>
        <Button class="btn" @click="handleGoBack">返回</Button>
      </div>
    </div>

    <!-- 提示信息 -->
    <div class="msg-tips" v-if="applyTips > 0">
      <span class="wait" v-if="applyTips == 1">你的申请正在审批中，请等待...</span>
      <span class="pass" v-if="applyTips == 2">出差申请已被批准</span>
      <span class="back" v-if="applyTips == 3">你的申请已被退回，你可以修改并重新申请 <Button type="primary" @click="handleEditApply">修改申请</Button></span>
      <span class="back" v-if="applyTips == 4">出差报告被退回，请重新上传</span>
    </div>

    <!-- 申请详情 -->
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
          <span class="item-label">出差时间：</span>
          <span class="item-val">{{applyInfo.sdate|formatToDateTime}} 至 {{applyInfo.edate|formatToDateTime}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">出差地点：</span>
          <span class="item-val">{{applyInfo.location}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">出差原因：</span>
          <span class="item-val">{{applyInfo.reason}}</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">是否提交出差报告：</span>
          <span class="item-val">{{applyInfo.report == 1 ? "是" : "否"}}</span>
        </div>
      </div>
      <div>
        <div class="info-item" style="display:block;">
          <span class="item-label">出差安排：</span>
          <span class="item-val reason">{{applyInfo.plan}}</span>
        </div>
      </div>
    </div>

    <!-- 审核信息 -->
    <div class="check-info">
      <!-- 部门主管 start -->
      <div class="check-item" v-if="isShowLevelOnePassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门主管：</span>
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
            <span class="item-label">部门主管：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[2] && flowInfo[2].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[2] ? flowInfo[2].remark : "-无-"}}</div>
      </div>
      <!-- 部门主管 end -->
      <!-- 部门经理 start -->
      <div class="check-item" v-if="isShowLevelTwoPassCheck">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门经理：</span>
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
            <span class="item-label">部门经理：</span>
            <span class="item-val">{{flowInfo[3] && flowInfo[3].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[3] && flowInfo[3].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[3] ? flowInfo[3].remark : "-无-"}}</div>
      </div>
      <!-- 部门经理 end -->
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

      <!-- 部门主管 second start -->
      <div class="check-item" v-if="isShowLevelOnePassCheck2">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门主管：</span>
            <span class="item-val">{{flowInfo[6] && flowInfo[6].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[6] && flowInfo[6].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[6] ? flowInfo[6].remark : "-无-"}}</div>
      </div>
      <div class="check-item" v-if="isShowLevelOneNoPassCheck2">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-close-circle" style="color:#ff6666;" size="20" /> <span class="result pass">不批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门主管：</span>
            <span class="item-val">{{flowInfo[6] && flowInfo[6].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[6] && flowInfo[6].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[6] ? flowInfo[6].remark : "-无-"}}</div>
      </div>
      <!-- 部门主管 second end -->
      <!-- 部门经理 second start -->
      <div class="check-item" v-if="isShowLevelTwoPassCheck2">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门经理：</span>
            <span class="item-val">{{flowInfo[7] && flowInfo[7].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[7] && flowInfo[7].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[7] ? flowInfo[7].remark : "-无-"}}</div>
      </div>
      <div class="check-item" v-if="isShowLevelTwoNoPassCheck2">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-close-circle" style="color:#ff6666;" size="20" /> <span class="result pass">不批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">部门经理：</span>
            <span class="item-val">{{flowInfo[7] && flowInfo[7].operator_name}}</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">{{flowInfo[7] && flowInfo[7].update_time|formatToDateTime}}</span> 
          </div>
        </div>
        <div class="check-content">审批说明：{{flowInfo[7] ? flowInfo[7].remark : "-无-"}}</div>
      </div>
      <!-- 部门经理 second end -->
    </div>

    <!-- 文件列表 -->
    <div class="uploaded-file-wrap" v-if=" isShowUploadFile">
      <div class="label">出差报告</div>
      <div class="content">
        <ul class="file-list">
          <li v-if="documentList.length > 0">
            <div class="text">附件（{{documentList.length}}个）</div>
            <div class="operate">
              <a href="javascript:;">下载</a>
            </div>
          </li>
          <li v-else>无</li>
          <li v-for="(item, index) of documentList" :key="index">
            <div class="text">{{item.doc_name}}</div>
            <div class="operate">
              <a href="javascript:;" @click="handleDownLoadFile(item)">下载</a>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 文件上传 -->
    <div class="upload-wrap" v-if="isShowUploadBtn">
      <UploadFile 
        multiple
        @on-choose="handleChooseFile" 
        @on-delFile="handleDelFile" 
      />
      <Button type="primary" class="btn" @click="handleSubmitFile" style="width:150px;">提交</Button>
    </div>

    <!-- 待审核出现 -->
    <div class="check-form" v-if="isShowCheckStep > 0 && isShowCheckStep <= 3">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input v-model="checkForm.content" style="width:calc(100% - 80px); margin-left:10px;" type="textarea" :rows="5" placeholder="填写审批意见" />
      </div>
      <div class="form-item" v-if="isShowCheckReport">
        <div class="label">是否需要申请人提交出差报告</div>
        <RadioGroup v-model="checkForm.isReport" class="form-radio" style="margin-left:15px;" >
            <Radio label="1">是</Radio>
            <Radio label="2">否</Radio>
        </RadioGroup>
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn" @click="handlePassByFirstCheck">批准</Button>
        <Button type="error"  class="btn" @click="handleNoPassByFirstCheck">不批准</Button>
      </div>
    </div>

    <!-- 审批已提交的报告 -->
    <div class="check-form" v-if="isShowCheckStep > 0 && isShowCheckStep > 3">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input v-model="checkForm.content" style="width:calc(100% - 80px); margin-left:10px;" type="textarea" :rows="5" placeholder="填写审批意见" />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn" @click="handlePassBySecondCheck">通过</Button>
        <Button type="error"  class="btn" @click="handleNoPassBySecondCheck">退回申请人修改报告</Button>
      </div>
    </div>

  </div>
</template>

<script>
import UploadFile from "@c/common/UploadFile"
import { formatTimestamp } from "@/utils/moment"
import { mapState } from 'vuex'
export default {
  components: {
    UploadFile
  },
  name: "Detail",
  data() {
    return {
      applyInfo: {},
      flowInfo: {},
      documentList: [], //上传报告列表

      isShowRevokeBtn: false, //是否显示撤销按钮
      isShowRepeatSubmitBtn: false, //是否显示重新提交按钮
      applyTips: 0, // 1审核中  2已被批准 3已被退回  4出差报告被退回，请重新上传

      isShowLevelOnePassCheck: false, //是否显示部门经理审批同意内容
      isShowLevelOneNoPassCheck: false, //是否显示部门经理审批不同意内容
      isShowLevelTwoPassCheck: false, //是否显示部门总监审批同意内容
      isShowLevelTwoNoPassCheck: false, //是否显示部门总监审批不同意内容
      isShowLevelThreePassCheck: false, //是否显示分管副总审批同意内容
      isShowLevelThreeNoPassCheck: false, //是否显示分管副总审批不同意内容

      isShowLevelOnePassCheck2: false, //是否显示部门经理审批同意内容【提交报告后】
      isShowLevelOneNoPassCheck2: false, //是否显示部门经理审批不同意内容【提交报告后】
      isShowLevelTwoPassCheck2: false, //是否显示部门总监审批同意内容【提交报告后】
      isShowLevelTwoNoPassCheck2: false, //是否显示部门总监审批不同意内容【提交报告后】

      
      isShowUploadFile: false, //是否显示上传报告内容
      isShowUploadBtn: false, //是否显示上传报告入口
      isShowCheckStep: 0, //0 不出现审核表单按钮，大于0出现   1一级审批人审批  2二级审批人审批  3三级审批人审批  4一级审批人再审批【提交报告后】  5二级审批人再审批【提交报告后】
      isShowCheckReport: false, //审核时，是否要出现选择是否提交报告选择项

      checkForm: {
        content: "",
        isReport: "",
      },

      // 选择上传的附件
      uploadFileList: [],
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    // 选择好文件
    handleChooseFile(ret) {
      console.log(ret)
      this.uploadFileList = ret.fileList
    },

    // 删除选择好文件
    handleDelFile(ret) {
      console.log(ret)
      this.uploadFileList = ret.fileList
    },

    //上传文件
    async handleSubmitFile() {
      if(this.uploadFileList.length == 0) {
        return this.$Message.warning("请先上传出差报告")
      }

      let formData = new FormData()
      formData.append('upload_token', this.userInfo.upload_token)
      this.uploadFileList.forEach(fileItem => {
        formData.append('myfile[]', fileItem.file)
      })

      const res = await this.$http.uploadFileByForm(formData)
      console.log('上传出差报告', res)

      if(res.code === '200') {
        this.$Message.success(res.message)
        const fileInfo = res.extraData.map(item => {
          return { fid: item.fid, name: item.s_name}
        })
        const ret = await this.doSubmitFileAjax(fileInfo)
        if(ret.code === '200') {
          this.$Message.success(ret.message)
          this.getDetailData() //更新详情
        }else{
          this.$Message.warning(ret.message)
        }
      }else{
        this.$Message.warning(res.message)
      }
    },

    //提交出差报告
    async doSubmitFileAjax(fileInfo) {
      const post_data = {
        apply_guid: this.applyInfo.apply_guid,
        flow_guid: this.getFlowGuid(),
        now_step_guid: this.applyInfo.now_step_guid,
        pinfo: fileInfo
      }
      return this.$http.uploadFileForBusinesstrip(post_data)
    },

    //下载报告
    handleDownLoadFile(item) {
      const downLoadUrl = `${ window.location.origin }${ item.doc_url }`
      window.open(downLoadUrl)
    },
    
    // 返回
    handleGoBack() {
      this.$router.go(-1)
    },

    // 撤销
    handleRevoke() {
      let vm = this
      this.$Modal.confirm({
        title: "消息提示",
        content: "确定撤回？",
        onOk(){
          const post_data = {
            apply_guid: vm.applyInfo.apply_guid,
            flow_guid: vm.getFlowGuid(),
            // flow_guid: vm.flowInfo[2]?vm.flowInfo[2]["flow_guid"]:"",
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
      this.$router.push({name: "businesstripMage_apply", query: this.$route.query})
    },

    //修改申请
    handleEditApply() {
      this.$router.push({name: "businesstripMage_apply", query: this.$route.query})
    },

    //获取审核人 审核步骤guid
    getFlowGuid() {
      let flow_guid = ""
      Object.keys(this.flowInfo).forEach(key => {
        let item = this.flowInfo[key]
        if(item.operator_guid == this.userInfo.user_guid) {
          flow_guid = item.flow_guid
        }
      })
      return flow_guid
    },

    //审核-同意【first】
    async handlePassByFirstCheck() {
      let res = null
      
      if(this.isShowCheckStep == 1 || this.isShowCheckStep == 2) { // 一级审批人  二级审批人
          let post_data = {
            apply_guid: this.applyInfo.apply_guid,
            now_step_guid: this.applyInfo.now_step_guid,
            flow_guid: this.getFlowGuid(),
            remark: this.checkForm.content,
            my_report: this.checkForm.isReport,
            applyer_guid: this.checkForm.isReport == 1 ? this.applyInfo.user_guid : "",
            applyer_name: this.checkForm.isReport == 1 ? this.applyInfo.user_name : "",
          }
          res = await this.$http.checkForBusinesstripApply(post_data)
      }else if(this.isShowCheckStep == 3){ //三级审批人  最后审批
        let post_data = {
              apply_guid: this.applyInfo.apply_guid,
              now_step_guid: this.applyInfo.now_step_guid,
              flow_guid: this.getFlowGuid(),
              remark: this.checkForm.content,
            }
        res = await this.$http.checkFinallyForBusinesstripApply(post_data)
      }

      if(res.code === '200'){
        this.$Message.success(res.message)
        this.getDetailData()
      }else{
        this.$Message.warning(res.message)
      }
    },

    //审核-不同意【first】
    handleNoPassByFirstCheck() {
      if(!this.checkForm.content.trim()) {
        return this.$Message.warning("审批意见不能为空")
      }

      let post_data = {
        apply_guid: this.applyInfo.apply_guid,
        now_step_guid: this.applyInfo.now_step_guid,
        applyer_guid: this.applyInfo.user_guid,
        flow_guid: this.getFlowGuid(),
        remark: this.checkForm.content,
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

    // 审核-通过【second】
    async handlePassBySecondCheck() {
      let res = null
      let post_data = {
        apply_guid: this.applyInfo.apply_guid,
        now_step_guid: this.applyInfo.now_step_guid,
        applyer_guid: this.applyInfo.user_guid,
        flow_guid: this.getFlowGuid(),
        remark: this.checkForm.content,
      }
      res = await this.$http.checkForBusinesstripApply(post_data)

      if(res.code === '200'){
        this.$Message.success(res.message)
        this.getDetailData()
      }else{
        this.$Message.warning(res.message)
      }
    },

    // 审核-不通过退回申请人修改【second】
    async handleNoPassBySecondCheck() {
      let res = null
      let post_data = {
        apply_guid: this.applyInfo.apply_guid,
        now_step_guid: this.applyInfo.now_step_guid,
        flow_guid: this.getFlowGuid(),
        remark: this.checkForm.content,
      }
      res = await this.$http.returnApplyBySpecified(post_data)

      if(res.code === '200'){
        this.$Message.success(res.message)
        this.getDetailData()
      }else{
        this.$Message.warning(res.message)
      }
    },

    //数据处理
    transformData(applyInfo, flowInfo) {
      if(this.userInfo.user_guid == applyInfo.user_guid) {
        // 判断撤回按钮显示
        if(flowInfo[2] && flowInfo[2]["result"] == '0' || (flowInfo[applyInfo.now_step_sort] && flowInfo[applyInfo.now_step_sort]["result"] == 0 && !flowInfo[applyInfo.now_step_sort - 1])) {
          this.isShowRevokeBtn = true
        }else{
          this.isShowRevokeBtn = false
        }

        // 判断重新提交按钮显示
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
        }else if(flowInfo[6] && flowInfo[6]["result"] == '2') {
          this.applyTips = 4
        }else{
          this.applyTips = 0
        }
      }

      // 判断是否显示一级审批内容
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

      // 判断是否显示二级审批内容
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

      // 判断是否显示三级审批内容
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


      // 判断是否显示上传报告入口
      if(applyInfo.now_step_sort == '5' && flowInfo[5] && flowInfo[5]["result"] == '' && flowInfo[5]["operator_guid"] == this.userInfo.user_guid) {
        this.isShowUploadBtn = true
      }else{
        this.isShowUploadBtn = false
      }

      // 判断是否显示传报告内容
      if(flowInfo[5] && flowInfo[5]["result"] == '1') {
        this.isShowLevelThreeNoPassCheck = true
      }else{
        this.isShowLevelThreeNoPassCheck = false
      }

      // 判断是否显示一级审批内容【提交报告后】
      if(flowInfo[6] && flowInfo[6]["result"] == '1') {
        this.isShowLevelOnePassCheck2 = true
      }else{
        this.isShowLevelOnePassCheck2 = false
      }

      if(flowInfo[6] && flowInfo[6]["result"] == '3') {
        this.isShowLevelOneNoPassCheck2 = true
      }else{
        this.isShowLevelOneNoPassCheck2 = false
      }

      // 判断是否显示二级审批内容【提交报告后】
      if(flowInfo[7] && flowInfo[7]["result"] == '1') {
        this.isShowLevelTwoPassCheck2 = true
      }else{
        this.isShowLevelTwoPassCheck2 = false
      }
      
      if(flowInfo[7] && flowInfo[7]["result"] == '3') {
        this.isShowLevelTwoNoPassCheck2 = true
      }else{
        this.isShowLevelTwoNoPassCheck2 = false
      }


      // 判断是否到部门经理审核
      if(applyInfo.now_step_sort == 2 && flowInfo[2]["operator_guid"] == this.userInfo.user_guid && flowInfo[2]["result"] == ''){
        this.isShowCheckStep = 1  //要一级审批人审批
      }else if(applyInfo.now_step_sort == 3 && flowInfo[3]["operator_guid"] == this.userInfo.user_guid && flowInfo[3]["result"] == ''){
        this.isShowCheckStep = 2 //要二级审批人审批
      }else if(applyInfo.now_step_sort == 4 && flowInfo[4]["operator_guid"] == this.userInfo.user_guid && flowInfo[4]["result"] == ''){
        this.isShowCheckStep = 3  //要三级审批人审批
      }else if(applyInfo.now_step_sort == 6 && flowInfo[6]["operator_guid"] == this.userInfo.user_guid && flowInfo[6]["result"] == ''){
        this.isShowCheckStep = 4  //要一级审批人再次审批【已提交报告】
      }else if(applyInfo.now_step_sort == 7 && flowInfo[7]["operator_guid"] == this.userInfo.user_guid && flowInfo[7]["result"] == ''){
        this.isShowCheckStep = 5  //要二级审批人再次审批【已提交报告】
      }else{
        this.isShowCheckStep = 0
      }

      //审核时，是否要出现选择是否提交报告选择项
      if(applyInfo.report == '2' && (applyInfo.leader_report == '2' || applyInfo.leader_report == '0')) {
        this.isShowCheckReport = true
      }else{
        this.isShowCheckReport = false
      }


    },

    // 拉取详情数据
    async getDetailData() {
      try {
        const params = { 
          apply_guid: this.$route.query.apply_guid,
          now_step_guid: this.$route.query.now_step_guid,
        }
        const res = await this.$http.getBusinesstripApplyDetail(params)
        console.log(res)
        if(res.code ===  '200'){
          const { info, p_info, step_flow, document } = res.extraData
          this.applyInfo = info
          this.flowInfo = step_flow
          this.documentList = document
          this.$nextTick(() => {
            this.transformData(info, step_flow)
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
  margin-bottom: 20px;
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
      width: 150px;
    }
  }
}

// 文件上传
.upload-wrap{
  margin-bottom: 25px;
  .btn{
    margin-left: 66px;
    margin-top: 20px;
  }
}

// 已上传的附件
.uploaded-file-wrap{
  background-color: #F9F9F9;
  padding: 20px 15px;
  margin:15px 0;
  display: flex;
  .label{
    margin-top: 5px;
    margin-right: 7px;
  }
  .content{
    .file-list{
      width: 500px;
      li{
        position: relative;
        padding: 10px 10px 10px 30px;
        display: flex;
        background-color: #fff;
        .text{
          width: 90%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .operate{
          a{
            margin-left: 10px;
            text-decoration: underline;
            color: #30A5FF;
          }
        }
        &:first-child{
          background-color: #E9ECF2;
        }
        &::before{
          position: absolute;
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
          content: "";
          width: 17px;
          height: 17px;
          background: url("../../../assets/img/icons.png") no-repeat -144px -1px;
        }
      }
    }
  }
}

</style>

