<template>
  <div class="container my-5">
    <!-- Search bar -->
    <p>{{ test }}</p>
    <p>{{ products }}</p>
    <MDBInput class="mb-4" v-model="searchProduct" placeholder="Search" />
    <div class="row mb-4">
      <div class="col-3">
        <!-- Filter column -->
        <FilterComp></FilterComp>
      </div>
      <!-- Product column 3 cards per row -->
      <div class="col">
        <div class="row">
          <div
            class="col-4"
            v-for="product in filterProducts"
            :key="product.id"
          >
            <div class="card grid-wrap">
              <div class="card-header text-center">
                <img class="image-product" :src="product.image" />
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.price }}</p>
                <router-link :to="'/product/' + product.id">
                  <a
                    href="#!"
                    class="btn btn-sm btn-dark button-shop"
                    data-mdb-ripple-init
                  >
                    Shop now
                  </a></router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example" back>
      <MDBPagination>
        <MDBPageNav prev disabled></MDBPageNav>
        <MDBPageItem href="#">1</MDBPageItem>
        <MDBPageItem icon active href="#">2</MDBPageItem>
        <MDBPageItem href="#">3</MDBPageItem>
        <MDBPageNav next icon></MDBPageNav>
      </MDBPagination>
    </nav>
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
import { products } from "../assets/product-details/products.js";

import FilterComp from "../components/FilterComp.vue";

export default {
  name: "Products",
  data() {
    return {
      searchProduct: {
        id: "",
        name: "",
        price: "",
      },
      products,
      test: "test printing",
    };
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
    FilterComp,
  },
  setup() {
    const searchProduct = ref("");
    const collapse1 = ref(false);
    const collapse2 = ref(false);
    const collapse3 = ref(false);
    return {
      searchProduct,
      collapse1,
      collapse2,
      collapse3,
    };
  },
  computed: {
    filterProducts: function () {
      return this.products.filter((product) => {
        return product.name // products please return item names that matche the searchProduct.name
          .toLowerCase()
          .includes(this.searchProduct.toLowerCase());
      });
    },
  },
};
</script>
