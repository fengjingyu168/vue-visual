/*
* @author: 冯经宇
* @CreateDate: 2018-12-26
* @version: V0.0.1
* @describe: 暂时存放零散功能函数，后续根据同类数量拆分
*
*/
import httpRequestEntrance from './httpRequestEntrance.js'
import {validate} from './validate.js'
/*
 * Func: 项目下载文件函数
 *
 * @param {String} filePath (下载路径)
 * @param {String} params (下载所需参数)
 * @param {String} fileName (下载后文件名)
 */
const exportFile = (filePath, params, fileName) => {
  httpRequestEntrance.httpRequestEntrance('GET', filePath, params, (response) => {
    let content = response
    let blob = new Blob([content])
    if ('download' in document.createElement('a')) { // 非IE下载
      let elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  }, false)
}

/*
 * Func: 按要求截取字符串
 *
 * @param {String} value (待截取字符串)
 * @param {Int} maxLen (最大长度)
 */
const interceptParams = (value = '', maxLen = 20) => {
  if (validate.isEmpty_reset(value)) {
    return ''
  }
  if (value.length > maxLen) {
    return value.substring(0,maxLen) + '...'
  }
  return value
}

/*
 * Func: 提取详情页面所需关键信息
 *
 * @param {String} params 主页面传回参数
 */
const obtainId = (params) => {
  return validate.isEmpty(params.id) ? params.id : params.item.id
}


export const utils = {
  exportFile,
  interceptParams,
  obtainId
}
