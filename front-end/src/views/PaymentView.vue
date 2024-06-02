<template>
  <div class="row my-5 justify-content-center">
    <div class="col-sm-6 col-8">
      <div v-if="user">
        <h1>Order No# {{ order.orderId }}</h1>
        <form class="needs-validation" @submit.prevent="submitForm">
          <!-- Shipping address form -->
          <h2>Shipping address</h2>
          <div class="row my-3 justify-content-between">
            <div class="row">
              <div class="col-sm-6 col-12">
                <label for="firstname" class="form-label">First name</label>
                <input
                  type="text"
                  placeholder="John"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-sm-6 col-12">
                <label for="lastname" class="form-label">Last name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="row">
              <!-- address -->
              <div class="">
                <label for="street" class="form-label">Street address</label>
                <input
                  type="text"
                  placeholder="Glenferrie"
                  class="form-control"
                  required
                />
              </div>
            </div>
            <div class="row justify-content-between">
              <!-- suburb -->
              <div class="col-sm-6 col-12">
                <label for="suburb" class="form-label">Suburb</label>
                <input
                  type="text"
                  placeholder="Hawthorn"
                  class="form-control"
                  required
                />
              </div>
              <!-- state -->
              <div class="col-sm-6 col-12">
                <label for="state" class="form-label">State</label>
                <input
                  type="text"
                  placeholder="Victoria"
                  class="form-control"
                  required
                />
              </div>
            </div>

            <div class="row justify-content-between">
              <!-- zip code -->
              <div class="col-sm-6 col-12">
                <label for="postcode" class="form-label">Post code</label>
                <input
                  type="text"
                  placeholder="00000"
                  class="form-control"
                  required
                />
              </div>
              <!-- country -->
              <div class="col-sm-6 col-12">
                <label for="country" class="form-label">Country</label>
                <input
                  type="text"
                  placeholder="Australia"
                  class="form-control"
                  required
                />
              </div>
            </div>
          </div>
          <!-- End of Shipping address form -->

          <!-- Payment details form -->

          <div class="row">
            <h2>Payment details</h2>
            <div>
              <label for="card-name" class="form-label">Card name</label>
              <input
                type="text"
                placeholder="John Doe"
                class="form-control"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col mt-3">
              <label for="card-number" class="form-label">Card number</label>
              <input
                type="text"
                placeholder="4123 4567 8900 5432"
                maxlength="16"
                class="form-control"
                required
              />
            </div>
            <div class="col-auto text-end mt-5">
              <img src="../assets/icons/supported-cards-icon.png" alt="" />
            </div>
          </div>

          <div class="row justify-content-between my-3">
            <div class="col-auto">
              <label for="expiration-date">Expiration date </label>

              <p>
                <input type="date" required />
              </p>
            </div>
            <div class="col-sm-6 col-12">
              <label for="security-code">Security code</label>
              <input
                type="password"
                placeholder="123"
                class="form-control"
                minlength="3"
                maxlength="3"
                required
              />
            </div>
          </div>

          <!-- Terms and Conditions -->
          <div>
            <p>
              By clicking "Agree to terms and conditions", you accept our
              <a href="/terms">Terms and Conditions</a>. You agree to pay the
              total amount shown, which includes all applicable taxes and fees.
              Your payment information is secure and encrypted. Please review
              your order carefully.
            </p>
            <div class="form-check">
              <input class="form-check-input" type="checkbox" required />
              <label class="form-check-label">
                I have read and agree to terms and conditions
              </label>
            </div>
          </div>
          <p>
            <button>Confirm payment: $AU</button>
          </p>
        </form>
      </div>
      <div v-else>
        <div class="row justify-content-center">
          <div class="col-auto ms-0 text-center">
            <h1>Payment completed</h1>
            <div class="my-5">
              <img src="../assets/icons/complete-icon.png" class="img-fluid" />
            </div>
            <div>
              <p>Your order is now being prepared.</p>
            </div>
            <div class="my-4">
              <router-link :to="'/home'"
                ><a
                  href="#!"
                  class="btn btn-sm btn-dark button-shop"
                  data-mdb-ripple-init
                  >Go to home
                </a></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
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
import axios from "axios";

export default {
  name: "Payment",
  props: ["user"],
  data() {
    return {
      order: {},
    };
  },
  async created() {
    const response = await axios.get(
      `/api/payment/${this.$route.params.orderId}`
    );
    const order = response.data;
    this.order = order;
    console.log("Order ID:", response, typeof response); // return the whole product object
    console.log("Order Details:", this.order, typeof this.order); // return
  },
  methods: {},
};
</script>
