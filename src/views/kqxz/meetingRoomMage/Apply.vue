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
            <Input class="form-input" style="width:600px;"/>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>参会人数：</span>
            <Input class="form-input" type="number" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>选择会议室：</span>
            <Select class="form-select">
                <Option v-for="item in cateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>会议时间：</span>
            <DatePicker type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
            <DatePicker type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
          </div>
          <span class="calcTime-tips">*该时间段此会议室已被预约，请选择其他时间。</span>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>是否需要投影设备：</span>
            <RadioGroup class="form-radio">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
            </RadioGroup>
          </div>
        </div>
      </div>
      <div class="form-operate">
        <Button type="primary" class="submit-btn">提交</Button>
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
      cateList: [],
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
  }
}
</script>

<style lang="scss" scoped>
.page-title{
  padding-bottom: 15px;
  margin-bottom: 10px;
  border-bottom: solid 1px #ccc;
  .title{
    font-size: 18px;
  }
}

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
