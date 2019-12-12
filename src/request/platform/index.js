// 平台管理

import http from '../http';
import Qs from 'qs';

//职务
// 公司设置-职务管理列表表格数据
const getduty = (params) => http.get('/hthr/company/getduty', {params}).then(res => res.data);
//公司设置-添加职务
const addduty = (params) => http.post('/hthr/company/addduty', Qs.stringify(params)).then(res => res.data);
//公司设置-编辑职务
const editduty = (params) => http.post('/hthr/company/editduty', Qs.stringify(params)).then(res => res.data);
//公司设置-删除职务
const delduty = (params) => http.post('/hthr/company/delduty', Qs.stringify(params)).then(res => res.data);

// 流程类型列表
const getProcessType = (params) => http.get('/hthr/process/processtype', {params}).then(res=>{ return res.data});
// 删除流程类型
const delProcessType = (params) => http.post('/hthr/process/delptype', Qs.stringify(params)).then(res=>{ return res.data});
// 添加流程类型
const addProcessType = (params) => http.post('/hthr/process/addptype', Qs.stringify(params)).then(res=>{ return res.data});
// 编辑流程类型
const editProcessType = (params) => http.post('/hthr/process/editptype', Qs.stringify(params)).then(res=>{ return res.data});

// 流程列表
const getProcessShow = (params) => http.get('/hthr/process/processshow', {params}).then(res=>{ return res.data});
// 添加流程
const addProcessShow = (params) => http.post('/hthr/process/addprocess', Qs.stringify(params)).then(res=>{ return res.data});
// 编辑流程
const editProcessShow = (params) => http.post('/hthr/process/editprocess', Qs.stringify(params)).then(res=>{ return res.data});
// 删除流程
const delProcessShow = (params) => http.post('/hthr/process/delprocess', Qs.stringify(params)).then(res=>{ return res.data});

// 步骤设置-流程步骤列表
const getProstep = (params) => http.get('/hthr/process/prostep', {params}).then(res=>{ return res.data});
// 步骤设置- 删除流程步骤
const delProstep = (params) => http.post('/hthr/process/delstep', Qs.stringify(params)).then(res=>{ return res.data});
// 步骤设置- 新增流程步骤
const addProstep = (params) => http.post('/hthr/process/addstep', Qs.stringify(params)).then(res=>{ return res.data});
// 步骤设置- 编辑流程步骤
const editProstep = (params) => http.post('/hthr/process/editstep', Qs.stringify(params)).then(res=>{ return res.data});
// 获取角色列表
const getSystemRole = (params) => http.get('/hthr/system/role', {params}).then(res=>{ return res.data});



// 表单类型列表
const getFormtype = (params) => http.get('/hthr/process/formtype', {params}).then(res=>{ return res.data});
// 删除表单类型
const delFormtype = (params) => http.post('/hthr/process/delformtype', Qs.stringify(params)).then(res=>{ return res.data});
// 添加流程类型
const addFormtype = (params) => http.post('/hthr/process/addformtype', Qs.stringify(params)).then(res=>{ return res.data});
// 编辑流程类型
const editFormtype = (params) => http.post('/hthr/process/editformtype', Qs.stringify(params)).then(res=>{ return res.data});

// 表单设置列表
const getFormshow = (params) => http.get('/hthr/process/formshow', {params}).then(res=>{ return res.data});
// 删除表单设置
const delFormshow = (params) => http.post('/hthr/process/delform', Qs.stringify(params)).then(res=>{ return res.data});
// 添加流程类型
const addFormshow = (params) => http.post('/hthr/process/addform', Qs.stringify(params)).then(res=>{ return res.data});
// 编辑流程类型
const editFormshow = (params) => http.post('/hthr/process/editform', Qs.stringify(params)).then(res=>{ return res.data});




//人员类别
// 公司设置-人员类别列表表格数据
const getusertype = (params) => http.get('/hthr/company/getusertype', {params}).then(res => res.data);
//公司设置-添加人员类别
const addusertype = (params) => http.post('/hthr/company/addusertype', Qs.stringify(params)).then(res => res.data);
//公司设置-编辑人员类别
const editusertype = (params) => http.post('/hthr/company/editusertype', Qs.stringify(params)).then(res => res.data);
//公司设置-删除人员类别
const delusertype = (params) => http.post('/hthr/company/delusertype', Qs.stringify(params)).then(res => res.data);

//会议室设置
// 公司设置-会议室列表表格数据
const boardRoom = (params) => http.get('/hthr/company/boardRoom', {params}).then(res => res.data);
//公司设置-添加会议室
const addRoom = (params) => http.post('/hthr/company/addRoom', Qs.stringify(params)).then(res => res.data);
//公司设置-编辑会议室
const editRoom = (params) => http.post('/hthr/company/editRoom', Qs.stringify(params)).then(res => res.data);
//公司设置-删除会议室
const delRoom = (params) => http.post('/hthr/company/delRoom', Qs.stringify(params)).then(res => res.data);

//节日设置
// 公司设置-节日列表表格数据
const holidayList = (params) => http.get('/hthr/company/holiday', {params}).then(res => res.data);
//公司设置-添加节日
const addHoliday = (params) => http.post('/hthr/company/addHoliday', Qs.stringify(params)).then(res => res.data);
//公司设置-编辑节日
const editHoliday = (params) => http.post('/hthr/company/editHoliday', Qs.stringify(params)).then(res => res.data);
//公司设置-删除节日
const delHoliday = (params) => http.post('/hthr/company/delHoliday', Qs.stringify(params)).then(res => res.data);

//城市级别体系
// 公司设置-城市级别列表表格数据
const citylist = (params) => http.get('/hthr/company/citylist', {params}).then(res => res.data);
// 公司设置-省份数据
const getprov = (params) => http.get('/hthr/company/getprov', {params}).then(res => res.data);
export default {
    getProcessType,
    addProcessType,
    delProcessType,
    editProcessType,

    getProcessShow,
    addProcessShow,
    editProcessShow,
    delProcessShow,
    
    getProstep,
    delProstep,
    addProstep,
    getSystemRole,
    editProstep,

    getFormtype,
    delFormtype,
    addFormtype,
    editFormtype,

    getFormshow,
    delFormshow,
    addFormshow,
    editFormshow,

	getduty,
	addduty,
	delduty,
	editduty,
	getusertype,
	addusertype,
	editusertype,
	delusertype,
	boardRoom,
	addRoom,
	editRoom,
	delRoom,
	holidayList,
	addHoliday,
	editHoliday,
	delHoliday,
	citylist,
	getprov
}