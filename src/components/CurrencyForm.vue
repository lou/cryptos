<template>
  <b-form @submit.prevent="handleSubmit">
    <b-form-group label="Coin:" label-for="currency_key">
      <v-select
        id="curency_key"
        v-model="localCurrency.key"
        :options="allCurrencies"
        index="slug"
        label="name"
        searchable
        placeholder="Choose a coin">
      </v-select>
    </b-form-group>
    <b-form-group label="Quantity:" label-for="currency_quantity">
      <b-form-input
        type="number"
        step="any"
        placeholder="How much do you own?"
        v-model="localCurrency.quantity"
        id="currency_quantity" />
    </b-form-group>
    <b-form-group label="Cost:" label-for="currency_cost">
      <b-form-input
        type="number"
        step="any"
        placeholder="How much did it cost you?"
        v-model="localCurrency.cost"
        id="currency_cost" />
    </b-form-group>
    <b-form-group label="Tags:" label-for="currency_tags">
      <v-select
        v-model="localCurrency.tags"
        :options="tags"
        :multiple="true"
        :taggable="true"
        placeholder="Choose or create tags"
        id="currency_tags">
        <span slot="no-options">
        </span>
      </v-select>
    </b-form-group>
    <b-form-group label="Info:" label-for="currency_info">
      <b-form-textarea
        maxlength="150"
        v-model="localCurrency.info"
        id="currency_info"
        placeholder="info"
        rows="3"
        @keyup.native="countdown"
        @keydown.native="countdown">
      </b-form-textarea>
      <small class='text-muted'>{{this.infoText.remainingCount}} remaining characters</small>
    </b-form-group>
    <b-button type="submit" variant='primary'>
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
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  name: 'CurrencyForm',
  props: ['currency', 'on-submit', 'on-cancel', 'submit-label'],
  components: { vSelect },
  methods: {
    handleSubmit () {
      this.onSubmit(_.cloneDeep(this.localCurrency))
      if (!this.currency) {
        this.localCurrency = _.cloneDeep(defaultCurrency)
      }
    },
    countdown () {
      this.infoText.remainingCount = this.infoText.maxCount - (this.localCurrency.info && this.localCurrency.info.length)
    }
  },
  data () {
    return {
      localCurrency: _.cloneDeep(this.currency || defaultCurrency),
      infoText: {
        maxCount: 150,
        remainingCount: 150
      }
    }
  },
  computed: {
    allCurrencies () {
      return this.$store.state.allCurrencies
    },
    ...mapGetters(['tags'])
  }
}
</script>
