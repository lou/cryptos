export const Numbers = {
  methods: {
    formatNumber (number, options = {}) {
      return parseFloat(number).toLocaleString('fr-FR', { maximumFractionDigits: 2, minimumFractionDigits: 0, ...options })
    }
  }
}
