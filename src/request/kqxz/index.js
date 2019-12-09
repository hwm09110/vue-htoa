// 考勤行政
import http from '../http';
import Qs from 'qs';


// 首页-我的待办
const getTodoList = (params) => http.get('/hthr/personalwork/mychecknoticeNew', {params}).then(res => res.data);

// 首页-我的申请
const getApplyList = (params) => http.get('/hthr/personalwork/myapplyNew', {params}).then(res => res.data);

// 首页-通知中心
const getNoticeList = (params) => http.get('/hthr/noticecenter/noticeList', {params}).then(res => res.data);

// 首页-通讯录
const getTxlList = (params) => http.get('/hthr/txl/show', {params}).then(res => res.data);

// 首页-通讯录-部门tree
const getDeptsLevel = (params) => http.get('/hthr/organization/getlevedepts', {params}).then(res => res.data);




export default {
  getTodoList,
  getApplyList,
  getNoticeList,
  getTxlList,
  getDeptsLevel,
}