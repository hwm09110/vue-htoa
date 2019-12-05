<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">建议详情</h2>
      <div class="top-btn">
        <!-- <Button type="error"  class="btn">撤回</Button> -->
        <Button class="btn">返回</Button>
      </div>
    </div>

    <div class="check-form">
      <div class="form-item">
        <div class="label">反馈结果</div>
        <Input style="width:calc(100% - 80px); margin-left:10px;" type="textarea" :rows="5" placeholder="填写反馈内容" />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn">持续跟进</Button>
        <Button type="primary"  class="btn">完结</Button>
      </div>
    </div>

    <div class="sub-title">反馈结果</div>
    <div class="check-info">
      <div class="check-item">
        <div class="checker-info">
          <div class="info-item"> 
            <span class="item-label">人事部：</span>
            <span class="item-val">摇银银99</span>
          </div>
          <div class="info-item">
            <span class="item-label">时间：</span>
            <span class="item-val">2018-06-13 11:13</span> 
          </div>
        </div>
        <div class="check-content">反馈结果：-无-</div>
      </div>
      <div class="check-item">
        <div class="checker-info">
          <div class="info-item"> 
            <span class="item-label">人事部：</span>
            <span class="item-val">摇银银99</span>
          </div>
          <div class="info-item">
            <span class="item-label">时间：</span>
            <span class="item-val">2018-06-13 11:13</span> 
          </div>
        </div>
        <div class="check-content">反馈结果：-无-</div>
      </div>
    </div>

    <div class="sub-title">申请详情</div>
    <div class="apply-info">
      <div>
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
          <span class="item-label">申请时间：</span>
          <span class="item-val">2019-12-04 15:45</span>
        </div>
        <div class="info-item">
          <span class="item-label">单号： </span>
          <span class="item-val">20191204141056</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">反馈对象：</span>
          <span class="item-val">行政部</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">问题：</span>
          <span class="item-val reason">问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！
            问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！
            问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！
            问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！
            问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！问题啊啊！！！
          </span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">建议方案：</span>
          <span class="item-val reason">建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！
            建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！
            建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！
            建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！
            建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！建议方案内容了！！！
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped>
.page-container{
  background-color: #fff;
  padding-bottom: 100px;
}

.sub-title{
  font-size: 16px;
  margin: 30px;
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
      width: 80px;
      text-align: right;
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

// 反馈操作
.check-form{
  margin-top: 20px;
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
</style>

