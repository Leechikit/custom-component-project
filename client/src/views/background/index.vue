<template>
  <div class="container">
    <div class="sidebar">
      <el-button
        type="primary"
        :disabled = "controlkey === 'app'"
        @click="changeCodes(appCodes,'app')"
      >表单设置</el-button>
      <p class="title">自定义控件</p>
      <el-button
        type="primary"
        v-for="(control, $index) in controlsCodes"
        :key="$index"
        :disabled = "controlkey === control.controlkey"
        @click="changeCodes(control,control.controlkey)"
      >{{control.displayname}}</el-button>
    </div>
    <div class="content">
      <div class="box">
        <editor
          ref="html"
          language="html"
          :codes="htmlCode"
          title="HTML"
          @submit="htmlSubmit"
        ></editor>
      </div>
      <div class="box">
        <editor
          ref="css"
          language="css"
          :codes="cssCode"
          title="CSS"
          @submit="cssSubmit"
        ></editor>
      </div>
      <div class="box">
        <editor
          ref="javascript"
          language="javascript"
          :codes="javascriptCode"
          title="JAVASCRIPT"
          @submit="javascriptSubmit"
        ></editor>
      </div>
    </div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor'
import editor from '@/components/editor.vue'
import API_CODE from '@/api/code.js'

export default {
  name: 'background',
  components: { editor },
  data () {
    return {
      htmlCode: '',
      cssCode: '',
      javascriptCode: '',
      controlkey: null,
      appCodes: {},
      controlsCodes: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      const codes = await API_CODE.getCodes()
      this.appCodes = codes.app
      this.controlsCodes = codes.controls
    },
    changeCodes (obj, controlkey) {
      this.getData()
      this.controlkey = controlkey
      this.$refs.html.setValue(obj.html)
      this.$refs.css.setValue(obj.style)
      this.$refs.javascript.setValue(obj.javascript)
    },
    async htmlSubmit (value) {
      this.getData()
      const result = await API_CODE.save({
        type: 'html',
        codes: value,
        controlkey: this.controlkey === 'app' ? null : this.controlkey
      })
      console.log(result)
    },
    async cssSubmit (value) {
      this.getData()
      const result = await API_CODE.save({
        type: 'css',
        codes: value,
        controlkey: this.controlkey === 'app' ? null : this.controlkey
      })
      console.log(result)
    },
    async javascriptSubmit (value) {
      this.getData()
      const result = await API_CODE.save({
        type: 'javascript',
        codes: value,
        controlkey: this.controlkey === 'app' ? null : this.controlkey
      })
      console.log(result)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  height: 100%;
  padding: 50px;
  background-color: #fff;
  .sidebar {
    width: 120px;
    border-right: 1px solid #999;
    .title {
      margin: 10px 0;
    }
  }
  .content {
    flex-grow: 1;
    display: flex;
    .box {
      flex-basis: 0%;
      flex-grow: 1;
      margin: 0 5px;
    }
  }
}
</style>
