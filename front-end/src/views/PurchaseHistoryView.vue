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
                <a class="btn btn-sm btn-dark"> Pay </a></router-link
              >
            </div>
            <div v-else>
              <button
                class="btn btn-sm btn-dark"
                @click="reviewOrder(order.orderId)"
              >
                Review
              </button>
            </div>
          </td>
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
    };
  },
  props: ["user"],
  async created() {
    if (this.user && this.user.uid) {
      try {
        const response = await axios.get(`/api/orders/user/${this.user.uid}`);
        this.orders = response.data;
      } catch (error) {
        console.error("Failed to fetch purchase history:", error);
        alert("Failed to fetch purchase history");
      }
    }
  },
  methods: {},
};
</script>
