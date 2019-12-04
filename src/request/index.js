
import common from './common'
import kqxz from './kqxz' //考勤行政模块

const API = [ common, kqxz ]

export default  Object.assign({}, ...API)