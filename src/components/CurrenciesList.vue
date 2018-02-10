<template>
  <b-container>
    <b-row class='pt-5 pb-5'>
      <b-col cols='12' sm='12' md='8'>
        <h3 class='total'>
          <strong>
            <formatted-number :number="total.value" :options="{ style: 'currency', currency: this.currency }" />
          </strong>
          &middot;
          <small>
            <formatted-number :number="total.performance" :options="{ style: 'percent' }" :htmlOptions="{ colored: true }" />
          </small>
          <b-btn @click="handleRefresh" class='btn btn-outline-primary'>
            <font-awesome-icon icon="sync-alt" :spin="loading" />
          </b-btn>
          &nbsp;
        </h3>
      </b-col>
      <b-col cols='12' sm='12' md='4' class='new-coin'>
        <currency-modal
          type='add'
          button-icon="plus"
          button-label="New coin"
          button-variant='primary' />
      </b-col>
    </b-row>
    <div class='coins-list'>
      <div class='header'>
        <b-row>
          <b-col cols='7' sm='8' md='6' lg='5'>
            <currencies-filters />
          </b-col>
          <b-col cols='5' sm='4' md='6' lg='7' class='text-right'>
            <currencies-sort />
          </b-col>
        </b-row>
      </div>
      <div>
        <currency v-for="currency in filteredCurrencies" :key="currency.id" :coin="currency" />
      </div>
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
