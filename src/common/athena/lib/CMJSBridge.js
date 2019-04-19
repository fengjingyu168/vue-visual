import h5Services from './services/h5Services'

const CUSTOM_PROTOCOL_SCHEME = 'athena'
let UUID = 0
let messagingIframe
const responseCallbacks = {}

const serviceManager = (requestID) => {
  h5Services.forEach(service => {
    if (service.requestID === requestID) {
      service.callFunction()
    }
  })
}

const _createIFrame = () => {
  messagingIframe = document.createElement('iframe')
  messagingIframe.style.display = 'none'
  document.documentElement.appendChild(messagingIframe)
}

const _doSendByIframe = (srcStr) => {
  messagingIframe.src = srcStr
}

const _isAndroid = () => {
  const ua = navigator.userAgent.toLowerCase()
  const isA = ua.indexOf('android') > -1
  if (isA) {
    return true
  }
  return false
}

const _isIphone = () => {
  const ua = navigator.userAgent.toLowerCase()
  const isIph = ua.indexOf('iphone') > -1
  if (isIph) {
    return true
  }
  return false
}

const callNativeMethod = (moduleName, serverName, methodName, param, responseCallback) => {
  const callbackID = 'callbackID_' + (UUID++) + '_' + new Date().getTime()
  const path = '://' + moduleName + '/' + serverName + '/' + methodName + '?'

  param = JSON.stringify(param)

  if (responseCallback) {
    responseCallbacks[callbackID] = responseCallback
    param = 'data=' + param + '&callbackID=' + callbackID
  } else {
    param = 'data=' + param + '&callbackID=-1'
  }

  _doSendByIframe(CUSTOM_PROTOCOL_SCHEME + path + encodeURIComponent(param))
}

const nativeResponse = (message) => {
  const msgJson = JSON.parse(message)

  if (parseInt(msgJson.code) === 0) {
    const callbackID = msgJson.callbackID
    const data = msgJson.data
    const responseCallback = responseCallbacks[callbackID]

    responseCallback(data)
    delete responseCallbacks[callbackID]
  } else {
    // eslint-disable-next-line
    console.error(message.message)
  }
}

const nativeCallJS = (msgJson) => {
  const requestID = msgJson.requestID
  const callbackID = msgJson.callbackID
  const data = msgJson.data

  serviceManager(requestID, data)

  let responseData = {
    'code': '0',
    'message': 'success',
    'data': {},
    'callbackID': callbackID || -1
  }

  responseData = JSON.stringify(responseData)

  if (_isAndroid()) {
    _doSendByIframe(CUSTOM_PROTOCOL_SCHEME + '://jsReturn/' + encodeURIComponent(responseData))
  } else if (_isIphone()) {
    return responseData
  }
}

const nativeCallHandler = (message) => {
  const msgJson = JSON.parse(message)
  const moduleName = msgJson.moduleName || null
  const requestID = msgJson.requestID || null

  if (moduleName && requestID) {
    return nativeCallJS(msgJson)
  }
}

_createIFrame()

const CNJSBridge = {
  callNativeMethod: callNativeMethod,
  nativeCallHandler: nativeCallHandler,
  nativeResponse: nativeResponse
}

export default CNJSBridge
