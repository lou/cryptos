<template>
  <div class="full-height">
    <navbar />
    <div v-if="showList">
      <password-form v-if="needPassword" />
      <currencies-list v-else />
    </div>
    <home v-else />
  </div>
</template>

<script>
import CurrenciesList from './components/CurrenciesList'
import Home from './components/Home'
import Navbar from './components/Navbar'
import PasswordForm from './components/PasswordForm'

export default {
  name: 'App',
  components: {
    CurrenciesList,
    Home,
    Navbar,
    PasswordForm
  },
  computed: {
    showList () {
      return this.$store.state.showList
    },
    needPassword () {
      return this.$store.state.locked || this.$store.state.updatingPassword
    }
  },
  created () {
    this.$store.dispatch('fetchAllCurrencies')
    setInterval(() => {
      this.$store.dispatch('fetchCurrencies')
    }, 59000)
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
