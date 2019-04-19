import ConfirmComponent from './confirm-component.vue'

let $vm

export default {
  install(Vue) {
    if (!$vm) {
      const ConfirmPlugin = Vue.extend(ConfirmComponent)
      $vm = new ConfirmPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    $vm.propsShow = false
    let confirming = {
      confirmFunc(params) {
        $vm.propsShow = true
        $vm.confirmTip = params.confirmTip
        $vm.okCallback = params.okCallback 
        $vm.cancelCallback = params.cancelCallback
        $vm.that = params.that
      },
      hide() {
        $vm.propsShow = false
      }
    }
    if (!Vue.$confirming) {
      Vue.$confirming = confirming
    }
    // Vue.prototype.$loading = Vue.$loading;
    Vue.mixin({
      created() {
        this.$confirming = Vue.$confirming
      }
    })
  }
}

