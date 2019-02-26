<template>
  <component
    :is="type"
    v-model="currentValue"
    :type="type"
    :field="field"
    :config="config"
    @getValue="getValue"
    @input="handleInput"
  ></component>
</template>
<script>
import Vue from 'vue'
import mixins from './mixins/base'
import { registerAsyncComponent, loadStyle } from '@/helper/custom-helper.js'

let controls = require.context('./', true, /form-.*\.vue$/)
let components = {}
controls.keys().forEach(key => {
  let control = controls(key)
  components[control.default.name] = control.default
})

export default {
  props: ['type', 'value', 'config', 'field'],
  components: {
    ...components
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value: function () {
      this.currentValue = this.value
      this.$emit('input', this.value)
    }
  },
  created () {
    if (this.config.isCustom) {
      this.registerComponent()
      this.loadStyle()
    }
  },
  methods: {
    getValue (event) {
      this.$emit('getValue', event)
    },
    handleInput (event) {
      this.$emit('input', event)
    },
    registerComponent () {
      let base = (new Function(`${this.config.customDatas.javascript} return func()`))()
      base.template = this.config.customDatas.template
      registerAsyncComponent({
        name: this.config.controlkey,
        base,
        mixins
      })
    },
    loadStyle () {
      loadStyle({
        name: this.config.controlkey,
        style: this.config.customDatas.style
      })
    }
  }
}
</script>