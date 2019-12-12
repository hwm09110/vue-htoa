// 平台管理

import http from '../http';
import Qs from 'qs';
// 公司设置-职务管理列表表格数据
const getduty = (params) => http.get('/hthr/company/getduty', {params}).then(res => res.data);
//公司设置-添加职务
const addduty = (params) => http.post('/hthr/company/addduty', Qs.stringify(params)).then(res => res.data);
//公司设置-编辑职务
const editduty = (params) => http.post('/hthr/company/editduty', Qs.stringify(params)).then(res => res.data);
//公司设置-删除职务
const delduty = (params) => http.post('/hthr/company/delduty', Qs.stringify(params)).then(res => res.data);

export default {
	getduty,
	addduty,
	delduty,
	editduty
}