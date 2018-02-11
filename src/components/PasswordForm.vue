<template>
  <b-container class='mt-5'>
    <b-row>
      <b-col offset-md='2' md='8' lg='6' offset-lg='3'>
        <b-form @submit.prevent="handleSubmit">
          <b-alert show variant="danger" v-if="wrongPassword">
            Incorrect password
          </b-alert>
          <b-form-group label="Password" label-for="password">
            <b-form-input
              type="password"
              placeholder="Enter your password"
              v-model="password"
              id="password" />
          </b-form-group>
          <b-button type="submit" variant='primary'>
            <span v-if="locked">
              Unlock
            </span>
            <span v-else>
              Change password
            </span>
          </b-button>
          <b-button v-if="!locked" variant='outline-secondary' @click="handleCancel">
            Cancel
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'PasswordForm',
  computed: {
    locked () {
      return this.$store.state.locked
    },
    wrongPassword () {
      return this.$store.state.wrongPassword
    }
  },
  methods: {
    handleSubmit () {
      this.$store.dispatch('updatePassword', { password: this.password, i18n: this.$i18n })
    },
    handleCancel () {
      if (!this.locked) {
        this.$store.commit('setUpdatingPassword', false)
      }
    }
  },
  data () {
    return {
      password: ''
    }
  }
}
</script>
