// 全局过滤器
import { formatTimestamp } from "@/utils/moment"


/**
 * 时间戳转成 2019-12-10 19:20
 * @param {秒时间戳} timestamps 
 */
export const formatToDateTime = timestamps => {
  return timestamps > 0 ? formatTimestamp(timestamps * 1000, "YYYY-MM-DD HH:mm") : "-"
}

/**
 * 时间戳转成 2019-12-10
 * @param {秒时间戳} timestamps 
 */
export const formatToDate = timestamps => {
  return timestamps > 0 ? formatTimestamp(timestamps * 1000, "YYYY-MM-DD") : "-"
}

