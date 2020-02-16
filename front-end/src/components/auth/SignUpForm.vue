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
              <v-toolbar-title>Sign Up</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="firstName"
                  name="firstName"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="user.firstName"
                ></v-text-field>

                <v-text-field
                  id="lastName"
                  label="lastName"
                  name="password"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="user.lastName"
                ></v-text-field>

                <v-radio-group row>
                  <v-radio
                    label="Female"
                    color="indigo"
                    value="F"
                    v-model="user.gender"
                  ></v-radio>

                  <v-radio
                    label="Male"
                    color="indigo"
                    value="M"
                    v-model="user.gender"
                  >
                  </v-radio>
                </v-radio-group>

                <v-col cols="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        full-width
                        v-model="user.Birthday"
                        label="Picker in menu"
                        prepend-icon="mdi-calendar"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false"
                        >Cancel</v-btn
                      >
                      <v-btn text color="primary" @click="$refs.menu.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>

                <v-text-field
                  id="phone"
                  label="Phone Number"
                  name="phone"
                  prepend-icon="mdi-cellphone-android"
                  type="phone"
                  v-model="user.phone"
                ></v-text-field>
                <v-text-field
                  id="email"
                  label="email"
                  name="password"
                  prepend-icon="mdi-at"
                  type="email"
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
              <v-btn height="48px" text to="/login">
                already Have an Account?
                <br />Log In Now!
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signUp" @keyup.enter="signUp"
                >Sign Up</v-btn
              >
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
export default class SignUpFormView extends Vue {
  user: IUser = {};
  signUp(e: Event) {
    e.preventDefault();
    this.user.gender = "female";
    this.user.birthday = new Date();
    this.$emit("signUp", this.user);
  }

  date = new Date().toISOString().substr(0, 10);
  menu = false;
  modal = false;
  menu2 = false;
}
</script>
