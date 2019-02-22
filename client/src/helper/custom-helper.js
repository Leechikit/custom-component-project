/**
* @name: custom-helper
* @description: 自定义组件相关方法
* @author: lizijie
* @update:
*/
import Vue from 'vue'

/**
* 注册异步组件
*
* @param: {String} name 组件名称
* @param: {String} base 基础组件
* @param: {String} mixins 混入组件
*/
export const registerAsyncComponent = ({ name, base, mixins }) => {
  let options = Object.assign({}, base)
  options.mixins = [mixins]
  Vue.component(name, (resolve, reject) => {
    resolve(options)
  })
}

/**
* 加载组件样式
*
* @param: {String} name 组件名称(可选)
* @param: {String} style 样式
*/
export const loadStyle = ({ name, style }) => {
  const styleDom = document.createElement('style')
  // styleDom.innerHTML = name ? `.${name}{${style}}` : style
  styleDom.innerHTML = style
  document.querySelector('head').appendChild(styleDom)
}