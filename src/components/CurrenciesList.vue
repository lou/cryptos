<template>
  <b-container>
    <h3 class='mt-4 mb-5 text-center'>
      <formatted-number :number="total.value" :options="{ style: 'currency', currency: 'EUR' }" />
      &middot;
      <formatted-number :number="total.performance" :options="{ style: 'percent' }" :htmlOptions="{ colored: true }" />
      <b-btn id="refresh-button" @click="handleRefresh" class='btn btn-outline-primary'>
        <icon name="refresh" :spin="loading"></icon>
      </b-btn>
      <b-tooltip target="refresh-button" placement="top">
        {{updatedAt}}
      </b-tooltip>
    </h3>
    <b-row>
      <b-col cols='7' sm='8' md='6' lg='5'>
        <currencies-filters />
      </b-col>
      <b-col cols='5' sm='4' md='6' lg='7' class='text-right'>
        <currencies-sort />
      </b-col>
    </b-row>
    <div class='mt-3'>
      <currency v-for="currency in filteredCurrencies" :key="currency.id" :currency="currency" />
    </div>
  </b-container>
</template>

<script>
import Currency from './Currency'
import CurrenciesSort from './CurrenciesSort'
import CurrenciesFilters from './CurrenciesFilters'
import FormattedNumber from './FormattedNumber'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  name: 'CurrenciesList',
  components: {
    Currency,
    CurrenciesSort,
    CurrenciesFilters,
    FormattedNumber
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
    ...mapGetters(['filteredCurrencies', 'total']),
    loading () {
      return this.$store.state.loading
    },
    updatedAt () {
      moment.relativeTimeThreshold('ss', 0)
      return `Updated ${moment(moment(this.now).diff(this.$store.state.updatedAt)).format('s')} seconds ago`
    }
  },
  methods: {
    handleRefresh () {
      this.$store.dispatch('fetchCurrencies')
    }
  }
}
</script>
