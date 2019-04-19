<template>
  <div>
    <Modal v-model="delShow" footer-hide
    :styles="{top: '15%'}"
    width = "402px"
    class="delete-modal-wrap"
    @on-visible-change="stateChange"
    >
      <div class="content">
        <div class="warningIcon">
          <b>!</b>
        </div>
        <div class="baseline"></div>
        <p v-if="delTip"> 确定删除资源【<span style="color: #e13c13">{{delTip}}</span>】吗？<br/><span v-if="friendlyReminder" class="friendlyReminder">{{friendlyReminder}}</span> </p>
        <p v-if="!delTip"> 确定删除资源吗？<br/><span v-if="friendlyReminder" class="friendlyReminder">{{friendlyReminder}}</span></p>
        <!-- <div v-if="friendlyReminder" class="friendlyReminder">{{friendlyReminder}}</div> -->
      </div>
      <!--<div slot="footer">-->
        <!--<Button type="text" @click="cancel">取消</Button>-->
        <!--<Button type="error" @click="ok"></Button>-->
      <!--</div>-->

      <div class="model-footer-temp-f">
        <button type="button" class="btn-cancle-f" data-dismiss="modal" @click="cancel">关闭</button>
        <button type="button" class="btn-confirm-f" @click="ok">确定</button>
      </div>

    </Modal>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        delShow: false,
      }
    },
    props: {
      url: String,
      propsShow: Boolean,
      delTip: String,
      friendlyReminder: String,
      okCallback: Function,
      cancelCallback: Function
    },
    watch: {
      propsShow (newVal) {
        this.delShow = newVal
      }
    },
    mounted () {
      this.delShow = this.propsShow
    },
    methods: {
      ok () {
        this.delShow = false
        this.propsShow = false
        if (this.okCallback) {
          this.okCallback()
        }
      },
      cancel () {
        this.delShow = false
        this.propsShow = false
        if (this.cancelCallback) {
          this.cancelCallback()
        }
      },
      stateChange (state) {
        if (!state) {
          this.delShow = false
          this.propsShow = false
        }
      }
    }
  }
</script>
<style>
  .ivu-btn-error {
    background-color: #ed3f14 !important;
  }
</style>
<style lang="less" scoped>
/*删除模态框样式*/
.delete-modal-wrap{
  .ivu-modal{
    width: 402px;
  }
  .ivu-btn-text{
    border: 1px solid #e9eaec;
  }
  .content{
    padding-top: 30px;
    padding-bottom: 10px;
    padding-left: 22px;
    .warningIcon{
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: #fcac60;
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
    .friendlyReminder{
      font-size: 14px;
      // padding-top: 20px;
      // padding-left: 20px;
      // color: #e13c13;
    }
  }
}

</style>
