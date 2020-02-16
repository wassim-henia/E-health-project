<template>
  <v-card class="mx-auto" max-width="434" tile>
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
          <v-expansion-panels popout>
            <v-expansion-panel
              v-for="(message, i) in messages"
              :key="i"
              hide-actions
            >
              <v-expansion-panel-header>
                <v-row align="center" class="spacer" no-gutters>
                  <v-col cols="4" sm="2" md="1">
                    <v-avatar size="36px">
                      <img v-bind:src="message.icon" />
                      <!--<v-icon v-else :color="message.color" v-text="message.icon"></v-icon>-->
                    </v-avatar>
                  </v-col>

                  <v-col class="hidden-xs-only" sm="5" md="3">
                    <strong v-html="message.name"></strong>
                    <span v-if="message.total" class="grey--text"
                      >&nbsp;({{ message.total }})</span
                    >
                  </v-col>

                  <v-col class="text-no-wrap" cols="5" sm="3">
                    <v-chip
                      v-if="message.new"
                      :color="`${message.color} lighten-4`"
                      class="ml-0 mr-2 black--text"
                      label
                      small
                      >{{ message.new }} new</v-chip
                    >
                    <strong v-html="message.title"></strong>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-divider></v-divider>
                <v-card-text v-text="lorem"></v-card-text>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-container>
    </v-card>
    <div class="text-center">
      <v-dialog v-model="dialog" width="500">
        <template v-slot:activator="{ on }">
          <v-btn color="red lighten-2" dark v-on="on">
            Add note
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline grey lighten-2" primary-title>
            Note
          </v-card-title>

          <v-container fluid>
            <v-textarea clearable label="Text"></v-textarea>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="primary" text @click="Send()">
              Send
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Note extends Vue {
  get user() {
    return this.$store.getters.getUser;
  }
  messages = [
    {
      icon:
        "https://cdn2.iconfinder.com/data/icons/breast-cancer-4/512/Breast-cancer-disease-20-512.png",

      title: "Breast Cancer",
      excerpt: "Thank you for joining our community..."
    },
    {
      color: "red",
      icon:
        "https://cdn1.iconfinder.com/data/icons/medical-sick/500/Medical-73-512.png",
      title: "Pneumonia"
    },
    {
      color: "teal",
      icon:
        "https://previews.123rf.com/images/gritsalak/gritsalak1801/gritsalak180100004/92849263-brain-tumor-vector-icon-.jpg",
      title: "Brain Tumor Detection",

      exceprt: "New deals available, Join Today"
    }
  ];
  lorem =
    "Lorem ipsum dolor sit amet, at aliquam vivendum vel, everti delicatissimi cu eos. Dico iuvaret debitis mel an, et cum zril menandri. Eum in consul legimus accusam. Ea dico abhorreant duo, quo illum minimum incorrupte no, nostro voluptaria sea eu. Suas eligendi ius at, at nemore equidem est. Sed in error hendrerit, in consul constituam cum.";
  Send() {}
}
</script>
