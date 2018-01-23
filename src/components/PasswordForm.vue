<template>
  <b-container class='mt-5'>
    <b-form @submit.prevent="handleSubmit">
      <b-form-group label="Password" label-for="password">
        <b-form-input
          type="password"
          placeholder="Enter your password"
          v-model="password"
          id="password" />
      </b-form-group>
      <b-button type="submit" variant='primary'>
        Unlock
      </b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'PasswordForm',
  methods: {
    handleSubmit () {
      this.$store.dispatch('updatePassword', { password: this.password })
    }
  },
  data () {
    return {
      password: null
    }
  }
}
</script>
