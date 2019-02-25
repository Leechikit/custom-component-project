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
    const a = ()=>{console.log('a')}
  `, babelConfig)
  ctx.body = result.code
})

module.exports = router
