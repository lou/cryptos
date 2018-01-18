<template>
  <el-select
    :value="selectedTags"
    @change="handleSelect"
    multiple
    placeholder="Select">
    <el-option
      v-for="tag in tags"
      :key="tag"
      :label="tag"
      :value="tag">
    </el-option>
  </el-select>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CurrenciesFilters',
  computed: {
    selectedTags () {
      return this.$store.state.filters.tags
    },
    ...mapGetters(['tags'])
  },
  methods: {
    handleSelect (tags) {
      this.$store.commit('updateTags', tags)
    }
  }
}
</script>
