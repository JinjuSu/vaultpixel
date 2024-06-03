<template>
  <div class="container my-5 px-5">
    <h1 class="text-center mb-4">Purchase History</h1>
    <!-- Condition to check if orders array is empty -->
    <div v-if="orders.length === 0" class="text-center">
      <p>You have no purchased orders.</p>
    </div>
    <!-- Only display the table if there are orders -->
    <table class="table" v-else>
      <thead>
        <tr>
          <th>Order No#</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order._id">
          <td>{{ order.orderId }}</td>
          <td>{{ order.totalPrice }} AUD</td>
          <td>{{ order.orderStatus }}</td>
          <td>
            <div v-if="order.orderStatus === 'Pending'">
              <router-link :to="'/payment/' + order.orderId">
                <MDBBtn class="btn btn-sm btn-dark">Pay</MDBBtn>
              </router-link>
            </div>
            <div v-else>
              <MDBBtn
                class="btn btn-sm btn-dark"
                @click="openReviewModal(order)"
              >
                Review
              </MDBBtn>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Modal for submitting reviews -->
    <div v-if="displayModal" class="modal">
      <div class="modal-content my-3">
        <h4 class="my-3">
          Submit a Review for Order #{{ currentOrder.orderId }}
        </h4>
        <textarea
          v-model="reviewText"
          placeholder="Type your review here..."
          rows="4"
        ></textarea>
        <div class="my-3">
          <MDBBtn color="dark" @click="submitReview">Submit Review</MDBBtn>
          <MDBBtn color="danger" @click="closeModal">Cancel</MDBBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MDBBtn } from "mdb-vue-ui-kit";

import axios from "axios";

export default {
  name: "PurchaseHistoryView",
  props: ["user"],
  components: {
    MDBBtn,
  },
  data() {
    return {
      orders: [],
      currentOrder: null,
      reviewText: "",
      displayModal: false,
    };
  },
  methods: {
    async loadOrders() {
      if (this.user && this.user.uid) {
        try {
          const response = await axios.get(`/api/orders/user/${this.user.uid}`);
          this.orders = response.data; // This will be an empty array if no orders are found
        } catch (error) {
          console.error("Error fetching orders:", error);
          alert("Failed to load purchase history.");
        }
      }
    },
    openReviewModal(order) {
      this.currentOrder = order;
      this.reviewText = "";
      this.displayModal = true;
    },
    async submitReview(orderId) {
      try {
        await axios.put(`/api/orders/${this.currentOrder.orderId}/comment`, {
          comment: this.reviewText,
        });
        alert("Review submitted successfully!");
        this.closeModal();
      } catch (error) {
        console.error("Error submitting review:", error);
        alert("Failed to submit review.");
      }
    },
    closeModal() {
      this.displayModal = false;
    },
  },
  created() {
    this.loadOrders();
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 50%;
  min-width: 300px;
}
</style>
