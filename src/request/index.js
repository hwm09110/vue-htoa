
import common from './common'
import kqxz from './kqxz' //考勤行政模块
import unitTeam from './unitTeam' //单位组织
import platform from './platform' //流程列表

const API = [ common, kqxz, unitTeam,platform]

export default  Object.assign({}, ...API)