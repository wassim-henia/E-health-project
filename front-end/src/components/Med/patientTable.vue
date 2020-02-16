<template>
  <v-container fluid class="fill-height">
    <v-card
      v-for="user in patients"
      v-bind:key="user._id"
      class="mx-auto"
      max-width="434"
      tile
    >
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
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IUser } from "../../models/User.model";
@Component
export default class PatientTable extends Vue {
  @Prop()
  patients!: IUser[];
}
</script>
