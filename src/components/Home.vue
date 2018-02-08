<template>
  <div>
    <div class='pattern'>
      <div class='container text-center pt-5 pb-5'>
        <div class='title'>
          <h1 class='pt-5'>Welcome to CRYPTOLOU</h1>
          <h2 class='pt-2'>The simpliest and most secure way to track your cryptocurrencies</h2>
        </div>
        <div class='pt-5 pb-2'>
          <currency-modal
            type='add'
            button-label='Start Your Portfolio'
            button-icon="rocket"
            button-variant="info"
            button-size="lg" />
        </div>
        <p class='pb-5'>
          No registration needed and 100% free
        </p>
      </div>
    </div>

    <b-container class="text-center explanation p-5">
      <b-row>
        <b-col md="4" sm='6' xs="12">
          <div class='explanation-item'>
            <font-awesome-icon icon="coffee" size="3x" />
            <h3>SIMPLE</h3>
            <p>
              There is no registration, just start your portfolio.
              <br />
              We handle 1500+ cryptocurrencies.
              <br />
              View your portfolio in almost any major Fiat Currency including USD, CNY, EUR, GBP, AUD, CAD, SEK, BRL, and many more
            </p>
          </div>
        </b-col>
        <b-col md="4" sm='6' xs="12">
          <div class='explanation-item'>
            <font-awesome-icon icon="shield-alt" size="3x" />
            <h3>SECURE</h3>
            <p>
              Cryptolou does not store your portfolio on any database.
              <br />
              Everything is stored in the URL and computed on the client side.
              So as long as you do not share your portfolio URL no one can access it.
              And if you are paranoid you have the possibility to secure your portfolio with a password.
            </p>
          </div>
        </b-col>
        <b-col md="4" sm='6' xs="12">
          <div class='explanation-item'>
            <font-awesome-icon icon="user-secret" size="3x" />
            <h3>PRIVACY MATTERS</h3>
            <p>
              We can't access your data so we can't sell it.
              <br />
              Moreover we do not use any cookies or any third party to track your behaviour on Cryptolou.com.
            </p>
          </div>
        </b-col>
        <b-col md="4" sm='6' xs="12">
          <div class='explanation-item'>
            <font-awesome-icon icon="heart" size="3x" />
            <h3>FREE</h3>
            <p>
              Cryptolou is and will always be completely free of charge and is also 100% ad-free.
            </p>
          </div>
        </b-col>
        <b-col md="4" sm='6' xs="12">
          <div class='explanation-item'>
            <font-awesome-icon :icon="['fab', 'osi']" size="3x" />
            <h3>OPEN-SOURCE</h3>
            <p>
              The entire codebase of Cryptolou is Open-Source and freely accessible at <a href='https://github.com/lou/cryptos'>https://github.com/lou/cryptos</a>
              Feel free to submit code if you are a developer.
              You can also report any bug or request a feature at <a href='https://github.com/lou/cryptos/issues'>https://github.com/lou/cryptos/issues</a>
            </p>
          </div>
        </b-col>
        <b-col md="4" sm='6' xs="12">
          <div class='explanation-item'>
            <font-awesome-icon icon="beer" size="3x" />
            <h3>DONATE</h3>
            <p>
              We are a verified publisher on Brave/BAT so the best way to help us is by visiting cryptolou.com on the Brave browser.
              <br />
              And you can always buy us a beer by sending few ETH at XRETEQRWETYRUTYI
            </p>
          </div>
        </b-col>
      </b-row>
      <div>
        UNDER THE HOOD
        coinmarketcap API to fetch coins prices
        BCRYPT for secure password
        LZ-based compression algorithm to fit data in the URL
        Vue.js
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
