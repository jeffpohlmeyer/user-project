<template>
  <div id="forgot-password">
    <v-snackbar
      v-model="snackbar"
      :timeout="snackbarTimeout"
      :color="color"
      top
    >
      {{ alertMsg }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-card v-if="!emailSent">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-title>
          <p class="title">Reset your password</p>
        </v-card-title>
        <v-card-text>
          <p>Enter your email address</p>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
            autofocus
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn small color="blue" :disabled="!valid" @click="resetPassword">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-card v-else>
      <v-card-title color="green">
        <p class="title">Success!</p>
      </v-card-title>
      <v-card-text>
        <p class="subheading">Please check your email for a link to reset your password.</p>
      </v-card-text>
    </v-card>
    <div v-if="!emailSent">
      <p class="white--text ma-0">Already have an account?  Click <router-link :to="{name: 'Login'}">here</router-link> to log in.</p>
      <p class="white--text ma-0">New user?  Click <router-link :to="{name: 'Register'}">here</router-link> to register.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ForgotPassword",
    data() {
      return {
        snackbar: false,
        snackbarTimeout: 0,
        alertMsg: '',
        color: '',
        valid: false,
        emailSent: false,
        email: '',
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid'
        ],
      }
    },
    methods: {
      resetPassword() {
        this.$store.dispatch('user/resetPassword',{
          email: this.email.toLowerCase(),
        })
          .then(() => { this.emailSent = true })
          .catch(err => {
            this.snackbar = true
            this.alertMsg = `${err.response.data.email[0]}.  Please try again`
            this.color = "red"
          })
      },
    }
  }
</script>

<style scoped>

</style>