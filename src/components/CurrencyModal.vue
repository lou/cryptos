<template>
  <span>
    <b-button
      :variant="type === 'update' ? 'outline-primary' : 'outline-info'"
      @click="modalVisible = true"
      :size="type === 'update' ? 'sm' : 'sm'"
      :disabled="isAllCurrenciesEmpty">
      <icon v-if="modalTypes[type].buttonIcon" :name="modalTypes[type].buttonIcon"></icon>
      {{ modalTypes[type].buttonLabel }}
    </b-button>
    <b-modal
      ref="dialog"
      :title="modalTypes[type].title"
      v-model="modalVisible"
      hide-footer>
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
  props: ['type', 'currency'],
  components: { CurrencyForm },
  data () {
    return {
      modalVisible: false,
      modalTypes: {
        add: {
          buttonIcon: '',
          buttonLabel: 'Add new currency',
          title: 'Add new currency',
          submitLabel: 'Add new currency',
          method: 'addCurrency'
        },
        update: {
          buttonIcon: 'pencil',
          buttonLabel: '',
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
