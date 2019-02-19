<template>
  <div id="app">
    <form-control
      v-for="(control, $index)  in list"
      :key="control.datafield"
      :field="control.datafield"
      :type="control.controlkey"
      :config="control"
      :value="control.Value"
      @getValue="bindGetValueFn($index, $event)"
      @input="handleInput($index, $event, control)"
    ></form-control>
    <div class="page-footer">
      <div class="buttons">
        <a @click="submit()">提交</a>
      </div>
    </div>
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
    bindGetValueFn (index, event) {
      this.list[index]['getValue'] = event
    },
    handleInput (index, event, control) {
      this.list[index]['Value'] = event
    },
    submit () {
      let result = {}
      this.list.forEach(item => {
        result[item.datafield] = item.getValue()
      })
      console.log(result)
    }
  },
}
</script>

<style>
</style>
