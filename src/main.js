import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import VueI18n from 'vue-i18n'
import { store } from './store'
import messages from './locales'

import fontawesome from '@fortawesome/fontawesome'

import osi from '@fortawesome/fontawesome-free-brands/faOsi'
import pencil from '@fortawesome/fontawesome-free-solid/faPencilAlt'
import trash from '@fortawesome/fontawesome-free-solid/faTrashAlt'
import heart from '@fortawesome/fontawesome-free-solid/faHeart'
import shield from '@fortawesome/fontawesome-free-solid/faShieldAlt'
import privacy from '@fortawesome/fontawesome-free-solid/faUserSecret'
import lock from '@fortawesome/fontawesome-free-solid/faLock'
import coffee from '@fortawesome/fontawesome-free-solid/faCoffee'
import sync from '@fortawesome/fontawesome-free-solid/faSyncAlt'
import cog from '@fortawesome/fontawesome-free-solid/faCog'

Vue.use(BootstrapVue)
Vue.use(VueI18n)

fontawesome.library.add(pencil, trash, osi, privacy, heart, shield, lock, trash, coffee, sync, cog)

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
