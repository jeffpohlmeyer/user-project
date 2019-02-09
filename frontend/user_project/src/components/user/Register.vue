<template>
  <div id="register">
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
    <v-alert
      v-model="alert"
      dismissible
      color="info"
    >
      {{ alertMsg }}
    </v-alert>
    <v-card class="elevation-4 pa-3">
      <v-card-title>
        <p class="headline">Register</p>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            v-model="email"
            label="Email"
            :rules="emailRules"
            required
            autofocus
          >
          </v-text-field>
          <v-text-field
            v-model="name"
            label="Username"
            :rules="nameRules"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="password1"
            :append-icon="show_one ? 'visibility_off' : 'visibility'"
            :rules="password1Rules"
            :type="show_one ? 'text' : 'password'"
            name="password1"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show_one = !show_one"
          ></v-text-field>
          <v-text-field
            v-model="password2"
            :append-icon="show_two ? 'visibility_off' : 'visibility'"
            :rules="password2Rules"
            :type="show_two ? 'text' : 'password'"
            name="password2"
            label="Re-Enter Password"
            hint="At least 6 characters"
            counter
            @click:append="show_two = !show_two"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn small color="blue" @click="register" :disabled="!valid" class="white--text">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <p class="white--text ma-0">Already have an account?  Click <router-link :to="{name: 'Login'}">here</router-link> to log in.</p>
    <p class="white--text ma-0">Forgot password?  Click <router-link :to="{name: 'ForgotPassword'}">here</router-link> to reset it.</p>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data() {
      return {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
        ],
        email: '',
        emailRules: [
          v => !!v || 'Email is required',
          v => /.+@.+/.test(v) || 'Email must be valid'
        ],
        password1: '',
        password2: '',
        password1Rules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Minimum of 6 characters',
        ],
        password2Rules: [
          v => !!v || 'Password is required',
          v => v === this.password1 || 'Passwords must match'
        ],
        show_one: false,
        show_two: false,
        alert: false,
        alertMsg: '',
        snackbarTimeout: 0,
        snackbar: false,
        color: null,
      }
    },
    methods: {
      register() {
        //todo: Set up axios baseURL in main.js and create separate services file
        //todo: Figure out how to log in with either user name or email
        //todo: Set up user/password management routes
        //todo: Add social auth
        if (this.$refs.form.validate()) {
          this.$store.dispatch('user/registerUser',{
            email: this.email.toLowerCase(),
            username: this.name,
            password1: this.password1,
            password2: this.password2,
          })
            .then(response => {
              this.alert = false
              this.snackbar = true
              this.alertMsg = response.data.detail
              this.alertMsg += ` Go to ${this.email} for a link to complete the registration process.`
              this.color = "info"
              this.clear()
              console.log(response)
            })
            .catch(err => {
              this.snackbar = true
              this.alert = false
              this.alertMsg = err.response.data.email[0]
              this.color = "error"
              console.log(err.response.data)
            })
        }
      },
      clear() {
        this.$refs.form.reset()
      },
      login() {
        this.$store.commit('user/setPath',{path: 'login'})
      },
      forgot() {
        this.$store.commit('user/setPath',{path: 'forgot'})
      },
    }
  }
</script>

<style scoped>

</style>