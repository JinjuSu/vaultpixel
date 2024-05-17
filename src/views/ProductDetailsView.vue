<template>
  <h1>Product Details Page</h1>
  <div class="row">
    <div class="col-4" v-for="product in filterProducts" :key="product.id">
      <div class="card grid-wrap">
        <div class="card-header text-center">
          <img class="image-product" :src="product.image" />
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.price }}</p>
          <a
            href="#!"
            class="btn btn-sm btn-dark button-shop"
            data-mdb-ripple-init
            >Shop now</a
          >
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
  MDBIcon,
  MDBPagination,
  MDBPageNav,
  MDBPageItem,
} from "mdb-vue-ui-kit";
import { ref } from "vue";
import { products } from "../assets/product-details/products.js";

export default {
  name: "ProductDetailsView",
  data() {
    return {
      searchProduct: {
        id: "",
        name: "",
        price: "",
      },
      products,
    };
  },
  computed: {
    filterProducts: function () {
      return this.products.filter((product) => {});
    },
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
