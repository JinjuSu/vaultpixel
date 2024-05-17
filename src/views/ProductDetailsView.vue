<template>
  <h1>This is Product Details page</h1>
  <p>This the product: {{ product }}</p>
  <h1>{{ product.id }}</h1>
  <h1>{{ product.name }}</h1>
</template>
<script>
import { products } from "../assets/product-details/products.js";

export default {
  name: "ProductDetailsView",
  data() {
    return {
      // Use a few extra object to loop the product id
      products,
      product: {},
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
