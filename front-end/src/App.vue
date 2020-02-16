<template>
  <div id="app">
    <span class="bg"></span>
    <v-app>
      <v-content style="height:100vh;">
        <navbar style="height:46px" />
        <router-view />
        <v-container>
          <v-snackbar v-model="snackbar" :timeout="0">
            update available!
            <v-btn color="pink" outlined @click="reload">Update</v-btn>
            <v-btn color="pink" text @click="snackbar = false">Dismiss</v-btn>
          </v-snackbar>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "@/components/shared/Navbar.vue";
import { IUser } from "@/models/User.model";
import axios from "axios";

@Component({
  components: { Navbar }
})
export default class App extends Vue {
  snackbar: boolean = false;

  get token() {
    return this.$store.getters.getToken;
  }
  get user() {
    return this.$store.getters.getUser;
  }

  reload() {
    window.location.reload();
  }
  mounted() {
    const token: any = localStorage.getItem("token");
    const user: any = localStorage.getItem("user");
    if (token === null || user === null) {
      this.$router.push("/welcome");
    } else {
      this.$store.commit("setUser", JSON.parse(user));
      this.$store.commit("setToken", token);
      this.$store.commit("authenticate", true);
      this.$router.push("/profile");
    }
    const channel = new BroadcastChannel("sw-messages");
    channel.addEventListener("message", event => {
      if (event.data.title == "update") {
        this.snackbar = true;
        console.log(event.data.features);
      }
    });
    this.getNotifications();
  }

  async getNotifications() {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.ready;
    console.log("Service Worker Registered...");

    // Register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          "BN26aeTelL2mfXmF-iJPk29IGM0Hg7qZeDPiyXslJ0unjxYdqiVxWMjRt63qcIu90rOZ2Cmin0HsxH-xUxj78a8"
        )
      })
      .then(async sub => {
        console.log("Push Registered...");
        console.log(sub);
        // Send Push Notification
        console.log("Sending Push...");
        await axios.post("/subscribe", {
          push: sub,
          user: this.user._id
        });
        console.log("Push Sent...");
      });
  }
  urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}
</script>

<style>
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-size: cover;
  background-image: url("./assets/back.jpg");
}
</style>
