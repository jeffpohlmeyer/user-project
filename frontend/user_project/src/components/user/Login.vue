<template>
  <div id="login">
    <v-card class="elevation-4 pa-3" chai="login-card">
      <v-card-title>
        <p class="headline">Log In</p>
      </v-card-title>
      <v-form
        @submit="login"
        onsubmit="return false;"
      >
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Username"
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            required
            autofocus
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :error-messages="passwordErrors"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show = !show"
            @submit=""
            @keyup.enter.native="login"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-layout row fill-height justify-end>
            <v-btn
              small
              color="blue"
              @click="login"
              class="white--text"
            >
              Log In
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-form>
    </v-card>
    <p class="white--text ma-0">New user?  Click <router-link :to="{name: 'Register'}">here</router-link> to register.</p>
    <p class="white--text ma-0">Forgot password?  Click <router-link :to="{name: 'ForgotPassword'}">here</router-link> to reset it.</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  import { validationMixin } from 'vuelidate';
  import { required, minLength } from 'vuelidate/lib/validators';

  export default {
    name: "Login",
    mixins: [validationMixin],
    validations: {
      name: { required },
      password: { required, minLength: minLength(6) }
    },
    data: () => ({
      name: '',
      email: '',
      password: '',
      show: false,
    }),
    computed: {
      ...mapState({
        alertMessage: state => state.user.alertMessage,
      }),
      nameErrors() {
        const errors = [];
        if (!this.$v.name.$dirty) return errors;
        !this.$v.name.required && errors.push('User name is required.');
        return errors
      },
      passwordErrors() {
        const errors = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.required && errors.push('Password is required.');
        !this.$v.password.minLength && errors.push('Password must be at least 6 characters.');
        return errors
      },
    },
    methods: {
      async login() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            await this.$store.dispatch('user/loginUser',{
              username: this.name,
              password: this.password
            });
            this.$store.commit('user/setAlertMessage');
            this.$router.push({name: 'GamesList'})
          }
          catch(err) {
            console.log('err in Login.vue/login()', err);
            let message = '';
            Object.keys(err.response.data).map(key => {
              err.response.data[key].map(errorMsg => {
                message += `${errorMsg} `
              })
            });
            const color = 'error';
            const snackbar = true;
            this.$store.commit('setSnackbarData', {message, color, snackbar});
          }
        }
      },
    },
    mounted() {
      if (!!this.alertMessage) {
        const message = this.alertMessage;
        const color = 'success';
        const snackbar = true;
        this.$store.commit('setSnackbarData', {message, color, snackbar});
      }
    }
  }
</script>

<style scoped>

</style>