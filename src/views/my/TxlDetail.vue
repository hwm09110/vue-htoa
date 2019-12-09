<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">人员详细信息</h2>
      <div class="top-btn">
        <Button class="btn">返回</Button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="info-content">
        <div class="row-box">
          <div class="info-item">
            <span class="name">姓名：</span>
            <span class="val">张三丰</span>
          </div>
          <div class="info-item">
            <span class="name">性别：</span>
            <span class="val">男</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">区域：</span>
            <span class="val">总部</span>
          </div>
          <div class="info-item">
            <span class="name">部门：</span>
            <span class="val">技术部</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">人员类别：</span>
            <span class="val">管理</span>
          </div>
          <div class="info-item">
            <span class="name">职位：</span>
            <span class="val">部门经理</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">移动电话：</span>
            <span class="val">13623120521</span>
          </div>
          <div class="info-item">
            <span class="name">直接上级：</span>
            <span class="val">哈哈</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">短号：</span>
            <span class="val">052</span>
          </div>
          <div class="info-item">
            <span class="name">邮箱：</span>
            <span class="val">1234564@qq.com</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">入职时间：</span>
            <span class="val">2017-10-01</span>
          </div>
          <div class="info-item">
            <span class="name">办公室号码：</span>
            <span class="val">123456</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">出生时间：</span>
            <span class="val">1990-10-01</span>
          </div>
        </div>
      </div>
      <div class="portrait">
        <div class="img-box">
          <img src="../../assets/img/man.png" alt="img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TxlDetail",
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>


<style lang="scss" scoped>
.tab-wrap{
  margin-top: 15px;
}

.main-wrap{
  position: relative;
  width: 900px;
  .info-content{
    margin-top: 25px;
    width: 70%;
    .row-box{
      margin-bottom: 30px;
      display: flex;
      justify-content: space-between;
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
          display: inline-block;
          font-size: 15px;
          color: #333;
          width: 170px;
          padding: 6px 10px;
          background-color: #F9F9F9;
        }
      }
    }
  }
  .portrait{
    position: absolute;
    right: 10px;
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
  }
}
</style>


