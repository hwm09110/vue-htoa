<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">请假申请</h2>
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
        <span class="item-label">单号： </span>
        <span class="item-val">20191204141056</span>
      </div>
    </div>
    
    <div class="form-wrap">
      <div class="form-box">
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>请假类别：</span>
            <Select class="form-select">
                <Option v-for="item in cateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <span class="tips">一次性申请事假不超过10天</span>
          </div>
        </div>
        <div class="form-row">
          <Checkbox v-model="isAgree" style="margin-left:76px;">本人同意授权人力资源部，优先采用事假时长与加班时长相抵扣的原则计算相关薪酬</Checkbox>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>离开日期：</span>
            <DatePicker type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
          </div>
          <div class="form-item" style="margin-left:50px;">
            <span class="label"><i class="require"></i>报到日期：</span>
            <DatePicker type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm" class="form-time"></DatePicker>
          </div>
          <span class="calcTime-tips">*您的请假时间，将从请假之日起开始计算（包含节假日）。如分次休假，请分次提交。</span>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>请假天数：</span>
            <Input readonly style="width:100px;"/> 天
            <Input readonly style="width:100px;"/> 时
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>工作代理人：</span>
            <Input class="form-input" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>请假原因：</span>
            <Input style="width:800px;" type="textarea" :rows="5" placeholder="填写请假原因" />
          </div>
        </div>
      </div>
      <div class="form-operate">
        <Button type="primary" class="submit-btn">提交</Button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:'Apply',
  data () {
    return {
      cateList: [],
      isAgree: true,
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
