import { fetch } from './index'

export default {
  save ({ type, codes, controlkey }) {
    return fetch('/save', { type, codes, controlkey })
  },
  getCodes() {
    return fetch('/getCodes')
  },
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