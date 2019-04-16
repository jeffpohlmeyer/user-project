<template>
  
</template>

<script>
  export default {
    name: "LoginConfirmed",
    data() {
      return {

      }
    },
    beforeCreate() {
      const message = 'You have confirmed your email address.  Please log in.';
      this.$store.commit('user/setAlertMessage', message);
      this.$router.push({name: 'Login'})
    }
  }
</script>

<style scoped>

</style>