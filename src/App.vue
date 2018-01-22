<template>
  <div class="full-height">
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href="#">
          <img class='navbar-brand-img' src="./assets/rocket.svg" alt="cryptos" width='32' height='32' />
          &nbsp;
          Cryptos
        </b-navbar-brand>
        <currency-modal
          type='add'
          button-label='Add new currency'
          button-variant='outline-info'
          button-size='sm' />
      </b-container>
    </b-navbar>
    <b-container  v-if="total.value">
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
    </b-container>
    <div v-else id='space'>
      <b-container class='full-height text-center pt-5'>
        <div id='moon'></div>
        <div id='jupiter'></div>
        <div id='astronaut'></div>
        <div id='rocket'></div>
        <div id='space-station'></div>
        <div id='saturn'></div>
        <div id='planet-earth'></div>
        <div id='space-title'>
          <h1 class='pt-5'>Welcome to Cryptos</h1>
          <div class='pt-3'>
            <currency-modal
              type='add'
              button-label='Start Your Portfolio'
              button-variant="primary"
              button-size="lg" />
          </div>
        </div>
      </b-container>
    </div>
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
