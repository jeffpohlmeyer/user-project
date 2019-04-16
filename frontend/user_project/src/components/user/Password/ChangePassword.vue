<template>
  <v-card>
    <v-card-title>
      <p class="title">Change your password</p>
    </v-card-title>
    <v-form @submit="submitPasswordChange" onsubmit="return false;">
      <v-card-text>
        <p class="subheading">User: {{ email }}</p>
        <v-text-field
          v-model="oldPassword"
          :append-icon="show_old ? 'visibility_off' : 'visibility'"
          :type="show_old ? 'text' : 'password'"
          name="oldPassword"
          :error-messages="oldPasswordErrors"
          label="Current Password"
          @click:append="show_old = !show_old"
          jest="old"
          required
          @input="$v.oldPassword.$touch()"
          @blur="$v.oldPassword.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="newPassword1"
          :append-icon="show_new1 ? 'visibility_off' : 'visibility'"
          :type="show_new1 ? 'text' : 'password'"
          name="newPassword1"
          :error-messages="newPassword1Errors"
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="show_new1 = !show_new1"
          @input="$v.newPassword1.$touch()"
          @blur="$v.newPassword1.$touch()"
          jest="new1"
        ></v-text-field>
        <v-text-field
          v-model="newPassword2"
          :append-icon="show_new2 ? 'visibility_off' : 'visibility'"
          :type="show_new2 ? 'text' : 'password'"
          name="newPassword2"
          :error-messages="newPassword2Errors"
          label="Re-enter Password"
          hint="At least 6 characters"
          counter
          @click:append="show_new2 = !show_new2"
          @submit=""
          @keyup.enter.native="submitPasswordChange"
          @input="$v.newPassword2.$touch()"
          @blur="$v.newPassword2.$touch()"
          jest="new2"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          small
          color="blue"
          @click="submitPasswordChange"
          class="white--text"
          jest="button"
        >
          Change Password
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
  import { mapState } from 'vuex';

  import { validationMixin } from 'vuelidate';
  import { required, sameAs, minLength } from 'vuelidate/lib/validators';

  export default {
    name: "ChangePassword",
    mixins: [validationMixin],
    validations: {
      oldPassword: { required },
      newPassword1: { required, sameAsPassword: sameAs('newPassword2'), minLength: minLength(6) },
      newPassword2: { required, sameAsPassword: sameAs('newPassword1'), minLength: minLength(6) }
    },
    data() {
      return {
        oldPassword: null,
        newPassword1: null,
        newPassword2: null,
        show_old: false,
        show_new1: false,
        show_new2: false,
      }
    },
    computed: {
      ...mapState({
        email: state => state.user.email,
      }),
      oldPasswordErrors() {
        const errors = [];
        if (!this.$v.oldPassword.$dirty) return errors;
        !this.$v.oldPassword.required && errors.push('Old password is required.');
        return errors
      },
      newPassword1Errors() {
        const errors = [];
        if (!this.$v.newPassword1.$dirty) return errors;
        !this.$v.newPassword1.required && errors.push('New password is required.');
        !this.$v.newPassword1.minLength && errors.push('Password must be at least 6 characters.')
        return errors
      },
      newPassword2Errors() {
        const errors = [];
        if (!this.$v.newPassword2.$dirty) return errors;
        !this.$v.newPassword2.required && errors.push('Please repeat the new password.');
        !this.$v.newPassword2.minLength && errors.push('Password must be at least 6 characters.')
        !this.$v.newPassword2.sameAsPassword && errors.push('Passwords must be equal.');
        return errors
      }
    },
    methods: {
      async submitPasswordChange() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            const response = await this.$store.dispatch('user/changePassword', {
              old_password: this.oldPassword,
              new_password1: this.newPassword1,
              new_password2: this.newPassword2,
            });
            this.oldPassword = null;
            this.newPassword1 = null;
            this.newPassword2 = null;
            this.$v.$reset();
            console.log('response', response)
            const message = response.data.detail;
            const color = 'success';
            const snackbar = true;
            this.$store.commit('setSnackbarData', {message, color, snackbar})
          }
          catch(err) {
            console.log('err.response', err.response)
            let message = '';
            Object.keys(err.response.data).map(key => {
              err.response.data[key].map(errorMsg => {
                message += `${errorMsg} `
              })
            });
            const snackbar = true;
            const color = "error";
            this.$store.commit('setSnackbarData', {message, color, snackbar})
          }
        }
      },
    },
  }
</script>

<style scoped>

</style>