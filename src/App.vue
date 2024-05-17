<template>
  <Navbar></Navbar>

  <!-- Default code -->
  <router-view />
  <Footer></Footer>
</template>
<!-- Navbar script -->
<script>
import Navbar from "./components/NavbarComp.vue";
import Footer from "./components/FooterComp.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
