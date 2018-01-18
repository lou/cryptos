export const Numbers = {
  methods: {
    formatNumber (number, options = {}) {
      return number.toLocaleString('fr-FR', { maximumFractionDigits: 2, ...options })
    }
  }
}
