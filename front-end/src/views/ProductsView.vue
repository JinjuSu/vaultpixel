<template>
  <div class="container my-5">
    <!-- Search bar section -->

    <MDBInput
      class="mb-4"
      v-model="searchProduct"
      placeholder="Search"
      type="search"
    />
    <!-- Product section -->
    <div class="row mb-4">
      <div class="col-3">
        <!-- Filter column -->
        <FilterComp></FilterComp>
      </div>

      <!-- Product column 3 cards per row -->
      <div class="col">
        <div class="row">
          <div
            class="col-lg-4 col-md-6 col-sm-12"
            v-for="product in paginatedProducts"
            :key="product.id"
          >
            <div class="card grid-wrap">
              <div class="image-card-product text-center">
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
    <!-- Pagination section -->
    <div class="row my-5">
      <nav aria-label="Page navigation example">
        <MDBPagination class="justify-content-end text-end">
          <MDBPageNav
            prev
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          ></MDBPageNav>
          <MDBPageItem
            v-for="n in totalPages"
            :key="n"
            :class="{ active: n === currentPage }"
          >
            <a class="page-link" href="#" @click.prevent="changePage(n)">{{
              n
            }}</a>
          </MDBPageItem>
          <MDBPageNav
            next
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          ></MDBPageNav>
        </MDBPagination>
      </nav>
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
import { ref, computed } from "vue";
// import { products } from "../assets/product-details/products.js";

import FilterComp from "../components/FilterComp.vue";
import axios from "axios";

export default {
  name: "Products",
  data() {
    return {
      products: [],
      searchProduct: {
        id: "",
        name: "",
        price: "",
        description: "",
        img: "",
      },
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
    const products = ref([]);
    const searchProduct = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(6);

    // Fetch products from API and store them in the products reactive variable
    async function fetchProducts() {
      try {
        const response = await axios.get(`/api/products`);
        products.value = response.data; // Assign the response data to products
        console.log("Fetched products:", products.value);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    // Call fetchProducts when component is mounted
    fetchProducts();

    const filteredProducts = computed(() => {
      return products.value.filter((product) =>
        product.name.toLowerCase().includes(searchProduct.value.toLowerCase())
      );
    });

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredProducts.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredProducts.value.length / itemsPerPage.value);
    });

    function changePage(page) {
      currentPage.value = page;
    }

    return {
      searchProduct,
      filteredProducts,
      paginatedProducts,
      currentPage,
      totalPages,
      changePage,
    };
  },
  computed: {
    filterProducts: function () {
      return this.products.filter((product) => {
        return product.name // products please find an item whose name matches the searchProduct.name
          .toLowerCase()
          .includes(this.searchProduct.toLowerCase());
      });
    },
  },
  async created() {
    const response = await axios.get(`/api/products`);
    const products = response.data; // responses with products from MongoDB
    this.products = products; // Stores the products in this products.list
    // console.log("Responded products: ", products);
    // console.log("This producst: ", this.products);
  },
};
</script>
