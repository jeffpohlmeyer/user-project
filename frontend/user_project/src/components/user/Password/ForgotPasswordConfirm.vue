<template>
  <v-card>
    <v-card-title>
      <p class="title">
        Choose a new password
      </p>
    </v-card-title>
    <v-form
      @submit="confirmPasswordReset"
      onsubmit="return false;"
    >
      <v-card-text>
        <v-text-field
          v-model="newPassword1"
          :append-icon="show_one ? 'visibility_off' : 'visibility'"
          :error-messages="newPassword1Errors"
          :type="show_one ? 'text' : 'password'"
          name="newPassword1"
          label="Password"
          hint="At least 6 characters"
          counter
          @click:append="show_one = !show_one"
          @input="$v.newPassword1.$touch()"
          @blur="$v.newPassword1.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="newPassword2"
          :append-icon="show_two ? 'visibility_off' : 'visibility'"
          :error-messages="newPassword2Errors"
          :type="show_two ? 'text' : 'password'"
          name="newPassword2"
          label="Re-Enter Password"
          hint="At least 6 characters"
          counter
          @click:append="show_two = !show_two"
          @submit=""
          @keyup.enter.native="confirmPasswordReset"
          @input="$v.newPassword2.$touch()"
          @blur="$v.newPassword2.$touch()"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          small
          color="blue"
          @click="confirmPasswordReset"
          class="white--text"
        >
          Submit
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
    name: "ForgotPasswordConfirm",
    mixins: [validationMixin],
    validations: {
      newPassword1: { required, sameAsPassword: sameAs('newPassword2'), minLength: minLength(6) },
      newPassword2: { required, sameAsPassword: sameAs('newPassword1'), minLength: minLength(6) }
    },
    data: () => ({
      show_one: false,
      show_two: false,
      newPassword1: '',
      newPassword2: '',
    }),
    computed: {
      ...mapState('user',{
        uid: state => state.uid,
        token: state => state.token,
        email: state => state.email,
      }),
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
      async confirmPasswordReset() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          try {
            await this.$store.dispatch('user/confirmPasswordReset', {
              uid: this.uid,
              token: this.token,
              new_password1: this.newPassword1,
              new_password2: this.newPassword2,
            });
            const message = 'You have successfully reset your password.';
            this.$store.commit('user/setAlertMessage', message);
            this.$router.push({name: 'Login'})
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
            this.$store.commit('setSnackbarData', {message, color, snackbar});
          }
        }
      }
    },
  }
</script>

<style scoped>

</style>