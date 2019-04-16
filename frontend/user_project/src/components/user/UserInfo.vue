<template>
  <div>
    <v-form
      @submit="updateUserInfo"
      onsubmit="return false;"
    >
      <v-card>
        <v-card-title class="title">
          User Info
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field
            v-model="localFirstName"
            label="First Name"
            @submit=""
            @keyup.enter.native="updateUserInfo"
          ></v-text-field>
          <v-text-field
            v-model="localLastName"
            label="Last Name"
            @submit=""
            @keyup.enter.native="updateUserInfo"
          ></v-text-field>
          <v-text-field
            v-model="localUsername"
            label="Username"
            required
            :error-messages="usernameErrors"
            @submit=""
            @keyup.enter.native="updateUserInfo"
            @input="$v.localUsername.$touch()"
            @blur="$v.localUsername.$touch()"
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
  import { mapState } from 'vuex';

  import { validationMixin } from 'vuelidate';
  import { required, minLength } from 'vuelidate/lib/validators';

  export default {
    name: "UserInfo",
    mixins: [validationMixin],
    validations: {
      localUsername: { required, minLength: minLength(1) },
    },
    data: () => ({
      localUsername: null,
      localFirstName: null,
      localLastName: null,
    }),
    computed: {
      ...mapState('user', {
        email: state => state.email,
        username: state => state.username,
        firstName: state => state.firstName,
        lastName: state => state.lastName,
      }),
      usernameErrors() {
        const errors = [];
        if (!this.$v.localUsername.$dirty) return errors;
        !this.$v.localUsername.required && errors.push('Username is required.');
        // !this.$v.localUsername.minLength && errors.push('Username is required.');
        return errors
      }
    },
    methods: {
      updateLocalUserInfo() {
        this.localUsername = this.username;
        this.localFirstName = this.firstName;
        this.localLastName = this.lastName;
      },
      async getUser() {
        try {
          await this.$store.dispatch('user/getUser');
          this.updateLocalUserInfo();
        } catch(err) {
          console.log('err in UserInfo.vue/getUser');
        }
      },
      async updateUserInfo() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            await this.$store.dispatch('user/updateUserInfo',{
              firstName: this.localFirstName,
              lastName: this.localLastName,
              username: this.localUsername,
            });
            const message = 'You have successfully updated your information.';
            const color = 'success';
            const snackbar = true;
            this.$store.commit('setSnackbarData', {message, color, snackbar})
          }
          catch(err) {
            let message = '';
            Object.keys(err.response.data).map(key => {
              err.response.data[key].map(errorMsg => {
                message += `${errorMsg} `
              })
            });
            const color = 'error';
            const snackbar = true;
            this.$store.commit('setSnackbarData', {message, color, snackbar})
          }
        }
      },
    },
    mounted() {
      this.getUser();
    },
  }
</script>

<style scoped>

</style>