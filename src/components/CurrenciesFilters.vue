<template>
  <v-select
    class='filters'
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
import _ from 'lodash'

export default {
  name: 'CurrenciesFilters',
  components: { vSelect },
  computed: {
    selectedTags () {
      return _.clone(this.$store.state.filters.tags)
    },
    ...mapGetters(['tags'])
  },
  methods: {
    handleSelect (tags) {
      if (!_.isEqual(_.clone(tags), _.clone(this.$store.state.filters.tags))) {
        this.$store.commit('updateTags', tags)
      }
    }
  }
}
</script>
