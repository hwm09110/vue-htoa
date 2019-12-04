<template>
  <div class="page-container">
    <h1 class="page-title">个人中心</h1>
    <div class="tab-wrap">
      <Tabs type="card">
        <TabPane label="基本信息"></TabPane>
        <TabPane label="爱宏途我建议"></TabPane>
    </Tabs>
    </div>
    <div class="main-wrap">
      <div class="info-content">
        <div class="row-box">
          <div class="info-item">
            <span class="name">人员名称：</span>
            <span class="val">张三丰</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">区域：</span>
            <span class="val">总部</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">所属部门：</span>
            <span class="val">技术部</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">人员类别：</span>
            <span class="val">工程师</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">工作城市：</span>
            <span class="val">广东省-广州市 D级</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">职务职级：</span>
            <span class="val">前端-前端工程师</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">直接上级：</span>
            <span class="val">张飞</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">性别：</span>
            <span class="val">男</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">入职时间：</span>
            <span class="val">2017-10-01</span>
          </div>
          <div class="info-item">
            <span class="name">在职时长(年)：</span>
            <span class="val">2</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">试用期：</span>
            <span class="val">2017-10-01</span>
          </div>
          <div class="info-item">
            <span class="name">试用期截止时间：</span>
            <span class="val">2</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">手机号码：</span>
            <span class="val">18202038213</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">工号：</span>
            <span class="val">000520</span>
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
            <span class="val">123@qq.com</span>
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
            <span class="val">2017</span>
          </div>
          <div class="info-item">
            <span class="name">出生月：</span>
            <span class="val">2</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">出生日：</span>
            <span class="val">01</span>
          </div>
          <div class="info-item">
            <span class="name">年龄(周岁)：</span>
            <span class="val">30</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">考核类型：</span>
            <span class="val">-</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">基本工资：</span>
            <span class="val">12342</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">合同类型：</span>
            <span class="val">-</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">合同时间：</span>
            <span class="val">-</span>
          </div>
        </div>
      </div>
      <div class="portrait">
        <div class="img-box">
          <img src="../../assets/img/man.png" alt="img">
        </div>
        <Button type="primary" class="update-head-btn">修改头像</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {

    }
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
</style>


