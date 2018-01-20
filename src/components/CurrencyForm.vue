<template>
  <b-form @submit.prevent="handleSubmit">
    <v-select
      v-model="localCurrency.id"
      :options="allCurrencies"
      index="ads"
      label="name"
      searchable
      placeholder="Choose a currency">
    </v-select>
    <b-form-input type="number" placeholder="quantity" v-model="localCurrency.quantity" />
    <b-form-input type="number" placeholder="cost" v-model="localCurrency.cost" />
    <v-select
      v-model="localCurrency.tags"
      :options="localCurrency.tags"
      :multiple="true"
      :taggable="true"
      placeholder="Select">
    </v-select>
    <b-form-textarea v-model="localCurrency.info"></b-form-textarea>
    <b-button type='primary'>
      {{ submitLabel }}
    </b-button>
    <b-button @click="onCancel()">
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
      this.onSubmit({ ...this.localCurrency, id: this.localCurrency.id.slug })
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
