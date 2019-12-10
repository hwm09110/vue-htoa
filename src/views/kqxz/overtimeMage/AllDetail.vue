<template>
  <div class="page-container applyDetail">
    <div class="page-title">
      <h2 class="title">申请详情</h2>
    </div>

    <!-- wait、process、finish、error -->
    <Steps :current="1" status="error">
      <Step content="申请人发布"></Step>
      <Step content="部门经理审批"></Step>
      <Step content="分管副总审批"></Step>
    </Steps>

    <div class="msg-tips">
      <span class="pass">加班申请已被批准</span>
      <!-- <span class="wait">你的申请正在审批中，请等待...</span> -->
      <!-- <span class="back">
        你的申请已被退回，你可以修改并重新申请
        <Button type="primary">修改申请</Button>
      </span>-->
    </div>

    <!-- <div class="msg-tips">
      <span class="pass">加班申请已被批准</span>
    </div>-->

    <!-- 申请详情 -->
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
          <span class="item-label">单号：</span>
          <span class="item-val">20191204141056</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">加班内容：</span>
          <span class="item-val">耶耶耶</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">加班地点：</span>
          <span class="item-val">999</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">加班日期：</span>
          <span class="item-val">2019-03-11</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">加班时长：</span>
          <span class="item-val">1小时</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">是否调休：</span>
          <span class="item-val">否</span>
        </div>
      </div>
    </div>

    <!-- 审核信息 -->
    <div class="check-info">
      <div class="check-item">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" />
            <span class="result pass">已批准</span>
          </div>
          <div class="info-item">
            <span class="item-label">部门经理：</span>
            <span class="item-val">摇银银99</span>
          </div>
          <div class="info-item">
            <span class="item-label">审核时间：</span>
            <span class="item-val">2018-06-13 11:13</span>
          </div>
        </div>
        <div class="check-content">审核说明：-无-</div>
      </div>
      <!-- <div class="check-item">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-close-circle" style="color:#ff6666;" size="20" />
            <span class="result nopass">不批准</span>
          </div>
          <div class="info-item">
            <span class="item-label">总经理：</span>
            <span class="item-val">摇银银100</span>
          </div>
          <div class="info-item">
            <span class="item-label">审核时间：</span>
            <span class="item-val">2018-06-13 11:13</span>
          </div>
        </div>
        <div class="check-content">审核说明：-不同意-</div>
      </div>-->
    </div>

    <!-- 待审核出现 -->
    <!-- <div class="check-form">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input
          style="width:calc(100% - 80px); margin-left:10px;"
          type="textarea"
          :rows="5"
          placeholder="填写审批意见"
        />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn">批准</Button>
        <Button type="error" class="btn">不批准</Button>
      </div>
    </div>-->

    <!-- 审批已提交的报告 -->
    <!-- <div class="check-form">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input
          style="width:calc(100% - 80px); margin-left:10px;"
          type="textarea"
          :rows="5"
          placeholder="填写审批意见"
        />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn">通过</Button>
        <Button type="error" class="btn">退回申请人修改报告</Button>
      </div>
    </div>-->
  </div>
</template>

<script>
import UploadFile from "@c/common/UploadFile";
export default {
  components: {
    UploadFile
  },
  name: "Detail",
  data() {
    return {};
  },
  methods: {}
};
</script>


<style lang="scss" scoped>
.applyDetail {
  /deep/ .ivu-steps {
    height: 160px;
    align-items: center;
    .ivu-steps-content {
      padding-left: 0;
      margin-top: 16px;
      font-size: 14px;
    }
    .ivu-steps-tail {
      padding: 0 10px 0 64px;
    }
    .ivu-steps-head-inner {
      margin-left: 16px;
    }
  }
}
.page-container {
  background-color: #fff;
  padding-bottom: 100px;
}

.msg-tips {
  background-color: #f9f9f9;
  padding: 15px;
  .pass {
    color: #30a5ff;
  }
  .wait {
    color: #30a5ff;
  }
  .back {
    color: #ff6666;
  }
}

// 申请信息
.apply-info {
  background-color: #f9f9f9;
  padding: 0 15px 0 15px;
  margin-top: 15px;
  .info-item {
    display: inline-block;
    padding: 15px 0;
    margin-right: 60px;
    font-size: 14px;
    .item-label {
      display: inline-block;
      font-weight: 700;
      color: #999;
    }
    .item-val {
      display: inline-block;
      color: #6f7377;
      font-weight: 600;
      font-size: 15px;
    }
    .reason {
      width: calc(100% - 100px);
      vertical-align: top;
      line-height: 1.5;
      margin-top: -5px;
    }
  }
}

//审核信息
.check-info {
  margin-top: 15px;
  .check-item {
    margin-bottom: 15px;
    padding: 1px 15px 10px;
    background-color: #f9f9f9;
    .checker-info {
      .info-item {
        display: inline-block;
        padding: 10px 0;
        margin-right: 60px;
        font-size: 14px;
        .item-label {
          display: inline-block;
          font-weight: 700;
          color: #999;
        }
        .item-val {
          display: inline-block;
          color: #6f7377;
          font-weight: 600;
          font-size: 15px;
        }
        .result {
          font-weight: 600;
          font-size: 15px;
          margin-left: 2px;
          &.pass {
            color: #000;
          }
          &.nopass {
            color: #ff6666;
          }
        }
      }
    }
    .check-content {
      padding: 5px 10px;
      line-height: 1.5;
      background-color: #e9ecf2;
    }
  }
}

// 审核操作
.check-form {
  margin-bottom: 20px;
  .form-item {
    margin-bottom: 20px;
    .label {
      display: inline-block;
    }
  }
  .form-operate {
    text-align: center;
    .btn {
      margin: 0 20px;
      width: 150px;
    }
  }
}
</style>

