<template>
  <div class='mt-3'>
    <currency v-for="currency in filteredCurrencies" :key="currency.id" :currency="currency" />
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
