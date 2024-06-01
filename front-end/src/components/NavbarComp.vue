<template>
  <MDBNavbar expand="lg" light bg="light" container>
    <MDBNavbarBrand href="#" class="fw-bold"
      ><router-link class="link-text" to="/products"
        >VaultPixel</router-link
      ></MDBNavbarBrand
    >
    <MDBNavbarToggler
      @click="collapse1 = !collapse1"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem to="#" active>
          <router-link class="link-text" to="/">Home</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
          <router-link class="link-text" to="/products">Products</router-link>
        </MDBNavbarItem>
        <MDBNavbarItem href="#">
          <router-link class="link-text" to="/about">About</router-link>
        </MDBNavbarItem>
      </MDBNavbarNav>

      <div>
        <MDBBtn color="dark" @click="signOut" v-if="user"> Log out</MDBBtn>
      </div>

      <!-- <MDBBtn color="dark"> Sign up</MDBBtn> -->
      <MDBBtn outline="dark" @click="signIn" v-if="!user">Log in</MDBBtn>
      <!-- Cart icon logic -->

      <MDBBtn v-if="cartItems.length > 0" color="light"
        ><router-link to="/cart"
          ><img
            class="image-icon-cart"
            src="../assets/icons/cart-item-icon.png" /></router-link
      ></MDBBtn>

      <MDBBtn v-else-if="cartItems.length === 0" color="light"
        ><router-link to="/cart"
          ><img
            class="image-icon-cart"
            src="../assets/icons/cart-icon.png" /></router-link
      ></MDBBtn>
    </MDBCollapse>
  </MDBNavbar>
</template>
<!-- Navbar script -->
<script>
import {
  MDBBtn,
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from "mdb-vue-ui-kit";
import { ref } from "vue";

import { cartItems } from "@/assets/product-details/products";
import {
  getAuth,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signOut,
} from "firebase/auth";

export default {
  name: "NavbarComp",
  data() {
    return {
      cartItems,
    };
  },
  props: ["user"], // getting user props passed down from App.vue
  components: {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
  },
  setup() {
    const collapse1 = ref(false);
    const dropdown1 = ref(false);
    return {
      collapse1,
      dropdown1,
    };
  },
  methods: {
    signOut() {
      const auth = getAuth();
      signOut(auth);
    },
    async signIn() {
      const email = prompt("Please enter your email to sign in");
      const auth = getAuth();
      const actionCodeSettings = {
        url: `https://fj16bq7r-8080.aue.devtunnels.ms/product/${this.$route.params.id}`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      alert("A login link was sent to the email you provided");
      window.localStorage.setItem("emailForSignIn", email); // open modal
    },
  },
  async created() {
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      await signInWithEmailLink(auth, email, window.location.href);
      alert("Successfully signed in");
      window.localStorage.removeItem("emailForSignIn"); // close modal
    }

    if (this.user) {
      console.log("this user: ", this.user);
      console.log("this UID: ", this.user.uid);
    }
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
