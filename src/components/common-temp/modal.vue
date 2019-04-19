<template>
  <div class="modal-component">
    <div class="modal fade" :id="modelConfig.modalId ? modelConfig.modalId: 'add_edit_Modal'"  role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" v-if="modelConfig.modalTitle">{{modelConfig.modalTitle}}--
              【<span style="color: red">{{interceptParams()}}</span>】
            </h4>
            <h4 class="modal-title" v-if="!modelConfig.modalTitle">{{modelConfig.title + '--'}}
              <label v-if="modelConfig.isAdd">
                <span>新增</span>
              </label>
              <label v-else>
                <span>编辑【</span>
                <span style="color: red;">
                  {{interceptParams()}}
                </span>】
              </label>
            </h4>
            <Icon type="close-round" data-dismiss="modal"></Icon>
          </div>
          <div class="modal-body">
            <form class="">
              <div v-for="(item, index) in modelConfig.config"  class="params-each">
                <label class="col-md-2 label-name" v-if="item.type != 'slot' && isHide(item.hide)" :class="item.type === 'select'? 'lable-name-select': ''">{{item.label}}:</label>
                <input v-if="item.type === 'text' && isHide(item.hide)"
                       v-model="modelConfig.addRow[item.value]"
                       autocomplete="off"
                       :disabled="modelConfig.isAdd ? false : item.disabled"
                       :placeholder="item.placeholder"
                       type="text"
                       v-validate="item.v_validate"
                       :name="item.value"
                       :class="{ 'red-border': errors.has(item.value) }"
                       class="col-md-7 form-control model-input">
                <input v-if="item.type === 'number' && isHide(item.hide)"
                       v-model.number="modelConfig.addRow[item.value]"
                       autocomplete="off"
                       :disabled="modelConfig.isAdd ? false : item.disabled"
                       :placeholder="item.placeholder"
                       type="text"
                       :name="item.value"
                       v-validate="item.v_validate"
                       class="col-md-7 form-control model-input">
                <input v-if="item.type === 'password' && isHide(item.hide)"
                       v-model="modelConfig.addRow[item.value]"
                       autocomplete="new-password"
                       :disabled="modelConfig.isAdd ? false : item.disabled"
                       type="password"
                       :placeholder="item.placeholder"
                       :name="item.value"
                       v-validate="item.v_validate"
                       class="col-md-7 form-control model-input">
                <input v-if="item.type === 'checkbox' && isHide(item.hide)"
                       v-model="modelConfig.addRow[item.value]"
                       autocomplete="off"
                       :type="item.type"
                       :disabled="modelConfig.isAdd ? false : item.disabled"
                       class="checkbox">
                <!--<Select v-model="modelConfig.addRow[item.value]"-->
                        <!--class="ui-select"-->
                        <!--ref="store"-->
                        <!--v-if="item.type === 'select' && isHide(item.hide)"-->
                        <!--:disabled="modelConfig.isAdd ? false : item.disabled"-->
                        <!--filterable>-->
                  <!--<Option-->
                    <!--v-for="item in modelConfig.v_select_configs[item.option]"-->
                    <!--:value="item.id"-->
                    <!--:key="item.id">-->
                    <!--{{ item.name }}-->
                  <!--</Option>-->
                <!--</Select>-->

                <v-select v-if="item.type === 'select' && isHide(item.hide)"
                          v-model="modelConfig.v_select_configs[item.value]"
                          :disabled="modelConfig.isAdd ? false : item.disabled"
                          label='name'
                          :name="item.showName? item.showName : 'name'"
                          :multiple="item.multiple? item.multiple : false"
                          class="col-md-7 v-selectss "
                          :options="modelConfig.v_select_configs[item.option]">
                </v-select>

                <!-- iview select UI -->
                <!-- <Select v-if="item.type === 'select' && isHide(item.hide)"
                  v-model="modelConfig.v_select_configs[item.value]"
                  filterable
                  :disabled="modelConfig.isAdd ? false : item.disabled"
                  class="col-md-7 v-selectss">
                   <Option v-for="item in modelConfig.v_select_configs[item.option]" :value="item.id" :key="item.id">{{ item.name }}</Option>
                </Select> -->
                <!--<slot v-if="item.type === 'slot' && !item.ishide" :name="item.name"></slot>-->
                <slot v-if="item.type === 'slot' && isHide(item.hide)&& !item.ishide" :name="item.name"></slot>
                <label class="required-tip" v-if="isRequired(item.v_validate) && isHide(item.hide)">*</label>
                <!--<label class="required-tip-&#45;&#45;" v-if="item.tips">-->
                  <!--<i class="fa fa-question-circle-o" aria-hidden="true"></i>-->
                <!--</label>-->
                <!--<Tooltip content="" trigger="click" placement="bottom" :delay="500">-->
                  <!--<i v-if="item.tips" class="fa fa-question-circle-o" aria-hidden="true"></i>-->
                  <!--<div slot="content"style="">-->
                    <!--<span>-->
                    <!--{{item.tips}}-->
                  <!--</span>-->
                  <!--</div>-->
                <!--</Tooltip>-->
                <Poptip v-if="item.tips&& isHide(item.hide)" word-wrap content="" trigger="hover" placement="bottom" :delay="500">
                  <i class="fa fa-question-circle-o question-circle" aria-hidden="true"></i>
                  <div slot="content" class="slot-content-question-circle">
                    <div v-html="item.tips"></div>
                  </div>
                </Poptip>

                <label v-show="errors.has(item.value) && isHide(item.hide)" class="col-md-7 help is-danger">{{item.label}} {{errors.first(item.value)}}</label>
                <label v-if="item.type === 'select' && item.isError" class="col-md-7 help is-danger">{{item.label}} 不能为空</label>
              </div>
            </form>
          </div>
          <div class="model-footer-f" v-if="!modelConfig.modalFooter">
            <button type="button" class="btn-cancle-f" data-dismiss="modal">取消</button>
            <button v-if="!modelConfig.saveFunc" @click="save(modelConfig.isAdd)" type="button" class="btn-confirm-f">保存</button>
            <button v-if="modelConfig.saveFunc" @click="customFunc(modelConfig.saveFunc)" type="button" class="btn-confirm-f">保存</button>
          </div>
          <div class="model-footer-f" v-if="modelConfig.modalFooter">
            <button type="button" class="btn-cancle-f" data-dismiss="modal">取消</button>
            <template v-for="(item, index) in modelConfig.modalFooter">
            <button  @click="customFunc(item.Func)" type="button" class="btn-confirm-f" v-if='item.name'>{{item.name}}</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'modal-component',
    data () {
      return {
        configCopy:this.modelConfig,
        FLAG:false,
      }
    },
    props: ['modelConfig'],
    mounted() {
      let _this = this
      let modalId = !this.$validate.isEmpty(this.modelConfig.modalId) ? 'add_edit_Modal':this.modelConfig.modalId

      this.JQ('#' + modalId).on('hidden.bs.modal', () => {
        // 清理表单验证错误信息
        _this.errors.clear()
        // 清除表单缓存内容
        this.$validate.emptyJson(_this.modelConfig.addRow)
        // 清除表单缓存的selected数据
        for (let p in _this.modelConfig.v_select_configs) {
          if (p.endsWith('selected')) {
            _this.modelConfig.v_select_configs[p] = null
          }
        }
        // 清除表单selected
        for(let i=0; i<this.modelConfig.config.length; i++){
          if(this.modelConfig.config[i].type === 'select' && this.modelConfig.config[i].v_validate) {
            this.modelConfig.config[i].isError = false
          }
          if(this.modelConfig.config[i].type === 'slot') {
            let arr = this.modelConfig.config[i].v_validate ? this.modelConfig.config[i].v_validate :[]
            for(let j =0;j<arr.length;j++){
              let key = arr[j].isError
              let value = arr[j].value
              if(arr[j].type === 'select' && !this.modelConfig.v_select_configs[value]) {
                this.modelConfig.v_select_configs[key] = false
              }
            }
          }
        }
      })
    },
    watch:{
      configCopy: {
        handler(){
          //select选择完将提示隐藏，如果日后保留'X'删除功能，如需要，再增加显示处理逻辑
          for(let key in this.modelConfig.v_select_configs) { //slot select
            if(key.endsWith('isError')){
              let prefix = key.slice(0,-7)
              let value = prefix+'selected'
              let isMutile = Array.isArray(this.modelConfig.v_select_configs[value]) && this.modelConfig.v_select_configs[value].length>0
              let isSingle = !Array.isArray(this.modelConfig.v_select_configs[value]) && this.modelConfig.v_select_configs[value]
              if(this.modelConfig.v_select_configs[key] && (isMutile|| isSingle)){
                this.modelConfig.v_select_configs[key] = false
              }
            }
          }
          for(let i=0; i< this.modelConfig.config.length; i++){ //config select
            if(this.modelConfig.config[i].type === 'select' && this.modelConfig.config[i].v_validate) {
              let obj = this.modelConfig.config[i]
              if(this.modelConfig.v_select_configs[obj.value]){
                this.modelConfig.config[i].isError = false
              }
            }
          }
        },
        deep:true
      }
    },
    filters: {},
    methods: {
      // 处理提示信息过长问题
      interceptParams () {
        return this.$utils.interceptParams(this.$parent.modelTip.value, 20)
      },
      formValidate(){
        return this.$validator.validate().then(result => {
          //result 为false插件验证input没有填写完整,true为验证填写完整
          /** 验证 select是否进行了选填 实例可参照 [manage][authorizations]user-authorized.vue **/
          let flag = true
          for(let i=0; i< this.modelConfig.config.length; i++){
            if(!this.isHide (this.modelConfig.config[i].hide)){
              continue
            }
            /* ****** 配置里面的select ***** */
            //配置规则为：在配置type:selcet时，如需校验则添加v_validate: 'required:true',isError: false==>控制错误提示label显示
            //如果无需校验，则不添加
            if(this.modelConfig.config[i].type === 'select' && this.modelConfig.config[i].v_validate) {
              let obj = this.modelConfig.config[i]
              if(!this.modelConfig.v_select_configs[obj.value]){
                this.modelConfig.config[i].isError = true
                flag = false
              }else{
                this.modelConfig.config[i].isError = false
              }
            }
            /* ******  slot里面的select  ****** */
            //配置规则为：在配置type:slot 时，添加 v_validate:[],数组里面存放需要校验的select的配置信息
            //value:绑定值,isError:错误标签显示绑定值，type:select  ===> 如果以后再校验其他类型，再增加判断逻辑
            //{name:'xxxx',type:'slot',v_validate:[{value: 'v_xxx_selected', isError: 'v_xxx_isError', type: 'select'}]}
            //同时在this.modelConfig.v_select_configs里面定义v_xxx_isError：false
            //slot里面错误提示label显示用 v-if="modelConfig.v_select_configs.v_xxx_isError" 搭配其他具体规则进行组合
            if(this.modelConfig.config[i].type === 'slot' && !this.modelConfig.config[i].ishide) {
              let arr = this.modelConfig.config[i].v_validate ? this.modelConfig.config[i].v_validate :[]
              for(let j =0;j<arr.length;j++){
                let key = arr[j].isError
                let value = arr[j].value
                let isMutile = Array.isArray(this.modelConfig.v_select_configs[value]) && this.modelConfig.v_select_configs[value].length<1
                if (arr[j].type === 'select' && (isMutile ||!this.modelConfig.v_select_configs[value])) {
                  this.modelConfig.v_select_configs[key] = true
                  flag = false
                } else {
                  this.modelConfig.v_select_configs[key] = false
                }
              }
            }
          }
          return result && flag
        })
      },
      save(val) {
        let resultPromise = this.formValidate()
        resultPromise.then(result =>{
          if(result){
            if(this.$store.state.modalBtnFlag){
              this.$store.commit('changeFlag',false) //点击按钮后禁用
            }else{
              return
            }
            if (val) {
              this.$parent.addPost()
            } else {
              this.$parent.editPost()
            }
          }
        })
      },
      // 自定义模态框保存响应函数
      customFunc (func) {
        let val = this.formValidate()
        val.then(result =>{
          if(result){
            if(this.$store.state.modalBtnFlag){
              this.$store.commit('changeFlag',false) //点击按钮后禁用
            }else{
              return
            }
            this.$parent[func]()
          }
        })
      },
      // 控制是否显示必填'*'
      isRequired (item) {
        if (!this.$validate.isEmpty(item)) {
          return false
        } else {
          if (item.indexOf('required') > -1) {
            return true
          } else {
            return false
          }
        }
      },
      // 控制表单字段在某种情况下是否显示
      isHide (val) {
        if (!this.$validate.isEmpty(val)) {
          return true
        }
        let res = (this.modelConfig.isAdd === true ? 'ADD':'EDIT')
        if (res === String(val).toUpperCase() || val === true) {//val,适用于配置项显示隐藏不依据新建/编辑状态，依赖其他条件，配置boolean值：false显示，true不显示
          return false
        }
        return true
      }
    },
    components: {}
  }
