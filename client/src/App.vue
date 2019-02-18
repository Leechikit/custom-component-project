<template>
  <div id="app">
    <form-control
      v-for="control in list"
      :key="control.datafield"
      :field="control.datafield"
      :type="control.controlkey"
      :config="control"
      :value="control.Value"
      @getValue="bindGetValueFn(control.controlListIndex, $event)"
      @setValue="bindSetValueFn(control.controlListIndex, $event)"
      @input="handleInput(control.controlListIndex, $event, control)"
    ></form-control>
  </div>
</template>

<script>
import FormControl from '@/components/controls'
import API_LIST from '@/api/list.js'

export default {
  name: 'app',
  components: {
    FormControl
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    setTimeout(() => {
      this.list = API_LIST.list
    }, 0)
  },
  methods: {
    bindGetValueFn () { },
    bindSetValueFn () { },
    handleInput () { }
  },
}
</script>

<style>

</style>
