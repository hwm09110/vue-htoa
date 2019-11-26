import http from './http';
import Qs from 'qs';

//登录
const checkLogin = (params) => {
    return http.post('/htoa/qx/denglu', Qs.stringify(params)).then(res=>{ return res.data});
};





export default {
    checkLogin
};

