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
      </div>
    </b-container>
  </div>
</template>

<script>
import CurrencyModal from './CurrencyModal'

export default {
  name: 'Home',
  components: {
    CurrencyModal
  }
}
</script>
