export default {
  props: {
    placeholder: String,
    value: [String, Number, Array, Date, Object],
    config: {
      type: Object
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  mounted () {
    this.currentValue = this.value
  },
  watch: {
    value () {
      this.currentValue = this.value
      this.$emit('input', this.value)
    }
  },
  methods: {
    handleInput (event) {
      this.$emit('input', event)
    },
    getValue () {
      return this.currentValue
    }
  }
}
