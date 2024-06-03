<template>
  <Navbar :user="user"></Navbar>

  <!-- Passing on `user` prop to other pages/components -->
  <router-view :user="user" />

  <div class="sitcky-bottom"><Footer></Footer></div>
</template>
<script>
import Navbar from "./components/NavbarComp.vue";
import Footer from "./components/FooterComp.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  height: 100%;
}
</style>
