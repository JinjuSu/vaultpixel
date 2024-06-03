<template>
  <!-- Footer -->
  <MDBFooter bg="dark" :text="['center', 'white']">
    <!-- Grid container -->
    <MDBContainer class="p-4">
      <!-- Section: Social media -->
      <section class="mb-4">
        <!-- Facebook -->
        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
          ><MDBIcon iconStyle="fab" icon="facebook-f"
        /></a>
        <!-- Twitter -->
        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
          ><MDBIcon iconStyle="fab" icon="twitter"
        /></a>
        <!-- Google -->
        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
          ><MDBIcon iconStyle="fab" icon="google"
        /></a>
        <!-- Instagram -->
        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
          ><MDBIcon iconStyle="fab" icon="instagram"
        /></a>
        <!-- Linkedin -->
        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
          ><MDBIcon iconStyle="fab" icon="linkedin-in"
        /></a>
        <!-- Github -->
        <a
          class="btn btn-outline-light btn-floating m-1"
          href="#!"
          role="button"
          ><MDBIcon iconStyle="fab" icon="github"></MDBIcon
        ></a>
      </section>
      <!-- Section: Social media -->
      <!-- Section: Form -->
      <section class="">
        <form action="">
          <!--Grid row-->
          <MDBRow center class="d-flex">
            <!--Grid column-->
            <MDBCol auto>
              <p class="pt-2">
                <strong>Sign up for our newsletter</strong>
              </p>
            </MDBCol>
            <!--Grid column-->
            <!--Grid column-->
            <MDBCol md="5" col="12">
              <!-- Email input -->
              <MDBInput
                white
                type="email"
                id="form5Example2"
                label="Email address"
                wrapperClass="mb-4"
              />
            </MDBCol>
            <!--Grid column-->
            <!--Grid column-->
            <MDBCol auto>
              <!-- Submit button -->
              <MDBBtn outline="light" class="mb-4"> Subscribe </MDBBtn>
            </MDBCol>
            <!--Grid column-->
          </MDBRow>
          <!--Grid row-->
        </form>
      </section>
    </MDBContainer>
    <!-- Grid container -->
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
      © 2020 Copyright:
      <a class="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
    </div>
    <!-- Copyright -->
  </MDBFooter>
  <!-- Footer -->
</template>

<script>
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBInput,
} from "mdb-vue-ui-kit";

export default {
  name: "Footer",
  components: {
    MDBFooter,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBBtn,
    MDBInput,
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
