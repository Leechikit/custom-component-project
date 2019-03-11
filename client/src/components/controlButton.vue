<template>
  <div
    class="controlButton"
    @click="clickHandle()"
    :style="{borderStyle: borderStyle}"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'controlButton',
  props: ['borderStyle'],
  data () {
    return {
    }
  },
  methods: {
    clickHandle () {
      this.$emit('click')
    }
  },
}
</script>
<style lang="scss" scoped>
.controlButton {
  width: 100px;
  height: 30px;
  line-height: 30px;
  margin: 5px 0;
  padding: 0 5px 0 10px;
  background-color: #f1f1f1;
  border-radius: 3px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  border-width: 1px;
  border-color: #333;
  cursor: pointer;
  &:hover {
    color: #fff;
    background-color: #409eff;
  }
  &[disabled] {
    color: #fff;
    background-color: #409eff;
    pointer-events: none;
  }
}
</style>
