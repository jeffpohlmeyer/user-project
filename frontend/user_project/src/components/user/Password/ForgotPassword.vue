<template>
  <div id="forgot-password">
    <v-card v-if="!emailSent">
      <v-form
        @submit="resetPassword"
        onsubmit="return false;"
      >
        <v-card-title>
          <p class="title">Reset your password</p>
        </v-card-title>
        <v-card-text>
          <p>Enter your email address</p>
          <v-text-field
            v-model="email"
            label="Email"
            :error-messages="emailErrors"
            required
            autofocus
            @submit=""
            @keyup.enter.native="resetPassword"
            @input="$v.email.$touch()"
            @blue="$v.email.$touch()"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            small
            color="blue"
            @click="resetPassword"
          >
            Submit
          </v-btn>
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
  import { validationMixin } from 'vuelidate';
  import { required, email } from 'vuelidate/lib/validators';

  export default {
    name: "ForgotPassword",
    mixins: [validationMixin],
    validations: {
      email: { required, email },
    },
    data: () => ({
      valid: false,
      emailSent: false,
      email: '',
    }),
    computed: {
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.required && errors.push('Email address is required.');
        !this.$v.email.email && errors.push('Please enter a valid email address.');
      }
    },
    methods: {
      async resetPassword() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            await this.$store.dispatch('user/resetPassword', {
              email: this.email.toLowerCase(),
            });
            this.emailSent = true
          }
          catch(err) {
            console.log('err in ForgotPassword.resetPassword()', err);
            const message = `${err.response.data.email[0]}.  Please try again`;
            const color = 'error';
            const snackbar = true;
            this.$store.commit('setSnackbarData', {message, color, snackbar})
          }
        }
      },
    }
  }
</script>

<style scoped>

</style>