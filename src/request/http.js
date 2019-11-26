import axios from 'axios';
import router from '../router'
import Vue from 'vue'

const http = axios.create({ 
  baseURL: process.env.BASE_URL,
  timeout: 60000, 
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些 
  headers: { "Content-Type": "application/x-www-form-urlencoded" } 
});

//添加请求拦截器 
http.interceptors.request.use( config => { 
  // 在发送请求之前做某件事 
  // if ( config.method === "post" ) { 
  //   // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的 
  //   config.data = qs.stringify(config.data); 
  // } 
  // 若是有做鉴权token , 就给头部带上token 
  // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用 
  // 这里localStorage一般是请求成功后我们自行写入到本地的,因为你放在vuex刷新就没了 
  // 一些必要的数据写入本地,优先从本地读取 
  // if (localStorage.token) { 
  //   config.headers.Authorization = localStorage.token; 
  // }
  // config.url = 'http://www.baokaodaxue.com' + config.url //动态改变请求域名
  return config; 
}, error => { 
  // error 的回调信息,看贵公司的定义
  return Promise.reject(error); 
});


//添加响应拦截器
http.interceptors.response.use(res => {
  //code 9001 非登录或登录失效
  // console.log('http interceptors', res)
  if(res.data){
    if(res.data.code == '9001'){
      localStorage.removeItem('isLogin')
      localStorage.removeItem('info')
      router.push({name: 'login'}) //重新登录
      Vue.prototype.$Message.error(res.data.message)
    }
  }else{
    Vue.prototype.$Message.error('请求服务器出错！')
  }
  return res;
},error => {
  // 服务器返回不是 2 开头的情况，会进入这个回调
  // 可以根据后端返回的状态码进行不同的操作
  // const responseCode = error.response.status;
  // 断网 或者 请求超时 状态
  if (!error.response) {
    // 请求超时状态
    if (error.message.includes('timeout')) {
      Vue.prototype.$Message.error('请求超时，请检查网络是否连接正常')
    } else {
      Vue.prototype.$Message.error('请求失败，请检查网络是否已连接')
    }
    return
  }
  return Promise.reject(error);
});

export default http;
