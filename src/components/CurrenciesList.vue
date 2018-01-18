<template>
  <div>
    <div v-for="(currency, index) in filteredCurrencies" :key="currency.id+''+index">
      <currency :currency="currency" />
    </div>
  </div>
</template>

<script>
import Currency from './Currency'
import { mapGetters } from 'vuex'

export default {
  name: 'CurrenciesList',
  components: {
    Currency
  },
  computed: {
    ...mapGetters(['filteredCurrencies'])
  }
}
</script>
