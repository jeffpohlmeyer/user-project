<template>
  <div class="home">
    <h1><span class="white--text">hello world</span></h1>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
  },
  data() {
    return {

    }
  },
  methods: {
  },
  computed: {
    ...mapState({
      accessKey: state => state.user.accessKey,
    })
  },
  beforeMount() {
    if (!this.accessKey) {
      this.$router.push({name: 'Login'})
    }
  },
}
</script>
