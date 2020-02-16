<template>
  <v-container fluid class="fill-height">
    <v-card class="mx-auto my-auto" width="500" height="300" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">Question : {{ i + 1 }}</div>
          <v-list-item-title class="headline mb-4"></v-list-item-title>
          <v-content class="display-1" style="height:120px">{{
            question[i]
          }}</v-content>
          <v-list-item-subtitle class></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-checkbox v-model="check" class="mx-auto" label="Yes"></v-checkbox>

        <v-btn class="mx-auto" @click="next()" :disabled="dis"
          >Next Question</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import medecinTable from "../../components/Med/medecinTable.vue";
import axios from "axios";
import { IUser } from "../../models/User.model";
@Component
export default class Form extends Vue {
  dialog = false;
  notifications = false;
  sound = true;
  widgets = false;

  i = 0;
  c1 = 0;
  c2 = 0;
  c3 = 0;
  check = false;
  question = [
    "Do you regularly get a high fever?",
    "Do you often cough?",
    "Are you often short of breath?",
    "Do you often have accelerated heartbeats?",
    "Do you sometimes feel pain in your back, especially when breathing in?",
    "Do you often feel tired or weak for no apparent reason?",
    "Do you often suffer from a headache?",
    "Have you ever had a stroke?",
    "Have you ever had vision problems?",
    "Do you sometimes vomit after having a headache?",
    "Do you sometimes have difficulty walking or speaking?",
    "Do you sometimes fall unconscious for no apparent reason?",
    "Have you ever had Breast pain?",
    "have you ever checked your breasts for lumps?",
    "Did you experience Breast redness or swelling?",
    "Have you had a prior breast injury?",
    "Have you had a prior mammogram?",
    "Have you ever been diagnosed with breast Cancer?",
    "Have you ever had breast Implants?"
  ];
  disable = true;
  dis = false;
  result1 = "you doing okay!";
  result2 = "you doing okay!";
  result3 = "you doing okay!";
  result4 = "";
  medecins: IUser[] = [];
  async next() {
    if (this.i <= 6 && this.check) {
      this.c1++;
      this.check = false;
      this.i++;
      return;
    }
    if (this.i <= 11 && this.check) {
      this.c2++;
      this.check = false;
      this.i++;
      return;
    }
    if (this.check) this.c3++;
    this.i++;
    this.check = false;

    if (this.i >= 18) {
      this.dis = true;
      this.disable = false;

      // this.$router.push("/profile");
      if (this.c1 >= 5) {
        this.result1 =
          "there is a strong possibility that you might have pneumonia,try taking chest scans and sending them through the application to further keep track of your health .";
      }
      if (this.c2 >= 5)
        this.result2 =
          "there is a strong possibility that you might be experiencing a brain tumor, try taking radiographic scans and send them through the application to confirm your health situation.";
      if (this.c3 >= 5)
        this.result3 +=
          " There is a strong possibility that you may have breast cancer, immediatly check with your physician or send a scan through the application to further confirm your health situation.";
      if (this.c1 + this.c2 + this.c3 >= 14) {
        this.result4 +=
          " You should immediatly consult with one of the doctors presented in the list above";
      }
      if (this.result3 == this.result2 && this.result2 == this.result1) {
        this.result2 = "";
        this.result3 = "";
      }
    }
  }
}
</script>
