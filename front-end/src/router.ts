import Vue from "vue";
import Router from "vue-router";
import Profile from "./views/Profile.vue";
import Posts from "./views/Posts/Posts.vue";
import Login from "./views/Auth/Login.vue";
import Signup from "./views/Auth/Signup.vue";
import Welcome from "./views/Welcome.vue";
import Sante from "./views/Sante/Sante.vue";
import Scan from "./views/Sante/Scan.vue";
import Form from "./views/Sante/Form.vue";
import Note from "./views/Med/Note.vue";
import Med from "./views/Med/Med.vue";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    { path: "/posts", name: "posts", component: Posts },
    { path: "/login", name: "login", component: Login },
    { path: "/signup", name: "signup", component: Signup },
    { path: "/welcome", name: "welcome", component: Welcome },
    { path: "/sante", name: "sante", component: Sante },
    { path: "/scan", name: "scan", component: Scan },
    { path: "/form", name: "form", component: Form },
    { path: "/note", name: "note", component: Note },
    { path: "/med", name: "med", component: Med }
  ]
});
/*
const safeLinks = ["/login", "/signup", "/about", "/home"];
function isSafe(toLink: string) {
  safeLinks.forEach(link => {
    console.log(link == toLink);
    if (link == toLink) return true;
    return false;
  });
}*/

/*
router.beforeEach((to, from, next) => {
  // @ts-ignore
  if (
    localStorage.getItem("token") === null &&
    to.fullPath != "/login" &&
    to.fullPath != "/signup" &&
    to.fullPath != "/about" &&
    to.fullPath != "/welcome"
  )
    next("/welcome");
  else next();
});
*/

export default router;
