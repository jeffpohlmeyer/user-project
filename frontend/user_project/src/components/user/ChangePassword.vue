<template>
  <div id="change-password">
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
        <p class="title">Change your password</p>
      </v-card-title>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-card-text>
          <p class="subheading">User: {{ email }}</p>
          <v-text-field
            v-model="old_password"
            :append-icon="show_old ? 'visibility_off' : 'visibility'"
            :type="show_old ? 'text' : 'password'"
            name="old_password"
            label="Current Password"
            @click:append="show_old = !show_old"
          ></v-text-field>
          <v-text-field
            v-model="new_password1"
            :append-icon="show_new1 ? 'visibility_off' : 'visibility'"
            :rules="password1Rules"
            :type="show_new1 ? 'text' : 'password'"
            name="new_password1"
            label="Password"
            hint="At least 6 characters"
            counter
            @click:append="show_new1 = !show_new1"
          ></v-text-field>
          <v-text-field
            v-model="new_password2"
            :append-icon="show_new2 ? 'visibility_off' : 'visibility'"
            :rules="password2Rules"
            :type="show_new2 ? 'text' : 'password'"
            name="new_password2"
            label="Re-enter Password"
            hint="At least 6 characters"
            counter
            @click:append="show_new2 = !show_new2"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="blue" @click="submitPasswordChange" :disabled="!valid" class="white--text">Change Password</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "ChangePassword",
    data() {
      return {
        old_password: '',
        new_password1: '',
        new_password2: '',
        show_old: false,
        show_new1: false,
        show_new2: false,
        password1Rules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Minimum of 6 characters',
        ],
        password2Rules: [
          v => !!v || 'Password is required',
          v => v === this.new_password1 || 'Passwords must match',
        ],
        valid: false,
        alertMsg: '',
        snackbarTimeout: 0,
        snackbar: false,
        color: null,
      }
    },
    methods: {
      submitPasswordChange() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('user/changePassword', {
            old_password: this.old_password,
            new_password1: this.new_password1,
            new_password2: this.new_password2,
            accessKey: this.accessKey,
            refreshKey: this.refreshKey
          })
            .then(response => {
              this.clear()
              this.alertMsg = response.data.detail
              this.color = "green"
              this.snackbar = true
            })
            .catch(err => {
              this.clear()
              this.alertMsg = ''
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
      clear() {
        this.$refs.form.reset()
      },
    },
    computed: {
      ...mapState('user',{
        email: state => state.email,
        accessKey: state => state.accessKey,
        refreshKey: state => state.refreshKey,
      })
    }
  }
</script>

<style scoped>

</style>