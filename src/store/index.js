import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import axios from 'axios'

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

export default new Vuex.Store({
  state: {
    sort: {
      by: 'cost',
      ascending: false
    },
    filters: {
      tags: []
    },
    allCurrencies: [],
    currencies: [
      {
        id: 'ethereum',
        quantity: 1,
        tags: ['lou', 'aloha'],
        cost: 100,
        coinmarketcap: {}
      }, {
        id: 'bitcoin',
        quantity: 3,
        tags: ['lou'],
        cost: 800,
        coinmarketcap: {}
      }, {
        id: 'neo',
        quantity: 2.3,
        tags: ['lou'],
        cost: 30,
        coinmarketcap: {}
      }, {
        id: 'litecoin',
        quantity: 5,
        tags: ['lou'],
        cost: 100,
        coinmarketcap: {}
      }, {
        id: 'iota',
        quantity: 18,
        tags: ['lou'],
        cost: 30,
        coinmarketcap: {}
      }
    ]
  },
  mutations: {
    updateSort (state, payload) {
      state.sort.ascending = payload === state.sort.by ? !state.sort.ascending : false
      state.sort.by = payload
    },
    updateTags (state, tags) {
      state.filters.tags = tags
    },
    addCurrency (state, payload) {
      if (!_.isEmpty(payload.currency.id)) {
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
      axios.get(`https://api.coinmarketcap.com/v1/ticker/${payload.currency.id}/?convert=EUR`).then(response => {
        payload.currency.coinmarketcap = response.data[0]
        commit(payload.method, {
          currency: payload.currency,
          callback: payload.callback
        })
      })
    },
    fetchCurrencies ({ dispatch, state }) {
      state.currencies.forEach((currency) => {
        dispatch('fetchCurrency', { currency, method: 'updateCurrency' })
      })
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
