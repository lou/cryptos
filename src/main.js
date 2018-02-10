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
import cogs from '@fortawesome/fontawesome-free-solid/faCogs'
import rocket from '@fortawesome/fontawesome-free-solid/faSpaceShuttle'
import beer from '@fortawesome/fontawesome-free-solid/faBeer'
import plus from '@fortawesome/fontawesome-free-solid/faPlus'

Vue.use(BootstrapVue)

fontawesome.library.add(pencil, trash, osi, privacy, heart, shield, lock, trash, coffee, sync, cog, rocket, beer, plus, cogs)

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
