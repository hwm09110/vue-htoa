<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">申请详情</h2>
      <div class="top-btn">
        <Button type="error"  class="btn">重新提交</Button>
        <Button class="btn">返回</Button>
      </div>
    </div>
    <div class="msg-tips">
      <span class="pass">会议室预约成功</span>
      <span class="wait">你的申请正在审批中，请等待...</span>
      <!-- <span class="back">你的申请已被退回，你可以修改并重新申请 <Button type="primary">修改申请</Button></span> -->
    </div>
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
          <span class="item-label">请假类别：</span>
          <span class="item-val">事假</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">会议主题：</span>
          <span class="item-val">讨论项目开发进度</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">参会人数：</span>
          <span class="item-val">10</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">会议室：</span>
          <span class="item-val">一楼会议室</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">会议开始时间：</span>
          <span class="item-val">2019-12-04 10:30</span>
        </div>
        <div class="info-item">
          <span class="item-label">会议结束时间：</span>
          <span class="item-val">2019-12-04 11:30</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">是否需要投影设备：</span>
          <span class="item-val">否</span>
        </div>
      </div>
    </div>
    <div class="check-info">
      <div class="check-item">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">批准</span>
          </div>
          <div class="info-item"> 
            <span class="item-label">审批人：</span>
            <span class="item-val">摇银银99</span>
          </div>
          <div class="info-item">
            <span class="item-label">审批时间：</span>
            <span class="item-val">2018-06-13 11:13</span> 
          </div>
        </div>
        <div class="check-content">审批说明：-无-</div>
      </div>
    </div>
    <div class="check-form">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input style="width:calc(100% - 80px); margin-left:10px;" type="textarea" :rows="5" placeholder="填写审批意见" />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn">同意</Button>
        <Button type="error"  class="btn">退回</Button>
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

.page-title{
  padding-bottom: 15px;
  margin-bottom: 10px;
  border-bottom: solid 1px #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title{
    color: #666;
    font-size: 16px;
  }
  .top-btn{
    .btn{
      margin-left: 10px;
    }
  }
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

