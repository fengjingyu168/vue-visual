/*
* @author: 冯经宇
* @CreateDate: 2017-12-20
* @version: V0.0.1
* @describe:
* 该插件旨在提供公共表单验证插件,功能不断完善中......
*
 */
import $ from 'jquery'
import './animate.css'
import httpRequestEntrance from './httpRequestEntrance.js'


/*
 * Func:单一验证字段是否为空并提示功能
 *
 * @param {String} className (提示信息装载位置的class名称)
 * @param {String} val (待校验字段值)
 * @return {Boolean}
 */
const isEmptyAndWarn = (className, val) =>{
  className = '.' + className
  $(className).empty()
  if (val === '' || val === null || val === undefined || JSON.stringify(val) === '{}' || JSON.stringify(val) === '[]') {
    $(className).append('字段不能为空！')
    return true
  }
  return false
}

/*
 * Func:批量验证字段是否为空并提示功能
 *
 * params: {host_name_w: "111", host_w: "222", os_family_w: "333", checkedEnv_w: "444"}
 * key: 代表提示信息装载位置的class名称(*_w),其中*表示字段名，_w为特殊标记
 * value: 代表待校验字段的值
 */
const isEmptyAndWarn_JSON = (params) =>{
  let res = true
  let key
  for(key in params){
    if (isEmptyAndWarn(key, params[key])) {
      res = false
      break
    }
  }
  return res
}

/*
 * Func:批量验证表单搜索条件
 *
 * params: {host_name: "111", host: "222", os_family: "333"}
 * key:
 * value: 代表待校验字段的值
 */
const isEmptyReturn_JSON = (param) =>{
  let params = Object.assign({},param)
  let key
  for(key in params){
    if (!isEmpty(params[key])) {
      delete params[key]
    }
  }
  return params
}
//对象内是否有值没填
const isEmptyInObj = (params) =>{
  let key
  for(key in params){
    if (!isEmpty(params[key])) {
      return true
    }
  }
  return false
}

/*
 * Func:单一验证字段是否
 *
 * val: 代表待校验字段的值
 *
 * return: boolean
 */
const isEmpty = (val) =>{
  if (val === '' || val === null || val === undefined || JSON.stringify(val) === '{}' || JSON.stringify(val) === '[]') {
    return false
  }
  return true
}

/*
 * Func:单一验证字段是否
 *
 * val: 代表待校验字段的值
 *
 * return: boolean
 */
const isEmpty_reset = (val) =>{
  if (val === '' || val === null || val === undefined || JSON.stringify(val) === '{}' || JSON.stringify(val) === '[]') {
    return true
  }
  return false
}


/*
 * Func:判断object/json 是否为空
 *
 * e: object/json
 *
 * return: boolean
 */
const isEmptyObject = (e) =>{
  let t
  for (t in e)
    return !1
  return !0
}

/*
 * Func: 判断字符串是否包含中文
 *
 * @param {String} str (待效验字符串)
 *
 * @return {Boolean} true: 包含; false: 不包含
 */
const isContainChina = (str) =>{
  const patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
  if(!patrn.exec(str)){
    return false
  }
  return true
}


/*
 *Func: 清空JSON中字段值，解决编辑和新增时页面缓存
 *
 */
const emptyJson = (j) =>{
  let k
  for (k in j)
    j[k] = null
  return j
}


/**
 * 深拷贝js对象
 * @param obj
 * @returns {{}}
 *  Created by fengjingyu on 2018/4/11.
 */
const deepCopy = (obj) =>{
  let newO = {}
  if (obj instanceof Array) {
    newO = []
  }
  for ( let key in obj) {
    let val = obj[key]
    if (val instanceof Date) {
      val = val.format('yyyy-MM-dd hh:mm:ss')
    }
    newO[key] = typeof val === 'object' ? arguments.callee(val) : val
  }
  return newO
}

// 格式化时间
Date.prototype.format = function(fmt) {
  var o = {
    'M+' : this.getMonth()+1,                 // 月份
    'd+' : this.getDate(),                    // 日
    'h+' : this.getHours(),                   // 小时
    'm+' : this.getMinutes(),                 // 分
    's+' : this.getSeconds(),                 // 秒
    'q+' : Math.floor((this.getMonth()+3)/3), // 季度
    'S'  : this.getMilliseconds()             // 毫秒
  }
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+'').substr(4 - RegExp.$1.length))
  }
  for(var k in o) {
    if(new RegExp('('+ k +')').test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (('00'+ o[k]).substr((''+ o[k]).length)))
    }
  }
  return fmt
}

const modal_confirm_custom = (leader,title,fun) =>{
  let tip = title.length>0 ? '<p style="font-size:15px;transform: translateY(-3px);">'+ title +'</p>' :'确定删除吗?'
  leader.$Modal.confirm({
    content: tip,
    onOk: () => {
      fun()
    },
    onCancel: () => {
      leader.$store.commit('changeFlag',true)
    }
  })
}

