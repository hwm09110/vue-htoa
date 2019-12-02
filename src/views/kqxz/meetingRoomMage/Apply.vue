<template>
  <div class="apply-container">
    <div class="page-title">
      <h2 class="title">会议室申请</h2>
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
        <span class="item-label">申请时间：  </span>
        <span class="item-val">2018-11-23</span>
      </div>
    </div>
    <div class="statistics-info">
      <div class="info-item">
        <span class="item-label">商品总数：</span>
        <span class="item-val">0</span>
      </div>
      <div class="info-item">
        <span class="item-label">商品总金额：</span>
        <span class="item-val">0</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Apply',
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .apply-container{
    .page-title{
      padding-bottom: 15px;
      margin-bottom: 10px;
      border-bottom: solid 1px #ccc;
      .title{
        color: #666;
        font-size: 16px;
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
  }
</style>
