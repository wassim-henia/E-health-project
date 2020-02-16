<template>
  <v-content v-if="isAuthenticated">
    <v-toolbar dense>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Smart Company</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="() => {}">
            <v-list-item-title @click="logOut">Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-bottom-navigation v-if="user.role == 'patient'" app bottom grow>
      <v-btn to="/profile">
        <span>Profile</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="/posts">
        <span>Posts</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn to="/sante">
        <span>Santé</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>

      <v-btn to="/about">
        <span>About</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-bottom-navigation v-else app bottom grow>
      <v-btn to="/profile">
        <span>Profile</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn to="/posts">
        <span>Posts</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn to="/med">
        <span>patients</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>

      <v-btn to="/about">
        <span>About</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class NavbarView extends Vue {
  get isAuthenticated() {
    return this.$store.getters.isAuthenticated;
  }
  get user() {
    return this.$store.getters.getUser;
  }
  logOut() {
    this.$store.commit("setUser", {});
    this.$store.commit("setToken", null);
    this.$store.commit("authenticate", false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.$router.push("/login");
  }
}
</script>

<style scoped>
.v-item-group.v-bottom-navigation .v-btn.v-size--default {
  height: inherit;
}
</style>
