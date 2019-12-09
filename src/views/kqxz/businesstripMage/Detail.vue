<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">申请详情</h2>
      <div class="top-btn">
        <Button type="error"  class="btn">撤回</Button>
        <Button type="error"  class="btn">重新提交</Button>
        <Button class="btn">返回</Button>
      </div>
    </div>

    <div class="msg-tips">
      <!-- <span class="pass">出差申请已被批准</span> -->
      <!-- <span class="wait">你的申请正在审批中，请等待...</span> -->
      <span class="back">你的申请已被退回，你可以修改并重新申请 <Button type="primary">修改申请</Button></span>
    </div>

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
          <span class="item-label">单号： </span>
          <span class="item-val">20191204141056</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">出差时间：</span>
          <span class="item-val">2018-12-20 12:44 至 2018-12-21 12:44</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">出差地点：</span>
          <span class="item-val">北京</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">出差原因：</span>
          <span class="item-val">参加北京参会</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">是否提交出差报告：</span>
          <span class="item-val">是</span>
        </div>
      </div>
      <div>
        <div class="info-item">
          <span class="item-label">出差安排：</span>
          <span class="item-val reason">生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！
            生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！
            生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！
            生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！
            生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！生病了啊啊！！！
          </span>
        </div>
      </div>
    </div>

    <!-- 审核信息 -->
    <div class="check-info">
      <div class="check-item">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-checkmark-circle" style="color:#30a5ff;" size="20" /> <span class="result pass">已批准</span>
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
      <div class="check-item">
        <div class="checker-info">
          <div class="info-item">
            <Icon type="ios-close-circle" style="color:#ff6666;" size="20" /> <span class="result nopass">不批准</span>
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
      </div>
    </div>

    <!-- 文件列表 -->
    <div class="uploaded-file-wrap">
      <div class="label">出差报告</div>
      <div class="content">
        <ul class="file-list">
          <li>
            <div class="text">附件（1个）</div>
            <div class="operate">
              <a href="javascript:;">下载</a>
            </div>
          </li>
          <li>
            <div class="text">2019年12月04出差北京报告.pdf</div>
            <div class="operate">
              <a href="javascript:;">下载</a>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 文件上传 -->
    <div class="upload-wrap">
      <UploadFile 
        multiple
        @on-choose="handleChooseFile" 
        @on-delFile="handleDelFile" 
      />
      <Button type="primary" class="btn">提交</Button>
    </div>

    <!-- 待审核出现 -->
    <div class="check-form">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input style="width:calc(100% - 80px); margin-left:10px;" type="textarea" :rows="5" placeholder="填写审批意见" />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn">批准</Button>
        <Button type="error"  class="btn">不批准</Button>
      </div>
    </div>

    <!-- 审批已提交的报告 -->
    <div class="check-form">
      <div class="form-item">
        <div class="label">审批意见</div>
        <Input style="width:calc(100% - 80px); margin-left:10px;" type="textarea" :rows="5" placeholder="填写审批意见" />
      </div>
      <div class="form-operate">
        <Button type="primary" class="btn">通过</Button>
        <Button type="error"  class="btn">退回申请人修改报告</Button>
      </div>
    </div>

  </div>
</template>

<script>
import UploadFile from "@c/common/UploadFile"
export default {
  components: {
    UploadFile
  },
  name: "Detail",
  data() {
    return {
    }
  },
  methods: {
    // 选择好文件
    handleChooseFile(ret) {
      console.log(ret)
    },

    // 删除选择好文件
    handleDelFile(ret) {
      console.log(ret)
    },


  }
}
</script>


<style lang="scss" scoped>
.page-container{
  background-color: #fff;
  padding-bottom: 100px;
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
  margin-bottom: 20px;
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
      width: 150px;
    }
  }
}

// 文件上传
.upload-wrap{
  margin-bottom: 25px;
  .btn{
    margin-left: 66px;
    margin-top: 20px;
  }
}

// 已上传的附件
.uploaded-file-wrap{
  background-color: #F9F9F9;
  padding: 20px 15px;
  margin:15px 0;
  display: flex;
  .label{
    margin-top: 5px;
    margin-right: 7px;
  }
  .content{
    .file-list{
      width: 500px;
      li{
        position: relative;
        padding: 10px 10px 10px 30px;
        display: flex;
        background-color: #fff;
        .text{
          width: 90%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .operate{
          a{
            margin-left: 10px;
            text-decoration: underline;
            color: #30A5FF;
          }
        }
        &:first-child{
          background-color: #E9ECF2;
        }
        &::before{
          position: absolute;
          left: 5px;
          top: 50%;
          transform: translateY(-50%);
          content: "";
          width: 17px;
          height: 17px;
          background: url("../../../assets/img/icons.png") no-repeat -144px -1px;
        }
      }
    }
  }
}

</style>

