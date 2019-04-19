<template>
  <div class="attribute">
    <ul>
      <template v-for="(property, proIndex) in attr.config">
        <li>
          <label>{{property.label}}:</label>
          <!--输入框-->
          <input v-if="property.type === 'text'"
                 v-model="attr.data[property.value]"
                 autocomplete="off"
                 :disabled="property.disabled"
                 :placeholder="property.placeholder"
                 type="text"
                 v-validate="property.v_validate"
                 :name="property.value"
                 :class="{ 'red-border': errors.has(property.value) }"
                 class="form-control">
          <!--checkbox-->
          <input v-if="property.type === 'checkbox'"
                 v-model="attr.data[property.value]"
                 autocomplete="off"
                 :type="property.type"
                 :disabled="property.disabled"
                 class="checkbox">

          <template v-if="property.type === 'InputNumber'">
            <InputNumber :max="property.max" :min="property.min" v-model="attr.data[property.value]"></InputNumber>
          </template>

          <template v-if="property.type === 'select'">
            <v-select
                      v-model="attr.v_select_configs[property.value]"
                      :disabled="property.disabled"
                      label='label'
                      :name="property.showName? property.showName : 'label'"
                      :multiple="property.multiple? property.multiple : false"
                      :options="attr.v_select_configs[property.option]">
            </v-select>

          </template>

        </li>
        <label v-show="errors.has(property.value)" class="help is-danger">{{property.label}} {{errors.first(property.value)}}</label>
      </template>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'attribute',
    data() {
      return {}
    },
    props: ['attr'],
    mounted() {

    },
    methods: {},
    components: {}
  }
</script>

<style lang="less" scoped>
  h4 {
    margin: 0;
  }
  li {
    padding: 4px 0;
    list-style:none
  }
  .form-control {
    height: 32px;
    font-size: 12px;
    color: #999;
  }
  .form-control:focus {
    box-shadow: none;
  }

  .red-border {
    border: 1px solid red;
  }
  .is-danger {
    color: red;
    margin-bottom: 0px;
  }
</style>
