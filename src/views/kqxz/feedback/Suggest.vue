<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">提建议</h2>
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
        <span class="item-label">问题编号： </span>
        <span class="item-val">20191204141056</span>
      </div>
    </div>
    
    <div class="form-wrap">
      <div class="form-box">
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>反馈对象：</span>
            <Select class="form-select">
                <Option v-for="item in cateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>问题：</span>
            <Input style="width:800px;" type="textarea" :rows="8" placeholder="填写问题" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-item">
            <span class="label"><i class="require"></i>建议方案：</span>
            <Input style="width:800px;" type="textarea" :rows="8" placeholder="填写建议方案" />
          </div>
        </div>
      </div>
      <div class="form-operate">
        <Button type="primary" class="submit-btn">提交</Button>
        <Button style="margin-left:30px;">取消</Button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name:'Suggest',
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
