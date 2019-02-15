<template>
  <component
    :is="type"
    v-model="currentValue"
    :type="type"
    :field="field"
    :config="config"
    @getValue="getValue"
    @setValue="setValue"
    @input="handleInput"
  ></component>
</template>
<script>
import Vue from 'vue'
import base from './mixins/base'
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
    setValue (event) {
      this.$emit('setValue', event)
    },
    handleInput (event) {
      this.$emit('input', event)
    },
    registerComponent () {
      let options = eval('(' + this.config.js + ')')
      let combine = Object.assign({}, base, options)
      combine.methods = Object.assign({}, base.methods, options.methods)
      combine.watch = Object.assign({}, base.watch, options.watch)
      combine.props = Object.assign({}, base.props, options.props)
      combine.template = this.config.template
      Vue.component(this.config.controlkey, (resolve, reject) => {
        resolve(combine)
      })
    },
    loadStyle () {
      const style = document.createElement('style')
      style.innerHTML = this.config.css
      document.querySelector('head').appendChild(style)
    }
  }
}
</script>