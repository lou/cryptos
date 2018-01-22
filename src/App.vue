<template>
  <div class="full-height">
    <navbar />
    <currencies-list v-if="showList"/>
    <home v-else />
  </div>
</template>

<script>
import CurrenciesList from './components/CurrenciesList'
import Home from './components/Home'
import Navbar from './components/Navbar'

export default {
  name: 'App',
  components: {
    CurrenciesList,
    Home,
    Navbar
  },
  computed: {
    showList () {
      return this.$store.state.showList
    }
  },
  created () {
    this.$store.dispatch('fetchAllCurrencies')
    window.onpopstate = (event) => {
      this.$store.commit('initialiseStore')
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/theme.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/vue-select/scss/vue-select.scss';
@import './assets/css/cryptos.scss';
</style>
