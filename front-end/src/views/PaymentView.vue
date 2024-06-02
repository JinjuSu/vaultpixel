<template>
  <div class="row my-5 justify-content-center">
    <div class="col-sm-6 col-8">
      <div v-if="user && order.orderStatus == 'Pending'">
        <h1>Order No# {{ order.orderId }}</h1>
        <p><strong>Status: </strong>{{ order.orderStatus }}</p>
        <form class="needs-validation" @submit.prevent="submitForm">
          <!-- Shipping address form -->
          <h2>Shipping address</h2>
          <div class="row my-3 justify-content-between">
            <div class="row">
              <div class="col-sm-6 col-12">
                <label for="firstName" class="form-label">First name</label>
                <input
                  type="text"
                  placeholder="John"
                  class="form-control"
                  required
                  v-model="address.firstName"
                  @input="checkFirstName"
                  ref="firstNameInput"
                />
                <div v-if="errorMsg.firstName" class="text-danger">
                  {{ errorMsg.firstName }}
                </div>
              </div>
              <div class="col-sm-6 col-12">
                <label for="lastName" class="form-label">Last name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  class="form-control"
                  required
                  v-model="address.lastName"
                  @input="checkLastName"
                  ref="lastNameInput"
                />
                <div v-if="errorMsg.lastName" class="text-danger">
                  {{ errorMsg.lastName }}
                </div>
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
                  v-model="address.street"
                  @input="checkStreet"
                  ref="streetInput"
                />
                <div v-if="errorMsg.street" class="text-danger">
                  {{ errorMsg.street }}
                </div>
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
                  v-model="address.suburb"
                  @input="checkSuburb"
                  ref="suburbInput"
                />
                <div v-if="errorMsg.suburb" class="text-danger">
                  {{ errorMsg.suburb }}
                </div>
              </div>
              <!-- state -->
              <div class="col-sm-6 col-12">
                <label for="state" class="form-label">State</label>
                <input
                  type="text"
                  placeholder="Victoria"
                  class="form-control"
                  required
                  v-model="address.state"
                  @input="checkState"
                  ref="stateInput"
                />
                <div v-if="errorMsg.state" class="text-danger">
                  {{ errorMsg.state }}
                </div>
              </div>
            </div>
            <div class="row justify-content-between">
              <!-- zip code -->
              <div class="col-sm-6 col-12">
                <label for="post" class="form-label">Post code</label>
                <input
                  type="text"
                  placeholder="00000"
                  maxlength="5"
                  class="form-control"
                  required
                  v-model="address.post"
                  @input="checkPost"
                  ref="postInput"
                />
                <div v-if="errorMsg.post" class="text-danger">
                  {{ errorMsg.post }}
                </div>
              </div>
              <!-- country -->
              <div class="col-sm-6 col-12">
                <label for="country" class="form-label">Country</label>
                <input
                  type="text"
                  placeholder="Australia"
                  class="form-control"
                  required
                  v-model="address.country"
                  @input="checkCountry"
                  ref="countryInput"
                />
                <div v-if="errorMsg.country" class="text-danger">
                  {{ errorMsg.country }}
                </div>
              </div>
            </div>
          </div>
          <!-- End of Shipping address form -->

          <!-- Payment details form -->
          <div class="row mt-5">
            <h2>Payment details</h2>
            <div>
              <label for="cardname" class="form-label">Card name</label>
              <input
                type="text"
                placeholder="John Doe"
                class="form-control"
                required
                v-model="paymentDetails.cardName"
                @input="checkCardName"
                ref="cardNameInput"
              />
              <div v-if="errorMsg.cardName" class="text-danger">
                {{ errorMsg.cardName }}
              </div>
            </div>
          </div>
          <div class="row justify-content-start">
            <div class="col-sm-4 col-12 mt-3">
              <label for="cardnumber" class="form-label">Card number</label>
              <input
                type="text"
                placeholder="4123 4567 8900 5432"
                maxlength="16"
                class="form-control"
                required
                v-model="paymentDetails.cardNumber"
                @input="checkCardNumber"
              />
              <div v-if="errorMsg.cardNumber" class="text-danger">
                {{ errorMsg.cardNumber }}
              </div>
            </div>
            <div class="col-auto text-start mt-5">
              <!-- Default card image when no type is detected -->
              <img
                v-if="!paymentDetails.cardType"
                src="../assets/icons/card.png"
                alt="Card Image"
              />
              <!-- Visa card image -->
              <img
                v-else-if="paymentDetails.cardType === 'Visa'"
                src="../assets/icons/visa.png"
                alt="Visa Card"
              />
              <!-- MasterCard image -->
              <img
                v-else-if="paymentDetails.cardType === 'MasterCard'"
                src="../assets/icons/mastercard.png"
                alt="MasterCard"
              />
              <!-- JCB card image -->
              <img
                v-else-if="paymentDetails.cardType === 'JCB'"
                src="../assets/icons/jcb.png"
                alt="JCB Card"
              />
              <!-- Amex card image -->
              <img
                v-else-if="paymentDetails.cardType === 'Amex'"
                src="../assets/icons/amex.png"
                alt="American Express"
              />
            </div>
            <div class="col-sm-4 col-12 mt-3">
              <label for="security-code" class="form-label"
                >Security code</label
              >
              <input
                type="password"
                placeholder="000"
                class="form-control"
                minlength="3"
                maxlength="3"
                required
                v-model="paymentDetails.cvv"
                @input="checkCVV"
              />
              <div v-if="errorMsg.cvv" class="text-danger">
                {{ errorMsg.cvv }}
              </div>
            </div>
          </div>
          <div class="row justify-content-start my-3">
            <label for="expiration-date">Expiration date</label>
            <div class="col-2">
              <input
                type="text"
                placeholder="MM"
                maxlength="2"
                class="form-control"
                required
                v-model="paymentDetails.expiryMonth"
                @input="checkExpiryMonth"
              />
              <div v-if="errorMsg.expiryMonth" class="text-danger">
                {{ errorMsg.expiryMonth }}
              </div>
            </div>
            /
            <div class="col-2">
              <input
                type="text"
                placeholder="YYYY"
                maxlength="4"
                class="form-control"
                required
                v-model="paymentDetails.expiryYear"
                @input="checkExpiryYear"
              />
              <div v-if="errorMsg.expiryYear" class="text-danger">
                {{ errorMsg.expiryYear }}
              </div>
            </div>
          </div>

          <p>
            <a
              href="#!"
              data-mdb-ripple-init
              v-bind:disabled="!formIsFilled"
              :class="['btn', submitButtonColor]"
              @click="submitPayment"
            >
              Confirm payment: $AU {{ order.totalPrice }}
            </a>
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
              <router-link :to="'/purchasehistory'"
                ><a
                  href="#!"
                  class="btn btn-sm btn-dark button-shop"
                  data-mdb-ripple-init
                  >Go purchase history
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
import axios from "axios";

