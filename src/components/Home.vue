<template>
  <div class="container">
    <MDBContainer>
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 100vh"
      >
        <div class="text-center">
          <h1>This is Home page</h1>
          <img
            class="mb-4"
            src="https://mdbootstrap.com/img/logo/mdb-transparent-250px.png"
            style="width: 250px; height: 90px"
          />
        </div>
      </div>
    </MDBContainer>
  </div>
</template>

<script>
import { MDBContainer } from "mdb-vue-ui-kit";

export default {
  name: "Home",
  components: {
    MDBContainer,
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
