<template>
  <div class="editor">
    <div ref="container"></div>
  </div>
</template>
<script>
import * as monaco from 'monaco-editor'

export default {
  name: 'editor',
  props: {
    codes: {
      type: String,
      default () {
        return ''
      }
    },
    language: {
      type: String,
      default () {
        return 'html'
      }
    }
  },
  data () {
    return {
      monacoEditor: null,
      editorOptions: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,        // 只读
        cursorStyle: 'line',        //光标样式
        automaticLayout: false, //自动布局
        glyphMargin: true,  //字形边缘
        useTabStops: false,
        fontSize: 28,       //字体大小
        autoIndent: true, //自动布局
        //quickSuggestionsDelay: 500,   //代码提示延时
      },
      theme: "vs-dark", //vs, hc-black, or vs-dark
      codesCopy: null, //内容备份
    }
  },
  mounted () {
    // this.initEditor()
  },
  destroyed () {
    this.monacoEditor.dispose()
  },
  methods: {
    initEditor () {
      this.$refs.container.innerHTML = ''
      this.monacoEditor = monaco.editor.create(this.$refs.container, {
        value: this.codesCopy || this.codes,
        language: this.language,
        theme: this.theme,
        editorOptions: this.editorOptions,
      })
      //编辑器内容changge事件
      this.monacoEditor.onDidChangeModelContent(event => {
        if (this.codesCopy !== this.monacoEditor.getValue()) {
          this.codesCopy = this.monacoEditor.getValue()
          this.$emit('change', {
            type: this.language,
            value: this.monacoEditor.getValue()
          })
        }
      })
      //编辑器随窗口自适应
      window.addEventListener('resize', () => {
        this.initEditor();
      })
    },
    setValue (value) {
      this.monacoEditor.setValue(value)
    }
  },
}
</script>
<style lang="scss" scoped>
.editor {
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 32px;
    flex-grow: 0;
    padding-left: 20px;
    background-color: rgba(#3396fb, 0.1);
  }
  div {
    flex-grow: 1;
  }
}
</style>
