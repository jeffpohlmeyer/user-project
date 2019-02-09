<template>
  <div>
    <v-snackbar
      v-model="alert"
      :timeout="snackbarTimeout"
      :color="color"
      top
    >
      {{ alertMsg }}
      <v-btn
        dark
        flat
        @click="alert = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-form v-model="valid" lazy-validation>
      <v-card>
        <v-card-title class="title">
          User Info
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            v-model="localFirstName"
            label="First Name"
          ></v-text-field>
          <v-text-field
            v-model="localLastName"
            label="Last Name"
          ></v-text-field>
          <v-text-field
            v-model="localUsername"
            :counter="10"
            label="Username"
            required
            :rules="userNameRules"
          ></v-text-field>
          <v-text-field
            v-model="email"
            label="email"
            disabled
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small color="blue darken-2" @click="updateUserInfo">Update Info</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "UserInfo",
    data() {
      return {
        alert: false,
        alertMsg: '',
        color: '',
        snackbarTimeout: 6000,
        valid: true,
        localFirstName: '',
        localLastName: '',
        localUsername: '',
        userNameRules: [
          v => !!v || 'Username is required',
          v => (v && v.length <= 10) || 'Maximum length of 10'
        ],
      }
    },
    methods: {
      updateUserInfo() {
        this.$store.dispatch('user/updateUserInfo',{
          firstName: this.localFirstName,
          lastName: this.localLastName,
          username: this.localUsername,
          accessKey: this.accessKey,
          refreshKey: this.refreshKey
        })
          .then(() => {
            this.alert = true
            this.alertMsg = 'You have successfully updated your information.'
            this.color = 'green'
          })
          .catch(err => {
            this.alert = true
            this.alertMsg = ''
            Object.keys(err.response.data).map(key => {
              err.response.data[key].map(errorMsg => {
                this.alertMsg += `${errorMsg} `
              })
            })
            this.color = 'red'
          })
      },
    },
    computed: {
      ...mapState('user', {
        accessKey: state => state.accessKey,
        refreshKey: state => state.refreshKey,
        id: state => state.id,
        email: state => state.email,
        firstName: state => state.firstName,
        lastName: state => state.lastName,
        username: state => state.username
      })
    },
    mounted() {
      this.$store.dispatch('user/getUser',{
        accessKey: this.accessKey,
        refreshKey: this.refreshKey
      })
      this.localFirstName = this.firstName
      this.localLastName = this.lastName
      this.localUsername = this.username
    },
  }
</script>

<style scoped>

</style>