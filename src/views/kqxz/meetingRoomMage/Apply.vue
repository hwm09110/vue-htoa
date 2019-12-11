<template>
  <div class="apply-container">
    <div class="page-title">
      <h2 class="title">会议室预约</h2>
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
        <span class="item-label">申请地区： </span>
        <span class="item-val">{{userInfo.location_name}}</span>
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
            <span class="label"><i class="require"></i>会议主题：</span>
            <Input class="form-input" style="width:600px;" v-model="formData.theme"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>参会人数：</span>
            <Input class="form-input" type="number" v-model="formData.num" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>选择会议室：</span>
            <Select class="form-select" v-model="formData.room_guid" label-in-value @on-change="handleSelectRoom">
                <Option v-for="item in meetingRoomList" :value="item.room_guid" :key="item.room_guid">{{ item.room_name }}</Option>
            </Select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>会议时间：</span>
            <DatePicker v-model="formData.stime" @on-ok="handlePickDatetime" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
            <DatePicker v-model="formData.etime" @on-ok="handlePickDatetime" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
          </div>
          <span class="calcTime-tips" v-show="hasBook">*该时间段此会议室已被预约，请选择其他时间。</span>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>是否需要投影设备：</span>
            <RadioGroup class="form-radio" v-model="formData.device">
                <Radio label="1">是</Radio>
                <Radio label="2">否</Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div class="form-operate">
        <Button type="primary" class="submit-btn" @click="handleSubmit">提交</Button>
      </div>
    </div>

    <div class="sub-title">会议室预约情况</div>

    <div class="table-wrap">
      <table class="cus-table">
        <tbody>
          <tr>
            <th>会议室</th>
            <th>预约时间</th>
            <th>预约人</th>
            <th>审批情况</th>
          </tr>
          <template v-for="(obj, guid) in bookedInfo">
            <tr :key="index" v-for="(itemInfo, index) of bookedInfo[guid]">
              <td :rowspan="bookedInfo[guid].length">{{itemInfo.room_name}}</td>
              <td>{{itemInfo.stime|formatTime}} - {{itemInfo.etime|formatTime}}</td>
              <td>{{itemInfo.user_name}}</td>
              <td>
                <span v-if="itemInfo.process_status == 2">预约成功</span>
                <span v-else>审批中</span>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { formatTimestamp } from "@/utils/moment"