</script>

<style lang="less" scoped>
  .ui-select {
    width: 70%;
  }
  .modal{
    z-index: 2050;
  }
  .modal-dialog {
    top:15%;
    font-family: MicrosoftYaHei;
  }
  .modal-body {
    position: initial;
    padding: 16px 8px;
    .params-each {
      display: block;
      margin-bottom: 6px;
      .v-selectss {
        vertical-align: middle;
        min-width: 70% !important;
        display: inline-block;
        padding: 0px;
        word-break: break-all;
      }
      .checkbox {
        margin-top: 11px;
      }
    }
  }
  .modal-header {
    height: 55px;
    align-items: center;
    .modal-title{
      font-size: 16px;
      color: rgba(0,0,0,0.85);
    }
    i{
      font-size: 8px;
      color: #A7B3BD;
    }
  }
  .label-name {
     text-align: right;
     margin-top: 8px;
     padding-left: 0px;
     padding-right: 2px;
   }
  /*控制v-select时label样式*/
  .lable-name-select {
    // position: inherit;
    // bottom: 14px;
    vertical-align: middle;
  }
  .model-input{
    min-width: 70%;
    font-size: 12px;
    display: inline-block;
  }
  /*取消选中样式*/
  .form-control:focus {
    box-shadow: none;
  }
  .red-border {
    border: 1px solid red;
  }
  .is-danger {
    color: red;
    margin-left: 70px;
    margin-bottom: 0px;
  }

  .question-circle {
    font-size: 14px;
    color: gray;
    cursor: pointer;
  }
  .slot-content-question-circle{
    width:200px;
    padding:6px;
    white-space: normal;
  }

  button:focus {
    box-shadow: none;
  }
  .btn {
    width: 65px;
    height: 32px;
    padding: 4px 0px;
  }

  /*placeholer样式--开始 */
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #c0c1c0;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #c0c1c0;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #c0c1c0;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #c0c1c0;
  }
  /*placeholer样式--结束 */
  .tipSty{
    color: red;
    margin-left: 8%;
  }
</style>
