<template>
  <v-content>
    <v-btn rounded to="/welcome">
      <v-icon color="accent">mdi-arrow-left-circle</v-icon>
    </v-btn>
    <v-container fluid class="fill-height">
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="email"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="user.email"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="user.password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn text to="/signup">no account ? Sign Up Now!</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login" @keyup.enter="login">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IUser } from "../../models/User.model";
@Component({})
export default class LoginFormView extends Vue {
  user: IUser = {};
  login(e: Event) {
    e.preventDefault();
    this.$emit("login", this.user);
  }
}
</script>
