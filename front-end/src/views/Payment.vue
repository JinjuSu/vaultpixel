<template>
  <div class="container form-width">
    <div v-if="user">
      <form class="needs-validation" @submit.prevent="submitForm">
        <div>
          <label for="card-name" class="form-label">Card name</label>
          <input
            type="text"
            placeholder="John doe"
            class="form-control"
            required
          />
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
          <div class="col-auto">
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
            Your payment information is secure and encrypted. Please review your
            order carefully.
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
  data() {},
  component: {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBIcon,
    MDBBtn,
  },
  directives: {
    mdbRipple,
  },
  computed: {},
  methods: {},
};
</script>
