<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href="#">
          <img class='navbar-brand-img' src="./assets/rocket.svg" alt="cryptos" width='32' height='32' />
          &nbsp;
          Cryptos
        </b-navbar-brand>
        <currency-modal
          type='add'
          button-label='Add new currency' />
      </b-container>
    </b-navbar>
    <b-container>
      <div v-if="total.value">
        <h3 class='mt-4 mb-5 text-center'>
          {{ formatNumber(total.value, { style: 'currency', currency: 'EUR' }) }}
          <small>
            ({{ formatNumber(total.performance, { style: 'percent' }) }})
          </small>
        </h3>
        <b-row>
          <b-col cols='7' sm='8' md='6' lg='5'>
            <currencies-filters />
          </b-col>
          <b-col cols='5' sm='4' md='6' lg='7' class='text-right'>
            <currencies-sort />
          </b-col>
        </b-row>
        <currencies-list />
      </div>
      <div v-else>
        <h1>Welcome to Cryptos</h1>
        <currency-modal
          type='add'
          button-label='Start Your Portfolio' />
      </div>
    </b-container>
  </div>
</template>

<script>
import CurrenciesList from './components/CurrenciesList'
import CurrenciesSort from './components/CurrenciesSort'
import CurrenciesFilters from './components/CurrenciesFilters'
import CurrencyModal from './components/CurrencyModal'
import { Numbers } from './mixins/Numbers'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  mixins: [Numbers],
  components: {
    CurrencyModal,
    CurrenciesList,
    CurrenciesSort,
    CurrenciesFilters
  },
  computed: {
    ...mapGetters(['total'])
  },
  created () {
    this.$store.dispatch('fetchAllCurrencies')
  }
}
</script>

<style lang="scss">
@import './assets/css/theme.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/vue-select/scss/vue-select.scss';
@import './assets/css/cryptos.scss';
</style>
