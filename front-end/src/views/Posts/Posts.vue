<template>
  <v-content style="width:60%; margin-left:20%  ">
    <v-container fluid class="mx-auto">
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline "
                  >What to know about breast cancer</v-card-title
                >

                <v-card-subtitle
                  >Breast cancer is the most common invasive cancer in women and
                  the second leading cause of cancer death in women after lung
                  cancer.</v-card-subtitle
                >
                <v-card-actions>
                  <v-btn
                    href="https://www.medicalnewstoday.com/articles/37136"
                    text
                    >Read more</v-btn
                  >
                </v-card-actions>
              </div>

              <v-content class="ma-3" size="125">
                <v-img
                  src="https://www.oncozine.com/wp-content/uploads/2019/05/Fotolia_177556962_Subscription_Monthly_M.jpg"
                  width="125"
                  height="125"
                ></v-img>
              </v-content>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card color="#385F73" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline "
                  >What you should know about pneumonia</v-card-title
                >

                <v-card-subtitle
                  >Pneumonia is an infection of the lungs with a range of
                  possible causes. It can be a serious and life-threatening
                  disease.</v-card-subtitle
                >
                <v-card-actions>
                  <v-btn href="https://www.healthline.com/health/pneumonia" text
                    >Read more</v-btn
                  >
                </v-card-actions>
              </div>

              <v-content class="ma-3" size="125">
                <v-img
                  src="https://images.emedicinehealth.com/images/article/main_image/bacterial-pneumonia-1.jpg"
                  width="125"
                  height="125"
                ></v-img>
              </v-content>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card color="#385F73" dark>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="headline "
                  >Types, symptoms, and treatment of a brain tumor</v-card-title
                >

                <v-card-subtitle
                  >A brain tumor is a mass or growth of abnormal cells in the
                  brain or spinal cord. Many brain tumors are able to disrupt
                  the function of the brain. Others, however, are less
                  harmful.</v-card-subtitle
                >
                <v-card-actions>
                  <v-btn
                    href="https://www.healthline.com/health/brain-tumor"
                    text
                    >Read more</v-btn
                  >
                </v-card-actions>
              </div>

              <v-content class="ma-3" size="125">
                <v-img
                  src="https://assets.labroots.com/_public/_files/system/ck/trending/LR_6e652bc9637a0fc90bb09977d1565b4b.jpg"
                  width="125"
                  height="125"
                ></v-img>
              </v-content>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Posts extends Vue {
  items = [
    {
      color: "#1F7087",
      src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
      title: "Supermodel",
      artist: "Foster the People"
    },
    {
      color: "#952175",
      src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
      title: "Halcyon Days",
      artist: "Ellie Goulding"
    }
  ];
}
</script>
