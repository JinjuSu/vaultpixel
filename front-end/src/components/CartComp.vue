<!-- Not working -->
<template>
  <div v-for="product in cartItems" :key="product.id">
    <div class="row justify-content-center text-center">
      <div class="col-8 col-md-3">
        <!-- Image goes here -->
        <div
          class="card border-0 shadow-none text-end image-product bg-transparent d-flex justify-content-end"
        >
          <img :src="product.image" class="img-fluid rounded-start" />
        </div>
      </div>

      <div class="col-8 col-md-3">
        <!-- Second card goes here -->
        <div class="card border-0 shadow-none text-start bg-transparent">
          <div class="card-body">
            <p>{{ product.name }}</p>
            <p>{{ product.price }} AUD</p>
          </div>
        </div>
      </div>
      <div class="col-8 col-md-3">
        <!-- Third card goes here -->
        <div class="card border-0 shadow-none text-start bg-transparent">
          <div class="card-body">
            <!-- Decrenmentor and tncrementor tool group -->
            <div class="row">
              <div class="col-auto">Qty.</div>

              <div class="col-auto">
                <!-- Tool border -->
                <div class="row border rounded">
                  <!-- Minus icon -->
                  <div class="col-auto">
                    <a v-mdb-ripple>
                      <i
                        class="fas fa-minus-square image-icon-qty"
                        v-on:click="deductFunction(product)"
                      ></i>
                    </a>
                  </div>
                  <!-- Number icon -->
                  <div class="col-auto">{{ product.qty }}</div>
                  <!-- Add icon -->
                  <div class="col-auto">
                    <a v-mdb-ripple>
                      <i
                        class="fas fa-plus-square image-icon-qty"
                        v-on:click="addFunction(product)"
                      ></i>
                    </a>
                  </div>
                </div>
              </div>
              <!-- remove icon -->
              <div class="col">
                <div
                  v-mdb-ripple
                  class="btn btn-light px-0 py-0"
                  @click="$emit('remove-from-cart', product.id)"
                >
                  <i class="fas fa-trash-alt image-icon-trash" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8 col-md-3">
        <!-- Third card goes here -->
        <div class="card border-0 shadow-none text-end bg-transparent">
          <div class="card-body">
            <p class="fw-bold">Total</p>
            <p>{{ productTotalPrice(product) }} AUD</p>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
  mdbRipple,
} from "mdb-vue-ui-kit";
export default {
  name: "CartComp",
  props: {
    cartItems: {}, // passed down from CartView.vue
  },
  components: {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn,
  },
  directives: {
    mdbRipple,
  },
  methods: {
    addFunction(product) {
      product.qty++;
      this.$emit("update-cart", product);
    },
    deductFunction(product) {
      if (product.qty > 1) {
        product.qty--;
        this.$emit("update-cart", product);
      } else {
        this.$emit("remove-from-cart", product.id); // Emit event to remove item
      }
    },
    productTotalPrice(product) {
      return (product.price * product.qty).toFixed(2);
    },
  },
  mounted() {
    console.log("cartItems in Cart Comp: ", this.cartItems);
  },
};
</script>
