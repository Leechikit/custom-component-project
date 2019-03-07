import { fetch } from './index'

export default {
  save ({ type, codes, controlkey }) {
    return fetch('/save', { type, codes, controlkey })
  },
  add ({ name, controlkey }) {
    return fetch('/add', { name, controlkey })
  },
  getCodes () {
    return fetch('/getCodes')
  }
}