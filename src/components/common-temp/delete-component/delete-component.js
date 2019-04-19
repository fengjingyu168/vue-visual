import DeleteComponent from './delete-component.vue'

let $vm

export default {
  install(Vue) {
    if (!$vm) {
      const DeletePlugin = Vue.extend(DeleteComponent)
      $vm = new DeletePlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    $vm.propsShow = false
    let deleting = {
      deleteFunc(params) {
        $vm.propsShow = true
        $vm.delTip = params.delTip
        $vm.friendlyReminder = params.friendlyReminder
        $vm.okCallback = params.okCallback 
        $vm.cancelCallback = params.cancelCallback 
      },
      hide() {
        $vm.propsShow = false
      }
    }
    if (!Vue.$deleting) {
      Vue.$deleting = deleting
    }
    // Vue.prototype.$loading = Vue.$loading;
    Vue.mixin({
      created() {
        this.$deleting = Vue.$deleting
      }
    })
  }
}

