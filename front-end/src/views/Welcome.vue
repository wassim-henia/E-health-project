<template>
  <v-content style="height:100vh">
    <v-sheet :color="color" height="100%">
      <v-row class="fill-height" align="center" justify="center">
        <div class="display-3">{{ slide }} &nbsp;</div>
        <v-btn outlined rounded large to="/signup">
          <span>Start</span>
          <v-icon>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
        <v-btn rounded large text to="/login">
          <span>Already have an account ?</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-row>
    </v-sheet>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Welcome extends Vue {
  slide = "Welcome";
  color = "blue lighten-1";
}
</script>
