<template>
  <transition enter-active-class="animated fadeIn" leave-active-class="animated rotateOutDownLeft" v-on:leave="animateLeave">
    <div id="login-page-wrap" v-show="isShow">
        <div class="main-wrap" >
          <div class="logo-box"></div>
          <div class="login-box">
            <div class="form-box">
              <h2 class="title">欢迎登录宏途管理系统</h2>
              <div class="form">
                <Form ref="loginform" :model="loginform" :rules="formRule">
                  <FormItem prop="user">
                    <Input type="text" v-model="loginform.user" placeholder="请输入账号" @on-keyup.enter="handleLogin">
                        <Icon type="md-person" slot="prepend" :size="btn_size" :color="btn_color"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem prop="password">
                    <Input type="password" v-model="loginform.password" placeholder="请输入密码" @on-keyup.enter="handleLogin">
                      <Icon type="md-lock" slot="prepend" :size="btn_size" :color="btn_color"></Icon>
                    </Input>
                  </FormItem>
                  <FormItem>
                    <Checkbox class="autoLogin" v-model="loginform.autoLogin">7天自动登录</Checkbox>
                    <Button size="large" type="text" class="forgetPwd" @click="handleForgetPwd">忘记密码？</Button>
                  </FormItem>
                  <FormItem>
                      <Button type="primary" long @click="handleLogin" >登录</Button>
                  </FormItem>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <CopyRight></CopyRight>
    </div>
  </transition>
</template>

<script>
import utils from '@/assets/js/utils';
import CopyRight from '@c/layout/CopyRight';
import Cookies from 'js-cookie';

export default {
    components:{
      CopyRight
    },
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
          },
          //组件显示隐藏
          isShow:false
        }
    },
    methods: {
      //登录处理
      handleLogin (){
        // console.log(this.loginform)
        if(!this.loginform.user.trim()){
          this.$Message.warning('请输入账号');
          return;
        }
        if(!this.loginform.password.trim()){
          this.$Message.warning('请输入密码');
          return;
        }
        this.request.checkLogin({
          'account':this.loginform.user,
          'pswd':this.loginform.password
        }).then(res=>{
          console.log(res);
          if(res.code === '200'){
            this.$Message.success(res.message);
            this.isShow = false;
            //保存登录态
            Cookies.set('isLogin',true);
            //开启7天自动登录
            this.rememberAccount();
            this.$store.dispatch('setLoginStatus',true);
            setTimeout(()=>{
              this.$router.push({name: "index"});
            },500);
          }else{
            this.$Message.error(res.message);
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
        if (this.loginform.autoLogin) {
          const encrypt_user = utils.encrypt(this.loginform.user);
          const encrypt_pwd = utils.encrypt(this.loginform.password);

          Cookies.set('user', encrypt_user, { expires: 7 });
          Cookies.set('password', encrypt_pwd, { expires: 7 });
        }
      },
      //自动登录
      autoLogin () {
        let encrypt_user = Cookies.get('user');
        let encrypt_password = Cookies.get('password');
        if(encrypt_user && encrypt_password){
          this.loginform.user = utils.decrypt(encrypt_user);
          this.loginform.password = utils.decrypt(encrypt_password);
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
  }
</style>
