<template>
  <v-content>
    <v-container fluid fill-height style="margin-top:15vh">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://scontent.ftun8-1.fna.fbcdn.net/v/t1.15752-9/86459490_220171482473345_5696462446634467328_n.jpg?_nc_cat=100&_nc_ohc=8dxOGDhdWQoAX9VQzfE&_nc_ht=scontent.ftun8-1.fna&oh=564f4101ebf1a97113e4891e2dd4e1f5&oe=5EC63D26"
        >
          <v-card-title>First time ?</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">Why should I use this ?</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>fill out the form right now to find out how you are doing!</div>
        </v-card-text>

        <v-card-actions>
          <v-btn to="/form" color="orange" text>Fill Form</v-btn>
        </v-card-actions>
      </v-card>
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          src="https://scontent.ftun8-1.fna.fbcdn.net/v/t1.15752-9/86662716_535317473755581_348262736070705152_n.jpg?_nc_cat=107&_nc_ohc=hwZa9Pc00oEAX8T_8kL&_nc_ht=scontent.ftun8-1.fna&oh=7056a815ee0262de576eac474a2fb507&oe=5EFB8EEE"
        >
          <v-card-title>Already done?</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0"></v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Send your scans right now to find out about your health risks!</div>
        </v-card-text>

        <v-card-actions>
          <v-btn to="/scan" color="orange" text>Send Scan</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Sante extends Vue {}
</script>
