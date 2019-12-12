// 平台管理

import http from '../http';
import Qs from 'qs';


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
    editFormshow
}