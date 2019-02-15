export default {
  list: [{
    controlkey: "FormTextBox",
    "Type": 14,
    "Visible": true,
    "Editable": false,
    "Required": false,
    "Printable": true,
    "Value": "20190213",
    "DisplayName": "单行文本",
    "DataDictItemValue": null,
    "ComputationRuleFields": null,
    "ComputationRule": null,
    "DisplayRuleFields": null,
    "DisplayRule": null,
    "IsUser": null,
    "unitSelectionRange": ""
  }, {
    isCustom: true,
    controlkey: 'FormTest',
    "Type": 14,
    "Visible": true,
    "Editable": false,
    "Required": false,
    "Printable": true,
    "Value": null,
    "DisplayName": "单行文本",
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
    "template": "<div class=\"test-1001\"><input type=\"text\" v-model=\"currentValue\" @blur=\"onBlur()\"></div>",
    "js": `{
      mounted () {
        this.$emit('getValue', this.getValue)
      },
      methods:{
        onBlur() {
          if (this.currentValue !== null && this.currentValue !== void 0) {
            this.setValue(this.currentValue)
          }
        },
        setValue (event) {
          this.$emit('input', event)
        }
      }
    }`,
    "css": ".test-1001{color:red}"
  }]
}