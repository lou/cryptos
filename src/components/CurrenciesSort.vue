<template>
  <b-dropdown right :text="currentSort.name" variant="link">
    <b-dropdown-item-button
      v-for="sort in sorts"
      :key="sort.key"
      @click="handleSort(sort.key)">
      {{ sort.name }}
    </b-dropdown-item-button>
  </b-dropdown>
</template>

<script>
import { sorts } from '../store'
import _ from 'lodash'

export default {
  name: 'CurrenciesSort',
  computed: {
    currentSort () {
      return _.find(sorts, { key: this.$store.state.sort.by })
    },
    sorts () {
      return sorts
    }
  },
  methods: {
    handleSort (sort) {
      this.$store.commit('updateSort', sort)
    }
  }
}
</script>
