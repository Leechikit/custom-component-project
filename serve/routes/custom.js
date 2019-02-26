const router = require('koa-router')()
const babel = require("babel-core")
const babelConfig = {
  "presets": [
    "env"
  ]
}
router.prefix('/custom')

router.get('/', function (ctx, next) {
  const result = babel.transform(`
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
  }
  `, babelConfig)
  ctx.body = result.code
})

module.exports = router
