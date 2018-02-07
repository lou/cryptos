<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-container>
        <b-navbar-brand href="#">
          <img class='navbar-brand-img' src="../assets/images/rocket.svg" alt="cryptos" width='32' height='32' />
          &nbsp;
          <strong>CRYPTOLOU</strong>
        </b-navbar-brand>
        <b-navbar-nav class='ml-auto'>
          <b-nav-item-dropdown no-caret right>
            <template slot="button-content">
              <img :src="require(`../assets/images/flags/${this.locale}.svg`)" width='20' height='15' />
            </template>
            <b-dropdown-item v-for="locale in availableLocales" :key="locale" @click="setLocale(locale)">
              <img :src="require(`../assets/images/flags/${locale}.svg`)" width='20' height='15' />
              {{locales[locale].text}}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          &nbsp;
          <b-nav-item-dropdown no-caret right v-if="!locked">
            <template slot="button-content">
              <icon name="gear" scale="1.3"></icon>
            </template>
            <b-dropdown-item  @click="setPassword">
              <icon name="lock"></icon>
              &nbsp;
              {{ lockText }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
import { availableLocales, locales } from '../store'
import _ from 'lodash'
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['locale']),
    availableLocales () {
      return _.without(availableLocales, this.locale)
    },
    locales () {
      return locales
    },
    locked () {
      return this.$store.state.locked
    },
    lockText () {
      return _.isEmpty(this.$store.state.password) ? this.$i18n.t('setPassword') : this.$i18n.t('changePassword')
    }
  },
  methods: {
    setLocale (locale) {
      this.$i18n.locale = locale.split('-')[0]
      this.$store.commit('setLocale', locale)
      this.$store.dispatch('fetchCurrencies')
    },
    setPassword () {
      this.$store.commit('setUpdatingPassword', true)
    }
  }
}
</script>
