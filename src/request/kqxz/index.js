// 考勤行政
import http from '../http';
import Qs from 'qs';

// 首页-我的待办
const getTodoList = params =>
  http
    .get('/hthr/personalwork/mychecknoticeNew', {params})
    .then(res => res.data);
// 首页-我的申请
const getApplyList = params =>
  http.get('/hthr/personalwork/myapplyNew', {params}).then(res => res.data);
// 首页-通知中心
const getNoticeList = params =>
  http.get('/hthr/noticecenter/noticeList', {params}).then(res => res.data);
// 首页-通讯录
const getTxlList = params =>
  http.get('/hthr/txl/show', {params}).then(res => res.data);
// 首页-通讯录详情
const getTxlDetail = params =>
  http.get('/hthr/txl/detail', {params}).then(res => res.data);
// 首页-通讯录-部门tree
const getDeptsLevel = params =>
  http.get('/hthr/organization/getlevedepts', {params}).then(res => res.data);

// 会议管理-拉取申请流程配置
const getBoardRoomApplyConfig = params =>
  http.get('/hthr/boardroom/apply', {params}).then(res => res.data);
// 会议管理-提交申请
const addBoardRoomApply = params =>
  http
    .post('/hthr/boardroom/addapply', Qs.stringify(params))
    .then(res => res.data);
// 会议管理-我的申请列表
const getBoardRoomApplyList = params =>
  http.get('/hthr/boardroom/applylist', {params}).then(res => res.data);
// 会议管理-审核列表
const getBoardRoomCheckList = params =>
  http.get('/hthr/boardroom/checklist', {params}).then(res => res.data);
// 会议管理-申请详情
const getBoardRoomApplyDetail = params =>
  http.get('/hthr/boardroom/detail', {params}).then(res => res.data);
// 会议管理-管理员审核
const checkBoardRoomApply = params =>
  http
    .post('/hthr/boardroom/finalpass', Qs.stringify(params))
    .then(res => res.data);
// 会议管理-取消申请
const cancelBoardRoomApply = params =>
  http
    .post('/hthr/boardroom/cancelorder', Qs.stringify(params))
    .then(res => res.data);

// 请假管理-拉取申请流程配置
const getLeaveApplyConfig = params =>
  http.get('/hthr/leave/apply', {params}).then(res => res.data);
// 请假管理-提交申请
const addLeaveApply = params =>
  http.post('/hthr/leave/addapply', Qs.stringify(params)).then(res => res.data);
// 请假管理-我的申请列表
const getLeaveApplyList = params =>
  http.get('/hthr/leave/applylist', {params}).then(res => res.data);
// 请假管理-审核列表
const getLeaveCheckList = params =>
  http.get('/hthr/leave/checklist', {params}).then(res => res.data);
// 请假管理-公司请假记录
const getLeaveAllList = params =>
  http.get('/hthr/leave/tasklist', {params}).then(res => res.data);
// 请假管理-申请详情
const getLeaveApplyDetail = params =>
  http.get('/hthr/leave/detail_leave', {params}).then(res => res.data);
// 请假管理-拉取年假信息
const getAnnualvaation = params =>
  http.get('/hthr/leave/getannualvacation', {params}).then(res => res.data);
// 请假管理-上级审核
const checkForLeaveApply = params =>
  http
    .post('/hthr/leave/normalpass', Qs.stringify(params))
    .then(res => res.data);
// 请假管理-最终审核
const checkFinallyForLeaveApply = params =>
  http
    .post('/hthr/leave/finalpass', Qs.stringify(params))
    .then(res => res.data);

// 加班管理-加班申请-获取加班流程
const getOrAddOvertimeApply = params =>
  http.post('/hthr/overtime/apply', Qs.stringify(params)).then(res => res.data);
// 加班管理-加班申请-提交表单
const addOvertimeApplyForm = params =>
  http
    .post('/hthr/overtime/addapply', Qs.stringify(params))
    .then(res => res.data);
// 加班管理-我的申请记录
const getOvertimeMyApplyList = params =>
  http.get('/hthr/overtime/applylist', {params}).then(res => res.data);
// 加班管理-加班审批
const getOvertimeChickList = params =>
  http.get('/hthr/overtime/checklist', {params}).then(res => res.data);
// 加班管理-公司加班记录
const getOvertimeAllApplyList = params =>
  http.get('/hthr/overtime/tasklist', {params}).then(res => res.data);

export default {
  getTodoList,
  getApplyList,
  getNoticeList,
  getTxlList,
  getTxlDetail,
  getDeptsLevel,

  getBoardRoomApplyConfig,
  addBoardRoomApply,
  getBoardRoomApplyList,
  getBoardRoomCheckList,
  getBoardRoomApplyDetail,
  checkBoardRoomApply,
  cancelBoardRoomApply,

  getOrAddOvertimeApply,
  addOvertimeApplyForm,
  getOvertimeMyApplyList,
  getOvertimeChickList,
  getOvertimeAllApplyList,
  getLeaveApplyConfig,

  addLeaveApply,
  getLeaveApplyList,
  getLeaveCheckList,
  getLeaveAllList,
  getLeaveApplyDetail,
  getAnnualvaation,
  checkForLeaveApply,
  checkFinallyForLeaveApply,
};
