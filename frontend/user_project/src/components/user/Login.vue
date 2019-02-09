<!--todo: fix the snackbar/alert issue.  You shouldn't be double counting them.  Also change the messaging for user/mutations/setConfirmedMessage.
       Make everything more consistent. -->

<template>
  <transition name="slide-fade" mode="out-in">
  <div id="login">
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
    <v-card class="elevation-4 pa-3">
      <v-card-title>
        <p class="headline">Log In</p>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Username"
            :rules="nameRules"
            required
            autofocus
          >
          </v-text-field>
          <v-text-field
            v-model="password"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :rules="passwordRules"
            :type="show ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show = !show"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn small color="blue" @click="login" :disabled="!valid" class="white--text">Log In</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <p class="white--text ma-0">New user?  Click <router-link :to="{name: 'Register'}">here</router-link> to register.</p>
    <p class="white--text ma-0">Forgot password?  Click <router-link :to="{name: 'ForgotPassword'}">here</router-link> to reset it.</p>
  </div>
  </transition>
</template>

<script>
  export default {
  name: "Login",
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
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Minimum of 6 characters',
      ],
      show: false,
      snackbar: false,
      alertMsg: '',
      snackbarTimeout: 0,
      color: '',
    }
  },
  methods: {
    login() {
      //todo: Set up axios baseURL in main.js and create separate services file
      //todo: Figure out how to log in with either user name or email
      //todo: Set up user/password management routes
      //todo: Add social auth
      if (this.$refs.form.validate()) {
        this.$store.dispatch('user/loginUser',{
          username: this.name,
          password: this.password
        })
          .then((response) => {
            console.log('response.data',response.data)
            this.snackbar = false
            this.alertMsg = ''
          })
          .then(() => {
            this.$router.push({name: 'User'})
          })
          .catch(err => {
            this.alertMsg = ''
            console.log('err.response',err.response)
            Object.keys(err.response.data).map(key => {
              err.response.data[key].map(errorMsg => {
                this.alertMsg += `${errorMsg} `
              })
            })
            this.snackbar = true
            this.color = "red"
          })
      }
    },
  },
    //todo: figure out why mapState doesn't work
  computed: {
    alertMessage() { return this.$store.state.user.alertMessage }
  },
  mounted() {
    if (this.alertMessage.length > 0) {
      this.alertMsg = this.alertMessage
      this.color = 'green'
      this.snackbar = true
    }
  }
}
</script>

<style scoped>

</style>