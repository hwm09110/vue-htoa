
import common from './common'
import kqxz from './kqxz' //考勤行政模块
import unitTeam from './unitTeam' //单位组织

const API = [ common, kqxz, unitTeam]

export default  Object.assign({}, ...API)