<template>
  <b-container>
    <div v-if="total.value">
      <h1>
        {{ formatNumber(total.value, { style: 'currency', currency: 'EUR' }) }}
        <small>
          ({{ formatNumber(total.performance, { style: 'percent' }) }})
        </small>
      </h1>
      <currencies-sort />
      <currencies-filters />
      <currency-modal
        type='add'
        button-label='Add new currency' />
      <currencies-list />
    </div>
    <div v-else>
      <h1>Welcome to Cryptos</h1>
      <currency-modal
        type='add'
        button-label='Start Your Portfolio' />
    </div>
  </b-container>
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

<style>
body {
  font-family: 'Pontano', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
