<template>
<div>
  <v-card>
    <v-card-title>
      <span class="title">Logout</span>
    </v-card-title>
    <v-card-text>
      You have successfully logged out.  Please close your browser to safely end your session.
      <!--Click <router-link :to="{name: 'Login'}">here</router-link> to log in again.-->
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
    async created() {
      try {
        await this.$store.dispatch('user/logout');
        this.$store.commit('user/reset');
      }
      catch(err) {
        console.log(err)
      }
    }
  }
</script>

<style scoped>

</style>