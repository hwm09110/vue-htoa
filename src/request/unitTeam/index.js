// 部门组织

import http from '../http';
import Qs from 'qs';

//新增部门
const adddept = (params) => http.post('/hthr/organization/adddept', Qs.stringify(params)).then(res=>{ return res.data});
// 部门列表
const getdeptLists = (params) => http.get('/hthr/organization/getdeptLists', {params}).then(res=>{ return res.data});
// 部门层级列表
const getlevedepts = (params) => http.get('/hthr/organization/getlevedepts', {params}).then(res=>{ return res.data});
// 下级部门列表
const getdeptlevellists = (params) => http.get('/hthr/organization/getdeptlevellists', {params}).then(res=>{ return res.data});



// 删除 部门
const deldept = (params) => http.post('/hthr/organization/deldept',  Qs.stringify(params)).then(res=>{ return res.data});
// 编辑 部门
const editdept = (params) => http.post('/hthr/organization/editdept',  Qs.stringify(params)).then(res=>{ return res.data});

// 获取在职员工
const getMployeeUsers = (params) => http.get('/hthr/organization/getusers',  {params}).then(res=>{ return res.data});
// 获取在职员工
const detMployeeUsers = (params) => http.post('/hthr/organization/deluser', Qs.stringify(params)).then(res=>{ return res.data});





export default {
    getlevedepts,
    adddept,
    getdeptLists,
    getdeptlevellists,
    editdept,
    deldept,

    getMployeeUsers,
    detMployeeUsers
}