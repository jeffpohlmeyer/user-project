<template>
  <div id="register">
    <v-card class="elevation-4 pa-3">
      <v-card-title>
        <p class="headline">Register</p>
      </v-card-title>
      <v-form
        @submit="register"
        onsubmit="return false;"
      >
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            :error-messages="emailErrors"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            autofocus
          >
          </v-text-field>
          <v-text-field
            v-model="name"
            label="Username"
            :error-messages="nameErrors"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          >
          </v-text-field>
          <v-text-field
            v-model="password1"
            :append-icon="show_one ? 'visibility_off' : 'visibility'"
            :error-messages="password1Errors"
            :type="show_one ? 'text' : 'password'"
            name="password1"
            label="Password"
            hint="At least 6 characters"
            counter
            required
            @input="$v.password1.$touch()"
            @blur="$v.password1.$touch()"
            @click:append="show_one = !show_one"
          ></v-text-field>
          <v-text-field
            v-model="password2"
            :append-icon="show_two ? 'visibility_off' : 'visibility'"
            :error-messages="password2Errors"
            :type="show_two ? 'text' : 'password'"
            name="password2"
            label="Re-Enter Password"
            hint="At least 6 characters"
            counter
            required
            @input="$v.password2.$touch()"
            @blur="$v.password2.$touch()"
            @click:append="show_two = !show_two"
            @submit=""
            @keyup.enter.native="register"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            small
            color="blue"
            @click="register"
            class="white--text"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <p class="white--text ma-0">Already have an account?  Click <router-link :to="{name: 'Login'}">here</router-link> to log in.</p>
    <p class="white--text ma-0">Forgot password?  Click <router-link :to="{name: 'ForgotPassword'}">here</router-link> to reset it.</p>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, sameAs, minLength, email } from 'vuelidate/lib/validators';

  export default {
    name: "Register",
    mixins: [validationMixin],
    validations: {
      name: { required },
      email: { required, email },
      password1: { required, sameAsPassword: sameAs('password2'), minLength: minLength(6) },
      password2: { required, sameAsPassword: sameAs('password1'), minLength: minLength(6) }
    },
    data: () => ({
      name: null,
      email: null,
      password1: null,
      password2: null,
      show_one: false,
      show_two: false,
    }),
    computed: {
      emailErrors() {
        const errors = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.required && errors.push('Email is required.');
        !this.$v.email.email && errors.push('Please enter a valid email address.');
        return errors
      },
      nameErrors() {
        const errors = [];
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.required && errors.push('User name is required.');
        return errors
      },
      password1Errors() {
        const errors = [];
        if (!this.$v.password1.$dirty) return errors;
        !this.$v.password1.required && errors.push('New password is required.');
        !this.$v.password1.minLength && errors.push('Password must be at least 6 characters.')
        return errors
      },
      password2Errors() {
        const errors = [];
        if (!this.$v.password2.$dirty) return errors;
        !this.$v.password2.required && errors.push('Please repeat the new password.');
        !this.$v.password2.minLength && errors.push('Password must be at least 6 characters.')
        !this.$v.password2.sameAsPassword && errors.push('Passwords must be equal.');
        return errors
      }
    },
    methods: {
      async register() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            const response = await this.$store.dispatch('user/registerUser', {
              email: this.email.toLowerCase(),
              username: this.name,
              password1: this.password1,
              password2: this.password2,
            });
            const message = `${response.data.detail} Go to ${this.email} for a link to complete the registration process.`
            const snackbar = true;
            const color = "info";
            this.clear();
            this.$store.commit('setSnackbarData', {message, color, snackbar});
          }
          catch(err) {
            console.log('err in Register.vue/register', err);
            let message = ``;
            const color = 'error';
            const snackbar = true;
            Object.keys(err.response.data).map(key => {
              err.response.data[key].map(errorMsg => {
                message += `${errorMsg} `
              })
            });
            this.$store.commit('setSnackbarData', {message, color, snackbar});
          }
        }
      },
      clear() {
        this.name = null;
        this.email = null;
        this.password1 = null;
        this.password2 = null;
        this.$v.$reset();
      },
    }
  }
</script>

<style scoped>

</style>