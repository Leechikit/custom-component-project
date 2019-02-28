import { fetch } from './index'

export default {
  save ({ type, codes, controlkey }) {
    return fetch('/save', { type, codes, controlkey })
  },
  getCodes() {
    return fetch('/getCodes')
  }
}