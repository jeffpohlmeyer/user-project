<template>
  
</template>

<script>
  export default {
    name: "ForgotPasswordConfirmRedirect",
    data: () => ({}),
    beforeMount() {
      this.$store.commit('user/setPasswordResetData',{
        uid: this.$route.params.uid,
        token: this.$route.params.token
      });
      this.$router.push({name: 'ForgotPasswordConfirm'})
    },
  }
</script>

<style scoped>

</style>