import * as customFilters from "./globalFilter"
import Vue from 'vue'


Object.keys(customFilters).forEach(name => {
  Vue.filter(name, customFilters[name])
})