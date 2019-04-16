<template>
  <v-navigation-drawer
    v-model="drawerLeft"
    clipped
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
    <v-switch
      v-model="theme"
      label="Change Theme"
      class="ml-3"
      jest="theme-switcher"
    >
    </v-switch>
  </v-navigation-drawer>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "BaseNavigationDrawer",
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
      },
      theme: {
        get() {
          return this.$store.state.admin.theme
        },
        set(value) {
          console.log('value', value)
          this.$store.commit('admin/setTheme', value)
        }
      }
    }
  }
</script>

<style scoped>

</style>