import Vue from 'vue'
import index from '@/components/index'

describe('index.vue', () => {
  const Constructor = Vue.extend(index)
  const vm = new Constructor().$mount()

  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.hello h1').textContent)
    .to.equal('项目已初始化完成，请开始你的表演！')
    expect(vm.msg).to.equal('Welcome!')
  })
})
