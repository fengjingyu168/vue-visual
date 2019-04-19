import Vue from 'vue'
import vuex from 'vuex'
import {validate} from '../common/validate.js'
Vue.use(vuex)

export default new vuex.Store({
  state:{// 缓存用户编辑后的自定义列表数据
    ecsManage: null, // 以页面路由作为唯一识别码
    modalBtnFlag:true, //弹窗按钮可用标志
    tableExtendActive:-1,//table组件扩展状态
  },
  mutations:{
    /*
     接收自定义列表信息，将数据以页面路由作为唯一识别码保存至tableColumns
     */
    catchColumn(state,column){
      if (!validate.isEmpty(state[column.name])) {
        state[column.name] = null
      }
      state[column.name] = column.params
    },
    changeFlag(state,flag){
      state.modalBtnFlag = flag
    },
    changeTableExtendActive(state,index){
      state.tableExtendActive = index
    }
  }
})
