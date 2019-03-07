<template>
  <div class="container">
    <div class="sidebar">
      <el-button
        type="primary"
        :disabled="controlkey === 'app'"
        @click="changeControl(appCodes,'app')"
      >表单设置</el-button>
      <p class="title">自定义控件</p>
      <div
        v-for="(control, $index) in controlsCodes"
        :key="$index"
      >
        <el-button
          type="primary"
          :disabled="controlkey === control.controlkey"
          @click="changeControl(control,control.controlkey)"
        >{{control.displayname}}</el-button>
      </div>
      <div>
        <el-popover
          placement="right"
          width="400"
          trigger="click"
          v-model="isPopup"
        >
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item
              label="控件KEY"
              prop="controlkey"
            >
              <el-input
                type="password"
                v-model="ruleForm.controlkey"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="显示名称"
              prop="displayname"
            >
              <el-input
                type="password"
                v-model="ruleForm.displayname"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitForm()"
              >提交</el-button>
            </el-form-item>
          </el-form>
          <el-button
            plain
            icon="el-icon-plus"
            slot="reference"
          >新增控件</el-button>
        </el-popover>
      </div>
    </div>
    <div class="content">
      <el-tabs
        type="card"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item, $index) in editorType"
          :key="$index"
          :label="item.toUpperCase()"
        >
          <editor
            :ref="item"
            :language="item"
            @change="codeChange"
          ></editor>
        </el-tab-pane>
      </el-tabs>
      <div class="save-btn">
        <el-button
          type="primary"
          @click="save"
        >保存</el-button>
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
      controlkey: null,
      appCodes: {},
      controlsCodes: [],
      editorType: ['html', 'css', 'javascript'],
      editorCode: {
        html: '',
        css: '',
        javascript: ''
      },
      currTabIndex: 0,
      isPopup: false,
      ruleForm: {
        controlkey: '',
        displayname: ''
      },
      rules: {}
    }
  },
  computed: {
    currEditorType () {
      return this.editorType[this.currTabIndex]
    }
  },
  async mounted () {
    await this.getData()
    this.$refs[this.currEditorType][0].initEditor()
    this.$refs[this.currEditorType][0].setValue('')
  },
  methods: {
    async getData () {
      const codes = await API_CODE.getCodes()
      this.appCodes = codes.app
      this.controlsCodes = codes.controls
    },
    changeControl (obj, controlkey) {
      this.getData()
      this.controlkey = controlkey
      this.editorCode.html = obj.html || ''
      this.editorCode.css = obj.style || ''
      this.editorCode.javascript = obj.javascript || ''

      this.$refs[this.currEditorType][0].setValue(this.editorCode[this.currEditorType])
    },
    handleClick (tab, event) {
      this.currTabIndex = tab.index
      const editor = this.$refs[this.currEditorType][0]
      setTimeout(() => {
        editor.initEditor()
        editor.setValue(this.editorCode[this.currEditorType])
      }, 0)
    },
    codeChange ({ type, value }) {
      this.editorCode[type] = value
    },
    async save () {
      const result = await API_CODE.save({
        codes: this.editorCode,
        controlkey: this.controlkey === 'app' ? null : this.controlkey
      })
      if (+result.code === 0) {
        this.$message({
          showClose: true,
          message: '保存成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: result.msg || '保存失败',
          type: 'error'
        })
      }
    },
    async submitForm () {
      const result = await API_CODE.add({
        name: this.ruleForm.displayname,
        controlkey: this.ruleForm.controlkey
      })
      if (+result.code === 0) {
        this.getData()
      }
      this.isPopup = false
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
    position: relative;
    flex-grow: 1;
    padding: 0 50px;
    .save-btn {
      position: absolute;
      right: 50px;
      top: 0;
    }
  }
}
</style>
