import http from '../http';
import Qs from 'qs';

//登录
const checkLogin = (params) => http.post('/hthr/qx/denglu', Qs.stringify(params)).then(res => res.data);

//登出
const doLogout = (params) => http.get('/hthr/qx/login_out', {params}).then(res => res.data);

//个人基本信息
const getPersonInfo = (params) => http.get('/hthr/accountinfo/personinfo', {params}).then(res => res.data);

//个人基本信息-修改手机号码
const editUserInfo = (params) => http.post('/hthr/accountinfo/edituser', Qs.stringify(params)).then(res => res.data);

//个人基本信息-修改头像
const editUserPortrait = (params) => http.post('/hthr/accountinfo/editHeadimg', Qs.stringify(params)).then(res => res.data);

//顶部菜单信息
const getTopMenuList = (params) => http.get('/hthr/qx/getmenu', {params}).then(res => res.data);

// 图片统一上传
const uploadFile = (params) => http.post('/htfile/process/upload', Qs.stringify(params)).then(res => res.data);

// 图片统一上传
const uploadFileByForm = (params) => http.post('/htfile/process/formupload', params, {headers:{'Content-Type':'multipart/form-data'}}).then(res => res.data);

// 统一撤销申请
const revokeApply = (params) => http.post('/hthr/common/normalcancle', Qs.stringify(params)).then(res => res.data);

// 统一退回申请人申请【流程结束】
const returnApply = (params) => http.post('/hthr/common/normalreturn', Qs.stringify(params)).then(res => res.data);




export default {
    checkLogin,
    doLogout,
    getPersonInfo,
    editUserInfo,
    editUserPortrait,
    getTopMenuList,
    uploadFile,
    uploadFileByForm,
    revokeApply,
    returnApply,
}