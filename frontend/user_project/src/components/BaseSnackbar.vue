<template>
  <v-snackbar
    v-model="snackbar"
    top
    :color="color"
    :timeout="timeout"
  >
    {{ message }}
    <v-btn
      class="white--text"
      flat
      @click="snackbar = false"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: "BaseSnackbar",
    data: () => ({}),
    computed: {
      ...mapState({
        message: state => state.message,
        color: state => state.color,
        timeout: state => state.snackbarTimeout,
      }),
      snackbar: {
        get() { return this.$store.state.snackbar },
        set(value) { this.$store.commit('setSnackbarData', {snackbar: value}) }
      }
    },
  }
</script>

<style scoped>

</style>