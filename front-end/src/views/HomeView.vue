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
    <MDBBtn
      tag="a"
      color="primary"
      @click="collapse1 = !collapse1"
      aria-controls="collapsibleContent1"
      :aria-expanded="collapse1"
      >Link</MDBBtn
    >
    <MDBBtn
      color="primary"
      @click="collapse1 = !collapse1"
      aria-controls="collapsibleContent1"
      :aria-expanded="collapse1"
      >Button</MDBBtn
    >
    <MDBCollapse id="collapsibleContent1" v-model="collapse1">
      <div class="mt-3">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </div>
    </MDBCollapse>
  </div>
</template>

<script>
import { MDBContainer, MDBCollapse, MDBBtn } from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {
  name: "Home",
  components: {
    MDBContainer,
    MDBCollapse,
    MDBBtn,
  },
  setup() {
    const collapse1 = ref(false);
    return {
      collapse1,
    };
  },
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
