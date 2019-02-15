<template>
  <mt-field
    type="textarea"
    rows="1"
    :class="[{'is-required': config.Required}]"
    :label="config.displayname"
    v-model="currentValue"
    :readonly="!config.Editable"
    :disableClear="!config.Editable"
    :placeholder="config.placeholder || '请输入单行文本'"
    @input="handleInput"></mt-field>
</template>

<script>
import base from './mixins/base'

export default {
  props: {
    config: {
      type: Object
    }
  },
  name: 'FormTextBox',
  mixins: [base],
  mounted () {
    this.$emit('getValue', this.getValue)
  },
  methods: {

  }
}
</script>
