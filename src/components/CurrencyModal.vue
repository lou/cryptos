<template>
  <span>
    <b-button
      :variant="buttonVariant"
      @click="modalVisible = true"
      :size="buttonSize"
      :disabled="isAllCurrenciesEmpty">
      <font-awesome-icon v-if="buttonIcon" :icon="buttonIcon" />
      {{ buttonLabel }}
    </b-button>
    <b-modal
      ref="dialog"
      :title="modalTypes[type].title"
      v-model="modalVisible"
      hide-footer
      class='text-left'>
      <currency-form
        :type="type"
        :currency="currency"
        :submit-label="modalTypes[type].submitLabel"
        :on-cancel="closeModal"
        :on-submit="onSubmit" />
    </b-modal>
  </span>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import CurrencyForm from './CurrencyForm'

export default {
  name: 'AddCurrency',
  props: ['type', 'currency', 'button-variant', 'button-label', 'button-icon', 'button-size'],
  components: { CurrencyForm, FontAwesomeIcon },
  data () {
    return {
      modalVisible: false,
      modalTypes: {
        add: {
          title: 'Add new coin',
          submitLabel: 'Add new coin',
          method: 'addCurrency'
        },
        update: {
          title: 'Edit coin',
          submitLabel: 'Update coin',
          method: 'updateCurrency'
        }
      }
    }
  },
  computed: {
    isAllCurrenciesEmpty () {
      return this.$store.state.allCurrencies.length === 0
    }
  },
  methods: {
    closeModal () {
      this.modalVisible = false
    },
    onSubmit (currency) {
      this.$store.dispatch('fetchCurrency', { method: this.modalTypes[this.type].method, currency, callback: this.closeModal })
    }
  }
}
</script>
