<template>
  <b-container>
    <h3 class='pt-5 pb-4 text-center'>
      <formatted-number :number="total.value" :options="{ style: 'currency', currency: this.currency }" />
      &middot;
      <formatted-number :number="total.performance" :options="{ style: 'percent' }" :htmlOptions="{ colored: true }" />
      <b-btn @click="handleRefresh" class='btn btn-outline-primary'>
        <font-awesome-icon icon="sync-alt" :spin="loading" />
      </b-btn>
      &nbsp;
    </h3>
    <div class='text-center mb-5'>
      <currency-modal
        type='add'
        button-label="New coin"
        button-variant='primary' />
    </div>
    <b-row class='pt-4'>
      <b-col cols='7' sm='8' md='6' lg='5'>
        <currencies-filters />
      </b-col>
      <b-col cols='5' sm='4' md='6' lg='7' class='text-right'>
        <currencies-sort />
      </b-col>
    </b-row>
    <div class='mt-3'>
      <currency v-for="currency in filteredCurrencies" :key="currency.id" :coin="currency" />
    </div>
  </b-container>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import Currency from './Currency'
import CurrenciesSort from './CurrenciesSort'
import CurrenciesFilters from './CurrenciesFilters'
import FormattedNumber from './FormattedNumber'
import CurrencyModal from './CurrencyModal'
import { mapGetters } from 'vuex'

export default {
  name: 'CurrenciesList',
  components: {
    Currency,
    CurrenciesSort,
    CurrenciesFilters,
    FormattedNumber,
    CurrencyModal,
    FontAwesomeIcon
  },
  mounted () {
    this.interval = setInterval(() => {
      this.now = new Date().getTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.interval)
  },
  data () {
    return {
      now: new Date().getTime()
    }
  },
  computed: {
    ...mapGetters(['filteredCurrencies', 'total', 'currency']),
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    handleRefresh () {
      this.$store.dispatch('fetchCurrencies')
    }
  }
}
</script>
