
import axios from 'axios'
import { cookies } from '@/common/cookieUtils'
const baseURL =  require('../../config/APIs').API

export default function ajax (options) {
  const ajaxObj = {
    method: options.method,
    baseURL: baseURL,
    url: options.url,
    timeout: 30000,
    params: options.params,
    // params: options.params || '',
    headers: {
      'Pragma': 'no-cache',
      'Content-type': 'application/json;charset=UTF-8',
      'X-Auth-Token': cookies.getAuthorization() || null
    },
    // data: JSON.stringify(options.data || '')
    data: JSON.stringify(options.data)
  }
  // 导出请求时增加响应类型
  if (options.url.includes('/export/')) {
    ajaxObj.responseType = 'blob'
  }
  return axios(ajaxObj)
}
