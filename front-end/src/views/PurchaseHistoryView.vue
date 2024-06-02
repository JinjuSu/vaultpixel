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
        </tr>
      </tbody>
    </table>
    <!-- Modal for submitting reviews -->
    <div v-if="displayModal" class="modal">
      <div class="modal-content">
        <h4>Submit a Review for Order #{{ currentOrder.orderId }}</h4>
        <textarea
          v-model="reviewText"
          placeholder="Type your review here..."
          rows="4"
        ></textarea>
        <div>
          <button @click="submitReview">Submit Review</button>
          <button @click="closeModal">Close</button>
        </div>
      </div>
    </div>
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
      displayModal: false,
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
