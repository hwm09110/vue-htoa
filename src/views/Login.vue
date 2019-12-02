<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated rotateOutDownLeft" v-on:leave="animateLeave">
    <div id="login-page-wrap" v-show="isShow">
        <div class="main-wrap" >
          <div class="login-box">
            <div class="form-box">
              <h2 class="title">宏途管理系统登录</h2>
              <div class="form">
                <Form ref="loginForm" :model="loginForm" :rules="formRule">
                  <FormItem prop="user">
                    <Input type="text" v-model="loginForm.user" placeholder="请输入账号" @on-keyup.enter="handleLogin">
                        <Icon type="md-person" slot="prepend" :size="btn_size" :color="btn_color"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem prop="password">
                    <Input type="password" v-model="loginForm.password" placeholder="请输入密码" @on-keyup.enter="handleLogin">
                      <Icon type="md-lock" slot="prepend" :size="btn_size" :color="btn_color"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem>
                    <Checkbox class="autoLogin" v-model="loginForm.autoLogin">7天自动登录</Checkbox>
                    <Button size="large" type="text" class="forgetPwd" @click="handleForgetPwd">忘记密码？</Button>
                  </FormItem>
                  <FormItem>
                      <Button type="primary" long @click="handleLogin" >登录</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
          <div class="logo-box"></div>
        </div>
        <CopyRight></CopyRight>
    </div>
  </transition>
</template>

<script>
import utils from '@/utils';
import CopyRight from '@c/layout/CopyRight';
import Cookies from 'js-cookie';

export default {
    components:{
      CopyRight
    },
    data (){
        const validateUser = (rule,value,callback) => {
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
        }
        return {
          loginForm: {
            user: '',
            password: '',
            autoLogin: false
          },
          btn_color:'#ccc',
          btn_size:22,
          formRule:{
            user: [
              { required: true, message: '账号不能为空！', trigger: 'blur' },
              { validator: validateUser, trigger: 'blur' }
            ],
            password: [
              { required: true, message: '密码不能为空！', trigger: 'blur' },
            ]
          },
          //组件显示隐藏
          isShow:false
        }
    },
    methods: {

      //登录提交
      handleLogin (){
        this.$refs['loginForm'].validate((valid) => {
          console.log(valid)
          if(valid) {
            this.doLogin()
          }
        })
      },

      //请求登录
      doLogin() {
        this.$http.checkLogin({
          'account':this.loginForm.user,
          'pswd':this.loginForm.password
        }).then(res=>{
          console.log(res);
          if(res.code === '200'){
            this.$Message.success(res.message)
            this.isShow = false
            //保存登录态
            Cookies.set('isLogin',true)
            //开启7天自动登录
            this.rememberAccount();
            this.$store.dispatch('setLoginStatus',true)
            setTimeout(()=>{
              this.$router.push({name: "index"})
            },500);
          }else{
            this.$Message.error(res.message)
          }
        })
      },

      //跳转到找回密码页
      handleForgetPwd (){
        this.$router.push('/forget');
      },

      animateLeave (){
        console.log('animate finish!');
      },

      rememberAccount () {
        if (this.loginForm.autoLogin) {
          const encrypt_user = utils.encrypt(this.loginForm.user)
          const encrypt_pwd = utils.encrypt(this.loginForm.password)

          Cookies.set('user', encrypt_user, { expires: 7 })
          Cookies.set('password', encrypt_pwd, { expires: 7 })
        }
      },

      //自动登录
      autoLogin () {
        let encrypt_user = Cookies.get('user')
        let encrypt_password = Cookies.get('password')
        if(encrypt_user && encrypt_password){
          this.loginForm.user = utils.decrypt(encrypt_user)
          this.loginForm.password = utils.decrypt(encrypt_password)
          // this.handleLogin();
        }
      }

    },
    created (){
      // 取出cookie，调用接口
      let isLogin = Cookies.get('isLogin');
      //如果已登录，则跳到首页
      if (isLogin) {
        this.$router.push('/home');
        return;
      }
      this.autoLogin();
    },
    mounted (){
      this.isShow = true;
    }
}
</script>

<style lang="scss">
  #login-page-wrap {
    position: relative;
    width: calc(1404px * 0.8);
    height: calc(806px * 0.8);
    background-size: calc(1404px * 0.8) calc(806px * 0.8);
    margin: 140px auto 0;
    background-image: url('../assets/img/login/bg.png');
    .main-wrap{
      width: 100%;
      height: 100%;
      margin: auto;
      position: relative;
      overflow: hidden;
      .login-box{
        position: absolute;
        left: 86px;
        top: 170px;
        width: 340px;
        .form-box{
          width: 340px;
          .title{
            text-align: center;
            color: #3f3f3f;
            font-size: 26px;
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
      .logo-box{
        position: absolute;
        left: 86px;
        top: 64px;
        width: 127px;
        height: 39px;
        background-image: url('../assets/img/login/logo.png');
        background-size: 127px 39px;
      }
    }
  }
</style>
