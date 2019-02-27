export default {
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
      }`
  }]
}