export default {
  name:'Apply',
  data () {
    return {
      meetingRoomList: [],
      formData: {
        theme: "",
        num: "",
        room_guid: "",
        room_name: "",
        stime: "",
        etime: "",
        stimeStamps: "",
        etimeStamps: "",
        device: "",
      },
      hasBook: false, //该时间段此会议室是否已被预约

      tableColumns: [
        {
          title: '会议室',
          key: 'roomName'
        },
        {
          title: '预约时间',
          key: 'yytime',
          width: "300",
          slot: 'yytime'
        },
        {
          title: '预约人',
          key: 'applyer'
        },
        {
          title: '审批情况',
          key: 'status'
        },
      ],
      tableData: [
        {
          roomName: "一楼会议室",
          applyer: "张三",
          yytime: "12-12 10:20 - 12-12 11:30",
          status: "待审批",
        },
        {
          roomName: "一楼会议室",
          applyer: "张三",
          yytime: "12-12 10:20 - 12-12 11:30",
          status: "待审批",
        },
        {
          roomName: "一楼会议室",
          applyer: "张三",
          yytime: "12-12 10:20 - 12-12 11:30",
          status: "待审批",
        },
      ],

      orderNumber: (Math.round(Date.now()/1000)), //单号
      p_info: {
        p_guid: "",
        p_name: "",
        step_guid: "",
      },
      bookedInfo:{}, //会议室预约情况

      applyInfo: {}, //编辑申请单详情
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {

    //选择开始时间、结束时间
    handlePickDatetime() {
      this.checkPickDateTime()
    },

    // 检查预约时间是否正确
    checkPickDateTime() {
      let stimeStamps = 0
      let etimeStamps = 0

      if(this.formData.stime) {
        stimeStamps = Math.floor(new Date(this.formData.stime).getTime() / 1000)
      }
      if(this.formData.etime) {
        etimeStamps = Math.floor(new Date(this.formData.etime).getTime() / 1000)
      }
      console.log(stimeStamps, etimeStamps)
      if(stimeStamps > 0 && etimeStamps > 0) {
        if(etimeStamps <= stimeStamps) {
          this.$Message.warning("结束时间不能小于开始时间")
          return false
        }
      }

      this.formData.stimeStamps = stimeStamps
      this.formData.etimeStamps = etimeStamps
      return true
    },

    //选择会议室
    handleSelectRoom(result) {
      this.formData.room_guid = result.value
      this.formData.room_name = result.label 
    },

    // 检查表单数据
    checkFormData() {
      let result = { code: 200, message: ""}

      if(!this.formData.theme.trim()) {
        result.code = 2001
        result.message = "会议主题不能为空"
        return result  
      }
      if(!this.formData.num) {
        result.code = 2001
        result.message = "参会人数不能为空"
        return result  
      }
      if(!this.formData.room_guid) {
        result.code = 2001
        result.message = "请先选择会议室"
        return result  
      }
      if(!this.formData.stimeStamps) {
        result.code = 2001
        result.message = "会议开始时间不能为空"
        return result  
      }
      if(!this.formData.etimeStamps) {
        result.code = 2001
        result.message = "会议结束时间不能为空"
        return result  
      }
      if(!this.formData.device) {
        result.code = 2001
        result.message = "选择是否需要投影设备"
        return result  
      }
      return result
    },

    // 提交申请
    handleSubmit() {
      console.log(this.formData)
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
        theme: this.formData.theme,
        num: this.formData.num,
        room_guid: this.formData.room_guid,
        room_name: this.formData.room_name,
        stime: this.formData.stimeStamps,
        etime: this.formData.etimeStamps,
        device: this.formData.device,
      }

      this.$http.addBoardRoomApply(post_data).then(res => {
        if(res.code === '200'){
          this.$Message.success(res.message)
          this.$router.push({name: "meetingRoomMage_applylist"})
        }else{
          this.$Message.warning(res.message)
        }
      })
      
    },

    //回填编辑表单
    fillEditForm(applyInfo) {
      this.flow_number = applyInfo.flow_number
      this.formData.theme = applyInfo.theme
      this.formData.num = applyInfo.num
      this.formData.room_guid = applyInfo.room_guid
      this.formData.room_name = applyInfo.room_name
      this.formData.stime = applyInfo.stime ? new Date(applyInfo.stime*1000) : ""
      this.formData.etime = applyInfo.etime ? new Date(applyInfo.etime*1000) : ""
      this.formData.stimeStamps = applyInfo.stime
      this.formData.etimeStamps = applyInfo.etime
      this.formData.device = applyInfo.device
    },

    // 拉取编辑申请单数据
    async getEditDetailData() {
      if(!this.$route.query.apply_guid || !this.$route.query.now_step_guid) return
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
          this.fillEditForm(info)
        }else{
          this.$Message.warning(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },

    async init() {
      try {
        const ret = await this.$http.getBoardRoomApplyConfig()
        if(ret.code === '200'){
          const { p_info, room, room_dated } = ret.extraData
          this.meetingRoomList = room
          this.p_info = p_info
          this.bookedInfo = room_dated
          console.log(this.bookedInfo)
        }
        await this.getEditDetailData()
      } catch (error) {
        console.log(error)
      }
      
    },
  },
  created() {
    this.init()
  },
  filters: {
    formatTime(timestamps) {
      return formatTimestamp(timestamps*1000, "MM-DD HH:mm")
    }
  }
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
  width: 80%;
  min-width: 800px;
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
        margin-top: 10px;
        display:inline-block; 
        // width:300px;
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

.sub-title{
  padding: 20px 0;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
  font-size: 16px;
}

.table-wrap{
  width: 70%;
  margin-top: 20px;
}

</style>
