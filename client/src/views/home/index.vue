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
import APP_HTML from './index.html'
import APP_JAVASCRIPT from './index.js'
import API_LIST from '@/api/list.js'
import { findIndex } from 'lodash'
import { registerAsyncComponent, loadStyle } from '@/helper/custom-helper.js'

export default {
  name: 'app',
  data () {
    return {
      app: {},
      list: [],
      isReady: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    async getData() {
      const list = await API_LIST.getList()
      this.list = list.list
      this.app.html = list.template
      this.app.javascript = list.javascript
      this.app.style = list.style
      this.loadStyle()
      this.registerComponent()
      this.isReady = true
    },
    // 格式化拼接组件
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
    // 注册异步组件
    registerComponent () {
      let self = this
      let base = {
        mounted() {
          (new Function(self.app.javascript))()
        }
      }
      let options = APP_JAVASCRIPT
      options.template = `
      <div>
        ${this.formatHtml(this.app.html)}
        ${APP_HTML}
      </div>`
      registerAsyncComponent({
        name: 'AppComponent',
        base,
        mixins: options
      })
    },
    // 加载组件样式
    loadStyle () {
      loadStyle({
        style: this.app.style
      })
    }
  },
}
</script>