<template>
  <v-card class="mx-auto" max-width="434" tile>
    <v-img
      height="10%"
      src="https://www.filepicker.io/api/file/1n8CIadTZKwfyI2dL5XA"
    >
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="4">
          <v-avatar class="profile" color="grey" size="164" tile>
            <v-img
              src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"
            ></v-img>
          </v-avatar>
        </v-col>

        <v-col align-self="start" class="py-0" cols="7">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-subtitle>
                <label>FirstName :</label>
                {{ user.firstName }}
              </v-list-item-subtitle>
              <v-list-item-title></v-list-item-title>
              <v-list-item-subtitle>
                <label>LastName :</label>
                {{ user.lastName }}
              </v-list-item-subtitle>
              <v-list-item-title></v-list-item-title>
              <v-list-item-subtitle>
                <label>Phone number :</label>
                {{ user.Phone }}
              </v-list-item-subtitle>
              <v-list-item-title></v-list-item-title>
              <v-list-item-subtitle>
                <label>Gender :</label>
                {{ user.Gender }}
              </v-list-item-subtitle>
              <v-list-item-title></v-list-item-title>
              <v-list-item-subtitle>
                <label>Birthday :</label>
                {{ user.Birthday }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
    <v-container fluid>
      <v-row justify="center">
        <v-subheader>Medical history</v-subheader>
        <v-expansion-panels>
          <v-expansion-panel v-for="scan in scans" :key="scan._id">
            <v-expansion-panel-header>{{
              scan.createdAt
            }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="center">
                {{ scan.result }}%
                <v-img height="125" width="125" :src="scan.link" />
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { IScan } from "../models/Scan.model";
@Component
export default class Profile extends Vue {
  get user() {
    return this.$store.getters.getUser;
  }

  scans: IScan[] = [];

  async mounted() {
    const response = await axios.get("/api/v1/patient/getscans", this.user._id);
    this.scans = response.data;
  }
}
</script>
