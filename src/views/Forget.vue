<template>
    <div id="forget-page-wrap">
      <div class="main-wrap">
        <div class="logo-box"></div>
        <div class="forget-box">
          <h1 class="title">密码重置</h1>
          <div class="steps-box">
            <Steps :current="current">
              <Step title="验证身份"></Step>
              <Step title="重置密码"></Step>
              <Step title="完成"></Step>
            </Steps>
          </div>
          <div class="first-step-box" v-show="isFirstShow">
            <div class="form-item">
              <Input type="text" v-model="loginform.account" placeholder="请输入账号" :size="input_size">
                <Icon type="md-person" slot="prefix" :size="btn_size" :color="btn_color"></Icon>
              </Input>
            </div>
            <div class="form-item">
              <Input type="text" v-model="loginform.phone" placeholder="请输入手机号码" :size="input_size">
                <Icon type="md-phone-portrait" slot="prefix" :size="btn_size" :color="btn_color"></Icon>
              </Input>
            </div>
            <div class="form-item">
              <Input type="text" v-model="loginform.imgcode" placeholder="请输入右侧验证码" :size="input_size" :style="styleObj">
                <Icon type="ios-checkmark-circle-outline" slot="prefix" :size="btn_size" :color="btn_color"></Icon>
              </Input>
              <span class="img-code" @click="changeImageCode">
                <img :src="imgCodeSrc">
              </span>
            </div>
            <div class="form-item">
              <Input type="text" v-model="loginform.msgcode" placeholder="请输入短信验证码" :size="input_size" :style="styleObj">
                <Icon type="ios-checkmark-circle-outline" slot="prefix" :size="btn_size" :color="btn_color"></Icon>
              </Input>
              <Button type="primary" disabled class="send-code" style="height:36px;">发送验证码</Button>
            </div>
            <div class="form-item">
              <Button type="primary" :disabled="isFirstBtnDisabled" long @click="handleFristBtn">下一步</Button>
            </div>
          </div>
          <div class="second-step-box" v-show="isSecondShow">
            <div class="form-item">
              <Input type="text" v-model="loginform.password" placeholder="请输入新密码" :size="input_size">
                <Icon type="md-lock" slot="prefix" :size="btn_size" :color="btn_color"></Icon>
              </Input>
            </div>
            <div class="form-item">
              <Button type="primary" :disabled="isSecondBtnDisabled" long @click="handleSecondBtn">下一步</Button>
            </div>
          </div>
          <div class="third-step-box" v-show="isThirdShow">
            <div class="form-item">
              <div class="success-tips">
                密码找回成功，<span class="time">5s</span> 后返回
              </div>
            </div>
            <div class="form-item">
              <Button type="primary" long @click="handleThirdBtn">立即返回</Button>
            </div>
          </div>
        </div>
      </div>
      <CopyRight></CopyRight>
    </div>
</template>

<script>
import utils from '@/utils';
import CopyRight from '@c/layout/CopyRight';

export default {
    components:{
      CopyRight
    },
    data (){
        return {
          current: 0,
          input_size: 'large',
          styleObj: {width:'75%'},
          btn_color:'#ccc',
          btn_size:22,
          imgCodeSrc: 'http://192.168.8.172:16619/htoa/captcha/createCode?random=1542593925128',
          isFirstShow:true,
          isSecondShow:false,
          isThirdShow:false,
          isFirstBtnDisabled:true,
          isSecondBtnDisabled:true,
          loginform: {
            account:'',
            phone:'',
            imgcode:'',
            msgcode:'',
            }
        }
    },
    methods: {
      //更换图片验证码
      changeImageCode (){
        this.imgCodeSrc = 'http://192.168.8.172:16619/htoa/captcha/createCode?random='+(new Date());
      },
      //点击first next button
      handleFristBtn (){

      },
      //点击second next button
      handleSecondBtn (){
        
      },
      //点击third next button
      handleThirdBtn (){

      }
    },
    created (){

    },
    mounted (){

    }
}
</script>

<style lang="scss">
  #forget-page-wrap {
    width:100%;
    height:100%;
    background:url('../assets/img/bg.png') no-repeat;
    .main-wrap{
      width: 1172px;
      margin: auto;
      position: relative;
      overflow: hidden;
      .logo-box{
        width: 505px;
        height: 81px;
        margin-top: 30px;
        background: url('../assets/img/title.png') no-repeat;
      }
      .forget-box{
        width: 1154px;
        height: 695px;
        background: url('../assets/img/bg_1.png') no-repeat;
        margin-top:30px;
        .title{
          text-align: center;
          margin-bottom: 70px;
          color: #333;
          font-weight: normal;
          padding-top:20px;
        }
        .steps-box{
          width: 60%;
          margin-left: 308px;
        }
        .first-step-box,
        .second-step-box,
        .third-step-box{
          width: 526px;
          margin-left: 308px;
          margin-top: 20px;
          .form-item{
            margin-bottom: 20px;
            .img-code{
              display: inline-block;
              vertical-align: middle;
              width: 21%;
              margin-left: 4%;
              cursor: pointer;
              img{
                width: 100%;
              }
            }
            .send-code{
              width: 21%;
              margin-left: 4%;
            }
            .success-tips{
              text-align:center;
              .time{
                color: #2d8cf0;
              }
            }
          }
        }
      }
    }
  }
</style>
