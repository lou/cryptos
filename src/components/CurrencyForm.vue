<template>
  <form v-on:submit.prevent="handleSubmit(localCurrency)">
    <el-select v-model="localCurrency.id" filterable placeholder="Select">
      <el-option
        v-for="item in allCurrencies"
        :key="item.slug"
        :label="item.name"
        :value="item.slug">
      </el-option>
    </el-select>
    <el-input type="number" placeholder="quantity" v-model="localCurrency.quantity"/>
    <el-input type="number" placeholder="cost" v-model="localCurrency.cost"/>
    <el-select
      v-model="localCurrency.tags"
      multiple
      filterable
      allow-create
      default-first-option
      no-data-text="Create a new tag"
      placeholder="Choose tags for your currency">
      <el-option
        v-for="item in localCurrency.tags"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-input type="textarea" v-model="localCurrency.info"></el-input>
    <el-button type='primary' @click="handleSubmit(localCurrency)">
      {{ submitLabel }}
    </el-button>
    <el-button @click="onCancel()">
      Cancel
    </el-button>
  </form>
</template>

<script>
import { defaultCurrency } from '../store'
import _ from 'lodash'

export default {
  name: 'CurrencyForm',
  props: ['currency', 'on-submit', 'on-cancel', 'submit-label'],
  methods: {
    handleSubmit (currency) {
      this.onSubmit(currency)
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
