<template>
  <div class='full-height'>
    <div class='night-stars'>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div class='title'>
        <h1 class='pt-5'>THE MOST SECURE WAY TO TRACK YOUR CRYPTOS</h1>
        <h2 class='pt-2'>Keep your portfolio at home</h2>
      </div>
      <div class='cta'>
        <div id='arrow'></div>
        <div id='to-the-moon'>To the moon!</div>
        <currency-modal
          type='add'
          button-label='Start Your Portfolio'
          button-icon="space-shuttle"
          button-variant="info"
          button-size="lg" />
      </div>
      <p>
        No registration needed and 100% free
      </p>
    </div>

    <b-container class="text-center explanation p-5">
      <b-row>
        <b-col md="6" xs="12">
          <div class='explanation-item'>
            <div class='icon'>
              <font-awesome-icon icon="coffee" size="3x" />
            </div>
            <h3>SIMPLE</h3>
            <p>
              You do not have to register, just start your portfolio.
              <br />
              We handle 1500+ cryptocurrencies.
              <br />
              View your portfolio in almost any major Fiat Currency including USD, CNY, EUR, GBP, AUD, CAD, SEK, BRL, and many more
            </p>
          </div>
        </b-col>
        <b-col md="6" xs="12">
          <div class='explanation-item'>
            <div class='icon'>
              <font-awesome-icon icon="shield-alt" size="3x" />
            </div>
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
        <b-col md="6" xs="12">
          <div class='explanation-item'>
            <div class='icon'>
              <font-awesome-icon icon="user-secret" size="3x" />
            </div>
            <h3>PRIVACY MATTERS</h3>
            <p>
              We can't access your data so we can't sell it.
              <br />
              Everything is stored on Github Pages and we do not have access to any logs.
              <br />
              Moreover we do not use any third party libraries such as Goolge Anlaytics to track your behaviour on Cryptolou.com.
            </p>
          </div>
        </b-col>
        <b-col md="6" xs="12">
          <div class='explanation-item'>
            <div class='icon'>
              <font-awesome-icon icon="heart" size="3x" />
            </div>
            <h3>FREE</h3>
            <p>
              Cryptolou is and will always be completely free of charge and is also 100% ad-free.
            </p>
          </div>
        </b-col>
        <b-col md="6" xs="12">
          <div class='explanation-item'>
            <div class='icon'>
              <font-awesome-icon :icon="['fab', 'osi']" size="3x" />
            </div>
            <h3>OPEN-SOURCE</h3>
            <p>
              The entire codebase of Cryptolou is Open-Source and freely accessible at <a href='https://github.com/lou/cryptos'>https://github.com/lou/cryptos</a>.
              <br />
              Feel free to submit code.
              <br />
              You can also report any bug or request a feature at <a href='https://github.com/lou/cryptos/issues'>https://github.com/lou/cryptos/issues</a>
            </p>
          </div>
        </b-col>
        <b-col md="6" xs="12">
          <div class='explanation-item'>
            <div class='icon'>
              <font-awesome-icon icon="cogs" size="3x" />
            </div>
            <h3>UNDER THE HOOD</h3>
            <div class='text-left'>
              We have built Cryptolou thanks to:
              <ul class='mt-2'>
                <li><a href="https://coinmarketcap.com/api">Coinmarketcap API</a> to fetch coins prices</li>
                <li><a href="https://github.com/brix/crypto-js">AES</a> to encrypt the data</li>
                <li><a href="https://github.com/pieroxy/lz-string">LZ-based</a> compression algorithm to fit data in the URL</li>
                <li><a href="https://vuejs.org/">Vue.js</a> framework</li>
                <li>Icons by <a href="https://fontawesome.com">Font Awesome</a></li>
                <li>Logo made by <a href="http://www.freepik.com" title="Freepik">Freepik</a></li>
              </ul>
            </div>
          </div>
        </b-col>
<!--         <b-col md='6' offset-md='3'>
          <div class='explanation-item'>
            <div class='icon'>
              <font-awesome-icon icon="beer" size="3x" />
            </div>
            <h3>DONATE</h3>
            <p>
              We are a verified publisher on Brave so the best way to help us is by visiting cryptolou.com via the Brave browser.
              <br />
              You can always buy us a beer by sending us few satoshis at:
              <br />
              ETH: 0xc5268bc3b58c24d2e323ab42646a5524f1d4fb9c
              <br />
              LTC: LRwj4wcGRt8nNhK6S8FHJfjLKciEQpeuwY
            </p>
          </div>
        </b-col>
 -->      </b-row>
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