const valueFromExpression = (item, expression, default_value='') =>{
  let expr=expression
  let item_tmp = item
  let attrs=expr.split('.')
  let n=0
  for (n in attrs){
    if (isEmpty(item_tmp) && attrs[n] in item_tmp){
      item_tmp = item_tmp[attrs[n]]
    }else{
      return default_value
    }
  }
  return item_tmp
}

/*
 *Func: 通过select选中值返回选中对象
 * @param {String} val (选中值)
 * @param {String} key (匹配字段)
 * @param {Object} options (待匹配对象集合)
 *
 */
const returnObjByValue = (val, key, options) =>{
  for (let no in options) {
    if (options[no][key] === val) {
      return options[no]
    }
  }
}

/*
 *Func: 后台获取select数据赋值公共方法
 * @param {Object} that (调用页面当前对象)
 * @param {String} API (匹配字段)
 * @param {Object} params (接口所需参数)
 * @param {String} receiveParams (接收数据字段层级关系)
 *
 */
const getSelectOptions = (that, API, params, receiveParams) => {
  that.$httpRequestEntrance.httpRequestEntrance('GET', API, params, (responseData) => {
    let res = responseData.data
    if (res.length > 0) {
      let arr = receiveParams.split('.')
      let temp = that
      for(let i=0;i<arr.length ;i++){
        temp = temp[arr[i]]
      }
      res.forEach((item) => {
        let desc =  (item.desc === null)? '-':item.desc
        temp.push({
          name: item.name + '(' + desc + ')',
          id: item.id
        })
      })
    }
  })
}


const inquiryPrice = (that, Api, params) => {
  // 初始化价格显示
  that.price.isInquiryPriceOK = false
  that.$httpRequestEntrance.httpRequestEntrance('POST', Api,
    params, (responseData) => {
      that.price.isInquiryPriceOK_else_isAllNull = false
      that.price.totalPrice = 0
      that.price.originPrice = 0
      that.price.productDetails = []
      that.price.discounts = []
      for (let item of responseData) {
        if (item.price !== null) {
          that.price.productDetails.push({
            productName: item.product.name,
            price: item.price,
            priceUnit: item.charging_pkg.measurement_display
          })
          that.price.totalPrice += Number(item.price)
          that.price.originPrice += Number(item.origin_price)
          for (let discountInfo of item.discounts) {
            that.price.discounts.push({
              started_date: discountInfo.started_date,
              ended_date: discountInfo.ended_date,
              discount_name: discountInfo.discount_config.name
            })
          }
        }
      }
      that.price.totalPrice = that.price.totalPrice.toFixed(4)
      that.price.originPrice = that.price.originPrice.toFixed(4)
      if (that.price.productDetails.length > 0) {
        that.price.isInquiryPriceOK = true
        that.price.isInquiryPriceOK_else_isAllNull = false
      } else {
        that.price.isInquiryPriceOK = false
        that.price.isInquiryPriceOK_else_isAllNull = true
      }
    }, false)
}

/*
 *Func: 根据对象路径字符串查找对应值
 * @param {String} stringPath (所在路径字符串)
 * @param {Object} obj (待检索对象)
 * @param {Object} result (查找到最终值)
 *
 */
const obtainValueFromObject = (stringPath, obj) => {
  let arr = stringPath.split('.')
  let result = obj
  for (let item of arr) {
    if (isEmpty_reset(result[item])) {
      return ''
    }
    result = result[item]
  }
  return result
}

/*
 *Func: 根据对象路径字符串查找对应值，路径任意位置取不到值返回null
 * @param {String} stringPath (所在路径字符串)
 * @param {Object} obj (待检索对象)
 * @param {Object} result (查找到最终值)
 *
 */
const obtainValueFromObjectPlus = (stringPath, obj) => {
  let arr = stringPath.split('.')
  let result = obj
  for (let item of arr) {
    if (isEmpty_reset(result[item])) {
      return ''
    }
    result = result[item]
  }
  return result
}

//订单产品可用区是否在该产品类型下可用
const  azIsAvailable = (productCode,azid,tip,global) =>{
  return httpRequestEntrance.httpRequestEntrance('GET', 'v1/azs',
  {enabled: true, product_code: productCode}, (responseData) => {
    let res = responseData.data
    let flag = false
    if (res.length > 0) {
      res.forEach((item) => {
        if(item.id === azid){
          flag = true
        }
      })
    }
    if(!flag&&tip){
      global.$Message.warning(tip)
    }
    return flag
  })
}

export const validate = {
  isEmpty,
  isEmpty_reset, // 为空效验新方法，计划替代isEmpty
  isEmptyAndWarn,
  isEmptyAndWarn_JSON,
  isEmptyReturn_JSON,
  isEmptyObject,
  isEmptyInObj,
  emptyJson, // 清空JSON对象中的值
  deepCopy, // JSON对象深拷贝
  isContainChina, //是否包含中文字符
  modal_confirm_custom,
  valueFromExpression, //多级表达式取值
  azIsAvailable,//该订单产品可用区是否在该产品类型下可用
  returnObjByValue, // 根据选中值返回选中对象
  getSelectOptions, // 获取租户
  inquiryPrice, // 产品询价
  obtainValueFromObject, //
  obtainValueFromObjectPlus,
}
