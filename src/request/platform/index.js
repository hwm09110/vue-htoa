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