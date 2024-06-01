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
        <MDBBtn color="dark" @click="signOut"> Log out</MDBBtn>
      </div>

      <MDBBtn color="dark"> Sign up</MDBBtn>
      <MDBBtn outline="dark">Log in</MDBBtn>
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
import { getAuth, signOut } from "firebase/auth";

export default {
  name: "NavbarComp",
  data() {
    return {
      cartItems,
    };
  },
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
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
