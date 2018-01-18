<template>
  <el-dropdown @command="handleSort">
    <span class="el-dropdown-link">
      {{ currentSort.name }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="sort in sorts" :key="sort.key"
        :command="sort.key">
        {{ sort.name }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
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
