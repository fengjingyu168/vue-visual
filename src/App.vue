<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="less">
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
  }

  /*控制消息提醒组件*/
  .ivu-message {
    z-index: 10000;
  }
  /*解决确认提示框被模态框遮挡问题*/
  .swal2-container {
    z-index: 10001;
  }
  /* chrome 滚动条自定义*/
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background: #bbb;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0;
    background: #e1e1e1;
  }

  .ivu-modal-mask{
    z-index: 3000;
  }
  .ivu-modal-wrap{
    z-index: 3000;
    top:4.7rem;
  }
  .modal-dialog{
    top: 15%
  }

  /*v-select样式*/
  .v-select /deep/ input[type=search], .v-select /deep/ input[type=search]:focus {
    height: 30px !important;
  }

  .v-select /deep/ .open-indicator:before {
    border-width: 0 !important;
    content: "\f104"
  }

  .v-select /deep/ .open-indicator {
    position: absolute;
    top: 50%;
    right: 6px;
    line-height: 1;
    margin-top: -14px;
    font-size: 14px;
    color: #80848f;
    transition: all .3s ease-in-out;

    display: inline-block;
    font-family: Ionicons;
    font-style: normal;
    font-weight: 400;
    line-height: 1;

    transform:rotate(-134deg);
    -ms-transform:rotate(-134deg); 	/* IE 9 */
    -moz-transform:rotate(-134deg); 	/* Firefox */
    -webkit-transform:rotate(-134deg); /* Safari 和 Chrome */
    -o-transform:rotate(-134deg); 	/* Opera */
  }

  .v-select /deep/ .dropdown-menu {
    font-size: 13px !important;
    li {
      margin: 0;
      line-height: normal;
      clear: both;
      color: #595959;
      white-space: nowrap;
      list-style: none;
      cursor: pointer;
      transition: background .2s ease-in-out;
    }
  }

  .v-select /deep/ .selected-tag {
    margin: 2px 1px 0 3px;
  }
</style>
