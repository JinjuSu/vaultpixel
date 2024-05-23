<template>
  <Navbar></Navbar>

  <!-- Default code -->
  <!-- Passing on `user` to other pages/components -->
  <router-view :user="user" />

  <div class="sitcky-bottom"><Footer></Footer></div>
</template>
<!-- Navbar script -->
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
}
</style>
