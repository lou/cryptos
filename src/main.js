import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import { store } from './store'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import messages from './locales'

Vue.component('icon', Icon)

Vue.use(BootstrapVue)
Vue.use(VueI18n)

Vue.config.productionTip = false

const i18n = new VueI18n({
  fallbackLocale: 'en',
  messages
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  store,
  beforeCreate () {
    this.$store.commit('initialiseStore', { i18n })
  },
  components: { App },
  template: '<App/>'
})
