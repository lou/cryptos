<template>
  <b-navbar toggleable="md" type="dark" variant="primary">
    <b-container>
      <b-navbar-brand href="#">
        <img class='navbar-brand-img' src="../assets/rocket.svg" alt="cryptos" width='32' height='32' />
        &nbsp;
        Cryptolou
      </b-navbar-brand>
      <currency-modal
        type='add'
        button-label='Add new currency'
        button-variant='outline-info'
        button-size='sm' />
    </b-container>
  </b-navbar>
</template>

<script>
import CurrencyModal from './CurrencyModal'

export default {
  name: 'Navbar',
  components: {
    CurrencyModal
  }
}
</script>
