import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import defaultClient from "./apolloClient";
import vueApollo from "vue-apollo";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.config.productionTip = false;

const apolloProvider = new vueApollo({
  defaultClient
});
Vue.use(vueApollo);

new Vue({
  router,
  store,
  apolloProvider,
  vuetify,
  render: h => h(App)
}).$mount("#app");
