<template>
  <div id="app">
    <component
      v-if="isReady"
      :is="'AppComponent'"
      :plist="list"
    ></component>
  </div>
</template>

<script>
import Vue from 'vue'
import FormControl from '@/components/controls'
import APP_HTML from './App.html'
console.log(APP_HTML)
// const APP_HTML = `<div class="page-footer">
//   <div class="buttons">
//     <a @click="submit()">提交</a>
//   </div>
// </div>`
import APP_JAVASCRIPT from './App.js'
import API_LIST from '@/api/list.js'
import { findIndex } from 'lodash'

export default {
  name: 'app',
  components: {
    FormControl
  },
  data () {
    return {
      html: '',
      list: [],
      isReady: false
    }
  },
  created () {
    setTimeout(() => {
      this.list = API_LIST.list
      this.html = API_LIST.RuntimeContent
      this.registerComponent()
      this.isReady = true
    }, 0)
  },
  methods: {
    formatHtml (html) {
      const reg = new RegExp(/<(Form[^<]+)>[^<>]*<\/Form[^<]+>/, 'g')
      let formatHtml = html.replace(reg, (match, escape, evaluate, offset) => {
        let index = findIndex(this.list, { controlkey: escape })
        return `<form-control
          :key="list[${index}].datafield"
          :field="list[${index}].datafield"
          :type="list[${index}].controlkey"
          :config="list[${index}]"
          :value="list[${index}].Value"
          @getValue="bindGetValueFn(${index}, $event)"
          @input="handleInput(${index}, $event, list[${index}])"
        ></form-control>`
      })
      return formatHtml
    },
    registerComponent () {
      let options = APP_JAVASCRIPT
      options.template = `<div>${this.formatHtml(this.html)}${APP_HTML}</div>`
      Vue.component('AppComponent', (resolve, reject) => {
        resolve(options)
      })
    }
  },
}
</script>

<style>
</style>
