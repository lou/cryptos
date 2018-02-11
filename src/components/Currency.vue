<template>
  <div class='currency'>
    <b-row v-b-toggle="coin.id.toString()" class='pb-3 pt-3 currency-header'>
      <b-col cols='7'>
        <b-media vertical-align="center first-col" >
          <b-img slot="aside" :src="`https://files.coinmarketcap.com/static/img/coins/32x32/${coin.key}.png`" height="32" width="32" />
          <strong>
            {{ coin.coinmarketcap.name }}
          </strong>
          <div>
            <formatted-number
              :number="price(coin)"
              :options="{ style: 'currency', currency: this.currency }" />
            &middot;
            <formatted-number
              :number="coin.coinmarketcap.percent_change_24h / 100"
              :options="{ style: 'percent' }"
              :htmlOptions="{ colored: true }" />
          </div>
        </b-media>
      </b-col>
      <b-col cols='5' class='text-right'>
        <div class='last-col'>
          <strong>
            <formatted-number
              :number="value(coin)"
              :options="{ style: 'currency', currency: this.currency }" />
          </strong>
          <div>
            <formatted-number
              :number="performance(coin)"
              :options="{ style: 'percent' }"
              :htmlOptions="{ colored: true }" />
          </div>
        </div>
      </b-col>
    </b-row>
    <b-collapse :id="coin.id.toString()" class='currency-more'>
      <b-row class='pb-3'>
        <b-col cols='8'>
          <div class='first-col'>
            <div>
              <span class='text-muted'>Quantity:</span>
              <formatted-number :number="coin.quantity" />
            </div>
            <div>
              <span class='text-muted'>Cost:</span>
              <formatted-number
                :number="coin.cost"
                :options="{ style: 'currency', currency: this.currency }" />
              <small>(<formatted-number :number="distribution(coin)" :options="{ style: 'percent' }" />)</small>
            </div>
            <div v-if="tags(coin)"><span class='text-muted'>Tags:</span> {{ tags(coin) }}</div>
            <div v-if="info(coin)">
              <span class='text-muted'>Info:</span>
              <div v-html="info(coin)"></div>
            </div>
          </div>
        </b-col>
        <b-col cols='4' class='text-right'>
          <div class='last-col'>
          <b-button variant="outline-danger" size='sm' @click="removeCurrency(coin)">
            <font-awesome-icon icon="trash-alt" />
          </b-button>
          <currency-modal type='update' :currency="coin" button-variant='outline-primary' button-icon='pencil-alt' button-size='sm' />
        </div>
        </b-col>
      </b-row>
    </b-collapse>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import CurrencyModal from './CurrencyModal'
import FormattedNumber from './FormattedNumber'
import { mapGetters } from 'vuex'
import _ from 'lodash'
import autoLink from 'autolink-js'

export default {
  name: 'Currency',
  props: ['coin'],
  components: {
    CurrencyModal,
    FormattedNumber,
    FontAwesomeIcon
  },
  computed: {
    ...mapGetters(['total', 'currency'])
  },
  methods: {
    simpleFormat (str) {
      str = str.replace(/<(?:.|\n)*?>/gm, '')
      str = str.replace(/\r\n?/, '\n')
      str = str.trim()
      if (str.length > 0) {
        str = str.replace(/\n\n+/g, '</p><p>')
        str = str.replace(/\n/g, '<br />')
        str = '<p>' + str + '</p>'
      }
      return str
    },
    tags (coin) {
      if (!_.isEmpty(coin.tags)) {
        return coin.tags.join(', ')
      }
    },
    price (coin) {
      return coin.coinmarketcap[`price_${this.currency.toLowerCase()}`]
    },
    info (coin) {
      if (!_.isEmpty(coin.info)) {
        return this.simpleFormat(coin.info).autoLink({ target: '_blank', rel: 'nofollow' })
      }
    },
    value (coin) {
      return parseFloat(coin.coinmarketcap[`price_${this.currency.toLowerCase()}`]) * parseFloat(coin.quantity)
    },
    performance (coin) {
      return (this.value(coin) - parseFloat(coin.cost)) / parseFloat(coin.cost)
    },
    distribution (coin) {
      return parseFloat(coin.cost) / this.total.cost
    },
    removeCurrency (coin) {
      this.$store.commit('removeCurrency', coin)
    }
  }
}
</script>
