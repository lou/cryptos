<template>
  <b-form @submit.prevent="handleSubmit">
    <b-form-group label="Currency:" label-for="currency_key">
      <v-select
        id="curency_key"
        v-model="localCurrency.key"
        :options="allCurrencies"
        index="slug"
        label="name"
        searchable
        placeholder="Choose a currency">
      </v-select>
    </b-form-group>
    <b-form-group label="Quantity:" label-for="currency_quantity">
      <b-form-input
        type="number"
        placeholder="How much did you buy?"
        v-model="localCurrency.quantity"
        id="currency_quantity" />
    </b-form-group>
    <b-form-group label="Cost:" label-for="currency_cost">
      <b-form-input
        type="number"
        placeholder="How much did it cost you?"
        v-model="localCurrency.cost"
        id="currency_cost" />
    </b-form-group>
    <b-form-group label="Tags:" label-for="currency_tags">
      <v-select
        v-model="localCurrency.tags"
        :options="localCurrency.tags"
        :multiple="true"
        :taggable="true"
        placeholder="Choose tags"
        id="currency_tags">
      </v-select>
    </b-form-group>
    <b-form-group label="Info:" label-for="currency_info">
      <b-form-textarea
        v-model="localCurrency.info"
        id="currency_info"
        placeholder="info"
        rows="7">
      </b-form-textarea>
    </b-form-group>
    <b-button variant='outline-primary'>
      {{ submitLabel }}
    </b-button>
    <b-button variant='outline-secondary' @click="onCancel()">
      Cancel
    </b-button>
  </b-form>
</template>

<script>
import vSelect from 'vue-select'
import { defaultCurrency } from '../store'
import _ from 'lodash'

export default {
  name: 'CurrencyForm',
  props: ['currency', 'on-submit', 'on-cancel', 'submit-label'],
  components: { vSelect },
  methods: {
    handleSubmit () {
      this.onSubmit(this.localCurrency)
      if (!this.currency) {
        this.localCurrency = _.cloneDeep(defaultCurrency)
      }
    }
  },
  data () {
    return {
      localCurrency: _.cloneDeep(this.currency || defaultCurrency)
    }
  },
  computed: {
    allCurrencies () {
      return this.$store.state.allCurrencies
    }
  }
}
</script>
