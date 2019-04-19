<template>
    <div>
        <Modal v-model="confirmShow" footer-hide
        :styles="{top: '15%'}"
        width = "402px"
        class="delete-modal-wrap"
        @on-visible-change="stateChange"
        >
          <div class="content">
            <div class="warningIcon">
                <!-- <b>!</b> -->
              <Icon type="help-circled" color="#f90" size="44"></Icon>
            </div>
            <div class="baseline"></div>
            <p v-if="confirmTip && strArr">{{strArr[0]}}<span style="color: red">{{strArr[1]}}</span>{{strArr[2]}}</p>
            <p v-else>{{confirmTip}}</p>
          </div>
          <!--<div slot="footer">-->
            <!--<Button type="text" @click="cancel">取消</Button>-->
            <!--<Button type="error" @click="ok">确定</Button>-->
          <!--</div>-->
          <div class="model-footer-temp-f">
            <button type="button" class="btn-cancle-f" data-dismiss="modal" @click="cancel">关闭</button>
            <button type="button" class="btn-confirm-f" @click="ok">确定</button>
          </div>
        </Modal>
    </div>
</template>

<script>
  // import Vue from 'vue'
  // import vuex from 'vuex'
  // Vue.use(vuex)
  export default {
    data () {
      return {
        confirmShow: false,
        strArr: null,
      }
    },
    props: {
      propsShow: Boolean,
      confirmTip: String,
      okCallback: Function,
      cancelCallback: Function,
      that: Object,
    },
    watch: {
      propsShow (newVal) {
        this.confirmShow = newVal
        if (this.confirmTip && this.confirmTip.indexOf('【') > -1 && this.confirmTip.indexOf('】') > -1 ) { // 把要标红的字符串截取出来
          let start = this.confirmTip.indexOf('【') + 1
          let end = this.confirmTip.indexOf('】')
          let data = this.confirmTip.slice(start, end)
          this.strArr = [this.confirmTip.slice(0,start), data, this.confirmTip.slice(end)]
        } else {
          this.strArr = null
        }

      }
    },
    mounted () {
      this.confirmShow = this.propsShow
    },
    methods: {
      ok () {
        this.confirmShow = false
        this.propsShow = false
        if (this.okCallback) {
          this.okCallback()
        }
      },
      cancel () {
        this.confirmShow = false
        this.propsShow = false
        if (this.cancelCallback) {
          this.cancelCallback()
        }
      },
      stateChange (state) {
        if (!state) {
          if (this.that) {
            this.that.$store.commit('changeFlag',true) //取消点击按钮后禁用
          }
          this.confirmShow = false
          this.propsShow = false
        }
      }
    }
  }
</script>

<style lang="less" scoped>
/*删除模态框样式*/
.delete-modal-wrap{
    .ivu-modal{
        width: 402px;
        height: 177px;
    }
    .ivu-btn-text{
        border: 1px solid #e9eaec;
    }
    .content{
        height: 89px;
        padding-top: 20px;
        padding-left: 22px;
        .warningIcon{
        width: 44px;
        height: 44px;
        color: #ffffff;
        text-align: center;
        display: inline-block;
        vertical-align: middle;
        b{
            font-size: 28px;
            line-height: 44px;
        }
        }
        .baseline{
        display: inline-block;
        height: 100%;
        width: 1px;
        min-height: 50px;
        vertical-align: middle;
        }
        p{
        line-height: 1.4;
        padding-left: 22px;
        font-size: 16px;
        vertical-align: middle;
        display: inline-block;
        min-height: 22px;
        word-break: break-all;
        width: 290px;
        }
    }
}

</style>
