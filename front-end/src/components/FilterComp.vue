<template>
  <div class="container my-3">
    <h3>Find your safest vault</h3>
    <!-- Filter by Type -->
    <div class="row my-3">
      <div class="col-auto me-auto">Type</div>
      <div class="col-auto">
        <div type="button">
          <MDBBtn
            color="light"
            @click="collapse1 = !collapse1"
            aria-controls="fliter-type"
            :aria-expanded="collapse1"
          >
            <div v-if="!collapse1">
              <img
                src="../assets/icons/arrow-icon-up.webp"
                alt="arrow-up"
                class="image-icon"
              />
            </div>
            <div v-else-if="collapse1">
              <img
                src="../assets/icons/arrow-icon-right.png"
                alt="arrow-up"
                class="image-icon"
              />
            </div>
          </MDBBtn>
        </div>
      </div>
    </div>
    <MDBCollapse id="fliter-type" v-model="collapse1">
      <div class="mt-3">Collapse 1: Price options</div>
    </MDBCollapse>
    <hr />
    <!-- Filter by Brand -->
    <div class="row my-3">
      <div class="col-auto me-auto">Brand</div>
      <div class="col-auto">
        <div type="button">
          <MDBBtn
            color="light"
            @click="collapse2 = !collapse2"
            aria-controls="filter-brand"
            :aria-expanded="collapse2"
          >
            <div v-if="!collapse2">
              <img
                src="../assets/icons/arrow-icon-up.webp"
                alt="arrow-up"
                class="image-icon"
              />
            </div>
            <div v-else-if="collapse2">
              <img
                src="../assets/icons/arrow-icon-right.png"
                alt="arrow-up"
                class="image-icon"
              />
            </div>
          </MDBBtn>
        </div>
      </div>
    </div>
    <MDBCollapse id="fliter-brand" v-model="collapse2">
      <div class="mt-3">Collapse 2: Brand options</div>
    </MDBCollapse>
    <hr />
    <!-- Filter by Price -->
    <div class="row my-2">
      <div class="col-auto me-auto">Price</div>
      <div class="col-auto">
        <div type="button">
          <MDBBtn
            color="light"
            @click="collapse3 = !collapse3"
            aria-controls="fliter-price"
            :aria-expanded="collapse3"
          >
            <div v-if="!collapse3">
              <img
                src="../assets/icons/arrow-icon-up.webp"
                alt="arrow-up"
                class="image-icon"
              />
            </div>
            <div v-if="collapse3">
              <img
                src="../assets/icons/arrow-icon-right.png"
                alt="arrow-up"
                class="image-icon"
              />
            </div>
          </MDBBtn>
        </div>
      </div>
    </div>
    <MDBCollapse id="fliter-price" v-model="collapse3">
      <div class="mt-3">Collapse 3: Price options</div>
    </MDBCollapse>
  </div>
</template>

<script>
import {
  MDBContainer,
  MDBCollapse,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBPagination,
  MDBPageNav,
  MDBPageItem,
} from "mdb-vue-ui-kit";
import { ref } from "vue";

export default {
  name: "FilterComp",
  data() {
    return {};
  },
  components: {
    MDBContainer,
    MDBCollapse,
    MDBBtn,
    MDBInput,
    MDBIcon,
    MDBPagination,
    MDBPageNav,
    MDBPageItem,
  },
  setup() {
    const collapse1 = ref(false);
    const collapse2 = ref(false);
    const collapse3 = ref(false);
    return {
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
