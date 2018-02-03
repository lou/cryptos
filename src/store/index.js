import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'
import CryptoJS from 'crypto-js'
import LZString from 'lz-string'

Vue.use(Vuex)

export const sorts = [
  {
    key: 'cost',
    name: 'Cost',
    sortFunction: (currency) => parseFloat(currency.cost)
  }, {
    key: 'performance',
    name: 'Performance',
    sortFunction: (currency) => {
      return (parseFloat(currency.coinmarketcap.price_eur) * parseFloat(currency.quantity) - currency.cost) / currency.cost
    }
  }, {
    key: 'value',
    name: 'Value',
    sortFunction: (currency) => parseFloat(currency.coinmarketcap.price_eur) * parseFloat(currency.quantity)
  }, {
    key: 'price_eur',
    name: 'Price',
    sortFunction: (currency) => parseFloat(currency.coinmarketcap.price_eur)
  }
]

export const defaultCurrency = {
  id: null,
  name: null,
  quantity: null,
  cost: null,
  info: null,
  tags: []
}

export const store = new Vuex.Store({
  state: {
    updatedAt: null,
    loading: false,
    password: '',
    wrongPassword: false,
    showList: false,
    sort: {
      by: 'cost',
      ascending: false
    },
    filters: {
      tags: []
    },
    allCurrencies: [],
    currencies: []
  },
  mutations: {
    initialiseStore (state) {
      const configStr = document.location.hash.substr(1)

      if (configStr) {
        let ciphertext = LZString.decompressFromEncodedURIComponent(configStr)

        try {
          let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), state.password)
          let config = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

          this.replaceState({ ...state, ...config, showList: true, wrongPassword: false })
          this.dispatch('fetchCurrencies')
        } catch (e) {
          this.replaceState({ ...state, wrongPassword: true, showList: true })
          // WRONG PASSWORD
        }
      } else {
        this.replaceState({ ...state, showList: false })
      }
    },
    updateSort (state, payload) {
      state.sort.ascending = payload === state.sort.by ? !state.sort.ascending : false
      state.sort.by = payload
    },
    updateTags (state, tags) {
      state.filters.tags = tags
    },
    setUpdatedAt (state) {
      state.updatedAt = new Date().getTime()
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    addCurrency (state, payload) {
      if (!_.isEmpty(payload.currency.key)) {
        payload.currency.id = state.currencies.length + 1
        state.showList = true
        state.currencies.push(payload.currency)
        if (typeof payload.callback === 'function') {
          payload.callback()
        }
      }
    },
    updateCurrency (state, payload) {
      state.currencies.splice(_.findIndex(state.currencies, { id: payload.currency.id }), 1, payload.currency)
      if (typeof payload.callback === 'function') {
        payload.callback()
      }
    },
    removeCurrency (state, currency) {
      state.currencies = _.reject(state.currencies, { id: currency.id })
    },
    updatePassword (state, password) {
      state.password = password
    },
    setAllCurrencies (state, currencies) {
      state.allCurrencies = currencies
    }
  },
  actions: {
    fetchAllCurrencies ({ commit }) {
      axios.get('https://files.coinmarketcap.com/generated/search/quick_search.json').then((response) => {
        commit('setAllCurrencies', response.data)
      })
    },
    fetchCurrency ({ commit }, payload) {
      return axios.get(`https://api.coinmarketcap.com/v1/ticker/${payload.currency.key}/?convert=EUR`).then(response => {
        payload.currency.coinmarketcap = response.data[0]
        commit(payload.method, {
          currency: payload.currency,
          callback: payload.callback,
          bypassEncodeURL: payload.bypassEncodeURL
        })
      })
    },
    fetchCurrencies ({ dispatch, state, commit }) {
      let promises = []

      commit('setLoading', true)
      state.currencies.forEach((currency) => {
        promises.push(
          dispatch('fetchCurrency', { currency, method: 'updateCurrency', bypassEncodeURL: true })
        )
      })

      axios.all(promises).then(() => {
        commit('setUpdatedAt')
        commit('setLoading', false)
      })
    },
    updatePassword ({ commit }, payload) {
      commit('updatePassword', payload.password)
      commit('initialiseStore')
    }
  },
  getters: {
    total (state, getters) {
      let totalValue = _.sumBy(getters.filteredCurrencies, (c) => c.coinmarketcap.price_eur * c.quantity || 0)
      let totalCost = _.sumBy(getters.filteredCurrencies, (c) => parseFloat(c.cost) || 0)

      return {
        cost: totalCost,
        value: totalValue,
        performance: (totalValue - totalCost) / totalCost
      }
    },
    tags (state) {
      return _.uniq(
        _.flatten(
          _.map(state.currencies, (currency) => currency.tags)
        )
      )
    },
    filteredCurrencies (state) {
      let filteredCurrencies = state.currencies.sort((a, b) => {
        const sortBy = _.find(sorts, { key: state.sort.by })

        if (sortBy.sortFunction(a) > sortBy.sortFunction(b)) { return 1 }
        if (sortBy.sortFunction(a) < sortBy.sortFunction(b)) { return -1 }
        return 0
      })

      if (!state.sort.ascending) {
        filteredCurrencies.reverse()
      }

      if (!_.isEmpty(state.filters.tags)) {
        filteredCurrencies = _.filter(filteredCurrencies, (currency) => {
          return _.intersection(currency.tags, state.filters.tags).length >= 1
        })
      }
      return filteredCurrencies
    }
  }
})

const URLEncodeActions = ['allCurrencies', 'password', 'updateSort', 'updateTags', 'addCurrency', 'updateCurrency', 'removeCurrency']

let URLEncodeState = (config) => {
  config = _.omit(config, ['password', 'allCurrencies'])

  config.currencies = _.map(config.currencies, (currency) => {
    currency.coinmarketcap = {}
    return currency
  })
  return config
}

store.subscribe((mutation, state) => {
  if (mutation.payload && !mutation.payload.bypassEncodeURL && _.includes(URLEncodeActions, mutation.type)) {
    let cyperText = CryptoJS.AES.encrypt(JSON.stringify(URLEncodeState(_.cloneDeep(state))), state.password).toString()
    let configString = LZString.compressToEncodedURIComponent(cyperText)

    window.history.pushState('Rocket', 'To the moon', `#${configString}`)
  }
})
