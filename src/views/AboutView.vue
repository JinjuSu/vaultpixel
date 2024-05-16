<template>
  <div class="container">
    <h1>This is about page</h1>
    <div class="container my-5">
      <!-- Search bar -->
      <MDBInput class="mb-4" v-model="search7" placeholder="search" />
      <div class="row">
        <div class="col-3">
          <!-- Filter column -->
          <h3>Find your safest vault</h3>
          <div>
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
                    <div v-if="collapse1">
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
                    <img
                      src="../assets/icons/arrow-icon-up.webp"
                      alt="arrow-up"
                      class="image-icon"
                  /></MDBBtn>
                </div>
              </div>
            </div>
            <MDBCollapse id="fliter-price" v-model="collapse3">
              <div class="mt-3">Collapse 3: Price options</div>
            </MDBCollapse>
          </div>
        </div>
        <!-- Product column 3 cards per row -->
        <div class="col-9">
          <div class="row">
            <div class="col">
              <div class="card">
                <div
                  class="bg-image hover-overlay"
                  data-mdb-ripple-init
                  data-mdb-ripple-color="light"
                >
                  <img
                    src="../assets/wallets/Ledger_Nano_S.webp"
                    class="img-fluid"
                  />
                  <a href="#!">
                    <div
                      class="mask"
                      style="background-color: rgba(251, 251, 251, 0.15)"
                    ></div>
                  </a>
                </div>
                <div class="card-body">
                  <h5 class="card-title">Ledger Nano S</h5>
                  <p class="card-text">AU$ 299.99</p>
                  <p class="text-warning">rating stars</p>
                  <a
                    href="#!"
                    class="btn btn-sm btn-dark button-shop"
                    data-mdb-ripple-init
                    >Shop now</a
                  >
                </div>
              </div>
            </div>
            <div class="col"><h3>card 2 let vue fetch it by loop</h3></div>
            <div class="col"><h3>card 2 let vue fetch it by loop</h3></div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
