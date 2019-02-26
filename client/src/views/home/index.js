import FormControl from '@/components/controls'

export default {
  components: {
    FormControl
  },
  props: ['plist'],
  data () {
    return {
      list: this.plist
    }
  },
  mounted () {
    console.log('1111')
  },
  methods: {
    bindGetValueFn (index, event) {
      this.list[index]['getValue'] = event
    },
    handleInput (index, event, control) {
      this.list[index]['Value'] = event
    },
    submit () {
      let result = {}
      this.list.forEach(item => {
        result[item.datafield] = item.getValue()
      })
      console.log(result)
    }
  },
}