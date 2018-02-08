import Vue from 'vue'
import App from './App'
import BootstrapVue from 'bootstrap-vue'
import { store } from './store'

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
import rocket from '@fortawesome/fontawesome-free-solid/faRocket'
import beer from '@fortawesome/fontawesome-free-solid/faBeer'

Vue.use(BootstrapVue)

fontawesome.library.add(pencil, trash, osi, privacy, heart, shield, lock, trash, coffee, sync, cog, rocket, beer)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  beforeCreate () {
    this.$store.commit('initialiseStore')
  },
  components: { App },
  template: '<App/>'
})
