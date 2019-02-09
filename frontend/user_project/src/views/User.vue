<template>
  <div id="user-view">
    <UserInfo v-if="accessKey" class="mb-4"/>
    <ChangePassword v-if="accessKey" class="mb-4"/>
    <v-card v-if="accessKey">
      <v-card-text></v-card-text>
      <v-card-actions>
        <v-btn @click="getUsers">Get all users</v-btn>
        <v-btn :to="{name: 'Logout'}">Logout</v-btn>
      </v-card-actions>
    </v-card>
</div>
</template>

<script>
  import { mapState } from 'vuex'
  import Register from '@/components/user/Register'
  import ForgotPassword from '@/components/user/ForgotPassword'
  import ForgotPasswordConfirm from '@/components/user/ForgotPasswordConfirm'
  import ChangePassword from '@/components/user/ChangePassword'
  import UserInfo from '@/components/user/UserInfo'

  export default {
    name: "User",
    components: {
      Register,
      ForgotPassword,
      ForgotPasswordConfirm,
      ChangePassword,
      UserInfo
    },
    data() {
      return {
      }
    },
    methods: {
      getUsers() {
        this.$store.dispatch('user/getAllUsers',{
          accessKey: this.accessKey,
          refreshKey: this.refreshKey
        })
      },
    },
    computed: {
      ...mapState('user',{
        accessKey: state => state.accessKey,
        refreshKey: state => state.refreshKey,
        path: state => state.path,
      })
    },
    mounted() {
      this.$store.commit('user/setSnackbar',{message: '', color: ''})
    },
  }
</script>

<style scoped>
</style>