export default {
  name: "Payment",
  props: ["user"],
  data() {
    return {
      order: {},
      address: {
        firstName: "",
        lastName: "",
        street: "",
        suburb: "",
        state: "",
        post: "",
        country: "",
      },
      paymentDetails: {
        cardName: "",
        cardNumber: "",
        cardType: "",
        expiryMonth: "",
        expiryYear: "",
        cvv: "",
      },
      errorMsg: {
        firstName: null,
        lastName: null,
        street: null,
        suburb: null,
        state: null,
        post: null,
        country: null,
        cardName: null,
        cardNumber: null,
        expiryDate: null,
        cvv: null,
        expiryMonth: null,
        expiryYear: null,
      },
      canSubmit: false,
    };
  },
  async created() {
    const response = await axios.get(
      `/api/payment/${this.$route.params.orderId}`
    );
    const order = response.data;
    this.order = order;
    // console.log("Order ID:", response, typeof response); // return the  object
    // console.log("Order Details:", this.order, typeof this.order); // return the object
  },
  methods: {
    async fetchOrder() {
      try {
        const response = await axios.get(
          `/api/payment/${this.$route.params.orderId}`
        );
        this.order = response.data;
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        alert("Failed to load order details.");
      }
    },
    async submitPayment() {
      this.checkSubmit();
      if (!this.canSubmit) {
        alert("Please correct the errors in the form before submitting.");
        return;
      }
      const orderId = this.$route.params.orderId;
      const orderUpdate = {
        address: this.address,
        paymentDetails: this.paymentDetails,
        orderStatus: "Completed",
      };
      try {
        const response = await axios.put(
          `/api/orders/${orderId}/update`,
          orderUpdate
        );
        if (response.status === 200) {
          alert("Payment confirmed!");
          await this.fetchOrder(); // Re-fetch the order to update the UI with new status
        }
      } catch (error) {
        console.error("Failed to submit payment:", error);
        alert("Payment submission failed.");
      }
    },
    // ---------------------- Form validation starts here ---------------------- //
    checkFirstName() {
      const input = this.$refs.firstNameInput;
      const regex = /^[a-zA-Z]+$/;
      if (!this.address.firstName) {
        this.errorMsg.firstName = "First name is required.";
      } else if (!regex.test(this.address.firstName)) {
        this.errorMsg.firstName = "First name must contain letters only.";
      } else if (!input.checkValidity()) {
        this.errorMsg.firstName = input.validationMessage;
      } else {
        this.errorMsg.firstName = null;
      }
    },
    checkLastName() {
      const regex = /^[a-zA-Z]+$/;
      if (!this.address.lastName) {
        this.errorMsg.lastName = "Last name is required.";
      } else if (!regex.test(this.address.lastName)) {
        this.errorMsg.lastName = "Last name must contain letters only.";
      } else {
        this.errorMsg.lastName = null;
      }
    },
    checkStreet() {
      if (!this.address.street) {
        this.errorMsg.street = "Street address is required.";
      } else if (this.address.street.length > 100) {
        this.errorMsg.street =
          "Street address must be less than 100 characters.";
      } else {
        this.errorMsg.street = null;
      }
    },
    checkSuburb() {
      const regex = /^[a-zA-Z]+$/;

      if (!this.address.suburb) {
        this.errorMsg.suburb = "Suburb is required.";
      } else if (this.address.suburb.length > 50) {
        this.errorMsg.suburb = "Suburb must be less than 50 characters.";
      } else if (!regex.test(this.address.suburb)) {
        this.errorMsg.suburb = "Suburb must contain letters only.";
      } else {
        this.errorMsg.suburb = null;
      }
    },
    checkState() {
      const regex = /^[a-zA-Z]+$/;

      if (!this.address.state) {
        this.errorMsg.state = "State is required.";
      } else if (this.address.state.length > 50) {
        this.errorMsg.state = "State must be less than 50 characters.";
      } else if (!regex.test(this.address.state)) {
        this.errorMsg.state = "State must contain letters only.";
      } else {
        this.errorMsg.state = null;
      }
    },
    checkPost() {
      if (!this.address.post) {
        this.errorMsg.post = "Post code is required.";
      } else if (!this.address.post.match(/^\d{5}$/)) {
        this.errorMsg.post = "Post code must be exactly 5 numeric digits.";
      } else {
        this.errorMsg.post = null;
      }
    },
    checkCountry() {
      if (!this.address.country) {
        this.errorMsg.country = "Country is required.";
      } else if (!this.address.country.match(/^[a-zA-Z ]+$/)) {
        this.errorMsg.country = "Country must contain letters only.";
      } else {
        this.errorMsg.country = null;
      }
    },

    // ---------------------- Check payment starts here ---------------------- //
    checkCardName() {
      const input = this.$refs.cardNameInput;
      const regex = /^[A-Za-z]+ [A-Za-z]+$/; // Regex to match two words separated by a single space

      if (!this.paymentDetails.cardName) {
        this.errorMsg.cardName = "Card name is required.";
      } else if (!regex.test(this.paymentDetails.cardName)) {
        this.errorMsg.cardName =
          "Card name must contain only letters and must include the first name and last name.";
      } else if (!input.checkValidity()) {
        this.errorMsg.cardName = input.validationtionMessage;
      } else {
        this.errorMsg.cardName = null;
      }
    },
    checkCardNumber() {
      const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
      const mastercardRegex =
        /^(?:5[1-5][0-9]{14}|222[1-9][0-9]{12}|22[3-9][0-9]{13}|2[3-6][0-9]{14}|27[01][0-9]{13}|2720[0-9]{12})$/;
      const jcbRegex = /^(?:2131|1800|35\d{3})\d{11}$/;
      const amexRegex = /^3[47][0-9]{13}$/;

      if (!this.paymentDetails.cardNumber) {
        this.errorMsg.cardNumber = "Card number is required.";
      } else if (
        !visaRegex.test(this.paymentDetails.cardNumber) &&
        !mastercardRegex.test(this.paymentDetails.cardNumber) &&
        !jcbRegex.test(this.paymentDetails.cardNumber) &&
        !amexRegex.test(this.paymentDetails.cardNumber)
      ) {
        this.errorMsg.cardNumber = "Card type not supported";
        this.paymentDetails.cardType = "";
      } else {
        this.errorMsg.cardNumber = null;
        if (visaRegex.test(this.paymentDetails.cardNumber)) {
          this.paymentDetails.cardType = "Visa";
        } else if (mastercardRegex.test(this.paymentDetails.cardNumber)) {
          this.paymentDetails.cardType = "MasterCard";
        } else if (jcbRegex.test(this.paymentDetails.cardNumber)) {
          this.paymentDetails.cardType = "JCB";
        } else if (amexRegex.test(this.paymentDetails.cardNumber)) {
          this.paymentDetails.cardType = "Amex";
        }
      }
    },
    checkExpiryMonth() {
      const month = parseInt(this.paymentDetails.expiryMonth);
      if (!this.paymentDetails.expiryMonth) {
        this.errorMsg.expiryMonth = "Month is required.";
      } else if (isNaN(month) || month < 1 || month > 12) {
        this.errorMsg.expiryMonth = "Month must be between 01 and 12.";
      } else {
        this.errorMsg.expiryMonth = null;
      }
    },
    checkExpiryYear() {
      const year = parseInt(this.paymentDetails.expiryYear);
      const currentYear = new Date().getFullYear();
      if (!this.paymentDetails.expiryYear) {
        this.errorMsg.expiryYear = "Year is required.";
      } else if (isNaN(year) || year < currentYear) {
        this.errorMsg.expiryYear =
          "Year must be greater than or equal to " + currentYear + ".";
      } else {
        this.errorMsg.expiryYear = null;
      }
    },
    checkCVV() {
      if (!this.paymentDetails.cvv) {
        this.errorMsg.cvv = "Card security code is required.";
      } else if (!this.paymentDetails.cvv.match(/^\d{3}$/)) {
        this.errorMsg.cvv = "Security code must be exactly 3 digits.";
      } else {
        this.errorMsg.cvv = null;
      }
    },
    checkSubmit: function () {
      this.canSubmit = true;

      for (let key in this.errorMsg) {
        if (this.errorMsg[key]) {
          this.canSubmit = false;
          break;
        }
      }
    },
  },
  computed: {
    formIsFilled: function () {
      return (
        this.address.firstName &&
        this.address.lastName &&
        this.address.street &&
        this.address.suburb &&
        this.address.state &&
        this.address.post &&
        this.address.country &&
        this.paymentDetails.cardName &&
        this.paymentDetails.cardNumber &&
        this.paymentDetails.cardType &&
        this.paymentDetails.expiryDate &&
        this.paymentDetails.cvv
      );
    },
    submitButtonColor: function () {
      this.checkSubmit();
      if (this.formIsFilled && this.canSubmit) {
        return "btn-primary";
      } else {
        return "btn-outline-secondary";
      }
    },
  },
};
</script>
