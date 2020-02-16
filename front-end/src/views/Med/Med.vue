<template>
  <patient-table :patients="patients" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import patientTable from "../../components/Med/patientTable.vue";
import { IUser } from "../../models/User.model";
import axios from "axios";
@Component({ components: { patientTable } })
export default class Profile extends Vue {
  get user() {
    return this.$store.getters.getUser;
  }
  patients: IUser[] = [];
  async mounted() {
    const response = await axios.get(
      "/api/v1/medecin/patients",
      this.user.patients
    );
    this.patients = response.data;
  }
}
</script>
