<template>
  <div class="container my-5">
    <div class="row justify-content-center text-center gx-5">
      <div class="col-8 col-md-6">
        <img
          class="img-fluid rounded-start"
          :src="product.image"
          alt="first-card"
        />
      </div>

      <div class="col-8 col-md-6">
        <!-- Details go here -->
        <div class="text-start">
          <h1>{{ product.name }}</h1>
          <p>{{ product.description }}</p>
          <p>{{ product.price }}</p>
          <p>rating: {{ product.rating }}/5</p>
        </div>
        <div>
          <router-link :to="'/product/' + product.id">
            <a
              href="#!"
              class="btn btn-sm btn-dark button-shop"
              data-mdb-ripple-init
            >
              Add to cart
            </a></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { products } from "../assets/product-details/products.js";

export default {
  name: "ProductDetailsView",
  data() {
    return {
      // Use a few extra object to loop the product id
      products,
      product: {
        id: "",
        name: "",
        price: "",
        description: "",
        rating: "",
        image: "",
      },
      //   product: products.find( // this method returns null making product undefined
      //     (product) => product.id === this.$route.params.productId
      //   ),
    };
  },
  computed: {
    filterProducts: function () {
      return this.products.filter((product) => {
        return product.name // products please return item names that matche the searchProduct.name
          .toLowerCase()
          .includes(this.product);
      });
    },
  },
  mounted() {
    const productId = this.$route.params.id;
    this.product = products.find(
      (product) => product.id.toString() === productId
    );
    console.log("Product ID:", productId);
    console.log("Product Details:", this.product);
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
