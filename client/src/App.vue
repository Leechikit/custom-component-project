<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <form-control
      v-for="control in list"
      :key="control.datafield"
      :field="control.datafield"
      :type="control.controlkey"
      :config="control"
      :value="control.Value"
      @getValue="bindGetValueFn(control.controlListIndex, $event)"
      @setValue="bindSetValueFn(control.controlListIndex, $event)"
      @input="handleInput(control.controlListIndex, $event, control)"
    ></form-control>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import FormControl from '@/components/controls'
import API_LIST from '@/api/list.js'

export default {
  name: 'app',
  components: {
    HelloWorld,
    FormControl
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    setTimeout(() => {
      this.list = API_LIST.list
    }, 0)
  },
  methods: {
    bindGetValueFn () { },
    bindSetValueFn () { },
    handleInput () { }
  },
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
