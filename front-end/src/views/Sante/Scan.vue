<template>
  <v-container>
    <v-form method="POST" action="/api/v1/upload">
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Pneumonia</v-card-title>

            <v-card-subtitle
              >Pneumonia can be a deadly disease in time of winter, upload scans
              right now to find out if you might have it !</v-card-subtitle
            >

            <v-card-actions>
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Upload Scan"
                prepend-icon="mdi-camera"
              ></v-file-input>
              <v-btn color="primary" text width="125" @click="submit()"
                >send</v-btn
              >
              <v-text-field style="display:none" value="chest"></v-text-field>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <v-form method="POST" action="/api/v1/upload">
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Brain Tumor Detection</v-card-title>

            <v-card-subtitle>
              Having a lot of headaches, losing consciousness or having trouble
              walking / talking ? upload scans right now to help us better
              understand your condition!
            </v-card-subtitle>

            <v-card-actions>
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Upload Scan"
                prepend-icon="mdi-camera"
              ></v-file-input>
              <v-btn color="primary" text width="125" @click="submit()"
                >send</v-btn
              >
              <v-text-field style="display:none" value="brain"></v-text-field>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
    <v-form method="POST" action="/api/v1/upload">
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" dark>
            <v-card-title class="headline">Breast Cancer</v-card-title>

            <v-card-subtitle
              >Do you think you might have breast cancer ? upload scans right
              now so our specialized A.I can help you diagnose it
              !</v-card-subtitle
            >

            <v-card-actions>
              <v-file-input
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Upload Scan"
                prepend-icon="mdi-camera"
              ></v-file-input>
              <v-btn color="primary" text width="125" @click="submit()"
                >send</v-btn
              >
              <v-text-field style="display:none" value="breast"></v-text-field>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Scan extends Vue {}
</script>
