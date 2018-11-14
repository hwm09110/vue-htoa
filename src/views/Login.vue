<template>
    <div id="login-page-wrap">
      <div class="main-wrap">
        <div class="logo-box"></div>
        <div class="login-box">
          <div class="form-box">
            <h2 class="title">欢迎登录宏途管理系统</h2>
            <div class="form">
              <Form ref="loginform" :model="loginform" :rules="formRule">
                <FormItem prop="user">
                  <Input type="text" v-model="loginform.user" placeholder="请输入账号">
                      <Icon type="md-person" slot="prepend" :size="btn_size" :color="btn_color"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="password">
                  <Input type="password" v-model="loginform.password" placeholder="请输入密码">
                    <Icon type="md-lock" slot="prepend" :size="btn_size" :color="btn_color"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                   <Checkbox class="autoLogin" v-model="loginform.autoLogin">7天自动登录</Checkbox>
                   <Button size="large" type="text" class="forgetPwd">忘记密码？</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" long @click="handleLogin">登录</Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <div class="copyRight">
        <p>Copyright©2018 广州宏途教育网络科技有限公司 All Rights Reserved 粤ICP备15058200号<br/>服务热线：020-38664641</p>
      </div>
    </div>
</template>

<script>
import utils from '@/assets/js/utils';

export default {
    data (){
        const validateUser = (rule,value,callback) => {
          // console.log(rule);
          // console.log(value);
          let user = value.trim();
          if(user) {
            if(!utils.checkPhoneNumber(user)){
              callback(new Error('手机号码格式不正确'));
            }else{
              callback();
            }
          }else{
            callback();
          }
        };
        return {
          loginform: {
            user: '',
            password: '',
            autoLogin: false
          },
          btn_color:'#ccc',
          btn_size:22,
          formRule:{
            user: [ { validator: validateUser, trigger: 'blur' } ],
            password: []
          }
        }
    },
    methods: {
      //登录处理
      handleLogin (){
        console.log(this.loginform)
      }
    },
    created (){

    },
    mounted (){

    }
}
</script>

<style lang="scss">
  #login-page-wrap {
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
      .login-box{
        width: 1154px;
        height: 695px;
        background: url('../assets/img/img.png') no-repeat;
        margin-top:30px;
        .form-box{
          width: 310px;
          float: right;
          padding: 0 20px;
          margin-top: 260px;
          margin-right: 7%;
          .title{
            text-align: center;
            color: #3f3f3f;
            font-weight: normal;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .autoLogin{
            margin-left: 15px;
          }
          .forgetPwd{
            float: right;
            text-align: right;
          }
        }
      }
    }
    .copyRight{
      font-size: 13px;
      line-height: 22px;
      color: #666;
      width: 100%;
      padding: 20px 0;
      text-align: center;
    }
  }
</style>
