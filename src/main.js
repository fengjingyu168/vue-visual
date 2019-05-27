// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import athena from './common/athena'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './common/local.bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './assets/font-awesome/css/font-awesome.min.css'
import httpRequest from './common/axiosHttp'
import 'babel-polyfill'
import Promise from 'promise'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import {validate} from './common/validate.js'
import {visualEditor} from './common/visualEditor.js'
import httpRequestEntrance from './common/httpRequestEntrance.js'
import {utils} from './common/utils.js'
import jquery from 'jquery'
// select插件
import vSelect from 'vue-select'
// 删除模态框插件
import deleteComponent from './components/common-temp/delete-component/delete-component.js'
// 确认操作模态框插件
import confirmComponent from './components/common-temp/confirm-component/confirm-component.js'
import VeeValidate from './common/veeValidate/VeeValidate'

iView.Message.config({
  top: 50,
  duration: 3
})
Vue.use(iView)

Vue.prototype.$validate = validate
Vue.prototype.$visualEditor = visualEditor
Vue.prototype.$httpRequestEntrance = httpRequestEntrance
Vue.prototype.$utils = utils
Vue.prototype.JQ = jquery
Vue.prototype.Promise = Promise


Vue.component('v-select', vSelect)


Vue.use(deleteComponent)


Vue.use(confirmComponent)

Vue.use(VeeValidate)

Vue.config.productionTip = false
Vue.prototype.athena = athena
Vue.prototype.httpRequest = httpRequest

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
