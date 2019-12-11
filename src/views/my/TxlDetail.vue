<template>
  <div class="page-container">
    <div class="page-title">
      <h2 class="title">人员详细信息</h2>
      <div class="top-btn">
        <Button class="btn" @click="handleGoBack">返回</Button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="info-content">
        <div class="row-box">
          <div class="info-item">
            <span class="name">姓名：</span>
            <span class="val">{{info.user_name}}</span>
          </div>
          <div class="info-item">
            <span class="name">性别：</span>
            <span class="val">{{info.gender == 1 ? "男" : "女"}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">区域：</span>
            <span class="val">{{info.location_name}}</span>
          </div>
          <div class="info-item">
            <span class="name">部门：</span>
            <span class="val">{{info.dept_name}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">人员类别：</span>
            <span class="val">{{info.type_name}}</span>
          </div>
          <div class="info-item">
            <span class="name">职位：</span>
            <span class="val">{{info.duty}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">移动电话：</span>
            <span class="val">{{info.tel}}</span>
          </div>
          <div class="info-item">
            <span class="name">直接上级：</span>
            <span class="val">{{info.monitor_name}}</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">短号：</span>
            <span class="val">-</span>
          </div>
          <div class="info-item">
            <span class="name">邮箱：</span>
            <span class="val">-</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">入职时间：</span>
            <span class="val">{{info.workdate}}</span>
          </div>
          <div class="info-item">
            <span class="name">办公室号码：</span>
            <span class="val">-</span>
          </div>
        </div>
        <div class="row-box">
          <div class="info-item">
            <span class="name">出生时间：</span>
            <span class="val">{{info.year}}-{{info.month}}-{{info.day}}</span>
          </div>
        </div>
      </div>
      <div class="portrait">
        <div class="img-box">
          <img :src="info.head_url" alt="img" v-if="info.head_url != ''">
          <img src="../../assets/img/man.png" alt="img" v-if="info.head_url == '' && userInfo.gender == 1">
          <img src="../../assets/img/woman.png" alt="img" v-if="info.head_url == '' && userInfo.gender == 2">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "TxlDetail",
  data() {
    return {
      info: {}
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    // 返回
    handleGoBack() {
      this.$router.go(-1)
    },

    // 拉取个人信息数据
    async getPersonalInfo() {
      try {
        let params = {}
        params.user_guid = this.$route.query.user_guid
        const res = await this.$http.getTxlDetail(params)
        console.log(res)
        if(res.code ===  '200'){
          const info = res.extraData
          this.info = info
        }else{
          this.$Message.warning(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },

    init() {
      this.getPersonalInfo()
    }
  },
  created() {
    this.init()
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
          height: 27px;
          line-height: 27px;
          padding-left: 10px;
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


