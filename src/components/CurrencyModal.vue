<template>
  <span>
    <el-button
      type="primary"
      @click="modalVisible = true"
      :size="type === 'update' ? 'mini' : ''"
      :disabled="isAllCurrenciesEmpty"
      :icon="modalTypes[type].buttonIcon">
      {{ modalTypes[type].buttonLabel }}
    </el-button>
    <el-dialog :title="modalTypes[type].title" :visible.sync="modalVisible" fullscreen>
      <currency-form
        :type="type"
        :currency="currency"
        :submit-label="modalTypes[type].submitLabel"
        :on-cancel="closeModal"
        :on-submit="onSubmit" />
    </el-dialog>
  </span>
</template>

<script>
import CurrencyForm from './CurrencyForm'
import _ from 'lodash'

export default {
  name: 'AddCurrency',
  props: ['type', 'currency'],
  components: { CurrencyForm },
  data () {
    return {
      modalVisible: false,
      modalTypes: {
        add: {
          buttonIcon: 'el-icon-plus',
          buttonLabel: 'Add new currency',
          title: 'Add new currency',
          submitLabel: 'Add new currency',
          method: 'addCurrency'
        },
        update: {
          buttonIcon: 'el-icon-edit',
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
    },
    uniqueId () {
      return _.uniqueId('modal_')
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
