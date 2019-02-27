<template>
  <div class="container">
    <div class="sidebar">
      <el-button type="primary">表单设置</el-button>
      <p class="title">自定义控件</p>
      <el-button type="primary">货币控件</el-button>
    </div>
    <div class="content">
      <div class="box">
        <editor
          language="html"
          :codes="htmlCode"
          title="HTML"
          @submit="htmlSubmit"
        ></editor>
      </div>
      <div class="box">
        <editor
          language="css"
          :codes="cssCode"
          title="CSS"
          @submit="cssSubmit"
        ></editor>
      </div>
      <div class="box">
        <editor
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
    }
  },
  mounted () {
    // this.monacoJsEditor.dispose();//使用完成销毁实例
  },
  methods: {
    getDatas () {
      
    },
    htmlSubmit (value) {
      console.log(value)
    },
    cssSubmit (value) {
      console.log(value)
    },
    javascriptSubmit (value) {
      console.log(value)
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
