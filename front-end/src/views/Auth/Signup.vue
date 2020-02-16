<template>
  <v-container fluid class="fill-height">
    <signup-form @signUp="signUp" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { register } from "@/graphql/auth";
import { IUser } from "../../models/User.model";
import SignupForm from "@/components/auth/SignUpForm.vue";
@Component({
  components: { SignupForm }
})
export default class SignUpView extends Vue {
  async signUp(user: IUser) {
    try {
      const res = await this.$apollo.mutate({
        mutation: register(user)
      });
      const data = res.data;
      this.$store.commit("setUser", data.login.user);
      this.$store.commit("setToken", data.login.token);
      this.$store.commit("authenticate", true);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      localStorage.setItem("token", data.login.token);
      this.$router.push("/profile");
    } catch {
      alert("no internet");
    }
  }
}
</script>

<style></style>
