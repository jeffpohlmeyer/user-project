<template>
  <v-app id="app" dark>
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      clipped
      app
    >
      <v-list dense>
        <v-list-tile v-if="accessKey === null" :to="{name: 'Login'}">
          <v-list-tile-action>
            <v-icon>input</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log In</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="accessKey !== null" :to="{name: 'User'}">
          <v-list-tile-action>
            <v-icon>account_box</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Account</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="accessKey !== null" :to="{name: 'Logout'}">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Settings</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer class="white--text" app>
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    data: () => ({
      drawer: false,
      drawerRight: false,
      right: false,
      left: false
    }),
    props: {
      source: String
    },
    methods: {
    },
    computed: {
      ...mapState({
        accessKey: state => state.user.accessKey,
        refreshKey: state => state.user.refreshKey,
      }),
    },
    mounted() {
      console.log('process.env', process.env.VUE_APP_BASE_URL)
    }
  }
</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: opacity .5s;
  }
  .slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
