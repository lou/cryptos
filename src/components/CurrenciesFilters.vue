<template>
  <v-select
    v-if="tags.length > 0"
    :value="selectedTags"
    :options="tags"
    :multiple="true"
    :onChange="handleSelect"
    placeholder="Filter by tags">
  </v-select>
</template>

<script>
import { mapGetters } from 'vuex'
import vSelect from 'vue-select'

export default {
  name: 'CurrenciesFilters',
  components: { vSelect },
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
