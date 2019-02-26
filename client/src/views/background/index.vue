<template>
  <div class="container">
    <div class="sidebar">
      <div class="button">表单设置</div>
      <p class="title">自定义控件</p>
      <div class="button">货币控件</div>
    </div>
    <div class="content">
      <div class="editor">
        <div class="title">
          <span class="mark">HTML</span>
          <div class="button">提交</div>
        </div>
        <div id="html"></div>
      </div>
      <div class="editor">
        <div class="title">
          <span class="mark">SCSS</span>
          <div class="button">提交</div>
        </div>
        <div id="scss"></div>
      </div>
      <div class="editor">
        <div class="title">
          <span class="mark">JAVASCRIPT</span>
          <div class="button">提交</div>
        </div>
        <div
          id="javascript"
          ref="javascript"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor'
export default {
  name: 'background',
  data () {
    return {
      monacoEditor: null
    }
  },
  mounted () {
    this.monacoEditor = monaco.editor.create(this.$refs.javascript, {
      value: `console.log("hello,world")`,
      language: "javascript",
      theme: "vs-dark",
      editorOptions: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,        // 只读
        cursorStyle: 'line',        //光标样式
        automaticLayout: false, //自动布局
        glyphMargin: true,  //字形边缘
        useTabStops: false,
        fontSize: 28,       //字体大小
        autoIndent: true,//自动布局
        //quickSuggestionsDelay: 500,   //代码提示延时
      }
    })
    this.monacoEditor.onDidChangeModelContent((event) => {
      const newValue = this.monacoEditor.getValue();
      console.log(newValue)
    })
    // monacoInstance.dispose();//使用完成销毁实例
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
    .button {
      width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: #fff;
      background-color: #3396fb;
      border-radius: 4px;
      cursor: pointer;
    }
    .title {
      margin: 10px 0;
    }
  }
  .content {
    flex-grow: 1;
    display: flex;
    .editor {
      flex-basis: 0%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      margin: 0 5px;
      border-right: 1px solid #aaa;
      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 30px;
        flex-grow: 0;
        padding-left: 20px;
        background-color: rgba(#3396fb, 0.1);
        .button {
          flex-grow: 0;
          width: 80px;
          height: 30px;
          background-color: #3396fb;
          text-align: center;
          line-height: 30px;
          color: #fff;
          cursor: pointer;
        }
      }
      div {
        flex-grow: 1;
      }
    }
  }
}
</style>
