<template>
  <div class='currency'>
    <b-row v-b-toggle="currency.id.toString()" class='pb-3 pt-3 currency-header'>
      <b-col cols='7'>
        <b-media vertical-align="center" >
          <b-img slot="aside" :src="`https://files.coinmarketcap.com/static/img/coins/32x32/${currency.key}.png`" height="32" width="32" />
          <strong>
            {{ currency.coinmarketcap.name }}
          </strong>
          <div>
            <formatted-number :number="currency.coinmarketcap.price_eur" :options="{ style: 'currency', currency: 'EUR' }" />
            &middot;
            <formatted-number :number="currency.coinmarketcap.percent_change_24h / 100" :options="{ style: 'percent' }" :htmlOptions="{ colored: true }" />
          </div>
        </b-media>
      </b-col>
      <b-col cols='5' class='text-right'>
        <strong>
          <formatted-number :number="value(currency)" :options="{ style: 'currency', currency: 'EUR' }" />
        </strong>
        <div>
          <formatted-number :number="performance(currency)" :options="{ style: 'percent' }" :htmlOptions="{ colored: true }" />
        </div>
      </b-col>
    </b-row>
    <b-collapse :id="currency.id.toString()" class='currency-more'>
      <b-row class='pb-3'>
        <b-col cols='8'>
          <div>
            <span class='text-muted'>quantity:</span>
            <formatted-number :number="currency.quantity" />
          </div>
          <div>
            <span class='text-muted'>cost:</span>
            <formatted-number :number="currency.cost" :options="{ style: 'currency', currency: 'EUR' }" />
            <small>(<formatted-number :number="distribution(currency)" :options="{ style: 'percent' }" />)</small>
          </div>
          <div v-if="tags(currency)"><span class='text-muted'>tags:</span> {{ tags(currency) }}</div>
          <div v-if="info(currency)"><span class='text-muted'>info:</span> {{ info(currency) }}</div>
        </b-col>
        <b-col cols='4' class='text-right'>
          <b-button variant="outline-danger" size='sm' @click="removeCurrency(currency)">
            <icon name="trash"></icon>
          </b-button>
          <currency-modal type='update' :currency="currency" button-variant='outline-primary' button-icon='pencil' button-size='sm' />
        </b-col>
      </b-row>
    </b-collapse>
  </div>
</template>

<script>
import CurrencyModal from './CurrencyModal'
import FormattedNumber from './FormattedNumber'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'Currency',
  props: ['currency'],
  components: {
    CurrencyModal,
    FormattedNumber
  },
  computed: {
    ...mapGetters(['total'])
  },
  methods: {
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
