<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">个人中心</h2>
    </div>
    <div class="tab-wrap">
      <Tabs type="card" @on-click="handleTabClick">
        <TabPane label="基本信息" name="1"></TabPane>
        <TabPane label="爱宏途我建议"  name="2"></TabPane>
      </Tabs>
    </div>
    <div class="main-wrap">
      <div class="info-content">
        <div class="row-box">
          <div class="info-item">
            <span class="name">人员名称：</span>
            <span class="val">{{info.user_name}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">区域：</span>
            <span class="val">{{info.location_name}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">所属部门：</span>
            <span class="val">{{info.dept_name}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">人员类别：</span>
            <span class="val">{{info.type_name}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">工作城市：</span>
            <span class="val">--</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">职务职级：</span>
            <span class="val">{{info.duty}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">直接上级：</span>
            <span class="val">{{info.monitor_name}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">性别：</span>
            <span class="val">{{info.gender == 1 ? "男" : "女"}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">入职时间：</span>
            <span class="val">{{info.workdate}}</span>
          </div>
          <div class="info-item">
            <span class="name">在职时长(年)：</span>
            <span class="val">{{info.work_time}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">试用期：</span>
            <span class="val">{{info.probation}}</span>
          </div>
          <div class="info-item">
            <span class="name">试用期截止时间：</span>
            <span class="val">{{info.probation_endtime}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">手机号码：</span>
            <span class="val">{{info.tel}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">工号：</span>
            <span class="val">{{info.work_num}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">短号：</span>
            <span class="val">-</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">邮箱：</span>
            <span class="val">-</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">身份证号码：</span>
            <span class="val">-</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">出生年：</span>
            <span class="val">{{info.year}}</span>
          </div>
          <div class="info-item">
            <span class="name">出生月：</span>
            <span class="val">{{info.month}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">出生日：</span>
            <span class="val">{{info.day}}</span>
          </div>
          <div class="info-item">
            <span class="name">年龄(周岁)：</span>
            <span class="val">{{info.age}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">考核类型：</span>
            <span class="val">{{info.assessment_type}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">基本工资：</span>
            <span class="val">{{info.basic_salary}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">合同类型：</span>
            <span class="val">{{info.contract_type}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">合同时间：</span>
            <span class="val">{{info.contract_btime}}-{{info.contract_etime}}</span>
          </div>
        </div>
      </div>
      <div class="portrait">
        <div class="img-box">
          <img :src="info.head_url" alt="img" v-if="info.head_url">
          <img src="../../assets/img/man.png" alt="img" v-else>
        </div>
        <Button type="primary" class="update-head-btn" @click="handleUpdateHead">修改头像</Button>
        <input type="file" id="uploadHeadInput" @change="handleChooseImg" style="display:none;">
      </div>
    </div>
    <div class="operate-box">
      <Button type="primary" class="btn" @click="updatePwdModal = !updatePwdModal">修改手机号码</Button>
      <Button type="primary" class="btn">修改密码</Button>
    </div>

    <!-- 修改手机号码 -->
    <Modal
        v-model="updatePwdModal"
        :mask-closable="false"
        :loading="updatePwdModalLoading"
        title="修改密码"
        @on-ok="handleOkUpdatePwd">
        <div class="modal-box">
          <Form ref="updatePwdForm" :model="updatePwdForm" :rules="updatePwdRule" :label-width="100">
            <FormItem label="原手机号码">
              <Input v-model="updatePwdForm.oldPhone" disabled />
            </FormItem>
            <FormItem label="新手机号码" prop="newPhone">
              <Input v-model="updatePwdForm.newPhone" placeholder="输入新手机号码" />
            </FormItem>
          </Form>
        </div>
    </Modal>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import utils from '@/utils'
export default {
  name: "Info",
  data() {
    const validatePwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('新手机号码不能为空'));
        } else {
          if(!utils.checkPhoneNumber(value)){
            callback(new Error('手机号码格式不正确'));
          }else{
            callback();
          }
        }
    }
    return {
      info: {},
      updatePwdModal: false,
      updatePwdModalLoading: true,
      updatePwdForm: {
        oldPhone: "",
        newPhone: "",
      },
      updatePwdRule: {
        newPhone: [
          { required: true, validator: validatePwd, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    handleTabClick(value) {
      console.log(value)
      if(value == 2) {
        this.$router.push({name: "feedback_self"})
      }
    },

    setUpdatePwdModalBtn() {
      this.updatePwdModalLoading = false
      setTimeout(() => {
        this.updatePwdModalLoading = true
      }, 50)
    },

    // 修改密码-确定
    handleOkUpdatePwd() {
      this.$refs['updatePwdForm'].validate((valid) => {
        console.log(valid)
        if(valid) {
          const post_data = {
            user_guid: this.userInfo.user_guid,
            tel: this.updatePwdForm.newPhone,
          }
          this.$http.editUserInfo(post_data).then(res => {
            if(res.code  === '200') {
              this.$Message.success(res.message)
              this.updatePwdModal = false
              this.updatePwdForm.newPhone = ""
              this.getPersonalInfo()
            }else{
              this.setUpdatePwdModalBtn()
            }
          })
        }
        this.setUpdatePwdModalBtn()
      })
    },

    //修改头像
    handleUpdateHead() {
      document.querySelector('#uploadHeadInput').click()
    },

    // 选择图片
    handleChooseImg(ev) {
      const file = ev.target.files[0]
      console.log(file)
      let formData = new FormData()
      formData.append('upload_token', this.userInfo.upload_token)
      formData.append('myfile', file)
      this.$http.uploadFileByForm(formData).then(res => {
        console.log(res)
        if(res.code === '200') {
          this.$Message.success(res.message)
          const fid = res.extraData[0] && res.extraData[0]["fid"]
          this.updateHead(fid)
        }else{
          this.$Message.warning(res.message)
        }
      })
    },

    // 更新头像
    updateHead(fid) {
      const post_data = {
        user_guid: this.userInfo.user_guid,
        fid
      }
      this.$http.editUserPortrait(post_data).then(res => {
        console.log(res)
        if(res.code === '200') {
          this.$Message.success(res.message)
          this.getPersonalInfo()
        }else{
          this.$Message.warning(res.message)
        }
      })
    },

    // 拉取个人信息数据
    async getPersonalInfo() {
      try {
        let params = {}
        params.user_guid = this.userInfo.user_guid
        const res = await this.$http.getPersonInfo(params)
        console.log(res)
        if(res.code ===  '200'){
          const info = res.extraData
          this.info = info
          this.updatePwdForm.oldPhone = info.tel
        }else{
          this.$Message.warning(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },

    init() {
      this.getPersonalInfo()
    }
  },
  created() {
    this.init()
  }

}
</script>


<style lang="scss" scoped>
.tab-wrap{
  margin-top: 15px;
}

.main-wrap{
  position: relative;
  .info-content{
    margin-top: 25px;
    .row-box{
      margin-bottom: 30px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .info-item{
        width: 260px;
        .name{
          font-size: 15px;
          display: inline-block;
          width: 120px;
          text-align: right;
          color: #666;
        }
        .val{
          font-size: 16px;
          color: #333;
        }
        margin-right: 20%;
      }
    }
  }
  .portrait{
    position: absolute;
    right: 10%;
    top: 0;
    .img-box{
      width: 152px;
      height: 212px;
      border: 2px solid #dcdcdc;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .update-head-btn{
      display: block;
      margin: 10px auto;
    }
  }
}

.operate-box{
  padding-left: 100px;
  padding-bottom: 100px;
  margin-top: 20px;
  .btn{
    margin: 0 20px;
  }
}
</style>


