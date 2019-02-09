<template>
<div>
  <v-card>
    <v-card-title>
      <span class="title">Logout</span>
    </v-card-title>
    <v-card-text>
      You have successfully logged out.  Click <router-link :to="{name: 'Login'}">here</router-link> to log in again.
    </v-card-text>
  </v-card>
</div>
</template>

<script>
  export default {
    name: "Logout",
    data() {
      return {

      }
    },
    created() {
      this.$store.dispatch('user/logout')
        .then(() => { this.$store.commit('user/reset') })
        .catch(err => { console.log(err) })
    }
  }
</script>

<style scoped>

</style>