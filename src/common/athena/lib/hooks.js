// import CMJSBridge from './CMJSBridge'

const changeTitle = () => {
}

const hook = (doc) => {
  // CMJSBridge.callNativeMethod(moduleName, serverName, methodName, data, callback)
  changeTitle(doc)
}

export default hook
