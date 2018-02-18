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
    sortFunction: (coin) => parseFloat(coin.cost)
  }, {
    key: 'performance',
    name: 'Performance',
    sortFunction: (coin, currency) => {
      return (parseFloat(coin.coinmarketcap[`price_${currency.toLowerCase()}`]) * parseFloat(coin.quantity) - coin.cost) / coin.cost
    }
  }, {
    key: 'value',
    name: 'Value',
    sortFunction: (coin, currency) => parseFloat(coin.coinmarketcap[`price_${currency.toLowerCase()}`]) * parseFloat(coin.quantity)
  }, {
    key: 'price',
    name: 'Price',
    sortFunction: (coin, currency) => parseFloat(coin.coinmarketcap[`price_${currency.toLowerCase()}`])
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

export const currencyToLocale = {
  'USD': 'en-US',
  'EUR': 'fr-FR',
  'GBP': 'en-GB',
  'AUD': 'en-AU',
  'BRL': 'pt-BR',
  'CAD': 'en-CA',
  'CLP': 'es-CL',
  'CNY': 'zh-HK',
  'CZK': 'cs-CZ',
  'DKK': 'da-DK',
  'HKD': 'en-HK',
  'HUF': 'hu-HU',
  'IDR': 'id-ID',
  'ILS': 'he-IL',
  'INR': 'en-IN',
  'JPY': 'ja-JP',
  'KRW': 'ko-KR',
  'MXN': 'es-MX',
  'MYR': 'ms-MY',
  'NOK': 'no-NO',
  'NZD': 'en-NZ',
  'PHP': 'en-PH',
  'PKR': 'en-PK',
  'PLN': 'pl-PL',
  'RUB': 'ru-RU',
  'SEK': 'sv-SE',
  'SGD': 'en-SG',
  'THB': 'th-TH',
  'TRY': 'tr-TR',
  'TWD': 'zh-TW',
  'ZAR': 'en-ZA',
  'CHF': 'de-CH'
}

export const availableCurrencies = _.map(currencyToLocale, (value, key) => key)

export const store = new Vuex.Store({
  state: {
    currency: 'USD',
    updatedAt: null,
    loading: false,
    password: '',
    updatingPassword: false,
    wrongPassword: false,
    locked: false,
    showList: false,
    shortenedUrl: null,
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
    initialiseStore (state, payload) {
      const configStr = document.location.hash.substr(1)

      if (configStr) {
        let ciphertext = LZString.decompressFromEncodedURIComponent(configStr)

        try {
          let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), state.password)
          let config = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

          this.replaceState({ ...state, ...config, showList: true, locked: false, updatingPassword: false, wrongPassword: false })
          this.dispatch('fetchCurrencies')
        } catch (e) {
          this.replaceState({ ...state, locked: true, showList: true, wrongPassword: state.locked })
          // WRONG PASSWORD
        }
      } else {
        this.replaceState({ ...state, showList: false })
      }
    },
    goToHomePage (state) {
    },
    setCurrency (state, currency) {
      state.currency = currency
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
    setShortenedUrl (state, url) {
      state.shortenedUrl = url
    },
    setUpdatingPassword (state, updatingPassword) {
      state.updatingPassword = updatingPassword
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
    setPassword (state, payload) {
      state.password = payload.password
    },
    setAllCurrencies (state, currencies) {
      state.allCurrencies = currencies
    }
  },
  actions: {
    shortenUrl ({ commit, state }) {
      let params = new URLSearchParams()

      params.append('url', window.location.href)
      commit('setShortenedUrl', null)
      axios.post('https://git.io', params).then((response) => {
        if (response.headers['Location']) {
          commit('setShortenedUrl', response.headers['Location'])
        }
      }).catch((e) => {
        debugger
      })
    },
    fetchAllCurrencies ({ commit }) {
      axios.get('https://files.coinmarketcap.com/generated/search/quick_search.json').then((response) => {
        commit('setAllCurrencies', response.data)
      })
    },
    fetchCurrency ({ commit, state, getters }, payload) {
      return axios.get(`https://api.coinmarketcap.com/v1/ticker/${payload.currency.key}/?convert=${getters.currency}`).then(response => {
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
    updatePassword ({ commit, state }, payload) {
      commit('setPassword', { password: payload.password, bypassEncodeURL: !state.updatingPassword })
      commit('initialiseStore')
    }
  },
  getters: {
    total (state, getters) {
      let totalValue = _.sumBy(getters.filteredCurrencies, (c) => c.coinmarketcap[`price_${getters.currency.toLowerCase()}`] * c.quantity || 0)
      let totalCost = _.sumBy(getters.filteredCurrencies, (c) => parseFloat(c.cost) || 0)

      return {
        cost: totalCost,
        value: totalValue,
        performance: (totalValue - totalCost) / totalCost
      }
    },
    currency (state) {
      return state.currency
    },
    shortenedUrl (state) {
      return state.shortenedUrl
    },
    locale (state) {
      return currencyToLocale[state.currency]
    },
    tags (state) {
      return _.uniq(
        _.flatten(
          _.map(state.currencies, (currency) => currency.tags)
        )
      )
    },
    filteredCurrencies (state, getters) {
      let filteredCurrencies = state.currencies.sort((a, b) => {
        const sortBy = _.find(sorts, { key: state.sort.by })

        if (sortBy.sortFunction(a, getters.currency) > sortBy.sortFunction(b, getters.currency)) { return 1 }
        if (sortBy.sortFunction(a, getters.currency) < sortBy.sortFunction(b, getters.currency)) { return -1 }
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

const URLEncodeActions = ['setPassword', 'updateSort', 'updateTags', 'addCurrency', 'updateCurrency', 'removeCurrency', 'setCurrency']

let URLEncodeState = (state) => {
  state = _.pick(state, ['currencies', 'filters', 'sort', 'currency'])

  state.currencies = _.map(state.currencies, (currency) => {
    currency.coinmarketcap = {}
    return currency
  })
  return state
}

store.subscribe((mutation, state) => {
  if (mutation.payload && !mutation.payload.bypassEncodeURL && _.includes(URLEncodeActions, mutation.type)) {
    let cyperText = CryptoJS.AES.encrypt(JSON.stringify(URLEncodeState(_.cloneDeep(state))), state.password).toString()
    let configString = LZString.compressToEncodedURIComponent(cyperText)

    window.history.pushState('Rocket', 'To the moon', `#${configString}`)
  }
})
