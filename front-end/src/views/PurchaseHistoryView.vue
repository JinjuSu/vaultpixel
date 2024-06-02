<template>
  <div class="container my-5 px-5">
    <h1 class="text-center mb-4">Purchase History</h1>
    <table class="table">
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
                <button class="btn btn-sm btn-dark">Pay</button>
              </router-link>
            </div>
            <div v-else>
              <button
                class="btn btn-sm btn-dark"
                @click="openReviewModal(order)"
              >
                Review
              </button>
            </div>
          </td>
          <!-- Modal for submitting reviews -->
          <div v-if="currentOrder">
            <textarea
              v-model="reviewText"
              placeholder="Type your review here..."
            ></textarea>
            <button @click="submitReview(currentOrder.orderId)">
              Submit Review
            </button>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PurchaseHistoryView",
  data() {
    return {
      orders: [],
      currentOrder: null,
      reviewText: "",
    };
  },
  props: ["user"],
  methods: {
    async loadOrders() {
      if (this.user && this.user.uid) {
        const response = await axios.get(`/api/orders/user/${this.user.uid}`);
        this.orders = response.data;
      }
    },
    openReviewModal(order) {
      this.currentOrder = order;
      this.reviewText = order.comment || "";
    },
    async submitReview(orderId) {
      try {
        const response = await axios.put(`/api/orders/${orderId}/comment`, {
          comment: this.reviewText,
        });
        if (response.status === 200) {
          alert("Review updated!");
          this.currentOrder.comment = this.reviewText;
          this.currentOrder = null;
        }
      } catch (error) {
        console.error("Failed to submit review:", error);
        alert("Failed to update review.");
      }
    },
  },
  created() {
    this.loadOrders();
  },
};
</script>
