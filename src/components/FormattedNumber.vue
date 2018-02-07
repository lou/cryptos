<template>
  <span>
    <span v-if="isNaN(number)" class='loading'><span>.</span><span>.</span><span>.</span></span>
    <span v-else :class="{ 'text-success': positive, 'text-danger': negative }">{{formattedNumber()}}</span>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'FormattedNumber',
  props: ['number', 'options', 'htmlOptions'],
  computed: {
    ...mapGetters(['locale'])
  },
  data () {
    return {
      positive: false,
      negative: false
    }
  },
  methods: {
    formattedNumber () {
      if (this.htmlOptions && this.htmlOptions.colored) {
        if (this.number < 0) {
          this.$data.negative = true
          this.$data.positive = false
        } else {
          this.$data.positive = true
          this.$data.negative = false
        }
      }
      return parseFloat(this.number).toLocaleString(this.locale, { maximumFractionDigits: 2, minimumFractionDigits: 0, ...this.options })
    }
  }
}
</script>
