<template>
  <span>
    <b-button
      :variant="buttonVariant"
      @click="modalVisible = true"
      :size="buttonSize"
      :disabled="isAllCurrenciesEmpty">
      <icon v-if="buttonIcon" :name="buttonIcon"></icon>
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
import CurrencyForm from './CurrencyForm'

export default {
  name: 'AddCurrency',
  props: ['type', 'currency', 'button-variant', 'button-label', 'button-icon', 'button-size'],
  components: { CurrencyForm },
  data () {
    return {
      modalVisible: false,
      modalTypes: {
        add: {
          title: 'Add new currency',
          submitLabel: 'Add new currency',
          method: 'addCurrency'
        },
        update: {
          title: 'Edit currency',
          submitLabel: 'Update currency',
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
