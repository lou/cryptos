<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href='./'>
          <img class='navbar-brand-img' src="../assets/images/telescope.svg" alt="cryptos" width='32' height='32' />
          &nbsp;
          <strong>CRYPTOLOU</strong>
        </b-navbar-brand>
        <b-navbar-nav class='ml-auto' v-if="showList && !locked">>
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
            <b-dropdown-item @click='shareModal'>
              <font-awesome-icon icon="share-square" /> Share
            </b-dropdown-item>
            <b-dropdown-item  @click="setPassword">
              <font-awesome-icon icon="lock" />
              &nbsp;
              {{ lockText }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <b-modal
      id="share-modal"
      ref="dialog"
      v-model="shareModalVisible"
      title="Share your portfolio"
      hide-footer
      class='text-left'>
      <div class='mb-4 mt-3'>
        <span v-if="!shortenedUrl" class='loading'>
          Please wait while we are generating your shortened URL<span>.</span><span>.</span><span>.</span>
        </span>
        <span else>{{ shortenedUrl }}</span>
      </div>
    </b-modal>
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
  data () {
    return {
      shareModalVisible: false
    }
  },
  computed: {
    ...mapGetters(['currency', 'shortenedUrl']),
    showList () {
      return this.$store.state.showList
    },
    locked () {
      return this.$store.state.locked
    },
    availableCurrencies () {
      return _.without(availableCurrencies, this.currency)
    },
    lockText () {
      return _.isEmpty(this.$store.state.password) ? 'Set Password' : 'Change Password'
    }
  },
  methods: {
    shareModal () {
      this.$store.dispatch('shortenUrl')
      this.shareModalVisible = true
    },
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
