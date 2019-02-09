<template>
  
</template>

<script>
  export default {
    name: "ForgotPasswordConfirmRedirect",
    data() {
      return {
        uid: '',
        token: '',
      }
    },
    beforeMount() {
      this.$store.commit('user/setPasswordResetData',{
        uid: this.$route.params.uid,
        token: this.$route.params.token
      })
      this.$router.push({name: 'ForgotPasswordConfirm'})
    },
    mounted() {
      this.$router.push({name: 'User'})
    }
  }
</script>

<style scoped>

</style>