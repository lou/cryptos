<template>
  <span>
    <span v-if="isNaN(number)">...</span>
    <span v-else :class="{ 'text-success': positive, 'text-danger': negative }">{{formattedNumber()}}</span>
  </span>
</template>

<script>
export default {
  name: 'FormattedNumber',
  props: ['number', 'options', 'htmlOptions'],
  created () {

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
      return parseFloat(this.number).toLocaleString('fr-FR', { maximumFractionDigits: 2, minimumFractionDigits: 0, ...this.options })
    }
  }
}
</script>
