<template>
  <v-toolbar
    fixed
    app
    clipped-left
  >
    <v-toolbar-side-icon
      @click.stop="drawerLeft = !drawerLeft"
      jest="toolbar-navigation-drawer-button"
    ></v-toolbar-side-icon>
    <v-toolbar-title>Toolbar</v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="accessKey">
      <v-tooltip bottom>
          <v-btn
            icon
            :to="{name: 'User'}"
            slot="activator"
            jest="user-navigation-button"
          >
            <v-icon>person_outline</v-icon>
          </v-btn>
          <span>Account</span>
      </v-tooltip>
      <v-tooltip bottom>
        <v-btn
          icon
          :to="{name: 'Logout'}"
          slot="activator"
          jest="logout-navigation-button"
        >
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <span>Logout</span>
      </v-tooltip>
    </div>
    <div v-else>
      <v-tooltip bottom>
        <v-btn
          icon
          :to="{name: 'Login'}"
          jest="login-navigation-button"
        >
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <span>Login</span>
      </v-tooltip>
    </div>
  </v-toolbar>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "BaseToolbar",
    data() {
      return {

      }
    },
    computed: {
      ...mapState({
        accessKey: state => state.user.accessKey,
      }),
      drawerLeft: {
        get() {
          return this.$store.state.admin.drawerLeft
        },
        set(value) {
          this.$store.commit('admin/setDrawerLeft', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>