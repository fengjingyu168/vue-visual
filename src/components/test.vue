<template>
  <div style="height: 1000px;width: 1000px;">
    <input v-model="test.text">
  </div>
</template>

<script>
  export default {
    data () {
      return {
        test: {
          text: 'asdfas'
        }
      }
    },

    watch:{
      test: {
        deep: true,
        handler: function (newVal,oldVal){
          console.log('newValue', newVal)
          console.log('oldValue', oldVal.text)
        }
      }
    }
  }
</script>
