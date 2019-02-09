<template>
  <div id="forgot-password-confirmed">
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
    <v-card>
      <v-card-title>
        <p class="title">
          Choose a new password
        </p>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <v-text-field
            v-model="new_password1"
            :append-icon="show_one ? 'visibility_off' : 'visibility'"
            :rules="password1Rules"
            :type="show_one ? 'text' : 'password'"
            name="new_password1"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show_one = !show_one"
          ></v-text-field>
          <v-text-field
            v-model="new_password2"
            :append-icon="show_two ? 'visibility_off' : 'visibility'"
            :rules="password2Rules"
            :type="show_two ? 'text' : 'password'"
            name="new_password2"
            label="Re-Enter Password"
            hint="At least 6 characters"
            counter
            @click:append="show_two = !show_two"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn small color="blue" @click="confirmPasswordReset" :disabled="!valid" class="white--text">Submit</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "ForgotPasswordConfirm",
    data() {
      return {
        valid: false,
        show_one: false,
        show_two: false,
        new_password1: '',
        new_password2: '',
        password1Rules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Minimum of 6 characters',
        ],
        password2Rules: [
          v => !!v || 'Password is required',
          v => v === this.new_password1 || 'Passwords must match',
        ],
        alertMsg: '',
        snackbarTimeout: 0,
        snackbar: false,
        color: null,
      }
    },
    methods: {
      confirmPasswordReset() {
        this.$store.dispatch('user/confirmPasswordReset',{
          uid: this.uid,
          token: this.token,
          new_password1: this.new_password1,
          new_password2: this.new_password2,
        })
          .then(() => {
            this.$store.commit('user/setPasswordResetMessage')
            this.$router.push({name: 'Login'})
          })
          .catch(err => {
            this.snackbar = true
            this.color = "red"
            Object.keys(err.response.data).map(key => {
              err.response.data[key].map(errorMsg => {
                this.alertMsg += `${errorMsg} `
              })
            })
          })
      }
    },
    computed: {
      ...mapState('user',{
        uid: state => state.uid,
        token: state => state.token,
        email: state => state.email,
      })
    }
  }
</script>

<style scoped>

</style>