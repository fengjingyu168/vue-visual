import CMJSBridge from './lib/CMJSBridge'

window.bridge = {
  nativeCallHandler: (moduleName, serverName, methodName, data, callback) => {
    CMJSBridge.nativeCallHandler(moduleName, serverName, methodName, data, callback)
  },
  nativeResponse: (message) => {
    CMJSBridge.nativeResponse(message)
  }
}

const Athena = {
  send: (moduleName, serverName, methodName, data, callback) => {
    CMJSBridge.callNativeMethod(moduleName, serverName, methodName, data, callback)
  },
  setTitle: (title, callback) => {
    CMJSBridge.callNativeMethod('app', 'baseUI', 'setTitle', {'title': title}, callback)
  }
}

export default Athena
