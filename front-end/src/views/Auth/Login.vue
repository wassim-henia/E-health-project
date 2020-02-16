<template>
  <v-container fluid class="fill-height">
    <login-form @login="login" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login } from "@/graphql/auth";
import { IUser } from "../../models/User.model";
import LoginForm from "@/components/auth/LoginForm.vue";
@Component({
  components: { LoginForm }
})
export default class LoginView extends Vue {
  async login(user: IUser) {
    try {
      const res = await this.$apollo.mutate({
        mutation: login(user)
      });
      const data = res.data;
      this.$store.commit("setUser", data.login.user);
      this.$store.commit("setToken", data.login.token);
      this.$store.commit("authenticate", true);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      localStorage.setItem("token", data.login.token);
      this.$router.push("/profile");
    } catch {
      alert("wrong email/password");
    }
  }
}
</script>
