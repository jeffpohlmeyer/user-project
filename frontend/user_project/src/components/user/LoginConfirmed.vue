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
      this.$store.commit('user/setConfirmedMessage');
      this.$router.push({name: 'Login'})
    }
  }
</script>

<style scoped>

</style>