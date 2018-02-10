<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href='/'>
          <img class='navbar-brand-img' src="../assets/images/telescope.svg" alt="cryptos" width='32' height='32' />
          &nbsp;
          <strong>CRYPTOLOU</strong>
        </b-navbar-brand>
        <b-navbar-nav class='ml-auto' v-if="showList">>
          <b-nav-item-dropdown no-caret right>
            <template slot="button-content">
              {{ getSymbolFromCurrency(currency) }}
              {{ currency }}
            </template>
            <b-dropdown-item v-for="currency in availableCurrencies" :key="currency" @click="setCurrency(currency)">
              {{ getSymbolFromCurrency(currency) }}
              <span class='text-muted'>&middot;&nbsp;{{ currency }}</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
          &nbsp;
          <b-nav-item-dropdown no-caret right>
            <template slot="button-content">
              <font-awesome-icon icon="cog" transform="grow-2" />
            </template>
            <b-dropdown-item  @click="setPassword">
              <font-awesome-icon icon="lock" />
              &nbsp;
              {{ lockText }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import getSymbolFromCurrency from 'currency-symbol-map'
import { availableCurrencies } from '../store'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: { FontAwesomeIcon },
  computed: {
    ...mapGetters(['currency']),
    showList () {
      return this.$store.state.showList
    },
    availableCurrencies () {
      return _.without(availableCurrencies, this.currency)
    },
    locked () {
      return this.$store.state.locked
    },
    lockText () {
      return _.isEmpty(this.$store.state.password) ? 'Set Password' : 'Change Password'
    }
  },
  methods: {
    getSymbolFromCurrency (currency) {
      return getSymbolFromCurrency(currency)
    },
    setCurrency (currency) {
      this.$store.commit('setCurrency', currency)
      this.$store.dispatch('fetchCurrencies')
    },
    setPassword () {
      this.$store.commit('setUpdatingPassword', true)
    }
  }
}
</script>
