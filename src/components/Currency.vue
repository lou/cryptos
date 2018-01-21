<template>
  <div>
    <h3>
      <img :src="`https://files.coinmarketcap.com/static/img/coins/32x32/${currency.key}.png`" height="24" width="24" />
      {{ currency.coinmarketcap.name }}
      {{ formatNumber(price(currency), { style: 'currency', currency: 'EUR' }) }}
    </h3>
    <div>
      quantity: {{ formatNumber(parseFloat(currency.quantity)) }}
    </div>
    <div>
      cost: {{ formatNumber(parseFloat(currency.cost), { style: 'currency', currency: 'EUR' }) }}
      <small>({{ formatNumber(distribution(currency), { style: 'percent' }) }})</small>
    </div>
    <div>
      value: {{ formatNumber(value(currency), { style: 'currency', currency: 'EUR' }) }}
      <small>({{ formatNumber(performance(currency), { style: 'percent' }) }})</small>
    </div>
    <div v-if="tags(currency)">tags: {{ tags(currency) }}</div>
    <div v-if="info(currency)">info: {{ info(currency) }}</div>
    <b-button variant="outline-danger" size='sm' @click="removeCurrency(currency)">
      <icon name="trash"></icon>
    </b-button>
    <currency-modal type='update' :currency="currency" />
  </div>
</template>

<script>
import CurrencyModal from './CurrencyModal'
import { Numbers } from '../mixins/Numbers'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Currency',
  props: ['currency'],
  mixins: [Numbers],
  components: {
    CurrencyModal
  },
  computed: {
    ...mapGetters(['total'])
  },
  methods: {
    price (currency) {
      return parseFloat(currency.coinmarketcap.price_eur)
    },
    tags (currency) {
      if (!_.isEmpty(currency.tags)) {
        return currency.tags.join(', ')
      }
    },
    info (currency) {
      if (!_.isEmpty(currency.info)) {
        return currency.info
      }
    },
    value (currency) {
      return parseFloat(currency.coinmarketcap.price_eur) * parseFloat(currency.quantity)
    },
    performance (currency) {
      return (this.value(currency) - parseFloat(currency.cost)) / parseFloat(currency.cost)
    },
    distribution (currency) {
      return parseFloat(currency.cost) / this.total.cost
    },
    removeCurrency (currency) {
      this.$store.commit('removeCurrency', currency)
    }
  }
}
</script>
