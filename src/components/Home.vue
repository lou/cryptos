<template>
  <div id='space'>
    <b-container class='full-height text-center pt-5'>
      <div id='moon'></div>
      <div id='jupiter'></div>
      <div id='astronaut'></div>
      <div id='rocket'></div>
      <div id='space-station'></div>
      <div id='saturn'></div>
      <div id='planet-earth'></div>
      <div id='space-title'>
        <h1 class='pt-5'>Welcome to Cryptos</h1>
        <div class='pt-3'>
          <currency-modal
            type='add'
            button-label='Start Your Portfolio'
            button-variant="primary"
            button-size="lg" />
        </div>
        <div>
          SIMPLE / SECURE / NO REGISTRATION NEEDED / PRIVACY FIRST / FREE / OPEN-SOURCE

          <font-awesome-icon icon="coffee" />SIMPLE
          NO REGISTRATION NEEDED
          1500+ cryptos currencies
          I18n (en-US, en-GB, fr-FR, es-ES)

          <font-awesome-icon icon="shield-alt" />SECURE
          Cryptolou does not store your portfolio on any database. Period.
          Everything is stored in the URL and computed on the client side.
          So as long as you do not share your portfolio URL no one can access it.
          And if you are paranoid (like me) you have the possibility to secure your portfolio with a password.

          <font-awesome-icon icon="user-secret" />PRIVACY
          We can't access your data so we can't sell it.
          We do not use any cookies or any third party to track your behaviour on Cryptolou.com.

          <font-awesome-icon :icon="['fab', 'osi']" />OPEN-SOURCE
          The entire codebase of Cryptolou is open-source and freely accessible at https://github.com/lou/cryptos
          Feel free to submit code if you are a developer.
          You can also report any bug or request a feature at https://github.com/lou/cryptos/issues

          <font-awesome-icon icon="heart" />FREE
          Cryptolou is and will always be completely free of charge and is also 100% ad-free.
          We are a verified publisher on Brave/BAT so if you want to help me just visit on the Brave browser.
          And you can always buy me a beer by sending few ETH at XRETEQRWETYRUTYI
        </div>
        <div>
          UNDER THE HOOD
          coinmarketcap API to fetch coins prices
          BCRYPT for secure password
          LZ-based compression algorithm to fit data in the URL
          Vue.js
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import CurrencyModal from './CurrencyModal'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: 'Home',
  components: {
    CurrencyModal,
    FontAwesomeIcon
  }
}
</script>
