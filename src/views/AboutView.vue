<template>
  <MDBContainer class="my-5"><h1>This is About page</h1></MDBContainer>
</template>

<script>
import {
  MDBContainer,
  MDBCollapse,
  MDBBtn,
  MDBInput,
  MDBAutocomplete,
  MDBIcon,
} from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {
  name: "About",
  components: {
    MDBContainer,
    MDBCollapse,
    MDBBtn,
    MDBInput,
    MDBAutocomplete,
    MDBIcon,
  },
  setup() {
    const search7 = ref("");

    const collapse1 = ref(false);
    const collapse2 = ref(false);
    const collapse3 = ref(false);
    return {
      search7,
      collapse1,
      collapse2,
      collapse3,
    };
  },
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>
