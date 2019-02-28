const router = require('koa-router')()
const babel = require("babel-core")
const _ = require('lodash')
const babelConfig = {
  "presets": [
    "env"
  ]
}
let list = {
  app: {
    html: `
  <div class="banner">这是一个测试</div>
  <FormTextBox></FormTextBox>
  <FormMoney></FormMoney>`,
    style: `
  .banner{
    background: #3396fb;
    color: white;
    padding: 30px 20px 40px 20px;
    font-size: 30px;
  }`,
    javascript: "console.log('123')"
  },
  controls: [{
    controlkey: "FormMoney",
    displayname: "货币控件",
    html: `
  <div
    class="FormMoney"
    :class="['mint-cell mint-field', {'is-required': config.Required}]">
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
        <div class="mint-cell-text">{{config.displayname}}</div>
      </div>
      <div :class="['mint-cell-value', {'is-readonly': !config.Editable}]">
      <input v-model="currentValue" ref="control" @blur="onBlur()" @focus="onFocus()" :placeholder="config.placeholder || '请输入金额'"/>
      </div>
    </div>
  </div>`,
    style: `
  .FormMoney input{
    border: none;
  }`,
    javascript: `
  function func(){
    return {
      mounted () {
        if(this.currentValue) {
          this.setValue(this.currentValue)
        }
        this.$emit('getValue', this.getValue)
      },
      methods:{
        onBlur () {
          if (this.currentValue !== null && this.currentValue !== void 0) {
            this.setValue(this.currentValue)
          }
        },
        onFocus () {
          let $input = this.$refs.control
          if ($input && this.currentValue !== null && this.currentValue !== void 0) {
            $input.value = this.currentValue
          }
        },
        setValue (value) {
          let formatedNumber = '￥' + this.currentValue
          this.$nextTick(() => {
            let $input = this.$refs.control
            if ($input) {
              $input.value = formatedNumber
              this.$emit('input', this.currentValue)
            }
          })
        }
      }
    }
  }`
  }]
}

let store = {
  RuntimeContent: `
    <div class="banner">这是一个测试</div>
    <FormTextBox></FormTextBox>
    <FormMoney></FormMoney>
  `,
  javascript: "console.log('123')",
  style: `
    .banner{
      background: #3396fb;
      color: white;
      padding: 30px 20px 40px 20px;
      font-size: 30px;
    }
  `,
  list: [{
    controlkey: "FormTextBox",
    "datafield": "F000001",
    "Type": 14,
    "Visible": true,
    "Editable": true,
    "Required": false,
    "Printable": true,
    "Value": "sdf",
    "DisplayName": "单行文本",
    "DataDictItemValue": null,
    "ComputationRuleFields": null,
    "ComputationRule": null,
    "DisplayRuleFields": null,
    "DisplayRule": null,
    "IsUser": null,
    "unitSelectionRange": "",
    "displayname": "单行文本",
  }, {
    isCustom: true,
    controlkey: 'FormMoney',
    "Type": 14,
    "Visible": true,
    "Editable": true,
    "Required": false,
    "Printable": true,
    "Value": null,
    "DisplayName": "单行文本",
    "displayname": "金额",
    "DataDictItemValue": null,
    "ComputationRuleFields": [
      "F0000002",
      "F0000004"
    ],
    "ComputationRule": "{F0000002}*{F0000004}",
    "DisplayRuleFields": null,
    "DisplayRule": null,
    "IsUser": null,
    "unitSelectionRange": "",
    "datafield": "F0000100",
    "customDatas": {
      "template": `
        <div
          class="FormMoney"
          :class="['mint-cell mint-field', {'is-required': config.Required}]">
          <div class="mint-cell-wrapper">
            <div class="mint-cell-title">
              <div class="mint-cell-text">{{config.displayname}}</div>
            </div>
            <div :class="['mint-cell-value', {'is-readonly': !config.Editable}]">
            <input v-model="currentValue" ref="control" @blur="onBlur()" @focus="onFocus()" :placeholder="config.placeholder || '请输入金额'"/>
            </div>
          </div>
        </div>
      `,
      "javascript": `
      'use strict';
      function func() {
        return {
          mounted: function mounted() {
            if (this.currentValue) {
              this.setValue(this.currentValue);
            }
            this.$emit('getValue', this.getValue);
          },
      
          methods: {
            onBlur: function onBlur() {
              if (this.currentValue !== null && this.currentValue !== void 0) {
                this.setValue(this.currentValue);
              }
            },
            onFocus: function onFocus() {
              var $input = this.$refs.control;
              if ($input && this.currentValue !== null && this.currentValue !== void 0) {
                $input.value = this.currentValue;
              }
            },
            setValue: function setValue(value) {
              var _this = this;
      
              var formatedNumber = '￥' + this.currentValue;
              this.$nextTick(function () {
                var $input = _this.$refs.control;
                if ($input) {
                  $input.value = formatedNumber;
                  _this.$emit('input', _this.currentValue);
                }
              });
            }
          }
        };
      }`,
      "style": `
        .FormMoney input{
          border: none;
        }
      `
    }
  }]
}


router.prefix('/custom')

router.post('/save', async (ctx, next) => {
  const type = ctx.request.body.type
  const codes = ctx.request.body.codes
  const controlkey = ctx.request.body.controlkey
  if (type && codes) {
    let result = {
      code: 0,
      result: ''
    }
    let options
    if(controlkey) {
      options = _.find(list.controls, {controlkey})
    }else {
      options = list.app
    }
    if (type === 'javascript') {
      options.javascript = codes
      const obj = babel.transform(codes, babelConfig)
      result.code = obj.code
    } else if(type === 'css'){
      options.style = codes
      result.code = codes
    } else if(type === 'html'){
      options.html = codes
      result.code = codes
    }
    ctx.response.body = result
  } else {
    ctx.response.body = { code: -1, msg: '缺少参数' }
  }
})

router.post('/getCodes', async (ctx, next) => {

  ctx.response.body = list
})

module.exports = router
