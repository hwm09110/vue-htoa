<template>
  <div class="apply-container">
    <div class="page-title">
      <h2 class="title">会议室预约</h2>
    </div>

    <div class="applyer-info">
      <div class="info-item">
        <span class="item-label">姓名：</span>
        <span class="item-val">黄伟明</span>
      </div>
      <div class="info-item">
        <span class="item-label">部门：</span>
        <span class="item-val">技术部</span>
      </div>
      <div class="info-item">
        <span class="item-label">职务：</span>
        <span class="item-val">WEB前端开发工程师</span>
      </div>
      <div class="info-item">
        <span class="item-label">申请地区： </span>
        <span class="item-val">广州</span>
      </div>
      <div class="info-item">
        <span class="item-label">单号：  </span>
        <span class="item-val">20191204165715</span>
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
            <Select class="form-select" v-model="formData.room_guid">
                <Option v-for="item in meetingRoomList" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
          <tr>
            <td rowspan="3">一楼会议室</td>
            <td>12-21 10:20 - 12-21 11:30</td>
            <td>张三</td>
            <td>预约成功</td>
          </tr>
          <tr>
            <td>12-21 10:20 - 12-21 11:30</td>
            <td>张三</td>
            <td>预约成功</td>
          </tr>
          <tr>
            <td>12-21 10:20 - 12-21 11:30</td>
            <td>张三</td>
            <td>预约成功</td>
          </tr>
          <tr>
            <td rowspan="2">二楼会议室</td>
            <td>12-21 10:20 - 12-21 11:30</td>
            <td>张三</td>
            <td>预约成功</td>
          </tr>
          <tr>
            <td>12-21 10:20 - 12-21 11:30</td>
            <td>张三</td>
            <td>预约成功</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
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
    }
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
      return true
    },

    // 检查表单数据
    checkFormData() {
      let result = { code: 200, message: ""}

      if(!this.formData.theme.trim()) {
        result.code = 2001
        result.message = "会议主题不能为空"
        return result  
      }
      if(!this.formData.num.trim()) {
        result.code = 2001
        result.message = "参会人数不能为空"
        return result  
      }
      if(!this.formData.room_guid.trim()) {
        result.code = 2001
        result.message = "请先选择会议室"
        return result  
      }
      if(!this.formData.stime.trim()) {
        result.code = 2001
        result.message = "会议开始时间不能为空"
        return result  
      }
      if(!this.formData.etime.trim()) {
        result.code = 2001
        result.message = "会议结束时间不能为空"
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
      
    },


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
