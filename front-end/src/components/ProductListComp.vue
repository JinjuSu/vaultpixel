<!-- Not working -->
<template>
  <div class="col">
    <div class="row">
      <div class="col-4" v-for="product in paginatedProducts" :key="product.id">
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
</template>

<script>
export default {
  name: "ProductList",
  props: ["paginatedProducts"],
};
</script>
